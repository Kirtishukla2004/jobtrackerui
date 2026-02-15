import { Edit, Trash2 } from "lucide-react";

function JobCard({
  company,
  role,
  status,
  date,
  onEdit,
  onDelete,
  platformAppliedOn,
  contactPerson,
  contactInfo,
}) {
  const badgeColors = {
    Applied: "bg-blue-100 text-blue-700",
    Interview: "bg-yellow-100 text-yellow-700",
    Offer: "bg-green-100 text-green-700",
    Rejected: "bg-red-100 text-red-700",
    Ghosted: "bg-gray-100 text-gray-600",
    "In Progress": "bg-purple-100 text-purple-700",
    "No Reply": "bg-gray-100 text-gray-600",
  };
  const badgeClass = badgeColors[status] || "bg-gray-100 text-gray-600";
  const formattedDate = date ? new Date(date).toLocaleDateString("en-GB") : "";
  function getInitials(name) {
    if (!name) return "?";
    const words = name.trim().split(" ");
    if (words.length === 1) return words[0][0].toUpperCase();
    return (words[0][0] + words[1][0]).toUpperCase();
  }

  function stringToColor(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = Math.abs(hash) % 360;
    return `hsl(${hue}, 65%, 55%)`;
  }
  function toTitleCase(str) {
    if (!str) return "";

    return str
      .toLowerCase()
      .split(" ")
      .filter(Boolean)
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(" ");
  }

  return (
    <div className="rounded-xl bg-white border p-5 shadow-sm space-y-3">
      <div className="flex justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-semibold text-sm"
            style={{ backgroundColor: stringToColor(company) }}
          >
            {getInitials(company)}
          </div>

          <div>
            <h3 className="font-semibold text-[#303b51] tracking-tight">
              {toTitleCase(company)}
            </h3>

            <p className="text-sm text-gray-500">{role}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            className="p-2 hover:bg-gray-100 rounded"
            onClick={onEdit}
            title="Edit job"
          >
            <Edit size={16} />
          </button>

          <button
            className="p-2 hover:bg-gray-100 rounded"
            onClick={onDelete}
            title="Delete job"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <span className={`px-3 py-1 text-xs rounded-full ${badgeClass}`}>
          {status}
        </span>
        <p className="text-xs text-gray-400">{formattedDate}</p>
        <p className="text-xs text-gray-400 ">{platformAppliedOn}</p>
      </div>
   <div className="flex justify-between items-center">
        <p className="text-xs text-gray-400">{contactPerson}</p>
        <p className="text-xs text-gray-400 ">{contactInfo}</p>
      </div>
    </div>
  );
}

export default JobCard;
