import { Header } from "@/components";
import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
  return (
    <>
      <div className="flex w-full justify-center grid-cols-1">
        <Header />
      </div>
      <div className="inset-0 w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_90%_90%_at_50%_50%,#000_60%,transparent_100%)] lg:[mask-image:radial-gradient(ellipse_90%_60%_at_50%_50%,#000_80%,transparent_100%)]">
        <Outlet />
      </div>
    </>
  );
};

export { DefaultLayout };
