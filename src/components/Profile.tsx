import { useState, useEffect } from "react";
import API from "../api/request";

type User = {
  email: string;
  username: string;
  bio: string;
};

export default function Profile() {
  const [user, setUser] = useState<User>({
    email: "",
    username: "",
    bio: "",
  });
  const [form, setForm] = useState({ name: "", bio: "" });

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const user = res.data.user;
      setName(user.name);
      setBio(user.bio || "");
      setInterests(user.interests?.join(", ") || "");
      setAvatar(user.avatar || "");
    };
    fetchProfile();
  }, []);

  const handleUpdate = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const res = await fetch("/api/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setUser(data);
  };

  const [name, setName] = useState(user?.username || "");
  const [bio, setBio] = useState("Add your bio here...");
  const [interests, setInterests] = useState("Music, Travel, Fitness");
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = async () => {
    try {
      const res = await API.post("/profile/login", {
        name,
        bio,
        interests,
        avatar: "",
      });
      console.log("Profile updated:", res.data.user);
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center space-x-4">
        <img
          src="https://via.placeholder.com/100"
          alt="profile"
          className="w-24 h-24 rounded-full border shadow"
        />
        <div>
          {isEditing ? (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 rounded-lg"
            />
          ) : (
            <h2 className="text-2xl font-bold">{name}</h2>
          )}
          <p className="text-gray-600">{user?.email}</p>
        </div>
        <button
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          className="ml-auto px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          {isEditing ? "Save" : "Edit"}
        </button>
      </div>

      {/* ✅ Personal Details */}
      <section className="bg-white shadow rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-3">Personal Details</h3>

        {isEditing ? (
          <div className="space-y-4">
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full border p-2 rounded-lg"
            />
            <input
              type="text"
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              className="w-full border p-2 rounded-lg"
            />
          </div>
        ) : (
          <ul className="space-y-2 text-gray-700">
            <li>
              <strong>Bio:</strong> {bio}
            </li>
            <li>
              <strong>Interests:</strong> {interests}
            </li>
            <li>
              <strong>Education & Profession:</strong> Not set
            </li>
            <li>
              <strong>Lifestyle:</strong> Non-smoker, Drinks occasionally
            </li>
          </ul>
        )}
      </section>

      {/* ✅ Profile Media */}
      <section className="bg-white shadow rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-3">Profile Media</h3>
        <div className="flex space-x-4 items-center">
          <img
            src="https://via.placeholder.com/150"
            alt="gallery"
            className="w-32 h-32 rounded-lg object-cover"
          />
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
            Upload Photo
          </button>
        </div>
      </section>

      {/* ✅ Preferences */}
      <section className="bg-white shadow rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-3">Preferences</h3>
        <ul className="space-y-2 text-gray-700">
          <li>
            <strong>Looking for:</strong> Female
          </li>
          <li>
            <strong>Age Range:</strong> 22 - 30
          </li>
          <li>
            <strong>Distance:</strong> Within 20 km
          </li>
          <li>
            <strong>Relationship Goals:</strong> Serious relationship
          </li>
        </ul>
      </section>

      {/* ✅ Privacy & Settings */}
      <section className="bg-white shadow rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-3">Privacy & Settings</h3>
        <ul className="space-y-2 text-gray-700">
          <li>
            <strong>Profile Visibility:</strong> Everyone
          </li>
          <li>
            <strong>Online Status:</strong> Visible
          </li>
          <li>
            <button className="text-red-600 hover:underline">
              Delete Account
            </button>
          </li>
        </ul>
      </section>

      {/* ✅ Profile Completion */}
      <section className="bg-white shadow rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-3">Profile Completion</h3>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div className="bg-green-500 h-4 rounded-full w-2/3"></div>
        </div>
        <p className="mt-2 text-sm text-gray-600">66% complete</p>
      </section>
    </div>
  );
}
