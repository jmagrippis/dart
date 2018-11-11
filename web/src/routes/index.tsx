import { lazy } from 'react'

import { withSuspense } from '../withSuspense'

const Home = lazy(() => import('./Home/Home'))
const Profile = lazy(() => import('./Profile/Profile'))
const User = lazy(() => import('./User/User'))

export const LazyHome = withSuspense(Home)
export const LazyProfile = withSuspense(Profile)
export const LazyUser = withSuspense(User)
