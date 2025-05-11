'use client'
import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { supabase } from '@/services/supabaseClient'
import Provider from '../provider'

function Login() {

    const signInWithGoogle = async() => {
        const {error} = await supabase.auth.signInWithOAuth({
            provider: 'google'  
        })
        if (error)
        {
            console.error('Error:', error.message)
        }
    }
  return (
    <Provider>
    <div className='flex flex-col items-center justify-center h-screen'>
        <div className='flex flex-col items-center border rounded-2xl p-8'>
            <Image src={'/logo.jpeg'} alt="logo" width={400} height={100} className='w-[180px]' />
            <div className='flex flex-col items-center '>
                <Image src={'/login.jpeg'} alt="login" width={400} height={600}  className="w-[400px] h-[250px] rounded-2xl" />
                <h2 className='text-2xl font-bold text-center mt-5'>Welcome to NeuralZip</h2>
                <p className='text-gray-500 text-center'>Sign In with Google Authentication</p>
                <Button className='mt-7 w-full '
                onClick={signInWithGoogle}> Login with Google </Button>
            </div>
        </div>
    </div>
    </Provider>
    
    
  )
}

export default Login