import React from 'react'
import { Navbar, USER_DASHBOARD } from "@/app/api/routes/route"
const HOMEPAGE = () => {
  return (
    <>
      <Navbar />
      <USER_DASHBOARD />
    </>
  )
}

export default HOMEPAGE
