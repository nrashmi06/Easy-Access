// components/layout/Sidebar.jsx
import subjects from "./data/subjects";

export default function Sidebar({ closeDrawer }) {
  return (
    <div className="drawer-side z-40">
      <label
        htmlFor="sidebar-drawer"
        className="drawer-overlay"
        onClick={closeDrawer}
      ></label>

      <aside className="menu p-0 w-72 bg-base-100 text-base-content h-screen shadow-xl border-r border-base-300">
        {/* Header */}
        <div className="sticky top-0 bg-base-100 z-10 ">
          <div className="flex items-center justify-between p-4">
            <h2 className="font-bold text-xl text-primary">Subjects</h2>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto ">
          <ul className="menu-vertical p-2 space-y-1 w-full">
            {subjects.map((subject) => (
              <li key={subject}>
                <a
                  href={`#${subject.toLowerCase().replace(/\s/g, "-")}`}
                  className="flex items-center gap-3 p-3 rounded-lg capitalize text-sm font-medium 
                           hover:bg-primary/10 hover:text-primary hover:border-l-4 hover:border-primary
                           transition-all duration-200 group active:scale-95"
                  onClick={closeDrawer}
                >
                  {/* Subject Icon */}
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 
                                flex items-center justify-center text-primary group-hover:scale-110 
                                transition-transform duration-200">
                    <span className="text-xs font-bold">
                      {subject.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  
                  {/* Subject Name */}
                  <span className="flex-1 group-hover:translate-x-1 transition-transform duration-200">
                    {subject}
                  </span>
                  
                  {/* Arrow Icon */}
                  <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" 
                       fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}