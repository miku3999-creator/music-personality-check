import React from 'react';
import { ARTISTS } from '../constants';

interface Props {
  selectedIds: string[];
  onToggle: (id: string) => void;
}

const ArtistSelector: React.FC<Props> = ({ selectedIds, onToggle }) => {
  return (
    <div className="w-full">
      <h2 className="text-xl md:text-2xl font-bold text-white mb-2">好きなアーティストを選んでください</h2>
      <p className="text-gray-400 mb-6 text-sm">最大10組まで選択可能です ({selectedIds.length}/10)</p>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {ARTISTS.map((artist) => {
          const isSelected = selectedIds.includes(artist.id);
          return (
            <button
              key={artist.id}
              onClick={() => onToggle(artist.id)}
              disabled={!isSelected && selectedIds.length >= 10}
              className={`
                p-3 rounded-lg text-sm font-medium transition-all duration-200 border
                ${isSelected 
                  ? 'bg-indigo-600 border-indigo-400 text-white shadow-[0_0_15px_rgba(99,102,241,0.5)]' 
                  : 'bg-slate-800 border-slate-700 text-gray-300 hover:bg-slate-700'
                }
                ${!isSelected && selectedIds.length >= 10 ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              {artist.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ArtistSelector;