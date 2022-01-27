import React, { useState,useEffect, useContext } from 'react';

/// Routing 
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Authentication from './Authentication'
import {GlobalStyle} from './GlobalStyle';
// Context
import UserProvider from './context';

const App = () => (
    <Router>
      <UserProvider>
          <Authentication />
      <GlobalStyle />
      </UserProvider>
    </Router>
)

export default App;
 