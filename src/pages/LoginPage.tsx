import { logo_no_writing_aqualink_primary } from "@/assets";
import { Input } from "@/components/ui/input"
import { FaGithub, FaGoogle } from "react-icons/fa6";

const LoginPage = () => {
    return (
        <div className="relative min-h-screen w-full overflow-hidden items-center content-center">
            <div className="w-full space-y-4 text-center content-center flex items-center justify-center flex-col">
                <img src={logo_no_writing_aqualink_primary} alt="AquaLink Logo" className="max-w-[55px] mb-4" />
                <h1 className="text-4xl font-bold">Login</h1>
                <p className="text-muted-foreground">
                    Faça login para acessar sua conta AquaLink
                </p>
                <div className="grid grid-cols-2 gap-x-3 w-90">
                    <button className="hover:bg-secondary active:bg-secondary/40 flex items-center justify-center rounded-lg border py-2.5 duration-150 bg-white">
                        <FaGithub />
                    </button>
                    <button className="hover:bg-secondary active:bg-secondary/40 flex items-center justify-center rounded-lg border py-2.5 duration-150 bg-white">
                        <FaGoogle />
                    </button>

                </div>
                <div className="relative w-90">
                        <span className="bg-secondary block h-px w-full"></span>
                        <p className="absolute inset-x-0 -top-2 mx-auto inline-block w-fit px-2 text-sm"> Ou continue com </p>
                </div>
                <form className="w-90 gap-4 space-y-4">
                    <div className="text-start">
                        <label className="font-medium">Email</label>
                        <Input type="email" placeholder="Email" />
                    </div>
                    <div className="text-start">
                        <label className="font-medium">Senha</label>
                        <Input type="password" placeholder="Senha" />
                    </div>
                    <div className="relative mt-8">
                        <button type="submit" className="w-full bg-azul-primario text-white py-2 rounded-lg hover:bg-azul-primario/80 transition duration-300 shadow-md">
                            Entrar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export { LoginPage };
