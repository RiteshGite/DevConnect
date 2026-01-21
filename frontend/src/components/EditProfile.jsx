import { useState } from "react";
import UserCard from "./UserCard";
import toast from "react-hot-toast";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const {
    firstName: fName,
    lastName: lName,
    age: userAge,
    about: userAbout,
    photoUrl: userPhoto,
    skills: userSkills,
    gender: userGender,
  } = user;

  const [firstName, setFirstName] = useState(fName || "");
  const [lastName, setLastName] = useState(lName || "");
  const [age, setAge] = useState(userAge || "");
  const [about, setAbout] = useState(userAbout || "");
  const [photoUrl, setPhotoUrl] = useState(userPhoto || "");
  const [gender, setGender] = useState(userGender || "");
  const [skills, setSkills] = useState(userSkills || []);
  const [skillInput, setSkillInput] = useState("");

  const dispatch = useDispatch();

  const addSkill = () => {
    const value = skillInput.trim();
    if (!value) return;

    // avoid duplicates (optional but recommended)
    if (skills.includes(value)) return;

    setSkills((prev) => [...prev, value]);
    setSkillInput("");
  };

  const removeSkill = (indexToRemove) => {
    setSkills((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleProfileSave = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(
        `${BASE_URL}/profile/edit`, 
        { firstName, lastName, age, photoUrl, about, gender, skills },
        { withCredentials: true });
      dispatch(addUser(res?.data?.after));
      toast.success(res.data.message);
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.errors || err?.data?.message || "Something went wrong");
    }
  }

  return (
    <div className="flex justify-around w-screen">
      <div>
        <form className="card w-full max-w-2xl bg-base-100/10 backdrop-blur-md shadow-xl space-y-5"
        onSubmit={handleProfileSave}>
          <h2 className="text-2xl font-semibold text-primary md: mb-12">
            Edit Profile
          </h2>
          {/* Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label text-base-content/80">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="input input-bordered w-full bg-base-100/10"
              />
            </div>

            <div>
              <label className="label text-base-content/80">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="input input-bordered w-full bg-base-100/10"
              />
            </div>
          </div>

          {/* Age & Gender */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label text-base-content/80">Age</label>
              <input
                type="number"
                min={12}
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="input input-bordered w-full bg-base-100/10"
              />
            </div>

            <div>
              <label className="label text-base-content/80">Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="select select-bordered w-full bg-base-100"
              >
                <option value="">Select gender</option>
                <option value="male">male</option>
                <option value="female">female</option>
                <option value="other">other</option>
              </select>
            </div>
          </div>

          {/* Photo URL */}
          <div>
            <label className="label text-base-content/80">
              Profile Photo URL
            </label>
            <input
              type="url"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              className="input input-bordered w-full bg-base-100/10"
            />
          </div>

          {/* About */}
          <div>
            <label className="label text-base-content/80">About</label>
            <textarea
              rows="3"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="textarea textarea-bordered w-full bg-base-100/10 resize-none"
            />
          </div>

          {/* Skills */}
          <div>
            <label className="label text-base-content/80">Skills</label>

            <div className="flex gap-2">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                className="input input-bordered w-full bg-base-100/10"
                placeholder="Add a skill"
              />

              <button
                type="button"
                onClick={addSkill}
                className="btn btn-primary"
              >
                Add
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-3">
            {skills.map((skill, index) => (
              <span
                key={skill}
                className="badge badge-outline flex items-center gap-2"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(index)}
                  className="text-error font-bold"
                >
                  ×
                </button>
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <button type="submit" className="btn btn-primary">
              Save Profile
            </button>
          </div>
        </form>
      </div>
      <div className="pt-16">
        {
          <UserCard
            user={{
              firstName,
              lastName,
              age,
              about,
              photoUrl,
              gender,
              skills
            }}
          />
        }
      </div>
    </div>
  );
};

export default EditProfile;