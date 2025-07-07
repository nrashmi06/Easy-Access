import { useState } from "react";
import { useSelector } from "react-redux";
import { Edit2, X, Eye, Download, FileText, Clock } from "lucide-react";
import EditPdfModal from "./EditPdfModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

export default function PdfCard({
  _id,
  title,
  year,
  pdfUrl,
  type,
  subjectName,
}) {
  const role = useSelector((state) => state.auth.role);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  console.log("the value of id is", _id);
  console.log("the value of title is", title);
  const handleDownload = async () => {
    try {
      const response = await fetch(pdfUrl, { mode: "cors" });
      if (!response.ok) throw new Error("Network response was not ok");
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `${title}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Failed to download PDF:", error);
      alert("Failed to download PDF. Please try again later.");
    }
  };

  return (
    <div className="group relative rounded-xl shadow-sm border border-yellow-200 hover:shadow-lg hover:border-yellow-300 transition-all duration-300 overflow-hidden w-full max-w-sm">
      <div className="h-1 bg-gradient-to-r from-yellow-400 to-lime-500"></div>

      {role === "ADMIN" && (
        <div className="absolute top-3 right-3 flex gap-2 z-10">
          <button
            onClick={() => setShowEdit(true)}
            className="text-yellow-600 hover:text-yellow-800 p-1 rounded hover:bg-yellow-100 transition"
            title="Edit"
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={() => setShowDelete(true)}
            className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-100 transition"
            title="Delete"
          >
            <X size={16} />
          </button>
        </div>
      )}

      <div className="relative h-40 bg-gray-50 border-b border-yellow-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-20 rounded-lg border border-gray-200 mx-auto mb-3 flex items-center justify-center relative bg-white shadow-inner">
            <FileText className="w-8 h-8 text-red-500" />
            <div className="absolute -bottom-1 -right-1 bg-red-500 text-white text-xs px-1 py-0.5 rounded text-[10px] font-bold">
              PDF
            </div>
          </div>
          <p className="text-xs text-gray-500 font-medium">Click to preview</p>
        </div>
      </div>

      <div className="p-5">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-base leading-tight mb-2 group-hover:text-yellow-700 transition-colors line-clamp-2">
            {title}
          </h3>
          <p className="text-sm text-gray-600 font-medium">Subject: {subjectName}</p>
          <p className="text-sm text-gray-600 font-medium">Type: {type}</p>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
            <Clock className="w-3 h-3 text-gray-400" />
            <p className="text-sm text-gray-600 font-medium">Published {year}</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <a
            href={`https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(pdfUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500 to-lime-500 text-white text-sm font-medium rounded-lg hover:from-yellow-600 hover:to-lime-600"
          >
            <Eye size={16} />
            Preview
          </a>
          <button
            onClick={handleDownload}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-white text-yellow-600 border border-yellow-300 text-sm font-medium rounded-lg hover:bg-yellow-50 hover:text-yellow-700"
          >
            <Download size={16} />
            Download
          </button>
        </div>
      </div>

      {/* ✅ Ensures _id is included in form data */}
      <EditPdfModal
        isOpen={showEdit}
        onClose={() => setShowEdit(false)}
        initialData={{_id, title, year, pdfUrl, type, subjectName }}
      />

      <ConfirmDeleteModal
        isOpen={showDelete}
        onCancel={() => setShowDelete(false)}
        onConfirm={() => {
          setShowDelete(false);
        }}
        id={_id}
      />
    </div>
  );
}
