import { Routes, Route, Navigate, useLocation,BrowserRouter as Router } from "react-router-dom";
import { Navbar } from "@/widgets/layout";
import routes from "@/routes";
import axios from "axios";
import { Toaster } from "react-hot-toast";
axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.withCredentials = true ;
import HomeDashboard from "./pages/dashboard/home"

import Home from "./pages/dashboard/home"
// teb3in user roles and permissions
import Unauthorized from "./pages/unauthorized";
import { Job_offer } from "./pages";
import ProtectedRoute from '@/context/ProtectedRoute';
import { UserProvider, useUser } from './context/usercontext';
import ApplicationDetails from "./pages/ApplicationDetails";
import UpdateApplication from "./pages/UpdateApplication";
import Apply from "./pages/apply";
import Quiz from "./pages/test";
import JobOfferDetails from "./pages/jobOfferDetails";
import JobOfferList from "./pages/jobOffers";

// redirection_roles samarr
function App() {
  const { pathname } = useLocation();
  return (
  
    <UserProvider>



      {!( pathname=='/nav0' ||pathname === '/create' || 
   pathname === '/tables' || 
   pathname === '/passwordreset' || 
   pathname.startsWith('/user/') ||
   pathname === "/dashboard" ||
   pathname.startsWith('/job_offer/')|| pathname=='/redirect-company' || pathname=='/navbar' || pathname=='/nav1' ||pathname == '/sign-in' || pathname == '/sign-up' || pathname == '/passwordreset'||pathname == '/Forgot'||
       pathname=='/sign-upjs'||pathname=="/dashboard"|| pathname=='/home'|| pathname=='/redirect-sign-up'|| pathname === '/create' || 
       pathname === '/tables' || 
       pathname === '/passwordreset' || 
       pathname.startsWith('/user/') ||
       pathname.startsWith('/job_offer/') ||
       pathname === "/dashboard") && (
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


        <Route path="/unauthorized" component={Unauthorized} />
        <Route path="/create" element={<ProtectedRoute element={<Home />} requiredRole="admin" />} />
        <Route path="/dashboard" element={<ProtectedRoute element={<HomeDashboard />} requiredRole="admin" />} />
  <Route path="/job_offer" element={<ProtectedRoute element={<Job_offer />} requiredRole="company" />} />
  <Route path="/applicationDetails/:id" element={<ApplicationDetails />} />
  <Route path="/updateApplication/:id" element={<UpdateApplication/>} />
  <Route path="/apply/:offerId" element={<Apply/>} />
  <Route path="/quiz/:quizId" element={<Quiz/>} />
  <Route exact path="/job-offers" element={<JobOfferList/>} />
  <Route path="/job-offer-details/:id" element={<JobOfferDetails/>} />




        <Route path="/dashboard" element={<ProtectedRoute element={<Home />} requiredRole="admin" />} />
  <Route path="/job_offer" element={<ProtectedRoute element={<Job_offer />} requiredRole="company" />} />
      </Routes>
      
     
    </UserProvider>
  );
  
}

export default App;