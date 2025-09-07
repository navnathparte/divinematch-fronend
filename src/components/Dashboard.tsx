import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 bg-gray-50 p-6">
        <h1 className="text-3xl font-bold mb-4">
          Welcome, {user?.username} 👋
        </h1>
        <p className="text-gray-600">
          This is your Divine Match. You can add widgets, stats, or any content
          you want here.
        </p>
      </main>
    </div>
  );
}
