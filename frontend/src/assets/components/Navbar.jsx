import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/userApiSlice";
import { logOut } from "../slices/authSlice";
import Cart from "./Cart";
import { Search } from "lucide-react";
import { useState } from "react";


function Navbar() {
  const { userInfo } = useSelector((state) => state.auth);
  const { logoutApi } = useLogoutMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    try {
      await logoutApi().unwrap();
      dispatch(logOut);
      navigate("/");
    } catch (err) {
      console.log(err?.message);
    }
  };

  // search product
  const [keyword, setKeyword] = useState("");


  const handleSearch = () => {
    navigate(`/products?keyword=${keyword}`)
  }

  return (
    <header className="sticky top-0 z-50 min-w-full bg-white shadow-sm mb-12">
      <nav className="container flex items-center justify-between gap-8 h-16 mx-auto px-4">
        {/* logo */}

        <Logo />

        {/* search box */}
        <div className="hidden md:hidden xl:flex justify-between items-center focus:ring-2 focus:ring-blue-500 min-w-md rounded-lg border border-blue-300 ">
          <input
            type="text"
            value={keyword}
            onChange={(e)=> setKeyword(e.target.value)}
            placeholder="Search products..."
            className="w-3/4 outline-none px-2 "
          />
          <Search  className="bg-blue-300 w-8 h-8 rounded-md" onClick={handleSearch}/>
        </div>

        {/* desktop screen */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/">
            <h3 className="text-xl font-medium ">Home</h3>
          </Link>
          <Link to="/products">
            <h3 className="text-xl font-medium ">Products</h3>
          </Link>
          <Link to="/orders">
            <h3 className="text-xl font-medium ">Orders</h3>
          </Link>
        </div>

        {/* Cart */}
        <Link to="/carts">
          <Cart />
        </Link>

        {/* mobile menu */}
        <div className="dropdown dropdown-end md:hidden lg:hidden xl:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost">
            <MobileMenu />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-50 w-56 p-2 shadow-lg"
          >
            <li>
              <Link to="/">Home</Link>
            </li>

            <li>
              <Link to="/products">Products</Link>
            </li>

            <li>
              <Link to="/carts">Cart</Link>
            </li>
            {userInfo ? (
              <>
                <li>
                  <Link to="/profile">Profile</Link>
                </li>

                <li>
                  <button>Logout</button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">Sign In</Link>
                </li>

                <li>
                  <Link to="/register">Sign Up</Link>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Login and logout */}
        {userInfo ? (
          <div className="hidden md:flex dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost">
              {userInfo.name}
            </div>
            <ul
              tabIndex="-1"
              className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm mt-8"
            >
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <button onClick={handleSubmit}>Logout</button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="hidden md:flex items-center gap-4">
            <Link to="/login">
              <h3 className="text-xl font-medium ">Sign In</h3>
            </Link>
            <Link to="register">
              <h3 className="text-xl font-medium ">Sing Up</h3>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
