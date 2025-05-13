/*import { FEEDBACK_PROMPT } from '@/services/Constants'
import { NextResponse } from 'next/server'
import OpenAI from 'openai'

export async function POST(req) {
  const { conversation } = await req.json()
  const prompt = FEEDBACK_PROMPT.replace('{{conversation}}', JSON.stringify(conversation))
  try {
    const openai = new OpenAI({
      baseURL: 'https://openrouter.ai/api/v1',
      apiKey: process.env.OPENROUTER_API_KEY_HU
    })

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',         // faster dan deepseek
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7
    })

    return NextResponse.json({ content: completion.choices[0].message.content })
  } catch (err) {
    console.error('AI feedback error', err)
    return NextResponse.json({ error: 'AI feedback gagal' }, { status: 500 })
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
  
  // Count substantive answers (non-empty, more than just greetings)
  const substantiveAnswers = pairs.filter(pair => {
    const answer = pair.answer?.toLowerCase() || '';
    // Skip empty answers or very short responses like "hello", "ok", etc.
    return answer.length > 10 && 
           !['hello', 'hi', 'hey', 'ok', 'yes', 'no'].includes(answer.trim());
  }).length;
  
  return {
    questions: assistantMessages - 1, // Subtract 1 for intro message
    answers: substantiveAnswers,
    hasResponses: substantiveAnswers > 0,
    pairs: pairs
  };
}

/**
 * Create an enhanced prompt with specific instructions based on conversation analysis
 */
function createEnhancedPrompt(processedConversation) {
  // Basic validation - check if user actually participated meaningfully
  const { questions, answers, hasResponses, pairs } = processedConversation;
  
  // Convert pairs to readable format for the LLM
  const formattedConversation = pairs.map((pair, index) => {
    return `Q${index + 1}: ${pair.question || 'N/A'}\nA${index + 1}: ${pair.answer || 'No response'}\n`;
  }).join('\n');
  
  // Create a special instruction if user didn't answer questions
  let specialInstruction = '';
  if (!hasResponses) {
    specialInstruction = `
PENTING: Kandidat tidak memberikan jawaban substantif untuk pertanyaan-pertanyaan dalam wawancara ini. 
Berikan nilai 0 untuk semua kategori dan buat rekomendasi negatif yang jelas.
`;
  } else if (answers < questions * 0.5) {
    specialInstruction = `
PENTING: Kandidat hanya menjawab ${answers} dari ${questions} pertanyaan secara substantif.
Berikan penilaian yang sangat rendah dan pertimbangkan untuk tidak merekomendasikan kandidat ini.
`;
  }
  
  // Create enhanced prompt
  const enhancedPrompt = `
${FEEDBACK_PROMPT.replace('{{conversation}}', formattedConversation)}

${specialInstruction}

Ikhtisar Wawancara:
- Total Pertanyaan: ${questions}
- Jawaban Substantif: ${answers}
- Tingkat Partisipasi: ${hasResponses ? `${Math.round((answers/questions) * 100)}%` : '0%'}

Berikan penilaian yang objektif berdasarkan kualitas jawaban. Jika kandidat tidak menjawab pertanyaan atau memberikan jawaban yang sangat minim, berikan nilai 0-3. Jika jawaban cukup tetapi tidak menonjol, berikan nilai 4-6. Hanya berikan nilai 7-10 untuk jawaban yang benar-benar berkualitas tinggi.
`;

  return enhancedPrompt;
}

