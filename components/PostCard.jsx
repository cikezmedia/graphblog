import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { getPosts } from '../services';
import { Pagination } from '../components';
import { paginate } from '../utils/paginate';
import { MdOutlineStickyNote2 } from 'react-icons/md';
import Link from 'next/link';
import { BiTime } from 'react-icons/bi';
import moment from 'moment';

const myLoader = ({ src, width, quality }) => {
  return `https://media.graphassets.com/${src}?w=${width}&q=${quality || 75}`;
};

export default function PostCard() {
  const [posts, setPosts] = useState([]);

  const pageSize = 2;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getPosts().then((result) => setPosts(result));
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatePosts = paginate(posts, currentPage, pageSize);

  return (
    <>
      <div
        className={`container mx-auto bg-blue-100 md:bg-white mt-5 md:mt-0 justify-between items-center pb-16`}
      >
        <div className='flex flex-col gap-3 text-center items-center mx-auto'>
          <span className='text-dark-blue font-montserrat text-2xl font-medium pt-8 border-b pb-2 border-dark-blue md:text-4xl '>
            Latest Blog
          </span>
          <span className='text-sm md:text-lg text-gray-400'>
            Read our latest blog post below
          </span>
        </div>
        <div className='grid grid-cols-1 mx-auto justify-between px-4 md:px-36 before: gap-x-10 md:gap-x-20 gap-y-10 pt-10 lg:grid-cols-2'>
          {paginatePosts.map((post, index) => (
            <div className='bg-blue-50 rounded-xl relative' key={index}>
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
        <Pagination
          items={posts.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
}
