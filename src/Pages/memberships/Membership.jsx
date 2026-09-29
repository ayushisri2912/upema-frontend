import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Search,
  Filter,
  Eye,
  Check,
  X,
  Users,
  Clock3,
  UserCheck,
  UserX,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import {
  getMemberships,
  updateMembershipStatus,
} from "../../services/api";

function Memberships() {
  const navigate = useNavigate();

  // =====================================================
  // STATES
  // =====================================================

  const [memberships, setMemberships] = useState([]);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [updatingId, setUpdatingId] = useState(null);

  const itemsPerPage = 6;

  // =====================================================
  // FETCH MEMBERSHIPS
  // =====================================================

  const fetchMemberships = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getMemberships();

      const backendData = response.data || [];

      // Convert backend data into UI-friendly format
      const formattedData = backendData.map((member) => ({
        id: member._id,

        applicationNumber:
          member.applicationNumber || "N/A",

        name: member.fullName || "N/A",

        email: member.officialEmail || "N/A",

        phone: member.mobileNumber || "N/A",

        organization:
          member.companyName || "N/A",

        type:
          member.membershipCategory || "N/A",

        city: member.city || "N/A",

        date: member.createdAt
          ? new Date(member.createdAt).toLocaleDateString(
              "en-IN",
              {
                day: "2-digit",
                month: "short",
                year: "numeric",
              }
            )
          : "N/A",

        status:
          member.status === "approved"
            ? "Approved"
            : member.status === "rejected"
            ? "Rejected"
            : "Pending",
      }));

      setMemberships(formattedData);
    } catch (error) {
      console.error(
        "Error fetching memberships:",
        error
      );

      setError(
        error.message ||
          "Failed to load membership applications."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // INITIAL API CALL
  // =====================================================

  useEffect(() => {
    fetchMemberships();
  }, []);

  // =====================================================
  // SEARCH + FILTER
  // =====================================================

  const filteredMembers = useMemo(() => {
    return memberships.filter((member) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        member.name
          .toLowerCase()
          .includes(searchValue) ||
        member.email
          .toLowerCase()
          .includes(searchValue) ||
        member.organization
          .toLowerCase()
          .includes(searchValue) ||
        member.applicationNumber
          .toLowerCase()
          .includes(searchValue);

      const matchesStatus =
        statusFilter === "All" ||
        member.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [memberships, search, statusFilter]);

  // =====================================================
  // PAGINATION
  // =====================================================

  const totalPages = Math.ceil(
    filteredMembers.length / itemsPerPage
  );

  const paginatedMembers = filteredMembers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // =====================================================
  // STATISTICS
  // =====================================================

  const totalApplications = memberships.length;

  const pendingApplications = memberships.filter(
    (item) => item.status === "Pending"
  ).length;

  const approvedApplications = memberships.filter(
    (item) => item.status === "Approved"
  ).length;

  const rejectedApplications = memberships.filter(
    (item) => item.status === "Rejected"
  ).length;

  // =====================================================
  // STATUS STYLE
  // =====================================================

  const getStatusStyle = (status) => {
    if (status === "Approved") {
      return "bg-green-50 text-green-700 border-green-200";
    }

    if (status === "Rejected") {
      return "bg-red-50 text-red-700 border-red-200";
    }

    return "bg-amber-50 text-amber-700 border-amber-200";
  };

  // =====================================================
  // SEARCH
  // =====================================================

  const handleSearch = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  // =====================================================
  // STATUS FILTER
  // =====================================================

  const handleStatusFilter = (value) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  // =====================================================
  // APPROVE / REJECT
  // =====================================================

  const handleStatusUpdate = async (
    id,
    status
  ) => {
    try {
      setUpdatingId(id);

      setError("");

      await updateMembershipStatus(
        id,
        status
      );

      // Refresh data after update
      await fetchMemberships();
    } catch (error) {
      console.error(
        "Error updating membership status:",
        error
      );

      setError(
        error.message ||
          "Failed to update membership status."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  // =====================================================
  // LOADING STATE
  // =====================================================

  if (loading) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-[#C9A45C]/20 border-t-[#C9A45C]" />

          <p className="text-sm text-gray-500">
            Loading membership applications...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-7">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A45C]">
            Membership Management
          </p>

          <h1 className="font-serif text-3xl font-semibold text-[#0F2742]">
            Membership Applications
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Manage and review all UPEMA membership applications.
          </p>
        </div>

        <div className="rounded-xl border border-[#E5E0D6] bg-white px-4 py-3 shadow-sm">
          <p className="text-xs text-gray-400">
            Last Updated
          </p>

          <p className="mt-1 text-sm font-semibold text-[#172333]">
            {new Date().toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>

      </div>


      {/* =====================================================
          ERROR MESSAGE
      ===================================================== */}

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}


      {/* =====================================================
          STAT CARDS
      ===================================================== */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        {/* Total */}
        <div className="group rounded-2xl border border-[#E5E0D6] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

          <div className="flex items-start justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Total Applications
              </p>

              <h2 className="mt-2 text-3xl font-semibold text-[#0F2742]">
                {totalApplications}
              </h2>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0F2742]/10 text-[#0F2742]">
              <Users size={20} />
            </div>

          </div>

        </div>


        {/* Pending */}
        <div className="group rounded-2xl border border-[#E5E0D6] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

          <div className="flex items-start justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Pending
              </p>

              <h2 className="mt-2 text-3xl font-semibold text-[#C9A45C]">
                {pendingApplications}
              </h2>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#C9A45C]/10 text-[#C9A45C]">
              <Clock3 size={20} />
            </div>

          </div>

        </div>


        {/* Approved */}
        <div className="group rounded-2xl border border-[#E5E0D6] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

          <div className="flex items-start justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Approved
              </p>

              <h2 className="mt-2 text-3xl font-semibold text-green-600">
                {approvedApplications}
              </h2>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
              <UserCheck size={20} />
            </div>

          </div>

        </div>


        {/* Rejected */}
        <div className="group rounded-2xl border border-[#E5E0D6] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

          <div className="flex items-start justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Rejected
              </p>

              <h2 className="mt-2 text-3xl font-semibold text-red-600">
                {rejectedApplications}
              </h2>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <UserX size={20} />
            </div>

          </div>

        </div>

      </div>


      {/* =====================================================
          APPLICATION TABLE
      ===================================================== */}

      <div className="overflow-hidden rounded-2xl border border-[#E5E0D6] bg-white shadow-sm">

        {/* Table Header */}
        <div className="border-b border-[#E5E0D6] p-5 sm:p-6">

          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">

            <div>
              <h2 className="font-serif text-xl font-semibold text-[#0F2742]">
                All Applications
              </h2>

              <p className="mt-1 text-sm text-gray-400">
                Review membership requests submitted through the website.
              </p>
            </div>


            {/* Filters */}
            <div className="flex flex-col gap-3 sm:flex-row">

              {/* Search */}
              <div className="relative">

                <Search
                  size={17}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) =>
                    handleSearch(e.target.value)
                  }
                  placeholder="Search applicant..."
                  className="h-11 w-full rounded-xl border border-gray-200 bg-[#FAFAF8] pl-10 pr-4 text-sm text-[#172333] outline-none transition focus:border-[#C9A45C] focus:ring-2 focus:ring-[#C9A45C]/10 sm:w-64"
                />

              </div>


              {/* Status Filter */}
              <div className="relative">

                <Filter
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <select
                  value={statusFilter}
                  onChange={(e) =>
                    handleStatusFilter(e.target.value)
                  }
                  className="h-11 w-full appearance-none rounded-xl border border-gray-200 bg-[#FAFAF8] pl-10 pr-10 text-sm text-[#172333] outline-none transition focus:border-[#C9A45C] focus:ring-2 focus:ring-[#C9A45C]/10 sm:w-40"
                >
                  <option value="All">
                    All Status
                  </option>

                  <option value="Pending">
                    Pending
                  </option>

                  <option value="Approved">
                    Approved
                  </option>

                  <option value="Rejected">
                    Rejected
                  </option>

                </select>

              </div>

            </div>

          </div>

        </div>


        {/* =====================================================
            TABLE
        ===================================================== */}

        <div className="overflow-x-auto">

          <table className="w-full min-w-[900px]">

            <thead>

              <tr className="border-b border-[#E5E0D6] bg-[#FAFAF8]">

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Applicant
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Contact
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Organization
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Type
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Date
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Status
                </th>

                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Action
                </th>

              </tr>

            </thead>


            <tbody className="divide-y divide-[#E5E0D6]">

              {paginatedMembers.length > 0 ? (

                paginatedMembers.map((member) => (

                  <tr
                    key={member.id}
                    className="transition hover:bg-[#FAFAF8]"
                  >

                    {/* Applicant */}
                    <td className="px-6 py-5">

                      <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0F2742] text-sm font-semibold text-[#C9A45C]">
                          {member.name
                            .charAt(0)
                            .toUpperCase()}
                        </div>

                        <div>

                          <p className="font-medium text-[#172333]">
                            {member.name}
                          </p>

                          <p className="mt-0.5 text-xs text-gray-400">
                            {member.city}
                          </p>

                        </div>

                      </div>

                    </td>


                    {/* Contact */}
                    <td className="px-6 py-5">

                      <p className="text-sm text-[#172333]">
                        {member.email}
                      </p>

                      <p className="mt-1 text-xs text-gray-400">
                        {member.phone}
                      </p>

                    </td>


                    {/* Organization */}
                    <td className="px-6 py-5">

                      <p className="text-sm text-[#172333]">
                        {member.organization}
                      </p>

                    </td>


                    {/* Type */}
                    <td className="px-6 py-5">

                      <span className="text-sm text-gray-600">
                        {member.type}
                      </span>

                    </td>


                    {/* Date */}
                    <td className="px-6 py-5">

                      <span className="text-sm text-gray-500">
                        {member.date}
                      </span>

                    </td>


                    {/* Status */}
                    <td className="px-6 py-5">

                      <span
                        className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${getStatusStyle(
                          member.status
                        )}`}
                      >

                        <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />

                        {member.status}

                      </span>

                    </td>


                    {/* Actions */}
                    <td className="px-6 py-5">

                      <div className="flex items-center justify-end gap-2">

                        {/* View */}
                        <button
                          title="View Details"
                          onClick={() =>
                            navigate(
                              `/memberships/${member.id}`
                            )
                          }
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:border-[#C9A45C] hover:bg-[#C9A45C]/10 hover:text-[#0F2742]"
                        >
                          <Eye size={16} />
                        </button>


                        {/* Approve / Reject */}
                        {member.status === "Pending" && (
                          <>
                            {/* Approve */}
                            <button
                              title="Approve"
                              disabled={
                                updatingId === member.id
                              }
                              onClick={() =>
                                handleStatusUpdate(
                                  member.id,
                                  "approved"
                                )
                              }
                              className="flex h-9 w-9 items-center justify-center rounded-lg border border-green-200 text-green-600 transition hover:bg-green-50 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              {updatingId ===
                              member.id ? (
                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-green-200 border-t-green-600" />
                              ) : (
                                <Check size={16} />
                              )}
                            </button>


                            {/* Reject */}
                            <button
                              title="Reject"
                              disabled={
                                updatingId === member.id
                              }
                              onClick={() =>
                                handleStatusUpdate(
                                  member.id,
                                  "rejected"
                                )
                              }
                              className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-200 text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              <X size={16} />
                            </button>
                          </>
                        )}

                      </div>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="7"
                    className="px-6 py-16 text-center"
                  >

                    <div className="flex flex-col items-center">

                      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                        <Users
                          size={20}
                          className="text-gray-400"
                        />
                      </div>

                      <p className="font-medium text-[#172333]">
                        No applications found
                      </p>

                      <p className="mt-1 text-sm text-gray-400">
                        Try changing your search or filter.
                      </p>

                    </div>

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>


        {/* =====================================================
            PAGINATION
        ===================================================== */}

        <div className="flex flex-col gap-4 border-t border-[#E5E0D6] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">

          <p className="text-sm text-gray-500">

            Showing{" "}

            <span className="font-medium text-[#172333]">
              {paginatedMembers.length}
            </span>{" "}

            of{" "}

            <span className="font-medium text-[#172333]">
              {filteredMembers.length}
            </span>{" "}

            applications

          </p>


          <div className="flex items-center gap-2">

            <button
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage(
                  (page) => page - 1
                )
              }
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:border-[#C9A45C] hover:text-[#0F2742] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft size={17} />
            </button>


            {totalPages > 0 &&
              Array.from(
                {
                  length: totalPages,
                },
                (_, index) => index + 1
              ).map((page) => (

                <button
                  key={page}
                  onClick={() =>
                    setCurrentPage(page)
                  }
                  className={`h-9 min-w-9 rounded-lg px-3 text-sm font-medium transition ${
                    currentPage === page
                      ? "bg-[#0F2742] text-white"
                      : "border border-gray-200 text-gray-500 hover:border-[#C9A45C] hover:text-[#0F2742]"
                  }`}
                >
                  {page}
                </button>

              ))}


            <button
              disabled={
                currentPage === totalPages ||
                totalPages === 0
              }
              onClick={() =>
                setCurrentPage(
                  (page) => page + 1
                )
              }
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:border-[#C9A45C] hover:text-[#0F2742] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronRight size={17} />
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Memberships;