import { FEEDBACK_PROMPT } from '@/services/Constants'
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
    

