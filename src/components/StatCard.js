function StatCard({ title, count, color = "blue" }) {
  const colors = {
    blue: "bg-blue-100 text-blue-600",
    yellow: "bg-yellow-100 text-yellow-600",
    green: "bg-green-100 text-green-600",
    red: "bg-red-100 text-red-600",
    gray: "bg-gray-100 text-gray-600",
  };

  return (
    <div className="flex justify-between items-center bg-white border p-5 rounded-xl shadow-sm">
      <div className="flex gap-4 items-center">
        <div
          className={`h-12 w-12 flex items-center justify-center rounded-lg font-bold ${
            colors[color] || colors.blue
          }`}
        >
          {count}
        </div>
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-lg font-semibold">{count}</p>
        </div>
      </div>
    </div>
  );
}

export default StatCard;
