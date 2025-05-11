'use client'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenuButton,
  } from "@/components/ui/sidebar"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

  import Image from "next/image"
import { SideBarOptions } from "@/services/Constants"
import { SidebarMenu, SidebarMenuItem } from '@/components/ui/sidebar'


import Link from "next/link"
import { usePathname } from "next/navigation"
  
  export function AppSidebar() {
    const path=usePathname();
    console.log(path);
    return (
      <Sidebar>
        <SidebarHeader className="flex items-center mt-5">
            <Image src={'/logo.jpeg'} alt='logo' width={200} height={100} className=" w-[150px]"/>
            <Button className="w-full mt-5"><Plus/>Create New Interview</Button>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarContent>
                <SidebarMenu>
                    {SideBarOptions.map((option,index)=>(
                        <SidebarMenuItem key={index} className='p-1'>
                            <SidebarMenuButton asChild className={`p-5 ${path==option.path&& 'bg-blue-100'}`}>
                                <Link href={option.path}>
                                <option.icon className={` ${path==option.path&& 'text-blue-500'} `}/>
                                <span className={`text-[16px] font-medium ${path==option.path&& 'text-blue-500'} `}>{option.name}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
          </SidebarGroup >
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
    )
  }
  