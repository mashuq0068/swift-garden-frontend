import { FaLeaf } from "react-icons/fa";

const Logo = () => {
  return (
    <div className="flex items-center space-x-3">
      {/* Icon Section */}
      <div className="flex items-center space-x-1">
        <FaLeaf className="text-green-500 text-4xl" />
      </div>

      {/* Text Section */}
      <h1 className="text-lg md:text-3xl font-bold text-green-500">
        Swift <span className="text-green-500">Garden</span>
      </h1>
    </div>
  );
};

export default Logo;
