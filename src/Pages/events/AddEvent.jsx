import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Clock,
  Users,
  Image,
  FileText,
  Tag,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

import { createEvent } from "../../services/api";

function AddEvent() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    category: "Expos & Exhibitions",
    eventType: "Upcoming",
    date: "",
    time: "10:00 AM - 05:00 PM",
    city: "Lucknow",
    venue: "",
    expectedAttendees: "500+ Delegates",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80",
    description: "",
    highlights: "",
    speakers: "",
    stalls: "",
    status: "Published",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.title.trim() || !formData.date.trim() || !formData.venue.trim() || !formData.description.trim()) {
      setError("Please fill in all required fields (Title, Date, Venue, Description).");
      return;
    }

    try {
      setSubmitting(true);
      await createEvent(formData);
      navigate("/events");
    } catch (err) {
      console.error("Error creating event:", err);
      setError(err.message || "Failed to create event. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#E5E0D6] pb-5">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/events")}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 transition hover:border-[#C9A45C] hover:bg-[#C9A45C]/10 hover:text-[#0F2742]"
          >
            <ArrowLeft size={18} />
          </button>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A45C]">
              Create New Event
            </p>
            <h1 className="font-serif text-2xl font-semibold text-[#0F2742]">
              Add UPEMA Event / Summit
            </h1>
          </div>
        </div>

        <button
          type="button"
          onClick={() => navigate("/events")}
          className="text-xs font-medium text-gray-500 hover:text-[#0F2742]"
        >
          Cancel
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <AlertCircle size={18} className="shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Form Container */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="rounded-2xl border border-[#E5E0D6] bg-white p-6 sm:p-8 shadow-sm space-y-6">
          <h2 className="font-serif text-lg font-semibold text-[#0F2742] border-b border-gray-100 pb-3 flex items-center gap-2">
            <Tag size={18} className="text-[#C9A45C]" /> Basic Event Details
          </h2>

          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-[#172333] mb-1.5 uppercase tracking-wider">
              Event Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. UPEMA Grand Wedding & Event Expo 2026"
              className="w-full rounded-xl border border-gray-200 bg-[#FAFAF8] px-4 py-3 text-sm text-[#172333] outline-none transition focus:border-[#C9A45C] focus:ring-2 focus:ring-[#C9A45C]/10"
              required
            />
          </div>

          {/* Category & Event Type */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-[#172333] mb-1.5 uppercase tracking-wider">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 bg-[#FAFAF8] px-4 py-3 text-sm text-[#172333] outline-none transition focus:border-[#C9A45C]"
              >
                <option value="Expos & Exhibitions">Expos & Exhibitions</option>
                <option value="Summits & Conclaves">Summits & Conclaves</option>
                <option value="Networking Galas">Networking Galas</option>
                <option value="Workshops">Workshops</option>
                <option value="State Conventions">State Conventions</option>
                <option value="Trade Expos">Trade Expos</option>
                <option value="Technical Masterclasses">Technical Masterclasses</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#172333] mb-1.5 uppercase tracking-wider">
                Event Type
              </label>
              <select
                name="eventType"
                value={formData.eventType}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 bg-[#FAFAF8] px-4 py-3 text-sm text-[#172333] outline-none transition focus:border-[#C9A45C]"
              >
                <option value="Upcoming">Upcoming Event</option>
                <option value="Past">Past / Archived Event</option>
              </select>
            </div>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-[#172333] mb-1.5 uppercase tracking-wider">
                Event Date <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="date"
                value={formData.date}
                onChange={handleChange}
                placeholder="e.g. Oct 15 - 17, 2026"
                className="w-full rounded-xl border border-gray-200 bg-[#FAFAF8] px-4 py-3 text-sm text-[#172333] outline-none transition focus:border-[#C9A45C]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#172333] mb-1.5 uppercase tracking-wider">
                Timings
              </label>
              <input
                type="text"
                name="time"
                value={formData.time}
                onChange={handleChange}
                placeholder="e.g. 09:30 AM - 07:00 PM"
                className="w-full rounded-xl border border-gray-200 bg-[#FAFAF8] px-4 py-3 text-sm text-[#172333] outline-none transition focus:border-[#C9A45C]"
              />
            </div>
          </div>

          {/* City & Venue */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-[#172333] mb-1.5 uppercase tracking-wider">
                City / Location <span className="text-red-500">*</span>
              </label>
              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 bg-[#FAFAF8] px-4 py-3 text-sm text-[#172333] outline-none transition focus:border-[#C9A45C]"
              >
                <option value="Lucknow">Lucknow</option>
                <option value="Noida">Noida</option>
                <option value="Agra">Agra</option>
                <option value="Varanasi">Varanasi</option>
                <option value="Prayagraj">Prayagraj</option>
                <option value="Kanpur">Kanpur</option>
                <option value="Gorakhpur">Gorakhpur</option>
                <option value="Jhansi">Jhansi</option>
                <option value="Ayodhya">Ayodhya</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#172333] mb-1.5 uppercase tracking-wider">
                Venue Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="venue"
                value={formData.venue}
                onChange={handleChange}
                placeholder="e.g. Indira Gandhi Pratishthan, Lucknow"
                className="w-full rounded-xl border border-gray-200 bg-[#FAFAF8] px-4 py-3 text-sm text-[#172333] outline-none transition focus:border-[#C9A45C]"
                required
              />
            </div>
          </div>

          {/* Expected Attendees & Stalls */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-[#172333] mb-1.5 uppercase tracking-wider">
                Expected Delegates / Attendees
              </label>
              <input
                type="text"
                name="expectedAttendees"
                value={formData.expectedAttendees}
                onChange={handleChange}
                placeholder="e.g. 3,500+ Delegates"
                className="w-full rounded-xl border border-gray-200 bg-[#FAFAF8] px-4 py-3 text-sm text-[#172333] outline-none transition focus:border-[#C9A45C]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#172333] mb-1.5 uppercase tracking-wider">
                Stalls / Exhibition Lab Info
              </label>
              <input
                type="text"
                name="stalls"
                value={formData.stalls}
                onChange={handleChange}
                placeholder="e.g. 180+ Stalls or Technical Lab Demos"
                className="w-full rounded-xl border border-gray-200 bg-[#FAFAF8] px-4 py-3 text-sm text-[#172333] outline-none transition focus:border-[#C9A45C]"
              />
            </div>
          </div>

          {/* Banner Image URL */}
          <div>
            <label className="block text-xs font-semibold text-[#172333] mb-1.5 uppercase tracking-wider">
              Banner Image URL
            </label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://images.unsplash.com/..."
              className="w-full rounded-xl border border-gray-200 bg-[#FAFAF8] px-4 py-3 text-sm text-[#172333] outline-none transition focus:border-[#C9A45C]"
            />
            {formData.image && (
              <div className="mt-2.5 h-32 w-full max-w-sm rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                <img
                  src={formData.image}
                  alt="Banner preview"
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=400&q=80";
                  }}
                />
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-[#172333] mb-1.5 uppercase tracking-wider">
              Event Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              placeholder="Provide a detailed overview of the event, key agenda, target audience, and highlights..."
              className="w-full rounded-xl border border-gray-200 bg-[#FAFAF8] px-4 py-3 text-sm text-[#172333] outline-none transition focus:border-[#C9A45C]"
              required
            />
          </div>

          {/* Highlights */}
          <div>
            <label className="block text-xs font-semibold text-[#172333] mb-1.5 uppercase tracking-wider">
              Key Highlights & Resolutions (Comma Separated)
            </label>
            <input
              type="text"
              name="highlights"
              value={formData.highlights}
              onChange={handleChange}
              placeholder="e.g. Single-Window Event Clearance, Stage Rigging Safety Certification, Live Pyro Demos"
              className="w-full rounded-xl border border-gray-200 bg-[#FAFAF8] px-4 py-3 text-sm text-[#172333] outline-none transition focus:border-[#C9A45C]"
            />
          </div>

          {/* Keynote Speakers */}
          <div>
            <label className="block text-xs font-semibold text-[#172333] mb-1.5 uppercase tracking-wider">
              Keynote Dignitaries & Speakers (Comma Separated)
            </label>
            <input
              type="text"
              name="speakers"
              value={formData.speakers}
              onChange={handleChange}
              placeholder="e.g. UP Tourism Principal Secretary, President UPEMA, Senior Audio Auditor"
              className="w-full rounded-xl border border-gray-200 bg-[#FAFAF8] px-4 py-3 text-sm text-[#172333] outline-none transition focus:border-[#C9A45C]"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-xs font-semibold text-[#172333] mb-1.5 uppercase tracking-wider">
              Publishing Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full max-w-xs rounded-xl border border-gray-200 bg-[#FAFAF8] px-4 py-3 text-sm text-[#172333] outline-none transition focus:border-[#C9A45C]"
            >
              <option value="Published">Published (Visible on Website)</option>
              <option value="Draft">Save as Draft</option>
              <option value="Archived">Archived</option>
            </select>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate("/events")}
            className="rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 rounded-xl bg-[#0F2742] px-7 py-3 text-sm font-semibold text-[#C9A45C] shadow-md transition hover:bg-[#17385c] disabled:opacity-50"
          >
            {submitting ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#C9A45C]/30 border-t-[#C9A45C]" />
                Saving Event...
              </>
            ) : (
              <>
                <CheckCircle size={17} /> Save & Publish Event
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddEvent;