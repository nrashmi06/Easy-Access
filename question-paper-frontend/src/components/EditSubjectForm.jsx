// components/forms/EditSubjectForm.jsx
import { useState } from "react";
import { updateSubjectController } from "../controllers/subject/updateSubjectController";
import { useDispatch, useSelector } from "react-redux";
import { triggerSubjectsReload } from "../store/subjectSlice";

export default function EditSubjectForm({ subject, onClose }) {
  const [name, setName] = useState(subject.name || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const accessToken = useSelector((state) => state.auth.accessToken);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Subject name cannot be empty.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const formData = {
        _id: subject._id,
        name: name.trim(),
      };

      const response = await updateSubjectController(accessToken, formData);

      if (response?.success) {
        dispatch(triggerSubjectsReload()); // 🔁 Refresh sidebar list
        onClose(); // ✅ Close modal or form
      } else {
        setError(response.message || "Failed to update subject.");
      }
    } catch (err) {
      setError(err.message || "Unexpected error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-neutral rounded-md shadow">
      <h3 className="text-lg text-white font-semibold">Edit Subject</h3>

      <div className="form-control">
        <label className="label font-medium text-sm">Subject Name</label>
        <input
          type="text"
          className="input input-bordered w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={loading}
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="flex justify-end gap-2">
        <button
          type="button"
          className="btn btn-ghost"
          onClick={onClose}
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
}
