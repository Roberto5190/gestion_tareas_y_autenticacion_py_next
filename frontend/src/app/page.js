"use client";
import { UserContext } from "@/context/UserContext";
import Link from "next/link";
import { useContext } from "react";

export default function Home() {
  const { user } = useContext(UserContext)
  
  return (
    <> 
      { user ? 
        `Bienvenido ${user.username}` : 
      <>
        <Link href="/login">Login</Link>
        <Link href="/register">Register</Link>
      </>
      }
      
      
    </>
  )
}
