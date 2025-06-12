import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Login from "./components/auth/Login/Login";
import Registration from "./components/auth/registration/Registration";
import './App.css';
import Profile from "./components/auth/profile/Prolife";
import AddCompany from "./components/companies/AddCompany";
import MyCompanies from "./components/auth/profile/MyCompanies/MyCompanies";
import AddCampaings from "./components/campaings/AddCampaings";
import MainPage from "./components/auth/mainPage/MainPage";
import CampaignsPage from "./components/auth/CampaignPage/CampaignsPage";
import CompaniesPage from "./components/auth/CompaniesPage/CompaniesPage";
import CampaignDetails from "./components/auth/CampaignPage/Campaign/CampaignDetails";
import FavoritesPage from "./components/auth/profile/Favorites/FavoritesPage";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';
import MyDonations from "./components/auth/profile/MyDonationsPage/MyDonations";

// Установить root-элемент для accessibility (иначе будет warning в консоли)
Modal.setAppElement('#root');


function App() {
  return (
      <>
        <BrowserRouter>
          <Routes>
            {/*<Route path='/logout' element={checkAuth?<Logout setCheck={setCheckAuth}/>:<Login/>}></Route>*/}
            <Route path='/login' element={<Login />}></Route>
            <Route path='/registration' element={<Registration/>}></Route>
              <Route path='/profile' element={<Profile/>}></Route>
              <Route path='/companies/add' element={<AddCompany/>}></Route>
              <Route path='/campaigns/add' element={<AddCampaings/>}></Route>
              <Route path='/' element={<MainPage/>}></Route>
              <Route path='/campaigns' element={<CampaignsPage/>}></Route>
              <Route path="/companies" element={<CompaniesPage />} />
            <Route path="/campaigns/:id" element={<CampaignDetails />} />
            <Route path="/favorites" element={<FavoritesPage />} />

            <Route path="/donations" element={<MyDonations />} />





            <Route path="/profile/companies" element={<MyCompanies />} />



          </Routes>
          <ToastContainer position="top-right" autoClose={3000} />

        </BrowserRouter>
        </>
  );
}

export default App;
