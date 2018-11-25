import { createContext } from 'react'
import { WebAuth } from 'auth0-js'

export const AuthContext = createContext<WebAuth | null>(null)

export const { Provider: AuthProvider, Consumer: AuthConsumer } = AuthContext
