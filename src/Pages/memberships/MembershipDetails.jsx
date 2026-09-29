import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Building2,
  CalendarDays,
  FileText,
  Check,
  X,
  Download,
  User,
} from "lucide-react";

function MembershipDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [status, setStatus] = useState("Pending");

  // Temporary dummy data
  // Later this data will come from MongoDB/API
  const member = {
    name: "Rahul Sharma",
    email: "rahul.sharma@gmail.com",
    phone: "+91 98765 43210",
    organization: "Sharma Events",
    membershipType: "Professional",
    city: "Lucknow",
    state: "Uttar Pradesh",
    pincode: "226010",
    address: "Gomti Nagar, Lucknow, Uttar Pradesh",
    designation: "Event Manager",
    website: "www.sharmaevents.com",
    appliedDate: "14 September 2026",
    message:
      "I would like to become a member of UPEMA and contribute to the event management community.",
  };

  const handleApprove = () => {
    setStatus("Approved");
  };

  const handleReject = () => {
    setStatus("Rejected");
  };

  const getStatusStyle = () => {
    if (status === "Approved") {
      return "bg-green-50 text-green-700 border-green-200";
    }

    if (status === "Rejected") {
      return "bg-red-50 text-red-700 border-red-200";
    }

    return "bg-amber-50 text-amber-700 border-amber-200";
  };

  return (
    <div className="space-y-7">

      {/* ================= HEADER ================= */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

        <div className="flex items-start gap-4">

          <button
            onClick={() => navigate("/memberships")}
            className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 transition hover:border-[#C9A45C] hover:text-[#0F2742]"
          >
            <ArrowLeft size={18} />
          </button>

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A45C]">
              Membership Management
            </p>

            <h1 className="font-serif text-3xl font-semibold text-[#0F2742]">
              Application Details
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Review complete membership application information.
            </p>
          </div>

        </div>


        {/* Status */}
        <div
          className={`inline-flex w-fit items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium ${getStatusStyle()}`}
        >
          <span className="h-2 w-2 rounded-full bg-current" />
          {status}
        </div>

      </div>


      {/* ================= APPLICANT PROFILE ================= */}
      <div className="rounded-2xl border border-[#E5E0D6] bg-white p-6 shadow-sm">

        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-[#0F2742] text-2xl font-semibold text-[#C9A45C]">
            {member.name.charAt(0)}
          </div>

          <div className="flex-1">

            <h2 className="font-serif text-2xl font-semibold text-[#0F2742]">
              {member.name}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {member.designation} • {member.organization}
            </p>

            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">

              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Mail size={15} className="text-[#C9A45C]" />
                {member.email}
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Phone size={15} className="text-[#C9A45C]" />
                {member.phone}
              </div>

            </div>

          </div>


          <div className="text-left sm:text-right">

            <p className="text-xs text-gray-400">
              Application ID
            </p>

            <p className="mt-1 font-mono text-sm font-medium text-[#172333]">
              UPEMA-{String(id || "001").padStart(4, "0")}
            </p>

          </div>

        </div>

      </div>


      {/* ================= MAIN GRID ================= */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

        {/* ================= PERSONAL INFORMATION ================= */}
        <div className="xl:col-span-2 rounded-2xl border border-[#E5E0D6] bg-white shadow-sm">

          <div className="border-b border-[#E5E0D6] px-6 py-5">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0F2742]/10 text-[#0F2742]">
                <User size={18} />
              </div>

              <div>
                <h2 className="font-serif text-xl font-semibold text-[#0F2742]">
                  Applicant Information
                </h2>

                <p className="text-xs text-gray-400">
                  Personal and professional details
                </p>
              </div>

            </div>

          </div>


          <div className="grid grid-cols-1 gap-x-8 gap-y-6 p-6 sm:grid-cols-2">

            <InfoItem
              label="Full Name"
              value={member.name}
            />

            <InfoItem
              label="Membership Type"
              value={member.membershipType}
            />

            <InfoItem
              label="Email Address"
              value={member.email}
            />

            <InfoItem
              label="Phone Number"
              value={member.phone}
            />

            <InfoItem
              label="Organization"
              value={member.organization}
            />

            <InfoItem
              label="Designation"
              value={member.designation}
            />

            <InfoItem
              label="City"
              value={member.city}
            />

            <InfoItem
              label="State"
              value={member.state}
            />

            <InfoItem
              label="Pincode"
              value={member.pincode}
            />

            <InfoItem
              label="Website"
              value={member.website}
            />

            <div className="sm:col-span-2">

              <p className="mb-2 text-xs font-medium uppercase tracking-wider text-gray-400">
                Address
              </p>

              <div className="flex items-start gap-2 text-sm text-[#172333]">
                <MapPin
                  size={16}
                  className="mt-0.5 shrink-0 text-[#C9A45C]"
                />

                {member.address}
              </div>

            </div>

          </div>

        </div>


        {/* ================= APPLICATION SUMMARY ================= */}
        <div className="rounded-2xl border border-[#E5E0D6] bg-white shadow-sm">

          <div className="border-b border-[#E5E0D6] px-6 py-5">

            <h2 className="font-serif text-xl font-semibold text-[#0F2742]">
              Application Summary
            </h2>

            <p className="mt-1 text-xs text-gray-400">
              Membership request overview
            </p>

          </div>


          <div className="space-y-5 p-6">

            <SummaryItem
              icon={<Building2 size={17} />}
              label="Membership Type"
              value={member.membershipType}
            />

            <SummaryItem
              icon={<CalendarDays size={17} />}
              label="Applied On"
              value={member.appliedDate}
            />

            <SummaryItem
              icon={<MapPin size={17} />}
              label="Location"
              value={`${member.city}, ${member.state}`}
            />

            <SummaryItem
              icon={<FileText size={17} />}
              label="Application Status"
              value={status}
            />

          </div>

        </div>

      </div>


      {/* ================= MESSAGE ================= */}
      <div className="rounded-2xl border border-[#E5E0D6] bg-white shadow-sm">

        <div className="border-b border-[#E5E0D6] px-6 py-5">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#C9A45C]/10 text-[#C9A45C]">
              <FileText size={18} />
            </div>

            <div>
              <h2 className="font-serif text-xl font-semibold text-[#0F2742]">
                Applicant Message
              </h2>

              <p className="text-xs text-gray-400">
                Message submitted with the application
              </p>
            </div>

          </div>

        </div>

        <div className="p-6">

          <p className="text-sm leading-7 text-gray-600">
            {member.message}
          </p>

        </div>

      </div>


      {/* ================= DOCUMENTS ================= */}
      <div className="rounded-2xl border border-[#E5E0D6] bg-white shadow-sm">

        <div className="border-b border-[#E5E0D6] px-6 py-5">

          <h2 className="font-serif text-xl font-semibold text-[#0F2742]">
            Documents
          </h2>

          <p className="mt-1 text-xs text-gray-400">
            Documents submitted by the applicant
          </p>

        </div>


        <div className="p-6">

          <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-[#FAFAF8] p-4 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#0F2742]/10 text-[#0F2742]">
                <FileText size={19} />
              </div>

              <div>
                <p className="text-sm font-medium text-[#172333]">
                  Membership Document
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  PDF Document
                </p>
              </div>

            </div>


            <button className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-[#172333] transition hover:border-[#C9A45C] hover:text-[#0F2742]">
              <Download size={16} />
              Download
            </button>

          </div>

        </div>

      </div>


      {/* ================= ACTIONS ================= */}
      {status === "Pending" && (
        <div className="sticky bottom-5 rounded-2xl border border-[#E5E0D6] bg-white/95 p-4 shadow-xl backdrop-blur">

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <p className="text-sm font-semibold text-[#172333]">
                Review this application
              </p>

              <p className="mt-1 text-xs text-gray-400">
                Approve or reject this membership application.
              </p>
            </div>


            <div className="flex gap-3">

              <button
                onClick={handleReject}
                className="flex items-center justify-center gap-2 rounded-xl border border-red-200 px-5 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
              >
                <X size={17} />
                Reject
              </button>


              <button
                onClick={handleApprove}
                className="flex items-center justify-center gap-2 rounded-xl bg-[#0F2742] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#081A2B]"
              >
                <Check size={17} />
                Approve Application
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}


/* ================= INFO ITEM ================= */

function InfoItem({ label, value }) {
  return (
    <div>
      <p className="mb-1.5 text-xs font-medium uppercase tracking-wider text-gray-400">
        {label}
      </p>

      <p className="text-sm font-medium text-[#172333]">
        {value}
      </p>
    </div>
  );
}


/* ================= SUMMARY ITEM ================= */

function SummaryItem({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3">

      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#F7F5F0] text-[#C9A45C]">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-xs text-gray-400">
          {label}
        </p>

        <p className="mt-0.5 truncate text-sm font-medium text-[#172333]">
          {value}
        </p>
      </div>

    </div>
  );
}

export default MembershipDetails;