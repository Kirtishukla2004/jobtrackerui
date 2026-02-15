import { useState, useEffect, useCallback } from "react";
import AddJob from "../components/AddJob";
import JobCard from "../components/JobCard";
import StatCard from "../components/StatCard";
import FilterJob from "../components/FilterJob";
import { getJobDashboardData, deleteJob } from "../services/dashboardServices";
import Swal from "sweetalert2";

function Dashboard() {
  const PAGE_SIZE = 6;

  const [open, setOpen] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});
  const [editJob, setEditJob] = useState(null);

  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

 const fetchJobs = useCallback(
  async (appliedFilters, pageNo = page) => {
    try {
      setLoading(true);
      const data = await getJobDashboardData({
        appliedFilters,
        page: pageNo,
        pageSize: PAGE_SIZE,
      });
      setJobs(data.items);
      setTotalCount(data.totalCount);
    } catch (err) {
      console.error("Failed to load jobs", err);
    } finally {
      setLoading(false);
    }
  },
  [page]
);

  useEffect(() => {
  fetchJobs(filters, page);
}, [filters, page, fetchJobs]);

  const handleFilterChange = (newFilters) => {
    setPage(1);
    setFilters(newFilters);
  };

  const handleDelete = async (jobId) => {
    const result = await Swal.fire({
      title: "Delete Job?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
      customClass: {
        popup: "rounded-xl",
        title: "text-sm font-semibold text-gray-800",
        htmlContainer: "text-sm text-gray-600",
        confirmButton:
          "bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md mx-2",
        cancelButton:
          "bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md mx-2",
      },
      buttonsStyling: false,
    });

    if (!result.isConfirmed) return;

    try {
      await deleteJob(jobId);
      fetchJobs(filters, page);

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Job deleted successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to delete job. Please try again.",
      });
    }
  };

  const statusCounts = jobs.reduce((acc, job) => {
    if (!job.statusName) return acc;
    acc[job.statusName] = (acc[job.statusName] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-[25px] font-semibold text-[#303b51]">
          Dashboard
        </h1>
        <button onClick={() => {setEditJob(null); setOpen(true);}} className="rounded-md bg-[#3b6fe8] px-4 py-2 text-sm text-white">
          + Add Job
        </button>
      </div>

      <AddJob open={open} jobToEdit={editJob} onClose={() => { setOpen(false); setEditJob(null);}} onJobAdded={() => fetchJobs(filters, page)}/>
      <FilterJob onFilter={handleFilterChange} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(statusCounts).map(([status, count]) => (
          <StatCard key={status} title={status} count={count} color={status.toLowerCase().includes("offer")? "green": status.toLowerCase().includes("interview")? "yellow": status.toLowerCase().includes("reject")? "red": "blue"}/>
        ))}
      </div>
      {loading ? (
        <p className="text-gray-500">Loading jobs...</p>
      ) : jobs.length === 0 ? (
        <p className="text-gray-500">No jobs found</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <JobCard
                key={job.jobId}
                company={job.companyName}
                role={job.role}
                status={job.statusName}
                date={job.appliedDate}
                platformAppliedOn={job.platformAppliedOn}
                contactPerson={job.contactPerson}
                contactInfo={job.contactInfo}
                onEdit={() => {setEditJob(job); setOpen(true);}}
                onDelete={() => handleDelete(job.jobId)}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-6">
              <button disabled={page === 1} onClick={() => setPage((p) => p - 1)} className="px-3 py-1 border rounded disabled:opacity-40">
                Prev
              </button>
              <span className="text-sm text-gray-600">
                Page {page} of {totalPages}
              </span>
              <button disabled={page === totalPages} onClick={() => setPage((p) => p + 1)} className="px-3 py-1 border rounded disabled:opacity-40">
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Dashboard;
