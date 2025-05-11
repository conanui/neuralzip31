import React from 'react'
import Image from 'next/image'

function InterviewHeader() {
  return (
    <div className='p-4 shadow-sm shadow-gray-500'>
        <Image src={'/logo.jpeg'} alt='logo' width={200} height={100} className='w-[140px]' />
    </div>
  )
}

export default InterviewHeader