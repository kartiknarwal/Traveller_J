import React from 'react'
import { Button } from '../ui/button'
import {Link} from 'react-router-dom'

function Hero() {
  return (
    <div className='flex flex-col items-center mx-56 gap-9'>
      <h1  className='font-extrabold text-[50px] text-center mt-16'>
        <span className='text-[#f56551]'>Discover Your Next Adventure with AI: </span>
          Personalized Itenaries at Your Fingertips</h1>

          <p className='text-xl text-gray-500 text-center'>
            Your personal trip planner and travel currator creating custom itinearies tailored to your Budget.
            </p>

            <Link to ={'/create-trip'}>
          <Button >Get Started ,it's free</Button>
          </Link>

          <img src='/landing.png' className='-mt-20' alt="" />

    </div>
  )
}

export default Hero
Hero