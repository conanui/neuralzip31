import React from 'react'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Calendar, Copy, List } from 'lucide-react'
import { Clock } from 'lucide-react'
import { Mail } from 'lucide-react'
import { Plus } from 'lucide-react'
import { toast } from 'sonner';
import Link from 'next/link'

function InterviewLink({interview_id,formData}) {
  const url=process.env.NEXT_PUBLIC_HOST_URL+'/'+interview_id
  const GetInterviewUrl=() => {
    
    return url;
  }
  const onCopyLink=async()=>{
    await navigator.clipboard.writeText(url);
    toast('Link Copied')

  }

  return (
    <div className='flex flex-col items-center justify-center mt-10'>
        <Image src={'/download.jpeg'} alt='download'
        width={200}
        height={200}
        className='w-[100px] h-[100px]'/>
        <h2 className='font-bold text-lg mt-4'>Your Ai Interview is Ready!</h2>
        <p className='mt-3'>Share this link with your candidates to start the interview process</p>
        <div className='w-full p-7 mt-6 rounded-lg bg-gray-200 '>
            <div className='flex justify-between items-center'>
                <h2 className='font-bold'>Interview Link</h2>
                <h2 className='p-1 px-2 text-blue-500  rounded-4xl'>Valid for 10 Days</h2>
               
            </div>
            <div className='mt-3 flex gap-3 items-center'>
                  <Input defaultValue={GetInterviewUrl()} disabled={true}/>
                  <Button onClick={()=>onCopyLink()}><Copy/>Copy Link</Button>
            </div>
            <hr className='my-5 h-[2px] bg-blue-600'/>
            <div className='flex gap-5'>
              <h2 className='text-sm flex gap-2 items-center'><Clock className='h-4 w-4'/>{formData?.duration}</h2>
              <h2 className='text-sm flex gap-2 items-center'><List className='h-4 w-4'/>10 question</h2>
              
            </div>

        </div>
        <div className='mt-7 bg-gray-300 p-5 rounded-lg w-full' >
          <h2 className='font-bold'>Share Via</h2>
          <div className=' flex gap-7 mt-2'>
          <Button variant={'outline'} ><Mail/>Email</Button>
          <Button variant={'outline'} ><Mail/>Slack</Button>
          <Button variant={'outline'} ><Mail/>Whatsapp</Button>

          </div>
        </div>
        <div className='flex w-full gap-5 justify-between mt-6'>
          <Link href={'/dashboard'} >
          <Button variant={'outline'}><ArrowLeft/>Back to Dashboard</Button>
          </Link>
          <Link href={'/create-interview'}>
          <Button><Plus/>Create New Interview</Button>
          </Link>
        </div>
    </div>
  )
}

export default InterviewLink