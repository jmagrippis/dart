import React, { Suspense } from 'react'

export const withSuspense = <P extends object>(
  Component: React.ComponentType<P>
) => (props: P) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Component {...props} />
  </Suspense>
)
