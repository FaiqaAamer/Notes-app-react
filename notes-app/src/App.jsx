import { useState, useEffect } from "react";
// import Sidebar from "./components/layout/Sidebar";
// import Topbar from "./components/layout/Topbar";
// import NoteList from "./components/notes/NoteList";
import NoteEditor from './components/notes/NoteEditor'

function App() {

  return(<NoteEditor />)
  // const [isCollapsed, setIsCollapsed] = useState(false);

  // useEffect(() => {
  //   function handleResize() {
  //     if (window.innerWidth <= 480) {
  //       setIsCollapsed(true);
  //     }
  //   }
  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  // return (
    
  //   <>
  //     <Sidebar isCollapsed={isCollapsed} onToggle={() => setIsCollapsed(prev => !prev)} />
  //     <Topbar isCollapsed={isCollapsed} />
  //     <main className={`main-content ${isCollapsed ? "collapsed" : ""}`}>
  //       <NoteList></NoteList>
  //     </main>
  //   </>
  // );
}

export default App;