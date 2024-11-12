import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import RatingStars from "../../components/RatingStars";
import { addToCart } from '../../redux/features/cart/cartSlice';

const ProductCards = ({products}) => {
//console.log("cards",products)

    //console.log(products.id)

  const dispatch = useDispatch();

  const handleAddToCart = (product) => {

    dispatch(addToCart(product));

  }


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

        {
          products.length > 0 ? (  products.map((product,index)=>(


                <div key={index} className="product__card">
                    <div className="relative">

                        <Link to={`/shop/${product._id}`}><img src={product.image} alt="" className=" max-h-96 md:h-64 w-full object-cover hover:scale-105 transition-all duration-300" ></img></Link>



                    <div className="hover:block absolute top-3 right-3">

                      <button
                      
                        onClick={(e)=> {
                        e.stopPropagation();
                        handleAddToCart(product);


                      }}>



                      <i className="ri-shopping-cart-2-line bg-primary p-1.5 text-white hover:bg-primary-dark"></i>
                      </button>


                    </div>
                      
                    </div>

                        <div className="product__card__content">
                            <h4>{product.name}</h4>
                            <p>${product.price } {product?.oldPrice ? <s>${product?.oldPrice}</s> : null}</p>
                            
                            <RatingStars rating={product.rating}/>
                        </div>

                 
                    

               </div>



            ))) : <div> No products found </div>
        }


    </div>
  )
}

export default ProductCards