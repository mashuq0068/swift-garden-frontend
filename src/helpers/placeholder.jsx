import Image from "next/image";


const Placeholder = () => {
    return (
        <div className="absolute min-h-[200px] left-[30%]">
            <Image src="/images/placeholder.png" alt="placeholder" width={200} height={200}/>
        </div>
    );
};

export default Placeholder;