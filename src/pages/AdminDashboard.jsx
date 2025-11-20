import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../hooks/useAuth";
import RequestList from "../components/RequestList";
import { fetchMaintenanceRequests } from "../utils/supabase";
import { LoadingSpinner } from "../components/ui";
import { generateReport } from "../utils/reportGenerator";

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
    if (!requests || requests.length === 0) {
      alert("No data to export.");
      return;
    }

    const formattedData = requests.map((req) => ({
      ...req,
      student: {
        full_name: req.requester_name || req.profiles?.full_name || "N/A",
      },
    }));

    generateReport(formattedData, "Maintenance_Requests");
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