/*"use client"
import React, { useEffect } from 'react'
import { useContext } from 'react'
import { InterviewDataContext } from '@/context/InterviewDataContext'
import { Phone, Timer } from 'lucide-react'
import Image from 'next/image'
import {Mic} from 'lucide-react'
import Vapi from '@vapi-ai/web'
import AlertConfirmation from './_components/AlertConfirmation'
import { useState } from 'react'
import { toast } from 'sonner'



  

function StartInterview() {
  const {interviewInfo, setInterviewInfo}= useContext(InterviewDataContext);
  const [vapi] = useState(() => new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY));
  const [activeUser, setActiveUser]=useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [timer, setTimer] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [conversation, setConversation] = useState();
  


  useEffect(()=>{
    if (interviewInfo && !isCallActive) {
      startCall();
    }
  },[interviewInfo])

  useEffect(() => {
    let interval;
    if (timerActive) {
      interval = setInterval(() => {
        setTimer((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}.${minutes.toString().padStart(2, '0')}.${secs.toString().padStart(2, '0')}`;
  };

  const startCall=()=>{
    let questionList;
    interviewInfo?.interviewData?.questionList.forEach((item,index)=>(
      questionList=item?.question+","+questionList
    ));

    const assistantOptions = {
      name: "AI Interviewer",
      firstMessage: `Halo ${interviewInfo?.userName}, selamat datang di wawancara untuk posisi ${interviewInfo?.interviewData?.jobPosition}.`,
      transcriber: {
          provider: "deepgram",
          model: "nova-2",
          language: "id"
      },
      voice: {
          provider: "azure",
          voiceId: "id-ID-ArdiNeural"
      },
      model: {
          provider: "openai",
          model: "gpt-4",
          messages: [
              {
                  role: "system",
                  content: `Anda adalah pewawancara AI yang sedang melakukan wawancara untuk posisi ${interviewInfo?.interviewData?.jobPosition}.

Tugas Anda adalah:
1. Mulai dengan perkenalan singkat
2. Ajukan satu pertanyaan dari daftar ini: ${questionList}
3. Tunggu jawaban kandidat
4. Berikan pengakuan singkat setelah setiap jawaban
5. Lanjut ke pertanyaan berikutnya
6. Akhiri wawancara setelah semua pertanyaan terjawab

Gunakan bahasa yang sederhana dan profesional.

Contoh respons:
- "Mari kita mulai dengan pertanyaan pertama: [pertanyaan]"
- "Terima kasih atas jawaban Anda. Mari kita lanjut ke pertanyaan berikutnya."
- "Itu saja untuk hari ini. Terima kasih atas waktunya."

Ingat untuk:
- Berbicara dengan jelas dan profesional
- Menunggu jawaban yang lengkap
- Tetap fokus pada pertanyaan wawancara
`.trim(),
              },
          ],
      }
  };
    
    vapi.start(assistantOptions);
    setIsCallActive(true);
  }

  const stopInterview=()=>{
    if (isCallActive) {
      setIsCallActive(false);
      setTimerActive(false);
      vapi.stop();
    }
  }

  
  vapi.on("call-start",()=>{
    console.log("Call has started.");
    toast('Call Connected...', {
      id: 'call-start',
      duration: 2000
    });
    setIsCallActive(true);
    setTimerActive(true);
    setTimer(0);
  });

  vapi.on("speech-start",()=>{
    console.log("Assistant speech has started.");
    setActiveUser(false);
  });

  vapi.on("speech-end",()=>{
    console.log("Assistant speech has ended.");
    setActiveUser(true);
  });

  vapi.on("call-end",()=>{
    if (isCallActive) {
      console.log("Call has ended.");
      toast('Interview Ended', {
        id: 'call-end',
        duration: 2000
      });
      setIsCallActive(false);
      setTimerActive(false);
    }
  });

 vapi.on("message",(message)=>{
  console.log( message);
 });


  return (
    <div className='p-20 lg:px-48 xl:px-56 '>
         <h2 className='font-bold text-xl flex justify-between'>AI Interview Section
            <span className='gap-2 items-center flex'>
              <Timer/>
              {formatTime(timer)}
            </span>
         </h2>
         <div className='grid grid-cols-1 md:grid-cols-2 gap-7 mt-5'>
            <div className='bg-white h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center'>
                <div className='relative'>
                {!activeUser&&<span className='absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping'/>}
                    <Image src={'/GAMBAR.png'} alt='GAMBAR' 
                    width={100}
                    height={100}
                    className='w-[60px] h-[60px] rounded-full object-cover'/>
    
                </div>
                <h2>AI Reqruiter</h2>
                
            </div>
            <div className='bg-white h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center'>
              <div className='relative'>
              {activeUser&&<span className='absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping'/>}
              <h2 className='text-2xl bg-blue-500 text-white p-3 rounded-full px-5'>{interviewInfo?.userName[0]}</h2>
              </div>
              <h2>{interviewInfo?.userName}</h2>
              
            </div>

         </div>
         <div className='flex items-center gap-5 justify-center mt-7'>
            <Mic className='h-12 w-12 p-3 bg-gray-400 rounded-full cursor-pointer'/>
            <AlertConfirmation stopInterview={()=>stopInterview()} >
                <Phone className='h-12 w-12 p-3 bg-red-400 rounded-full cursor-pointer'
            
                />
            </AlertConfirmation>
         </div>
         <h2 className='text-sm text-gray-400 text-center mt-5'>Interview in progress...</h2>
         
    </div>
    
  )
}

export default StartInterview  */


