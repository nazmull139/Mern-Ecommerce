import { useState } from "react";
import products from "../../data/products.json";
import ProductCards from "./ProductCards";

const TrendingProducts = () => {
    const [visibleProducts , setVisibleProducts] = useState(8);

    const loadMoreProducts = ()=>{
        setVisibleProducts(prevCount => prevCount+4);
    }

    
  return (
    <section className='section__container product__container'>
        <h2 className='section__header'>Trending Products</h2>
        <p className='section__subheader mb-12'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima, facilis.</p>

            {/*Product Cards */}

        <div className="mt-12">
            <ProductCards products={products.slice(0,visibleProducts)}/>
        </div>

        {/*Load More Buton */}

        <div className="product__btn">

                {

                    visibleProducts < products.length && (
                        <button className="btn" onClick={loadMoreProducts}>Load More</button>
                    )
                }

        </div>
        
    </section>
    
  )
}

export default TrendingProducts