import Card from "./ui/Card";
import StatusBadge from "./ui/StatusBadge";

export default function RequestCard({ request }) {
  const formattedStatus =
    request.status.slice(0, 1).toUpperCase() + request.status.slice(1);

  return (
    <Card className="p-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-semibold text-lg">{request.issue}</h3>
          <p className="text-gray-600 text-sm">{request.room}</p>
          <p className="text-gray-400 text-xs">{request.date}</p>
        </div>

        <StatusBadge status={formattedStatus} />
      </div>
    </Card>
  );
}
