import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, MapPin, GraduationCap, Award, MessageCircle } from 'lucide-react';
import CalendarModal from '../components/CalendarModal';
import { supabase, Teacher } from '../lib/supabase';

const TeacherDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchTeacher(id);
    }
  }, [id]);

  const fetchTeacher = async (teacherId: string) => {
    try {
      const { data, error } = await supabase
        .from('teachers')
        .select('*')
        .eq('id', teacherId)
        .maybeSingle();

      if (error) throw error;

      setTeacher(data);
    } catch (error) {
      console.error('Error fetching teacher:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = () => {
    setIsCalendarOpen(false);
    navigate(`/order?teacherId=${id}`);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-gray-600">読み込み中...</div>
        </div>
      </div>
    );
  }

  if (!teacher) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-gray-600">先生が見つかりませんでした。</div>
        </div>
      </div>
    );
  }

  const children = Array.isArray(teacher.children) ? teacher.children : [];
  const achievements = Array.isArray(teacher.achievements) ? teacher.achievements : [];
  const availableHours = teacher.available_hours || {};

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="relative h-64">
            <img
              src={teacher.image_url}
              alt={teacher.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 text-white">
              <h1 className="text-3xl font-bold mb-2">{teacher.name}</h1>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-1" />
                  <span>{teacher.location}</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 fill-current mr-1" />
                  <span>{Number(teacher.rating).toFixed(1)}</span>
                  <span className="ml-1">({teacher.review_count}件のレビュー)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <GraduationCap className="h-6 w-6 text-primary-600 mr-2" />
                経歴
              </h2>
              <p className="text-gray-600 mb-4">{teacher.background}</p>
              <p className="text-gray-600 mb-4">{teacher.education}</p>
              {children.length > 0 && (
                <ul className="space-y-2">
                  {children.map((child: string, index: number) => (
                    <li key={index} className="text-gray-600">{child}</li>
                  ))}
                </ul>
              )}
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <MessageCircle className="h-6 w-6 text-primary-600 mr-2" />
                メッセージ
              </h2>
              <p className="text-gray-600 whitespace-pre-line">{teacher.message}</p>
            </div>

            {achievements.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Award className="h-6 w-6 text-primary-600 mr-2" />
                  実績
                </h2>
                <ul className="space-y-2">
                  {achievements.map((achievement: string, index: number) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <div className="h-2 w-2 bg-primary-600 rounded-full mr-3"></div>
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <button
                onClick={() => setIsCalendarOpen(true)}
                className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition"
              >
                日程を確認
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold mb-4">対応可能な時間帯</h3>
              {Object.keys(availableHours).length > 0 ? (
                <ul className="space-y-2 text-gray-600">
                  {Object.entries(availableHours).map(([day, time]) => (
                    <li key={day}>{day}: {time as string}</li>
                  ))}
                </ul>
              ) : (
                <ul className="space-y-2 text-gray-600">
                  <li>平日: 10:00 - 15:00</li>
                  <li>土曜: 10:00 - 12:00</li>
                  <li>日曜: 応相談</li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>

      <CalendarModal
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
        onSelect={handleSelect}
      />
    </div>
  );
};

export default TeacherDetail;