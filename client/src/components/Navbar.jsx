import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { FaShoppingCart } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
const Navbar = () => {
  return (
    <div>
      <nav className="flex justify-between items-center h-20 max-w-7xl mx-auto">
        <NavLink to="/">
          <div className="ml-5 flex">
            <img
              className=" h-10"
              src="data:image/jpeg;base64,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"
            />
            <h2 className="text-slate-100 text-lg sm:text-2xl">ShopSage</h2>
          </div>
        </NavLink>
        <div className="flex items-center border rounded-md w-70 sm:w-1/2 ">
          <input
            type="text"
            placeholder="Search product..."
            className="flex-1 p-2 sm:w-full md:w-full"
          />
          <button>
            <FaSearch className="text-2xl text-slate-100 p-0.5" />
          </button>
        </div>
        <div className=" flex flex-col sm:bg-green-900 sm:rounded-lg sm:p-2 sm:flex-row sm:justify-center sm:items-center items-center font-medium text-slate-100 mr-5 space-x-6 ">
          <NavLink to="/">
            <p className="text-slate-100">Home</p>
          </NavLink>
          <NavLink to="/cart">
            <div className="relative">
              <FaShoppingCart className="text-2xl text-slate-100" />
            </div>
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
