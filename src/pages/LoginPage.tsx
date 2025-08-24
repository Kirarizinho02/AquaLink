import { aqualink_3d_ver2_br } from "@/assets";
import { LoginUsers } from "@/components";
import { BlobAnimations } from "@/components/ui/blob-animations";
import { motion } from "framer-motion";

const LoginPage = () => {
  return (
    <div className="items-center justify-center grid lg:grid-cols-2 overflow-x-hidden inset-0 w-full bg-[radial-gradient(var(--color-grid)_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_90%_90%_at_50%_50%,#000_60%,transparent_100%)] lg:[mask-image:radial-gradient(ellipse_75%_85%_at_50%_50%,#000_80%,transparent_100%)]">
      <LoginUsers />
      <div className="bg-gradient-to-r from-transparent to-azul-quaternario/55 rounded-4xl h-full translate-x-6 hidden lg:flex relative overflow-hidden ">
        <BlobAnimations>
          <motion.img
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                scale: 1,
                transition: {
                  duration: 1,
                },
              },
            }}
            initial="hidden"
            animate="visible"
            src={aqualink_3d_ver2_br}
            alt="AquaLink 3D"
            className="object-cover relative z-10 mx-auto drop-shadow-lg drop-shadow-azul-secundario"
          />
        </BlobAnimations>
      </div>
    </div>
  );
};

export { LoginPage };
