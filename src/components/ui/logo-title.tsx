import { logo_no_writing_aqualink_primary } from "@/assets";
import { useSidebar } from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";

const LogoTitle = ({ fontSize }: { fontSize?: string }) => {
  const size = fontSize || "text-xl";
  const { state } = useSidebar(); 
  const navigation = useNavigate();

  return (
      <a onClick={() => navigation("/")} className="cursor-pointer">
    <div className="flex items-center space-x-1">
        <img src={logo_no_writing_aqualink_primary} className="h-8 w-8" alt="AquaLink Logo" />
      {state !== "collapsed" && (
        <>
          <span className={`${size} font-bold text-azul-primario -me-0.5 font-poppins dark:text-azul-terciario`}>Aqua</span>
          <span className={`${size} font-extralight text-azul-secundario ms-0.5 font-poppins dark:text-azul-quaternario`}>Link</span>
        </>
      )}
    </div>
      </a>
  );
}

export { LogoTitle };