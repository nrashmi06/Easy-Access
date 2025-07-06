import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteSubjectController } from "../controllers/subject/deleteSubjectController";
import { triggerSubjectsReload } from "../store/subjectSlice";

export default function DeleteSubjectForm({ subject, onClose }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const accessToken = useSelector((state) => state.auth.accessToken);
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await deleteSubjectController(accessToken, subject._id);

      if (response?.success) {
        dispatch(triggerSubjectsReload());
        onClose(); // Close the modal after deletion
      } else {
        setError(response.message || "Failed to delete subject.");
      }
    } catch (err) {
      setError(err.message || "Unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 p-4 bg-neutral rounded-md shadow">
      <h3 className="text-lg text-white font-semibold">Delete Subject</h3>
      <p className="text-white">
        Are you sure you want to delete <strong>{subject.name}</strong>?
      </p>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="flex justify-end gap-2">
        <button
          className="btn btn-ghost"
          onClick={onClose}
          disabled={loading}
        >
          Cancel
        </button>
        <button
          className="btn btn-error"
          onClick={handleDelete}
          disabled={loading}
        >
          {loading ? "Deleting..." : "Yes, Delete"}
        </button>
      </div>
    </div>
  );
}
