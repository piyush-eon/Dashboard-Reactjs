import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import ResponsiveDrawer from "./components/Drawer/ResponsiveDrawer";
import ApproveNews from "./Pages/ApproveNews/ApproveNews";
import CreateNews from "./Pages/CreateNews/CreateNews";
import AllNews from "./Pages/AllNews/AllNews";
import Users from "./Pages/Users/Users";
import Home from "./Pages/Home/Home";
import Auth from "./Pages/Auth/Auth";
import { useState } from "react";

function App() {
  const [islogout, setIsLogout] = useState(true);

  return (
    <BrowserRouter>
      <ResponsiveDrawer islogout={islogout} setIsLogout={setIsLogout}>
        <Route path="/" exact>
          <Auth islogout={islogout} setIsLogout={setIsLogout} />
        </Route>
        <Route path="/home" component={Home} />
        <Route path="/allnews" component={AllNews} />
        <Route path="/create" component={CreateNews} />
        <Route path="/approve" component={ApproveNews} />
        <Route path="/users" component={Users} />
      </ResponsiveDrawer>
    </BrowserRouter>
  );
}

export default App;
