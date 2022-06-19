import Image from 'next/image';
import React from 'react';
import { RiFacebookFill } from 'react-icons/ri';
import {
  AiOutlineTwitter,
  AiOutlineInstagram,
  AiOutlineGithub,
} from 'react-icons/ai';

export default function Footer() {
  const d = new Date();
  let year = d.getFullYear();
  return (
    <>
      <div className='bg-gray-900 p-6'>
        <div className='container flex flex-col md:flex-row justify-between mx-auto md:px-14 space-y-4 md:space-y-0 items-center'>
          <div className='text-white md:w-1/3'>
            <Image src='/logo-white.png' width={120} height={30} />
          </div>
          <div className='flex text-white space-x-3 justify-center text-center mx-auto items-center md:w-1/3'>
            <RiFacebookFill className='w-6 h-6' />
            <AiOutlineTwitter className='w-6 h-6' />
            <AiOutlineInstagram className='w-6 h-6' />
            <AiOutlineGithub className='w-6 h-6' />
          </div>
          <div className='text-white md:w-1/3'>
            <div className='space-x-2 md:justify-end mx-auto items-center text-center md:text-right'>
              <span>&copy; 2022</span>
              <span className='text-orange'>GraphNews Inc</span>
              <span className=''>All Rights Reserved</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
