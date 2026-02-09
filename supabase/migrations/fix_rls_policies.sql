-- Fix RLS policies to allow anonymous access to public data

-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can view active teachers" ON teachers;
DROP POLICY IF EXISTS "Anyone can read reviews" ON reviews;

-- Recreate policies with anonymous access
CREATE POLICY "Anyone can view active teachers"
  ON teachers FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Anyone can read reviews"
  ON reviews FOR SELECT
  TO anon, authenticated
  USING (true);

-- Optional: Add some test data if teachers table is empty
INSERT INTO teachers (name, image_url, background, education, location, message, specialties, children, achievements, rating, review_count, is_active)
VALUES
  (
    '田中 花子',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    '専業主婦 40代',
    '最終学歴：大学卒業',
    '東京都渋谷区',
    'お子様一人ひとりの個性を大切に、楽しく学べる環境を作ります。20年以上の子育て経験を活かし、お子様の成長をサポートします。',
    '["学習サポート", "相談・悩み", "食事サポート"]'::jsonb,
    '["長男：東京大学在学中", "長女：早稲田大学卒業"]'::jsonb,
    '["不登校の子どものサポート経験あり", "発達障害児の支援資格保有"]'::jsonb,
    4.8,
    25,
    true
  ),
  (
    '山田 美咲',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    '元教師 50代',
    '最終学歴：大学卒業（教育学部）',
    '東京都世田谷区',
    '元小学校教師として25年間の経験があります。お子様の学習面だけでなく、心のケアも大切にしています。',
    '["学習サポート", "進路相談", "相談・悩み"]'::jsonb,
    '["長男：医学部卒業", "次男：大学院在学中"]'::jsonb,
    '["教員免許保有", "カウンセラー資格保有"]'::jsonb,
    4.9,
    42,
    true
  ),
  (
    '佐藤 愛',
    'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400',
    '保育士 30代',
    '最終学歴：短大卒業（保育科）',
    '東京都目黒区',
    '保育士として10年の経験があります。小さなお子様から小学生まで、幅広い年齢層のサポートが可能です。',
    '["遊び相手", "食事サポート", "お迎え"]'::jsonb,
    '["長女：小学3年生"]'::jsonb,
    '["保育士資格保有", "ベビーシッター経験豊富"]'::jsonb,
    4.7,
    18,
    true
  )
ON CONFLICT (id) DO NOTHING;
