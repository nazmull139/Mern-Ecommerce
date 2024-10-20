
import Blogs from '../blogs/Blogs'
import TrendingProducts from '../shop/TrendingProducts'
import Banner from './Banner'
import Categories from './Categories'
import DealsSection from './DealsSection'
import HeroSection from './HeroSection'
import PromoBanner from './PromoBanner'

const Home = () => {
  return (
   <>


    <Banner/>
    <Categories/>
    <HeroSection/>
    <TrendingProducts/>
    <DealsSection/>
    <PromoBanner/>
    <Blogs/>

   </>
  )
}

export default Home