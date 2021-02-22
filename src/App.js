import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import ResponsiveDrawer from "./components/Drawer/ResponsiveDrawer";
import ApproveNews from "./Pages/ApproveNews/ApproveNews";
import CreateNews from "./Pages/CreateNews/CreateNews";
import AllNews from "./Pages/AllNews/AllNews";
import Users from "./Pages/Users/Users";
import Home from "./Pages/Home/Home";

function App() {
  return (
    <BrowserRouter>
      <ResponsiveDrawer>
        <Route path="/" component={Home} exact />
        <Route path="/allnews" component={AllNews} />
        <Route path="/create" component={CreateNews} />
        <Route path="/approve" component={ApproveNews} />
        <Route path="/users" component={Users} />
      </ResponsiveDrawer>
    </BrowserRouter>
  );
}

export default App;
