import { AppContextProvider, AuthProvider, ThemeProvider } from "./contexts"
import { RouterProvider } from "react-router-dom";
import { router } from "./Router";

function App() {

  return (
    <>
      <AppContextProvider>
        <AuthProvider>
          <ThemeProvider>
            <RouterProvider router={router} />
          </ThemeProvider>
        </AuthProvider> 
      </AppContextProvider>
    </>
  )
}

export default App
