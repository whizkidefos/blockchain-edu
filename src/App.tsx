import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Moon, Sun, Menu, X, BookOpen, LineChart, Search, Activity, ExternalLink } from 'lucide-react';
import Education from './components/Education';
import Explorer from './components/Explorer';
import Portfolio from './components/Portfolio';
import Visualizer from './components/Visualizer';
import PriceTicker from './components/PriceTicker';
import Footer from './components/Footer';
import BottomControls from './components/BottomControls';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <BrowserRouter>
      <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
          <PriceTicker />
          
          {/* Navigation */}
          <nav className="bg-white dark:bg-gray-800 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex items-center">
                  <Link to="/" className="flex items-center space-x-2">
                    <Activity className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                    <span className="text-xl font-bold text-gray-900 dark:text-white">BlockchainEdu</span>
                  </Link>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-8">
                  <Link to="/education" className="flex items-center space-x-1 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400">
                    <BookOpen className="h-5 w-5" />
                    <span>Learn</span>
                  </Link>
                  <Link to="/explorer" className="flex items-center space-x-1 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400">
                    <Search className="h-5 w-5" />
                    <span>Explorer</span>
                  </Link>
                  <Link to="/portfolio" className="flex items-center space-x-1 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400">
                    <LineChart className="h-5 w-5" />
                    <span>Portfolio</span>
                  </Link>
                  <Link to="/visualizer" className="flex items-center space-x-1 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400">
                    <Activity className="h-5 w-5" />
                    <span>Visualizer</span>
                  </Link>
                  <a
                    href="https://ethereum.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <span>Learn More</span>
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                  <button
                    onClick={toggleDarkMode}
                    className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    {darkMode ? <Sun className="h-5 w-5 text-yellow-500" /> : <Moon className="h-5 w-5 text-gray-500" />}
                  </button>
                </div>

                {/* Mobile menu button */}
                <div className="md:hidden flex items-center">
                  <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="p-2 rounded-md text-gray-700 dark:text-gray-200"
                  >
                    {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile menu */}
            {menuOpen && (
              <div className="md:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1">
                  <Link
                    to="/education"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setMenuOpen(false)}
                  >
                    Learn
                  </Link>
                  <Link
                    to="/explorer"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setMenuOpen(false)}
                  >
                    Explorer
                  </Link>
                  <Link
                    to="/portfolio"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setMenuOpen(false)}
                  >
                    Portfolio
                  </Link>
                  <Link
                    to="/visualizer"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setMenuOpen(false)}
                  >
                    Visualizer
                  </Link>
                </div>
              </div>
            )}
          </nav>

          {/* Main Content */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Routes>
              <Route path="/" element={<Education />} />
              <Route path="/education" element={<Education />} />
              <Route path="/explorer" element={<Explorer />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/visualizer" element={<Visualizer />} />
            </Routes>
          </main>

          <Footer />
          <BottomControls />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;