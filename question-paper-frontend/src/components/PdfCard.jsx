export default function PdfCard({ title, year, pdfUrl }) {
  return (
    <div className="group relative  rounded-xl shadow-sm border border-yellow-200 hover:shadow-lg hover:border-yellow-300 transition-all duration-300 overflow-hidden w-full max-w-sm">
      {/* Lemon accent header */}
      <div className="h-1 bg-gradient-to-r from-yellow-400 to-lime-500"></div>
      
      {/* PDF Preview Area */}
      <div className="relative h-40 bg-gray-50 border-b border-yellow-100 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-20  rounded-lg shadow-sm border border-gray-200 mx-auto mb-3 flex items-center justify-center relative">
              <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
              </svg>
              <div className="absolute -bottom-1 -right-1 bg-red-500 text-white text-xs px-1 py-0.5 rounded text-[10px] font-bold">
                PDF
              </div>
            </div>
            <p className="text-xs text-gray-500 font-medium">Click to preview</p>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-3 right-3 w-6 h-6 bg-yellow-100 rounded-full opacity-60"></div>
        <div className="absolute bottom-3 left-3 w-4 h-4 bg-lime-100 rounded-full opacity-40"></div>
      </div>
      
      {/* Card content */}
      <div className="p-5">
        {/* Title and Year */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-base leading-tight mb-2 group-hover:text-yellow-700 transition-colors line-clamp-2">
            {title}
          </h3>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
            <p className="text-sm text-gray-600 font-medium">
              Published {year}
            </p>
          </div>
        </div>
        
        {/* Action button */}
        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-yellow-500 to-lime-500 text-white text-sm font-medium rounded-lg hover:from-yellow-600 hover:to-lime-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <svg 
            className="w-4 h-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          View PDF
        </a>
      </div>
      
      {/* Subtle lemon-themed hover effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/0 to-lime-50/0 group-hover:from-yellow-50/20 group-hover:to-lime-50/10 transition-all duration-300 pointer-events-none"></div>
    </div>
  );
}