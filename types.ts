export type Axis = 'A/R' | 'C/V' | 'L/E' | 'P/F';
export type Trend = 'A' | 'R' | 'C' | 'V' | 'L' | 'E' | 'P' | 'F';

export interface Question {
  id: number;
  text: string;
  axis: Axis;
  trend: Trend; // The direction the question measures
}

export interface Artist {
  id: string;
  name: string;
  tags: string[];
}

export interface TagScores {
  R?: number;
  E?: number;
  P?: number;
  V?: number;
  F?: number;
  C?: number;
  L?: number;
  A?: number;
}

export interface Matrix {
  [key: string]: TagScores;
}

export interface TypeResult {
  code: string;
  typeName: string;
}

export interface FinalResult {
  code: string;
  typeName: string;
  title: string;
  body: string;
  imagePrompt: string;
  imageUrl?: string;
  rawScores: {
    FinalAvgA: number;
    FinalAvgC: number;
    FinalAvgL: number;
    FinalAvgP: number;
  };
}
