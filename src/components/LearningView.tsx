import React, { useState, useMemo } from 'react';
import { KnowledgePoint } from '../data';
import { ArrowLeft, Search, Download, ChevronRight, ChevronDown, CheckCircle2, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Props {
  knowledgePoints: KnowledgePoint[];
  checkedItems: Set<string>;
  onToggleCheck: (id: string) => void;
  onBack: () => void;
  selectedPoint: KnowledgePoint | null;
  onSelectPoint: (point: KnowledgePoint) => void;
  onExport: () => void;
}

export default function LearningView({
  knowledgePoints,
  checkedItems,
  onToggleCheck,
  onBack,
  selectedPoint,
  onSelectPoint,
  onExport
}: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['数与代数']));
  const [expandedSubCategories, setExpandedSubCategories] = useState<Set<string>>(new Set());

  const toggleCategory = (cat: string) => {
    setExpandedCategories(prev => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  };

  const toggleSubCategory = (subCat: string) => {
    setExpandedSubCategories(prev => {
      const next = new Set(prev);
      if (next.has(subCat)) next.delete(subCat);
      else next.add(subCat);
      return next;
    });
  };

  const filteredPoints = useMemo(() => {
    if (!searchQuery.trim()) return knowledgePoints;
    const lowerQuery = searchQuery.toLowerCase();
    return knowledgePoints.filter(kp => 
      kp.name.toLowerCase().includes(lowerQuery) || 
      kp.category.toLowerCase().includes(lowerQuery) ||
      kp.subCategory.toLowerCase().includes(lowerQuery)
    );
  }, [knowledgePoints, searchQuery]);

  const treeData = useMemo(() => {
    const tree: Record<string, Record<string, KnowledgePoint[]>> = {};
    filteredPoints.forEach(kp => {
      if (!tree[kp.category]) tree[kp.category] = {};
      if (!tree[kp.category][kp.subCategory]) tree[kp.category][kp.subCategory] = [];
      tree[kp.category][kp.subCategory].push(kp);
    });
    return tree;
  }, [filteredPoints]);

  return (
    <div className="flex flex-col h-full bg-natural-bg relative">
      <header className="flex items-center justify-between px-6 py-4 bg-white z-10 shrink-0 shadow-sm md:hidden">
        <div className="flex items-center">
          <button 
            onClick={onBack}
            className="p-2 -ml-2 mr-2 text-natural-text-light hover:bg-natural-bg rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-lg font-bold text-natural-text-dark">学习目录</h2>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full md:w-[280px] bg-white border-r border-[#eee] flex flex-col p-6 shrink-0 h-[40vh] md:h-auto overflow-hidden">
          <div className="hidden md:flex items-center mb-6">
            <button 
              onClick={onBack}
              className="p-2 -ml-2 mr-2 text-natural-text-light hover:bg-natural-bg rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-bold text-natural-text-dark">学习目录</h2>
          </div>

          <div className="relative mb-6 shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-natural-text-light" />
            <input
              type="text"
              placeholder="搜索知识点..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-natural-bg border border-[#e0e0e0] rounded-xl text-sm text-natural-text-light focus:outline-none focus:border-natural-primary transition-colors"
            />
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
            {Object.entries(treeData).map(([category, subCategories]) => {
              const isCatExpanded = expandedCategories.has(category) || searchQuery.trim() !== '';
              
              return (
                <div key={category} className="mb-3">
                  <button
                    onClick={() => toggleCategory(category)}
                    className="w-full flex items-center gap-2 mb-2 text-natural-primary font-semibold text-sm hover:opacity-80 transition-opacity"
                  >
                    {isCatExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    📁 {category}
                  </button>

                  <AnimatePresence initial={false}>
                    {isCatExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="pl-5 border-l-[1.5px] border-dashed border-[#ddd] ml-2">
                          {Object.entries(subCategories).map(([subCategory, points]) => {
                            const isSubCatExpanded = expandedSubCategories.has(subCategory) || searchQuery.trim() !== '';
                            
                            return (
                              <div key={subCategory} className="mt-1">
                                <button
                                  onClick={() => toggleSubCategory(subCategory)}
                                  className="w-full flex items-center py-1 text-natural-text-dark text-[13px] hover:text-natural-primary transition-colors text-left"
                                >
                                  <div className="w-4 flex justify-center mr-1 text-[#aaa]">
                                    {isSubCatExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                                  </div>
                                  <span className="font-medium">{subCategory}</span>
                                </button>

                                <AnimatePresence initial={false}>
                                  {isSubCatExpanded && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: 'auto', opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      transition={{ duration: 0.2 }}
                                      className="overflow-hidden"
                                    >
                                      <div className="pl-5 py-1 space-y-1">
                                        {points.map(point => {
                                          const isChecked = checkedItems.has(point.id);
                                          const isSelected = selectedPoint?.id === point.id;
                                          
                                          return (
                                            <div
                                              key={point.id}
                                              className={`group flex items-center justify-between py-1.5 text-[13px] transition-all cursor-pointer rounded px-2 -ml-2 ${
                                                isSelected ? 'bg-natural-primary-light text-natural-primary font-medium' : 'text-natural-text-dark hover:bg-natural-bg'
                                              }`}
                                              onClick={() => onSelectPoint(point)}
                                            >
                                              <span className="truncate mr-2">{point.name}</span>
                                              <input 
                                                type="checkbox" 
                                                checked={isChecked}
                                                onChange={(e) => {
                                                  e.stopPropagation();
                                                  onToggleCheck(point.id);
                                                }}
                                                onClick={(e) => e.stopPropagation()}
                                                className="accent-natural-primary cursor-pointer w-3.5 h-3.5"
                                              />
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
            
            {Object.keys(treeData).length === 0 && (
              <div className="text-center py-10 text-natural-text-light text-sm">
                没有找到匹配的知识点
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-natural-bg relative flex flex-col h-[60vh] md:h-auto p-6 md:p-10">
          {selectedPoint ? (
            <div className="flex-1 flex flex-col bg-white rounded-[24px] shadow-natural-card overflow-hidden">
              <div className="p-6 border-b border-[#eee] flex justify-between items-center shrink-0">
                <div>
                  <h3 className="text-xl font-bold text-natural-text-dark">{selectedPoint.name}</h3>
                  <div className="flex items-center space-x-2 mt-2 text-xs text-natural-text-light">
                    <span className="bg-natural-bg px-2 py-1 rounded-md">{selectedPoint.category}</span>
                    <span>/</span>
                    <span className="bg-natural-bg px-2 py-1 rounded-md">{selectedPoint.subCategory}</span>
                    <span>/</span>
                    <span className="bg-natural-accent-blue-light text-natural-accent-blue px-2 py-1 rounded-md">{selectedPoint.grade}</span>
                  </div>
                </div>
                <button
                  onClick={() => onToggleCheck(selectedPoint.id)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center ${
                    checkedItems.has(selectedPoint.id)
                      ? 'bg-natural-primary-light text-natural-primary'
                      : 'bg-natural-primary text-white shadow-md hover:-translate-y-0.5'
                  }`}
                >
                  {checkedItems.has(selectedPoint.id) ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 mr-1.5" />
                      已掌握
                    </>
                  ) : (
                    '标记为已掌握'
                  )}
                </button>
              </div>
              <div className="flex-1 bg-natural-bg p-6 overflow-hidden">
                <div className="w-full h-full bg-white rounded-2xl shadow-sm border border-[#eee] overflow-hidden relative">
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                    <div className="w-20 h-20 bg-natural-primary-light rounded-full flex items-center justify-center mb-6">
                      <BookOpen className="w-8 h-8 text-natural-primary" />
                    </div>
                    <h4 className="text-xl font-bold text-natural-text-dark mb-2">{selectedPoint.name}</h4>
                    <p className="text-natural-text-light max-w-md text-sm">
                      这里将加载 <code>./knowledge/{selectedPoint.name}.html</code> 的内容。
                    </p>
                  </div>
                  <iframe 
                    src={`./knowledge/${encodeURIComponent(selectedPoint.name)}.html`}
                    className="w-full h-full border-0 relative z-10 opacity-0 transition-opacity duration-500"
                    title={selectedPoint.name}
                    onLoad={(e) => {
                      try {
                        const iframeDoc = (e.target as HTMLIFrameElement).contentDocument;
                        if (iframeDoc && iframeDoc.title !== 'Error') {
                          (e.target as HTMLIFrameElement).style.opacity = '1';
                        }
                      } catch (err) {
                        // Cross-origin or other error
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-natural-text-light p-8">
              <div className="w-24 h-24 mb-6 opacity-20">
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M50 10C27.9086 10 10 27.9086 10 50C10 72.0914 27.9086 90 50 90C72.0914 90 90 72.0914 90 50C90 27.9086 72.0914 10 50 10Z" stroke="currentColor" strokeWidth="8"/>
                  <path d="M50 30V50L65 65" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="text-lg font-medium">请在左侧选择一个知识点开始学习</p>
            </div>
          )}
        </div>
      </div>

      {/* Export Button */}
      <button
        onClick={onExport}
        className="absolute bottom-6 right-6 md:bottom-10 md:right-10 bg-[#444] text-white px-5 py-2.5 rounded-xl text-[13px] flex items-center gap-2 cursor-pointer shadow-lg hover:bg-[#333] transition-colors z-20"
      >
        <Download className="w-4 h-4" />
        <span className="hidden sm:inline">导出未学课程表 (CSV)</span>
        <span className="sm:hidden">导出</span>
      </button>
    </div>
  );
}
