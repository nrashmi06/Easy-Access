import { useState } from "react";
import { createQpController } from "../controllers/qp/createQpController";
import { useSelector } from "react-redux";

export default function AddQPForm({ onClose }) {
  const [formData, setFormData] = useState({
    title: "",
    year: "",
    subjectName: "",
    type: "MSE",
    pdf: null,
  });

  // 👇 Get subjectMap from Redux
  const subjectMap = useSelector((state) => state.subjects.subjectMap);
  const accessToken = useSelector((state) => state.auth.accessToken);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));

    await createQpController(data, accessToken);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-base-200 p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Add Question Paper</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="title"
            onChange={handleChange}
            placeholder="Title"
            className="input input-bordered w-full mb-3"
            required
          />
          <input
            name="year"
            onChange={handleChange}
            placeholder="Year"
            type="number"
            className="input input-bordered w-full mb-3"
            required
          />

          {/* ✅ Subject dropdown populated from Redux */}
          <select
            name="subjectName"
            onChange={handleChange}
            className="select select-bordered w-full mb-3"
            required
          >
            <option value="">Select Subject</option>
            {Object.entries(subjectMap).map(([id, name]) => (
              <option key={id} value={name}>
                {name}
              </option>
            ))}
          </select>

          <select
            name="type"
            onChange={handleChange}
            className="select select-bordered w-full mb-3"
          >
            <option>MSE</option>
            <option>SEE</option>
            <option>MCQ</option>
          </select>

          <input
            name="pdf"
            type="file"
            accept="application/pdf"
            onChange={handleChange}
            className="file-input file-input-bordered w-full mb-3"
            required
          />

          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="btn btn-outline">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
