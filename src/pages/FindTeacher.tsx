import React, { useState, useEffect, useMemo } from 'react';
import { Search, Filter } from 'lucide-react';
import TeacherCard from '../components/TeacherCard';
import { supabase, Teacher } from '../lib/supabase';

const FindTeacher: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const { data, error } = await supabase
        .from('teachers')
        .select('*')
        .eq('is_active', true)
        .order('rating', { ascending: false });

      if (error) throw error;

      setTeachers(data || []);
    } catch (error) {
      console.error('Error fetching teachers:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredTeachers = useMemo(() => {
    if (!searchTerm) return teachers;

    const lowercaseSearch = searchTerm.toLowerCase();
    return teachers.filter(teacher => {
      const specialties = Array.isArray(teacher.specialties) ? teacher.specialties : [];
      return (
        teacher.name.toLowerCase().includes(lowercaseSearch) ||
        teacher.education.toLowerCase().includes(lowercaseSearch) ||
        teacher.location.toLowerCase().includes(lowercaseSearch) ||
        specialties.some((s: string) => s.toLowerCase().includes(lowercaseSearch))
      );
    });
  }, [teachers, searchTerm]);

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-gray-600">読み込み中...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">先生を探す</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="名前、大学、専門分野で検索..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
          <Filter className="h-5 w-5 mr-2" />
          フィルター
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {['幼児教育', '受験対策', '早期教育', 'モンテッソーリ', '英語教育'].map((tag) => (
          <button
            key={tag}
            className="px-4 py-2 bg-primary-50 text-primary-600 rounded-full hover:bg-primary-100 transition"
            onClick={() => setSearchTerm(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      <p className="text-gray-600 mb-6">
        {filteredTeachers.length}人の先生が見つかりました
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTeachers.map((teacher) => (
          <TeacherCard
            key={teacher.id}
            id={teacher.id}
            name={teacher.name}
            image={teacher.image_url}
            background={teacher.background}
            education={teacher.education}
            children={Array.isArray(teacher.children) ? teacher.children : []}
            specialties={Array.isArray(teacher.specialties) ? teacher.specialties : []}
            rating={Number(teacher.rating)}
            reviews={teacher.review_count}
          />
        ))}
      </div>

      {filteredTeachers.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-gray-600">該当する先生が見つかりませんでした。</p>
        </div>
      )}
    </div>
  );
};

export default FindTeacher;