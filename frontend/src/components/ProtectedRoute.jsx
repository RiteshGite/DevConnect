import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";

const ProtectedRoute = () => {
    const navigate = useNavigate();
    const user = useSelector(store => store.user);
    if(user) {
      navigate("/feed");
    } else {
      navigate("/login");
    }
};

export default ProtectedRoute;