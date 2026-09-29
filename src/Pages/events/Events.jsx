import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  MapPin,
  Clock,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Users,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Layers,
  Sparkles,
  Tag,
  AlertCircle,
  X,
} from "lucide-react";

import { getEvents, deleteEvent } from "../../services/api";

function Events() {
  const navigate = useNavigate();

  // =====================================================
  // STATES
  // =====================================================
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [selectedEventForModal, setSelectedEventForModal] = useState(null);

  // Filters
  const [search, setSearch] = useState("");
  const [eventTypeFilter, setEventTypeFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [cityFilter, setCityFilter] = useState("All Locations");
  const [statusFilter, setStatusFilter] = useState("All");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Categories & Cities list for dropdowns
  const categoriesList = [
    "All Categories",
    "Expos & Exhibitions",
    "Summits & Conclaves",
    "Networking Galas",
    "Workshops",
    "State Conventions",
    "Trade Expos",
    "Technical Masterclasses",
  ];

  const citiesList = [
    "All Locations",
    "Lucknow",
    "Noida",
    "Agra",
    "Varanasi",
    "Prayagraj",
    "Kanpur",
  ];

  // =====================================================
  // FETCH EVENTS
  // =====================================================
  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getEvents();
      const backendData = response.data || [];
      setEvents(backendData);
    } catch (err) {
      console.error("Error fetching events:", err);
      setError(err.message || "Failed to load events.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // =====================================================
  // SEARCH & FILTER LOGIC
  // =====================================================
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const searchValue = search.toLowerCase().trim();
      const matchesSearch =
        !searchValue ||
        (event.title && event.title.toLowerCase().includes(searchValue)) ||
        (event.venue && event.venue.toLowerCase().includes(searchValue)) ||
        (event.city && event.city.toLowerCase().includes(searchValue)) ||
        (event.description && event.description.toLowerCase().includes(searchValue)) ||
        (event.category && event.category.toLowerCase().includes(searchValue));

      const matchesType =
        eventTypeFilter === "All" || event.eventType === eventTypeFilter;

      const matchesCategory =
        categoryFilter === "All Categories" || event.category === categoryFilter;

      const matchesCity =
        cityFilter === "All Locations" || event.city === cityFilter;

      const matchesStatus =
        statusFilter === "All" || event.status === statusFilter;

      return (
        matchesSearch &&
        matchesType &&
        matchesCategory &&
        matchesCity &&
        matchesStatus
      );
    });
  }, [events, search, eventTypeFilter, categoryFilter, cityFilter, statusFilter]);

  // =====================================================
  // PAGINATION
  // =====================================================
  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage) || 1;

  const paginatedEvents = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredEvents.slice(start, start + itemsPerPage);
  }, [filteredEvents, currentPage]);

  // Reset pagination when filter changes
  const handleSearchChange = (val) => {
    setSearch(val);
    setCurrentPage(1);
  };

  // =====================================================
  // STATS CALCULATIONS
  // =====================================================
  const totalEventsCount = events.length;
  const upcomingCount = events.filter((e) => e.eventType === "Upcoming").length;
  const pastCount = events.filter((e) => e.eventType === "Past").length;
  const citiesCount = new Set(events.map((e) => e.city).filter(Boolean)).size;

  // =====================================================
  // DELETE HANDLER
  // =====================================================
  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }

    try {
      setDeletingId(id);
      await deleteEvent(id);
      await fetchEvents();
    } catch (err) {
      console.error("Error deleting event:", err);
      alert(err.message || "Failed to delete event.");
    } finally {
      setDeletingId(null);
    }
  };

  // =====================================================
  // BADGE STYLES
  // =====================================================
  const getTypeBadgeStyle = (type) => {
    if (type === "Upcoming") {
      return "bg-[#C9A45C]/15 text-[#8F6F2D] border-[#C9A45C]/40";
    }
    return "bg-slate-100 text-slate-700 border-slate-300";
  };

  const getStatusBadgeStyle = (status) => {
    if (status === "Published") {
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    }
    if (status === "Draft") {
      return "bg-amber-50 text-amber-700 border-amber-200";
    }
    return "bg-gray-100 text-gray-600 border-gray-200";
  };

  // =====================================================
  // RENDER LOADING
  // =====================================================
  if (loading) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-11 w-11 animate-spin rounded-full border-4 border-[#C9A45C]/20 border-t-[#C9A45C]" />
          <p className="text-sm font-medium text-gray-500">
            Loading UPEMA events...
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
            UPEMA Events Portal
          </p>
          <h1 className="font-serif text-3xl font-semibold text-[#0F2742]">
            Events & Conventions Management
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Create, publish, and track trade expos, summits, networking galas, and landmark archives.
          </p>
        </div>

        <button
          onClick={() => navigate("/events/add")}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0F2742] px-5 py-3 text-sm font-semibold text-[#C9A45C] shadow-md transition hover:bg-[#17385c] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#C9A45C]/50"
        >
          <Plus size={18} className="text-[#C9A45C]" />
          Add New Event
        </button>
      </div>

      {/* =====================================================
          ERROR MESSAGE
      ===================================================== */}
      {error && (
        <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle size={18} className="shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* =====================================================
          STAT CARDS
      ===================================================== */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Total Events */}
        <div className="group rounded-2xl border border-[#E5E0D6] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Events</p>
              <h2 className="mt-2 text-3xl font-semibold text-[#0F2742]">
                {totalEventsCount}
              </h2>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0F2742]/10 text-[#0F2742]">
              <Calendar size={20} />
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="group rounded-2xl border border-[#E5E0D6] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">Upcoming Events</p>
              <h2 className="mt-2 text-3xl font-semibold text-[#C9A45C]">
                {upcomingCount}
              </h2>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#C9A45C]/10 text-[#C9A45C]">
              <Clock size={20} />
            </div>
          </div>
        </div>

        {/* Past / Archives */}
        <div className="group rounded-2xl border border-[#E5E0D6] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">Past & Archives</p>
              <h2 className="mt-2 text-3xl font-semibold text-emerald-600">
                {pastCount}
              </h2>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <CheckCircle size={20} />
            </div>
          </div>
        </div>

        {/* Active Cities */}
        <div className="group rounded-2xl border border-[#E5E0D6] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Host Cities</p>
              <h2 className="mt-2 text-3xl font-semibold text-[#172333]">
                {citiesCount}
              </h2>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
              <MapPin size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          SEARCH & FILTERS CONTAINER
      ===================================================== */}
      <div className="rounded-2xl border border-[#E5E0D6] bg-white p-5 shadow-sm space-y-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <h2 className="font-serif text-lg font-semibold text-[#0F2742] flex items-center gap-2">
            <Filter size={18} className="text-[#C9A45C]" /> Filter & Search Events
          </h2>

          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search
              size={17}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search event title, venue, city, or category..."
              className="h-11 w-full rounded-xl border border-gray-200 bg-[#FAFAF8] pl-10 pr-4 text-sm text-[#172333] outline-none transition focus:border-[#C9A45C] focus:ring-2 focus:ring-[#C9A45C]/10"
            />
          </div>
        </div>

        {/* Dropdown Filters Row */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 pt-2 border-t border-gray-100">
          {/* Event Type */}
          <div>
            <label className="mb-1 block text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Event Type
            </label>
            <select
              value={eventTypeFilter}
              onChange={(e) => {
                setEventTypeFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="h-10 w-full rounded-xl border border-gray-200 bg-[#FAFAF8] px-3 text-xs text-[#172333] outline-none transition focus:border-[#C9A45C]"
            >
              <option value="All">All Types (Upcoming & Past)</option>
              <option value="Upcoming">Upcoming Events</option>
              <option value="Past">Past Events</option>
            </select>
          </div>

          {/* Category */}
          <div>
            <label className="mb-1 block text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Category
            </label>
            <select
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="h-10 w-full rounded-xl border border-gray-200 bg-[#FAFAF8] px-3 text-xs text-[#172333] outline-none transition focus:border-[#C9A45C]"
            >
              {categoriesList.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* City Location */}
          <div>
            <label className="mb-1 block text-xs font-semibold text-gray-500 uppercase tracking-wider">
              City / Location
            </label>
            <select
              value={cityFilter}
              onChange={(e) => {
                setCityFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="h-10 w-full rounded-xl border border-gray-200 bg-[#FAFAF8] px-3 text-xs text-[#172333] outline-none transition focus:border-[#C9A45C]"
            >
              {citiesList.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="mb-1 block text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="h-10 w-full rounded-xl border border-gray-200 bg-[#FAFAF8] px-3 text-xs text-[#172333] outline-none transition focus:border-[#C9A45C]"
            >
              <option value="All">All Statuses</option>
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
              <option value="Archived">Archived</option>
            </select>
          </div>
        </div>
      </div>

      {/* =====================================================
          EVENTS TABLE / CARDS
      ===================================================== */}
      <div className="overflow-hidden rounded-2xl border border-[#E5E0D6] bg-white shadow-sm">
        <div className="border-b border-[#E5E0D6] p-5 sm:p-6 flex items-center justify-between">
          <div>
            <h2 className="font-serif text-xl font-semibold text-[#0F2742]">
              All Event Records
            </h2>
            <p className="mt-1 text-xs text-gray-400">
              Showing {filteredEvents.length} events total
            </p>
          </div>
        </div>

        {/* Table view */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px]">
            <thead>
              <tr className="border-b border-[#E5E0D6] bg-[#FAFAF8]">
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Event Details
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Category & Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Date & Time
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  City & Venue
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Status
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#E5E0D6]">
              {paginatedEvents.length > 0 ? (
                paginatedEvents.map((event) => (
                  <tr key={event._id} className="transition hover:bg-[#FAFAF8]">
                    {/* Event Details */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3.5">
                        <div className="h-12 w-16 shrink-0 overflow-hidden rounded-lg bg-gray-100 border border-gray-200">
                          <img
                            src={
                              event.image ||
                              "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=400&q=80"
                            }
                            alt={event.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-[#172333] line-clamp-1">
                            {event.title}
                          </p>
                          <p className="mt-0.5 text-xs text-gray-500 line-clamp-1">
                            {event.expectedAttendees || "Attendees details"}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Category & Type */}
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <span className="inline-block text-xs font-medium text-gray-700">
                          {event.category}
                        </span>
                        <div>
                          <span
                            className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${getTypeBadgeStyle(
                              event.eventType
                            )}`}
                          >
                            {event.eventType || "Upcoming"}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Date & Time */}
                    <td className="px-6 py-4">
                      <div className="text-xs space-y-0.5">
                        <p className="font-medium text-[#172333] flex items-center gap-1.5">
                          <Calendar size={13} className="text-[#C9A45C]" />
                          {event.date}
                        </p>
                        {event.time && (
                          <p className="text-gray-400 flex items-center gap-1.5">
                            <Clock size={12} />
                            {event.time}
                          </p>
                        )}
                      </div>
                    </td>

                    {/* City & Venue */}
                    <td className="px-6 py-4">
                      <div className="text-xs space-y-0.5 max-w-[200px]">
                        <p className="font-medium text-[#172333] flex items-center gap-1">
                          <MapPin size={13} className="text-[#C9A45C]" />
                          {event.city}
                        </p>
                        <p className="text-gray-400 truncate" title={event.venue}>
                          {event.venue}
                        </p>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${getStatusBadgeStyle(
                          event.status
                        )}`}
                      >
                        <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />
                        {event.status || "Published"}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        {/* View Quick Modal */}
                        <button
                          title="View Details"
                          onClick={() => setSelectedEventForModal(event)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:border-[#C9A45C] hover:bg-[#C9A45C]/10 hover:text-[#0F2742]"
                        >
                          <Eye size={15} />
                        </button>

                        {/* Edit */}
                        <button
                          title="Edit Event"
                          onClick={() => navigate(`/events/edit/${event._id}`)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:border-[#0F2742] hover:bg-[#0F2742]/10 hover:text-[#0F2742]"
                        >
                          <Edit size={15} />
                        </button>

                        {/* Delete */}
                        <button
                          title="Delete Event"
                          disabled={deletingId === event._id}
                          onClick={() => handleDelete(event._id, event.title)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-red-200 text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                        >
                          {deletingId === event._id ? (
                            <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-red-200 border-t-red-600" />
                          ) : (
                            <Trash2 size={15} />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center">
                      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                        <Calendar size={22} className="text-gray-400" />
                      </div>
                      <p className="font-medium text-[#172333]">No events found</p>
                      <p className="mt-1 text-xs text-gray-400">
                        Try changing your search keywords or active filters.
                      </p>
                      <button
                        onClick={() => navigate("/events/add")}
                        className="mt-4 text-xs font-semibold text-[#C9A45C] hover:underline"
                      >
                        + Add a new event now
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION FOOTER */}
        <div className="flex flex-col gap-4 border-t border-[#E5E0D6] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p className="text-xs text-gray-500">
            Showing{" "}
            <span className="font-medium text-[#172333]">
              {paginatedEvents.length}
            </span>{" "}
            of{" "}
            <span className="font-medium text-[#172333]">
              {filteredEvents.length}
            </span>{" "}
            events
          </p>

          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="flex h-8 items-center gap-1 rounded-lg border border-gray-200 px-3 text-xs font-medium text-gray-600 transition hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={14} /> Previous
            </button>

            <span className="text-xs font-semibold text-[#172333] px-2">
              Page {currentPage} of {totalPages}
            </span>

            <button
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              className="flex h-8 items-center gap-1 rounded-lg border border-gray-200 px-3 text-xs font-medium text-gray-600 transition hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================
          EVENT QUICK VIEW MODAL
      ===================================================== */}
      {selectedEventForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl border border-[#E5E0D6]">
            {/* Modal Header */}
            <div className="bg-[#0F2742] p-5 text-white relative">
              <button
                onClick={() => setSelectedEventForModal(null)}
                className="absolute top-4 right-4 text-gray-300 hover:text-white p-1 rounded-md"
              >
                <X size={18} />
              </button>
              <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-[#C9A45C]">
                {selectedEventForModal.category}
              </span>
              <h3 className="font-serif text-xl font-bold text-white mt-1">
                {selectedEventForModal.title}
              </h3>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto text-xs text-[#172333]">
              <div className="h-44 rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                <img
                  src={
                    selectedEventForModal.image ||
                    "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80"
                  }
                  alt={selectedEventForModal.title}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-[#FAFAF8] p-3 rounded-xl border border-gray-100">
                  <span className="text-gray-400 font-medium block">Date & Time</span>
                  <p className="font-semibold text-[#0F2742] mt-0.5">
                    {selectedEventForModal.date}
                  </p>
                  <p className="text-gray-500">{selectedEventForModal.time}</p>
                </div>

                <div className="bg-[#FAFAF8] p-3 rounded-xl border border-gray-100">
                  <span className="text-gray-400 font-medium block">Location</span>
                  <p className="font-semibold text-[#0F2742] mt-0.5">
                    {selectedEventForModal.city}
                  </p>
                  <p className="text-gray-500 truncate" title={selectedEventForModal.venue}>
                    {selectedEventForModal.venue}
                  </p>
                </div>
              </div>

              <div>
                <span className="text-gray-400 font-medium block mb-1">Description</span>
                <p className="text-gray-700 leading-relaxed bg-[#FAFAF8] p-3 rounded-xl border border-gray-100">
                  {selectedEventForModal.description}
                </p>
              </div>

              {selectedEventForModal.highlights && selectedEventForModal.highlights.length > 0 && (
                <div>
                  <span className="text-gray-400 font-medium block mb-1">Highlights</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedEventForModal.highlights.map((hl, idx) => (
                      <span key={idx} className="bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-1 rounded-md text-[11px]">
                        • {hl}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="border-t border-[#E5E0D6] bg-[#FAFAF8] p-4 flex items-center justify-between">
              <button
                onClick={() => {
                  const eventId = selectedEventForModal._id;
                  setSelectedEventForModal(null);
                  navigate(`/events/edit/${eventId}`);
                }}
                className="flex items-center gap-1.5 text-xs font-semibold text-[#0F2742] hover:text-[#C9A45C]"
              >
                <Edit size={14} /> Edit This Event
              </button>

              <button
                onClick={() => setSelectedEventForModal(null)}
                className="rounded-xl bg-[#0F2742] px-4 py-2 text-xs font-semibold text-[#C9A45C]"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Events;