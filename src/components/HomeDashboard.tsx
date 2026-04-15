import React from 'react';
import { KnowledgePoint } from '../data';
import { motion } from 'motion/react';

interface Props {
  knowledgePoints: KnowledgePoint[];
  checkedItems: Set<string>;
  onEnterLearning: () => void;
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  '数与代数': <span className="text-2xl">123</span>,
  '几何': <span className="text-2xl">📐</span>,
  '统计与概率': <span className="text-2xl">📊</span>,
  '解决问题': <span className="text-2xl">🛠️</span>,
};

const CATEGORY_STYLES: Record<string, { bg: string, color: string, fill: string }> = {
  '数与代数': { bg: 'bg-[#e8f5e9]', color: 'text-[#4caf50]', fill: 'bg-[#4caf50]' },
  '几何': { bg: 'bg-[#e3f2fd]', color: 'text-[#2196f3]', fill: 'bg-[#2196f3]' },
  '统计与概率': { bg: 'bg-[#fff3e0]', color: 'text-[#ff9800]', fill: 'bg-[#ff9800]' },
  '解决问题': { bg: 'bg-[#f3e5f5]', color: 'text-[#9c27b0]', fill: 'bg-[#9c27b0]' },
};

export default function HomeDashboard({ knowledgePoints, checkedItems, onEnterLearning }: Props) {
  const totalPoints = knowledgePoints.length;
  const learnedPoints = checkedItems.size;
  const overallProgress = totalPoints === 0 ? 0 : Math.round((learnedPoints / totalPoints) * 100);

  const categories = ['数与代数', '几何', '统计与概率', '解决问题'];

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-10 flex flex-col gap-8 h-full">
      {/* Header Progress */}
      <div className="flex items-center gap-6 bg-white py-6 px-8 rounded-[32px] shadow-natural-card">
        <div className="relative w-20 h-20 shrink-0">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="36" fill="none" stroke="#eee" strokeWidth="6" />
            <motion.circle
              cx="40"
              cy="40"
              r="36"
              fill="none"
              stroke="var(--color-natural-primary)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 36}`}
              initial={{ strokeDashoffset: 2 * Math.PI * 36 }}
              animate={{ strokeDashoffset: 2 * Math.PI * 36 * (1 - overallProgress / 100) }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-bold text-natural-primary">{overallProgress}%</span>
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-natural-text-dark mb-1">欢迎回来，小小数学家！</h1>
          <p className="text-sm text-natural-text-light">全书共 {totalPoints} 个知识点，你已经掌握了 {learnedPoints} 个。继续加油！</p>
        </div>
      </div>

      {/* Hero Section */}
      <div className="text-center bg-gradient-to-br from-natural-primary to-[#81c784] rounded-[32px] p-12 text-white shadow-natural-hero relative overflow-hidden">
        <div className="absolute -top-5 -right-5 w-[150px] h-[150px] bg-white/10 rounded-full"></div>
        <h2 className="text-3xl font-bold relative z-10">准备好迎接新挑战了吗？</h2>
        <p className="opacity-90 my-2 mb-6 relative z-10">点击下方按钮，开始今天的提前学之旅</p>
        <button
          onClick={onEnterLearning}
          className="relative z-10 bg-white text-natural-primary border-none px-12 py-4 rounded-[20px] text-xl font-bold cursor-pointer shadow-natural-btn hover:-translate-y-1 transition-transform inline-flex items-center"
        >
          进入提前学目录 →
        </button>
      </div>

      {/* Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 flex-1">
        {categories.map((category, idx) => {
          const categoryPoints = knowledgePoints.filter(kp => kp.category === category);
          const categoryTotal = categoryPoints.length;
          const categoryLearned = categoryPoints.filter(kp => checkedItems.has(kp.id)).length;
          const progress = categoryTotal === 0 ? 0 : (categoryLearned / categoryTotal) * 100;
          const style = CATEGORY_STYLES[category];

          return (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-[24px] p-6 shadow-natural-card border-2 border-transparent hover:border-natural-primary-light transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${style.bg} ${style.color}`}>
                    {CATEGORY_ICONS[category]}
                  </div>
                  <div className="font-semibold text-lg text-natural-text-dark">{category}</div>
                </div>
                <div className="text-[13px] text-natural-text-light flex justify-between mb-2">
                  <span>学习进度</span>
                  <span>{categoryLearned} / {categoryTotal}</span>
                </div>
                <div className="bg-[#eee] h-2.5 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${style.fill}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
