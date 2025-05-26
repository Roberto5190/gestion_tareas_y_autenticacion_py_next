"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useEffect } from "react";

export default function Home() {


  return (
    <>
      <Link href="/login">Login</Link>
      <Link href="/register">Register</Link>
    </>
  )
}
