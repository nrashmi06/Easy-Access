import { useState } from "react";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";

export default function SidebarLayout({ children , setSelectedSubject }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => setDrawerOpen((prev) => !prev);
  const closeDrawer = () => setDrawerOpen(false);

  const handleSubjectClick = (id, name) => {
    setSelectedSubject({ subjectId: id, name }); 
    console.log("Selected Subject:", { subjectId: id, name });
  };


  return (
      <div className="drawer lg:drawer-open w-screen">
        <input
          id="sidebar-drawer"
          type="checkbox"
          className="drawer-toggle"
          checked={drawerOpen}
          readOnly
        />
        <div className="drawer-content flex flex-col">
          <Topbar drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />
          <main className="p-4">{children}</main>
        </div>
        <Sidebar closeDrawer={closeDrawer} onSubjectClick={handleSubjectClick} />
      </div>
  );
}
