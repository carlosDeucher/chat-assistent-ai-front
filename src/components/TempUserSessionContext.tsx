"use client"

import React, { createContext, useEffect, useState } from 'react'
import ApiService from "../services/ApiService"

export const TempUserSessionContext = createContext({})

export default function TempUserSessionProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [tempUserSession, setTempUserSession] = useState<string>()

  useEffect(() => {
    authenticateSession()
  }, [])

  async function authenticateSession() {
    const _tempUserSession = window.sessionStorage.getItem("temp-user-session")

    if (_tempUserSession) {
      setTempUserSession(_tempUserSession)
      return
    }

    const { data } = await ApiService.post("/authenticate-session")
    const accessToken = data.data.accessToken
    window.sessionStorage.setItem("temp-user-session", accessToken)
    setTempUserSession(accessToken)
  }

  return (
    <TempUserSessionContext.Provider value={{ tempUserSession }}>
      {children}
    </TempUserSessionContext.Provider>
  )
}
