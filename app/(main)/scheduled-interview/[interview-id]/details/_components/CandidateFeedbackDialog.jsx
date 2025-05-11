import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  
  import { Button } from '@/components/ui/button'
  import moment from 'moment'
import { Progress } from '@/components/ui/progress'

function CandidateFeedbackDialog({candidate}) {
    const feedback=candidate?.feedback?.umpanBalik
  return (
    <Dialog>
  <DialogTrigger asChild>
    <Button variant='outline'>View Report</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Feedback</DialogTitle>
      <DialogDescription asChild>
        <div className='mt-5'>
            <div className='flex justify-between items-center'>
                <div className='flex items-center gap-5'>
                          <h2 className='bg-yellow-300 font-bold rounded-full p-3 px-5'>{candidate.userName?.[0]}</h2>
                          <div>
                            <h2 className='font-bold'>{candidate?.userName}</h2>
                            <h2 className='text-sm text-gray-500'>{candidate?.userEmail}</h2>
                          </div>
                          </div>
                          <div className='flex gap-3 items-center'>
                            <h2 className='text-green-600 text-2xl font-bold'>{feedback?.penilaian?.keseluruhan}</h2>
                            
                </div>
                </div>
                <div className='mt-5'>
                    <h2 className='font-bold'>Skills Assesment</h2>
                    <div className='mt-3 grid grid-cols-2 gap-8'>
                        <div>
                            <h2 className='flex justify-between'>Technical Skills<span>{feedback?.penilaian?.kemampuanTeknis}/10</span></h2>
                            <Progress value={feedback?.penilaian?.kemampuanTeknis*10} className='mt-1'/>
                        </div>
                        <div>
                            <h2 className='flex justify-between'>Communication<span>{feedback?.penilaian?.komunikasi}/10</span></h2>
                            <Progress value={feedback?.penilaian?.komunikasi*10} className='mt-1'/>
                        </div>
                        <div>
                            <h2 className='flex justify-between'>Problem Solving<span>{feedback?.penilaian?.pemecahanMasalah}/10</span></h2>
                            <Progress value={feedback?.penilaian?.pemecahanMasalah*10} className='mt-1'/>
                        </div>
                        <div>
                            <h2 className='flex justify-between'>Experience<span>{feedback?.penilaian?.pemecahanMasalah}/10</span></h2>
                            <Progress value={feedback?.penilaian?.pemecahanMasalah*10} className='mt-1'/>
                        </div>
                    </div>
                </div>
                <div className='mt-5'>
                    <h2>Performance Summary</h2>
                    <div className='p-5 bg-blue-200 my-3 rounded-md'>
                    <p>{feedback?.ringkasan }</p>
                    </div>
                   
            </div>
            <div className={`p-5 flex items-center justify-between rounded-md ${feedback?.rekomendasi=='TIDAK DIREKOMENDASIKAN'?'bg-red-100':'bg-green-100'}`}>
                <div>
                <h2 className={`font-bold ${feedback?.rekomendasi=='TIDAK DIREKOMENDASIKAN'?'text-red-700':'text-green-700'}`}>Recommendation Messsage :</h2>
                <p className={` ${feedback?.rekomendasi=='TIDAK DIREKOMENDASIKAN'?'text-red-500':'text-green-500'}`}>{feedback?.pesanRekomendasi}</p>
                </div>
                
            </div>
            <Button className={`mt-5 ${feedback?.rekomendasi=='TIDAK DIREKOMENDASIKAN'?'bg-red-700':'bg-green-700'}`}>Send</Button>
        </div>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

  )
}

export default CandidateFeedbackDialog