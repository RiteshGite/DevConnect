import EditProfile from "./EditProfile";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector(store => store.user);
  return (
    user && (
    <div className="flex justify-around pt-12 pb-52">
      <EditProfile user={user}/>
    </div>
  )
 )
}

export default Profile