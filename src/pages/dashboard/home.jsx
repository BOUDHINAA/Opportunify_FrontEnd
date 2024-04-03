import Sidebar from './partials/Sidebar';
import Header from './partials/Header';
import WelcomeBanner from './partials/dashboard/WelcomeBanner';
import DashboardAvatars from './partials/dashboard/DashboardAvatars';
import FilterButton from './components/DropdownFilter';
import Datepicker from './components/Datepicker';
import DashboardCard01 from './partials/dashboard/DashboardCard01'
import DashboardCard02 from './partials/dashboard/DashboardCard02';
import DashboardCard03 from './partials/dashboard/DashboardCard03';
import DashboardCard04 from './partials/dashboard/DashboardCard04';
import DashboardCard05 from './partials/dashboard/DashboardCard05';
import DashboardCard06 from './partials/dashboard/DashboardCard06';
import DashboardCard07 from './partials/dashboard/DashboardCard07';
import DashboardCard08 from './partials/dashboard/DashboardCard08';
import DashboardCard09 from './partials/dashboard/DashboardCard09';
import Banner from './partials/Banner';

import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function HomeDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const [jobOffers, setJobOffers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          throw new Error("Access token not found");
        }
        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
        const response = await axios.get("http://localhost:3000/user", config);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchJobOffers = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          throw new Error("Access token not found");
        }
        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
        const response = await axios.get("http://localhost:3000/job_offer/getall", config);
        setJobOffers(response.data);
      } catch (error) {
        console.error("Error fetching job offers:", error);
      }
    };
    fetchJobOffers();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const viewUserr = (offer) => {
    navigate(`/job_offer/${offer._id}`);
  };

  const handleDelete = async (offerId) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        throw new Error("Access token not found");
      }
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      await axios.delete(`/job_offer/delete/${offerId}`, config);
      setJobOffers(jobOffers.filter(offer => offer._id !== offerId));
    } catch (error) {
      console.error('Failed to delete job offer:', error);
    }
  };

  const filteredJobOffers = jobOffers.filter((offer) => {
    const { title, description, qualifications, responsibilities, lieu, langue } = offer;
    if (searchTerm) {
      return (
        title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        qualifications.toLowerCase().includes(searchTerm.toLowerCase()) ||
        responsibilities.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lieu.toLowerCase().includes(searchTerm.toLowerCase()) ||
        langue.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      return true;
    }
  });

  return (
    <div className="flex h-screen overflow-y-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <WelcomeBanner />
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              <DashboardAvatars />
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                <FilterButton />
                <Datepicker />
                <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
                  <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                    <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                  </svg>
                  <span className="hidden xs:block ml-2">Add view</span>
                </button>                
              </div>
            </div>
            <div className="grid grid-cols-12 gap-2">
              <DashboardCard01 />
              <DashboardCard02 />
              <DashboardCard03 />
              <DashboardCard04 />
              <DashboardCard05 />
              <DashboardCard06 />
              <DashboardCard07 />
              <DashboardCard08 />
              <DashboardCard09 />
            </div>
          </div>
        </main>
        <Banner />
      </div>
    </div>
  );
}

export default HomeDashboard;