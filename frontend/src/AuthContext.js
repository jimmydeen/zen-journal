import { createContext, useContext } from "react";

export const AuthContext = createContext(null)

export function useAuthContext() {
  const aC = useContext(AuthContext)
  
  if (aC === undefined) {
    throw new Error('useAuthContext must be used within an AuthContext')
  }
  return aC
}