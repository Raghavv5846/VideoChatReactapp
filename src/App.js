import "./App.css";

// import Home from "./pages/Main";
import Room from "./pages/Room";
import Main from "./pages/Main";
import { BrowserRouter as Router, Route, Routes, } from "react-router-dom";

function App() {
  return (  
      <Router>
      <Routes>
        <Route exact path="/" element={<Main/>} />
        <Route exact path="/room/:roomId" element={<Room />} />
      </Routes>
        </Router>

  );
}

export default App;