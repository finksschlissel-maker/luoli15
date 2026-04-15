import React, { useState, useEffect, useMemo } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { csvData, parseCSV, KnowledgePoint } from './data';
import HomeDashboard from './components/HomeDashboard';
import LearningView from './components/LearningView';

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'learning'>('home');
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [selectedPoint, setSelectedPoint] = useState<KnowledgePoint | null>(null);

  const knowledgePoints = useMemo(() => parseCSV(csvData), []);

  useEffect(() => {
    const saved = localStorage.getItem('math-checked-items');
    if (saved) {
      try {
        setCheckedItems(new Set(JSON.parse(saved)));
      } catch (e) {
        console.error('Failed to load checked items', e);
      }
    }
  }, []);

  const handleToggleCheck = (id: string) => {
    setCheckedItems(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      localStorage.setItem('math-checked-items', JSON.stringify(Array.from(next)));
      return next;
    });
  };

  const handleExportCSV = () => {
    const unchecked = knowledgePoints.filter(kp => !checkedItems.has(kp.id));
    const csvContent = [
      ['分类', '子分类', '知识点名称', '对应年级'],
      ...unchecked.map(kp => [kp.category, kp.subCategory, kp.name, kp.grade])
    ].map(e => e.join(",")).join("\n");

    const blob = new Blob(["\ufeff" + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "未学知识点课程表.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-natural-bg text-natural-text-dark font-sans selection:bg-natural-primary-light">
      <AnimatePresence mode="wait">
        {currentView === 'home' ? (
          <motion.div
            key="home"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen"
          >
            <HomeDashboard
              knowledgePoints={knowledgePoints}
              checkedItems={checkedItems}
              onEnterLearning={() => setCurrentView('learning')}
            />
          </motion.div>
        ) : (
          <motion.div
            key="learning"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="h-screen flex flex-col"
          >
            <LearningView
              knowledgePoints={knowledgePoints}
              checkedItems={checkedItems}
              onToggleCheck={handleToggleCheck}
              onBack={() => setCurrentView('home')}
              selectedPoint={selectedPoint}
              onSelectPoint={setSelectedPoint}
              onExport={handleExportCSV}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
