import React, { useState } from 'react';
import { Wallet, TrendingUp, ArrowUpRight, ArrowDownRight, DollarSign, Percent, BarChart3 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const StatCard = ({ icon: Icon, title, value, textColor = 'text-gray-900 dark:text-white', bgGradient }) => (
  <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}>
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
          <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        </div>
        <h3 className="ml-3 text-lg font-medium text-gray-900 dark:text-white">
          {title}
        </h3>
      </div>
    </div>
    <p className={`mt-4 text-3xl font-bold ${textColor}`}>
      {value}
    </p>
  </div>
);

const AssetRow = ({ asset }) => (
  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="flex items-center">
        <div className="ml-4">
          <div className="text-sm font-medium text-gray-900 dark:text-white">
            {asset.name}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {asset.symbol}
          </div>
        </div>
      </div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="text-sm text-gray-900 dark:text-white font-medium">
        {asset.balance} {asset.symbol}
      </div>
      <div className="text-sm text-gray-500 dark:text-gray-400">
        ${(asset.balance * asset.price).toLocaleString()}
      </div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="text-sm font-medium text-gray-900 dark:text-white">
        ${asset.price.toLocaleString()}
      </div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className={`flex items-center text-sm ${asset.positive ? 'text-green-600' : 'text-red-600'}`}>
        {asset.positive ? <ArrowUpRight className="h-4 w-4 mr-1" /> : <ArrowDownRight className="h-4 w-4 mr-1" />}
        {Math.abs(asset.change)}%
      </div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
        <div
          className={`h-2.5 rounded-full ${asset.positive ? 'bg-green-600' : 'bg-red-600'}`}
          style={{ width: `${Math.abs(asset.allocation)}%` }}
        ></div>
      </div>
      <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
        {asset.allocation}% of portfolio
      </div>
    </td>
  </tr>
);

const PortfolioChart = ({ data }) => (
  <div className="h-80 w-full">
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
        <XAxis dataKey="date" stroke="#6B7280" />
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
          dataKey="value"
          stroke="#3B82F6"
          fillOpacity={1}
          fill="url(#portfolioGradient)"
        />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

const AllocationPieChart = ({ assets }) => {
  const COLORS = ['#3B82F6', '#10B981', '#6366F1', '#F59E0B'];
  
  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={assets}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {assets.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

const Portfolio = () => {
  const assets = [
    {
      name: 'Bitcoin',
      symbol: 'BTC',
      balance: '0.5',
      price: 50000,
      change: 2.5,
      positive: true,
      allocation: 45,
      value: 25000
    },
    {
      name: 'Ethereum',
      symbol: 'ETH',
      balance: '2.0',
      price: 2000,
      change: -1.2,
      positive: false,
      allocation: 35,
      value: 4000
    },
    {
      name: 'Solana',
      symbol: 'SOL',
      balance: '15.0',
      price: 100,
      change: 5.7,
      positive: true,
      allocation: 20,
      value: 1500
    }
  ];

  const portfolioHistory = [
    { date: 'Jan', value: 25000 },
    { date: 'Feb', value: 28000 },
    { date: 'Mar', value: 26000 },
    { date: 'Apr', value: 32000 },
    { date: 'May', value: 30000 },
    { date: 'Jun', value: 35000 }
  ];

  const totalValue = assets.reduce((acc, asset) => acc + (asset.balance * asset.price), 0);
  const totalChange = 5.2;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Portfolio Tracker
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Track and manage your cryptocurrency portfolio in one place.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          icon={DollarSign}
          title="Total Balance"
          value={`$${totalValue.toLocaleString()}`}
        />
        <StatCard
          icon={Percent}
          title="24h Change"
          value={`${totalChange > 0 ? '+' : ''}${totalChange}%`}
          textColor={totalChange > 0 ? 'text-green-600' : 'text-red-600'}
        />
        <StatCard
          icon={BarChart3}
          title="Assets"
          value={assets.length}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Portfolio Performance
          </h2>
          <PortfolioChart data={portfolioHistory} />
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Asset Allocation
          </h2>
          <AllocationPieChart assets={assets} />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          Your Assets
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Asset
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Holdings
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  24h Change
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Allocation
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {assets.map((asset, index) => (
                <AssetRow key={index} asset={asset} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;