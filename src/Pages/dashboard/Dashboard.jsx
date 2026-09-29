import {
  Users,
  Clock3,
  CalendarDays,
  FileText,
  ArrowUpRight,
  MoreHorizontal,
} from "lucide-react";

const stats = [
  {
    title: "Total Members",
    value: "128",
    change: "+12.5%",
    icon: Users,
  },
  {
    title: "Pending Applications",
    value: "24",
    change: "+4.8%",
    icon: Clock3,
  },
  {
    title: "Upcoming Events",
    value: "08",
    change: "+2.4%",
    icon: CalendarDays,
  },
  {
    title: "Published Blogs",
    value: "15",
    change: "+8.2%",
    icon: FileText,
  },
];

const applications = [
  {
    name: "Rahul Sharma",
    company: "Sharma Events",
    city: "Lucknow",
    date: "14 Sep 2026",
    status: "Pending",
  },
  {
    name: "Amit Verma",
    company: "AV Productions",
    city: "Noida",
    date: "13 Sep 2026",
    status: "Approved",
  },
  {
    name: "Priya Singh",
    company: "PS Events",
    city: "Varanasi",
    date: "12 Sep 2026",
    status: "Pending",
  },
  {
    name: "Ankit Gupta",
    company: "AG Experiences",
    city: "Lucknow",
    date: "11 Sep 2026",
    status: "Approved",
  },
];

function Dashboard() {
  return (
    <div className="space-y-8">

      {/* Heading */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A45C]">
          Overview
        </p>

        <h1 className="mt-2 font-serif text-3xl font-semibold text-[#0F2742]">
          Dashboard
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Welcome back. Here's what's happening with UPEMA today.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-2xl border border-[#E7E1D5] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >

              <div className="flex items-start justify-between">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0F2742] text-[#C9A45C]">
                  <Icon size={20} />
                </div>

                <button className="text-gray-400 hover:text-[#0F2742]">
                  <MoreHorizontal size={20} />
                </button>

              </div>

              <p className="mt-5 text-sm text-gray-500">
                {item.title}
              </p>

              <div className="mt-1 flex items-end justify-between">

                <h2 className="text-3xl font-semibold text-[#0F2742]">
                  {item.value}
                </h2>

                <span className="mb-1 flex items-center gap-1 text-xs font-medium text-green-600">
                  {item.change}
                  <ArrowUpRight size={13} />
                </span>

              </div>

            </div>
          );
        })}

      </div>

      {/* Recent Applications */}
      <div className="overflow-hidden rounded-2xl border border-[#E7E1D5] bg-white shadow-sm">

        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">

          <div>
            <h2 className="font-serif text-xl font-semibold text-[#0F2742]">
              Recent Membership Applications
            </h2>

            <p className="mt-1 text-xs text-gray-400">
              Latest membership requests received
            </p>
          </div>

          <button className="text-sm font-medium text-[#C9A45C] hover:text-[#0F2742]">
            View All
          </button>

        </div>

        {/* Table */}
        <div className="overflow-x-auto">

          <table className="w-full min-w-[700px] text-left">

            <thead>
              <tr className="border-b border-gray-100 bg-[#FAFAF8]">
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Applicant
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Company
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
                  City
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Applied
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>

              {applications.map((application) => (
                <tr
                  key={application.name}
                  className="border-b border-gray-50 last:border-0 hover:bg-[#FAFAF8]"
                >

                  <td className="px-6 py-4">

                    <div className="flex items-center gap-3">

                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0F2742] text-xs font-semibold text-[#C9A45C]">
                        {application.name.charAt(0)}
                      </div>

                      <span className="text-sm font-medium text-[#172333]">
                        {application.name}
                      </span>

                    </div>

                  </td>

                  <td className="px-6 py-4 text-sm text-gray-500">
                    {application.company}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-500">
                    {application.city}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-500">
                    {application.date}
                  </td>

                  <td className="px-6 py-4">

                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                        application.status === "Approved"
                          ? "bg-green-50 text-green-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {application.status}
                    </span>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>
      </div>

    </div>
  );
}

export default Dashboard;