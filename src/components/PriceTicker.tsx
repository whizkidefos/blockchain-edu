import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const PriceTicker = () => {
  const prices = [
    { name: 'Bitcoin', symbol: 'BTC', price: 65432.10, change: 2.5 },
    { name: 'Ethereum', symbol: 'ETH', price: 3456.78, change: -1.2 },
    { name: 'Solana', symbol: 'SOL', price: 123.45, change: 5.7 },
    { name: 'Cardano', symbol: 'ADA', price: 1.23, change: 3.4 },
    { name: 'Polkadot', symbol: 'DOT', price: 21.87, change: -0.8 }
  ];

  return (
    <div className="bg-gray-900 text-white overflow-hidden">
      <div className="animate-ticker flex whitespace-nowrap py-2">
        {[...prices, ...prices].map((coin, index) => (
          <div key={index} className="flex items-center mx-6">
            <span className="font-medium">{coin.symbol}</span>
            <span className="mx-2">${coin.price.toLocaleString()}</span>
            <div className={`flex items-center ${coin.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {coin.change >= 0 ? (
                <TrendingUp className="h-4 w-4 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 mr-1" />
              )}
              <span>{Math.abs(coin.change)}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PriceTicker;