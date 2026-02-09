import React from 'react';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TeacherCardProps {
  id: string;
  name: string;
  image: string;
  background?: string;
  education?: string;
  children?: string[];
  specialties?: string[];
  rating: number;
  reviews: number;
}

const TeacherCard: React.FC<TeacherCardProps> = ({
  id,
  name,
  image,
  background,
  education,
  children,
  specialties,
  rating,
  reviews,
}) => {
  return (
    <Link to={`/teacher/${id}`} className="block">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
        <img src={image} alt={name} className="w-full h-48 object-cover" />
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2">{name}</h3>
          {background && <p className="text-gray-600 text-sm mb-1">{background}</p>}
          {education && <p className="text-gray-600 text-sm mb-2">{education}</p>}
          
          {children && children.length > 0 && (
            <div className="mb-2">
              {children.map((child, index) => (
                <p key={index} className="text-gray-600 text-sm">{child}</p>
              ))}
            </div>
          )}
          
          {specialties && specialties.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4">
              {specialties.map((specialty, index) => (
                <span key={index} className="text-primary-600 text-xs bg-primary-50 px-2 py-1 rounded-full">
                  {specialty}
                </span>
              ))}
            </div>
          )}
          
          <div className="flex items-center">
            <Star className="h-5 w-5 text-yellow-400 fill-current" />
            <span className="ml-1 font-semibold">{rating}</span>
            <span className="text-gray-500 ml-1">({reviews}件のレビュー)</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TeacherCard;