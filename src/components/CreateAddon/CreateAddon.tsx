import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext.ts'

type Props = {};

export default function CreateAddon({ }: Props) {
  const { loggedInUser } = useContext(AuthContext);
  return (
    <div>CreateAddon</div>
  )
}