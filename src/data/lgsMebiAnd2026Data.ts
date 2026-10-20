import generatedTestsData from './lgsGeneratedTests.json';

export interface LgsTableData {
  headers: string[];
  rows: string[][];
}

export type LgsChartType = 
  | 'bar' 
  | 'grouped_bar' 
  | 'horizontal_bar' 
  | 'pie' 
  | 'multi_column';

export interface LgsChartItem {
  label: string;
  value?: number;
  displayValue?: string;
  color?: string;
  values?: { seriesName: string; value: number; color?: string; displayValue?: string }[];
}

export interface LgsChartData {
  type: LgsChartType;
  title: string;
  subtitle?: string;
  unit?: string;
  items: LgsChartItem[];
  seriesLabels?: { name: string; color: string }[];
  note?: string;
}

export interface LgsEntitiesData {
  title: string;
  items: string[];
}

export interface LgsLogicScenario {
  title?: string;
  setupText: string;
  itemsTitle?: string;
  items: string[];
  ruleIntro?: string;
  rules: string[];
  stem?: string;
}

export interface LgsGridSegment {
  from: string;
  to: string;
  type: 'solid' | 'dashed';
}

export interface LgsGridFigure {
  xLabels: string[];
  yLabels: string[];
  segments: LgsGridSegment[];
  points?: string[];
  label?: string;
  caption?: string;
}

export interface LgsGridQuestionData {
  type: 'grid_coordinate_coding';
  sampleCode?: string;
  gridSize?: { cols: number; rows: number };
  questionFigure?: LgsGridFigure;
  optionFigures?: {
    A: LgsGridFigure;
    B: LgsGridFigure;
    C: LgsGridFigure;
    D: LgsGridFigure;
  };
}

export interface LgsQuestion {
  id: number;
  testId?: string;
  questionNumberInTest?: number;
  testType: '2026_lgs' | 'mebi_lgs' | 'telafi_mantik';
  testTitle?: string;
  category: string;
  konu: string;
  badgeLabel: string; // e.g. '2026 LGS Benzeri' | 'MEBİ Deneme Sorusu'
  context: string;
  entities?: LgsEntitiesData;
  logicScenario?: LgsLogicScenario;
  tableData?: LgsTableData;
  tableMarkdown?: string;
  tableOrPremises?: string[];
  chartData?: LgsChartData;
  gridQuestionData?: LgsGridQuestionData;
  visualHint?: {
    type: 'badge' | 'table' | 'infographic' | 'quote';
    data?: string;
  };
  questionStem: string;
  options: string[];
  correctAnswer: number; // 0: A, 1: B, 2: C, 3: D
  explanation: string;
  strategyTip: string; // Taktik ve Çözüm İpucu
}

export interface LgsTestMeta {
  id: string; // e.g. 'lgs_test_1' ... 'lgs_test_10', 'mebi_test_1' ... 'mebi_test_10'
  testType: '2026_lgs' | 'mebi_lgs';
  testNumber: number; // 1 to 10
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  durationMinutes: number; // 15
  questionCount: number; // 10
  graphicQuestionCount: number; // At least 2 in every test
  questions: LgsQuestion[];
}

// -------------------------------------------------------------
// LOAD ALL 20 TESTS (10 LGS + 10 MEBİ)
// -------------------------------------------------------------
export const ALL_GENERATED_LGS_TESTS: LgsTestMeta[] = (generatedTestsData as unknown as LgsTestMeta[]);

// 10 Tests for 2026 LGS
export const LGS_2026_TEST_LIST: LgsTestMeta[] = ALL_GENERATED_LGS_TESTS.filter(t => t.testType === '2026_lgs');

// 10 Tests for MEBİ
export const MEBI_LGS_TEST_LIST: LgsTestMeta[] = ALL_GENERATED_LGS_TESTS.filter(t => t.testType === 'mebi_lgs');

// Flattened question arrays for quick access or backward compatibility
export const LGS_2026_SIMILAR_QUESTIONS: LgsQuestion[] = LGS_2026_TEST_LIST[0]?.questions || [];
export const MEBI_LGS_SIMILAR_QUESTIONS: LgsQuestion[] = MEBI_LGS_TEST_LIST[0]?.questions || [];

export const ALL_LGS_TRAINER_QUESTIONS: LgsQuestion[] = ALL_GENERATED_LGS_TESTS.flatMap(t => t.questions);

export function getLgsTestById(testId: string): LgsTestMeta | undefined {
  return ALL_GENERATED_LGS_TESTS.find(t => t.id === testId);
}
