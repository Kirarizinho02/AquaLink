import { Header } from "@/components";
import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
  return (
    <>
    <div className="flex w-full justify-center">
        <Header />
        <Outlet />
        </div>
    </>
  );
};

export { DefaultLayout };
