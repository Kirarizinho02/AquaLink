import { noise } from "@/assets";

const Noise = () => {
  return (
    <div
      className="absolute inset-0 w-full h-full scale-[1.2] transform opacity-4 [mask-image:radial-gradient(#fff,transparent,75%)]"
      style={{
        backgroundImage: `url(${noise})`,
        backgroundSize: "30%",
      }}
    ></div>
  );
};

export { Noise };