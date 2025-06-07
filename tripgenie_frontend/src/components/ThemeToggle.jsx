// components/ThemeToggle.jsx
import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div className="flex items-center gap-2">
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={theme}
          onChange={() => setTheme(!theme)}
        />
        <div className="w-11 h-6 bg-gray-300 rounded-full peer dark:bg-gray-600 peer-checked:bg-[#21BCBE] peer-focus:ring-4 peer-focus:ring-blue-300 transition-all duration-300"></div>
        <span className="ml-3 text-sm font-medium">
          {theme ? "Dark" : "Light"}
        </span>
      </label>
    </div>
  );
};

export default ThemeToggle;
