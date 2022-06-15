import React, { useState, useEffect } from 'react';
import { getPosts } from '../services';

export default function PostCard() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts().then((result) => setPosts(result));
  }, []);

  return (
    <>
      <div className='container grid grid-cols-1 mx-auto items-center px-4 md:px-10 pt-10 md:pt-16 gap-16 md:grid-cols-2'>
        {posts.map((post) => (
          <div className=''>
            <div className=''>
              <img src={post.node.featuredImage.url} className='rounded-lg' />
            </div>
            <div className='font-poppin text-xl'>{post.node.title}</div>
          </div>
        ))}
      </div>
    </>
  );
}
