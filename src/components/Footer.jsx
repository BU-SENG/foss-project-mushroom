export default function Footer() {
  return (
    <footer className="mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center border-t border-gray-200">
        <div className="text-gray-500 text-sm text-center">
          &copy; {new Date().getFullYear()} Hall Maintenance System. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
