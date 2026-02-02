
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import PdfTool from './pages/PdfTool';
import PdfGallery from './pages/PdfGallery';
import AITool from './pages/AITool';
import CVAnalyzer from './pages/CVAnalyzer';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/pdf" element={<PdfGallery />} />
          <Route path="/pdf/:action" element={<PdfTool />} />
          <Route path="/video-gen" element={<AITool type="video" />} />
          <Route path="/hashtags" element={<AITool type="hashtags" />} />
          <Route path="/code-writer" element={<AITool type="code" />} />
          <Route path="/cv-analyzer" element={<CVAnalyzer />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
