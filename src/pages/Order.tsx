import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

interface FormData {
  firstName: string;
  lastName: string;
  kanaFirstName: string;
  kanaLastName: string;
  email: string;
  phone: string;
  childAge: string;
  childGender: string;
  specialNeeds: string;
  location: string;
  locationDetail: string;
  preferredDate1: string;
  preferredDate2: string;
  preferredDate3: string;
  supportType: string;
  additionalSupport: boolean;
}

const Order: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const teacherId = searchParams.get('teacherId');

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    kanaFirstName: '',
    kanaLastName: '',
    email: '',
    phone: '',
    childAge: '',
    childGender: '',
    specialNeeds: '',
    location: '',
    locationDetail: '',
    preferredDate1: '',
    preferredDate2: '',
    preferredDate3: '',
    supportType: 'standard',
    additionalSupport: false
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!user || !teacherId) {
      setError('ログインが必要です。');
      setLoading(false);
      return;
    }

    try {
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      if (!existingProfile) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: user.id,
            first_name: formData.firstName,
            last_name: formData.lastName,
            kana_first_name: formData.kanaFirstName,
            kana_last_name: formData.kanaLastName,
            phone: formData.phone,
          });

        if (profileError) throw profileError;
      }

      const { error: bookingError } = await supabase
        .from('bookings')
        .insert({
          user_id: user.id,
          teacher_id: teacherId,
          child_age: parseInt(formData.childAge),
          child_gender: formData.childGender,
          special_needs: formData.specialNeeds,
          location: formData.location,
          location_detail: formData.locationDetail,
          preferred_date_1: formData.preferredDate1,
          preferred_date_2: formData.preferredDate2 || null,
          preferred_date_3: formData.preferredDate3 || null,
          support_type: formData.supportType,
          additional_support: formData.additionalSupport,
          status: 'pending',
        });

      if (bookingError) throw bookingError;

      navigate('/order/confirm');
    } catch (err: any) {
      console.error('Error creating booking:', err);
      setError(err.message || '予約の作成に失敗しました。もう一度お試しください。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="max-w-3xl mx-auto">
        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <div className="bg-primary-600 text-white w-8 h-8 rounded-full flex items-center justify-center">1</div>
            <div className="ml-2 text-primary-600 font-medium">情報入力</div>
          </div>
          <ArrowRight className="text-gray-300" />
          <div className="flex items-center">
            <div className="bg-gray-200 text-gray-600 w-8 h-8 rounded-full flex items-center justify-center">2</div>
            <div className="ml-2 text-gray-600">内容確認</div>
          </div>
          <ArrowRight className="text-gray-300" />
          <div className="flex items-center">
            <div className="bg-gray-200 text-gray-600 w-8 h-8 rounded-full flex items-center justify-center">3</div>
            <div className="ml-2 text-gray-600">完了</div>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium mb-6">お客様情報</h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    姓
                    <span className="text-red-500 ml-1">必須</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    名
                    <span className="text-red-500 ml-1">必須</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    セイ
                    <span className="text-red-500 ml-1">必須</span>
                  </label>
                  <input
                    type="text"
                    name="kanaLastName"
                    value={formData.kanaLastName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    メイ
                    <span className="text-red-500 ml-1">必須</span>
                  </label>
                  <input
                    type="text"
                    name="kanaFirstName"
                    value={formData.kanaFirstName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  メールアドレス
                  <span className="text-red-500 ml-1">必須</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  電話番号
                  <span className="text-red-500 ml-1">必須</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                  required
                />
              </div>
            </div>
          </div>

          {/* Child Information */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium mb-6">お子様情報</h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    年齢
                    <span className="text-red-500 ml-1">必須</span>
                  </label>
                  <input
                    type="number"
                    name="childAge"
                    value={formData.childAge}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    性別
                    <span className="text-red-500 ml-1">必須</span>
                  </label>
                  <select
                    name="childGender"
                    value={formData.childGender}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                    required
                  >
                    <option value="">選択してください</option>
                    <option value="male">男の子</option>
                    <option value="female">女の子</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  特記事項
                </label>
                <textarea
                  name="specialNeeds"
                  value={formData.specialNeeds}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                  rows={4}
                  placeholder="アレルギーや特別な配慮が必要な点などございましたらご記入ください"
                />
              </div>
            </div>
          </div>

          {/* Location and Date Information */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium mb-6">訪問場所・希望日時</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  エリアを選択
                  <span className="text-red-500 ml-1">必須</span>
                </label>
                <select
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                  required
                >
                  <option value="">選択してください</option>
                  <option value="tokyo">東京都</option>
                  <option value="kanagawa">神奈川県</option>
                  <option value="chiba">千葉県</option>
                  <option value="saitama">埼玉県</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  詳細住所
                  <span className="text-red-500 ml-1">必須</span>
                </label>
                <input
                  type="text"
                  name="locationDetail"
                  value={formData.locationDetail}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                  placeholder="○○区○○町1-2-3"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  希望日時
                  <span className="text-red-500 ml-1">必須</span>
                </label>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-600 mb-2">第1希望日時</div>
                    <input
                      type="datetime-local"
                      name="preferredDate1"
                      value={formData.preferredDate1}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-2">第2希望日時</div>
                    <input
                      type="datetime-local"
                      name="preferredDate2"
                      value={formData.preferredDate2}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-2">第3希望日時</div>
                    <input
                      type="datetime-local"
                      name="preferredDate3"
                      value={formData.preferredDate3}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  ※希望日時は1つから3つまで選択できます。優先順位の高い順にご記入ください。
                </p>
              </div>
            </div>
          </div>

          {/* Additional Support */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium mb-6">追加サポート</h2>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="additionalSupport"
                  name="additionalSupport"
                  checked={formData.additionalSupport}
                  onChange={handleChange}
                  className="mt-1"
                />
                <label htmlFor="additionalSupport" className="ml-3">
                  <div className="font-medium">延長サポート (1,980円)</div>
                  <p className="text-sm text-gray-500">
                    予約後の時間延長やキャンセルに対応できます
                  </p>
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className={`bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? '処理中...' : '内容を確認する'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Order;