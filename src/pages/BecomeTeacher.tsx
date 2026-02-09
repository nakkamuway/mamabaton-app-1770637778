import React from 'react';
import { BookOpen, Users, DollarSign, Award } from 'lucide-react';

const BecomeTeacher: React.FC = () => {
  return (
    <div className="container mx-auto px-6 py-12">
      {/* Hero Section */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          あなたの経験を活かして、<br />
          <span className="text-primary-600">新しいママたちをサポート</span>
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed mb-8">
          子育ての経験を活かして、新しいママたちの力になりませんか？
          あなたの知識と経験は、たくさんの家族の助けになります。
        </p>
        <button className="bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition">
          今すぐ応募する
        </button>
      </div>

      {/* Benefits */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <div className="text-center p-6 bg-white rounded-xl shadow-sm">
          <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
            <DollarSign className="h-6 w-6 text-primary-600" />
          </div>
          <h3 className="text-base font-semibold mb-2">柔軟な収入</h3>
          <p className="text-sm text-gray-600 leading-relaxed">自分のスケジュールに合わせて働き、安定した収入を得られます</p>
        </div>
        <div className="text-center p-6 bg-white rounded-xl shadow-sm">
          <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="h-6 w-6 text-primary-600" />
          </div>
          <h3 className="text-base font-semibold mb-2">コミュニティ</h3>
          <p className="text-sm text-gray-600 leading-relaxed">同じ志を持つ先生たちとのネットワークを築けます</p>
        </div>
        <div className="text-center p-6 bg-white rounded-xl shadow-sm">
          <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="h-6 w-6 text-primary-600" />
          </div>
          <h3 className="text-base font-semibold mb-2">成長機会</h3>
          <p className="text-sm text-gray-600 leading-relaxed">定期的なトレーニングと勉強会で自己成長できます</p>
        </div>
        <div className="text-center p-6 bg-white rounded-xl shadow-sm">
          <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
            <Award className="h-6 w-6 text-primary-600" />
          </div>
          <h3 className="text-base font-semibold mb-2">社会貢献</h3>
          <p className="text-sm text-gray-600 leading-relaxed">次世代の子育て支援に貢献できます</p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm p-8 mb-16">
        <h2 className="text-xl font-bold text-gray-900 mb-4">私たちのミッション</h2>
        <div className="space-y-4 text-sm leading-relaxed text-gray-600">
          <p>
            核家族化が進む現代社会で、子育ての知恵や経験を共有することが難しくなっています。
            かつては当たり前だった、地域や家族間での子育ての知恵の伝承が失われつつある今、
            新しい形での支え合いが必要とされています。
          </p>
          <p>
            子育て経験のあるママたちは、貴重な経験と知恵を持っています。
            しかし、その価値が社会的に十分に認められているとは言えません。
          </p>
          <p className="font-medium text-primary-600">
            私たちは、そんなママたちの経験に、適切な経済的価値をつけることで、
            新しい働き方と、子育て支援の形を提案します。
          </p>
        </div>
      </div>

      {/* Requirements */}
      <div className="max-w-2xl mx-auto mb-16">
        <h2 className="text-xl font-bold text-center mb-8">応募要件</h2>
        <div className="bg-white p-8 rounded-xl shadow-sm">
          <ul className="space-y-4">
            <li className="flex items-start">
              <div className="bg-primary-100 rounded-full p-1 mr-4 mt-1 flex-shrink-0">
                <div className="bg-primary-600 rounded-full w-1.5 h-1.5"></div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">子育ての経験があり、教育に関する知識や実績をお持ちの方</p>
            </li>
            <li className="flex items-start">
              <div className="bg-primary-100 rounded-full p-1 mr-4 mt-1 flex-shrink-0">
                <div className="bg-primary-600 rounded-full w-1.5 h-1.5"></div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">週に最低10時間以上活動できる方</p>
            </li>
            <li className="flex items-start">
              <div className="bg-primary-100 rounded-full p-1 mr-4 mt-1 flex-shrink-0">
                <div className="bg-primary-600 rounded-full w-1.5 h-1.5"></div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">オンラインツールを使用したコミュニケーションが可能な方</p>
            </li>
            <li className="flex items-start">
              <div className="bg-primary-100 rounded-full p-1 mr-4 mt-1 flex-shrink-0">
                <div className="bg-primary-600 rounded-full w-1.5 h-1.5"></div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">定期的なトレーニングや勉強会に参加できる方</p>
            </li>
          </ul>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <div className="inline-flex items-center text-primary-600 text-sm mb-6">
          <Award className="h-4 w-4 mr-2" />
          <span className="font-medium">一緒に、より良い子育ての環境を作りましょう</span>
        </div>
        <div>
          <button className="bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition">
            今すぐ応募する
          </button>
        </div>
      </div>
    </div>
  );
};

export default BecomeTeacher;