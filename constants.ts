import { Artist, Matrix, Question, TypeResult } from './types';

// 1. Scoring Matrix for Tags
export const TAG_MATRIX: Matrix = {
  night: { R: 5, E: 3, P: 3 },
  emo: { R: 5, E: 5, V: 3, F: 3 },
  indie: { E: 5, V: 3, F: 5 },
  introspection: { R: 5, E: 5, V: 3 },
  minimal: { R: 3, P: 5, C: 5, L: 3 },
  detail: { P: 3, C: 5, L: 5 },
  nostalgic: { R: 3, E: 5, C: 3 },
  soft: { R: 3, E: 5, P: 5 },
  stable: { P: 5, C: 3, L: 5 },
  pop: { E: 3, P: 3, A: 5 },
  extro: { F: 3, A: 5 },
  fast: { F: 5, C: 3, A: 5 },
  groove: { E: 3, F: 5, C: 5, A: 3 },
  city: { P: 3, V: 5, L: 3, A: 5 },
  electro: { P: 3, C: 5, L: 5, A: 3 },
  dance: { F: 5, A: 5 },
  kpop: { P: 5, C: 5, L: 3, A: 3 },
  fantasy: { E: 5, V: 5, F: 3 },
};

// 2. Artist Data
export const ARTISTS: Artist[] = [
  { id: '1', name: '羊文学', tags: ['night', 'emo', 'introspection'] },
  { id: '2', name: 'きのこ帝国', tags: ['emo', 'introspection', 'indie'] },
  { id: '3', name: '宇多田ヒカル', tags: ['minimal', 'soft', 'introspection'] },
  { id: '4', name: '米津玄師', tags: ['detail', 'fantasy', 'introspection'] },
  { id: '5', name: '荒谷翔大', tags: ['soft', 'introspection'] },
  { id: '6', name: 'ヨルシカ', tags: ['night', 'detail', 'fantasy'] },
  { id: '7', name: 'ずっと真夜中でいいのに。', tags: ['detail', 'fast', 'indie'] },
  { id: '8', name: 'Vaundy', tags: ['extro', 'fast', 'groove'] },
  { id: '9', name: 'あいみょん', tags: ['soft', 'pop', 'nostalgic'] },
  { id: '10', name: 'King Gnu', tags: ['city', 'detail', 'groove'] },
  { id: '11', name: 'yonawo', tags: ['night', 'soft', 'indie'] },
  { id: '12', name: 'サカナクション', tags: ['city', 'electro', 'dance'] },
  { id: '13', name: '星野源', tags: ['soft', 'pop', 'stable'] },
  { id: '14', name: 'Suchmos', tags: ['city', 'groove', 'soft'] },
  { id: '15', name: 'Awesome City Club', tags: ['pop', 'city', 'stable'] },
  { id: '16', name: 'Original Love', tags: ['nostalgic', 'stable', 'groove'] },
  { id: '17', name: 'Cero', tags: ['detail', 'groove', 'indie'] },
  { id: '18', name: 'Tatsuro Yamashita', tags: ['nostalgic', 'pop', 'stable'] },
  { id: '19', name: 'iri', tags: ['soft', 'groove', 'indie'] },
  { id: '20', name: 'Furutani Shota', tags: ['soft', 'introspection'] }, // Same as #5 roughly but listed separate in prompt
  { id: '21', name: 'XG', tags: ['dance', 'kpop', 'fast'] },
  { id: '22', name: 'Official髭男dism', tags: ['pop', 'stable', 'extro'] },
  { id: '23', name: 'Perfume', tags: ['electro', 'dance'] },
  { id: '24', name: 'NCT 127', tags: ['kpop', 'dance', 'fast'] },
  { id: '25', name: 'Ado', tags: ['fast', 'pop', 'extro'] },
  { id: '26', name: 'YOASOBI', tags: ['fast', 'pop', 'detail'] },
  { id: '27', name: 'Mrs. GREEN APPLE', tags: ['pop', 'stable', 'extro'] },
  { id: '28', name: 'SEKAI NO OWARI', tags: ['fantasy', 'emo', 'introspection'] },
  { id: '29', name: 'back number', tags: ['emo', 'soft', 'nostalgic'] },
  { id: '30', name: '緑黄色社会', tags: ['pop', 'extro', 'stable'] },
];

