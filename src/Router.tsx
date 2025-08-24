// Importação do modo de navegação externo a renderização React
import {
  createBrowserRouter,
} from "react-router";

// Importação das páginas 
import { LandingPage, LoginPage, Dashboard } from "./pages";

// Importação dos layouts
import { DefaultLayout } from "./layouts";

import { ProtectedRoute } from "./components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: DefaultLayout,
    children: [
      {
        path: "/",
        Component: LandingPage,
      },
      
    ],
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/dashboard",
    Component: () => (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
]);