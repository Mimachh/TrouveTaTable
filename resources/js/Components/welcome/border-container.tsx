import React from 'react'

const BorderContainer = ({children} : {children: React.ReactNode}) => {
  return (
    <div
    className=" border-welcomePrimary/20 w-full p-1 border-2 rounded-2xl"
    >{children}</div>
  )
}

export default BorderContainer