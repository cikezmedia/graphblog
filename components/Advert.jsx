import Image from 'next/image';
import React from 'react';

export default function AdvertCard() {
  const imageSlide = [
    {
      name: '/image/img1.jpg',
    },
    {
      name: '/image/img2.jpg',
    },
    {
      name: '/image/img3.jpg',
    },
    {
      name: '/image/img4.jpg',
    },
    {
      name: '/image/img5.jpg',
    },
  ];
  return (
    <>
      <div className='hidden md:block bg-gradient-to-l from-gray-100 to-light-blue p-6 mt-4 md:mt-10'>
        <h3 className='text-2xl mt-4 mb-6 md:text-4xl text-dark-blue font-montserrat font-medium mx-auto items-center text-center'>
          Latest Gallery
        </h3>
        <div className='hidden md:block'>
          <div className='flex flex-col md:flex-row justify-between mx-auto items-center px-4 mt-10 mb-10'>
            {imageSlide.map((imgs, index) => (
              <div key={index} className='px-2'>
                <Image
                  src={imgs.name}
                  width={320}
                  height={220}
                  alt='Advert banner'
                  className='transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-100 shadow-lg rounded-lg object-cover'
                  priority
                />
              </div>
            ))}
          </div>
        </div>
        <div className='md:hidden mb-6'>
          <Image
            src='/image/img5.jpg'
            width={500}
            height={250}
            alt='advert banner'
            className='h-[250px] w-[500px] rounded-lg object-cover'
            priority
          />
        </div>
      </div>
    </>
  );
}
