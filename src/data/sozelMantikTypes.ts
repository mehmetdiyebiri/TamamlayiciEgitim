export interface SozelMantikOption {
  letter: string;
  text: string;
  isCorrect: boolean;
}

export interface SozelMantikSolutionStep {
  step: number;
  title: string;
  content: string;
}

export interface SozelMantikMatrix {
  title?: string;
  headers: string[];
  rows: string[][];
}

export interface SozelMantikItem {
  id: number;
  atolyeId: 1 | 2 | 3 | 4 | 5;
  atolyeTitle: string;
  questionNumber: number;
  title: string;
  category: string;
  context: string;
  premises: string[];
  questionStem: string;
  options: SozelMantikOption[];
  resultText: string;
  matrix: SozelMantikMatrix;
  solutionSteps: SozelMantikSolutionStep[];
  neuralBrake: string;
  cognitiveTime: string;
  synapticCoding: string;
}

export interface AtolyeMeta {
  id: 1 | 2 | 3 | 4 | 5;
  title: string;
  subtitle: string;
  description: string;
  fourSteps: string[];
  features: string[];
  questionCount: number;
}

export interface SozelMantikAtolyeMeta {
  id: number;
  title: string;
  subtitle: string;
  questionCount: number;
  difficulty: string;
  iconName: string;
  color: string;
}
