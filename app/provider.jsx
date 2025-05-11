'use client'
import { UserDetailContext } from '@/context/UserDetailContext';
import { supabase } from '@/services/supabaseClient'
import React, { useEffect, useState } from 'react'
import { useContext } from 'react';


function Provider({children}) {

    const [user, setUser] = useState();
    useEffect(()=>{
        CreateNewUser();

    },[])
    /*const CreateNewUser = async () => {
        supabase.auth.getUser().then(async({data:{user}})=>{
            let { data: Users, error } = await supabase
            .from('Users')
            .select("*")
            .eq('email', user?.email)

            console.log(Users)
            if (Users.length ==0){
                const { data, error } =await supabase.from("Users")
                .insert([
                    {
                        name:user?.user_metadata?.name,
                        email:user?.email,  
                        picture:user?.user_metadata?.picture
                    }
                ])
                console.log(data);
                setUser(data);
                return;
            }
            setUser(Users[0]);
        })
    } */

        const CreateNewUser = async () => {
            const { data: { user }, error: userError } = await supabase.auth.getUser();
          
            console.log("USER:", user); // Lihat isi user-nya di console
          
            if (!user) {
              console.error("No user found", userError);
              return;
            }
          
            const { data: Users, error: fetchError } = await supabase
              .from('Users')
              .select("*")
              .eq('email', user.email);
          
            if (fetchError) {
              console.error("Error fetching users", fetchError);
              return;
            }
          
            if (Users.length === 0) {
              // Ambil name dan picture dari berbagai kemungkinan field
              const identityData = user.identities?.[0]?.identity_data;
          
              const name = identityData?.name || user.user_metadata?.name || "Anonymous";
              const picture = identityData?.picture || user.user_metadata?.picture || "";
          
              const { data: insertedUser, error: insertError } = await supabase
                .from("Users")
                .insert([
                  {
                    name,
                    email: user.email,
                    picture
                  }
                ])
                .select()
                .single(); // <-- wajib agar dapat hasil data-nya langsung
          
              if (insertError) {
                console.error("Error inserting user", insertError);
                return;
              }
          
              console.log("Inserted user:", insertedUser);
              setUser(insertedUser);
            } else {
              setUser(Users[0]);
            }
          };
          
  return (
    <UserDetailContext.Provider value={{user,setUser}}>
    <div>{children}</div>
    </UserDetailContext.Provider>
  )
} 
 

export default Provider

export const useUser=() => {
    const context = useContext(UserDetailContext);
    return context;

}