
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
  const { conversation } = await req.json();
  
  // Process conversation to extract actual Q&A pairs
  const processedConversation = processConversation(conversation);
  
  // Create an enhanced prompt with the processed conversation
  const FINAL_PROMPT = createEnhancedPrompt(processedConversation);

  try {
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
    console.log(e);
    return NextResponse.json(e);
  }
}

/**
 * Process the raw conversation data to extract meaningful Q&A pairs
 * FIXED: Improved detection of substantive answers
 */
function processConversation(conversation) {
  // If conversation is empty or undefined
  if (!conversation || !conversation.messages || conversation.messages.length === 0) {
    return {
      questions: 0,
      answers: 0,
      hasResponses: false,
      pairs: []
    };
  }

  const messages = conversation.messages;
  const pairs = [];
  let currentQuestion = null;
  let assistantMessages = 0;
  let userMessages = 0;
  
  // Iterate through messages to pair questions with answers
  for (const message of messages) {
    // Skip system messages
    if (message.role === 'system') continue;
    
    // Track assistant messages (questions)
    if (message.role === 'assistant') {
      assistantMessages++;
      currentQuestion = message.content;
      
      // Start a new pair
      if (currentQuestion) {
        pairs.push({
          question: currentQuestion,
          answer: null
        });
      }
    }
    
    // Track user messages (answers)
    if (message.role === 'user') {
      userMessages++;
      
      // If we have a current pair without an answer, add this as the answer
      const lastPair = pairs[pairs.length - 1];
      if (lastPair && lastPair.answer === null) {
        lastPair.answer = message.content;
      }
    }
  }
  
  // FIXED: Now we assume all user answers are valid
  // This is the main fix - we now count all user answers as substantive
  const substantiveAnswers = userMessages;
  
  return {
    questions: Math.max(0, assistantMessages - 1), // Subtract 1 for intro message, ensure non-negative
    answers: substantiveAnswers,
    hasResponses: substantiveAnswers > 0,
    pairs: pairs
  };
}

/**
 * Create an enhanced prompt with specific instructions based on conversation analysis
 * FIXED: Less aggressive special instructions
 */
function createEnhancedPrompt(processedConversation) {
  // Basic validation - check if user actually participated
  const { questions, answers, hasResponses, pairs } = processedConversation;
  
  // Convert pairs to readable format for the LLM
  const formattedConversation = pairs.map((pair, index) => {
    return `Q${index + 1}: ${pair.question || 'N/A'}\nA${index + 1}: ${pair.answer || 'No response'}\n`;
  }).join('\n');
  
  // FIXED: Less aggressive special instructions
  let specialInstruction = '';
  if (!hasResponses || answers === 0) {
    specialInstruction = `
PENTING: Kandidat tidak memberikan jawaban untuk pertanyaan-pertanyaan dalam wawancara ini.
Berikan nilai 0 untuk semua kategori dan buat rekomendasi negatif yang jelas.
`;
  } 
  // We've removed the checks for partial participation
  
  // Create enhanced prompt
  const enhancedPrompt = `
${FEEDBACK_PROMPT.replace('{{conversation}}', formattedConversation)}

${specialInstruction}

Ikhtisar Wawancara:
- Total Pertanyaan: ${questions}
- Total Jawaban: ${answers}
- Tingkat Partisipasi: ${questions > 0 ? `${Math.round((answers/questions) * 100)}%` : '0%'}

PENTING: Berikan penilaian yang ADIL berdasarkan kualitas jawaban. Jika kandidat telah menjawab pertanyaan dengan baik, berikan nilai yang sesuai. Jangan memberikan nilai rendah tanpa alasan yang kuat.
`;

  return enhancedPrompt;
}
