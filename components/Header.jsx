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
      name: 'Blog',
      slug: '/blog',
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
      <div className='flex items-center mx-auto bg-white dark:bg-gray-900'>
        {/* desktop */}
        <div className='hidden container items-center justify-between mx-auto px-4 mt-6 border-b pb-6 border-light-blue dark:border-gray-900 md:flex flex-row'>
          <div>
            <Link href='/' passHref>
              <a>
                <Image
                  src='/logo-white.png'
                  width={130}
                  height={30}
                  alt='Graph News logo'
                  className='cursor-pointer'
                />
              </a>
            </Link>
          </div>
          <div className='flex flex-row items-center pt-2'>
            <div className='space-x-8 pb-1 pr-20'>
              {categories.map((category) => (
                <Link href={category.slug} key={category.name} passHref>
                  <a
                    className={`font-semibold font-montserrat md:text-lg ${
                      pathname == `${category.slug}`
                        ? 'text-green'
                        : 'text-dark-blue dark:text-white'
                    } cursor-pointer hover:text-green transition duration-500 ease `}
                  >
                    {category.name}
                  </a>
                </Link>
              ))}
            </div>
            <SearchIcon className='w-6 h-6 text-dark-blue cursor-pointer dark:text-white' />
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className='block md:hidden bg-white dark:bg-gray-900'>
        <div className='flex justify-between mx-auto px-4 pt-6 border-b pb-6 border-light-blue dark:border-gray-900'>
          <Link href='/' passHref>
            <a>
              <Image
                src='/logo-white.png'
                width={130}
                height={30}
                alt='Graph News logo'
                className='cursor-pointer'
              />
            </a>
          </Link>
          <button onClick={navMenu} className=''>
            {active ? (
              <XIcon className='w-8 h-8 text-dark-blue dark:text-white' />
            ) : (
              <MenuAlt3Icon className='w-8 h-8 text-dark-blue dark:text-white' />
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
                <Link href='/' passHref>
                  <a>
                    <Image
                      src='/logo.png'
                      width={130}
                      height={30}
                      alt='Graph News logo'
                      className='cursor-pointer'
                    />
                  </a>
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
                  <Link href={category.slug} key={category.name} passHref>
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
