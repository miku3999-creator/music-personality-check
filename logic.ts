import { ARTISTS, TAG_MATRIX, QUESTIONS, TYPE_DEFINITIONS } from '../constants';
import { Artist, TagScores } from '../types';

interface CalculatedScores {
  FinalAvgA: number;
  FinalAvgC: number;
  FinalAvgL: number;
  FinalAvgP: number;
}

export const calculateResults = (
  selectedArtistIds: string[],
  answers: Record<number, number>
): { code: string; typeName: string; rawScores: CalculatedScores } => {
  
  // 1. Calculate Question Scores
  // 5 questions per axis. Score 1-5.
  // Trends R, V, E, F need to be reversed (6 - score).
  const axisSums = { A: 0, C: 0, L: 0, P: 0 };
  const axisCounts = { A: 0, C: 0, L: 0, P: 0 };

  QUESTIONS.forEach((q) => {
    let score = answers[q.id] || 3; // Default to neutral if missing
    
    // Reverse logic if trend is Right-side
    if (['R', 'V', 'E', 'F'].includes(q.trend)) {
      score = 6 - score;
    }

    // Map to Left-side key for accumulation
    const keyMap: Record<string, keyof typeof axisSums> = {
      'A/R': 'A',
      'C/V': 'C',
      'L/E': 'L',
      'P/F': 'P'
    };
    
    const axisKey = keyMap[q.axis];
    axisSums[axisKey] += score;
    axisCounts[axisKey] += 1;
  });

  const questionAvgs = {
    A: axisSums.A / 5,
    C: axisSums.C / 5,
    L: axisSums.L / 5,
    P: axisSums.P / 5,
  };

  // 2. Calculate Artist Influence
  const selectedArtists = ARTISTS.filter(a => selectedArtistIds.includes(a.id));
  const totalTagsScore: TagScores = { R: 0, E: 0, P: 0, V: 0, F: 0, C: 0, L: 0, A: 0 };

  selectedArtists.forEach(artist => {
    artist.tags.forEach(tag => {
      const matrix = TAG_MATRIX[tag];
      if (matrix) {
        (Object.keys(matrix) as Array<keyof TagScores>).forEach(key => {
          totalTagsScore[key] = (totalTagsScore[key] || 0) + (matrix[key] || 0);
        });
      }
    });
  });

  // Influence = (Left - Right) / (MaxArtists * 5) -> Denom = 50
  const denom = 50;
  
  const influence = {
    A: ((totalTagsScore.A || 0) - (totalTagsScore.R || 0)) / denom,
    C: ((totalTagsScore.C || 0) - (totalTagsScore.V || 0)) / denom,
    L: ((totalTagsScore.L || 0) - (totalTagsScore.E || 0)) / denom,
    P: ((totalTagsScore.P || 0) - (totalTagsScore.F || 0)) / denom,
  };

  // 3. Final Calculation
  const finalScores = {
    FinalAvgA: questionAvgs.A + influence.A,
    FinalAvgC: questionAvgs.C + influence.C,
    FinalAvgL: questionAvgs.L + influence.L,
    FinalAvgP: questionAvgs.P + influence.P,
  };

  // 4. Determine Code
  // Threshold 3.0. If >= 3.0 Left, else Right.
  const codeArr = [
    finalScores.FinalAvgA >= 3.0 ? 'A' : 'R',
    finalScores.FinalAvgC >= 3.0 ? 'C' : 'V',
    finalScores.FinalAvgL >= 3.0 ? 'L' : 'E',
    finalScores.FinalAvgP >= 3.0 ? 'P' : 'F',
  ];

  const code = codeArr.join('');
  const typeName = TYPE_DEFINITIONS[code] || 'Unknown Type';

  return {
    code,
    typeName,
    rawScores: finalScores
  };
};