import { FaLeaf } from "react-icons/fa";

const SectionHeader = ({ title }: { title: string }) => {
  return (
    <div className=" flex gap-3 ">
      <h2 className="text-lg my-8 flex items-center gap-2 font-semibold text-gray-600">
        {title}
      </h2>
      <div className="flex items-center space-x-1">
        <FaLeaf className="text-green-500 text-2xl" />
      </div>
    </div>
  );
};

export default SectionHeader;
