import * as React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Analytics from './Analytics';
import AppNavbar from './components/AppNavbar';
import SideMenu from './components/SideMenu';
import Box from '@mui/material/Box';
import Details from './Details';
function App() {
  return (
    <Router>
        <Box sx={{ display: 'flex' }} >
          <SideMenu />
            <AppNavbar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/analytics/:viewType" element={<Analytics />} />
              <Route path="/analytics/new-page" element={<Details />} />

            </Routes>
        </Box>
    </Router>
  );
}

export default App;