import { useState } from "react";
import { createSubjectController } from "../controllers/subject/createSubjectController";
import { useDispatch, useSelector } from "react-redux";
import { triggerSubjectsReload } from "../store/subjectSlice";

export default function AddSubjectForm({ onClose }) {
  const [subject, setSubject] = useState("");
  const accessToken = useSelector((state) => state.auth.accessToken);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createSubjectController(accessToken, { name: subject });
    dispatch(triggerSubjectsReload()); 
    alert("Subject created successfully!");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-base-200 p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Add Subject</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Subject Name"
            className="input input-bordered w-full mb-4"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="btn btn-outline">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
