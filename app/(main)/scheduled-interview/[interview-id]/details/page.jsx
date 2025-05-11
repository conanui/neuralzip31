/*'use client'
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { supabase } from '@/services/supabaseClient';
import { useUser } from '@/app/provider';
import InterviewDetailContainer from './_components/InterviewDetailContainer';
import { useState } from 'react';


function InterviewDetail() {
    const {interview_id}=useParams();
    const {user}=useUser();
    
    
    useEffect(()=>{
        user&&GetInterviewDetail();

    },[user])
    const GetInterviewDetail=async()=>{
        const result = await supabase.from('Interviews')
                .select('jobPosition,duration,interview_id,interview-feedback(userEmail)')
                .eq('userEmail',user?.email)
                .eq('interview_id',interview_id)
                console.log(result);
                
        
    }
  return (
    <div className='mt-5'>
        <h2 className='font-bold text-2xl'>Interview Detail</h2>
        <InterviewDetailContainer/>
    </div>
  )
}

export default InterviewDetail

*/

/*'use client'

import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { supabase } from '@/services/supabaseClient';
import { useUser } from '@/app/provider';
import InterviewDetailContainer from './_components/InterviewDetailContainer';

export default function Page() {
    const params = useParams();
    const interview_id = params['interview-id']; // Mengambil parameter dari path
    const { user } = useUser();
    const [interviewData, setInterviewData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        if (user) {
            getInterviewDetail();
        }
    }, [user, interview_id]);
    
    const getInterviewDetail = async () => {
        try {
            setLoading(true);
            // Perbaikan format relasi nama tabel dengan tanda kutip ganda
            const { data, error } = await supabase
                .from('Interviews')
                .select(`
                    jobPosition,
                    duration,
                    interview_id,
                    "interview-feedback"(userEmail)
                `)
                .eq('userEmail', user?.email)
                .eq('interview_id', interview_id);
                
            if (error) {
                throw error;
            }
            
            console.log("Interview data:", data);
            setInterviewData(data);
        } catch (err) {
            console.error("Error fetching interview details:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='mt-5'>
            <h2 className='font-bold text-2xl'>Interview Detail</h2>
            {loading ? (
                <p>Loading interview details...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                <InterviewDetailContainer data={interviewData} />
            )}
        </div>
    );
}

*/



'use client'

import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { supabase } from '@/services/supabaseClient';
import { useUser } from '@/app/provider';
import InterviewDetailContainer from './_components/InterviewDetailContainer';
import CandidatList from './_components/CandidatList';

export default function Page() {
    const params = useParams();
    const interview_id = params['interview-id']; // Mengambil parameter dari path
    const { user } = useUser();
    const [interviewDetail,setInterviewDetail]=useState();
    
    useEffect(() => {
        if (user) {
            getInterviewDetail();
        }
    }, [user, interview_id]);
    
    const getInterviewDetail = async () => {
        // Tidak melakukan destructuring hasil query
        const result = await supabase
            .from('Interviews')
            .select(`jobPosition,jobDescription,type,questionList,duration,interview_id,created_at
                ,"interview-feedback"(userEmail,userName,feedback,created_at)`)
            .eq('userEmail', user?.email)
            .eq('interview_id', interview_id)

            setInterviewDetail(result?.data[0]);



            
        // Log seluruh hasil query
        console.log(result);
    };







    return (
        <div className='mt-5'>
            <h2 className='font-bold text-2xl'>Interview Detail</h2>
            <InterviewDetailContainer interviewDetail={interviewDetail}/>
            <CandidatList candidateList={interviewDetail?.['interview-feedback']}/>

            
        </div>
    );
}


