
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import CourseDiscovery from './pages/CourseDiscovery';
import LiveRound from './pages/LiveRound';
import Stats from './pages/Stats';
import ProDashboard from './pages/ProDashboard';
import Membership from './pages/Membership';
import MediaCenter from './pages/MediaCenter';
import Consultation from './pages/Consultation';
import ConsultationChat from './pages/ConsultationChat';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/courses" element={<CourseDiscovery />} />
          <Route path="/new-round" element={<LiveRound />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/pro" element={<ProDashboard />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/media" element={<MediaCenter />} />
          <Route path="/consult" element={<Consultation />} />
          <Route path="/chat" element={<ConsultationChat />} />
          <Route path="/profile" element={
            <div className="py-20 text-center space-y-6">
              <div className="w-24 h-24 rounded-full bg-slate-200 mx-auto flex items-center justify-center text-3xl font-bold">AR</div>
              <h2 className="text-3xl font-serif font-bold">Alex Rivera</h2>
              <p className="text-slate-500 max-w-md mx-auto">PGA Master Professional based in Seoul. Specializing in biomechanical swing optimization.</p>
            </div>
          } />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
