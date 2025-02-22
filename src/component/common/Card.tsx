import React from 'react';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  actions,
  className = '',
  noPadding = false,
}) => {
  return (
    <div 
      className={`
        bg-white dark:bg-gray-800 
        rounded-lg shadow-lg overflow-hidden 
        transition-colors duration-200 
        ${className}
      `}
    >
      {(title || subtitle || actions) && (
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-start">
            <div>
              {title && (
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {subtitle}
                </p>
              )}
            </div>
            {actions && (
              <div className="ml-4 flex items-center space-x-2">
                {typeof actions === 'string' ? (
                  <span className="text-gray-700 dark:text-gray-300">{actions}</span>
                ) : (
                  actions
                )}
              </div>
            )}
          </div>
        </div>
      )}
      <div 
        className={`
          ${noPadding ? '' : 'p-6'} 
          bg-white dark:bg-gray-800 
          text-gray-800 dark:text-gray-200
          transition-colors duration-200
        `}
      >
        {children}
      </div>
    </div>
  );
};

export default Card;