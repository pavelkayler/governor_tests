import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ContextProvider } from "../../core/context/Context.jsx";
import { RouterProvider } from "react-router-dom";
import { Routes } from "../../core/routes/Routes.jsx";

function App() {
  return (
    <ContextProvider>
      <RouterProvider router={Routes} />
    </ContextProvider>
  );
}

export default App;
