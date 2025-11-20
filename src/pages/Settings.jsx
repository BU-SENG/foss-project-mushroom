import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { updateProfile, updatePassword } from "../utils/supabase";
import {Card, Input, Button} from "../components/ui";
import { Save, Lock, User, Home } from "lucide-react";

// --- Shared Components ---

// Component for updating Name
const ProfileForm = ({ profile, user, onUpdate }) => {
  const [fullName, setFullName] = useState(profile?.full_name || "");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const result = await updateProfile(user.id, { full_name: fullName });

    if (result.success) {
      setStatus({ type: "success", message: "Profile updated successfully!" });
      onUpdate(); // Refresh auth state via context if needed
    } else {
      setStatus({ type: "error", message: result.error });
    }
    setLoading(false);
  };

  return (
    <Card title="Update Name" className="mb-6">
      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        <Input
          label="Full Name"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          Icon={User}
        />
        {status && (
          <p
            className={`text-sm ${
              status.type === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {status.message}
          </p>
        )}
        <Button type="submit" loading={loading} Icon={Save}>
          Save Name
        </Button>
      </form>
    </Card>
  );
};

// Component for changing Password
const PasswordForm = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    if (password.length < 6) {
      setStatus({
        type: "error",
        message: "Password must be at least 6 characters.",
      });
      setLoading(false);
      return;
    }

    const result = await updatePassword(password);

    if (result.success) {
      setStatus({
        type: "success",
        message: "Password updated successfully! You may need to re-login.",
      });
      setPassword("");
    } else {
      setStatus({ type: "error", message: result.error });
    }
    setLoading(false);
  };

  return (
    <Card title="Change Password" className="mb-6">
      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        <Input
          label="New Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          Icon={Lock}
        />
        {status && (
          <p
            className={`text-sm ${
              status.type === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {status.message}
          </p>
        )}
        <Button type="submit" loading={loading} Icon={Lock}>
          Update Password
        </Button>
      </form>
    </Card>
  );
};

// --- Student-Specific Component ---
const StudentSettings = ({ profile, user, onUpdate }) => {
  const [room, setRoom] = useState(profile?.room || "");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const result = await updateProfile(user.id, { room: room });

    if (result.success) {
      setStatus({ type: "success", message: "Room number saved!" });
      onUpdate(); // Refresh auth state
    } else {
      setStatus({ type: "error", message: result.error });
    }
    setLoading(false);
  };

  return (
    <Card title="Maintenance Details" className="mb-6">
      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        <Input
          label="Room Number"
          type="text"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          required
          Icon={Home}
        />
        {status && (
          <p
            className={`text-sm ${
              status.type === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {status.message}
          </p>
        )}
        <Button type="submit" loading={loading} Icon={Save}>
          Save Room
        </Button>
      </form>
    </Card>
  );
};

// --- Admin-Specific Component ---
const AdminSettings = () => {
  return (
    <Card title="System Administration Tools" className="mb-6 p-4">
      <h3 className="font-semibold text-lg mb-3">System Settings</h3>
      <div className="space-y-2">
        <p className="text-gray-600">
          <Button variant="secondary" disabled>
            Manage Student Accounts
          </Button>
          <span className="ml-4 text-sm text-gray-500">
            {" "}
            (Requires separate Admin User Management table/page)
          </span>
        </p>
        <p className="text-gray-600">
          <Button variant="secondary" disabled>
            Manage Request Categories
          </Button>
          <span className="ml-4 text-sm text-gray-500">
            {" "}
            (Requires a dedicated categories table)
          </span>
        </p>
      </div>

      <p className="mt-4 text-sm text-yellow-600 border-t pt-4">
        Note: Core admin management pages (like managing all student profiles)
        are not fully implemented here as they require significant new
        UI/backend structure.
      </p>
    </Card>
  );
};

// --- Main Settings Page ---
const Settings = () => {
  const { user, profile, role, fetchProfile } = useAuth();

  // We pass fetchProfile as a handler to ensure the context state updates after a successful profile save
  const handleProfileUpdate = () => {
    if (user) {
      // Re-fetch profile data to update the state used by the context/components
      fetchProfile(user.id);
    }
  };

  if (!user) {
    return <p className="p-6 text-center">Loading user data...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Account Settings</h1>

      {/* General Account Section (Shared) */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="md:col-span-1">
          <ProfileForm
            user={user}
            profile={profile}
            onUpdate={handleProfileUpdate}
          />
        </div>
        <div className="md:col-span-1">
          <PasswordForm />
        </div>
      </div>

      {/* Role-Specific Sections */}
      {role === "student" && (
        <StudentSettings
          user={user}
          profile={profile}
          onUpdate={handleProfileUpdate}
        />
      )}

      {role === "admin" && <AdminSettings />}

      {/* User Info Display */}
      <Card title="Current Account Information">
        <div className="p-4 text-sm space-y-2">
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Role:</strong>{" "}
            <span className="capitalize">{role || "N/A"}</span>
          </p>
          {profile?.room && (
            <p>
              <strong>Room:</strong> {profile.room}
            </p>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Settings;
