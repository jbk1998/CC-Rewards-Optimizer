
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { MOCK_METRICS_DATA } from '../constants';

const DashboardMetrics: React.FC = () => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6 space-y-8">
      <div>
        <h3 className="text-lg font-bold text-white mb-4">MCC Group Accuracy (Top-1)</h3>
        <div style={{ width: '100%', height: 250 }}>
          <ResponsiveContainer>
            <LineChart data={MOCK_METRICS_DATA.accuracy} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
              <XAxis dataKey="name" stroke="#A0AEC0" />
              <YAxis unit="%" stroke="#A0AEC0" />
              <Tooltip
                contentStyle={{ backgroundColor: '#2D3748', border: '1px solid #4A5568' }}
                labelStyle={{ color: '#E2E8F0' }}
              />
              <Legend />
              <Line type="monotone" dataKey="value" name="Accuracy" stroke="#4299E1" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-bold text-white mb-4">Reward Lift (Cents per Dollar)</h3>
         <div style={{ width: '100%', height: 250 }}>
            <ResponsiveContainer>
                <BarChart data={MOCK_METRICS_DATA.rewardLift} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
                    <XAxis type="number" stroke="#A0AEC0" />
                    <YAxis dataKey="name" type="category" stroke="#A0AEC0" width={60} />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#2D3748', border: '1px solid #4A5568' }}
                        labelStyle={{ color: '#E2E8F0' }}
                        formatter={(value: number) => [`${value.toFixed(2)}¢`, 'Reward Lift']}
                     />
                    <Legend />
                    <Bar dataKey="value" name="Reward Lift" fill="#38B2AC" />
                </BarChart>
            </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardMetrics;
