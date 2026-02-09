import React, { useState } from 'react';
import { Clock, Heart, Star, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import TeacherCard from '../components/TeacherCard';
import PricingCard from '../components/PricingCard';

function Home() {
  const [selectedSituation, setSelectedSituation] = useState('幼児教育');

  const situations = [
    { id: '幼児教育', label: '幼児教育' },
    { id: '小学校受験', label: '小学校受験' },
    { id: '中学校受験', label: '中学校受験' },
    { id: '海外の学校', label: '海外の学校' },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              教育経験豊富なママから学ぶ<br />
              <span className="text-primary-600">家庭教育の未来</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              スタンフォード、ハーバード、慶應幼稚舎など、実績ある先輩ママから直接学べる家庭教師マッチングサービス
            </p>
            <div className="flex space-x-4">
              <Link to="/find-teacher" className="bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition">
                先生を探す
              </Link>
              <Link to="/about" className="border border-primary-600 text-primary-600 px-8 py-3 rounded-lg hover:bg-primary-50 transition">
                詳しく見る
              </Link>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1560541919-eb5c2da6a5a3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80" 
              alt="母と子" 
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">選ばれる理由</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">実績ある先生陣</h3>
              <p className="text-gray-600">一流大学や難関校への合格実績を持つ先輩ママたちが在籍</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">柔軟な時間設定</h3>
              <p className="text-gray-600">1日2時間からのライトプランで、リモートワークのお供に</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">安心の体制</h3>
              <p className="text-gray-600">厳正な審査を通過した先生のみが登録可能</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Teachers */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">人気の先生</h2>
            <Link
              to="/find-teacher"
              className="text-primary-600 flex items-center hover:text-primary-700"
            >
              すべて見る
              <ChevronRight className="h-5 w-5 ml-1" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <TeacherCard
              id="1"
              name="田中 美咲"
              image="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
              background="専業主婦 50代"
              education="最終学歴：高校卒業"
              children={[
                "長男：早稲田大学",
                "次男：Harvard University"
              ]}
              specialties={["幼児教育", "モンテッソーリ教育", "海外大学"]}
              rating={4.9}
              reviews={124}
            />
            <TeacherCard
              id="2"
              name="佐藤 優子"
              image="https://images.unsplash.com/photo-1580894732444-8ecded7900cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
              background="専業主婦 40代"
              education="最終学歴：慶應義塾大学"
              children={[
                "長女：慶應義塾幼稚舎",
                "次女：慶應義塾幼稚舎"
              ]}
              specialties={["幼稚舎受験", "早期教育", "知育遊び"]}
              rating={4.8}
              reviews={98}
            />
            <TeacherCard
              id="3"
              name="山田 恵子"
              image="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
              background="元幼稚園教諭 45代"
              education="最終学歴：東京都立大学"
              children={[
                "長男：東京大学医学部",
                "長女：京都大学"
              ]}
              specialties={["早期教育", "受験対策", "理科実験"]}
              rating={4.7}
              reviews={156}
            />
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">料金プラン</h2>
          
          {/* Situation Buttons */}
          <div className="flex justify-center gap-4 mb-12">
            {situations.map((situation) => (
              <button
                key={situation.id}
                onClick={() => setSelectedSituation(situation.id)}
                className={`px-6 py-3 rounded-lg transition-all ${
                  selectedSituation === situation.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-white border border-primary-600 text-primary-600 hover:bg-primary-50'
                }`}
              >
                {situation.label}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <PricingCard
              title="ライトプラン"
              price="1,000"
              duration=""
              type="monthly"
              features={[
                "限定LINEコミュニティへの招待"
              ]}
            />
            <PricingCard
              title="スタンダードプラン"
              price="3,000"
              duration="限定LINEコミュニティ1ヶ月分付き"
              type="hourly"
              features={[
                "限定LINEコミュニティ1ヶ月分",
                "スケジュール調整可能",
                "オンラインサポート"
              ]}
              recommended
            />
            <PricingCard
              title="プレミアムプラン"
              price="6,000"
              duration="限定LINEコミュニティ2ヶ月分付き"
              type="hourly"
              features={[
                "限定LINEコミュニティ2ヶ月分",
                "全先輩ママとスケジュール調整可能",
                "オンラインサポート"
              ]}
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;