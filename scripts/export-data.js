// 古いSupabaseからデータをエクスポートするスクリプト
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import { config } from 'dotenv';

// .envファイルを読み込む
config();

// 古いSupabaseの認証情報（現在の.envから）
const oldSupabaseUrl = process.env.VITE_SUPABASE_URL;
const oldSupabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(oldSupabaseUrl, oldSupabaseKey);

async function exportData() {
  console.log('📥 データをエクスポート中...');

  try {
    // teachersデータを取得
    const { data: teachers, error: teachersError } = await supabase
      .from('teachers')
      .select('*')
      .eq('is_active', true);

    if (teachersError) throw teachersError;

    // reviewsデータを取得
    const { data: reviews, error: reviewsError } = await supabase
      .from('reviews')
      .select('*');

    if (reviewsError) {
      console.log('⚠️  reviewsテーブルのエクスポートをスキップ');
    }

    const exportData = {
      teachers: teachers || [],
      reviews: reviews || [],
      exported_at: new Date().toISOString()
    };

    // JSONファイルに保存
    fs.writeFileSync(
      'data-export.json',
      JSON.stringify(exportData, null, 2)
    );

    console.log('✅ エクスポート完了！');
    console.log(`   - 先生: ${teachers?.length || 0}人`);
    console.log(`   - レビュー: ${reviews?.length || 0}件`);
    console.log('   - ファイル: data-export.json');

  } catch (error) {
    console.error('❌ エラー:', error.message);
  }
}

exportData();
