import React from 'react';
import { Check } from 'lucide-react';

interface PricingCardProps {
  title: string;
  price: string;
  duration: string;
  features: string[];
  recommended?: boolean;
  type: 'monthly' | 'hourly';
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  duration,
  features,
  recommended = false,
  type,
}) => {
  return (
    <div className={`
      bg-white rounded-xl p-8
      ${recommended ? 'ring-2 ring-primary-600 shadow-xl' : 'shadow-lg'}
      hover:shadow-xl transition
    `}>
      {recommended && (
        <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
          おすすめ
        </span>
      )}
      <h3 className="text-xl font-semibold mt-4 mb-2">{title}</h3>
      <div className="mb-6">
        <span className="text-4xl font-bold">¥{price}</span>
        <span className="text-gray-500">/{type === 'monthly' ? '月' : '時間'}</span>
        {duration && <p className="text-sm text-gray-500 mt-1">{duration}</p>}
      </div>
      <ul className="space-y-4">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <Check className="h-5 w-5 text-primary-600 mr-2" />
            <span className="text-gray-600">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PricingCard;