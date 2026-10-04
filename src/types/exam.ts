export type DifficultyLevel = 'Nhận biết' | 'Thông hiểu' | 'Vận dụng' | 'Vận dụng cao';

export interface SubItem {
  label: 'a' | 'b' | 'c' | 'd';
  text: string;
  is_true: boolean;
  reason?: string;
}

export interface QuestionOptions {
  A?: string;
  B?: string;
  C?: string;
  D?: string;
  [key: string]: string | undefined;
}

export interface Question {
  id: number;
  part: 1 | 2 | 3;
  level: DifficultyLevel;
  topic: string;
  question_text: string;
  options?: QuestionOptions;
  sub_items?: SubItem[];
  correct_answer: string;
  explanation: string;
  verified?: {
    is_valid: boolean;
    feedback_notes?: string;
    verified_answer?: string;
  };
}

export interface ExamData {
  exam_title: string;
  total_questions: number;
  grade?: string;
  matrix_summary?: string;
  questions: Question[];
}

export interface ExamResponse {
  preview_text: string;
  data: ExamData;
}

export interface ExamMatrixPreset {
  id: string;
  title: string;
  grade: '12' | '11' | '10';
  description: string;
  matrixText: string;
  sampleExamText: string;
  part1Count: number;
  part2Count: number;
  part3Count: number;
  distribution: {
    nb: number; // Nhận biết %
    th: number; // Thông hiểu %
    vd: number; // Vận dụng %
    vdc: number; // Vận dụng cao %
  };
}

export interface StudentAnswers {
  part1: Record<number, string>; // questionId -> 'A' | 'B' | 'C' | 'D'
  part2: Record<number, Record<'a' | 'b' | 'c' | 'd', boolean | null>>; // questionId -> { a: true, b: false }
  part3: Record<number, string>; // questionId -> '3.5'
}
