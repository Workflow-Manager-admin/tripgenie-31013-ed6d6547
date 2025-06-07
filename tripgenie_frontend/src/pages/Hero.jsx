/**
 * Kavia AI Documentation:
 * Hero.jsx - Main landing/hero section, title/marketing/CTA, login, and about/testimonials.
 * Handles user profile initialization and Google sign-in.
 */
import EiRa from "../assets/EiRa1.png";
import logo2 from "../assets/logo.jpg";
import { NavLink, Link } from "react-router-dom";
import About from "../pages/About";
import Testimonials from "./Testimonials";
import { HERO } from "../utils/constants";
import { useState, useEffect } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

const Hero = () => {
  // Local state for Google user
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Google sign-in hook
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => GenerateUserProfile(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  // Fetch and store user profile from Google OAuth
  const GenerateUserProfile = async (tokenInfo) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "application/json",
          },
        }
      );

      localStorage.setItem("user", JSON.stringify(response.data));
      setUser(response.data);
    } catch (err) {
      console.error("Error fetching user info:", err);
    }
  };

  return (
    <div className="mt-10 pt-4 lg:px-0 px-8 transition-all duration-300">
      {/* Logo + Brand */}
      <div className="flex mb-5 items-center justify-center mx-auto gap-3 w-auto">
        <img
          className="border-2 border-accent h-20 w-20 rounded-full"
          src={logo2}
          alt="logo"
        />
        <Link to={"/"}>
          <img className="w-44" src={EiRa} alt="EiRa logo" />
        </Link>
      </div>

      {/* Headline */}
      <div className="lg:px-72 flex items-center flex-col text-center gap-8">
        <h2 className="lg:text-7xl text-4xl font-bold text-primary dark:text-primary">
          {HERO.title}
        </h2>
        <p className="font-normal text-gray-600 dark:text-gray-300 w-[70%]">
          {HERO.titleDescription}
        </p>

        {/* CTA Button */}
        <NavLink
          to={"/create-trip"}
          className="bg-primary hover:bg-accent text-primary-foreground transition-colors duration-200 lg:text-xl text-lg font-medium py-3 lg:px-10 px-6 rounded-full shadow-lg"
        >
          {HERO.buttonLable}
        </NavLink>

        {/* Google Login Button */}
        {!user && (
          <button
            onClick={login}
            className="mt-6 flex items-center gap-3 text-lg font-medium bg-white dark:bg-gray-800 border px-6 py-3 rounded-full shadow hover:shadow-lg transition-all"
          >
            <FcGoogle size={24} /> Sign in with Google
          </button>
        )}
      </div>

      {/* Subsections */}
      <About />
      <Testimonials />
    </div>
  );
};

export default Hero;
