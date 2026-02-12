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
    memberships,
  } = user;

  const [firstName, setFirstName] = useState(fName || "");
  const [lastName, setLastName] = useState(lName || "");
  const [age, setAge] = useState(userAge || "");
  const [about, setAbout] = useState(userAbout || "");
  const [photoUrl, setPhotoUrl] = useState(userPhoto || "");
  const [gender, setGender] = useState(userGender || "");
  const [skills, setSkills] = useState(userSkills || []);
  const [skillInput, setSkillInput] = useState("");

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(userPhoto || "");
  const [loading, setLoading] = useState(false); // ✅ Added

  const dispatch = useDispatch();

  // Add Skill
  const addSkill = () => {
    const value = skillInput.trim();
    if (!value || skills.includes(value)) return;
    setSkills((prev) => [...prev, value]);
    setSkillInput("");
  };

  // Remove Skill
  const removeSkill = (indexToRemove) => {
    setSkills((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  // Handle Image Change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  // Handle Save
  const handleProfileSave = async (e) => {
    e.preventDefault();
    setLoading(true); // ✅ Start loader

    try {
      const formData = new FormData();

      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("age", age);
      formData.append("about", about);
      formData.append("gender", gender);

      skills.forEach((skill) => {
        formData.append("skills", skill);
      });

      if (imageFile) {
        formData.append("profilePic", imageFile);
      }

      const res = await axios.put(`${BASE_URL}/profile/edit`, formData, {
        withCredentials: true,
      });

      dispatch(addUser(res?.data?.user));
      toast.success(res?.data?.message);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Profile update failed");
    } finally {
      setLoading(false); // ✅ Stop loader
    }
  };

  return (
    <div className="min-h-screen px-4 py-10">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-14 items-start justify-center">
        {/* ================= FORM ================= */}
        <div className="w-full lg:w-[550px]">
          <form
            onSubmit={handleProfileSave}
            className="bg-base-200 shadow-xl rounded-2xl p-8 space-y-6"
          >
            <h2 className="text-2xl font-semibold text-primary">
              Edit Profile
            </h2>

            {/* Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="input input-bordered w-full"
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="input input-bordered w-full"
              />
            </div>

            {/* Age + Gender */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <input
                type="number"
                min={18}
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="input input-bordered w-full"
              />
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="select select-bordered w-full"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Profile Image */}
            <div className="space-y-2">
              <label className="font-medium">Profile Picture</label>

              {preview && (
                <div className="flex justify-center">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-28 h-28 rounded-full object-cover border"
                  />
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="file-input file-input-bordered w-full"
              />
            </div>

            {/* About */}
            <textarea
              rows="4"
              placeholder="Tell something about yourself..."
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="textarea textarea-bordered w-full resize-none"
            />

            {/* Skills */}
            <div>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  placeholder="Add skill"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  className="input input-bordered flex-1"
                />
                <button
                  type="button"
                  onClick={addSkill}
                  className="btn btn-primary"
                >
                  Add
                </button>
              </div>

              <div className="flex flex-wrap gap-3 mt-4">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="badge badge-outline px-4 py-3 text-sm flex items-center gap-2"
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
            </div>

            {/* Save Button with Loader */}
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full mt-4"
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Save Changes"
              )}
            </button>
          </form>
        </div>

        {/* ================= PREVIEW CARD ================= */}
        <div className="w-full lg:w-auto flex justify-center lg:pt-10">
          <UserCard
            user={{
              firstName,
              lastName,
              age,
              about,
              photoUrl: preview,
              gender,
              skills,
              memberships,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
