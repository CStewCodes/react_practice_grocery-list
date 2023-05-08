import React, { useState} from "react";
import Header from "./homepage/Header";
import Content from "./homepage/Content";
import Footer from "./homepage/Footer";
import AddSong from "./AddSong"
import Homepage from "./homepage/Homepage";
import {
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
  Route
} from "react-router-dom";

const App = () => {
  const routeDefinitions = createRoutesFromElements(
    
    <Route >
      <Route path="/songs" element={<Homepage />} />
      <Route path="/add-song" element={<AddSong />} />
    </Route>
  );
  
  
  const router = createBrowserRouter(routeDefinitions);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>

  );
};

export default App;
