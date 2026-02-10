import EditProfile from "./EditProfile";
import { useSelector } from "react-redux";
import AIChatbot from "./AIChatBot";

const Profile = () => {
  const user = useSelector((store) => store.user);
  return (
    user && (
      <>
        <div className="flex justify-center px-4 pt-10 pb-40 min-h-screen">
          <EditProfile user={user} />
        </div>
        <AIChatbot />
      </>
    )
  );
};

export default Profile;
