import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Transition } from '@headlessui/react';
import { SearchIcon, MenuAlt3Icon, XIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';

export default function Header() {
  const [active, setActive] = useState(false);
  const { pathname } = useRouter();
  const categories = [
    {
      name: 'Home',
      slug: '/',
    },
    {
      name: 'Popular',
      slug: '/popular',
    },
    {
      name: 'Latest',
      slug: '/latest',
    },
  ];

  const navMenu = () => {
    setActive(!active);
  };

  return (
    <>
      <div className='flex items-center mx-auto dark:bg-gray-900'>
        {/* desktop */}
        <div className='hidden container justify-between mx-auto px-4 mt-6 border-b pb-6 border-light-blue md:flex flex-row'>
          <div>
            <Link href='/'>
              <Image
                src='/logo.png'
                width={130}
                height={30}
                alt='Graph News logo'
                className='cursor-pointer'
              />
            </Link>
          </div>
          <div className='space-x-8 pb-1'>
            {categories.map((category) => (
              <Link href={category.slug} key={category.name}>
                <a
                  className={`font-semibold font-montserrat md:text-lg ${
                    pathname == `${category.slug}`
                      ? 'text-green'
                      : 'text-dark-blue'
                  } cursor-pointer hover:text-green transition duration-500 ease `}
                >
                  {category.name}
                </a>
              </Link>
            ))}
          </div>
          <div className='pt-2'>
            <SearchIcon className='w-6 h-6 text-dark-blue' />
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className='block md:hidden'>
        <div className='flex justify-between mx-auto px-4 pt-6 border-b pb-6 border-light-blue'>
          <Link href='/'>
            <Image
              src='/logo.png'
              width={130}
              height={30}
              alt='Graph News logo'
              className='cursor-pointer'
            />
          </Link>
          <button onClick={navMenu} className=''>
            {active ? (
              <XIcon className='w-8 h-8 text-dark-blue ' />
            ) : (
              <MenuAlt3Icon className='w-8 h-8 text-dark-blue ' />
            )}
          </button>
        </div>
        {active ? (
          <div className='fixed left-0 top-0 z-10 w-full h-full bg-white ease-in-out duration-500'>
            <Transition
              show={active}
              enter='transition ease-out duration-100 transform'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='transition ease-in duration-75 transform'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <div className='flex justify-between mx-auto px-4 mt-6 border-b pb-6 border-light-blue'>
                <Link href='/'>
                  <Image
                    src='/logo.png'
                    width={130}
                    height={30}
                    alt='Graph News logo'
                    className='cursor-pointer'
                  />
                </Link>
                <button onClick={navMenu} className=''>
                  {active ? (
                    <XIcon className='w-8 h-8 text-dark-blue ' />
                  ) : (
                    <MenuAlt3Icon className='w-8 h-8 text-dark-blue ' />
                  )}
                </button>
              </div>
              <div className='flex flex-col items-center space-y-8  p-6 pt-36'>
                {categories.map((category) => (
                  <Link href={category.slug} key={category.name}>
                    <a
                      className={`font-semibold font-montserrat cursor-pointer hover:text-green transition duration-500 ease text-xl ${
                        pathname == `${category.slug}`
                          ? 'text-green bg-dark-blue p-2 rounded-lg px-24'
                          : 'text-dark-blue'
                      }`}
                      onClick={navMenu}
                    >
                      {category.name}
                    </a>
                  </Link>
                ))}
              </div>
            </Transition>
          </div>
        ) : (
          ''
        )}
      </div>
    </>
  );
}
