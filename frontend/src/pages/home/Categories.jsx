
import { Link } from 'react-router-dom'
import category1 from '../../assets/category-1.jpg'
import category2 from '../../assets/category-2.jpg'
import category3 from '../../assets/category-3.jpg'
import category4 from '../../assets/category-4.jpg'

const Categories = () => {

  const categories = [
    {
      name: 'Accessories' ,
      path: 'accessories',
      image: category1
    },
    {
      name: 'Dress Collection' ,
      path: 'dress',
      image: category2
    },
    {
      name: 'Jewellery' ,
      path: 'jewellery',
      image: category3
    },
    {
      name: 'Consmetics' ,
      path: 'cosmetics',
      image: category4
    },
  ]


  return (
   
     <div className=' mt-20 w-[70vw] m-auto'>

      <div className='mb-10'>

      <div className='flex items-center justify-center gap-4 mb-5'>
        
    <hr className='flex-grow border-t border-gray-300 w-16' />
    <span className='font-semibold text-3xl text-gray-800'>SHOP BY CATEGORY</span>
    <hr className='flex-grow border-t border-gray-300 w-16' />

      </div>
      
       </div>

      <div className='product__grid  '>

     
         {
           categories.map((category)=>(
            <Link  key={category.name} to={`/categories/${category.path}`} className='categories__card'>

                <img src={category.image} alt={category.name}></img>
                <h4>{category.name}</h4>

            </Link>



           )

           )

         }
     </div>
    </div>
    
  )
}

export default Categories