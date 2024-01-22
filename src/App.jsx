import Content from "./Components/Content";
// import Header from "./Components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//pages
import Certificate from "./pages/Certificate";
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing ";
import CertificateView from "./pages/CertificateView";
import View from "./Components/View";
import Verification from "./Components/Verification";
import HeaderV2 from "./Components/HeaderV2";

function App() {
  return (
    <>
      {/* <HeaderV2 /> */}
      <BrowserRouter>
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="/certificate" element={<Content />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/viewCert" element={<View />} />
          <Route path="/verification" element={<Verification />} />
          {/* <Route path="/profile" element={<Verification />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
