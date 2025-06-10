import { FOOTER_DESCRIPTION } from "../utils/constants";
import { useContext, useEffect } from "react";
import ThemeContext from "../context/ThemeContext";
import {
  FaGithub,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaYoutube
} from "react-icons/fa";
import { SiGmail, SiFirebase } from "react-icons/si";

const Footer = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("opacity-100", "translate-y-0");
            e.target.classList.remove("opacity-0", "translate-y-6");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".footer-fade").forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const socialLinks = [
    {
      href: "https://github.com/Cyb3rHash",
      label: "GitHub",
      icon: <FaGithub className="w-5 h-5" />,
      bg: isDark ? "bg-gray-800" : "bg-orange-50",
      hover: "hover:bg-orange-100 hover:text-gray-900",
    },
    {
      href: "https://x.com/Cyber__Hash",
      label: "Twitter",
      icon: <FaTwitter className="w-5 h-5" />,
      bg: isDark ? "bg-gray-800" : "bg-orange-50",
      hover: "hover:bg-orange-100 hover:text-blue-400",
    },
    {
      href: "mailto:your-email@example.com",
      label: "Email",
      icon: <SiGmail className="w-5 h-5" />,
      bg: isDark ? "bg-gray-800" : "bg-orange-50",
      hover: "hover:bg-orange-100 hover:text-red-500",
    },
    {
      href: "https://www.linkedin.com/in/harish-v-500249360",
      label: "LinkedIn",
      icon: <FaLinkedin className="w-5 h-5" />,
      bg: isDark ? "bg-gray-800" : "bg-orange-50",
      hover: "hover:bg-orange-100 hover:text-blue-600",
    },
    {
      href: "https://www.instagram.com/liberosist_007",
      label: "Instagram",
      icon: <FaInstagram className="w-5 h-5" />,
      bg: isDark ? "bg-gray-800" : "bg-orange-50",
      hover: "hover:bg-orange-100 hover:text-pink-600",
    },
    {
      href: "https://youtu.be/dQw4w9WgXcQ?si=9jX9BOMvkugBZtXf",
      label: "YouTube",
      icon: <FaYoutube className="w-5 h-5" />,
      bg: isDark ? "bg-gray-800" : "bg-orange-50",
      hover: "hover:bg-orange-100 hover:text-red-600",
    },
  ];

  return (
    <footer
      className={`footer-fade opacity-0 translate-y-6 transition-all duration-700 ease-out py-12 border-t mt-20 ${
        isDark
          ? "bg-black border-neutral-800 text-gray-200"
          : "bg-gradient-to-b from-orange-50 to-white border-orange-200 text-gray-800"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center justify-center text-center space-y-6">
          {/* Firebase branding */}
          <div className="flex items-center gap-2 mb-2">
            <SiFirebase className={`text-3xl animate-pulse ${isDark ? "text-orange-400" : "text-orange-500"}`} />
            <span className={`text-2xl font-bold tracking-wide ${isDark ? "text-orange-400" : "text-orange-500"}`}>
              Vistara
            </span>
          </div>

          {/* Description */}
          <p className={`max-w-2xl text-sm sm:text-base leading-relaxed ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            {FOOTER_DESCRIPTION}
          </p>

          {/* Social icons */}
          <div className="flex gap-4 mt-2 flex-wrap justify-center">
            {socialLinks.map(({ href, label, icon, bg, hover }, i) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={`p-3 rounded-full transition-all duration-300 shadow-md hover:scale-110 ${bg} ${
                  isDark ? "text-gray-300" : "text-gray-700"
                } ${hover}`}
                style={{
                  transitionDelay: `${i * 80}ms`,
                  transitionProperty: "transform, box-shadow, background-color, color",
                }}
              >
                {icon}
              </a>
            ))}
          </div>

          {/* Legal */}
          <div className="text-xs text-center space-y-1 pt-6">
            <p className={isDark ? "text-gray-500" : "text-gray-600"}>
              &copy; {new Date().getFullYear()}{" "}
              <span className={`font-semibold ${isDark ? "text-orange-400" : "text-orange-600"}`}>
                Vistara
              </span>{" "}
              — All rights reserved.
            </p>
            <p className={isDark ? "text-gray-600" : "text-gray-500"}>
              Crafted by{" "}
              <span className={`font-semibold ${isDark ? "text-orange-300" : "text-orange-500"}`}>
                CyberHash
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
