'use client'
import Image from "next/image";
import styles from "./page.module.css";
import { signIn, useSession } from "next-auth/react";
import Cooming from './ui/Cooming'


export default function Home() {
  const { data: session, status } = useSession();
  //console.log("session, ", session)

  return (
    <>
      <Cooming/>
    </>
  );
}
