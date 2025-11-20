export default function NoData({ label }) {
  return (
    <div className="text-center py-10">
      <p className="text-lg font-semibold text-gray-500">
        No {label} Found
      </p>
    </div>
  );
}
