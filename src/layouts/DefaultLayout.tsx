import { Header } from "@/components";
import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export { DefaultLayout };
