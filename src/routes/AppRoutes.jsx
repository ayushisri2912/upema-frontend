
import { Routes, Route, Navigate } from "react-router-dom";

// Auth
import Login from "../Pages/auth/Login";

// Dashboard
import Dashboard from "../Pages/dashboard/Dashboard";

// Membership
import Memberships from "../Pages/memberships/Membership";
import MembershipDetails from "../Pages/memberships/MembershipDetails";

// Events
import Events from "../Pages/events/Events";
import AddEvent from "../Pages/events/AddEvent";
import EditEvent from "../Pages/events/EditEvent";

// Blogs
import Blogs from "../Pages/blogs/Blogs";
import AddBlog from "../Pages/blogs/AddBlog";
import EditBlog from "../Pages/blogs/EditBlog";

// Gallery
import Gallery from "../Pages/gallery/Gallery";
import AddGallery from "../Pages/gallery/AddGallery";

import AdminLayout from "../Components/layout/AdminLayout";

// Notices
import Notices from "../Pages/notices/Notices";
import AddNotice from "../Pages/notices/AddNotice";

// // Enquiries
import Enquiries from "../Pages/enquiries/Enquiries";

// Team
import Team from "../Pages/Team/Team";
import AddMember from "../Pages/Team/AddMember";

// Settings
import Settings from "../Pages/settings/Settings";

function AppRoutes() {
  return (
    <Routes>
      {/* Auth */}
      <Route path="/login" element={<Login />} />
        
        <Route element={<AdminLayout />}>

        
      {/* Dashboard */}
      <Route path="/dashboard" element={<Dashboard />} />

      {/* Membership */}
      <Route path="/memberships" element={<Memberships />} />
      <Route path="/memberships/:id" element={<MembershipDetails />} />

      {/* Events */}
      <Route path="/events" element={<Events />} />
      <Route path="/events/add" element={<AddEvent />} />
      <Route path="/events/edit/:id" element={<EditEvent />} />

      {/* Blogs */}
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/blogs/add" element={<AddBlog />} />
      <Route path="/blogs/edit/:id" element={<EditBlog />} />

      {/* Gallery */}
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/gallery/add" element={<AddGallery />} />

      {/* Notices */}
      <Route path="/notices" element={<Notices />} />
      <Route path="/notices/add" element={<AddNotice />} />

      {/* Enquiries */}
      <Route path="/enquiries" element={<Enquiries />} />

      {/* Team */}
      <Route path="/team" element={<Team />} />
      <Route path="/team/add" element={<AddMember />} />

      {/* Settings */}
      <Route path="/settings" element={<Settings />} />
      </Route>

      {/* Default */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* 404 */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default AppRoutes;