/*
"use client"
import React, { useEffect } from 'react'
import { useContext } from 'react'
import { InterviewDataContext } from '@/context/InterviewDataContext'
import { Phone, Timer } from 'lucide-react'
import Image from 'next/image'
import {Mic} from 'lucide-react'
import Vapi from '@vapi-ai/web'
import AlertConfirmation from './_components/AlertConfirmation'
import { useState } from 'react'
import { toast } from 'sonner'



  

function StartInterview() {
  const {interviewInfo, setInterviewInfo}= useContext(InterviewDataContext);
  const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);
  const [activeUser, setActiveUser]=useState(false);
  


  useEffect(()=>{
    interviewInfo&&startCall();

  },[interviewInfo])

  const startCall=()=>{
    let questionList;
    interviewInfo?.interviewData?.questionList.forEach((item,index)=>(
      questionList=item?.question+","+questionList
    ));

    const assistantOptions = {
      name: "AI Interviewer",
      firstMessage: `Halo ${interviewInfo?.userName}, selamat datang di wawancara untuk posisi ${interviewInfo?.interviewData?.jobPosition}.`,
      transcriber: {
          provider: "deepgram",
          model: "nova-2",
          language: "id"
      },
      voice: {
          provider: "azure",
          voiceId: "id-ID-ArdiNeural"
      },
      model: {
          provider: "openai",
          model: "gpt-4",
          messages: [
              {
                  role: "system",
                  content: `Anda adalah pewawancara AI yang sedang melakukan wawancara untuk posisi ${interviewInfo?.interviewData?.jobPosition}.

Tugas Anda adalah:
1. Mulai dengan perkenalan singkat
2. Ajukan satu pertanyaan dari daftar ini: ${questionList}
3. Tunggu jawaban kandidat
4. Berikan pengakuan singkat setelah setiap jawaban
5. Lanjut ke pertanyaan berikutnya
6. Akhiri wawancara setelah semua pertanyaan terjawab

Gunakan bahasa yang sederhana dan profesional.

Contoh respons:
- "Mari kita mulai dengan pertanyaan pertama: [pertanyaan]"
- "Terima kasih atas jawaban Anda. Mari kita lanjut ke pertanyaan berikutnya."
- "Itu saja untuk hari ini. Terima kasih atas waktunya."

Ingat untuk:
- Berbicara dengan jelas dan profesional
- Menunggu jawaban yang lengkap
- Tetap fokus pada pertanyaan wawancara
`.trim(),
              },
          ],
      }
  };
    
  vapi.start(assistantOptions)

    

  }

  const stopInterview=()=>{
    
    
    vapi.stop()
  }

  
  vapi.on("call-start",()=>{
    console.log("Call has started.");
    toast('Call Connected...')
  });

  vapi.on("speech-start",()=>{
    console.log("Assistant speech has started.");
    setActiveUser(false);
  });

  vapi.on("speech-end",()=>{
    console.log("Assistant speech has ended.");
    setActiveUser(true);
  });

  vapi.on("call-end",()=>{
    console.log("Call has ended.");
    toast('Interview Ended')
  });

  vapi.on("message",(message)=>{
    console.log(message);
  });

 


  return (
    <div className='p-20 lg:px-48 xl:px-56 '>
         <h2 className='font-bold text-xl flex justify-between'>AI Interview Section
            <span className='gap-2 items-center'>
              <Timer/>
              
            </span>
         </h2>
         <div className='grid grid-cols-1 md:grid-cols-2 gap-7 mt-5'>
            <div className='bg-white h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center'>
                <div className='relative'>
                {!activeUser&&<span className='absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping'/>}
                    <Image src={'/GAMBAR.png'} alt='GAMBAR' 
                    width={100}
                    height={100}
                    className='w-[60px] h-[60px] rounded-full object-cover'/>
    
                </div>
                <h2>AI Reqruiter</h2>
                
            </div>
            <div className='bg-white h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center'>
              <div className='relative'>
              {activeUser&&<span className='absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping'/>}
              <h2 className='text-2xl bg-blue-500 text-white p-3 rounded-full px-5'>{interviewInfo?.userName[0]}</h2>
              </div>
              <h2>{interviewInfo?.userName}</h2>
              
            </div>

         </div>
         <div className='flex items-center gap-5 justify-center mt-7'>
            <Mic className='h-12 w-12 p-3 bg-gray-400 rounded-full cursor-pointer'/>
            <AlertConfirmation stopInterview={()=>stopInterview()} >
                <Phone className='h-12 w-12 p-3 bg-red-400 rounded-full cursor-pointer'
            
                />
            </AlertConfirmation>
         </div>
         <h2 className='text-sm text-gray-400 text-center mt-5'>Interview in progress...</h2>
         
    </div>
    
  )
}

export default StartInterview     */




