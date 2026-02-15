import { useEffect, useState } from "react";
import { getJobStatuses } from "../services/dashboardServices";

function FilterJob({ onFilter }) {
  const [statuses, setStatuses] = useState([]);
  const [statusId, setStatusId] = useState("");
  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    getJobStatuses().then(setStatuses);
  }, []);

  const applyFilters = () => {
    onFilter({
      statusId: statusId ? Number(statusId) : null,
      fromDate: fromDate || null,
      toDate: toDate || null,
      search: search.trim() || null,
    });
  };

  const resetFilters = () => {
    setStatusId("");
    setSearch("");
    setFromDate("");
    setToDate("");
    onFilter({});
  };

  return (
    <div className="bg-white border rounded-xl p-3 flex flex-wrap items-end gap-3">
      <select
        value={statusId}
        onChange={(e) => setStatusId(e.target.value)}
        className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
      >
        <option value="">All Status</option>
        {statuses.map((s) => (
          <option key={s.statusId} value={s.statusId}>
            {s.displayName}
          </option>
        ))}
      </select>
      <div className="flex flex-col">
        <label className="text-[11px] text-gray-500 mb-1">From</label>
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-[11px] text-gray-500 mb-1">To</label>
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      <input
        type="text"
        placeholder="Search company / role"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded-lg px-3 py-2 text-sm flex-1 min-w-[200px] focus:ring-2 focus:ring-blue-500 outline-none"
      />
      <button
        onClick={applyFilters}
        className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700"
      >
        Apply
      </button>

      <button
        onClick={resetFilters}
        className="px-4 py-2 text-sm rounded-lg border text-gray-600 hover:bg-gray-100"
      >
        Reset
      </button>
    </div>
  );
}

export default FilterJob;
