
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import avatarImg from '../assets/avatar.png';
import CartModal from '../pages/shop/CartModal';
import { useLogoutUserMutation } from '../redux/features/auth/authApi';
import { logout } from '../redux/features/auth/authSlice';

const Navbar = () => {

  const products = useSelector((state)=> state.cart.products);
   //console.log(products)
  const [isCartOpen , setIsCartOpen] = useState(false);
  const [ isDropDownOpen , setIsDropDownOpen] = useState(false);


  //////// HANDLE CART TOGGLE /////////////

  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  }

 
  
  // SHOW USER IF LOGGED IN

  const dispatch = useDispatch();
  const {user} = useSelector((state)=>state.auth);
  //console.log(user);
const [logoutUser] = useLogoutUserMutation();
const navigate = useNavigate();




   /////// DROP DOWN MENUS /////////////

 const handleDropDownToggle = () =>{
    setIsDropDownOpen(!isDropDownOpen);
  }


/////////// ADMIN DROP DOWN MENUS ////////////

const adminDropDownMenus = [
    {label: "Dashboard", path: "/dashboard/admin"},
    {label: "Manage Items", path: "/dashboard/manage-products"},
    {label: "All Orders", path: "/dashboard/manage-orders"},
    {label: "Add New Post", path: "/dashboard/add-new-post"},
]

/////////// USER DROP DOWN MENUS ////////////


const userDropDownMenus = [
  {label: "Dashboard", path: "/dashboard"},
  {label: "Profile", path: "/dashboard/profile"},
  {label: "Payments", path: "/dashboard/payments"},
  {label: "Orders", path: "/dashboard/orders"},
]


  const dropDownMenus = user?.role === 'admin' ? [...adminDropDownMenus] : [...userDropDownMenus];


  const handleLogOut = async ()=>{
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      navigate('/')
    } catch (error) {
      console.error("Failed to logout",error)
    }



  }

  return (
    <header className='fixed-nav-bar w-nav'>
            <nav className='max-w-screen-2xl mx-auto px-4 flex justify-between items-center'>
                   <ul className='nav__links'>
                    <li className='link'><Link to="/">Home</Link></li>
                    <li className='link'><Link to="/shop">Shop</Link></li>
                    <li className='link'><Link to="/">Pages</Link></li>
                    <li className='link'><Link to="/contact">Contact</Link></li>
                   </ul>

                   {/*logo*/}

                   <div className='nav__logo'>
                    <Link to={"/"}>Lebaba<span>.</span></Link>
                    </div>

                    {/* Icons */}

                    <div className='nav__icons relative'>
                        
                      <span>
                        <Link to={"/search"}>
                            <i className="ri-search-line"></i>
                        </Link>
                      </span>

                      <span>
                        <button onClick={handleCartToggle} className='hover:text-primary'>
                        <i className="ri-shopping-bag-line"></i>
                        <sup className='text-sm inline-block px-1.5 text-white rounded-full bg-primary text-center'>{products.length}</sup>
                        </button>
                      </span>

                        {/* User Login Register */}

                        
                      <span>

                        {
                          user ? (
                          
                          <>
                       <img 
                       onClick={handleDropDownToggle}
                       src={user?.profileImage || avatarImg} alt=''className='size-6 rounded-full cursor-pointer'/>
                       {
                        isDropDownOpen && (
                            <div className='absolute right-0 mt-3 p-4 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50'>
                              <ul className='font-medium space-y-2 p-2'>
                                {dropDownMenus.map((menu,index)=>(

                                  <li key={index}>
                                    <Link 
                                      onClick={()=>setIsDropDownOpen(false)}
                                      className='dropdown-items' to={menu.path}
                                    
                                    >
                                      {menu.label}
                                    </Link>
                                  </li>

                                ))}
                                <li><Link onClick={handleLogOut} className='dropdown-items'>Logout</Link></li>
                              </ul>
                            </div>

                        )


                       }
                          
                          </>    ) :
                          
                        (
                            <Link to={"/login"}>
                         <i className="ri-user-line"></i>
                        </Link> 

                        )
                        }
                        
                      </span>
                    </div>
            </nav>


            {
                isCartOpen && <CartModal products={products} isOpen={isCartOpen} onClose={handleCartToggle}/>

            }
        </header>
  )
}

export default Navbar