import { aqualink_writing_2 } from "@/assets";
import { FaGithub, FaInstagram } from "react-icons/fa6";
import { Link } from "react-router-dom";

const data = {
  instaLink: "https://instagram.com/AquaLinkTCC",
  githubLink: "https://github.com/Kirarizinho02/AquaLink",
};

const socialLinks = [
  { icon: FaInstagram, label: "Instagram", href: data.instaLink },
  { icon: FaGithub, label: "GitHub", href: data.githubLink },
];

const Footer = () => {
  return (
    <footer className="bg-secondary dark:bg-secondary/20 mt-2 w-full place-self-end rounded-t-xl">
      <div className="mx-auto max-w-[1880px] w-full pb-6 pt-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 px-6 md:px-12 lg:px-16 lg:ps-22">
          {/* Coluna 1: Logo e descrição */}
          <div>
            <div className="flex justify-center gap-2 sm:justify-start">
              <img src={aqualink_writing_2} className="h-14 mb-6  " />
            </div>
            <div className="flex justify-center sm:justify-start gap-2"></div>
          </div>
          <hr className="-my-2 border-black/10 dark:border-white/10 lg:hidden block" />

          {/* Colunas 2, 3 e 4: Títulos e linhas */}
          <div className="text-center sm:text-left">
            <h6 className="font-semibold mb-4 text-black/90 dark:text-white/80">
              COMPANHIA
            </h6>
            <ul className="space-y-4 text-sm">
              <li>
                <Link
                  to="/sobre"
                  className="hover:underline text-black/80 dark:text-white/70"
                >
                  Sobre
                </Link>
              </li>
              <li>
                <Link
                  to="/time"
                  className="hover:underline text-black/80 dark:text-white/70"
                >
                  Time
                </Link>
              </li>
            </ul>
          </div>
          {/* Coluna 3: Ajuda */}
          <div className="text-center sm:text-left">
            <h6 className="font-semibold mb-4 text-black/90 dark:text-white/80">
              AJUDA
            </h6>
            <ul className="space-y-4 text-sm">
              <li>
                <Link
                  to="/contato"
                  className="hover:underline text-black/80 dark:text-white/70"
                >
                  Contate-nos
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="hover:underline text-black/80 dark:text-white/70"
                >
                  Perguntas Frequentes
                </Link>
              </li>
            </ul>
          </div>
          {/* Coluna 4: Legal */}
          <div className="text-center sm:text-left">
            <h6 className="font-semibold mb-4 text-black/90 dark:text-white/80">
              LEGAL
            </h6>
            <ul className="space-y-4 text-sm">
              <li>
                <Link
                  to="/privacidade"
                  className="hover:underline text-black/80 dark:text-white/70"
                >
                  Política de Privacidade
                </Link>
              </li>
            </ul>
          </div>
          {/* Coluna 5: Download */}
          <div className="text-center sm:text-left">
            <h6 className="font-semibold mb-4 text-black/90 dark:text-white/80">
              DOWNLOAD
            </h6>
            <ul className="space-y-4 text-sm">
              <li>
                <Link
                  to="/download"
                  className="hover:underline text-black/80 dark:text-white/70"
                >
                  App Mobile
                </Link>
              </li>
            </ul>
          </div>
          <hr className=" border-black/10 dark:border-white/10 block lg:hidden" />
        </div>
        <div className="mt-8 lg:pt-6 lg:border-t border-0 md:mx-12 lg:mx-22 ">
          <div className="flex flex-col md:flex-row items-center w-full justify-between">
            
            {/* Ícones - centralizados em md ou menor, à esquerda em lg+ */}
            <ul className="inline-flex gap-4 mb-2 md:mb-0 md:mr-4 justify-center md:justify-start w-full md:w-auto">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <li key={label}>
                  <Link
                    to={href}
                    className="text-black/90 hover:text-black/40 transition"
                  >
                    <span className="sr-only">{label}</span>
                    <Icon className="size-6" />
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* Texto centralizado */}
            <div className="flex-1 flex justify-center">
              <h6 className="text-sm text-black/70 dark:text-white/60">
                © {new Date().getFullYear()} AquaLink. Todos os direitos reservados.
              </h6>
            </div>
          </div>
        </div>  
      </div>
    </footer>
  );
};

export { Footer };
