import { useState, useMemo } from "react";

import { Card, StatusBadge, Input, Select, Button, Modal } from "./ui";
import {
  RefreshCw,
  Download,
  Filter,
  ArrowUp,
  ArrowDown,
  DownloadIcon,
} from "lucide-react";
import { updateRequestStatus } from "../utils/supabase";

const STATUS_OPTIONS = [
  { value: "pending", label: "Pending" },
  { value: "in_progress", label: "In Progress" },
  { value: "resolved", label: "Resolved" },
];

const RequestList = ({ requests, role, onRefresh, onExportClick }) => {
  const isAdmin = role === "admin";
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortKey, setSortKey] = useState("created_at");
  const [sortDirection, setSortDirection] = useState("desc");

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const openEditModal = (request) => {
    setSelectedRequest(request);
    setNewStatus(request.status);
  };

  const closeModal = () => {
    setSelectedRequest(null);
    setNewStatus("");
  };

  const handleStatusUpdate = async () => {
    if (!isAdmin || !selectedRequest || isSaving) return;

    setIsSaving(true);

    const result = await updateRequestStatus(selectedRequest.id, newStatus);
    setIsSaving(false);

    if (result.success) {
      closeModal();
      onRefresh();
    } else {
      alert(`Failed to update status: ${result.error}`);
    }
  };

  const sortedAndFilteredRequests = useMemo(() => {
    let filtered = requests;

    if (filterStatus !== "all") {
      filtered = filtered.filter((req) => req.status === filterStatus);
    }

    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (req) =>
          req.category.toLowerCase().includes(lowerSearch) ||
          req.description.toLowerCase().includes(lowerSearch) ||
          (isAdmin && req.requester_name.toLowerCase().includes(lowerSearch))
      );
    }

    return filtered.sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [requests, filterStatus, searchTerm, sortKey, sortDirection, isAdmin]);

  const handleSortChange = (key) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDirection("desc");
    }
  };

  const SortIcon = ({ keyName }) => {
    if (sortKey !== keyName) return null;
    return sortDirection === "asc" ? (
      <ArrowUp className="w-4 h-4 ml-1" />
    ) : (
      <ArrowDown className="w-4 h-4 ml-1" />
    );
  };

  return (
    <div className="space-y-6">
      <Card title="Maintenance Requests Management">
        <div className="flex flex-col md:flex-row gap-4 mb-6 p-4 border-b border-gray-100">
          <div className="flex-grow">
            <Input
              placeholder="Search by Category, Description or Requester Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <Select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              options={[
                { value: "all", label: "All Statuses" },
                ...STATUS_OPTIONS,
              ]}
              Icon={Filter}
            />
            <Button
              variant="secondary"
              onClick={onRefresh}
              title="Refresh List"
            >
              <RefreshCw className="w-4 h-4" />
            </Button>
            {isAdmin && (
              <Button
                variant="secondary"
                onClick={onExportClick}
                Icon={DownloadIcon}
                title="Export Data"
              >
                <Download className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>

        <div className={`hidden md:grid grid-cols-${isAdmin ? "14" : "12"} font-semibold text-gray-600 border-b pb-2 px-4`}>
          <span
            className="col-span-4 cursor-pointer flex items-center"
            onClick={() => handleSortChange("category")}
          >
            Category <SortIcon keyName="category" />
          </span>
          <span className="col-span-2">Room</span>
          <span
            className="col-span-2 cursor-pointer flex items-center"
            onClick={() => handleSortChange("created_at")}
          >
            Date <SortIcon keyName="created_at" />
          </span>
          {isAdmin && <span className="col-span-2">Requester</span>}
          <span className="col-span-2 text-right">Status</span>
          {isAdmin && <span className="col-span-2 text-right">Actions</span>}
        </div>

        <div className="divide-y divide-gray-100">
          {sortedAndFilteredRequests.length === 0 ? (
            <p className="p-4 text-center text-gray-500">
              No matching requests found.
            </p>
          ) : (
            sortedAndFilteredRequests.map((request) => (
              <div
                key={request.id}
                className={`grid grid-cols-1 md:grid-cols-${isAdmin ? "14" : "12"} gap-2 md:gap-4 items-start md:items-center py-4 px-4 hover:bg-gray-50 transition-colors relative`}
              >
                <div className="col-span-4 flex flex-col">
                  <span className="font-medium text-gray-800 capitalize">
                    {request.category.replace(/_/g, " ")}
                  </span>
                  <span className="text-sm text-gray-500 truncate">
                    {request.description}
                  </span>
                </div>

                <span className="col-span-2 text-sm text-gray-700">
                  Room: {request.room}
                </span>

                <span className="col-span-2 text-sm text-gray-500">
                  {new Date(request.created_at).toLocaleDateString()}
                </span>

                {isAdmin && (
                  <span className="col-span-2 text-sm text-gray-700">
                    {request.requester_name}
                  </span>
                )}

                <div className={`col-span-2 flex justify-end`}>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={request.status} />
                  </div>
                </div>

                {isAdmin && (
                  <div className="col-span-2 flex justify-end">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => openEditModal(request)}
                    >
                      Edit Status
                    </Button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </Card>

      {isAdmin && selectedRequest && (
        <Modal
          isOpen={!!selectedRequest}
          onClose={closeModal}
          title={`Update Status for Request #${selectedRequest.id}`}
        >
          <div className="p-4 space-y-4">
            <p className="text-gray-600">
              <span className="font-medium">Category:</span>{" "}
              <span className="capitalize">
                {selectedRequest.category.replace(/_/g, " ")}
              </span>
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Room:</span> {selectedRequest.room}
            </p>

            <Select
              label="Select New Status"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              options={STATUS_OPTIONS}
            />
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="secondary" onClick={closeModal}>
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleStatusUpdate}
                disabled={newStatus === selectedRequest.status || isSaving}
                loading={isSaving}
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default RequestList;
