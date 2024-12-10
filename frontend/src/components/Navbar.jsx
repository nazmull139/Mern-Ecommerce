
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
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
 // console.log("navbar",user.isVerified);

  //when mutation use [] and when query use {}
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
    {label: "Add Product", path: "/dashboard/add-product"},
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
      alert("Logged out successfully");
      navigate('/')
    } catch (error) {
      console.error("Failed to logout",error)
    }



  }

  return (
      <header className=" top-0 w-full bg-white shadow-md mb-2">
        {/* Upper Section */}
        <div className="flex justify-around items-center h-12  border-b border-gray-200 px-30 py-9">
          {/* Search Icon */}
          <Link to="/search" className="hover:text-primary">
            <i className="ri-search-line text-xl"></i>
          </Link>

          {/* Logo */}
          <div className="text-center">
            <Link to="/" className=" text-2xl">
            <span className='text-3xl text-red-600'>A</span><span>RTZII</span>
            </Link>
          </div>

          {/* Cart and User Dropdown */}
          <div className="flex items-center space-x-4">
            {/* Cart Icon */}
            <button onClick={handleCartToggle} className="relative hover:text-primary">
              <i className="ri-shopping-bag-line text-xl"></i>
              {products.length > 0 && (
                <sup className="absolute -top-1 -right-2 text-xs bg-primary text-white rounded-full px-1">
                  {products.length}
                </sup>
              )}
            </button>

            {/* User Dropdown */}
            {user ? (
              <div className="relative">
                <img
                  onClick={handleDropDownToggle}
                  src={user?.profileImage || avatarImg}
                  alt="User Profile"
                  className="w-8 h-8 rounded-full cursor-pointer"
                />
                {isDropDownOpen && (
                  <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg w-48 z-1">
                    <ul className="text-sm font-medium text-gray-700">
                      {dropDownMenus.map((menu, index) => (
                        <li key={index}>
                          <Link
                            onClick={() => setIsDropDownOpen(false)}
                            to={menu.path}
                            className="block px-4 py-2 hover:bg-gray-100"
                          >
                            {menu.label}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <Link
                          onClick={handleLogOut}
                          className="block px-4 py-2 hover:bg-gray-100 "
                        >
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="hover:text-primary">
                <i className="ri-user-line text-xl"></i>
              </Link>
            )}
            {
              user ? (
                <Link
                onClick={handleLogOut}
                className="block py-2 hover:bg-gray-100 text-gray-700 font-semibold"
              >
                Logout
              </Link>
              ):("")
            }
          </div>
        </div>

        {/* Lower Section */}
        <div className="flex justify-center space-x-6 h-10 items-center bg-gray-100">
          <ul className="flex space-x-6 text-lg font-medium text-gray-700">
            <li>
              <NavLink to="/" className={({ isActive }) => (isActive ? "text-primary font-semibold" : "hover:text-primary")}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/shop" className={({ isActive }) => (isActive ? "text-primary font-semibold" : "hover:text-primary")}>
                Shop
              </NavLink>
            </li>
            <li>
              <NavLink to="/pages" className={({ isActive }) => (isActive ? "text-primary font-semibold" : "hover:text-primary")}>
                Pages
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={({ isActive }) => (isActive ? "text-primary font-semibold" : "hover:text-primary")}>
                Contact
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Cart Modal */}
        {isCartOpen && <CartModal products={products} isOpen={isCartOpen} onClose={handleCartToggle} />}
      </header>

  )
}  

export default Navbar