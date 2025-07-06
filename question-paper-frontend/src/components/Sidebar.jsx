import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setSubjects,
  setLoading,
  setError,
} from "../store/subjectSlice";
import { getAllSubjectController } from "../controllers/subject/getAllSubjectController";
import { Pencil, Trash2 } from "lucide-react";
import EditSubjectForm from "../components/EditSubjectForm";
import DeleteSubjectForm from "../components/DeleteSubjectForm"; // ✅ Import

export default function Sidebar({ closeDrawer, onSubjectClick }) {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);
  const userRole = useSelector((state) => state.auth.role);
  const subjectMap = useSelector((state) => state.subjects.subjectMap);
  const loading = useSelector((state) => state.subjects.loading);
  const reloadSignal = useSelector((state) => state.subjects.reloadSignal);

  const [editingSubject, setEditingSubject] = useState(null);
  const [deletingSubject, setDeletingSubject] = useState(null); // ✅ State for delete

  const subjects = Object.entries(subjectMap).map(([id, name]) => ({
    _id: id,
    name,
  }));

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        dispatch(setLoading(true));
        const response = await getAllSubjectController(accessToken);
        if (response.data?.success) {
          const mapped = Object.fromEntries(
            response.data.data.map((s) => [s._id, s.name])
          );
          dispatch(setSubjects(mapped));
        } else {
          dispatch(setError(response.data?.message || "Failed to fetch subjects"));
        }
      } catch (err) {
        dispatch(setError(err.message || "Unexpected error"));
      } finally {
        dispatch(setLoading(false));
      }
    };

    if (accessToken) {
      fetchSubjects();
    }
  }, [accessToken, reloadSignal, dispatch]);

  const handleEdit = (subject, e) => {
    e.stopPropagation();
    setEditingSubject(subject);
  };

  const handleDelete = (subject, e) => {
    e.stopPropagation();
    setDeletingSubject(subject); // ✅ Open delete modal
  };

  return (
    <>
      <div className="drawer-side z-40">
        <label htmlFor="sidebar-drawer" className="drawer-overlay" onClick={closeDrawer}></label>
        <aside className="menu w-72 bg-base-100 text-base-content h-screen shadow-xl border-r border-base-300 flex flex-col">
          <div className="sticky top-0 bg-base-100 z-10 p-4">
            <h2 className="font-bold text-xl text-primary">Subjects</h2>
          </div>

          <div className="flex-1 overflow-y-auto px-2">
            {loading ? (
              <p className="text-sm text-gray-500 p-4">Loading subjects...</p>
            ) : (
              <ul className="space-y-1">
                {subjects.map((subject) => (
                  <li key={subject._id} className="relative group">
                    <button
                      onClick={() => {
                        onSubjectClick(subject._id, subject.name);
                        closeDrawer();
                      }}
                      className="flex w-full items-center gap-3 p-3 rounded-lg capitalize text-sm font-medium hover:bg-primary/10 hover:text-primary hover:border-l-4 hover:border-primary transition-all duration-200 group active:scale-95"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-200">
                        <span className="text-xs font-bold">
                          {subject.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span className="flex-1 group-hover:translate-x-1 transition-transform duration-200">
                        {subject.name}
                      </span>
                    </button>

                    {userRole === "ADMIN" && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => handleEdit(subject, e)}
                          className="text-gray-500 hover:text-blue-600 p-1"
                          title="Edit"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={(e) => handleDelete(subject, e)}
                          className="text-gray-500 hover:text-red-600 p-1"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </aside>
      </div>

      {/* ✅ Edit Modal */}
      {editingSubject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
            <EditSubjectForm
              subject={editingSubject}
              onClose={() => setEditingSubject(null)}
            />
          </div>
        </div>
      )}

      {/* ✅ Delete Modal */}
      {deletingSubject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
            <DeleteSubjectForm
              subject={deletingSubject}
              onClose={() => setDeletingSubject(null)}
            />
          </div>
        </div>
      )}
    </>
  );
}
