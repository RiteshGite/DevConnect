import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Body from "./components/Body";
import Login from "./components/Login";
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import Error from "./components/Error";
import { Toaster } from "react-hot-toast";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import Membership from "./components/Membership";
import Landing from "./components/Landing";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          <Route path="/" element={<Body />}>
            <Route index element={<Landing />} />
            <Route element={<ProtectedRoute />}>
              <Route path="login" element={<Login />} />
            </Route>
            <Route path="feed" element={<Feed />} />
            <Route path="profile" element={<Profile />} />
            <Route path="connections" element={<Connections />} />
            <Route path="requests" element={<Requests />} />
            <Route path="membership" element={<Membership />} />
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
