import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
//import products from "../../data/products.json";
import { useFetchAllProductsQuery } from "../../redux/features/products/productsApi";
import ProductCards from "../shop/ProductCards";
import ShopFiltering from "../shop/ShopFiltering";


const filters = {
  categories : ['all', 'accessories', 'dress', 'jewellery' , 'cosmetics'],
  colors : ['all', 'black' ,'red','gold' , 'blue' ,'silver' , 'biege' , 'green'],
  priceRanges: [
   {label: 'under $50', min:0, max:50},
   {label: '$50 - $100', min:50, max:100},
   {label: '$100 - $200', min:100, max:200},
   {label: '$200 and above', min:200, max: Infinity},
  ]
};




const CategoryPage = () => {
 
    const{categoryName} = useParams();
    //const [filteredProducts , setFilteredProducts] = useState([]);

 console.log(categoryName)


{/*  
    useEffect(()=>{

      const filtered =  products.filter((product)=> product.category === categoryName.toLowerCase());
        setFilteredProducts(filtered)

    },[categoryName]);
*/}
    useEffect(()=>{

        window.scrollTo(0,0);

    },[])

///////////////////////////////////


const[filtersState , setFiltersState] = useState({
  category: categoryName,
  color : 'all',
  priceRange : ''
});

const [currentPage , setCurrentPage] = useState(1);
const [ProductsPerPage] = useState(8);

const {  color , priceRange} = filtersState;

let minPrice = 0;
let maxPrice = Infinity;

[minPrice , maxPrice] = priceRange.split('-').map(Number);

const {data: {products = [], totalPages , totalProducts}= {},error , isLoading} = useFetchAllProductsQuery({
  category: categoryName!== 'all' ? categoryName: '',
  color: color!== 'all'? color:'',
  minPrice: isNaN(minPrice) ? '' : minPrice,
  maxPrice: isNaN(maxPrice) ? '' : maxPrice,
  page: currentPage,
  limit: ProductsPerPage ,

})
console.log(products)

// CLEAR FILTERS

const clearFilters = () => {
setFiltersState({
  category : categoryName,
  color : 'all',
  priceRange : ''
})

}

//// HANDLE PAGE CHANGE

const handlePageChange= (pageNumber) => {
if(pageNumber > 0 && pageNumber <= totalPages){
  setCurrentPage(pageNumber)
}
}






//console.log("filter: ",filteredProducts);


   
  return (
    
    <>



        <section className="section__container bg-primary-light">
            <h2 className="section__header capitalize">{categoryName}</h2>
            <p className="section__subheader"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, temporibus inventore autem vitae sapiente nam.</p>
        </section>


        <section className='section__container' >
            <div className='flex flex-col md:flex-row md:gap-12 gap-8'>
                {/* LEFT SIDE */}
                <ShopFiltering 
                    filters={filters}
                    filtersState={filtersState}
                    setFiltersState={setFiltersState}
                    clearFilters={clearFilters}
                
                
                />

        {/* products cards */}
        <div className="section__container">
            <ProductCards products={products}/>
        </div>
        </div>
        </section>
    
    </>
  )
}

export default CategoryPage