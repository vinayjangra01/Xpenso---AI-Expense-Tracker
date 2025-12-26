import Link from 'next/link';

const Footer = () => {
  return (
    <footer className='relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900/20 border-t border-slate-100/50 dark:border-slate-700/50'>
      {/* Gradient accent line */}
      <div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500'></div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-8'>
          {/* Logo and Tagline */}
          <div className='text-center md:text-left'>
            <div className='inline-flex items-center gap-2 mb-4'>
              <div className='w-8 h-8 bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg'>
                <span className='text-white text-lg'>💰</span>
              </div>
              <h2 className='text-xl font-bold bg-gradient-to-r from-indigo-600 via-purple-500 to-blue-500 bg-clip-text text-transparent'>
                Xpenso AI
              </h2>
            </div>
            <p className='text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm'>
              Intelligent financial management powered by AI. Track expenses, manage budgets, and gain insights into your spending patterns.
            </p>
          </div>

          {/* Navigation Links */}
          <div className='text-center md:text-left'>
            <h3 className='text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4'>
              Quick Links
            </h3>
            <div className='flex flex-col space-y-3'>
              <Link
                href='/'
                className='group inline-flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm font-medium transition-colors duration-200'
              >
                <span className='w-1.5 h-1.5 bg-indigo-500 dark:bg-indigo-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200'></span>
                Home
              </Link>
              <Link
                href='/about'
                className='group inline-flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm font-medium transition-colors duration-200'
              >
                <span className='w-1.5 h-1.5 bg-indigo-500 dark:bg-indigo-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200'></span>
                About
              </Link>
              <Link
                href='/contact'
                className='group inline-flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm font-medium transition-colors duration-200'
              >
                <span className='w-1.5 h-1.5 bg-indigo-500 dark:bg-indigo-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200'></span>
                Contact
              </Link>
            </div>
          </div>

          {/* Features */}
          <div className='text-center md:text-left'>
            <h3 className='text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4'>
              Features
            </h3>
            <div className='space-y-3'>
              <div className='flex items-center gap-3 text-slate-600 dark:text-slate-400 text-sm'>
                <div className='w-5 h-5 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-md flex items-center justify-center shadow-sm'>
                  <span className='text-white text-xs'>🧠</span>
                </div>
                AI-Powered Insights
              </div>
              <div className='flex items-center gap-3 text-slate-600 dark:text-slate-400 text-sm'>
                <div className='w-5 h-5 bg-gradient-to-br from-purple-500 to-blue-500 rounded-md flex items-center justify-center shadow-sm'>
                  <span className='text-white text-xs'>⚡</span>
                </div>
                Smart Categorization
              </div>
              <div className='flex items-center gap-3 text-slate-600 dark:text-slate-400 text-sm'>
                <div className='w-5 h-5 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-md flex items-center justify-center shadow-sm'>
                  <span className='text-white text-xs'>📈</span>
                </div>
                Analytics Dashboard
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className='w-full h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700 to-transparent mb-8'></div>

        {/* Copyright and Social */}
        <div className='flex flex-col md:flex-row justify-between items-center'>
          <div className='text-center md:text-left mb-4 md:mb-0'>
            <p className='text-slate-500 dark:text-slate-400 text-sm'>
              © {new Date().getFullYear()} Xpenso AI. All rights reserved.
            </p>
          </div>

          <div className='flex items-center gap-4'>
            <div className='inline-flex items-center gap-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-full text-xs font-medium'>
              <span className='w-1.5 h-1.5 bg-indigo-500 dark:bg-indigo-400 rounded-full animate-pulse'></span>
              Made by Vinay
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;