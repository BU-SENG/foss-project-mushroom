import { generateReport } from "../utils/reportGenerator";

export default function ExportReportButton({ data, filter }) {
  return (
    <button
      onClick={() => generateReport(data, filter)}
      className="px-4 py-2 bg-blue-600 text-white rounded"
    >
      Download PDF
    </button>
  );
}
