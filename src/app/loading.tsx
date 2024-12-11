import Image from "next/image";

const Loading = () => {
  return (
    <div
      className={`animated flex LoadingOverlay text-center center-full-screen`}
    >
      <Image
        alt="Loading spinner"
        className="progressCustom-logo"
        src={"/images/spin.svg"}
        width={80}
        height={80}
      />
    </div>
  );
};

export default Loading;
