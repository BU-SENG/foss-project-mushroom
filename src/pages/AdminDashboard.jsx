import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../hooks/useAuth";
import RequestList from "../components/RequestList";
import { fetchMaintenanceRequests } from "../utils/supabase";
import { LoadingSpinner } from "../components/ui";

const AdminDashboard = () => {
  const { profile } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadRequests = useCallback(async () => {
    try {
      const fetchedRequests = await fetchMaintenanceRequests(null);
      setRequests(fetchedRequests);
    } catch (err) {
      console.error("Failed to load maintenance requests", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRequests();
  }, [loadRequests]);

  const handleExport = () => {
    console.log(
      "Export button clicked. Admin can now implement CSV/Excel export logic."
    );
    alert("Preparing data for export... (Implementation required)");
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-8">
      <RequestList
        requests={requests}
        role={profile?.role}
        onRefresh={() => {
          setLoading(true);
          loadRequests();
        }}
        onExportClick={handleExport}
      />
    </div>
  );
};

export default AdminDashboard;
