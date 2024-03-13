import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Navbar } from "@/widgets/layout";
import routes from "@/routes";
import axios from "axios";
import { Toaster } from "react-hot-toast";
axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.withCredentials = true ;
axios.defaults.baseURL="http://127.0.0.1:3000"
axios.defaults.withCredentials=true


function App() {
  const { pathname } = useLocation();

  return (
    <>

      {!(pathname == '/sign-in' || pathname == '/sign-up') }

      {!(pathname == '/sign-in' || pathname == '/sign-up' || pathname == '/passwordreset') && (
        <div className="container absolute left-2/4 z-10 mx-auto -translate-x-2/4 p-4">
          <Navbar routes={routes} />
        </div>
      )

      }
      <Routes>
        {routes.map(
          ({ path, element }, key) =>
            element && <Route key={key} exact path={path} element={element} />
        )}
        <Route path="*" element={<Navigate to="/home" replace />} />
        
      </Routes>
    </>
  );
}

export default App;