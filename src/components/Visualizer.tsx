import React, { useState, useEffect } from 'react';
import { Activity, Box, Circle, Hash, Clock, Database, Cpu } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const NetworkStat = ({ icon: Icon, title, value, gradient }) => (
  <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}>
    <div className="flex items-center">
      <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
        <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
      </div>
      <h3 className="ml-3 text-lg font-medium text-gray-900 dark:text-white">
        {title}
      </h3>
    </div>
    <p className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">
      {value}
    </p>
  </div>
);

const BlockCard = ({ block, index, totalBlocks }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {index > 0 && (
        <div className="absolute left-0 top-1/2 transform -translate-x-full -translate-y-1/2 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500" />
      )}
      <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-80 transition-all duration-300 transform ${isHovered ? '-translate-y-2 shadow-xl border-blue-500 dark:border-blue-400' : ''} border-2 border-transparent`}>
        <div className="flex items-center justify-between mb-4">
          <div className={`transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`}>
            <Hash className="h-8 w-8 text-blue-500" />
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {block.timestamp}
          </span>
        </div>
        <div className="space-y-4">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">Block</span>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              #{block.number}
            </p>
          </div>
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">Hash</span>
            <p className="text-sm text-gray-700 dark:text-gray-300 truncate font-mono">
              {block.hash}
            </p>
          </div>
          <div className="flex justify-between">
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">Transactions</span>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {block.transactions}
              </p>
            </div>
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">Size</span>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {block.size}
              </p>
            </div>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
            <div
              className="h-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
              style={{ width: `${((totalBlocks - index) / totalBlocks) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const NetworkChart = ({ data }) => (
  <div className="h-64">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
        <XAxis dataKey="name" stroke="#6B7280" />
        <YAxis stroke="#6B7280" />
        <Tooltip
          contentStyle={{
            backgroundColor: '#1F2937',
            border: 'none',
            borderRadius: '0.5rem',
            color: '#F3F4F6'
          }}
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#3B82F6"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

const AnimatedProgressBar = ({ value, color }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(value);
  }, [value]);

  return (
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
      <div
        className={`h-2 rounded-full transition-all duration-1000 ease-out ${color}`}
        style={{ width: `${width}%` }}
      />
    </div>
  );
};

const Visualizer = () => {
  const blocks = [
    {
      number: 12345678,
      hash: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
      transactions: 150,
      timestamp: '2024-03-10 14:30:25',
      size: '1.2 MB'
    },
    {
      number: 12345677,
      hash: '0x912d35Cc6634C0532925a3b844Bc454e4438f77b',
      transactions: 120,
      timestamp: '2024-03-10 14:29:15',
      size: '0.8 MB'
    },
    {
      number: 12345676,
      hash: '0x512d35Cc6634C0532925a3b844Bc454e4438f88c',
      transactions: 180,
      timestamp: '2024-03-10 14:28:05',
      size: '1.5 MB'
    }
  ];

  const networkData = [
    { name: '00:00', value: 65 },
    { name: '04:00', value: 75 },
    { name: '08:00', value: 85 },
    { name: '12:00', value: 70 },
    { name: '16:00', value: 90 },
    { name: '20:00', value: 80 },
    { name: '24:00', value: 85 }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Blockchain Visualizer
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Visualize the blockchain structure and understand how blocks are connected.
        </p>
      </div>

      <div className="relative">
        <div className="flex justify-start items-center space-x-8 overflow-x-auto py-8 px-4">
          {blocks.map((block, index) => (
            <BlockCard
              key={index}
              block={block}
              index={index}
              totalBlocks={blocks.length}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <NetworkStat
          icon={Activity}
          title="Network Hashrate"
          value="180 EH/s"
        />
        <NetworkStat
          icon={Circle}
          title="Active Nodes"
          value="10,234"
        />
        <NetworkStat
          icon={Clock}
          title="Block Time"
          value="10 min"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Network Activity
          </h3>
          <NetworkChart data={networkData} />
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Network Security
          </h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600 dark:text-gray-300">Difficulty</span>
                <span className="text-gray-900 dark:text-white font-medium">49.55 T</span>
              </div>
              <AnimatedProgressBar value={85} color="bg-gradient-to-r from-green-500 to-green-600" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600 dark:text-gray-300">Network Health</span>
                <span className="text-gray-900 dark:text-white font-medium">95%</span>
              </div>
              <AnimatedProgressBar value={95} color="bg-gradient-to-r from-blue-500 to-blue-600" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600 dark:text-gray-300">Node Distribution</span>
                <span className="text-gray-900 dark:text-white font-medium">78%</span>
              </div>
              <AnimatedProgressBar value={78} color="bg-gradient-to-r from-purple-500 to-purple-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Visualizer;