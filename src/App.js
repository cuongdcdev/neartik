import React, { useEffect, useState } from "react";
import "./assets/css/app.css";
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom'
import { login, logout } from './utils'
import getConfig from './config'
const { networkId } = getConfig(process.env.NODE_ENV || 'development')
import Single from "./pages/Single";
import Test from "./pages/Test";
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
import LoginBtn from "./components/LoginBtn";




function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const [showNotification, setShowNotification] = useState(false)
  const [loading, setload] = useState(null);
  const [data, setData] = useState([
    {
      video: [],
      author: [],
      title: [],
    },
  ]);


  function MenuBar() {
     return (
      <>
        <BrowserRouter>
          <Box >
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
            <Route path="/upload" element={ loggedIn ?  <Upload /> : <LoginBtn/> } />
            <Route path="/profile" element= {loggedIn ? <Profile /> : <LoginBtn/>  }  />
            <Route path="/liked" element={  loggedIn ? <Liked /> : <LoginBtn/>  } />
            {/* <Route path="/comment" element={<Comment />} /> */}
            {/* <Route path="/single" element={<Single />} /> */}
            {/* <Route path="/test" element={<Test />} /> */}

            <Route path="/@:walletid" element={<Profile/>} />
            <Route path="/@:walletid/p:postid" element={<Single/>} />
          </Routes>
        </BrowserRouter>
      </>
    )
    
  }


  React.useEffect(() => {
    console.log("window contract: ", window.contract)
    // in this case, we only care to query the contract when signed in
    if (window.walletConnection.isSignedIn()) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [])

  return (
    <div className="App">
      <Header />

      <div id="body">

        {MenuBar()}

      </div>

    </div>
  );
}//App 

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


export default App;

