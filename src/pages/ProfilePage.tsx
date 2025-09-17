import { usePageTitle } from "@/hooks";

const ProfilePage = () => {
  usePageTitle("Perfil | AquaLink");

  return (
    <div>
      <h1>Perfil</h1>
      <p>Bem-vindo ao seu perfil!</p>
    </div>
  );
}

export { ProfilePage };