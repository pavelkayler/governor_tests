import {ContextProvider} from "../../core/context/Context.jsx";
import routes from "../../core/router/Router.jsx";
import {RouterProvider} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"

function App() {

    return (
        <ContextProvider>
            <RouterProvider router={routes}/>
        </ContextProvider>
    )
}

export default App
