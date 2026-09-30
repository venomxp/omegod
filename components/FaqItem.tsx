import React from 'react';
import { ChevronDownIcon } from './icons/Icons';

interface FaqItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
  index?: number;
}

const FaqItem: React.FC<FaqItemProps> = ({ question, answer, isOpen, onClick, index = 0 }) => {
  const formattedIndex = String(index + 1).padStart(2, '0');

  return (
    <div 
      className={`group rounded-2xl transition-all duration-300 backdrop-blur-xl border overflow-hidden ${
        isOpen 
          ? 'bg-white dark:bg-[#18181d] border-pink-500/50 dark:border-pink-500/40 shadow-xl shadow-pink-500/5 dark:shadow-pink-500/10' 
          : 'bg-white/80 dark:bg-[#151518]/80 border-gray-200/80 dark:border-white/10 hover:border-pink-400/40 dark:hover:border-pink-500/30 hover:shadow-lg hover:shadow-gray-200/40 dark:hover:shadow-black/40'
      }`}
    >
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left rtl:text-right transition-colors"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3.5 sm:gap-4 flex-grow min-w-0">
          <span 
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center font-bold text-xs sm:text-sm flex-shrink-0 transition-all duration-300 font-mono ${
              isOpen
                ? 'bg-gradient-to-br from-pink-500 to-orange-500 text-white shadow-md shadow-pink-500/25 scale-105'
                : 'bg-pink-500/10 dark:bg-white/5 text-pink-600 dark:text-pink-400 group-hover:bg-pink-500/15'
            }`}
          >
            {formattedIndex}
          </span>
          <span className="font-bold text-base sm:text-lg text-brand-dark-text dark:text-white font-outfit tracking-tight group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
            {question}
          </span>
        </div>

        <div 
          className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
            isOpen 
              ? 'bg-gradient-to-r from-pink-500 to-orange-500 text-white shadow-md shadow-pink-500/20 rotate-180' 
              : 'bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-gray-400 group-hover:bg-pink-500/10 group-hover:text-pink-600 dark:group-hover:text-pink-400 rotate-0'
          }`}
        >
          <ChevronDownIcon className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
      </button>

      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-1 border-t border-gray-100 dark:border-white/5">
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed font-normal">
              {answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqItem;