import React from 'react';
import './App.css';
import 'react-notifications/lib/notifications.css';
import Header from './components/layout/header';
import Sidebar from './components/layout/sidebar';
import Main from './components/layout/main';
import { ThemeProvider } from '@material-ui/core/styles'; 
import theme from './theme';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from  './hooks/useAuth';
import {NotificationContainer} from 'react-notifications';


function App() {

  const user = JSON.parse(localStorage.getItem('bwf-user'));

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider user={user}>
        <div className="App">
            <Router>
              <Header />
              <div className="general-content">
                <Sidebar/>
                <Main/>
              </div>
            </Router>
        </div>
        <NotificationContainer/>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
