"use client"
import React, { useContext, useEffect } from 'react'
import InterviewHeader from '../_components/InterviewHeader'
import Image from 'next/image'
import { Clock, Info, Loader2Icon, Video } from 'lucide-react'
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import { useParams } from 'next/navigation'
import { supabase } from "@/services/supabaseClient";
import { useState } from 'react'
import { toast } from 'sonner'
import { InterviewDataContext } from '@/context/InterviewDataContext'
import { useRouter } from 'next/navigation'

function Interview() {
  const {interview_id} = useParams();
  console.log(interview_id);
  const [interviewData, setInterviewData]= useState();
  const [userName, setUserName]= useState();
  const [userEmail, setUserEmail]=useState();
  const [loading,setLoading]=useState(false);
  const {interviewInfo,setInterviewInfo}=useContext(InterviewDataContext);
  const router=useRouter();

  useEffect(()=>{
    interview_id&& GetInterviewDetails();

  },[interview_id])
  const GetInterviewDetails=async()=>{
    setLoading(true);
    try{
    let { data: Interviews, error } = await supabase
  .from('Interviews')
  .select("jobPosition,jobDescription,duration,type")
  .eq('interview_id', interview_id)
  setInterviewData(Interviews[0]);
  setLoading(false);
  if(Interviews.length==0)
  {
    toast('incorrect interview link')
     return;
  }
  
  }
  catch(e)
  {
    setLoading(false);
    toast('incorrect interview link')
  }
  
    

  }

  const onJoinInterview=async()=>{
  setLoading(true);
    let { data: Interviews, error } = await supabase
  .from('Interviews')
  .select('*')
  .eq('interview_id', interview_id)
  console.log(Interviews[0]);
  setInterviewInfo({
    userName:userName,
    userEmail:userEmail,
    interviewData:Interviews[0]

  });
  router.push('/interview/'+interview_id+'/start')
  setLoading(false);


  }
  return (
    <div className='px-10 md:px-28 lg:px-48 xl:px-64 mt-16 '>
        <div className='flex flex-col items-center 
        justify-center border rounded-lg bg-white
        p-7 lg:px-32 xl:px-52'>
            <Image src={'/logo.jpeg'} alt='logo' width={200} height={100} className='w-[140px]' />
            <h2 className='mt-3'>AI Powered Interview Platform</h2>
            <Image src={'/login.jpeg'} alt='login' width={500} height={500} className='w-[280px] my-6' />
            <h2 className='font-bold text-xl mt-3'>{interviewData?.jobPosition}</h2>
            <h2 className='flex gap-2 items-center text-gray-500 mt-3'><Clock className='h-4 w-4'/>{interviewData?.duration}</h2>
            <div className='w-full'>
              <h2>Enter Your Full Name</h2>
              <Input placeholder='e.g. Donald Trump' onChange={(event)=>setUserName(event.target.value)}/>
            </div>

            <div className='w-full'>
              <h2>Enter Your Email</h2>
              <Input placeholder='e.g. pepek@gmail.com' onChange={(event)=>setUserEmail(event.target.value)}/>
            </div>


            <div className='p-3 flex bg-blue-100 rounded-lg mt-4'>
              <Info className='text-gray-500'/>
            <div>
              <h2>Before you begin</h2>
              <ul>
                <li>Check your microphone and camera</li>
                <li>Ensure you have a stable internet connection</li>
                <li>Find a quite place for interview</li>
              </ul>
            </div>
            </div>
            <Button disabled={loading||!userName} className='mt-5 w-full font-bold'
            onClick={()=>onJoinInterview()}><Video/>{loading&&<Loader2Icon/>}Join Interview</Button>
        </div>
    </div>
  )
}

export default Interview