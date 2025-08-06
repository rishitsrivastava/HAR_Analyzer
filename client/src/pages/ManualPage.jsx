import { useLocation } from "react-router-dom";

export default function ManualPage() {
  const location = useLocation();
  const harData = location.state?.harData;

  if (!harData) {
    return (
      <div className="p-10 text-white">
        No HAR data found. Please upload again.
      </div>
    );
  }

  return (
    <div className="min-h-screen p-10">
      <h2 className="text-2xl font-bold mb-6">Manual HAR Viewer</h2>

      <pre className="bg-gray-800 p-4 rounded overflow-x-scroll max-h-[80vh]">
        {JSON.stringify(harData, null, 2)}
      </pre>
    </div>
  );
}
