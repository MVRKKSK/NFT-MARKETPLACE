import React from 'react'
import Image from 'next/image'

const Profile = ({img}) => {
  return (
    <div className='mt-8 flex flex-col justify-center items-center'>
        <div className='relative border-green-100 w-40 h-40 border-8 rounded-full' >
        <Image src="/creator1.png" width={200} height={200} alt="" className='absolute rounded-full'/>
        </div>

    </div>
  )
}

export default Profile