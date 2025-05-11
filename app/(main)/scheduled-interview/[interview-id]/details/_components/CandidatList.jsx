
/*
import React from 'react';
import moment from 'moment';
import { Button } from '@/components/ui/button';
import CandidateFeedbackDialog from './CandidateFeedbackDialog';

function CandidatList({ candidateList }) {
  
  if (!Array.isArray(candidateList)) {
    return <p className="p-5 italic text-gray-500">No candidate feedback available.</p>;
  }

  return (
    <div className=''>
      <h2 className='font-bold my-5'>Candidates ({candidateList?.length})</h2>
      {candidateList?.map((candidate, index) => (
        <div key={index} className='p-5 flex gap-3 items-center rounded-lg bg-gray-200 mt-5 justify-between'>
          <div className='flex items-center gap-5'>
          <h2 className='bg-yellow-300 font-bold rounded-full p-3 px-5'>{candidate.userName?.[0]}</h2>
          <div>
            <h2 className='font-bold'>{candidate?.userName}</h2>
            <h2 className='text-sm text-gray-500'>Completed on: {moment(candidate?.created_at).format('MMM DD, yyyy')}</h2>
          </div>
          </div>
          <div className='flex gap-3 items-center'>
            <h2 className='text-green-600'>0/10</h2>
            <CandidateFeedbackDialog candidate={candidate}/>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CandidatList;
*/

import React from 'react';
import moment from 'moment';
import { Button } from '@/components/ui/button';
import CandidateFeedbackDialog from './CandidateFeedbackDialog';

function CandidatList({ candidateList }) {
  if (!Array.isArray(candidateList)) {
    return (
      <p className="p-5 italic text-gray-500">
        No candidate feedback available.
      </p>
    );
  }

  return (
    <div>
      <h2 className="font-bold my-5">
        Candidates ({candidateList?.length})
      </h2>
      {candidateList?.map((candidate, index) => {
        const feedback = candidate?.feedback?.umpanBalik;

        return (
          <div
            key={index}
            className="p-5 flex gap-3 items-center rounded-lg bg-gray-200 mt-5 justify-between"
          >
            <div className="flex items-center gap-5">
              <h2 className="bg-yellow-300 font-bold rounded-full p-3 px-5">
                {candidate.userName?.[0]}
              </h2>
              <div>
                <h2 className="font-bold">{candidate?.userName}</h2>
                <h2 className="text-sm text-gray-500">
                  Completed on:{' '}
                  {moment(candidate?.created_at).format('MMM DD, yyyy')}
                </h2>
              </div>
            </div>
            <div className="flex gap-3 items-center">
              <h2 className="text-green-600">
                {feedback?.penilaian?.keseluruhan ?? '-'} /10
              </h2>
              <CandidateFeedbackDialog candidate={candidate} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CandidatList;




