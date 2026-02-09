import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Twitter, Home } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <GraduationCap className="h-8 w-8 text-primary-600" />
              <span className="text-xl font-bold text-gray-800">MamaBaton</span>
            </div>
            <p className="text-gray-600 mb-4">
              〒105-0001<br />
              東京都港区虎ノ門5丁目9-1<br />
              麻布台ヒルズガーデンプラザB 5F
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">クイックリンク</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-primary-600">トップ</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-primary-600">MamaTeachについて</Link>
              </li>
              <li>
                <Link to="/company" className="text-gray-600 hover:text-primary-600">会社概要</Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">サポート</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-primary-600">利用規約</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-primary-600">プライバシーポリシー</Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">ソーシャル</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-primary-600">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-600 hover:text-primary-600">
                <Home className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">© 2024 MamaBaton Inc.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/terms" className="text-gray-600 hover:text-primary-600 text-sm">
              利用規約
            </Link>
            <Link to="/privacy" className="text-gray-600 hover:text-primary-600 text-sm">
              プライバシーポリシー
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;