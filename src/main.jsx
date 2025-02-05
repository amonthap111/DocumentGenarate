// main.jsx
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import Doc from './doc';
import DocumentEnglih from './DocumentEnglih'
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />  {/* หน้าเริ่มต้น */}
      <Route path="/doc" element={<Doc />} />  {/* หน้า Doc.jsx */}
      <Route path="/DocumentEnglih" element={<DocumentEnglih />} /> 
    </Routes>
  </Router>
);
