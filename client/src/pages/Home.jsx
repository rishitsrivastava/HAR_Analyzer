import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Home() {
  const [harFile, setHarFile] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [uploading, setUploading] = useState(null);
  const navigate = useNavigate();

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.name.endsWith(".har")) {
      setHarFile(file);
      setSelectedOption(null); // Reset option on new file
    } else {
      alert("Please upload a valid .har file");
    }
  };

  const handleOptionClick = async (option) => {
    if (!harFile) return alert("upload a HAR file first");
    const formData = new FormData();
    formData.append("harFile", harFile);

    setUploading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/upload",
        formData,
        {
          headers: {
            "content-Type": "multiplepart/form-data",
          },
        }
      );
      if (option === "manual") {
        navigate("/manual", { state: { harData: data } });
      } else {
        navigate("smart", { state: { inferenceResult: data } });
      }
    } catch (error) {
      console.error("Upload error: ", error);
      alert("Failed to upload or process HAR file.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-6">HAR Log Analyzer</h1>

      <input
        type="file"
        accept=".har"
        onChange={handleFileUpload}
        className="mb-6 border p-1 border-amber-50"
      />

      {harFile && (
        <div className="flex flex-col gap-4 items-center">
          <p className="text-green-400">Uploaded: {harFile.name}</p>

          <p className="text-lg mt-4">Choose how to analyze:</p>

          <div className="flex gap-4 mt-2">
            <button
              className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded"
              onClick={() => handleOptionClick("manual")}
              disabled={uploading}
            >
              Manual Analysis
            </button>

            <button
              className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded"
              onClick={() => handleOptionClick("smart")}
              disabled={uploading}
            >
              Smart Suggestions
            </button>
          </div>
        </div>
      )}

      {selectedOption && (
        <p className="mt-8 text-lg text-yellow-400">
          You selected:{" "}
          {selectedOption === "manual"
            ? "Manual Analysis"
            : "Smart Suggestions"}
        </p>
      )}
    </div>
  );
}
