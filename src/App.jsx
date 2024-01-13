import Content from "./Components/Content";
import Header from "./Components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//pages
import Certificate from "./pages/Certificate";
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing ";
import CertificateView from "./pages/CertificateView";
function App() {
  
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="certificate" element={<Certificate/>}/>
        <Route path="landing" element={<Landing/>} />
        <Route path="viewCert" element={<CertificateView/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
