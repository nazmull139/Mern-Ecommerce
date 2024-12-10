
import CategoryPageAll from '../category/CategoryPageAll'
import TrendingProducts from '../shop/TrendingProducts'
import Banner from './Banner'
import Categories from './Categories'
import PromoBanner from './PromoBanner'

const Home = () => {
  return (
   <>


    <Banner/>
    <Categories/>
    {/*<HeroSection/>*/}
    <TrendingProducts/>
    <CategoryPageAll/>
   { /*<DealsSection/>*/}
    <PromoBanner/>
    {/*<Blogs/>*/}

   </>
  )
}

export default Home