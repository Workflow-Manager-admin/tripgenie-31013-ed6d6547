import { useContext, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import {
  FiSun, FiMoon, FiPlus, FiCompass, FiLogOut, FiMenu, FiX
} from "react-icons/fi";
import { HiOutlineFire } from "react-icons/hi";

import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Dialog, DialogContent, DialogHeader } from "./ui/dialog";

import EiRa from "../assets/EiRa1.png";
import ThemeContext from "../context/ThemeContext";
import useGetUserData from "../hooks/useGetUserData";

const Navbar = () => {
  const storedUser = useMemo(() => JSON.parse(localStorage.getItem("user")), []);
  const { openDialog, setOpenDailog, navigate, login } = useGetUserData();
  const { theme, setTheme } = useContext(ThemeContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    googleLogout();
    localStorage.clear();
    navigate("/");
  };

  const handleSignInClick = () => setOpenDailog(true);
  const toggleTheme = () => setTheme(!theme);

  return (
    <>
      {/* Navbar */}
      <nav
        className={`flex justify-between items-center py-4 px-6 lg:px-10 shadow-md sticky top-0 z-50 transition-colors duration-300 ${
          theme ? "bg-black text-white" : "bg-white text-gray-900"
        }`}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 lg:w-40">
          <img src={EiRa} alt="EiRa Logo" className="w-28 object-contain" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-5">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-all duration-300 ${
              theme ? "hover:bg-gray-800" : "hover:bg-gray-100"
            }`}
            aria-label="Toggle theme"
          >
            {theme ? (
              <FiSun className="text-yellow-400 w-5 h-5" />
            ) : (
              <FiMoon className="text-gray-700 w-5 h-5" />
            )}
          </button>

          {storedUser ? (
            <>
              <Link
                to="/create-trip"
                className="flex items-center gap-2 bg-orange-500 text-white hover:bg-orange-600 px-4 py-2 rounded-full text-sm font-medium transition"
              >
                <FiPlus className="w-4 h-4" />
                Create Trip
              </Link>
              <Link
                to="/my-trips"
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition ${
                  theme
                    ? "bg-gray-800 hover:bg-gray-700 text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                }`}
              >
                <FiCompass className="w-4 h-4" />
                My Trips
              </Link>

              <Popover>
                <PopoverTrigger>
                  <div className="flex items-center gap-2 cursor-pointer">
                    <img
                      src={storedUser.picture}
                      alt="User"
                      className="rounded-full w-8 h-8 border-2 border-orange-500"
                    />
                    <span className="text-sm font-medium hidden lg:inline">
                      {storedUser.name.split(" ")[0]}
                    </span>
                  </div>
                </PopoverTrigger>
                <PopoverContent
                  className={`w-40 p-2 mt-2 rounded-md ${
                    theme ? "bg-gray-900 text-white" : "bg-white text-gray-800"
                  }`}
                >
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full p-2 text-sm rounded-md hover:bg-red-100 text-red-500 dark:hover:bg-gray-800 dark:text-red-400"
                  >
                    <FiLogOut className="w-4 h-4" />
                    Logout
                  </button>
                </PopoverContent>
              </Popover>
            </>
          ) : (
            <Button
              onClick={handleSignInClick}
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-full px-6 py-2 transition"
            >
              <HiOutlineFire className="w-4 h-4" />
              Sign In
            </Button>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 rounded focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <FiX className={`w-6 h-6 ${theme ? "text-white" : "text-gray-800"}`} />
          ) : (
            <FiMenu className={`w-6 h-6 ${theme ? "text-white" : "text-gray-800"}`} />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          className={`md:hidden fixed inset-0 z-40 pt-20 pb-8 px-6 flex flex-col gap-5 transition-all duration-300 ${
            theme ? "bg-black text-white" : "bg-white text-gray-900"
          }`}
        >
          <button
            onClick={toggleTheme}
            className="self-start p-2 rounded-full"
            aria-label="Toggle theme"
          >
            {theme ? (
              <FiSun className="text-yellow-400 w-5 h-5" />
            ) : (
              <FiMoon className="text-gray-700 w-5 h-5" />
            )}
          </button>

          {storedUser ? (
            <>
              <Link
                to="/create-trip"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 rounded-lg font-medium"
              >
                <FiPlus className="w-5 h-5" />
                Create Trip
              </Link>
              <Link
                to="/my-trips"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium ${
                  theme
                    ? "bg-gray-800 hover:bg-gray-700 text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                }`}
              >
                <FiCompass className="w-5 h-5" />
                My Trips
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-red-500 hover:bg-red-100 dark:hover:bg-gray-800 dark:text-red-400"
              >
                <FiLogOut className="w-5 h-5" />
                Logout
              </button>
            </>
          ) : (
            <Button
              onClick={() => {
                handleSignInClick();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg px-4 py-3 transition"
            >
              <HiOutlineFire className="w-5 h-5" />
              Sign In
            </Button>
          )}
        </div>
      )}

      {/* Sign In Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDailog}>
        <DialogContent
          className={`rounded-lg max-w-md ${
            theme ? "bg-gray-900 text-white" : "bg-white text-gray-800"
          }`}
        >
          <DialogHeader>
            <div className="flex flex-col items-center p-6">
              <img src={EiRa} alt="EiRa Logo" className="w-20 mb-4" />
              <h2 className="text-xl font-bold mb-2 text-center">
                Welcome to Vistara
              </h2>
              <p
                className={`text-sm mb-6 text-center ${
                  theme ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Sign in to create and manage your trips
              </p>
              <Button
                onClick={login}
                className="flex items-center justify-center gap-3 w-full py-3 font-bold bg-orange-500 hover:bg-orange-600 text-white"
              >
                <FcGoogle className="w-5 h-5" />
                Continue with Google
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Navbar;
