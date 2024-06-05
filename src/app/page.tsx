"use client";
import { SessionProvider } from "next-auth/react";
import Auth from "../components/auth";
import { remult } from "remult";

export default function Home() {
  return (
    <div>
      <h1>todos</h1>
      <SessionProvider>
        <Auth />
      </SessionProvider>
    </div>
  );
}
