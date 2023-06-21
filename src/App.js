import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import ViewDetails from "./pages/ViewDetails";
import Error from "./pages/Error";
import AddDetails from "./pages/AddDetails";
import { Toaster } from "react-hot-toast";
import EditDetails from "./pages/EditDetails";
import { AppContext } from "./context/AppContext";
import { useState } from "react";

function App() {
  const [usersData, setUsersData] = useState([]);

  return (
    <div>
      {/* Provide the usersData and setUsersData to the AppContext */}
      <AppContext.Provider value={{ usersData, setUsersData }}>
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
           {/* Define the routes for different pages */}
          <Route path="/" element={<Home />} />
          <Route path="/edit-form" element={<Home />} />
          <Route path="/view-user/:id" element={<ViewDetails />} />
          <Route path="/add-user" element={<AddDetails />} />
          <Route path="/edit-user/:id" element={<EditDetails />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </AppContext.Provider>
    </div>
  );
}

export default App;
