import { useEffect } from "react";
import { useParams } from 'react-router-dom';
//import products from "../../data/products.json";
import { useFetchAllProductsQuery } from "../../redux/features/products/productsApi";
import ProductCards from "../shop/ProductCards";

const CategoryPage = () => {
 
    const{categoryName} = useParams();
    //const [filteredProducts , setFilteredProducts] = useState([]);

 const {data: {products = [], totalPages , totalProducts}= {},error , isLoading} = useFetchAllProductsQuery({
    category:categoryName
  })

 console.log(categoryName)
console.log(products)

{/*  
    useEffect(()=>{

      const filtered =  products.filter((product)=> product.category === categoryName.toLowerCase());
        setFilteredProducts(filtered)

    },[categoryName]);
*/}
    useEffect(()=>{

        window.scrollTo(0,0);

    },[])



//console.log("filter: ",filteredProducts);


   
  return (
    
    <>
        <section className="section__container bg-primary-light">
            <h2 className="section__header capitalize">{categoryName}</h2>
            <p className="section__subheader"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, temporibus inventore autem vitae sapiente nam.</p>
        </section>

        {/* products cards */}
        <div className="section__container">
            <ProductCards products={products}/>
        </div>
    
    </>
  )
}

export default CategoryPage