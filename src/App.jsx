import Content from "./Components/Content";
import Header from "./Components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//pages
import Certificate from "./pages/Certificate";
import Dashboard from "./pages/Dashboard";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="certificate" element={<Certificate />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
