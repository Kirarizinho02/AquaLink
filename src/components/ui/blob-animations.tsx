interface BlobAnimationsProps {
  children: React.ReactNode;
}

const BlobAnimations = ({ children }: BlobAnimationsProps) => {
  return (
    <>
      <svg
        className="absolute top-[-80px] right-[-80px] w-[550px] h-[550px] animate-blob blur-2xl"
        viewBox="0 0 300 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <ellipse
          cx="150"
          cy="150"
          rx="120"
          ry="90"
          fill="var(--color-verde-accent)"
          opacity="0.45"
        />
      </svg>
      <svg
        className="absolute bottom-[-60px] right-[-60px] w-[250px] h-[250px] animate-blob2 blur-xl"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <ellipse
          cx="100"
          cy="100"
          rx="80"
          ry="60"
          fill="var(--color-verde-azul)"
          opacity="0.5"
        />
      </svg>
      <svg
        className="absolute top-[40%] left-[120px] w-[180px] h-[180px] animate-blob3 blur-2xl"
        viewBox="0 0 180 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <ellipse
          cx="90"
          cy="90"
          rx="70"
          ry="50"
          fill="var(--color-azul-quaternario)"
          opacity="0.35"
        />
      </svg>
      {children}
    </>
  );
};

export { BlobAnimations };