/*'use client'
import React, { useEffect, useState, useContext } from 'react'
import { InterviewDataContext } from '@/context/InterviewDataContext'
import { Phone, Timer, Mic, Loader2Icon } from 'lucide-react'
import Image from 'next/image'
import Vapi from '@vapi-ai/web'
import AlertConfirmation from './_components/AlertConfirmation'
import { toast } from 'sonner'
import axios from 'axios'
import { supabase } from '@/services/supabaseClient'
import { useParams, useRouter } from 'next/navigation'



function StartInterview() {
  const { interviewInfo } = useContext(InterviewDataContext)
  const [vapi] = useState(() => new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY))
  const [activeUser, setActiveUser] = useState(false)
  const [isCallActive, setIsCallActive] = useState(false)
  const [timer, setTimer] = useState(0)
  const [timerActive, setTimerActive] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const [conversation, setConversation]=useState();
  const {interview_id}=useParams();
  const router=useRouter();
  const [loading, setLoading]=useState(false);


  
  
  


  // Mulai interview sekali saja
  useEffect(() => {
    if (interviewInfo && !hasStarted) {
      startCall()
      setHasStarted(true)
    }
  }, [interviewInfo, hasStarted])

  // Timer logika
  useEffect(() => {
    let interval
    if (timerActive) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [timerActive])

  // Listener hanya dipasang sekali
  useEffect(() => {
    vapi.on('call-start', () => {
      console.log('Call started')
      toast('Call Connected...', { id: 'call-start', duration: 2000 })
      setIsCallActive(true)
      setTimerActive(true)
      setTimer(0)
      
    })

    vapi.on('speech-start', () => {
      console.log('Assistant speaking')
      setActiveUser(false)
      
    })

    vapi.on('speech-end', () => {
      console.log('Assistant done')
      setActiveUser(true)
      
    })

    vapi.on('call-end', () => {
      console.log('Call ended')
      toast('Interview Ended', { id: 'call-end', duration: 2000 })
      setIsCallActive(false)
      setTimerActive(false)
      GenerateFeedback();
      
    })

    vapi.on('message', (message) => {
      console.log(message?.conversation);
      setConversation(message?.conversation);
      
    })
  }, [vapi])

  const startCall = () => {
    const questions = interviewInfo?.interviewData?.questionList
      ?.map((q) => q.question)
      .filter(Boolean)
      .join(', ')

    const assistantOptions = {
      name: 'AI Interviewer',
      firstMessage: `Halo ${interviewInfo?.userName}, selamat datang di wawancara untuk posisi ${interviewInfo?.interviewData?.jobPosition}.`,
      transcriber: {
        provider: 'deepgram',
        model: 'nova-2',
        language: 'id',
      },
      voice: {
        provider: 'azure',
        voiceId: 'id-ID-ArdiNeural',
      },
      model: {
        provider: 'openai',
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `
Anda adalah pewawancara AI yang sedang melakukan wawancara untuk posisi ${interviewInfo?.interviewData?.jobPosition}.

Tugas Anda adalah:
1. Mulai dengan perkenalan singkat
2. Ajukan satu pertanyaan dari daftar ini: ${questions}
3. Tunggu jawaban kandidat
4. Berikan pengakuan singkat setelah setiap jawaban
5. Lanjut ke pertanyaan berikutnya
6. Akhiri wawancara setelah semua pertanyaan terjawab

Gunakan bahasa yang sederhana dan profesional.

Contoh:
- "Mari kita mulai dengan pertanyaan pertama: ..."
- "Terima kasih atas jawaban Anda."
- "Itu saja untuk hari ini. Terima kasih atas waktunya."
            `.trim(),
          },
        ],
      },
    }

    vapi.start(assistantOptions)
  }

  const stopInterview = () => {
    if (isCallActive) {
      vapi.stop()
      setIsCallActive(false)
      setTimerActive(false)
      GenerateFeedback();
    }
  }

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, '0')}.${minutes
      .toString()
      .padStart(2, '0')}.${secs.toString().padStart(2, '0')}`
  }

  const GenerateFeedback=async()=>{
      const result = await axios.post('/api/ai-feedback',{
        conversation:conversation
      });

      console.log(result?.data);
      const Content = result.data.content;
      const FINAL_CONTENT = Content.replace('```json', '').replace('```','')
      console.log(FINAL_CONTENT);

      const { data, error } = await supabase
        .from('interview-feedback')
        .insert([
          { 
            userName : interviewInfo?.userName ,
            userEmail: interviewInfo?.userEmail,
            interview_id : interview_id,
            feedback : JSON.parse(FINAL_CONTENT),
            recommended : false

          },
        ])
        .select()

        console.log(data);
        router.replace('/interview/'+interview_id+'/completed');
        setLoading(false);


  }

  return (
    <div className="p-20 lg:px-48 xl:px-56">
      <h2 className="font-bold text-xl flex justify-between">
        AI Interview Section
        <span className="gap-2 items-center flex">
          <Timer />
          {formatTime(timer)}
        </span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mt-5">
        <div className="bg-white h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center">
          <div className="relative">
            {!activeUser && (
              <span className="absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping" />
            )}
            <Image
              src="/GAMBAR.png"
              alt="GAMBAR"
              width={100}
              height={100}
              className="w-[60px] h-[60px] rounded-full object-cover"
            />
          </div>
          <h2>AI Recruiter</h2>
        </div>

        <div className="bg-white h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center">
          <div className="relative">
            {activeUser && (
              <span className="absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping" />
            )}
            <h2 className="text-2xl bg-blue-500 text-white p-3 rounded-full px-5">
              {interviewInfo?.userName?.[0]}
            </h2>
          </div>
          <h2>{interviewInfo?.userName}</h2>
        </div>
      </div>

      <div className="flex items-center gap-5 justify-center mt-7">
        <Mic className="h-12 w-12 p-3 bg-gray-400 rounded-full cursor-pointer" />
        <AlertConfirmation stopInterview={stopInterview} setLoading={setLoading}>
        <Phone
  className={`h-12 w-12 p-3 rounded-full cursor-pointer ${
    loading ? 'bg-red-300 animate-spin' : 'bg-red-400'
  }`}
/>

        </AlertConfirmation>
      </div>

      <h2 className="text-sm text-gray-400 text-center mt-5">Interview in progress...</h2>
    </div>
  )
}

export default StartInterview
*/


