import React from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen, Code, Cpu, Database, ArrowRight, Blocks, Brain, Wallet,
  Network, Users, Award, Sparkles, Terminal, Globe, Shield, Lightbulb
} from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, lessons, linkTo }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700">
    <div className="flex items-center mb-6">
      <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
        <Icon className="h-7 w-7 text-blue-600 dark:text-blue-400" />
      </div>
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white ml-4">
        {title}
      </h2>
    </div>
    <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg leading-relaxed">
      {description}
    </p>
    <ul className="space-y-3 mb-8">
      {lessons.map((lesson, lessonIndex) => (
        <li
          key={lessonIndex}
          className="flex items-center text-gray-700 dark:text-gray-300"
        >
          <span className="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full mr-3"></span>
          {lesson}
        </li>
      ))}
    </ul>
    <Link
      to={linkTo}
      className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors duration-200 group"
    >
      <span>Start Learning</span>
      <ArrowRight className="h-5 w-5 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
    </Link>
  </div>
);

const StatCard = ({ icon: Icon, title, value }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
    <div className="flex items-center space-x-4">
      <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
        <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
      </div>
      <div>
        <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
        <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{value}</p>
      </div>
    </div>
  </div>
);

const BenefitCard = ({ icon: Icon, title, description }) => (
  <div className="flex items-start space-x-4">
    <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 mt-1">
      <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
    </div>
    <div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
        {description}
      </p>
    </div>
  </div>
);

const InteractiveDemo = () => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300">
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="p-4 inline-block rounded-full bg-blue-50 dark:bg-blue-900/20 mb-4">
          <Terminal className="h-8 w-8 text-blue-600 dark:text-blue-400" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Interactive Learning Environment
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Practice what you learn in our secure, browser-based blockchain development environment.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-6 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
          <Globe className="h-8 w-8 text-blue-600 dark:text-blue-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Live Testing
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Test your smart contracts on our simulated blockchain network.
          </p>
        </div>

        <div className="p-6 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
          <Shield className="h-8 w-8 text-blue-600 dark:text-blue-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Security Analysis
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Get real-time feedback on your code's security and best practices.
          </p>
        </div>

        <div className="p-6 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
          <Lightbulb className="h-8 w-8 text-blue-600 dark:text-blue-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Guided Projects
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Follow step-by-step tutorials to build real-world blockchain applications.
          </p>
        </div>
      </div>

      <div className="mt-12 text-center">
        <Link
          to="/explorer"
          className="inline-flex items-center px-6 py-3 text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors duration-200"
        >
          Try Interactive Demo
          <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </div>
    </div>
  </div>
);

const Education = () => {
  const topics = [
    {
      title: 'Blockchain Basics',
      icon: Blocks,
      description: 'Master the fundamental concepts of blockchain technology, from distributed ledgers to consensus mechanisms.',
      lessons: [
        'Understanding Blockchain Architecture',
        'Cryptography & Security',
        'Consensus Mechanisms',
        'Types of Networks'
      ],
      linkTo: '/explorer'
    },
    {
      title: 'Smart Contracts',
      icon: Code,
      description: 'Learn to create and deploy smart contracts, the building blocks of decentralized applications.',
      lessons: [
        'Smart Contract Fundamentals',
        'Solidity Programming',
        'Testing & Deployment',
        'Security Best Practices'
      ],
      linkTo: '/portfolio'
    },
    {
      title: 'DeFi & Web3',
      icon: Wallet,
      description: 'Explore decentralized finance and the future of financial applications on the blockchain.',
      lessons: [
        'DeFi Protocols',
        'Yield Farming Strategies',
        'Liquidity Pools',
        'Risk Management'
      ],
      linkTo: '/explorer'
    },
    {
      title: 'Advanced Topics',
      icon: Brain,
      description: 'Dive deep into advanced blockchain concepts and emerging technologies in the space.',
      lessons: [
        'Layer 2 Solutions',
        'Cross-chain Protocols',
        'Zero-knowledge Proofs',
        'Blockchain Governance'
      ],
      linkTo: '/visualizer'
    }
  ];

  const stats = [
    { title: 'Active Learners', value: '10,000+', icon: Users },
    { title: 'Course Completion Rate', value: '94%', icon: Award },
    { title: 'Practice Projects', value: '150+', icon: Code },
    { title: 'Community Members', value: '25,000+', icon: Network }
  ];

  const benefits = [
    {
      icon: Sparkles,
      title: 'Interactive Learning',
      description: 'Learn by doing with hands-on projects and real-world examples that reinforce your understanding.'
    },
    {
      icon: Users,
      title: 'Community Support',
      description: 'Join a vibrant community of learners and experts who are always ready to help and share knowledge.'
    },
    {
      icon: Award,
      title: 'Industry Recognition',
      description: 'Earn certificates that are recognized by leading companies in the blockchain industry.'
    }
  ];

  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <div className="text-center max-w-4xl mx-auto pt-8">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-8">
          Your Journey into Blockchain Technology
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-12">
          Discover the power of blockchain technology through our comprehensive learning platform. 
          From beginners to advanced developers, we provide the resources you need to succeed in Web3.
        </p>
        <div className="flex items-center justify-center space-x-4">
          <Link
            to="/explorer"
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors duration-200"
          >
            Start Learning
          </Link>
          <Link
            to="/portfolio"
            className="px-8 py-4 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-xl font-semibold transition-colors duration-200"
          >
            View Demo
          </Link>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Benefits Section */}
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose Our Platform
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We provide a comprehensive learning experience that sets you up for success in the blockchain industry.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {benefits.map((benefit, index) => (
            <BenefitCard key={index} {...benefit} />
          ))}
        </div>
      </div>

      {/* Learning Paths */}
      <div className="space-y-16 max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Learning Paths
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Choose your path and start building the future of decentralized technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {topics.map((topic, index) => (
            <FeatureCard key={index} {...topic} />
          ))}
        </div>
      </div>

      {/* Interactive Demo Section */}
      <InteractiveDemo />

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 dark:from-gray-800 dark:via-gray-750 dark:to-gray-800 rounded-2xl p-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Ready to Start Your Blockchain Journey?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Join thousands of learners who are already building the future of decentralized technology.
          </p>
          <Link
            to="/education"
            className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors duration-200"
          >
            Begin Learning
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Education;