import { useLocation } from "react-router-dom";

export default function SmartPage() {
  const location = useLocation();
  const inferenceResult = location.state?.inferenceResult;

  if (!inferenceResult) {
    return (
      <div className="p-10 text-white">
        No result found. Please upload again.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">
      <h2 className="text-2xl font-bold mb-6">Inference Results</h2>

      {inferenceResult.flaggedRoutes?.length > 0 ? (
        inferenceResult.flaggedRoutes.map((route, idx) => (
          <div key={idx} className="bg-gray-800 p-4 rounded mb-4">
            <p>
              <strong>URL:</strong> {route.url}
            </p>
            <p>
              <strong>Status:</strong> {route.status}
            </p>
            <p>
              <strong>Method:</strong> {route.method}
            </p>
            <p>
              <strong>Time:</strong> {route.time} ms
            </p>

            <ul className="mt-2 text-red-300 list-disc list-inside">
              {route.reasons.map((reason, i) => (
                <li key={i}>{reason}</li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>No issues detected. 🎉</p>
      )}
    </div>
  );
}
