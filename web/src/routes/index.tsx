import { lazy } from 'react'

import { withSuspense } from '../withSuspense'

const Home = lazy(() => import('./Home/Home'))
const Me = lazy(() => import('./Me/Me'))
const User = lazy(() => import('./User/User'))
const Auth = lazy(() => import('./Auth/Auth'))

export const LazyHome = withSuspense(Home)
export const LazyMe = withSuspense(Me)
export const LazyUser = withSuspense(User)
export const LazyAuth = withSuspense(Auth)
