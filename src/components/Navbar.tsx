import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";

const Navbar = () => { 
  const loggedInUserInfo = localStorage.getItem("loggedInUserInfo");
  const userData = loggedInUserInfo ? JSON.parse(loggedInUserInfo) : null;
  const onLogout = ()=>{
    localStorage.removeItem('loggedInUserInfo') 
    location.replace('/login')
    toast.success('Logged Out')
  }

  return (
    <nav className="max-w-lg mx-auto mt-7 mb-20 bg-indigo-600 px-3 py-5 rounded-md">
      <ul className="flex items-center justify-between">
        <li className="text-white duration-200 font-semibold text-lg">
          <NavLink to="/">Home</NavLink>
        </li>
        {userData?.jwt ? (
        <div className="flex gap-2 text-white">
        <NavLink to="/profile" className="italic">{userData.user.username}</NavLink>
        <NavLink to="/login" className='font-bold' onClick={onLogout}>Logout</NavLink>
          </div>
        ):(
          <p className="flex items-center space-x-3">
            <li className="text-white duration-200 font-semibold text-lg">
              <NavLink to="/register">Register</NavLink>
            </li>
            <li className="text-white duration-200 font-semibold text-lg">
            <NavLink to="/login">Login</NavLink>
            </li>
          </p>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
