'use client'
import { SessionProvider } from "next-auth/react";

function Providers({ children, sessions }) {
  return <SessionProvider session={sessions}>{children}</SessionProvider>;
}

export default Providers;
