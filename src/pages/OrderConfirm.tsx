import React from 'react';
import { Link } from 'react-router-dom';

const OrderConfirm: React.FC = () => {
  // 実際のアプリケーションでは、この情報は前のページから渡されます
  const orderDetails = {
    total: 58058,
    breakdown: {
      basePlan: 23800,
      additionalSupport: 1980,
      designationFee: 27000,
      tax: 5278
    },
    request: {
      type: '教育サポート',
      plan: 'スタンダードプラン',
      location: '東京都港区 青山1-2-3',
      dates: [
        '2024年11月10日(日) 11:30',
        '2024年11月17日(日) 09:00',
        '2024年11月17日(日) 14:30'
      ],
      name: '中村 秀樹（なかむら ひでき）',
      email: 'nakamura@example.com',
      phone: '08012345678',
      teacher: '田中 美咲（指名）'
    }
  };

  return (
    <div className="container mx-auto px-6 py-8 max-w-3xl">
      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-12">
        <div className="flex-1">
          <div className="bg-primary-600 h-2 rounded-l-full"></div>
          <div className="mt-2 text-primary-600 font-medium text-sm">情報入力</div>
        </div>
        <div className="flex-1">
          <div className="bg-primary-600 h-2"></div>
          <div className="mt-2 text-primary-600 font-medium text-sm">内容確認</div>
        </div>
        <div className="flex-1">
          <div className="bg-gray-200 h-2 rounded-r-full"></div>
          <div className="mt-2 text-gray-400 text-sm">完了</div>
        </div>
      </div>

      <h1 className="text-2xl font-bold text-center mb-8">リクエスト内容の確認</h1>

      {/* Terms Agreement */}
      <div className="text-center mb-8">
        <p className="text-sm text-gray-600">
          予約リクエストを送ると
          <Link to="/terms" className="text-primary-600 hover:text-primary-700">利用規約</Link>
          および
          <Link to="/privacy" className="text-primary-600 hover:text-primary-700">プライバシーポリシー</Link>
          に同意したことになります。
        </p>
        <p className="text-sm font-medium mt-4">訪問の3日前までキャンセル無料</p>
      </div>

      {/* Payment Information */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-lg font-medium mb-4">お支払い情報</h2>
        <p className="text-sm text-gray-500 mb-4">※まだ請求は発生いたしません</p>

        <div className="border-t pt-4">
          <div className="flex justify-between items-center mb-4">
            <span className="font-bold text-xl">合計</span>
            <span className="font-bold text-xl">{orderDetails.total.toLocaleString()}円（税込）</span>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>スタンダードプラン</span>
              <span>{orderDetails.breakdown.basePlan.toLocaleString()}円</span>
            </div>
            <div className="flex justify-between">
              <span>教育サポート ※予約後の追加・キャンセル不可</span>
              <span>{orderDetails.breakdown.additionalSupport.toLocaleString()}円</span>
            </div>
            <div className="flex justify-between">
              <span>シッター指名料</span>
              <span>{orderDetails.breakdown.designationFee.toLocaleString()}円</span>
            </div>
            <div className="flex justify-between">
              <span>税額</span>
              <span>{orderDetails.breakdown.tax.toLocaleString()}円</span>
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-600 mt-4">
          ※予約リクエストをシッターが承認した後、お支払いに関するメールが届きます。
          そちらの案内に沿って、お支払いをお願いいたします。
        </p>
      </div>

      {/* Request Details */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-lg font-medium mb-4">リクエスト内容</h2>
        <table className="w-full">
          <tbody className="divide-y">
            <tr>
              <th className="py-4 text-left text-gray-600 w-1/3">サポート内容</th>
              <td className="py-4">{orderDetails.request.type}</td>
            </tr>
            <tr>
              <th className="py-4 text-left text-gray-600">プラン</th>
              <td className="py-4">{orderDetails.request.plan}</td>
            </tr>
            <tr>
              <th className="py-4 text-left text-gray-600">訪問場所</th>
              <td className="py-4">{orderDetails.request.location}</td>
            </tr>
            <tr>
              <th className="py-4 text-left text-gray-600">訪問希望日時</th>
              <td className="py-4">
                <div className="space-y-2">
                  {orderDetails.request.dates.map((date, index) => (
                    <div key={index}>
                      {index === 0 ? '■第1希望日程' : index === 1 ? '■第2希望日程' : '■第3希望日程'}
                      <div className="ml-4">{date}</div>
                    </div>
                  ))}
                </div>
              </td>
            </tr>
            <tr>
              <th className="py-4 text-left text-gray-600">お名前</th>
              <td className="py-4">{orderDetails.request.name} 様</td>
            </tr>
            <tr>
              <th className="py-4 text-left text-gray-600">メールアドレス</th>
              <td className="py-4">{orderDetails.request.email}</td>
            </tr>
            <tr>
              <th className="py-4 text-left text-gray-600">電話番号</th>
              <td className="py-4">{orderDetails.request.phone}</td>
            </tr>
            <tr>
              <th className="py-4 text-left text-gray-600">シッター</th>
              <td className="py-4">{orderDetails.request.teacher}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="text-center mb-4">
        <p className="text-sm font-medium">訪問の3日前までキャンセル無料</p>
      </div>

      <button className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition">
        予約リクエストを送る
      </button>
    </div>
  );
};

export default OrderConfirm;