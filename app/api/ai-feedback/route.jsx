
/*import { FEEDBACK_PROMPT } from "@/services/Constants";
import { NextResponse } from "next/server";
import OpenAI from "openai";


export async function POST(req){
    const {conversation} = await req.json();
    const FINAL_PROMPT = FEEDBACK_PROMPT.replace('{{conversation}}',JSON.stringify(conversation));


    try{ 
        const openai = new OpenAI({
            baseURL: "https://openrouter.ai/api/v1",
            apiKey: process.env.OPENROUTER_API_KEY_HU,
            
          })
          const completion = await openai.chat.completions.create({
            model: "deepseek/deepseek-r1:free",
            messages: [
              { role: "user", content: FINAL_PROMPT }
            ],
           
          })
          
          return NextResponse.json(completion.choices[0].message)
          
        }
        catch(e){
            console.log(e)
            return NextResponse.json(e)
    
        }

}
        */

import { FEEDBACK_PROMPT } from "@/services/Constants";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req) {
  try {
    // Parse the request body, handle potential errors
    const body = await req.json().catch(e => {
      console.error("Failed to parse request JSON:", e);
      return {};
    });
    
    const { conversation } = body;
    
    // Validate conversation data
    if (!conversation) {
      console.error("No conversation data received");
      return NextResponse.json(
        { error: "No conversation data provided" },
        { status: 400 }
      );
    }
    
    // Log raw conversation data for debugging
    console.log("Raw conversation received:", 
      Array.isArray(conversation.messages) 
        ? `${conversation.messages.length} messages` 
        : "No messages array");
    
    // Process conversation to extract actual Q&A pairs
    const processedConversation = processConversation(conversation);
    
    // Create an enhanced prompt with the processed conversation
    const FINAL_PROMPT = createEnhancedPrompt(processedConversation);
    
    // Log the processed conversation and prompt for debugging
    console.log("Processed conversation:", processedConversation);
    
    // Call OpenRouter API
    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENROUTER_API_KEY_HU,
    });
    
    const completion = await openai.chat.completions.create({
      model: "deepseek/deepseek-r1:free",
      messages: [
        { role: "user", content: FINAL_PROMPT }
      ],
    });
    
    return NextResponse.json(completion.choices[0].message);
  } catch(e) {
    console.error("Error in ai-feedback API route:", e);
    return NextResponse.json(
      { error: e.message || "An error occurred" },
      { status: 500 }
    );
  }
}

/**
 * Process the raw conversation data to extract meaningful Q&A pairs
 */
function processConversation(conversation) {
  // If conversation data is not in expected format, handle gracefully
  let messages = [];
  
  // Handle different possible conversation formats
  if (Array.isArray(conversation)) {
    // If conversation is directly an array
    messages = conversation;
  } else if (conversation && Array.isArray(conversation.messages)) {
    // If conversation has a messages array property
    messages = conversation.messages;
  } else if (conversation && typeof conversation === 'object') {
    // Try to find any array in the conversation object
    for (const key in conversation) {
      if (Array.isArray(conversation[key])) {
        messages = conversation[key];
        break;
      }
    }
  }
  
  // If we still couldn't find messages, return empty result
  if (messages.length === 0) {
    return {
      questions: 0,
      answers: 0,
      hasResponses: false,
      pairs: [],
      error: "No valid messages found in conversation data"
    };
  }

  const pairs = [];
  let assistantMessages = 0;
  let userMessages = 0;
  let currentQuestion = null;
  
  // Process each message to create Q&A pairs
  for (let i = 0; i < messages.length; i++) {
    const message = messages[i];
    
    // Skip invalid messages
    if (!message || typeof message !== 'object') continue;
    
    // Skip system messages
    if (message.role === 'system') continue;
    
    // Handle assistant messages as questions
    if (message.role === 'assistant') {
      assistantMessages++;
      currentQuestion = message.content || "";
      
      // Start a new pair if we have a question
      if (currentQuestion) {
        pairs.push({
          question: currentQuestion,
          answer: null
        });
      }
    }
    
    // Handle user messages as answers
    if (message.role === 'user') {
      userMessages++;
      
      // If we have a current pair without an answer, add this as the answer
      if (pairs.length > 0) {
        const lastPair = pairs[pairs.length - 1];
        if (lastPair && lastPair.answer === null) {
          lastPair.answer = message.content || "";
        }
      }
    }
  }
  
  // Count valid pairs (both question and answer present)
  const validPairs = pairs.filter(pair => 
    pair.question && pair.answer && 
    pair.question.trim() !== "" && 
    pair.answer.trim() !== "");
  
  return {
    questions: Math.max(0, assistantMessages - 1), // Subtract 1 for intro message
    answers: userMessages,
    hasResponses: userMessages > 0,
    pairs: pairs,
    validPairs: validPairs.length
  };
}

/**
 * Create an enhanced prompt with specific instructions based on conversation analysis
 */
function createEnhancedPrompt(processedConversation) {
  // Get conversation data
  const { questions, answers, hasResponses, pairs } = processedConversation;
  
  // Create a clean, formatted conversation for the LLM
  const formattedConversation = pairs
    .filter(pair => pair.question) // Ensure question exists
    .map((pair, index) => {
      const cleanQuestion = (pair.question || "").trim();
      const cleanAnswer = (pair.answer || "No response").trim();
      
      return `Q${index + 1}: ${cleanQuestion}\nA${index + 1}: ${cleanAnswer}\n`;
    })
    .join('\n');
  
  // Create any special instructions based on conversation analysis
  let specialInstruction = '';
  
  // Only add negative instruction if truly no responses
  if (pairs.length === 0 || !hasResponses) {
    specialInstruction = `
PENTING: Tidak ada percakapan wawancara yang cukup untuk dievaluasi.
Berikan nilai 0 untuk semua kategori dan buat rekomendasi negatif yang jelas.
`;
  } else {
    // Add positive instruction to be fair in evaluation
    specialInstruction = `
PENTING: Evaluasi kandidat secara ADIL berdasarkan jawaban yang diberikan.
Jangan memberikan nilai rendah tanpa alasan yang jelas.
Anggap semua jawaban kandidat sebagai upaya tulus untuk menjawab pertanyaan.
`;
  }
  
  // Create the final prompt
  const enhancedPrompt = `
${FEEDBACK_PROMPT.replace('{{conversation}}', formattedConversation)}

${specialInstruction}

Ikhtisar Wawancara:
- Total Pertanyaan: ${questions}
- Total Jawaban: ${answers}
- Tingkat Partisipasi: ${questions > 0 ? `${Math.round((answers/questions) * 100)}%` : '0%'}

PETUNJUK TAMBAHAN:
- Jika kandidat telah menjawab pertanyaan dengan baik, berikan nilai minimal 7.
- Jawaban yang cukup namun sederhana patut mendapat nilai minimal 5.
- Nilai 0-3 hanya diberikan jika jawaban sangat tidak relevan atau sangat minimal.
`;

  return enhancedPrompt;
}
