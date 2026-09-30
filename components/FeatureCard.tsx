import React from 'react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-800 to-brand-secondary border border-slate-700/80 shadow-xl shadow-black/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/30 hover:border-orange-500/50 transform-gpu">
      <div className="flex items-center justify-center h-16 w-16 mb-6 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

export default FeatureCard;