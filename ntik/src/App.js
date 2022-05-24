import React, { useEffect, useState } from "react";
import "./assets/css/app.css";
import Swiper, { Navigation } from "swiper";
import "swiper/swiper-bundle.css";
Swiper.use([Navigation]);
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom'
import { login, logout } from './utils'
import getConfig from './config'
const { networkId } = getConfig(process.env.NODE_ENV || 'development')

//Uis 
import Header from "./components/Header";
import Home from "./pages/Home";
import Liked from "./pages/Liked";
import Profile from "./pages/Profile";
import Upload from "./pages/Upload";

//menu 
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Paper from '@mui/material/Paper';
import { Person } from "@mui/icons-material";
import { AddCircle } from "@mui/icons-material";
import HomeIcon from '@mui/icons-material/BedroomBaby';




function App() {
  const [showNotification, setShowNotification] = useState(false)
  const [loading, setload] = useState(null);
  const [data, setData] = useState([
    {
      video: [],
      author: [],
      title: [],
    },
  ]);

  return (
    <div className="App">
      <Header />

      <div id="body">

        {MenuBar()}

      </div>

    </div>
  );
}

// this component gets rendered by App after the form is submitted
function Notification() {
  const urlPrefix = `https://explorer.${networkId}.near.org/accounts`
  return (
    <aside>
      <a target="_blank" rel="noreferrer" href={`${urlPrefix}/${window.accountId}`}>
        {window.accountId}
      </a>
      {' '/* React trims whitespace around tags; insert literal space character when needed */}
      called method: 'setGreeting' in contract:
      {' '}
      <a target="_blank" rel="noreferrer" href={`${urlPrefix}/${window.contract.contractId}`}>
        {window.contract.contractId}
      </a>
      <footer>
        <div>✔ Succeeded</div>
        <div>Just now</div>
      </footer>
    </aside>
  )
}

function MenuBar() {
  return (
    <>
      <BrowserRouter>
        <Box sx={{ pb: 7 }} >
          <CssBaseline />
          <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 9999 }} elevation={4}>
            <BottomNavigation
              showLabels

            >
              <BottomNavigationAction to="/" component={Link} label="Home" icon={<HomeIcon />} />
              <BottomNavigationAction to="/upload" component={Link} label="Upload" icon={<AddCircle />} />
              <BottomNavigationAction to="/liked" component={Link} label="Favorites" icon={<FavoriteIcon />} />
              <BottomNavigationAction to="/profile" component={Link} label="Profile" icon={<Person />} />
            </BottomNavigation>
          </Paper>
        </Box>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/liked" element={<Liked />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}


export default App;

