import React from 'react';
import { ArtStyle } from '../types';

interface StyleCardProps {
  styleItem: ArtStyle;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
  onOpenDetails?: (styleItem: ArtStyle) => void;
  index: number;
  isKioskMode?: boolean;
}

export const StyleCard: React.FC<StyleCardProps> = ({
  styleItem,
  isSelected,
  onToggleSelect,
  index,
  isKioskMode = false,
}) => {
  const handleClick = () => {
    onToggleSelect(styleItem.id);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onToggleSelect(styleItem.id);
    }
  };

  return (
    <div
      id={`style-card-${styleItem.id}`}
      role="checkbox"
      aria-checked={isSelected}
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={`group relative flex flex-col cursor-pointer select-none rounded-2xl md:rounded-2xl lg:rounded-3xl p-2.5 sm:p-3 md:p-3 transition-all duration-300 transform-gpu touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 ${
        isSelected
          ? 'bg-[#0f1720]/95 ring-2 ring-teal-400 border-teal-400/90 shadow-[0_0_24px_rgba(20,184,166,0.4)] scale-[1.01]'
          : 'bg-[#0d1117]/80 hover:bg-[#131b23]/95 border border-white/10 hover:border-teal-500/40 hover:scale-[1.01] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-teal-500/10'
      } ${
        isKioskMode ? 'p-3.5 rounded-3xl' : ''
      }`}
      style={{
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        animationDelay: `${index * 50}ms`,
      }}
    >
      {/* Active Glowing Highlight Overlay */}
      {isSelected && (
        <div className="absolute inset-0 rounded-2xl md:rounded-3xl bg-gradient-to-b from-teal-500/15 via-emerald-500/10 to-transparent pointer-events-none" />
      )}

      {/* Top Image Container */}
      <div className="relative w-full aspect-[4/3] sm:aspect-square overflow-hidden rounded-xl sm:rounded-2xl bg-black/80 mb-3">
        {/* Main Artwork Thumbnail */}
        <img
          src={styleItem.imageUrl}
          alt={styleItem.name}
          referrerPolicy="no-referrer"
          loading="lazy"
          className={`w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 ${
            isSelected ? 'scale-105 filter brightness-105' : 'filter brightness-95'
          }`}
        />

        {/* Ambient Darkened Gradient Scrim for Visual Depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
      </div>

      {/* Card Body: Left-aligned Title, Subtitle and Tags */}
      <div className="flex flex-col flex-grow text-left px-0.5">
        <h3
          className={`text-sm sm:text-base font-bold tracking-wide transition-colors duration-200 truncate ${
            isSelected ? 'text-white drop-shadow-[0_0_12px_rgba(20,184,166,0.6)]' : 'text-slate-100 group-hover:text-teal-200'
          }`}
        >
          {styleItem.name}
        </h3>
        
        {/* Strictly single-line description */}
        <p className="text-xs text-slate-400 font-normal truncate mt-1 leading-tight">
          {styleItem.description}
        </p>

        {/* Tag Pills (Matching reference design pills) */}
        {styleItem.tags && styleItem.tags.length > 0 && (
          <div className="flex items-center gap-1.5 mt-2.5 overflow-hidden">
            {styleItem.tags.slice(0, 2).map((tag, idx) => (
              <span
                key={idx}
                className={`px-2 py-0.5 rounded-md text-[10px] font-semibold whitespace-nowrap tracking-wide uppercase transition-colors ${
                  idx === 0
                    ? 'bg-teal-500/15 text-teal-300 border border-teal-500/25'
                    : 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/25'
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
