import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { getFeatured, getPosts2, getSecondFeatured } from '../services';
import { ClockIcon } from '@heroicons/react/outline';
import { StarIcon } from '@heroicons/react/solid';

export default function HeroCard() {
  const [featuredPost, setFeaturedPost] = useState([]);
  const [secondFeaturedPost, setSecondFeaturedPost] = useState([]);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getFeatured().then((result) => setFeaturedPost(result));
    getSecondFeatured().then((result) => setSecondFeaturedPost(result));
    getPosts2().then((result) => setPosts(result));
  }, []);

  return (
    <>
      <div className='container mx-auto grid grid-cols-1 gap-6 md:gap-12 lg:grid-cols-12 mt-4 md:mt-10 px-4'>
        <div className='relative col-span-1 lg:col-span-8 rounded-md'>
          {featuredPost.map((featured) => (
            <div>
              <span className='mb-6 overflow-hidden pb-80 shadow-md'>
                <img
                  src={featured.node.featuredImage.url}
                  alt={featured.node.title}
                  className='w-[1000px] h-[300px] md:h-[600px] brightness-50 hover:brightness-100 transition duration-500 ease rounded-lg object-cover shadow-lg hover:shadow-xl'
                />
              </span>
              <p className='absolute top-5 md:top-20 pl-6 pr-8 md:pl-16 md:pr-10 text-gray-100 font-poppin font-semibold text-2xl hover:text-light-blue md:text-6xl tracking-tight md:tracking-wider md:leading-tight'>
                {featured.node.title.length > 55
                  ? featured.node.title.substring(0, 55) + `...`
                  : featured.node.title}
              </p>
              <p className='absolute top-28 text-sm text-gray-200 p-4 md:p-0 pl-6 md:pl-16 md:pr-16 md:tracking-widest tracking-none md:text-2xl md:top-80'>
                {featured.node.excerpt}
              </p>
              <div className=' flex flex-row justify-between'>
                <div className='absolute bottom-6 md:bottom-12 text-white md:left-10 pl-6 pr-6 font-noto'>
                  <div className='flex flex-row space-x-1 items-center'>
                    <span className='text-green items-center font-bold'>
                      <ClockIcon className='w-3 h-3 md:w-5 md:h-5' />
                    </span>
                    <span className='text-xs md:text-lg mt-[2px] md:mt-0 pr-1 text-green  items-center font-bold'>
                      {moment(featured.node.createdAt).format('MMM DD, YYYY')}
                    </span>
                    <div className='flex flex-row'>
                      <StarIcon className='w-3 h-3 text-yellow-300' />
                      <StarIcon className='w-3 h-3 text-yellow-300' />
                      <StarIcon className='w-3 h-3 text-yellow-300' />
                      <StarIcon className='w-3 h-3 text-gray-400' />
                      <StarIcon className='w-3 h-3 text-gray-400' />
                    </div>
                  </div>
                </div>
                <div className='absolute text-white bottom-6 md:bottom-12 right-6 md:right-10  pl-6 justify-items-end'>
                  <span className='bg-light-blue hover:bg-orange hover:text-dark-blue transition duration-300 ease p-2 outline-none md:p-3  text-dark-blue text-center rounded-lg px-4 text-xs md:text-sm font-semibold md:font-bold font-noto md:px-10'>
                    Learn More
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className='hidden md:block col-span-1 lg:col-span-4'>
          <div className='flex flex-row justify-between items-center mb-8 md:mb-10 border-b border-gray-200 pb-5'>
            <span className='font-medium font-montserrat text-dark-blue text-2xl'>
              New
            </span>
            <span className='text-dark-blue tracking-wider'>view all</span>
          </div>

          <div className='flex flex-col md:space-y-10 space-y-6 pr-4'>
            {posts.map((post) => (
              <div className='flex flex-col border-l-2 pl-4 border-orange'>
                <span className='text-md md:text-lg text-gray-600 hover:text-orange transition duration-500 ease'>
                  {post.node.title}
                </span>
                <div className='flex flex-row space-x-1 space-y-1 items-center'>
                  <span className='text-gray-400'>
                    <ClockIcon className='w-3 h-3 md:w-5 md:h-5' />
                  </span>
                  <span className='text-gray-400 text-sm'>
                    {moment(post.node.createdAt).format('MMM DD YYYY')}
                  </span>
                </div>
              </div>
            ))}
            {/* This is for the Last Blog post on the Hero Card. It is the second to the last Sticky Post from the Database */}
            <div className='hidden md:block flex-col'>
              {secondFeaturedPost.map((secPost) => (
                <div className='flex flex-col space-y-2'>
                  <img
                    src={secPost.node.featuredImage.url}
                    className='h-[200px] object-cover rounded-lg'
                  />
                  <span className='text-xl  text-orange'>
                    {secPost.node.title}
                  </span>
                  <span>
                    <Link href={`/post/${secPost.node.slug}`}>
                      <a className='hover:text-gray-600 text-sm font-popping transition duration-500 ease'>
                        {secPost.node.excerpt.length > 100
                          ? secPost.node.excerpt.substring(0, 100) + `...`
                          : secPost.node.excerpt}
                      </a>
                    </Link>
                    <Link href={`/post/${secPost.node.slug}`}>
                      <a className='cursor-pointer text-orange justify-items-end'>
                        Read More
                      </a>
                    </Link>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
