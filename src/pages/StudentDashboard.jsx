import DashboardLayout from "../layouts/DashboardLayout";
import RequestCard from "../components/RequestCard";

export default function StudentDashboard() {
  // Temporary mock data until auth + backend are ready
  const requests = [
    {
      id: 1,
      room: "B12",
      issue: "Broken fan",
      status: "pending",
      date: "2025-11-18",
    },
    {
      id: 2,
      room: "D04",
      issue: "Water leakage",
      status: "resolved",
      date: "2025-11-17",
    },
  ];

  return (
    <DashboardLayout title="My Maintenance Requests">
      {requests.length === 0 ? (
        <p className="text-gray-500">You have no maintenance requests yet.</p>
      ) : (
        <div className="space-y-4">
          {requests.map((req) => (
            <RequestCard key={req.id} request={req} />
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}


