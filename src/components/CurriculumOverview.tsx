import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Star } from 'lucide-react';
import {
  CURRICULUM_SESSIONS,
  CurriculumSession,
  PEDAGOGY_GUIDELINES
} from '../data/curriculumData';

interface CurriculumOverviewProps {
  currentSessionId: number;
  onSelectSession: (sessionId: number) => void;
  completedSessions: number[];
  onToggleCompleteSession: (sessionId: number) => void;
  favoriteSessionIds: number[];
  onToggleFavoriteSession: (sessionId: number) => void;
}

export const CurriculumOverview: React.FC<CurriculumOverviewProps> = ({
  currentSessionId,
  onSelectSession,
  completedSessions,
  onToggleCompleteSession,
  favoriteSessionIds,
  onToggleFavoriteSession
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const categories = [
    { id: 'all', label: '전체 12회차' },
    { id: 'favorite', label: `학생 선호 주제 (${favoriteSessionIds.length})` },
    { id: '집과 일상', label: '집과 일상' },
    { id: '콘텐츠', label: '콘텐츠·취향' },
    { id: '음식', label: '음식·요리' },
    { id: '인터넷', label: '온라인·인터넷' }
  ];

  const filteredSessions = CURRICULUM_SESSIONS.filter((s) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'favorite') return favoriteSessionIds.includes(s.id);
    if (selectedFilter === '콘텐츠') {
      return s.themeCategory === '콘텐츠' || s.themeCategory === '취향과 관심사';
    }
    return s.themeCategory === selectedFilter;
  });

  return (
    <div className="space-y-8">
      {/* Curriculum Design Direction Summary */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <div className="text-xs text-[#0284C7] font-semibold">
              맞춤형 12회차 커리큘럼 설계
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              편안한 일상과 개인의 관심사로 배우는 일본어
            </h1>
            <p className="text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
              학교생활, 출석, 성적, 또래 관계, 진로 압박 등 심리적 부담이 될 수 있는 주제를 제외하고,
              집에서 보내는 시간·좋아하는 콘텐츠·음식·취미·인터넷·상상 여행만으로 필수 문법과 회화를 균형 있게 익힙니다.
            </p>
          </div>
          <div className="text-xs text-slate-500 font-mono-tabular shrink-0">
            진도 현황: {completedSessions.length} / 12 회차 완료 · 관심 주제 {favoriteSessionIds.length}개
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {PEDAGOGY_GUIDELINES.recommendedDirections.map((dir, idx) => (
            <div
              key={idx}
              className="bg-slate-50/80 border border-slate-200/80 rounded-lg p-3.5"
            >
              <div className="text-xs font-bold text-slate-900">
                0{idx + 1}. {dir.label}
              </div>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                {dir.detail}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 p-1 bg-slate-200/70 rounded-lg overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedFilter(cat.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                selectedFilter === cat.id
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="text-xs text-slate-500">
          반응이 좋은 주제는 ★ 표시를 눌러 다음 수업 어휘·회화 확장에 반영해 보세요.
        </div>
      </div>

      {/* 12 Session Cards Grid */}
      {filteredSessions.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-10 text-center space-y-3">
          <p className="text-sm text-slate-600">
            아직 추가된 학생 선호 주제가 없습니다. 각 회차 카드 우측 상단의 ★ 아이콘이나 수업 교재 내 [☆ 관심 주제로 표시] 버튼을 눌러 추가해 보세요.
          </p>
          <button
            type="button"
            onClick={() => setSelectedFilter('all')}
            className="px-4 py-2 text-xs font-medium bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            전체 12회차 보기로 돌아가기
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSessions.map((session: CurriculumSession) => {
            const isCurrent = session.id === currentSessionId;
            const isCompleted = completedSessions.includes(session.id);
            const isFav = favoriteSessionIds.includes(session.id);

            return (
              <div
                key={session.id}
                className={`bg-white rounded-xl border p-5 flex flex-col justify-between transition-colors ${
                  isCurrent
                    ? 'border-[#0284C7] ring-1 ring-[#0284C7]/20'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div>
                  {/* Clean unboxed metadata header */}
                  <div className="flex items-center justify-between gap-2 text-xs text-slate-500 pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono-tabular font-bold text-[#0284C7]">
                        {session.code}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{session.themeCategory}</span>
                      {isCurrent && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="font-semibold text-[#0284C7]">
                            현재 학습 중
                          </span>
                        </>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onToggleFavoriteSession(session.id)}
                        className={`p-1 rounded transition-colors ${
                          isFav
                            ? 'text-amber-500 hover:text-amber-600'
                            : 'text-slate-300 hover:text-slate-500'
                        }`}
                        title="학생 반응이 좋은 주제로 표시"
                      >
                        <Star className="w-4 h-4 fill-current" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onToggleCompleteSession(session.id)}
                        className={`p-1 rounded transition-colors ${
                          isCompleted
                            ? 'text-emerald-600 hover:text-emerald-700'
                            : 'text-slate-300 hover:text-slate-500'
                        }`}
                        title="수업 완료 표시"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Title & Goal */}
                  <div className="mt-3.5">
                    <h2 className="text-lg font-bold text-slate-900">
                      {session.code}. {session.titleKr}
                    </h2>
                    <div className="text-xs text-slate-500 font-jp mt-0.5">
                      {session.titleJp}
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-slate-100 space-y-2 text-xs">
                    <div>
                      <span className="text-slate-400">핵심 문법: </span>
                      <span className="font-jp font-semibold text-slate-800">
                        {session.grammarSummary}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400">회화 목표: </span>
                      <span className="font-medium text-slate-700">
                        {session.learningGoal}
                      </span>
                    </div>
                  </div>

                  <p className="mt-3 text-xs text-slate-500 leading-relaxed">
                    {session.comfortNote}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <span className="text-xs text-slate-500 font-mono-tabular">
                    어휘 {session.vocabulary.length} · 문법 {session.grammarPoints.length}
                  </span>
                  <button
                    type="button"
                    onClick={() => onSelectSession(session.id)}
                    className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-colors inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                      isCurrent
                        ? 'bg-[#0284C7] text-white hover:bg-[#0369A1]'
                        : 'bg-slate-900 text-white hover:bg-slate-800'
                    }`}
                  >
                    <span>이 회차 교재 열기</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
