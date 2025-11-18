export default function DashboardLayout({ title, children }) {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">HMS</h2>
        <ul className="space-y-4 text-gray-700">
          <li className="cursor-pointer hover:text-blue-500">Dashboard</li>
          <li className="cursor-pointer hover:text-blue-500">My Requests</li>
          <li className="cursor-pointer hover:text-blue-500">New Request</li>
          <li className="cursor-pointer hover:text-blue-500">Settings</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        <h1 className="text-3xl font-semibold mb-6">{title}</h1>
        {children}
      </main>
    </div>
  );
}


