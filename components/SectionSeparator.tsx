import React from 'react';

interface SectionSeparatorProps {
  fillClassName: string;
}

const SectionSeparator: React.FC<SectionSeparatorProps> = ({ fillClassName }) => {
  return (
    <div className="bg-transparent -mb-1 leading-none pointer-events-none">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="relative block w-full h-[60px] sm:h-[100px]"
      >
        <path
          d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-17,148.6-13.3,229.8,2.86,83.82,16.43,170.8,37.4,258.84,54.36,97.22,19,214.98,28.3,320.3,16.15V120H0V58.35C50.11,54.89,166.72,55.19,235.84,56.23,285.8,57,314.53,56.44,321.39,56.44Z"
          className={fillClassName}
        ></path>
      </svg>
    </div>
  );
};

export default SectionSeparator;
