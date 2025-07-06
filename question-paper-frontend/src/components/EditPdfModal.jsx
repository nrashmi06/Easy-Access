import { useState, useEffect } from "react";

export default function EditPdfModal({ isOpen, onClose, onSubmit, initialData }) {
  const [form, setForm] = useState(initialData);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    setForm(initialData);
    setSelectedFile(null);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
    } else {
      alert("Please select a valid PDF file.");
      setSelectedFile(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let updatedData = { ...form };

    if (selectedFile) {
      const fakeUploadedUrl = URL.createObjectURL(selectedFile); // Temporary URL for demonstration
      updatedData.pdfUrl = fakeUploadedUrl;
    }

    onSubmit(updatedData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
      <div className="bg-neutral rounded-xl shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-bold text-yellow-600 mb-4">Edit PDF</h2>
        <form onSubmit={handleSubmit} className="space-y-4">

          {["title", "year", "type", "subjectName"].map((field) => (
            <div key={field} className="form-control w-full">
              <label className="label">
                <span className="label-text capitalize">{field}</span>
              </label>
              <input
                type="text"
                name={field}
                value={form[field]}
                onChange={handleChange}
                required
                className="input input-bordered w-full"
              />
            </div>
          ))}

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">PDF File</span>
            </label>

            {/* Display selected file name or existing URL as pseudo selected */}
            <div className="input input-bordered flex items-center gap-2 w-full">
              <span className="truncate flex-1 text-sm text-gray-500">
                {selectedFile ? selectedFile.name : form.pdfUrl.split("/").pop()}
              </span>
              <label className="btn btn-sm btn-outline ">
                Choose File
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-ghost"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-warning text-white"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
