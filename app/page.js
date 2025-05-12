
 
"use client"; 

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation"; 

export default function Home() {
  const router = useRouter();

  const handleSubscribe = () => {
    router.push("/auth"); 
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2></h2>
      <Button  className='text-xl py-4 px-8 w-full max-w-sm' onClick={handleSubscribe}>Start</Button>
    </div>
  );
}
