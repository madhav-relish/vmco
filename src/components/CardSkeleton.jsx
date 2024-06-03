import { Skeleton } from '@mantine/core'
import React from 'react'

const CardSkeleton = () => {
  return (
    <div className='flex flex-col'>
    <Skeleton classNames={{
        root: "w-40 md:w-60 h-36  md:h-60"
    }}/>
    <Skeleton classNames={{
        root: "h-10 mt-2 w-40 md:w-60"
    }}/>
    </div>
  )
}

export default CardSkeleton