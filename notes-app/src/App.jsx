import { useState } from "react";
import Sidebar from "./components/layout/Sidebar";
import Topbar from "./components/layout/Topbar";

function App() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      <Sidebar isCollapsed={isCollapsed} onToggle={() => setIsCollapsed(prev => !prev)} />
      <Topbar isCollapsed={isCollapsed} />
      <main className={`main-content ${isCollapsed ? "collapsed" : ""}`}>
        {/* NoteList / NoteEditor go here later */}
      </main>
    </>
  );
}

export default App;