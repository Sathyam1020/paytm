import React from 'react'
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Signup from './pages/Signup';
import Home from './pages/Home';
import Signin from './pages/Signin';
import Dashboard from './pages/Dashboard';
import {SendMoney} from "./pages/SendMoney";
import OpenRoute from "./components/OpenRoute";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {

  return (
    <>
       <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}/>
            <Route
                path="/signup"
                element={
                    <OpenRoute>
                        <Signup />
                    </OpenRoute>
                }
            />
            <Route
                path="/signin"
                element={
                    <OpenRoute>
                        <Signin />
                    </OpenRoute>
                }
            />
            <Route
                path="/dashboard"
                element={
                    <PrivateRoute >
                        <Dashboard />
                    </PrivateRoute>
                }
            />
            <Route
                path="/send-money"
                element={
                    <PrivateRoute >
                        <SendMoney />
                    </PrivateRoute>
                }
            />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App; 