import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { supabase } from "../utils/supabase";
import { Card, Input, Button, Select } from "../components/ui";
import { Send } from "lucide-react";

const CATEGORY_OPTIONS = [
  { value: "plumbing_leak", label: "Plumbing Leak / Faucet" },
  { value: "electrical_issue", label: "Electrical Issue / Outlet" },
  { value: "furniture_damage", label: "Furniture Damage" },
  { value: "hvac_problem", label: "HVAC / Climate Control" },
  { value: "general_repair", label: "General Repair" },
];

const CreateRequest = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [category, setCategory] = useState(CATEGORY_OPTIONS[0].value);
  const [description, setDescription] = useState("");
  const [room, setRoom] = useState(profile?.room || "");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!category || !description || !room) {
      setError("Please fill out all required fields.");
      return;
    }

    if (!user) {
      setError("You must be logged in to submit a request.");
      return;
    }

    setSubmitting(true);

    const newRequest = {
      student_id: user.id,
      category: category,
      description: description,
      room: room,
      status: "pending",
    };

    const { error: dbError } = await supabase
      .from("maintenance_requests")
      .insert([newRequest]);

    if (dbError) {
      console.error("Submission Error:", dbError);
      setError(`Failed to submit request: ${dbError.message}`);
    } else {
      alert("Maintenance request submitted successfully!");
      navigate("/dashboard", { replace: true });
    }

    setSubmitting(false);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Submit New Request
      </h1>

      <Card title="Maintenance Details">
        <form onSubmit={handleSubmit} className="space-y-6 p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Select
                label="Maintenance Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                options={CATEGORY_OPTIONS}
                required
              />
            </div>
            <div className="flex-1">
              <Input
                label="Your Room Number"
                type="text"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                required
                disabled={!!profile?.room}
              />
            </div>
          </div>

          <Input
            label="Detailed Description of Issue"
            type="textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={4}
          />

          {error && (
            <div className="text-red-600 bg-red-50 border border-red-200 p-3 rounded-lg">
              {error}
            </div>
          )}

          <div className="pt-4">
            <Button
              type="submit"
              variant="primary"
              loading={submitting}
              disabled={submitting}
              Icon={Send}
            >
              Submit Maintenance Request
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default CreateRequest;
