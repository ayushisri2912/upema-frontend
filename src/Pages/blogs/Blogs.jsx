import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Star,
  Clock,
  Calendar,
  User,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  X,
  BookOpen,
} from "lucide-react";

import { getBlogs, deleteBlog } from "../../services/api";

function Blogs() {
  const navigate = useNavigate();

  // States
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [selectedBlogModal, setSelectedBlogModal] = useState(null);

  // Filters
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [statusFilter, setStatusFilter] = useState("All");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const categoriesList = [
    "All Categories",
    "Industry Insights",
    "Event Stories",
    "UPEMA Updates",
    "Trends",
    "Expert Opinions",
  ];

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await getBlogs();
      setBlogs(response.data || []);
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setError(err.message || "Failed to load blog posts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Filtered Logic
  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const searchValue = search.toLowerCase().trim();
      const matchesSearch =
        !searchValue ||
        (blog.title && blog.title.toLowerCase().includes(searchValue)) ||
        (blog.author && blog.author.toLowerCase().includes(searchValue)) ||
        (blog.description && blog.description.toLowerCase().includes(searchValue)) ||
        (blog.category && blog.category.toLowerCase().includes(searchValue));

      const matchesCategory =
        categoryFilter === "All Categories" || blog.category === categoryFilter;

      const matchesStatus =
        statusFilter === "All" || blog.status === statusFilter;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [blogs, search, categoryFilter, statusFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage) || 1;
  const paginatedBlogs = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredBlogs.slice(start, start + itemsPerPage);
  }, [filteredBlogs, currentPage]);

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete article "${title}"?`)) {
      return;
    }

    try {
      setDeletingId(id);
      await deleteBlog(id);
      await fetchBlogs();
    } catch (err) {
      console.error("Error deleting blog:", err);
      alert(err.message || "Failed to delete blog post.");
    } finally {
      setDeletingId(null);
    }
  };

  // Stats
  const totalBlogsCount = blogs.length;
  const publishedCount = blogs.filter((b) => b.status === "Published").length;
  const draftCount = blogs.filter((b) => b.status === "Draft").length;
  const featuredCount = blogs.filter((b) => b.isFeatured).length;

  if (loading) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-11 w-11 animate-spin rounded-full border-4 border-[#C9A45C]/20 border-t-[#C9A45C]" />
          <p className="text-sm font-medium text-gray-500">
            Loading UPEMA journal posts...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-7">
      {/* HEADER */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A45C]">
            UPEMA Journal Admin
          </p>
          <h1 className="font-serif text-3xl font-semibold text-[#0F2742]">
            Blogs & Thought Leadership
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Publish, edit, and curate industry stories, market insights, and official announcements.
          </p>
        </div>

        <button
          onClick={() => navigate("/blogs/add")}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0F2742] px-5 py-3 text-sm font-semibold text-[#C9A45C] shadow-md transition hover:bg-[#17385c] hover:shadow-lg"
        >
          <Plus size={18} className="text-[#C9A45C]" />
          Add New Article
        </button>
      </div>

      {/* ERROR MESSAGE */}
      {error && (
        <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle size={18} className="shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="group rounded-2xl border border-[#E5E0D6] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Articles</p>
              <h2 className="mt-2 text-3xl font-semibold text-[#0F2742]">
                {totalBlogsCount}
              </h2>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0F2742]/10 text-[#0F2742]">
              <FileText size={20} />
            </div>
          </div>
        </div>

        <div className="group rounded-2xl border border-[#E5E0D6] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">Published</p>
              <h2 className="mt-2 text-3xl font-semibold text-emerald-600">
                {publishedCount}
              </h2>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <BookOpen size={20} />
            </div>
          </div>
        </div>

        <div className="group rounded-2xl border border-[#E5E0D6] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">Drafts</p>
              <h2 className="mt-2 text-3xl font-semibold text-amber-600">
                {draftCount}
              </h2>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <Clock size={20} />
            </div>
          </div>
        </div>

        <div className="group rounded-2xl border border-[#E5E0D6] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">Featured Stories</p>
              <h2 className="mt-2 text-3xl font-semibold text-[#C9A45C]">
                {featuredCount}
              </h2>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#C9A45C]/10 text-[#C9A45C]">
              <Star size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* FILTER & SEARCH */}
      <div className="rounded-2xl border border-[#E5E0D6] bg-white p-5 shadow-sm space-y-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <h2 className="font-serif text-lg font-semibold text-[#0F2742] flex items-center gap-2">
            <Filter size={18} className="text-[#C9A45C]" /> Filter Articles
          </h2>

          <div className="relative flex-1 max-w-md">
            <Search
              size={17}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by title, author, category, or content..."
              className="h-11 w-full rounded-xl border border-gray-200 bg-[#FAFAF8] pl-10 pr-4 text-sm text-[#172333] outline-none transition focus:border-[#C9A45C] focus:ring-2 focus:ring-[#C9A45C]/10"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 pt-2 border-t border-gray-100">
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

      {/* ARTICLES TABLE */}
      <div className="overflow-hidden rounded-2xl border border-[#E5E0D6] bg-white shadow-sm">
        <div className="border-b border-[#E5E0D6] p-5 sm:p-6 flex items-center justify-between">
          <div>
            <h2 className="font-serif text-xl font-semibold text-[#0F2742]">
              Journal Articles & Posts
            </h2>
            <p className="mt-1 text-xs text-gray-400">
              Showing {filteredBlogs.length} articles total
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px]">
            <thead>
              <tr className="border-b border-[#E5E0D6] bg-[#FAFAF8]">
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Article Info
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Author & Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Featured
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
              {paginatedBlogs.length > 0 ? (
                paginatedBlogs.map((blog) => (
                  <tr key={blog._id} className="transition hover:bg-[#FAFAF8]">
                    {/* Article Info */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3.5">
                        <div className="h-12 w-16 shrink-0 overflow-hidden rounded-lg bg-gray-100 border border-gray-200">
                          <img
                            src={
                              blog.image ||
                              "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=400&q=80"
                            }
                            alt={blog.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="max-w-md">
                          <p className="font-semibold text-[#172333] line-clamp-1">
                            {blog.title}
                          </p>
                          <p className="mt-0.5 text-xs text-gray-500 line-clamp-1">
                            {blog.description}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-6 py-4">
                      <span className="inline-block text-xs font-semibold text-[#0F2742] bg-[#0F2742]/5 border border-[#0F2742]/10 px-2.5 py-1 rounded-md">
                        {blog.category}
                      </span>
                    </td>

                    {/* Author & Date */}
                    <td className="px-6 py-4">
                      <div className="text-xs space-y-0.5">
                        <p className="font-medium text-[#172333] flex items-center gap-1.5">
                          <User size={12} className="text-[#C9A45C]" />
                          {blog.author}
                        </p>
                        <p className="text-gray-400 flex items-center gap-1.5">
                          <Calendar size={12} />
                          {blog.date}
                        </p>
                      </div>
                    </td>

                    {/* Featured */}
                    <td className="px-6 py-4">
                      {blog.isFeatured ? (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-[#C9A45C] bg-[#C9A45C]/10 border border-[#C9A45C]/30 px-2.5 py-0.5 rounded-full">
                          <Star size={12} fill="#C9A45C" /> Featured
                        </span>
                      ) : (
                        <span className="text-xs text-gray-400">Standard</span>
                      )}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${
                          blog.status === "Published"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : blog.status === "Draft"
                            ? "bg-amber-50 text-amber-700 border-amber-200"
                            : "bg-gray-100 text-gray-600 border-gray-200"
                        }`}
                      >
                        <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />
                        {blog.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          title="View Details"
                          onClick={() => setSelectedBlogModal(blog)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:border-[#C9A45C] hover:bg-[#C9A45C]/10 hover:text-[#0F2742]"
                        >
                          <Eye size={15} />
                        </button>

                        <button
                          title="Edit Article"
                          onClick={() => navigate(`/blogs/edit/${blog._id}`)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:border-[#0F2742] hover:bg-[#0F2742]/10 hover:text-[#0F2742]"
                        >
                          <Edit size={15} />
                        </button>

                        <button
                          title="Delete Article"
                          disabled={deletingId === blog._id}
                          onClick={() => handleDelete(blog._id, blog.title)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-red-200 text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                        >
                          {deletingId === blog._id ? (
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
                        <FileText size={22} className="text-gray-400" />
                      </div>
                      <p className="font-medium text-[#172333]">No articles found</p>
                      <p className="mt-1 text-xs text-gray-400">
                        Try changing your search terms or filter selection.
                      </p>
                      <button
                        onClick={() => navigate("/blogs/add")}
                        className="mt-4 text-xs font-semibold text-[#C9A45C] hover:underline"
                      >
                        + Create a new article now
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="flex flex-col gap-4 border-t border-[#E5E0D6] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p className="text-xs text-gray-500">
            Showing{" "}
            <span className="font-medium text-[#172333]">
              {paginatedBlogs.length}
            </span>{" "}
            of{" "}
            <span className="font-medium text-[#172333]">
              {filteredBlogs.length}
            </span>{" "}
            articles
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

      {/* QUICK VIEW MODAL */}
      {selectedBlogModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl border border-[#E5E0D6]">
            <div className="bg-[#0F2742] p-5 text-white relative">
              <button
                onClick={() => setSelectedBlogModal(null)}
                className="absolute top-4 right-4 text-gray-300 hover:text-white p-1 rounded-md"
              >
                <X size={18} />
              </button>
              <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-[#C9A45C]">
                {selectedBlogModal.category}
              </span>
              <h3 className="font-serif text-xl font-bold text-white mt-1">
                {selectedBlogModal.title}
              </h3>
              <p className="text-xs text-gray-300 mt-1">
                By {selectedBlogModal.author} | {selectedBlogModal.date}
              </p>
            </div>

            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto text-xs text-[#172333]">
              <div className="h-52 rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                <img
                  src={
                    selectedBlogModal.image ||
                    "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80"
                  }
                  alt={selectedBlogModal.title}
                  className="h-full w-full object-cover"
                />
              </div>

              <div>
                <span className="text-gray-400 font-medium block mb-1">Excerpt</span>
                <p className="text-gray-700 leading-relaxed bg-[#FAFAF8] p-3 rounded-xl border border-gray-100 font-medium">
                  {selectedBlogModal.description}
                </p>
              </div>

              <div>
                <span className="text-gray-400 font-medium block mb-1">Full Content</span>
                <div className="text-gray-600 leading-relaxed bg-[#FAFAF8] p-4 rounded-xl border border-gray-100 whitespace-pre-line">
                  {selectedBlogModal.fullContent}
                </div>
              </div>

              {selectedBlogModal.highlights && selectedBlogModal.highlights.length > 0 && (
                <div>
                  <span className="text-gray-400 font-medium block mb-1">Highlights</span>
                  <div className="space-y-1">
                    {selectedBlogModal.highlights.map((hl, idx) => (
                      <div key={idx} className="bg-amber-50 text-amber-900 border border-amber-200 p-2 rounded-lg text-[11px]">
                        • {hl}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-[#E5E0D6] bg-[#FAFAF8] p-4 flex items-center justify-between">
              <button
                onClick={() => {
                  const bId = selectedBlogModal._id;
                  setSelectedBlogModal(null);
                  navigate(`/blogs/edit/${bId}`);
                }}
                className="flex items-center gap-1.5 text-xs font-semibold text-[#0F2742] hover:text-[#C9A45C]"
              >
                <Edit size={14} /> Edit Article
              </button>

              <button
                onClick={() => setSelectedBlogModal(null)}
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

export default Blogs;