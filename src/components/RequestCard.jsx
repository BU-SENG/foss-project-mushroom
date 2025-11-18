export default function RequestCard({ request }) {
  const statusColors = {
    pending: "bg-yellow-500",
    resolved: "bg-green-600",
    in_review: "bg-blue-600",
    rejected: "bg-red-600",
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow flex justify-between items-center">
      <div>
        <h3 className="font-semibold text-lg">{request.issue}</h3>
        <p className="text-gray-600 text-sm">{request.room}</p>
        <p className="text-gray-400 text-xs">{request.date}</p>
      </div>

      <span
        className={`text-white px-3 py-1 rounded text-sm font-medium ${statusColors[request.status]}`}
      >
        {request.status.replace("_", " ")}
      </span>
    </div>
  );
}
