import React from 'react';
import { LucideIcon } from 'lucide-react';
import Card from '../../common/Card';

interface StatisticsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: {
    value: number;
    trend: 'up' | 'down';
  };
  color?: string;
}

const StatisticsCard: React.FC<StatisticsCardProps> = ({
  title,
  value,
  icon: Icon,
  change,
  color = 'primary',
}) => {
  return (
    <Card className="hover:shadow-xl transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
          
          {change && (
            <div className="mt-2 flex items-center">
              <span
                className={`text-sm font-medium ${
                  change.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {change.trend === 'up' ? '+' : '-'}{Math.abs(change.value)}%
              </span>
              <span className="ml-2 text-sm text-gray-500">from last month</span>
            </div>
          )}
        </div>
        
        <div className={`p-3 rounded-lg bg-${color}-100`}>
          <Icon className={`h-6 w-6 text-${color}-600`} />
        </div>
      </div>
    </Card>
  );
};

export default StatisticsCard;