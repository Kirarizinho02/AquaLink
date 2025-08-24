import { AppContextProvider } from "./contexts"
import { RouterProvider } from "react-router-dom";
import { router } from "./Router";
import { AuthProvider } from "./contexts/AuthContext";

function App() {

  return (
    <>
      <AppContextProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider> 
      </AppContextProvider>
    </>
  )
}

export default App
