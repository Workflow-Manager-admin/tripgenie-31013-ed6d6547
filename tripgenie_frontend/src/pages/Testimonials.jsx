import { useContext, useEffect } from "react";
import { TESTIMONIALS } from "../utils/constants";
import ThemeContext from "../context/ThemeContext";
import { FaQuoteLeft } from "react-icons/fa";

const Testimonials = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme;

  const cardStyle = isDark
    ? "bg-[#121212] text-white border border-[#333] shadow-xl"
    : "bg-white text-gray-900 border border-gray-200 shadow-md";

  // Trigger animation when visible
  useEffect(() => {
    const elements = document.querySelectorAll(".fade-up");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
          }
        });
      },
      { threshold: 0.1 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <section
      className={`py-20 px-6 lg:px-24 transition-colors duration-300 ${
        isDark ? "bg-black text-white" : "bg-[#fdf8f5] text-black"
      }`}
    >
      <div className="text-center mb-14">
        <h2 className="text-4xl lg:text-5xl font-extrabold text-[#FF5722] tracking-tight">
          {TESTIMONIALS.title}
        </h2>
        <p className="mt-3 text-md lg:text-lg text-gray-500 dark:text-gray-300">
          What people are saying about us
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {[TESTIMONIALS.review1, TESTIMONIALS.review2, TESTIMONIALS.review3].map(
          (review, idx) => (
            <div
              key={idx}
              className={`fade-up opacity-0 translate-y-8 duration-700 ease-out rounded-2xl p-6 transition-transform hover:-translate-y-2 hover:shadow-2xl hover:border-[#FF5722]/40 relative group ${cardStyle}`}
              style={{ transitionDelay: `${idx * 150}ms` }}
            >
              <FaQuoteLeft className="text-[#FF5722] text-3xl mb-4 animate-pulse group-hover:scale-110 transition-transform duration-300" />
              <p className="text-[1.05rem] leading-relaxed font-medium">
                {review}
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FF5722] flex items-center justify-center text-white font-semibold shadow-md">
                  {String.fromCharCode(65 + idx)}
                </div>
                <span className="text-sm text-gray-400">User {idx + 1}</span>
              </div>
            </div>
          )
        )}

        {[TESTIMONIALS.review4, TESTIMONIALS.review5].map((review, idx) => (
          <div
            key={idx + 3}
            className={`fade-up opacity-0 translate-y-8 duration-700 ease-out rounded-2xl p-6 transition-transform hover:-translate-y-2 hover:shadow-2xl hover:border-[#FF5722]/40 relative group ${cardStyle}`}
            style={{ transitionDelay: `${(idx + 3) * 150}ms` }}
          >
            <FaQuoteLeft className="text-[#FF5722] text-3xl mb-4 animate-pulse group-hover:scale-110 transition-transform duration-300" />
            <p className="text-[1.05rem] leading-relaxed font-medium">
              {review}
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#FF5722] flex items-center justify-center text-white font-semibold shadow-md">
                {String.fromCharCode(68 + idx)}
              </div>
              <span className="text-sm text-gray-400">User {idx + 4}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
