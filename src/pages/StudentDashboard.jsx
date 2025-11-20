import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { Button, LoadingSpinner } from "../components/ui";
import RequestList from "../components/RequestList";
import { fetchMaintenanceRequests } from "../utils/supabase";

const StudentDashboard = () => {
  const { user, profile } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadRequests = useCallback(async () => {
    if (!user) return;
    setLoading(true);

    const fetchedRequests = await fetchMaintenanceRequests(user.id);
    setRequests(fetchedRequests);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    loadRequests();
  }, [loadRequests]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome, {profile?.full_name || "Student"}
        </h1>
        <Link to="/dashboard/new-request">
          <Button variant="success" Icon={Plus}>
            Create New Request
          </Button>
        </Link>
      </div>
      <p className="text-gray-600">
        Here you can see the status of your reported maintenance issues.
      </p>

      <RequestList
        requests={requests}
        role={profile?.role}
        onRefresh={loadRequests}
      />
    </div>
  );
};

export default StudentDashboard;
