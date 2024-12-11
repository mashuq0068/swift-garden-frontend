const TableHeader = ({
  title,
  selectedWidth,
}: {
  title: string;
  selectedWidth: string;
}) => {
  return (
    <div className="w-full mb-6">
      <h2 className="text-base font-medium mb-2">{title}</h2>
      <div className={`h-[2px] bg-gray-200`}>
        <div className={`h-[2px] bg-primary ${selectedWidth}`}></div>
      </div>
    </div>
  );
};

export default TableHeader;
