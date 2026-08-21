import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Filter, Search, SlidersHorizontal, Check } from 'lucide-react';
import { ART_STYLES } from './data/styles';
import { ArtStyle, SelectionMode, GenerationSettings } from './types';
import { StyleCard } from './components/StyleCard';
import { Header } from './components/Header';
import { BottomBar } from './components/BottomBar';
import { GenerationModal } from './components/GenerationModal';
import { StyleDetailModal } from './components/StyleDetailModal';

export default function App() {
  // State management
  const [selectedIds, setSelectedIds] = useState<string[]>(['anime_manga', 'cyberpunk_future']);
  const [selectionMode, setSelectionMode] = useState<SelectionMode>('multiple');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isKioskMode, setIsKioskMode] = useState<boolean>(false);
  
  // Modals state
  const [isGenModalOpen, setIsGenModalOpen] = useState<boolean>(false);
  const [inspectingStyle, setInspectingStyle] = useState<ArtStyle | null>(null);

  // Generation Settings State
  const [settings, setSettings] = useState<GenerationSettings>({
    aspectRatio: '1:1',
    quality: 'hd',
    prompt: '东方意境与未来科技的交融插画，光影流转，大师级细节',
    negativePrompt: 'low quality, blurry, distorted, bad anatomy',
    styleStrength: 0.85,
  });

  // Auto detect 1920x1080 screen resolution or large touch kiosk
  useEffect(() => {
    const checkKioskResolution = () => {
      const is1080p = window.innerWidth >= 1800 && window.innerHeight >= 950;
      if (is1080p && !isKioskMode) {
        setIsKioskMode(true);
      }
    };
    checkKioskResolution();
    window.addEventListener('resize', checkKioskResolution);
    return () => window.removeEventListener('resize', checkKioskResolution);
  }, []);

  // Filter styles based on category and search
  const filteredStyles = ART_STYLES.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.enName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Selection handlers
  const handleToggleSelect = (id: string) => {
    if (selectionMode === 'single') {
      setSelectedIds([id]);
      return;
    }

    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedIds(ART_STYLES.map((s) => s.id));
  };

  const handleClearAll = () => {
    setSelectedIds([]);
  };

  const handleToggleSelectionMode = () => {
    setSelectionMode((prev) => {
      const nextMode = prev === 'multiple' ? 'single' : 'multiple';
      if (nextMode === 'single' && selectedIds.length > 1) {
        setSelectedIds([selectedIds[0]]);
      }
      return nextMode;
    });
  };

  const selectedStylesList = ART_STYLES.filter((item) => selectedIds.includes(item.id));

  return (
    <div
      id="app-container"
      className="relative min-h-screen w-full bg-[#07090e] text-slate-100 flex flex-col font-sans overflow-y-auto pb-28 sm:pb-32 transition-all duration-300 select-none"
    >
      {/* Dynamic Ambient Glowing Background Spotlights */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Deep Jet Black / Charcoal Base */}
        <div className="absolute inset-0 bg-[#07090e]" />
        
        {/* Subtle Top-Center Cyan-Teal Bloom */}
        <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[750px] h-[500px] bg-teal-500/12 rounded-full blur-[140px] pointer-events-none" />
        
        {/* Soft Emerald Side Glow */}
        <div className="absolute top-1/3 -left-[10%] w-[500px] h-[500px] bg-emerald-600/8 rounded-full blur-[160px] pointer-events-none" />
        
        {/* Subtle Cyan Bottom Right Glow */}
        <div className="absolute bottom-10 -right-[10%] w-[450px] h-[450px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

        {/* Delicate Grid Texture */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 flex flex-col max-w-5xl md:max-w-6xl mx-auto w-full">
        {/* Top Header */}
        <Header
          onResetSelection={handleClearAll}
          selectedCount={selectedIds.length}
          totalCount={ART_STYLES.length}
        />

        {/* Category Filter Pills & Search (Consistent Height & Responsive) */}
        <div className="px-3 sm:px-6 mb-2 sm:mb-2.5 flex items-center justify-between gap-2 overflow-x-auto scrollbar-none">
          <div className="h-8 sm:h-9 flex items-center gap-1 sm:gap-1.5 p-1 bg-[#0d1219]/80 rounded-xl sm:rounded-2xl border border-white/10 backdrop-blur-md">
            {[
              { id: 'all', label: '全部风格' },
              { id: 'traditional', label: '东方国风' },
              { id: 'anime', label: '二次元' },
              { id: '3d', label: '3D与Q版' },
              { id: 'classic', label: '油画像素' },
              { id: 'scifi', label: '未来科幻' },
              { id: 'sketch', label: '手绘线稿' },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`h-full flex items-center px-2.5 sm:px-3 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-semibold whitespace-nowrap transition-all touch-manipulation ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-teal-400 to-emerald-400 text-slate-950 font-bold shadow-sm shadow-teal-500/20'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input with matching height */}
          <div className="hidden md:flex h-8 sm:h-9 items-center gap-2 px-3 bg-[#0d1219]/80 rounded-xl sm:rounded-2xl border border-white/10 backdrop-blur-md">
            <Search className="w-3.5 h-3.5 text-teal-400 flex-shrink-0" />
            <input
              type="text"
              placeholder="搜索画风..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-full bg-transparent text-xs text-slate-200 placeholder-slate-500 focus:outline-none w-24 focus:w-36 transition-all"
            />
          </div>
        </div>

        {/* 9 Cards Grid Matrix */}
        <main
          id="styles-matrix"
          className={`flex-1 px-3 sm:px-6 transition-all duration-300 ${
            isKioskMode
              ? 'xl:flex xl:flex-col xl:justify-center'
              : ''
          }`}
        >
          <div
            className={`grid grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-3.5 md:gap-4 ${
              isKioskMode ? 'xl:grid-cols-3 xl:gap-5' : ''
            }`}
          >
            {filteredStyles.map((styleItem, index) => {
              const isSelected = selectedIds.includes(styleItem.id);
              return (
                <StyleCard
                  key={styleItem.id}
                  styleItem={styleItem}
                  isSelected={isSelected}
                  onToggleSelect={handleToggleSelect}
                  onOpenDetails={(item) => setInspectingStyle(item)}
                  index={index}
                  isKioskMode={isKioskMode}
                />
              );
            })}
          </div>

          {filteredStyles.length === 0 && (
            <div className="flex flex-col items-center justify-center p-12 text-center rounded-3xl bg-[#0d1219]/60 border border-white/10 mt-4">
              <Sparkles className="w-8 h-8 text-teal-400 mb-2 opacity-50" />
              <p className="text-sm font-semibold text-slate-300">未找到匹配的艺术风格</p>
              <button
                type="button"
                onClick={() => {
                  setActiveCategory('all');
                  setSearchQuery('');
                }}
                className="mt-3 px-4 py-1.5 rounded-full bg-teal-500/20 text-teal-300 text-xs border border-teal-500/30"
              >
                重置筛选条件
              </button>
            </div>
          )}

          {/* Futuristic Decorative Bottom Divider (Honoring the Chevron Arrows in Reference Image) */}
          <div className="relative my-3 sm:my-5 flex items-center justify-between text-slate-600/70 select-none">
            <div className="flex items-center gap-0.5 text-[10px] text-teal-400/60 tracking-tighter">
              <ChevronLeft className="w-3.5 h-3.5 -mr-2" />
              <ChevronLeft className="w-3.5 h-3.5 -mr-2" />
              <ChevronLeft className="w-3.5 h-3.5" />
            </div>

            <div className="flex-1 mx-3 h-px bg-gradient-to-r from-teal-500/20 via-teal-400/50 to-teal-500/20" />

            <div className="flex items-center gap-0.5 text-[10px] text-teal-400/60 tracking-tighter">
              <ChevronRight className="w-3.5 h-3.5 -mr-2" />
              <ChevronRight className="w-3.5 h-3.5 -mr-2" />
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </main>

        {/* Bottom Floating Action Bar with Dynamic Generate Count */}
        <BottomBar
          selectedStyles={selectedStylesList}
          totalStylesCount={ART_STYLES.length}
          onSelectAll={handleSelectAll}
          onClearAll={handleClearAll}
          onOpenGenerate={() => setIsGenModalOpen(true)}
          settings={settings}
          onUpdateSettings={(newSettings) => setSettings((prev) => ({ ...prev, ...newSettings }))}
          isKioskMode={isKioskMode}
        />
      </div>

      {/* AI Generation Simulation Modal */}
      <GenerationModal
        isOpen={isGenModalOpen}
        onClose={() => setIsGenModalOpen(false)}
        selectedStyles={selectedStylesList}
        settings={settings}
      />

      {/* Style Detailed Inspector Modal */}
      <StyleDetailModal
        styleItem={inspectingStyle}
        isSelected={inspectingStyle ? selectedIds.includes(inspectingStyle.id) : false}
        onToggleSelect={handleToggleSelect}
        onClose={() => setInspectingStyle(null)}
      />
    </div>
  );
}
