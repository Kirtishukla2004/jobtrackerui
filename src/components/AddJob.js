import React, { useState, useEffect } from "react";
import { addJob, getJobStatuses } from "../services/dashboardServices";

function AddJob({ open, onClose, onJobAdded, jobToEdit }) {
  const isEditMode = Boolean(jobToEdit);

  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");
  const [statuses, setStatuses] = useState([]);
  const [statusId, setStatusId] = useState(null);
  const [roundNote, setRoundNote] = useState("");
  const [appliedDate, setAppliedDate] = useState("");
  const [platformAppliedOn, setPlatformAppliedOn] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔹 Reset form (important)
  const resetForm = () => {
    setCompanyName("");
    setRole("");
    setStatusId(null);
    setRoundNote("");
    setAppliedDate("");
    setPlatformAppliedOn("");
    setContactPerson("");
    setContactInfo("");
    setJobDescription("");
    setError("");
  };

  useEffect(() => {
    if (!open) return;

    const loadStatuses = async () => {
      try {
        const data = await getJobStatuses();
        setStatuses(data);
        if (jobToEdit) {
          setStatusId(jobToEdit.statusId);
        }
      } catch {
        setError("Failed to load job statuses");
      }
    };

    loadStatuses();
  }, [open, jobToEdit]);

  useEffect(() => {
    if (!jobToEdit) return;

    setCompanyName(jobToEdit.companyName);
    setRole(jobToEdit.role);
    setStatusId(jobToEdit.statusId);
    setRoundNote(jobToEdit.roundNote || "");
    setAppliedDate(jobToEdit.appliedDate?.split("T")[0] || "");
    setPlatformAppliedOn(jobToEdit.platformAppliedOn || "");
    setContactPerson(jobToEdit.contactPerson || "");
    setContactInfo(jobToEdit.contactInfo || "");
    setJobDescription(jobToEdit.jobDescription || "");
  }, [jobToEdit]);

  useEffect(() => {
    if (open && !jobToEdit) {
      resetForm();
    }
  }, [open, jobToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !companyName.trim() ||
      !role.trim() ||
      !statusId ||
      !appliedDate ||
      !platformAppliedOn.trim() ||
      !contactPerson.trim() ||
      !contactInfo.trim() ||
      !jobDescription.trim()
    ) {
      setError("All fields are required");
      return;
    }

    setLoading(true);

    try {
      await addJob({jobId: jobToEdit?.jobId || 0, companyName,role,statusId,roundNote,appliedDate,platformAppliedOn,contactPerson,contactInfo,jobDescription});

      onJobAdded();
      onClose();
      resetForm();
    } catch {
      setError("Failed to save job");
    } finally {
      setLoading(false);
    }
  };
 const inputStyle ="w-[300px] bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md p-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow";
  return (
    <div
      className={`fixed top-0 right-0 z-50 h-full w-full sm:w-[420px] bg-white shadow-2xl transform transition-transform duration-300 ${
        open ? "translate-x-0" : "translate-x-full"
      } flex flex-col`}
    >
      <div className="px-6 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold">
              {isEditMode ? "Edit Job" : "Add Job"}
            </h2>
            <p className="text-sm text-blue-100">
              Track your applications professionally
            </p>
          </div>
          <button onClick={onClose} className="text-2xl">✕</button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className=" flex-col-reverse overflow-y-auto px-6 py-5 space-y-6">
        {error && (
          <p className="text-sm text-red-500 bg-red-50 p-2 rounded">
            {error}
          </p>
        )}

        <input className={inputStyle} placeholder="Company Name" value={companyName} onChange={e => setCompanyName(e.target.value)} />
        <input className={inputStyle}  placeholder="Role" value={role} onChange={e => setRole(e.target.value)} />
        <input type="date" className={inputStyle}  value={appliedDate} onChange={e => setAppliedDate(e.target.value)} />
        <input className={inputStyle}  placeholder="Platform Applied On" value={platformAppliedOn} onChange={e => setPlatformAppliedOn(e.target.value)} />
        <input className={inputStyle}  placeholder="Contact Person" value={contactPerson} onChange={e => setContactPerson(e.target.value)} />
        <input className={inputStyle}  placeholder="Contact Info" value={contactInfo} onChange={e => setContactInfo(e.target.value)} />

        <select className={inputStyle}  value={statusId ?? ""} onChange={e => setStatusId(Number(e.target.value))}>
          <option value="">Select Job Status</option>
          {statuses.map(s => (
            <option key={s.statusId} value={s.statusId}>
              {s.displayName}
            </option>
          ))}
        </select>

        {statusId && (
          <input
            className={inputStyle} 
            placeholder="Round details (optional)"
            value={roundNote}
            onChange={e => setRoundNote(e.target.value)}
          />
        )}

        <textarea
          rows="4"
          maxLength={250}
          className={inputStyle} 
          placeholder="Job Description"
          value={jobDescription}
          onChange={e => setJobDescription(e.target.value)}
        />
      </form>
      <div className="px-6 py-4 border-t flex justify-end gap-3">
        <button onClick={onClose} className="px-4 py-2 border rounded">
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-5 py-2 bg-blue-600 text-white rounded disabled:opacity-60"
        >
          {loading ? "Saving..." : isEditMode ? "Update Job" : "Save Job"}
        </button>
      </div>
    </div>
  );
}

export default AddJob;
