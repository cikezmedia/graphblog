import React, { useState } from 'react';
import _ from 'lodash';
import { BsArrowRightShort, BsArrowLeftShort } from 'react-icons/bs';

const Pagination = ({ items, pageSize, currentPage, onPageChange }) => {
  const pageCount = items / pageSize;
  if (Math.ceil(pageCount) === 1) return null;
  const pages = _.range(1, pageCount + 1);

  return (
    <>
      <div className='flex flex-row justify-between items-center mx-auto'>
        <nav className='flex items-center mx-auto rounded-lg mt-10 mb-10'>
          <button
            className='h-12 border-2 border-r-0 border-dark-blue
               px-4 rounded-l-lg hover:bg-dark-blue hover:text-white'
          >
            <BsArrowLeftShort />
          </button>
          {pages.map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`h-12 border-2 border-r-0 border-dark-blue
          w-12 ${page === currentPage && 'bg-dark-blue text-white'}`}
            >
              {page}
            </button>
          ))}
          <button
            className='h-12 border-2  border-dark-blue
               px-4 rounded-r-lg hover:bg-dark-blue hover:text-white'
          >
            <BsArrowRightShort />
          </button>
        </nav>
      </div>
    </>
  );
};

export default Pagination;
