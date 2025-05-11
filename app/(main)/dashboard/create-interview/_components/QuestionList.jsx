import { Button } from "@/components/ui/button";
import { useUser } from '@/app/provider'; // atau wherever your custom useUser is exported from

import { supabase } from "@/services/supabaseClient";

import axios from 'axios';
import { Loader2Icon } from 'lucide-react';
import React, { use } from 'react'
import { useEffect, useState} from 'react'
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import QuestionListContainer from "./QuestionListContainer";
import { Loader2 } from "lucide-react";

function QuestionList({formData, onCreateLink}) {
  const [loading,setLoading]=useState(true);
  const [questionList,setQuestionList]=useState();
  const {user}=useUser();
  const [saveLoading,setSaveLoading]=useState(false);
    useEffect(()=>{
      if(formData){
        GenerateQuestionList();
      }
    },[formData])

    const onFinish=async()=>{
      setSaveLoading(true);
      const interview_id=uuidv4();
      const { data, error } = await supabase
  .from('Interviews')
  .insert([
    { 
      ...formData,
      questionList:questionList,
      userEmail:user?.email,
      interview_id:interview_id
     },
  ])
  .select()
  
  setSaveLoading(false);
  onCreateLink(interview_id)


  


    }
    
    const GenerateQuestionList=async ()=>{
        setLoading(true);
        /*try{
        const result=await axios.post('/api/ai-model',{
          ...formData
        })
        console.log(result.data.content);
        const Content=result.data.content;
        const FINAL_CONTENT=Content.replace('```json','').replace('```','')
        setQuestionList(JSON.parse(FINAL_CONTENT)?.interviewQuestions);
        setLoading(false);
        }
      
      catch(e){
        toast('Server error, please try again!')
        setLoading(false);
      }*/
        try {
          const result = await axios.post('/api/ai-model', {
            ...formData
          });
      
          console.log('RAW:', result.data.content);
      
          const match = result.data.content.match(/```json\s*([\s\S]*?)\s*```/);
      
          if (!match) {
            toast('Gagal mengenali format jawaban dari AI');
            setLoading(false);
            return;
          }
      
          const FINAL_CONTENT = match[1];
      
          try {
            const parsed = JSON.parse(FINAL_CONTENT);
            setQuestionList(parsed?.interviewQuestions || []);
          } catch (e) {
            console.error('JSON parsing error:', e);
            toast('Gagal parsing JSON dari AI!');
          }
      
          setLoading(false);
        } catch (e) {
          toast('Server error, please try again!');
          setLoading(false);
        }
        
    }


  return (
    <div>
      {loading&&<div
      className='p-5 bg-yellow-300 rounded-xl border border-gray-100 flex gap-5 items-center'>
        <Loader2Icon className='animate-spin'/>
        <div>
          <h2 className='font-medium'>Generating Interview Questions</h2>
          <p >Our Ai is crafting personalized question based on your job position</p>
        </div>
        
        </div>
        }
         {questionList?.length>0&&
         <div>
          <QuestionListContainer questionList={questionList}/>
        </div>}
        <div className='flex justify-end mt-10'>
          <Button onClick={()=>onFinish()} disabled={saveLoading} >
            {saveLoading&&<Loader2 className='animate-spin'/>}
            
            Create Interview Link & Finish</Button>
        </div>
    </div>
  )

}


export default QuestionList