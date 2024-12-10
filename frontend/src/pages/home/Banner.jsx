
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../../assets/ARTZII.png';
import bannerImg from '../../assets/shopping1.png';

const Banner = () => {
  const {user} = useSelector((state)=>state.auth);
 // console.log("navbar",user.isVerified);
  return (
    <div> 
    
{/* Verify to access all features */}
      
{user && !user.isVerified && (
<div className="max-w-[1000px] m-auto bg-yellow-100 text-yellow-800 border border-yellow-400 rounded-md p-2  text-center">
 <p className="mb-2 font-semibold">
   Your email is not verified. Please verify to access all features 
 
 <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 mx-2 rounded">
   <Link to="/verify-email">Verify Email</Link>

 </button></p>
</div>
)}


{/* Main Banner Page*/}


    <div className=' header__container'>

      <div className='header__content'>
        <h1 >
        <img src={logo} alt='logo' className='size-auto'></img> 
        </h1>
        <p>Discover Quality, Style, and Value - All in One Place!
        Shop Your Favorites Now with Exclusive Deals!</p>

        <button className='btn'><Link to="/shop">Explore Now</Link></button>

      </div>
      <div >
        <img src={bannerImg} alt='banner image' ></img> 
      </div>



    </div>

    
    </div>
  )
}

export default Banner