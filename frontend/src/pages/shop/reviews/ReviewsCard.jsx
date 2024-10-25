import React, { useState } from 'react'
import commentorIcon from "../../../assets/avatar.png"
import RatingStars from '../../../components/RatingStars'
import { fromatDate } from '../../../utils/formDate'
import PostAReview from './PostAReview'


const ReviewsCard = ({productReviews}) => {

  const [isModalOpen , setIsModalOpen ] = useState(false)
  const reviews = productReviews || []
  //console.log(reviews)

  const handleOpenReviewModal =() => {
    setIsModalOpen(true)

  }
  const handleCloseReviewModal =() => {
    setIsModalOpen(false)

  }

  return (
    <div className='my-6 bg-white p-8'>
      <div>
        {
          reviews.length > 0 ? (<div>

            <h3 className='text-lg font-medium '> All comments...</h3>
              <div>
                {
                  reviews.map((review , index)=>(
                    <div key={index} className='mt-4'>
                        <div className='flex gap-4 items-center'>
                          <img src={commentorIcon} alt='' className='size-14'/> 
                            <div className='space-y-1'>
                              <p className='text-lg font-medium underline capitalize underline-offset-4 text-blue-400'>{review?.userId?.username}</p>
                              <p className='text-[12px] italic'>{fromatDate(review?.updatedAt)}</p>
                              <RatingStars rating={review?.rating}/>
                            </div>
                        </div>

                        <div className='text-gray-600 mt-5 border p-8'>
                           <p>{review?.comment}</p>
                        </div>

                    </div>

                  ))
                }

                </div>

          </div>) : <p>No reviews yet</p>
        }
      </div>


      {/* ADD REVIEW BUTTON  */}

     <div className='mt-12'>
      <button
        onClick={handleOpenReviewModal}
      className='px-6 py-3 bg-primary text-white rounded-md'>Add a review</button>
     </div>
        {/* review modal */}

        <PostAReview isModalOpen={isModalOpen} handleClose={handleCloseReviewModal}/>
    </div>
  )
}

export default ReviewsCard