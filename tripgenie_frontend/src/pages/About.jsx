import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { FaLocationArrow } from "react-icons/fa";
import about from "../assets/about.png";
import { ABOUT_TEXT } from "../utils/constants";

const About = () => {
  return (
    <div className="lg:my-10 lg:mt-32 my-8 lg:px-24 grid grid-cols-12 gap-3">
      {/* Text Content */}
      <div className="lg:col-span-6 col-span-12 pt-5 flex flex-col justify-center lg:items-start items-center text-center lg:text-left">
        <h2 className="mb-6 lg:text-5xl text-3xl px-4 lg:px-0 font-bold text-primary dark:text-primary">
          {ABOUT_TEXT.title}
        </h2>
        <p className="lg:text-lg text-sm font-medium px-6 lg:px-0 text-muted-foreground">
          {ABOUT_TEXT.description}
        </p>
        <Link to={"create-trip"}>
          <Button className="flex gap-2 mt-6 items-center bg-primary hover:bg-accent text-primary-foreground lg:px-16 px-8 lg:py-7 py-5 rounded-full lg:text-xl text-lg shadow-md transition">
            {ABOUT_TEXT.buttonLable} <FaLocationArrow />
          </Button>
        </Link>
      </div>

      {/* Image Section */}
      <div className="lg:col-span-6 col-span-12 flex justify-center items-center mt-10">
        <img
          className="w-[80%] lg:h-[400px] object-cover rounded-2xl shadow-xl"
          src={about}
          alt="About Vistara"
        />
      </div>
    </div>
  );
};

export default About;
