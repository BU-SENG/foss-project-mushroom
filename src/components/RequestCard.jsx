import { Card, StatusBadge } from "./ui";

export default function RequestCard({ request }) {
  return (
    <Card className="p-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-semibold text-lg">{request.issue}</h3>
          <p className="text-gray-600 text-sm">{request.room}</p>
          <p className="text-gray-400 text-xs">{request.date}</p>
        </div>

        <StatusBadge status={request.status} />
      </div>
    </Card>
  );
}
