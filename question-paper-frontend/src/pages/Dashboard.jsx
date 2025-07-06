import { useState } from "react";
import SidebarLayout from "../components/SidebarLayout";
import PdfCard from "../components/PdfCard"; // Make sure you’ve created this component

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("mse");

  const tabs = [
    { key: "mse", label: "MSE" },
    { key: "see", label: "SEE" },
    { key: "mcq", label: "MCQ" },
  ];

  const samplePdfs = {
    mse: [
      { title: "Mathematics - MSE I", year: "2023", pdfUrl: "/pdfs/math-mse-1-2023.pdf" },
      { title: "Physics - MSE I", year: "2022", pdfUrl: "/pdfs/physics-mse-1-2022.pdf" },
      { title: "Mathematics - MSE I", year: "2023", pdfUrl: "/pdfs/math-mse-1-2023.pdf" },
      { title: "Physics - MSE I", year: "2022", pdfUrl: "/pdfs/physics-mse-1-2022.pdf" },
      { title: "Mathematics - MSE I", year: "2023", pdfUrl: "/pdfs/math-mse-1-2023.pdf" },
      { title: "Physics - MSE I", year: "2022", pdfUrl: "/pdfs/physics-mse-1-2022.pdf" },
    ],
    see: [
      { title: "Computer Science - SEE", year: "2023", pdfUrl: "/pdfs/cs-see-2023.pdf" },
      { title: "Chemistry - SEE", year: "2022", pdfUrl: "/pdfs/chem-see-2022.pdf" },
      { title: "Computer Science - SEE", year: "2023", pdfUrl: "/pdfs/cs-see-2023.pdf" },
      { title: "Chemistry - SEE", year: "2022", pdfUrl: "/pdfs/chem-see-2022.pdf" },
      { title: "Computer Science - SEE", year: "2023", pdfUrl: "/pdfs/cs-see-2023.pdf" },
      { title: "Chemistry - SEE", year: "2022", pdfUrl: "/pdfs/chem-see-2022.pdf" },
    ],
    mcq: [
      { title: "Biology - MCQ Set 1", year: "2023", pdfUrl: "/pdfs/bio-mcq-2023.pdf" },
      { title: "History - MCQ Set A", year: "2022", pdfUrl: "/pdfs/history-mcq-a-2022.pdf" },
      { title: "Biology - MCQ Set 1", year: "2023", pdfUrl: "/pdfs/bio-mcq-2023.pdf" },
      { title: "History - MCQ Set A", year: "2022", pdfUrl: "/pdfs/history-mcq-a-2022.pdf" },
      { title: "Biology - MCQ Set 1", year: "2023", pdfUrl: "/pdfs/bio-mcq-2023.pdf" },
      { title: "History - MCQ Set A", year: "2022", pdfUrl: "/pdfs/history-mcq-a-2022.pdf" },
    ],
  };

  return (
    <SidebarLayout>
      {/* Tabs */}
      <div className="flex justify-center mb-6">
        <div className="tabs tabs-boxed">
          {tabs.map((tab) => (
            <a
              key={tab.key}
              className={`tab ${activeTab === tab.key ? "tab-active" : ""}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </a>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
        {samplePdfs[activeTab].map((pdf) => (
          <PdfCard
            key={pdf.pdfUrl}
            title={pdf.title}
            year={pdf.year}
            pdfUrl={pdf.pdfUrl}
          />
        ))}
      </div>
    </SidebarLayout>
  );
}
