import { useState, useEffect } from "react";
import API from "../api/request";

type User = {
  email: string;
  username: string;
  bio: string;
  interests?: string[];
  location?: string;
  age?: number;
  avatar?: string;
};

export default function Profile() {
  const [user, setUser] = useState<User>({
    email: "",
    username: "",
    bio: "",
    interests: [],
    location: "",
    age: 0,
  });
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [interests, setInterests] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get("/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userData = res.data.user;
        setUser(userData);
        setName(userData.username || "");
        setBio(userData.bio || "");
        setInterests(userData.interests?.join(", ") || "");
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };
    fetchProfile();
  }, []);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.put(
        "/profile",
        {
          username: name,
          bio,
          interests: interests.split(",").map((item) => item.trim()),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Profile updated:", res.data.user);
      setUser(res.data.user);
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  const Button = ({
    variant = "primary",
    className = "",
    children,
    ...props
  }: {
    variant?: "primary" | "outline";
    className?: string;
    children: React.ReactNode;
    [key: string]: any;
  }) => {
    const baseClasses = "px-4 py-2 rounded-lg font-medium transition-colors";
    const variantClasses = {
      primary: "bg-red-500 hover:bg-red-600 text-white",
      outline: "border border-gray-300 hover:bg-gray-50 text-gray-700",
    };

    return (
      <button
        className={`${baseClasses} ${variantClasses[variant]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6 gap-6">
          {/* Profile Header */}
          <div className="bg-white rounded-2xl shadow overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
              alt="Cover"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              {isEditing ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="Username"
                  />
                  <input
                    type="text"
                    value={`${user.location || ""}, ${user.age || ""}`}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="Location, Age"
                    disabled
                  />
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="Bio"
                    rows={3}
                  />
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {name || user.username}
                    {user.age && `, ${user.age}`}
                  </h2>
                  <p className="text-gray-600">
                    {user.location || "Location not specified"}
                  </p>
                  <p className="text-gray-700 mt-2">
                    {bio || user.bio || "No bio yet"}
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Photos */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              My Photos
            </h3>
            <div className="grid grid-cols-3 gap-3">
              <img
                src="https://randomuser.me/api/portraits/women/21.jpg"
                alt="pic1"
                className="rounded-lg object-cover w-full h-32"
              />
              <img
                src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
                alt="pic2"
                className="rounded-lg object-cover w-full h-32"
              />
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2"
                alt="pic3"
                className="rounded-lg object-cover w-full h-32"
              />
              <img
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9"
                alt="pic4"
                className="rounded-lg object-cover w-full h-32"
              />
              <img
                src="https://images.unsplash.com/photo-1508780709619-79562169bc64"
                alt="pic5"
                className="rounded-lg object-cover w-full h-32"
              />
              <img
                src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e"
                alt="pic6"
                className="rounded-lg object-cover w-full h-32"
              />
            </div>
          </div>

          {/* About Me */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              About Me
            </h3>
            {isEditing ? (
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Tell us about yourself"
                rows={5}
              />
            ) : (
              <p className="text-gray-700 leading-relaxed">
                {bio ||
                  user.bio ||
                  "Passionate about travel, I've explored over 30 countries and counting. I love meeting new people and experiencing different cultures. When I'm not planning my next trip, you can find me hiking in nature, trying new recipes, or curled up with a good book and a cup of coffee. I'm looking for someone who shares my adventurous spirit and enjoys deep conversations. Let's create some unforgettable memories together!."}
              </p>
            )}
          </div>

          {/* Interests Editor */}
          {isEditing && (
            <div className="bg-white rounded-2xl shadow p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Interests
              </h3>
              <input
                type="text"
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Enter interests separated by commas"
              />
              <p className="text-sm text-gray-500 mt-2">
                Separate interests with commas
              </p>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow p-6 flex flex-col gap-3">
            {isEditing ? (
              <>
                <Button
                  onClick={handleSave}
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  Save Changes
                </Button>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" onClick={() => setIsEditing(true)}>
                  Edit Profile
                </Button>
                <Button className="bg-red-500 hover:bg-red-600 text-white">
                  Send Message
                </Button>
              </>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Interests & Lifestyle
            </h3>
            <div className="mb-4">
              <h4 className="font-medium text-gray-700 mb-2">Interests</h4>
              <div className="flex flex-wrap gap-2">
                {user.interests && user.interests.length > 0
                  ? user.interests.map((tag) => (
                      <span
                        key={tag}
                        className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))
                  : interests.split(",").map((tag) => (
                      <span
                        key={tag}
                        className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm"
                      >
                        {tag.trim()}
                      </span>
                    ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Lifestyle</h4>
              <div className="flex flex-wrap gap-2">
                {[
                  "Active",
                  "Adventurous",
                  "Creative",
                  "Independent",
                  "Optimistic",
                  "Dog Lover",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              What I'm Looking For
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>✅ Someone who loves to travel and explore new places.</li>
              <li>
                ✅ A partner with a good sense of humor and a positive outlook.
              </li>
              <li>✅ Someone who values honesty and open communication.</li>
              <li>
                ✅ Ready for a meaningful connection, not just casual dating.
              </li>
              <li>✅ Enjoys trying new restaurants and cooking together.</li>
            </ul>
          </div>

          <div className="bg-red-50 rounded-2xl shadow p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Compatibility
            </h3>
            <p className="text-4xl font-bold text-red-500 mb-2">85%</p>
            <p className="text-gray-700 mb-4">You share a lot in common!</p>
            <div className="flex flex-wrap justify-center gap-2">
              {["Travel", "Reading", "Adventures", "Good Food"].map((tag) => (
                <span
                  key={tag}
                  className="bg-white text-gray-700 border px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
