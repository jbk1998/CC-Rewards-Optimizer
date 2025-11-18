
import React from 'react';
import Header from './components/Header';
import PredictionSimulator from './components/PredictionSimulator';
import DashboardMetrics from './components/DashboardMetrics';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 font-sans">
      <Header />
      <main className="p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <PredictionSimulator />
          </div>
          <div>
            <DashboardMetrics />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
