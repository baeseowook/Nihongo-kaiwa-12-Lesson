import React, { useState } from 'react';
import { Clock, CheckSquare, Square, ArrowRight, HeartHandshake } from 'lucide-react';
import {
  LESSON_FLOW_STAGES,
  PEDAGOGY_GUIDELINES
} from '../data/curriculumData';
import { StudySectionTab } from './LessonStageView';

interface TutorGuideViewProps {
  onJumpToLessonStage: (tab: StudySectionTab) => void;
}

export const TutorGuideView: React.FC<TutorGuideViewProps> = ({
  onJumpToLessonStage
}) => {
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({
    0: true,
    1: true,
    2: true,
    3: true,
    4: true
  });
  const [viewMode, setViewMode] = useState<'both' | 'normal' | 'lowEnergy'>('both');

  const toggleCheck = (idx: number) => {
    setCheckedItems((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="text-xs font-semibold text-[#0284C7]">
              교수·학습 운영 가이드
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              2시간(120분) 수업을 부담 없이 운영하는 방법
            </h1>
            <p className="text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
              기존의 2시간 구조는 유지하되, 학생이 말하는 방식과 수업의 분위기를 유연하게 조정합니다.
              학생이 피곤하거나 말하기가 부담스러운 날에는 회화 활동 일부를 읽기, 문장 배열, 듣고 답 고르기 등으로 바꾸어
              배운 일본어를 꾸준히 익히고 사용할 수 있게 돕습니다.
            </p>
          </div>

          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg shrink-0">
            <button
              type="button"
              onClick={() => setViewMode('both')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                viewMode === 'both'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              전체 비교 보기
            </button>
            <button
              type="button"
              onClick={() => setViewMode('normal')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                viewMode === 'normal'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              일반 컨디션
            </button>
            <button
              type="button"
              onClick={() => setViewMode('lowEnergy')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                viewMode === 'lowEnergy'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              저부담(피곤한 날)
            </button>
          </div>
        </div>

        {/* 120-Minute Timetable */}
        <div className="overflow-x-auto border border-slate-200 rounded-lg">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600">
                <th className="py-3.5 px-4 whitespace-nowrap">배정 시간</th>
                <th className="py-3.5 px-4 whitespace-nowrap">단계 및 활동</th>
                <th className="py-3.5 px-4">기본 운영 방법</th>
                {(viewMode === 'both' || viewMode === 'normal') && (
                  <th className="py-3.5 px-4">일반 컨디션 가이드</th>
                )}
                {(viewMode === 'both' || viewMode === 'lowEnergy') && (
                  <th className="py-3.5 px-4">저부담 대체 활동 (피곤한 날)</th>
                )}
                <th className="py-3.5 px-4 text-right">교재 연동</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {LESSON_FLOW_STAGES.map((stage) => (
                <tr key={stage.step} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-4 px-4 align-top font-mono-tabular font-bold text-[#0284C7] whitespace-nowrap">
                    <div className="inline-flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{stage.durationMin}분</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 align-top font-semibold text-slate-900 whitespace-nowrap">
                    0{stage.step}. {stage.title}
                  </td>
                  <td className="py-4 px-4 align-top text-slate-700 font-medium">
                    {stage.method}
                  </td>
                  {(viewMode === 'both' || viewMode === 'normal') && (
                    <td className="py-4 px-4 align-top text-xs text-slate-600 leading-relaxed">
                      {stage.normalGuide}
                    </td>
                  )}
                  {(viewMode === 'both' || viewMode === 'lowEnergy') && (
                    <td className="py-4 px-4 align-top text-xs text-emerald-800 bg-emerald-50/40 leading-relaxed">
                      {stage.lowEnergyGuide}
                    </td>
                  )}
                  <td className="py-4 px-4 align-top text-right">
                    <button
                      type="button"
                      onClick={() => onJumpToLessonStage(stage.targetTab)}
                      className="px-3 py-1.5 text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-md transition-colors inline-flex items-center gap-1 whitespace-nowrap shrink-0"
                    >
                      <span>열기</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Two-Column Split: Tutor Mindfulness Checklist & Boundaries */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left 7 Cols: Interactive Tutor Checklist */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div>
              <div className="text-xs font-semibold text-[#0284C7]">
                수업 전·후 점검표
              </div>
              <h2 className="text-xl font-bold text-slate-900 mt-0.5">
                교사가 신경 쓰면 좋은 5가지 원칙
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                수업이 학생에게 또 하나의 평가나 부담처럼 느껴지지 않도록 아래 원칙을 체크하며 진행해 보세요.
              </p>
            </div>

            <div className="space-y-2.5">
              {PEDAGOGY_GUIDELINES.tutorChecklist.map((item, idx) => {
                const checked = !!checkedItems[idx];
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => toggleCheck(idx)}
                    className={`w-full p-4 rounded-xl border text-left transition-colors flex items-start gap-3 ${
                      checked
                        ? 'bg-sky-50/50 border-sky-200 text-slate-900'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {checked ? (
                      <CheckSquare className="w-4 h-4 text-[#0284C7] shrink-0 mt-0.5" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    )}
                    <span className="text-sm font-medium leading-relaxed">
                      {item}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>
              점검 완료: {Object.values(checkedItems).filter(Boolean).length} /{' '}
              {PEDAGOGY_GUIDELINES.tutorChecklist.length} 항목
            </span>
            <button
              type="button"
              onClick={() =>
                setCheckedItems({ 0: true, 1: true, 2: true, 3: true, 4: true })
              }
              className="text-[#0284C7] hover:underline font-medium"
            >
              모두 체크하기
            </button>
          </div>
        </div>

        {/* Right 5 Cols: Psychological Safety & Scope Note */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#059669]">
              <HeartHandshake className="w-5 h-5" />
              <span className="text-xs font-bold">심리적 안전감과 수업의 경계</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              익숙하고 예측 가능한 상황에서부터 천천히 넓히기
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              대인기피가 있다고 해서 모든 사회적 상황을 영구히 피해야 한다는 뜻은 아닙니다.
              다만 일본어 수업에서는 학생의 심리적 부담을 불필요하게 높일 이유가 없으므로,
              처음에는 <strong>익숙하고 예측 가능한 상황</strong>부터 다루고 학생이 편안해지면 선택적으로 주제를 넓히는 방식이 적절합니다.
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-2">
              <div className="text-xs font-bold text-slate-800">
                기본 교재에서 제외한 부담 주제
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                학교생활 · 출석 여부 · 성적 및 시험 · 또래 친구 관계 · 진로 압박 · 개인 사생활 추궁
              </p>
            </div>

            <div className="bg-amber-50/70 border border-amber-200/80 rounded-lg p-4 space-y-1.5">
              <div className="text-xs font-bold text-amber-900">
                전문 영역 구분 안내
              </div>
              <p className="text-xs text-amber-800 leading-relaxed">
                이러한 수업 방식은 일본어 학습에서 불필요한 심리적 부담을 줄이는 데 도움이 될 수 있습니다.
                다만 수업 중 불편함이 반복되거나 대인기피로 인한 어려움이 크다면, 일본어 과외가 전문적인 심리 상담이나 치료를 대신하지는 않는다는 점도 함께 구분해 두는 것이 좋습니다.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onJumpToLessonStage('grammar')}
            className="w-full py-2.5 px-4 text-xs font-medium bg-[#0F172A] text-white rounded-lg hover:bg-slate-800 transition-colors inline-flex items-center justify-center gap-1.5"
          >
            <span>현재 회차 수업 화면으로 돌아가기</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
