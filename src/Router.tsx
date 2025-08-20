// Importação do modo de navegação externo a renderização React
import {
  createBrowserRouter,
} from "react-router";

// Importação das páginas 
import { LandingPage, LoginPage } from "./pages";

// Importação dos layouts
import { DefaultLayout } from "./layouts";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: DefaultLayout,
    children: [
      {
        path: "/",
        Component: LandingPage,
      },
      {
        path: "/login",
        Component: LoginPage,
      }
    ],
  },
]);