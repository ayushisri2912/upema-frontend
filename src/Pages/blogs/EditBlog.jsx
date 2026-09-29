import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  FileText,
  User,
  Calendar,
  Clock,
  Image as ImageIcon,
  Tag,
  Star,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

import { getBlogById, updateBlog } from "../../services/api";

function EditBlog() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    category: "Industry Insights",
    author: "UPEMA Editorial Team",
    authorRole: "Senior Editor",
    date: "",
    readTime: "4 min read",
    image: "",
    description: "",
    fullContent: "",
    highlights: "",
    tags: "",
    isFeatured: false,
    status: "Published",
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await getBlogById(id);
        const data = res.data;
        if (data) {
          setFormData({
            title: data.title || "",
            category: data.category || "Industry Insights",
            author: data.author || "UPEMA Editorial Team",
            authorRole: data.authorRole || "Senior Editor",
            date: data.date || "",
            readTime: data.readTime || "4 min read",
            image: data.image || "",
            description: data.description || "",
            fullContent: data.fullContent || "",
            highlights: Array.isArray(data.highlights)
              ? data.highlights.join(", ")
              : data.highlights || "",
            tags: Array.isArray(data.tags)
              ? data.tags.join(", ")
              : data.tags || "",
            isFeatured: Boolean(data.isFeatured),
            status: data.status || "Published",
          });
        }
      } catch (err) {
        console.error("Error loading blog details:", err);
        setError(err.message || "Failed to load blog post.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBlogDetails();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.title.trim() || !formData.description.trim() || !formData.fullContent.trim()) {
      setError("Please fill in all required fields (Title, Excerpt Description, Full Article Content).");
      return;
    }

    try {
      setSubmitting(true);
      await updateBlog(id, formData);
      navigate("/blogs");
    } catch (err) {
      console.error("Error updating blog:", err);
      setError(err.message || "Failed to update blog post.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-11 w-11 animate-spin rounded-full border-4 border-[#C9A45C]/20 border-t-[#C9A45C]" />
          <p className="text-sm font-medium text-gray-500">
            Loading blog post details...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#E5E0D6] pb-5">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/blogs")}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 transition hover:border-[#C9A45C] hover:bg-[#C9A45C]/10 hover:text-[#0F2742]"
          >
            <ArrowLeft size={18} />
          </button>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A45C]">
              Edit Article Record
            </p>
            <h1 className="font-serif text-2xl font-semibold text-[#0F2742]">
              Update Journal Article
            </h1>
          </div>
        </div>

        <button
          type="button"
          onClick={() => navigate("/blogs")}
          className="text-xs font-medium text-gray-500 hover:text-[#0F2742]"
        >
          Cancel
        </button>
      </div>

      {error && (
        <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <AlertCircle size={18} className="shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="rounded-2xl border border-[#E5E0D6] bg-white p-6 sm:p-8 shadow-sm space-y-6">
          <h2 className="font-serif text-lg font-semibold text-[#0F2742] border-b border-gray-100 pb-3 flex items-center gap-2">
            <FileText size={18} className="text-[#C9A45C]" /> Article Meta & Content
          </h2>

          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-[#172333] mb-1.5 uppercase tracking-wider">
              Article Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Why Destination Weddings Are the Next Big Thing in UP"
              className="w-full rounded-xl border border-gray-200 bg-[#FAFAF8] px-4 py-3 text-sm text-[#172333] outline-none transition focus:border-[#C9A45C] focus:ring-2 focus:ring-[#C9A45C]/10"
              required
            />
          </div>

          {/* Category & Read Time */}
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
                <option value="Industry Insights">Industry Insights</option>
                <option value="Event Stories">Event Stories</option>
                <option value="UPEMA Updates">UPEMA Updates</option>
                <option value="Trends">Trends</option>
                <option value="Expert Opinions">Expert Opinions</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#172333] mb-1.5 uppercase tracking-wider">
                Read Time
              </label>
              <input
                type="text"
                name="readTime"
                value={formData.readTime}
                onChange={handleChange}
                placeholder="e.g. 4 min read"
                className="w-full rounded-xl border border-gray-200 bg-[#FAFAF8] px-4 py-3 text-sm text-[#172333] outline-none transition focus:border-[#C9A45C]"
              />
            </div>
          </div>

          {/* Author Name & Author Role */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-[#172333] mb-1.5 uppercase tracking-wider">
                Author Name
              </label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="e.g. UPEMA Editorial Team"
                className="w-full rounded-xl border border-gray-200 bg-[#FAFAF8] px-4 py-3 text-sm text-[#172333] outline-none transition focus:border-[#C9A45C]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#172333] mb-1.5 uppercase tracking-wider">
                Author Designation / Role
              </label>
              <input
                type="text"
                name="authorRole"
                value={formData.authorRole}
                onChange={handleChange}
                placeholder="e.g. Luxury Wedding Analyst"
                className="w-full rounded-xl border border-gray-200 bg-[#FAFAF8] px-4 py-3 text-sm text-[#172333] outline-none transition focus:border-[#C9A45C]"
              />
            </div>
          </div>

          {/* Publish Date & Cover Image */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-[#172333] mb-1.5 uppercase tracking-wider">
                Publish Date
              </label>
              <input
                type="text"
                name="date"
                value={formData.date}
                onChange={handleChange}
                placeholder="e.g. 10 September 2026"
                className="w-full rounded-xl border border-gray-200 bg-[#FAFAF8] px-4 py-3 text-sm text-[#172333] outline-none transition focus:border-[#C9A45C]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#172333] mb-1.5 uppercase tracking-wider">
                Cover Image URL
              </label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://images.unsplash.com/..."
                className="w-full rounded-xl border border-gray-200 bg-[#FAFAF8] px-4 py-3 text-sm text-[#172333] outline-none transition focus:border-[#C9A45C]"
              />
            </div>
          </div>

          {/* Image Preview */}
          {formData.image && (
            <div>
              <span className="block text-xs font-semibold text-gray-400 mb-1">Image Preview</span>
              <div className="h-40 w-full max-w-sm rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                <img
                  src={formData.image}
                  alt="Cover preview"
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=400&q=80";
                  }}
                />
              </div>
            </div>
          )}

          {/* Excerpt Description */}
          <div>
            <label className="block text-xs font-semibold text-[#172333] mb-1.5 uppercase tracking-wider">
              Short Excerpt / Summary <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              placeholder="Provide a summary for card views..."
              className="w-full rounded-xl border border-gray-200 bg-[#FAFAF8] px-4 py-3 text-sm text-[#172333] outline-none transition focus:border-[#C9A45C]"
              required
            />
          </div>

          {/* Full Article Content */}
          <div>
            <label className="block text-xs font-semibold text-[#172333] mb-1.5 uppercase tracking-wider">
              Full Article Body <span className="text-red-500">*</span>
            </label>
            <textarea
              name="fullContent"
              rows={8}
              value={formData.fullContent}
              onChange={handleChange}
              placeholder="Write the complete article content..."
              className="w-full rounded-xl border border-gray-200 bg-[#FAFAF8] px-4 py-3 text-sm text-[#172333] outline-none transition focus:border-[#C9A45C] font-mono text-xs"
              required
            />
          </div>

          {/* Highlights & Tags */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-[#172333] mb-1.5 uppercase tracking-wider">
                Key Highlights (Comma Separated)
              </label>
              <input
                type="text"
                name="highlights"
                value={formData.highlights}
                onChange={handleChange}
                placeholder="e.g. Bespoke cultural integrations, Dedicated logistics"
                className="w-full rounded-xl border border-gray-200 bg-[#FAFAF8] px-4 py-3 text-sm text-[#172333] outline-none transition focus:border-[#C9A45C]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#172333] mb-1.5 uppercase tracking-wider">
                Tags (Comma Separated)
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="e.g. Destination Weddings, Luxury, UPEMA"
                className="w-full rounded-xl border border-gray-200 bg-[#FAFAF8] px-4 py-3 text-sm text-[#172333] outline-none transition focus:border-[#C9A45C]"
              />
            </div>
          </div>

          {/* Featured & Status */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pt-2">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="isFeatured"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-[#0F2742] focus:ring-[#C9A45C]"
              />
              <label htmlFor="isFeatured" className="text-xs font-semibold text-[#172333] cursor-pointer flex items-center gap-1.5">
                <Star size={14} className="text-[#C9A45C]" /> Mark as Featured Article
              </label>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#172333] mb-1.5 uppercase tracking-wider">
                Publishing Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="rounded-xl border border-gray-200 bg-[#FAFAF8] px-4 py-2.5 text-xs text-[#172333] outline-none transition focus:border-[#C9A45C]"
              >
                <option value="Published">Published (Visible on Website)</option>
                <option value="Draft">Save as Draft</option>
                <option value="Archived">Archived</option>
              </select>
            </div>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate("/blogs")}
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
                Saving Changes...
              </>
            ) : (
              <>
                <CheckCircle size={17} /> Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditBlog;