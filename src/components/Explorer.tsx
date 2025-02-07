import React, { useState, useEffect } from 'react';
import { Search, ArrowRight, ExternalLink, ArrowUpRight, ArrowDownRight, Filter, Clock } from 'lucide-react';

const SearchBar = ({ value, onChange }) => (
  <div className="relative max-w-3xl mx-auto">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <Search className="h-5 w-5 text-gray-400" />
    </div>
    <input
      type="text"
      placeholder="Search by address, transaction hash, or block number"
      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg transition-shadow duration-300 hover:shadow-xl"
      value={value}
      onChange={onChange}
    />
  </div>
);

const StatCard = ({ title, value, change, icon: Icon }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
          <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        </div>
        <h3 className="ml-3 text-lg font-medium text-gray-900 dark:text-white">
          {title}
        </h3>
      </div>
      <span className={`flex items-center ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
        {change >= 0 ? <ArrowUpRight className="h-4 w-4 mr-1" /> : <ArrowDownRight className="h-4 w-4 mr-1" />}
        {Math.abs(change)}%
      </span>
    </div>
    <p className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">
      {value}
    </p>
  </div>
);

const TransactionRow = ({ tx, index }) => (
  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200">
          {tx.hash.slice(0, 8)}...{tx.hash.slice(-6)}
        </span>
        <ExternalLink className="h-4 w-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
      </div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
        {tx.from.slice(0, 6)}...{tx.from.slice(-4)}
      </div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
        {tx.to.slice(0, 6)}...{tx.to.slice(-4)}
      </div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="text-sm font-medium text-gray-900 dark:text-white">
        {tx.value} ETH
      </div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
      {tx.timestamp}
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
        tx.status === 'Success' 
          ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'
      }`}>
        {tx.status}
      </span>
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
      {tx.gasUsed}
    </td>
  </tr>
);

const generateMockTransactions = (count) => {
  const now = new Date();
  const threeMonthsAgo = new Date(now.getTime() - (90 * 24 * 60 * 60 * 1000));
  
  return Array(count).fill(null).map(() => {
    const timestamp = new Date(
      threeMonthsAgo.getTime() + Math.random() * (now.getTime() - threeMonthsAgo.getTime())
    );
    
    return {
      hash: '0x' + Math.random().toString(16).slice(2, 42),
      from: '0x' + Math.random().toString(16).slice(2, 42),
      to: '0x' + Math.random().toString(16).slice(2, 42),
      value: (Math.random() * 10).toFixed(4),
      timestamp: timestamp.toLocaleString(),
      status: Math.random() > 0.1 ? 'Success' : 'Pending',
      gasUsed: Math.floor(Math.random() * 1000000) + ' gas'
    };
  });
};

const Explorer = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [transactions, setTransactions] = useState([]);
  
  useEffect(() => {
    setTransactions(generateMockTransactions(20));
    
    const interval = setInterval(() => {
      setTransactions(prev => [generateMockTransactions(1)[0], ...prev.slice(0, -1)]);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const stats = [
    {
      title: 'Transactions (24h)',
      value: '1.2M',
      change: 5.2,
      icon: ArrowRight
    },
    {
      title: 'Average Gas',
      value: '25 Gwei',
      change: -2.8,
      icon: Clock
    },
    {
      title: 'Network Load',
      value: '85%',
      change: 3.1,
      icon: Filter
    }
  ];

  return (
    <div className="space-y-24">
      <div className="text-center max-w-4xl mx-auto pt-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">
          Blockchain Explorer
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
          Search and explore blockchain transactions, addresses, and smart contracts in real-time.
        </p>
        <SearchBar value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Recent Transactions
            </h2>
            <button className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200">
              <span>View All</span>
              <ArrowRight className="h-4 w-4 ml-1" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Transaction Hash
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    From
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    To
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Value
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Timestamp
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Gas Used
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {transactions.map((tx, index) => (
                  <TransactionRow key={tx.hash} tx={tx} index={index} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explorer;