// 3. Questions (5 per axis, 20 total)
export const QUESTIONS: Question[] = [
  // A/R
  { id: 1, text: "休日は家でゆっくりするより、外出して誰かと会いたい。", axis: 'A/R', trend: 'A' },
  { id: 2, text: "自分の感情や考えを一人で深く掘り下げるのが好きだ。", axis: 'A/R', trend: 'R' },
  { id: 3, text: "大勢の人がいる場所に行くとエネルギーをもらえる。", axis: 'A/R', trend: 'A' },
  { id: 4, text: "会話では聞き役に回ることが多い。", axis: 'A/R', trend: 'R' },
  { id: 5, text: "思い立ったらすぐに行動に移すタイプだ。", axis: 'A/R', trend: 'A' },
  // C/V
  { id: 6, text: "抽象的なアイデアより、具体的な事実やデータを重視する。", axis: 'C/V', trend: 'C' },
  { id: 7, text: "将来の可能性や「もしも」の話をするのが好きだ。", axis: 'C/V', trend: 'V' },
  { id: 8, text: "物事の手順や細部にこだわる方だ。", axis: 'C/V', trend: 'C' },
  { id: 9, text: "現実的であることより、独創的であることに価値を感じる。", axis: 'C/V', trend: 'V' },
  { id: 10, text: "五感（見る、聞く、触れるなど）で直接感じられるものを信じる。", axis: 'C/V', trend: 'C' },
  // L/E
  { id: 11, text: "決断を下すときは、感情よりも論理的な整合性を優先する。", axis: 'L/E', trend: 'L' },
  { id: 12, text: "他人の感情に共感しやすく、もらい泣きすることもある。", axis: 'L/E', trend: 'E' },
  { id: 13, text: "議論では客観的な正しさが最も重要だと思う。", axis: 'L/E', trend: 'L' },
  { id: 14, text: "人々が仲良く過ごす調和を何よりも大切にする。", axis: 'L/E', trend: 'E' },
  { id: 15, text: "問題解決においては、効率と効果を最優先する。", axis: 'L/E', trend: 'L' },
  // P/F
  { id: 16, text: "旅行の計画は事前にしっかり立てておきたい。", axis: 'P/F', trend: 'P' },
  { id: 17, text: "締め切りギリギリまで作業に取り掛からないことがある。", axis: 'P/F', trend: 'F' },
  { id: 18, text: "整理整頓された環境でないと落ち着かない。", axis: 'P/F', trend: 'P' },
  { id: 19, text: "状況の変化に応じて柔軟に対応するのが得意だ。", axis: 'P/F', trend: 'F' },
  { id: 20, text: "一度決めたルールやルーチンは守りたい。", axis: 'P/F', trend: 'P' },
];

// 4. Type Definitions
export const TYPE_DEFINITIONS: Record<string, string> = {
  'ACLP': '現実的な指揮者',
  'ACLF': '即応性のある実行家',
  'AVLP': '緻密な革新者',
  'AVLF': '自由な発明家',
  'RCLP': '論理的な分析家',
  'RCLF': '冷静な職人',
  'RVLP': '知的な設計者',
  'RVLF': '探求心旺盛な哲学者',
  'ACEP': '社会的な管理者',
  'ACEF': '親しみやすい協力者',
  'AVEP': '洞察力のある指導者',
  'AVEF': '表現豊かな提唱者',
  'RCEP': '実践的な保護者',
  'RCEF': '温和な支持者',
  'RVEP': '調和を求める理想家',
  'RVEF': '共感的な仲介者',
};