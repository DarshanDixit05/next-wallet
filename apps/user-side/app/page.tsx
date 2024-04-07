"use client"

import {AppBar} from "@repo/ui/AppBar"
import { signIn, signOut, useSession } from "next-auth/react";

export default function Page(): JSX.Element {
  const session = useSession()

  
  return (
   <>
    <AppBar onSignIn={signIn} onSignOut={signOut} user={session.data?.user}/>
   </>
  );
}
