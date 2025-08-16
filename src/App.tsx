import { AppContextProvider } from "./contexts"
import { RouterProvider } from "react-router-dom";
import { router } from "./Router";

function App() {

  return (
    <>
      <AppContextProvider>
        <RouterProvider router={router} />
      </AppContextProvider>
    </>
  )
}

export default App
