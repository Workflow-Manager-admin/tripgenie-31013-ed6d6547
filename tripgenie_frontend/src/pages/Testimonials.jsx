/**
 * Kavia AI Documentation:
 * Testimonials.jsx - Displays a set of user reviews about Vistara/TripGenie in styled cards.
 */
import { useContext } from "react";
import { TESTIMONIALS } from "../utils/constants";
import ThemeContext from "../context/ThemeContext";

const Testimonials = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`my-24 lg:px-24 transition-colors duration-300 ${
        theme ? "bg-black text-white" : "bg-[#FFE8DC] text-black"
      }`}
    >
      <div className="flex items-center justify-center lg:px-64">
        <h2
          className={`mb-6 text-center lg:text-5xl text-3xl lg:px-0 px-6 font-bold text-[#FF5722]`}
        >
          {TESTIMONIALS.title}
        </h2>
      </div>
      <div className="grid grid-cols-12 gap-5 mt-5 lg:px-12">
        {[TESTIMONIALS.review1, TESTIMONIALS.review2, TESTIMONIALS.review3].map(
          (review, idx) => (
            <div
              key={idx}
              className={`col-span-12 lg:col-span-4 px-8 py-10 rounded-xl transition-colors duration-300 ${
                theme
                  ? "bg-[#FF5722] bg-opacity-90 text-white"
                  : "bg-[#FFCCBC] text-black"
              }`}
            >
              <p className="lg:text-lg text-sm font-medium">{review}</p>
            </div>
          )
        )}
        {[TESTIMONIALS.review4, TESTIMONIALS.review5].map((review, idx) => (
          <div
            key={idx + 3}
            className={`col-span-12 lg:col-span-6 px-8 py-10 rounded-xl transition-colors duration-300 ${
              theme
                ? "bg-[#FF5722] bg-opacity-90 text-white"
                : "bg-[#FFCCBC] text-black"
            }`}
          >
            <p className="lg:text-lg text-sm font-medium">{review}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
