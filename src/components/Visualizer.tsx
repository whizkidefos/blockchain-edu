import React, { useState, useEffect, useRef } from 'react';
import { Activity, Box, Circle, Hash, Clock, Database, Cpu, Shield, Globe, Server, Zap, ArrowRight, Link as LinkIcon } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const NetworkStat = ({ icon: Icon, title, value, change }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden group">
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
          <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        </div>
        <h3 className="ml-3 text-lg font-medium text-gray-900 dark:text-white">
          {title}
        </h3>
      </div>
      {change && (
        <span className={`text-sm font-medium ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {change >= 0 ? '↑' : '↓'} {Math.abs(change)}%
        </span>
      )}
    </div>
    <p className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">
      {value}
    </p>
  </div>
);

const BlockCard = ({ block, isLatest }) => (
  <div className={`block-card bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 relative ${isLatest ? 'pulse-glow border-2 border-blue-500/50' : ''
    }`}>
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />

    {/* Block Header */}
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center space-x-3">
        <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20">
          <Hash className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        </div>
        <span className="text-lg font-semibold text-gray-900 dark:text-white">
          #{block.number.toLocaleString()}
        </span>
      </div>
      <span className="text-sm text-gray-500 dark:text-gray-400">
        {block.timestamp}
      </span>
    </div>

    {/* Block Details */}
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
          <div className="text-sm text-gray-500 dark:text-gray-400">Transactions</div>
          <div className="text-lg font-semibold text-gray-900 dark:text-white">{block.transactions}</div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
          <div className="text-sm text-gray-500 dark:text-gray-400">Size</div>
          <div className="text-lg font-semibold text-gray-900 dark:text-white">{block.size}</div>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
        <div className="flex items-center justify-between mb-1">
          <div className="text-sm text-gray-500 dark:text-gray-400">Gas Used</div>
          <div className="text-sm font-medium text-gray-900 dark:text-white">{block.gasUsed}</div>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-1.5">
          <div
            className="h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
            style={{ width: `${(parseInt(block.gasUsed.replace(/,/g, '')) / 15000000) * 100}%` }}
          />
        </div>
      </div>

      <div className="pt-2">
        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-1">
          <LinkIcon className="h-4 w-4" />
          <span>Block Hash</span>
        </div>
        <div className="text-sm font-mono text-gray-700 dark:text-gray-300 truncate bg-gray-50 dark:bg-gray-700/50 rounded p-2">
          {block.hash}
        </div>
      </div>
    </div>
  </div>
);

const NetworkMetrics = ({ data }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Network Activity</h3>
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <defs>
            <linearGradient id="networkGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
          <XAxis dataKey="time" stroke="#6B7280" />
          <YAxis stroke="#6B7280" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1F2937',
              border: 'none',
              borderRadius: '0.5rem',
              color: '#F3F4F6'
            }}
          />
          <Area
            type="monotone"
            dataKey="tps"
            stroke="#3B82F6"
            fill="url(#networkGradient)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </div>
);

const NetworkStatus = ({ metrics }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Network Health</h3>
    <div className="space-y-6">
      {metrics.map((metric, index) => (
        <div key={index}>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600 dark:text-gray-300">{metric.label}</span>
            <span className="text-gray-900 dark:text-white font-medium">{metric.value}</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-1000 ease-out ${metric.color}`}
              style={{ width: `${metric.percentage}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const Visualizer = () => {
  const [blocks, setBlocks] = useState([]);
  const [networkData, setNetworkData] = useState([]);

  useEffect(() => {
    const generateBlock = () => ({
      number: 12345678 + Math.floor(Math.random() * 100),
      hash: '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
      transactions: Math.floor(Math.random() * 200 + 100),
      timestamp: new Date().toLocaleTimeString(),
      size: (Math.random() * 2 + 0.5).toFixed(1) + ' MB',
      gasUsed: Math.floor(Math.random() * 8000000 + 2000000).toLocaleString() + ' gas'
    });

    setBlocks(Array.from({ length: 6 }, generateBlock));

    const interval = setInterval(() => {
      setBlocks(prev => [generateBlock(), ...prev.slice(0, -1)]);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const generateNetworkData = () => {
      const now = new Date();
      return Array.from({ length: 12 }, (_, i) => ({
        time: new Date(now.getTime() - (11 - i) * 5000).toLocaleTimeString(),
        tps: Math.floor(Math.random() * 50 + 150)
      }));
    };

    setNetworkData(generateNetworkData());

    const interval = setInterval(() => {
      setNetworkData(prev => [
        ...prev.slice(1),
        {
          time: new Date().toLocaleTimeString(),
          tps: Math.floor(Math.random() * 50 + 150)
        }
      ]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const networkMetrics = [
    {
      label: 'Network Security',
      value: '98%',
      percentage: 98,
      color: 'bg-gradient-to-r from-green-500 to-green-600'
    },
    {
      label: 'Node Distribution',
      value: '85%',
      percentage: 85,
      color: 'bg-gradient-to-r from-blue-500 to-blue-600'
    },
    {
      label: 'Consensus Health',
      value: '92%',
      percentage: 92,
      color: 'bg-gradient-to-r from-purple-500 to-purple-600'
    }
  ];

  const stats = [
    {
      icon: Zap,
      title: 'TPS',
      value: '186',
      change: 5.2
    },
    {
      icon: Server,
      title: 'Active Nodes',
      value: '12,458',
      change: 2.8
    },
    {
      icon: Shield,
      title: 'Network Security',
      value: '98.2%',
      change: 0.5
    },
    {
      icon: Globe,
      title: 'Global Distribution',
      value: '32 Countries',
      change: 1.2
    }
  ];

  return (
    <div className="section-spacing">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Blockchain Visualizer
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Real-time visualization of blockchain network activity and block creation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, index) => (
          <NetworkStat key={index} {...stat} />
        ))}
      </div>

      <div className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8 text-center">
          Latest Blocks
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blocks.map((block, index) => (
            <BlockCard key={block.hash} block={block} isLatest={index === 0} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <NetworkMetrics data={networkData} />
        <NetworkStatus metrics={networkMetrics} />
      </div>
    </div>
  );
};

export default Visualizer;