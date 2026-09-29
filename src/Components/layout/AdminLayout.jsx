import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

function AdminLayout() {
  return (
    <div className="min-h-screen bg-[#F7F5F0]">
      <Sidebar />

      <div className="ml-64 min-h-screen">
        <Header />

        <main className="p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;