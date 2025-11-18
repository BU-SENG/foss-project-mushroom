import React, { useState, useEffect } from "react";

import {
  Button,
  Input,
  Select,
  StatusBadge,
  Card,
  Modal,
} from "../components/ui";

const OPTIONS = [
  { value: "opt1", label: "Option One (Default)" },
  { value: "opt2", label: "Option Two" },
  { value: "opt3", label: "Option Three" },
];

export default function ComponentShowcase() {
  const [inputValue, setInputValue] = useState("");
  const [selectValue, setSelectValue] = useState(OPTIONS[0].value);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Function to simulate loading state for button test
  const handleLoadingClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  // Handler for ESC key to close the modal (as a backup to the Modal component's internal logic)
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setIsModalOpen(false);
    };
    if (isModalOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isModalOpen]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 font-sans">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-gray-900">
        UI Component Showcase (Testing Actual Imports)
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* CARD SECTION */}
        <Card title="Card Component" className="lg:col-span-2">
          <div className="space-y-4">
            <p>This is a standard card container.</p>
            <Card
              className="shadow-none border border-indigo-200 bg-indigo-50/50"
              title="Nested Card Example"
            >
              Testing nested card styles and containment.
            </Card>
          </div>
        </Card>
        <Card title="Register" titleAlign="center">
          <p>
            This card demonstrates a centered title using the{" "}
            <code>titleAlign</code> prop.
          </p>
        </Card>

        <Card
          title="Bigger bold title"
          titleClassName="!text-4xl"
          titleStyle={{ fontWeight: 700 }}
        >
          This card has a larger, bold title for emphasis. It uses attribute{" "}
          <code>titleClassName</code> and <code>titleStyle</code> to style the title.
        </Card>
        <Card title="Colored title" titleClassName="text-red-600" />
        <Card
          title="Cute soft title"
          titleClassName="!text-gray-500 !font-medium"
        />

        {/* STATUS BADGE SECTION */}
        <Card title="StatusBadge Variants">
          <div className="flex flex-wrap gap-4 items-center">
            <StatusBadge status="Pending" />
            <StatusBadge status="In Progress" />
            <StatusBadge status="Resolved" />
            <StatusBadge status="Unknown" />
          </div>
          <p className="mt-4 text-xs text-gray-500">
            Tests different status states (Pending, In Progress, Resolved).
          </p>
        </Card>

        {/* BUTTON SECTION - Tests variants, sizes, and states */}
        <Card title="Button Variants & States">
          <div className="flex flex-wrap gap-4 items-center">
            {/* Variants */}
            <Button variant="primary" size="md">
              Primary
            </Button>
            <Button variant="secondary" size="md">
              Secondary
            </Button>
            <Button variant="danger" size="md">
              Danger
            </Button>
            {/* Missing variant in your original TSX, added for completeness */}
            <Button variant="success" size="md">
              Success
            </Button>

            {/* States */}
            <Button disabled size="md">
              Disabled
            </Button>
            <Button loading={isLoading} onClick={handleLoadingClick} size="md">
              {isLoading ? "Loading..." : "Toggle Loading"}
            </Button>

            {/* Sizes */}
            <Button variant="primary" size="sm">
              Small
            </Button>
            <Button variant="danger" size="lg">
              Large
            </Button>
          </div>
        </Card>

        {/* INPUT AND SELECT SECTION - Tests error states and data binding */}
        <Card title="Form Controls & Error States" className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Default Input Field"
              placeholder="Enter text here..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Input
              label="Input with Error"
              placeholder="Data validation failed"
              error="This field is required or invalid."
              defaultValue="bad value"
            />
            <Select
              label="Default Select Field"
              options={OPTIONS}
              value={selectValue}
              onChange={(e) => setSelectValue(e.target.value)}
            />
            <Select
              label="Select with Error"
              options={OPTIONS}
              error="Please select a valid option."
              value="opt1"
            />
            <Input
              label="Disabled Input"
              placeholder="This field is disabled"
              disabled
            />
            <Button
              variant="primary"
              onClick={() => console.log("Form Submitted!")}
            >
              Submit Form Data
            </Button>
          </div>
        </Card>

        {/* MODAL SECTION */}
        <Card title="Modal Component" className="lg:col-span-2">
          <div className="flex justify-center">
            <Button
              onClick={() => setIsModalOpen(true)}
              variant="primary"
              size="lg"
            >
              Open Modal Dialog
            </Button>
          </div>
          <p className="mt-4 text-center text-sm text-gray-500">
            Click the button to test the Modal overlay.
          </p>
        </Card>
      </div>

      {/* Modal Instance for Testing */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Modal Component Test"
      >
        <p className="mb-4">
          This modal should appear centered on the screen and have a darkened
          backdrop. It should close when you click the 'Cancel' button, the
          close icon, or the backdrop.
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              console.log("Action Confirmed!");
              setIsModalOpen(false);
            }}
          >
            Confirm Action
          </Button>
        </div>
      </Modal>
    </div>
  );
}
