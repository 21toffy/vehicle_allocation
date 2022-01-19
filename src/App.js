import logo from './logo.svg';
import './App.css';
import React, { lazy, Suspense, useContext } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Body from "./components/Body";
import Home from "./pages/Home";
import CreateBus from './pages/CreateBus';
import CreateLocation from './pages/CreateLocation';
import ListLocations from './pages/ListLocations';
import InUse from './pages/vehicles/InUse';
import Good from './pages/vehicles/Good';
import Bad from './pages/vehicles/Bad';
import Fair from './pages/vehicles/Fair';
import UnderMaintenance from './pages/vehicles/UnderMaintenance';
import AllocateForm from './pages/allocation/AllocateForm';

import Login from './components/Login'

const LoadingFallback =()=>(
  <div>
          hello...
        </div>
      )

      
      // const AppRoutes = () => {
        
        //   return (
          //     <>
          //       <Suspense fallback={<LoadingFallback />}>
          //         <Switch>
          //         </Switch>
          //       </Suspense>
          //     </>)
          // }
          
          
          
const UnauthenticatedRoutes = () => (
  <Switch>


<Route path="/login">
      <Login />
    </Route>


    <Route path="/create-bus">
      <CreateBus />
    </Route>
    <Route path="/create-location">
      <CreateLocation />
    </Route>

    <Route path="/destinations">
      <ListLocations />
    </Route>

    <Route path="/in-use">
      <InUse />
    </Route>
    <Route path="/good-vehicles">
      <Good />
    </Route>
    <Route path="/bad-vehicles">
      <Bad />
    </Route>
    <Route path="/fair-vehicles">
      <Fair />
    </Route>
    <Route path="/currently-fixed">
      <UnderMaintenance />
    </Route>
<Route path='/allocate'>
<AllocateForm />
</Route>
    
    <Route path="/">
      <Home />
    </Route>
  </Switch>
);


const AppRoutes = () => {
  return (
      <>
        <Suspense fallback={<LoadingFallback />}>
          <Switch>
          <UnauthenticatedRoutes />
          </Switch>
        </Suspense>
      </>
      )
    }


function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingFallback />}>
        {/* <Body> */}
        <AppRoutes />
        {/* </Body> */}
     </Suspense>

    </Router>
  );
}

export default App;


