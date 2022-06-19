import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { getPosts } from '../services';
import { MdOutlineStickyNote2 } from 'react-icons/md';
import Link from 'next/link';
import { BiTime } from 'react-icons/bi';
import moment from 'moment';

const myLoader = ({ src, width, quality }) => {
  return `https://media.graphassets.com/${src}?w=${width}&q=${quality || 75}`;
};

export default function PostCard() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts().then((result) => setPosts(result));
  }, []);

  return (
    <>
      <div className='container mx-auto justify-between items-center'>
        <span className='flex flex-col text-dark-blue font-montserrat text-2xl font-medium pt-8 md:text-4xl text-center items-center mx-auto'>
          Latest Blog
        </span>
        <div className='grid grid-cols-1 mx-auto justify-between px-4 md:px-36 before: gap-x-10 md:gap-x-20 gap-y-10 pt-10 lg:grid-cols-2'>
          {posts.map((post, index) => (
            <div className='bg-gray-100 rounded-xl relative' key={index}>
              <div className=''>
                <Image
                  loader={myLoader}
                  height={300}
                  width={600}
                  src={post.node.featuredImage.url}
                  className='object-cover rounded-t-xl'
                  alt='featured image'
                  priority
                />
                <span className='absolute mx-auto items-center flex flex-row top-40 md:top-64 right-3 space-x-1'>
                  <span className=''>
                    <BiTime className='text-white w-3 h-3 md:w-4 md:h-4' />
                  </span>
                  <span className='text-white text-sm'>
                    {moment(post.node.createdAt).format('MMM DD, YY')}
                  </span>
                </span>
              </div>
              <div className='flex flex-col space-y-2 p-4'>
                <span className='flex flex-row items-center space-x-1'>
                  <span className='text-gray-400'>
                    <MdOutlineStickyNote2 className='w-4 h-4' />
                  </span>
                  <span className='text-gray-600 uppercase'>
                    {post.node.author.name}
                  </span>
                  <span className='text-gray-400 pr-2 pl-2'>in</span>
                  <span className='flex'>
                    {post?.node?.categories?.map((catname, index) => (
                      <span className='flex flex-row pr-2' key={index}>
                        <span className='bg-light-blue text-dark-blue hover:bg-orange hover:text-white transition text-sm font-semibold font-roboto duration-300 ease-in-out rounded-lg px-2 cursor-pointer'>
                          <Link href={`categories/${catname.slug}`} passHref>
                            <a>{catname.name}</a>
                          </Link>
                        </span>
                      </span>
                    ))}
                  </span>
                </span>
                <span className='font-poppin text-xl'>{post.node.title}</span>
                <span className='text-gray-500 text-sm'>
                  {post.node.excerpt}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
