import { useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";

import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Dialog, DialogContent, DialogDescription, DialogHeader } from "./ui/dialog";

import EiRa from "../assets/EiRa1.png";
import ThemeContext from "../context/ThemeContext";
import useGetUserData from "../hooks/useGetUserData";

const Navbar = () => {
  const storedUser = useMemo(() => JSON.parse(localStorage.getItem("user")), []);
  const { openDialog, setOpenDailog, navigate, login } = useGetUserData();
  const { theme, setTheme } = useContext(ThemeContext);

  const handleLogout = () => {
    googleLogout();
    localStorage.clear();
    navigate("/");
  };

  const handleSignInClick = () => setOpenDailog(true);

  return (
    <nav
      className={`flex justify-between items-center py-4 px-6 lg:px-10 shadow-lg transition-colors duration-300 ${
        theme
          ? "bg-black text-white"
          : "bg-white text-[#FF5722]"
      }`}
    >
      {/* Logo */}
      <Link to="/" className="flex items-center gap-3 lg:w-40">
        <img src={EiRa} alt="EiRa Logo" className="w-30" />
      </Link>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Theme Toggle Switch */}
        <label
          className="relative inline-flex items-center cursor-pointer select-none"
          aria-label="Toggle Dark Mode"
        >
          <input
            type="checkbox"
            className="sr-only peer"
            checked={theme}
            onChange={() => setTheme(!theme)}
          />
          <div
            className={`w-14 h-7 rounded-full peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-offset-2 transition-colors duration-300 ${
              theme
                ? "bg-[#FF5722]"
                : "bg-gray-300 peer-checked:bg-[#FF5722]"
            }`}
          />
          <div
            className={`absolute left-0.5 top-0.5 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300
              ${theme ? "translate-x-7" : "translate-x-0"}
            `}
          />
          <span className="absolute left-1 top-1.5 text-yellow-400 text-sm pointer-events-none select-none">
            🌞
          </span>
          <span className="absolute right-1 top-1.5 text-gray-800 dark:text-gray-200 text-sm pointer-events-none select-none">
            🌙
          </span>
        </label>

        {storedUser ? (
          <>
            <Link
              to="/create-trip"
              className={`rounded-full border lg:px-4 lg:py-2 text-xs lg:text-sm px-3 py-1.5 font-medium transition-colors duration-300 ${
                theme
                  ? "bg-[#FF5722] text-white border-[#FF5722] hover:bg-[#E64A19]"
                  : "bg-[#FF5722] text-white border-[#FF5722] hover:bg-[#E64A19]"
              }`}
            >
              + Create Trips
            </Link>
            <Link
              to="/my-trips"
              className={`rounded-full border lg:px-4 lg:py-2 text-xs lg:text-sm px-3 py-1.5 font-medium transition-colors duration-300 ${
                theme
                  ? "bg-[#FF5722] text-white border-[#FF5722] hover:bg-[#E64A19]"
                  : "bg-[#FF5722] text-white border-[#FF5722] hover:bg-[#E64A19]"
              }`}
            >
              My Trips
            </Link>

            {/* User Profile Popover */}
            <Popover>
              <PopoverTrigger>
                <img
                  src={storedUser.picture}
                  alt="User Avatar"
                  className="rounded-full cursor-pointer w-7 h-7 lg:w-9 lg:h-9"
                />
              </PopoverTrigger>
              <PopoverContent>
                <button
                  onClick={handleLogout}
                  className="text-sm text-red-500 hover:underline cursor-pointer"
                >
                  Logout
                </button>
              </PopoverContent>
            </Popover>
          </>
        ) : (
          <Button
            onClick={handleSignInClick}
            className="bg-[#FF5722] text-white font-medium rounded-full lg:px-10 px-6 lg:py-2 py-1.5 hover:bg-[#E64A19] transition-colors duration-300"
          >
            Sign In
          </Button>
        )}
      </div>

      {/* Sign In Dialog */}
     <Dialog open={openDialog} onOpenChange={setOpenDailog}>
  <DialogContent>
    <DialogHeader>
      <DialogDescription className="text-center">
        <img src={EiRa} alt="EiRa Logo" className="w-24 mx-auto" />
        <h2 className="font-bold text-lg mt-4">Sign In with Google</h2>
        <p className="mt-2 text-sm text-gray-500">
          Use your Google account to securely sign in.
        </p>
        <Button
          onClick={login}
          className="flex items-center justify-center gap-4 w-full mt-4 font-bold bg-[#FF5722] hover:bg-[#E64A19]"
        >
          Sign in With Google <FcGoogle className="w-7 h-7" />
        </Button>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

    </nav>
  );
};

export default Navbar;
