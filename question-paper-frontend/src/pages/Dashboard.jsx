import { useState, useEffect } from "react";
import { useSubject } from "../contexts/SubjectContext";
import SidebarLayout from "../components/SidebarLayout";
import PdfCard from "../components/PdfCard";
import { getQpBySubjectController } from "../controllers/qp/getQpBySubjectController";
import { useSelector } from "react-redux";
import ChatBot from "../components/ChatBot";

export default function Dashboard({ setSelectedSubject }) {
  const [activeTab, setActiveTab] = useState("mse");
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [pdfs, setPdfs] = useState({ mse: [], see: [], mcq: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const selectedSubject = useSubject();

  const tabs = [
    { key: "mse", label: "MSE" },
    { key: "see", label: "SEE" },
    { key: "mcq", label: "MCQ" },
  ];

  useEffect(() => {
    console.log("Selected Subject:", selectedSubject);
    if (!selectedSubject?.subjectId) return;

    const fetchPdfs = async () => {
      setLoading(true);
      setError("");

      try {
        const data = { subjectId: selectedSubject.subjectId };
        const response = await getQpBySubjectController(data, accessToken);

        if (Array.isArray(response.data)) {
          // Group PDFs by type
          const grouped = { mse: [], see: [], mcq: [] };

          response.data.forEach((pdf) => {
            const typeKey = pdf.type?.toLowerCase(); // e.g., "mse", "see", "mcq"
            if (grouped[typeKey]) {
              grouped[typeKey].push(pdf);
            }
          });

          setPdfs(grouped);
        } else {
          throw new Error("Unexpected response format");
        }
      } catch (err) {
        console.error("Failed to fetch PDFs:", err);
        setError("Failed to load question papers.");
        setPdfs({ mse: [], see: [], mcq: [] });
      } finally {
        setLoading(false);
      }
    };

    fetchPdfs();
  }, [selectedSubject]);

  return (
    <SidebarLayout setSelectedSubject={setSelectedSubject}>
      <>
        {/* Show message when no subject is selected */}
        {!selectedSubject ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="text-gray-400 text-6xl mb-4">📚</div>
              <h2 className="text-xl font-semibold text-gray-600 mb-2">
                No Subject Selected
              </h2>
              <p className="text-gray-500">
                Please choose a subject from the sidebar to view question papers
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Tabs */}
            <div className="flex justify-center mb-6">
              <div className="tabs tabs-boxed bg-base-200 p-1 rounded-xl shadow-md">
                {tabs.map((tab) => (
                  <a
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`tab tab-bordered font-semibold px-5 py-2 rounded-lg
                      ${activeTab === tab.key
                        ? "tab-active bg-primary text-white shadow-inner"
                        : "hover:bg-primary/10 hover:text-primary text-base-content"
                      }`}
                  >
                    {tab.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Subject Info */}
            <div className="mb-4 text-center text-sm text-gray-500">
              Showing PDFs for: <strong>{selectedSubject.name}</strong>
            </div>

            {/* Error */}
            {error && <div className="text-red-500 text-center mb-4">{error}</div>}

            {/* PDFs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
              {loading ? (
                <p className="text-center col-span-full"><span class="loading loading-spinner text-error"></span></p>
              ) : pdfs[activeTab]?.length > 0 ? (
                pdfs[activeTab].map((pdf) => (
                  <PdfCard
                    key={pdf.id}
                    _id={pdf.id}
                    title={pdf.title}
                    year={pdf.year}
                    pdfUrl={pdf.pdfUrl}
                    type={pdf.type}
                    subjectName={pdf.subject.name}
                  />
                ))
              ) : (
                <p className="text-center col-span-full text-gray-500">
                  No PDFs found for {activeTab.toUpperCase()}
                </p>
              )}
            </div>
          </>
        )}

        {/* 🔽 Floating ChatBot */}
        <ChatBot />
      </>
    </SidebarLayout>
  );
};