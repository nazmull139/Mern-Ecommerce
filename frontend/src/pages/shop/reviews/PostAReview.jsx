import React, { useState } from 'react';

const PostAReview = ({isModalOpen , handleClose}) => {
    const [rating , setRating] = useState(0);
  return (
    <div className={`fixed inset-0 bg-black/90 flex items-center justify-center z-40 px-2 ${isModalOpen ? 'block' : 'hidden'}`}>
        <div className='bg-white p-6 rounded-md shadow-lg w-96 z-50'>
        <h2 className='text-lg items-center mb-4'>Post A review</h2>
        <div className='flex items-center mb-4'>

            {
                [1,2,3,4,5].map((star)=>(
                    <span key={star} className='cursor-pointer text-yellow-500 text-lg'>
                        {
                            rating >= star? (<i className='ri-star-fill'></i>) : (<i className='ri-star-line'></i>)
                        }


                    </span>
                ))
            }
        </div>
        </div>
    </div>
  )
}

export default PostAReview