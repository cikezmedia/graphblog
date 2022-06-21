import React, { useState, useEffect } from 'react';
import { getPosts } from '../../services';
import { Loading } from '../../components';
import Image from 'next/image';
import { MdOutlineStickyNote2, MdKeyboardArrowDown } from 'react-icons/md';
import { BsArrowRightShort, BsArrowLeftShort } from 'react-icons/bs';
import Link from 'next/link';
import { BiTime, BiSearchAlt } from 'react-icons/bi';
import moment from 'moment';
import Head from 'next/head';

const myLoader = ({ src, width, quality }) => {
  return `https://media.graphassets.com/${src}?w=${width}&q=${quality || 75}`;
};

const index = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(2);
  const [active, setActive] = useState(false);

  const allPages = Math.ceil(posts.length / itemsPerPage);

  const lastItem = currentPage * itemsPerPage;
  const firstItem = lastItem - itemsPerPage;
  const slicedPosts = posts.slice(firstItem, lastItem);

  const nextPage = () => {
    if (currentPage === allPages) {
      setCurrentPage(currentPage);
    } else {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage <= 1) {
      setCurrentPage(currentPage);
    } else {
      setCurrentPage(currentPage - 1);
    }
  };

  const setItems = (e) => {
    setItemsPerPage(Number(e.target.value));
    setActive(!active);
  };

  useEffect(() => {
    getPosts().then((result) => setPosts(result));
  }, []);

  // useEffect(() => {
  //   document.addEventListener('mousedown', () => {
  //     setActive(false);
  //   });
  // });

  const sortToggle = () => {
    setActive(!active);
  };
  return (
    <>
      <Head>
        <title>Our Blog</title>
        <link rel='icon' href='../favicon.png' />
      </Head>
      <div className='bg-light-blue p-4'>
        <div className='flex flex-col mx-auto items-center text-white text-4xl font-semibold pt-10 pb-10 font-montserrat'>
          Blog Posts
        </div>
      </div>

      <div className='container mx-auto justify-between items-center pb-16'>
        <div className='container flex px-4 pt-4 md:px-36 flex-row items-center justify-between mx-auto'>
          <div className='text-dark-blue'>
            <div class='relative inline-block text-left'>
              <div>
                <button
                  onClick={sortToggle}
                  type='button'
                  class='inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-light-blue'
                >
                  <span className='text-gray-600'>sort</span>
                  <span>
                    <MdKeyboardArrowDown className='text-gray-600 w-5 h-5' />
                  </span>
                </button>
              </div>
              {active ? (
                <div class='origin-top-left z-10 absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none'>
                  <button
                    onClick={setItems}
                    value='2'
                    class='text-gray-700 block cursor-pointer px-4 py-2 text-sm'
                  >
                    Default
                  </button>
                  <button
                    onClick={setItems}
                    value='4'
                    class='text-gray-700 cursor-pointer block px-4 py-2 text-sm'
                  >
                    sort by 4 posts
                  </button>
                  <button
                    onClick={setItems}
                    value='8'
                    class='text-gray-700 cursor-pointer block px-4 py-2 text-sm'
                  >
                    sort by 8 posts
                  </button>
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
          <span>
            <BiSearchAlt className='text-gray-600 w-6 h-6' />
          </span>
        </div>
        {!posts ? (
          <Loading />
        ) : (
          <div className='grid grid-cols-1 mx-auto justify-between px-4 md:px-36 before: gap-x-10 md:gap-x-20 gap-y-10 pt-10 lg:grid-cols-2'>
            {slicedPosts?.map((post, index) => (
              <Link href={`/post/${post.node.slug}`} passHref>
                <a>
                  <div className='bg-blue-50 rounded-xl relative' key={index}>
                    <div className='cursor-pointer'>
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
                                <Link
                                  href={`categories/${catname.slug}`}
                                  passHref
                                >
                                  <a>{catname.name}</a>
                                </Link>
                              </span>
                            </span>
                          ))}
                        </span>
                      </span>
                      <span className='font-poppin text-xl'>
                        {post.node.title}
                      </span>
                      <span className='text-gray-500 text-sm'>
                        {post.node.excerpt.length > 150
                          ? post.node.excerpt.substring(0, 150) + `...`
                          : post.node.excerpt}
                      </span>
                    </div>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        )}
        <div className='flex flex-row justify-between items-center mx-auto'>
          <nav className='flex items-center mx-auto rounded-lg mt-10 mb-10'>
            <button
              onClick={prevPage}
              className='flex flex-row mx-auto items-center space-x-1 h-8 border-2 border-r-0 border-dark-blue
               px-4 rounded-l-lg hover:bg-dark-blue hover:text-white'
            >
              <BsArrowLeftShort />
              <span className='mb-0.5'>prev</span>
            </button>
            <button
              onClick={nextPage}
              className='h-8 border-2 flex flex-row mx-auto items-center space-x-1 border-dark-blue
               px-4 rounded-r-lg hover:bg-dark-blue hover:text-white'
            >
              <span className='mb-0.5'>next</span>
              <BsArrowRightShort />
            </button>
          </nav>
        </div>
      </div>
    </>
  );
};

export default index;
