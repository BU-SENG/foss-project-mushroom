import { useAuth } from '../hooks/useAuth';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const DashboardLayout = ({ title, children }) => {
  const { profile } = useAuth();
  const role = profile?.role;
  
  return (
    <>
      <Header />
      <Sidebar role={role} />
      <main className="pt-16 md:ml-64 transition-all duration-300 min-h-screen">
        <div className="p-4 md:p-6">
          {title && (
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">
              {title}
            </h1>
          )}
          {children}
        </div>
      </main>
    </>
  );
};

export default DashboardLayout;