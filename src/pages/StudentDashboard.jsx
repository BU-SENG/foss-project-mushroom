import DashboardLayout from "../layouts/DashboardLayout";

export default function StudentDashboard() {
  return (
    <DashboardLayout title="My Maintenance Requests">
      <div className="bg-white p-6 rounded-lg shadow">
        <p className="text-gray-600 mb-4">
          You currently have no maintenance requests. Submit a new one to get started.
        </p>

        <table className="w-full text-left text-sm text-gray-700">
          <thead>
            <tr className="border-b">
              <th className="py-2">Ticket ID</th>
              <th className="py-2">Room</th>
              <th className="py-2">Issue</th>
              <th className="py-2">Status</th>
              <th className="py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2">#HM-001</td>
              <td className="py-2">B12</td>
              <td className="py-2">Broken fan</td>
              <td className="py-2">Pending</td>
              <td className="py-2">2025-11-18</td>
            </tr>
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
