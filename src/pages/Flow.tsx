import React from 'react';
import { Smartphone, MessageSquare, Users, Calendar, Star, Heart } from 'lucide-react';

const FlowStep: React.FC<{
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  questions?: string[];
}> = ({ number, title, description, icon, questions }) => (
  <div className="flex gap-8 items-start pb-16">
    <div className="flex-shrink-0 w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
      {icon}
    </div>
    <div className="flex-grow">
      <h3 className="text-xl font-bold mb-4">
        {number}. {title}
      </h3>
      <p className="text-gray-600 mb-4 leading-relaxed">{description}</p>
      {questions && questions.length > 0 && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <ul className="space-y-2">
            {questions.map((question, index) => (
              <li key={index} className="text-primary-600 hover:text-primary-700">
                <a href="#" className="flex items-center">
                  <span className="mr-2">▶</span>
                  {question}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  </div>
);

const Flow: React.FC = () => {
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4">Flow</h1>
        <h2 className="text-xl text-gray-600 text-center mb-16">ご利用の流れ</h2>

        <div className="space-y-8">
          <FlowStep
            number={1}
            title="先生を探してリクエストを送る"
            description="MamaBatonでは、豊富な子育て経験を持つ先輩ママたちの中から、あなたのニーズに合った先生を見つけることができます。先生一覧から直接選ぶことも、ご要望に応じて最適な先生をご紹介することも可能です。"
            icon={<Smartphone className="h-8 w-8 text-primary-600" />}
            questions={[
              "先生への謝礼金はいくらかかりますか？",
              "予約後のキャンセルは可能ですか？キャンセル料は発生しますか？"
            ]}
          />

          <FlowStep
            number={2}
            title="ヒアリングシートの回答とお支払い"
            description="予約リクエスト後、確認メールをお送りいたします。メールの案内に従って、お子様の年齢や目標、ご家庭での教育方針などをお聞かせいただくヒアリングシートにご回答ください。また、お支払いのお手続きもこの段階でお願いいたします。"
            icon={<MessageSquare className="h-8 w-8 text-primary-600" />}
            questions={[
              "ヒアリングシートではどのような内容を記入しますか？",
              "お支払い方法にはどのようなものがありますか？"
            ]}
          />

          <FlowStep
            number={3}
            title="先生との事前打ち合わせ"
            description="ご予約確定後、24時間以内に担当の先生から連絡を差し上げます。育児支援のサポート内容を詳しくお話しさせていただきます。不安な点や気になることがございましたら、この機会にぜひご相談ください。"
            icon={<Users className="h-8 w-8 text-primary-600" />}
            questions={[
              "LINEでの連絡は可能ですか？",
              "先生からの連絡が来ない場合はどうすればよいですか？"
            ]}
          />

          <FlowStep
            number={4}
            title="育児支援"
            description="事前の打ち合わせ内容に基づき、ご家庭にて一緒にお子様に合わせた育児支援を行います。単なる見守りにとどまるだけでなく、お子様の興味や関心を引き出しながら、楽しく学べる環境づくりを心がけています。"
            icon={<Calendar className="h-8 w-8 text-primary-600" />}
            questions={[
              "途中で育児支援の内容の変更は可能ですか？",
              "継続的な依頼は可能ですか？"
            ]}
          />

          <FlowStep
            number={5}
            title="レビューの投稿"
            description="育児支援終了後、サービスの品質向上のため、先生へのレビュー投稿をお願いしております。他の新米ママたちの参考になりますので、率直なご感想をお聞かせください。良かった点や改善点など、具体的なコメントをいただけると幸いです。"
            icon={<Star className="h-8 w-8 text-primary-600" />}
            questions={[
              "レビューは匿名で投稿できますか？",
              "後からレビューを修正することはできますか？"
            ]}
          />
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">よくある質問</h2>
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg mb-2">
                Q. 何日前から予約ができるのでしょうか？ また何ヶ月先まで予約ができますか？
              </h3>
              <p className="text-gray-600">
                予約は7日前から可能です。また、3ヶ月先までのご予約を受け付けております。
                人気の先生は予約が埋まりやすいため、お早めのご予約をおすすめいたします。
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg mb-2">
                Q. 育児支援の時間はどのくらいですか？
              </h3>
              <p className="text-gray-600">
                基本の育児支援の時間は1回2時間からとなっております。お子様の年齢や目標に応じて、
                柔軟に対応させていただきますので、ご要望がございましたらお申し付けください。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flow;