'use client'
import React, { useEffect, useState, useContext, useRef } from 'react'
import { InterviewDataContext } from '@/context/InterviewDataContext'
import { Phone, Timer, Mic } from 'lucide-react'
import Image from 'next/image'
import Vapi from '@vapi-ai/web'
import AlertConfirmation from './_components/AlertConfirmation'
import { toast } from 'sonner'
import axios from 'axios'
import { supabase } from '@/services/supabaseClient'
import { useParams, useRouter } from 'next/navigation'

function StartInterview() {
  const { interviewInfo } = useContext(InterviewDataContext)
  const [activeUser, setActiveUser] = useState(false)
  const [isCallActive, setIsCallActive] = useState(false)
  const [timer, setTimer] = useState(0)
  const [timerActive, setTimerActive] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const [conversation, setConversation] = useState()
  const { interview_id } = useParams()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  // Stabilize Vapi instance
  const vapiRef = useRef(null)
  if (!vapiRef.current) {
    vapiRef.current = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY)
  }
  const vapi = vapiRef.current

  // Prevent multiple feedback generation
  const feedbackGeneratedRef = useRef(false)

  useEffect(() => {
    if (interviewInfo && !hasStarted) {
      startCall()
      setHasStarted(true)
    }
  }, [interviewInfo, hasStarted])

  // Timer
  useEffect(() => {
    let interval
    if (timerActive) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [timerActive])

  useEffect(() => {
    const handleCallStart = () => {
      console.log('Call started')
      toast('Call Connected...', { id: 'call-start', duration: 2000 })
      setIsCallActive(true)
      setTimerActive(true)
      setTimer(0)
    }

    const handleSpeechStart = () => {
      console.log('Assistant speaking')
      setActiveUser(false)
    }

    const handleSpeechEnd = () => {
      console.log('Assistant done')
      setActiveUser(true)
    }

    const handleCallEnd = () => {
      console.log('Call ended')
      toast('Interview Ended', { id: 'call-end', duration: 2000 })
      setIsCallActive(false)
      setTimerActive(false)
      
      // Check if we have captured conversation data
      if (conversation) {
        generateFeedback()
      } else {
        console.error('No conversation data available for feedback generation')
        toast.error('Failed to generate feedback: No conversation data', { duration: 3000 })
      }
    }

    const handleMessage = (message) => {
      console.log('Conversation update received:', message)
      if (message?.conversation) {
        console.log('Setting conversation data')
        setConversation(message.conversation)
      }
    }

    vapi.on('call-start', handleCallStart)
    vapi.on('speech-start', handleSpeechStart)
    vapi.on('speech-end', handleSpeechEnd)
    vapi.on('call-end', handleCallEnd)
    vapi.on('message', handleMessage)

    return () => {
      vapi.off('call-start', handleCallStart)
      vapi.off('speech-start', handleSpeechStart)
      vapi.off('speech-end', handleSpeechEnd)
      vapi.off('call-end', handleCallEnd)
      vapi.off('message', handleMessage)
    }
  }, [conversation])

  const startCall = () => {
    const questions = interviewInfo?.interviewData?.questionList
      ?.map((q) => q.question)
      .filter(Boolean)
      .join(', ')

    const assistantOptions = {
      name: 'AI Interviewer',
      firstMessage: `Halo ${interviewInfo?.userName}, selamat datang di wawancara untuk posisi ${interviewInfo?.interviewData?.jobPosition}.`,
      transcriber: {
        provider: 'deepgram',
        model: 'nova-2',
        language: 'id',
      },
      voice: {
        provider: 'azure',
        voiceId: 'id-ID-ArdiNeural',
      },
      model: {
        provider: 'openai',
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `
Anda adalah pewawancara AI yang sedang melakukan wawancara untuk posisi ${interviewInfo?.interviewData?.jobPosition}.

Tugas Anda adalah:
1. Mulai dengan perkenalan singkat
2. Ajukan satu pertanyaan dari daftar ini: ${questions}
3. Tunggu jawaban kandidat
4. Berikan pengakuan singkat setelah setiap jawaban
5. Lanjut ke pertanyaan berikutnya
6. Akhiri wawancara setelah semua pertanyaan terjawab

Gunakan bahasa yang sederhana dan profesional.

Contoh:
- "Mari kita mulai dengan pertanyaan pertama: ..."
- "Terima kasih atas jawaban Anda."
- "Itu saja untuk hari ini. Terima kasih atas waktunya."
            `.trim(),
          },
        ],
      },
    }

    vapi.start(assistantOptions)
  }

  const stopInterview = () => {
    if (isCallActive) {
      vapi.stop()
      setIsCallActive(false)
      setTimerActive(false)
      
      // Only generate feedback if we have conversation data
      if (conversation) {
        generateFeedback()
      } else {
        console.error('No conversation data available for feedback generation')
        toast.error('Failed to generate feedback: No conversation data', { duration: 3000 })
      }
    }
  }

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, '0')}.${minutes
      .toString()
      .padStart(2, '0')}.${secs.toString().padStart(2, '0')}`
  }

  const generateFeedback = async () => {
    // Prevent duplicate feedback generation
    if (feedbackGeneratedRef.current) {
      console.log('Feedback already being generated, skipping duplicate request')
      return
    }
    
    feedbackGeneratedRef.current = true
    setLoading(true)
    
    try {
      console.log('Generating feedback for conversation:', conversation)
      
      // Show toast to indicate feedback generation has started
      toast.loading('Generating interview feedback...', { id: 'feedback-gen', duration: 10000 })
      
      const result = await axios.post('/api/ai-feedback', {
        conversation: conversation,
      })

      console.log('Feedback API response:', result.data)
      toast.success('Feedback generated successfully', { id: 'feedback-gen' })

      const Content = result.data.content
      // More robust JSON parsing
      let parsedContent = null
      try {
        // Try direct parsing first
        parsedContent = JSON.parse(Content)
      } catch (e) {
        console.log('Direct parsing failed, trying to extract JSON from response', e)
        // If that fails, try to extract JSON from markdown code blocks
        const jsonMatch = Content.match(/```json([\s\S]*?)```/) || Content.match(/```([\s\S]*?)```/)
        if (jsonMatch && jsonMatch[1]) {
          try {
            parsedContent = JSON.parse(jsonMatch[1].trim())
          } catch (e2) {
            console.error('Failed to parse JSON from markdown block', e2)
          }
        }
        
        // If still failed, try to find JSON-like structure anywhere in the text
        if (!parsedContent) {
          const jsonObjectMatch = Content.match(/{[\s\S]*}/);
          if (jsonObjectMatch) {
            try {
              parsedContent = JSON.parse(jsonObjectMatch[0])
            } catch (e3) {
              console.error('Failed to parse JSON from text', e3)
            }
          }
        }
      }
      
      if (!parsedContent) {
        throw new Error('Failed to parse feedback content as JSON')
      }

      console.log('Parsed feedback content:', parsedContent)

      const { data, error } = await supabase
        .from('interview-feedback')
        .insert([
          {
            userName: interviewInfo?.userName,
            userEmail: interviewInfo?.userEmail,
            interview_id: interview_id,
            feedback: parsedContent,
            recommended: parsedContent?.umpanBalik?.rekomendasi === 'DIREKOMENDASIKAN',
          },
        ])
        .select()

      if (error) {
        throw new Error(`Supabase error: ${error.message}`)
      }
      
      console.log('Feedback saved to database:', data)
      router.replace('/interview/' + interview_id + '/completed')
    } catch (err) {
      console.error('Feedback generation failed:', err)
      toast.error(`Failed to generate feedback: ${err.message}`, { id: 'feedback-gen', duration: 5000 })
      
      // Reset the flag to allow retrying
      feedbackGeneratedRef.current = false
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-20 lg:px-48 xl:px-56">
      <h2 className="font-bold text-xl flex justify-between">
        AI Interview Section
        <span className="gap-2 items-center flex">
          <Timer />
          {formatTime(timer)}
        </span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mt-5">
        <div className="bg-white h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center">
          <div className="relative">
            {!activeUser && (
              <span className="absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping" />
            )}
            <Image
              src="/GAMBAR.png"
              alt="GAMBAR"
              width={100}
              height={100}
              className="w-[60px] h-[60px] rounded-full object-cover"
            />
          </div>
          <h2>AI Recruiter</h2>
        </div>

        <div className="bg-white h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center">
          <div className="relative">
            {activeUser && (
              <span className="absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping" />
            )}
            <h2 className="text-2xl bg-blue-500 text-white p-3 rounded-full px-5">
              {interviewInfo?.userName?.[0]}
            </h2>
          </div>
          <h2>{interviewInfo?.userName}</h2>
        </div>
      </div>

      <div className="flex items-center gap-5 justify-center mt-7">
        <Mic className="h-12 w-12 p-3 bg-gray-400 rounded-full cursor-pointer" />
        <AlertConfirmation stopInterview={stopInterview} setLoading={setLoading}>
          <Phone
            className={`h-12 w-12 p-3 rounded-full cursor-pointer ${
              loading ? 'bg-red-300 animate-spin' : 'bg-red-400'
            }`}
          />
        </AlertConfirmation>
      </div>

      <h2 className="text-sm text-gray-400 text-center mt-5">
        {isCallActive 
          ? 'Interview in progress...' 
          : loading 
            ? 'Generating feedback...' 
            : 'Click the phone icon to start the interview'}
      </h2>
    </div>
  )
}

export default StartInterview
