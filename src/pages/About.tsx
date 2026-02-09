import React from 'react';
import { Heart, Users, DollarSign, Home } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="container mx-auto px-6 py-12">
      {/* Hero Section */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          ママの経験に、<br />
          <span className="text-primary-600">新しい価値を。</span>
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          私たちは、子育ての経験を持つママと、これから子育てを始めるママを繋ぐプラットフォームを作っています。
        </p>
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
            特に、必ずしも高学歴でなくても、素晴らしい子育ての経験を持つママたちが大勢いらっしゃいます。
          </p>
          <p className="font-medium text-primary-600 text-base">
            私たちは、そんなママたちの経験に、適切な経済的価値をつけることで、
            新しい働き方と、子育て支援の形を提案します。
          </p>
        </div>
      </div>

      {/* Value Proposition */}
      <div className="grid md:grid-cols-2 gap-6 mb-16 max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center">
            <Users className="h-5 w-5 text-primary-600 mr-2" />
            経験豊富なママたちへ
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            あなたの子育ての経験は、かけがえのない価値があります。
            助産師ほどの専門知識がなくても、実際の子育ての経験は、
            これから子育てを始める方々にとって、何よりも心強い支えとなります。
            その経験を活かして、新しい収入源を見つけませんか？
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center">
            <Heart className="h-5 w-5 text-primary-600 mr-2" />
            これから子育てを始めるママたちへ
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            子育ては喜びに満ちていますが、同時に不安も大きいものです。
            専門家のサポートは心強いですが、費用面で躊躇してしまうことも。
            実際の子育て経験者からのアドバイスは、より身近で、かつ実践的な支援となります。
          </p>
        </div>
      </div>

      {/* Vision */}
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-4">私たちが目指す未来</h2>
        <p className="text-sm text-gray-600 leading-relaxed mb-6">
          子育ての経験が正当に評価され、新しい形の働き方として確立される社会。
          そして、支援を必要とするママたちが、気軽に経験者からアドバイスを受けられる世界。
          私たちは、そんな未来を作るために、日々努力を重ねています。
        </p>
        <div className="inline-flex items-center text-primary-600 text-sm">
          <Home className="h-4 w-4 mr-2" />
          <span className="font-medium">一緒に、より良い子育ての環境を作りましょう</span>
        </div>
      </div>
    </div>
  );
};

export default About;