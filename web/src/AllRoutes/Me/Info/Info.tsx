import React, { Fragment } from 'react'

interface Props {
  email: string
  displayName: string
  username: string | null
}

export const Info = ({ username, email, displayName }: Props) => (
  <div>
    {username ? (
      <Fragment>
        <div>
          <div>email:</div>
          <div data-test="email">{email}</div>
        </div>
        <div>
          <div>username:</div>
          <div data-test="username">{username}</div>
        </div>
        <div>
          <div>Display name:</div>
          <div data-test="displayName">{displayName}</div>
        </div>
      </Fragment>
    ) : (
      <div>You have not created your Digital Auto Response Tool yet!</div>
    )}
  </div>
)
