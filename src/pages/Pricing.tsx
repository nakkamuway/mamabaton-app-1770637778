import React from 'react';
import { Check } from 'lucide-react';
import PricingCard from '../components/PricingCard';

const Pricing: React.FC = () => {
  return (
    <div className="container mx-auto px-6 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">料金プラン</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          お子様の年齢や目標に合わせて最適なプランをお選びいただけます。すべてのプランに14日間の返金保証が付いています。
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <PricingCard
          title="ライトプラン"
          price="1,000"
          duration=""
          type="monthly"
          features={[
            "限定チャットへの招待"
          ]}
        />
        <PricingCard
          title="スタンダードプラン"
          price="3,000"
          duration="限定チャットへの招待1ヶ月分付き"
          type="hourly"
          features={[
            "限定チャットへの招待1ヶ月分付き",
            "保護者の方と一緒にサポート",
            "チャット機能"
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

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">よくある質問</h2>
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold text-lg mb-2">料金の支払い方法は？</h3>
            <p className="text-gray-600">クレジットカード、銀行振込に対応しています。月額プランは毎月1日に自動更新されます。</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold text-lg mb-2">キャンセル料はかかりますか？</h3>
            <p className="text-gray-600">14日以内のキャンセルは全額返金対応いたします。それ以降は月末までのご利用分をご請求させていただきます。</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold text-lg mb-2">先生の変更は可能ですか？</h3>
            <p className="text-gray-600">はい、可能です。ご要望に応じて最適な先生をご紹介させていただきます。</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold text-lg mb-2">LINEコミュニティとは？</h3>
            <p className="text-gray-600">先輩ママたちと直接交流できる限定のLINEグループです。教育に関する情報共有や相談ができます。</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;