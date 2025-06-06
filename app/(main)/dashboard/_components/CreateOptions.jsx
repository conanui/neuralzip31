import React from 'react'
import { Video } from 'lucide-react'
import { Phone } from 'lucide-react'
import Link from 'next/link'

function CreateOptions() {
  return (
    <div className='grid grid-cols-2 gap-5'>
        < Link href={'/dashboard/create-interview'} className='bg-gray-200 border border-gray-200 rounded-lg p-5 cursor-pointer '>
        
            <Video className='p-3 bg-blue-50 rounded-lg h-12 w-12'/>
            <h2 className='font-bold'>Create New Interview</h2>
            <p>Create Ai Interview and schedule then with Candidates</p>

        </Link>
        < Link href={'/dashboard/create-interview'} className='bg-gray-200 border border-gray-200 rounded-lg p-5 '>
            <Phone className='p-3 bg-blue-50 rounded-lg h-12 w-12'/>
            <h2 className='font-bold'>Create Phone Screening Call</h2>
            <p>Schedule phone screening call with candidates</p>

        </Link>
    </div>
  )
}

export default CreateOptions