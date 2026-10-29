import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  Check,
  Clock,
  UserCheck,
  Sliders,
  X
} from 'lucide-react';
import {
  CURRICULUM_SESSIONS,
  LESSON_FLOW_STAGES,
  PERSONA_OPTIONS,
  PersonaOption
} from './data/curriculumData';
import { LessonStageView, StudySectionTab } from './components/LessonStageView';
import { CurriculumOverview } from './components/CurriculumOverview';
import { VocabularyStudio } from './components/VocabularyStudio';
import { TutorGuideView } from './components/TutorGuideView';
import { FuriganaText } from './components/FuriganaText';
import { BlurTranslation } from './components/BlurTranslation';

type MainNavView = 'lesson' | 'curriculum' | 'vocabulary' | 'guide';

export default function App() {
  const [activeNav, setActiveNav] = useState<MainNavView>('lesson');
  const [currentSessionId, setCurrentSessionId] = useState<number>(1);
  const [lessonTab, setLessonTab] = useState<StudySectionTab>('grammar');

  // Comfort & Learning Controls
  const [lowPressureMode, setLowPressureMode] = useState<boolean>(false);
  const [showReading, setShowReading] = useState<boolean>(true);
  const [selectedPersona, setSelectedPersona] = useState<PersonaOption>(
    PERSONA_OPTIONS[0]
  );

  // Progress & Saved Expressions
  const [completedSessions, setCompletedSessions] = useState<number[]>([]);
  const [favoriteSessionIds, setFavoriteSessionIds] = useState<number[]>([]);
  const [savedExpressions, setSavedExpressions] = useState<
    { jp: string; kr: string; sessionCode: string }[]
  >([]);

  const [isNotebookModalOpen, setIsNotebookModalOpen] = useState<boolean>(false);
  const [copiedPhraseIdx, setCopiedPhraseIdx] = useState<number | null>(null);

  const currentSession =
    CURRICULUM_SESSIONS.find((s) => s.id === currentSessionId) ||
    CURRICULUM_SESSIONS[0];

  const handleToggleSaveExpression = (
    jp: string,
    kr: string,
    sessionCode: string
  ) => {
    setSavedExpressions((prev) => {
      const exists = prev.some((item) => item.jp === jp);
      if (exists) {
        return prev.filter((item) => item.jp !== jp);
      }
      return [...prev, { jp, kr, sessionCode }];
    });
  };

  const handleToggleFavoriteSession = (sessionId: number) => {
    setFavoriteSessionIds((prev) =>
      prev.includes(sessionId)
        ? prev.filter((id) => id !== sessionId)
        : [...prev, sessionId]
    );
  };

  const handleToggleCompleteSession = (sessionId: number) => {
    setCompletedSessions((prev) =>
      prev.includes(sessionId)
        ? prev.filter((id) => id !== sessionId)
        : [...prev, sessionId]
    );
  };

  const handleSelectSessionFromCurriculum = (sessionId: number) => {
    setCurrentSessionId(sessionId);
    setLessonTab('grammar');
    setActiveNav('lesson');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const safetyPhrases = [
    {
      jp: 'もう一度ゆっくり言ってください。',
      kr: '다시 한번 천천히 말해 주세요.'
    },
    {
      jp: '少し考える時間をください。',
      kr: '조금 생각할 시간을 주세요.'
    },
    {
      jp: 'ほかの選択肢にします。',
      kr: '다른 선택지로 넘어갈게요.'
    }
  ];

  const handleCopySafetyPhrase = (text: string, idx: number) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedPhraseIdx(idx);
      setTimeout(() => setCopiedPhraseIdx(null), 1500);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A]">
      {/* Strict 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-xs border-b border-slate-200 px-6 py-3.5">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              setActiveNav('lesson');
            }}
            className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0"
          >
            のんびり日本語
          </a>

          {/* Zone 2: 4 concise single-line navigation links */}
          <nav className="flex items-center gap-6 text-sm font-medium text-slate-600 overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveNav('curriculum')}
              className={`py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
                activeNav === 'curriculum'
                  ? 'border-[#0284C7] text-slate-900 font-semibold'
                  : 'border-transparent hover:text-slate-900'
              }`}
            >
              12회차 커리큘럼
            </button>
            <button
              type="button"
              onClick={() => setActiveNav('lesson')}
              className={`py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
                activeNav === 'lesson'
                  ? 'border-[#0284C7] text-slate-900 font-semibold'
                  : 'border-transparent hover:text-slate-900'
              }`}
            >
              오늘의 수업 교재
            </button>
            <button
              type="button"
              onClick={() => setActiveNav('vocabulary')}
              className={`py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
                activeNav === 'vocabulary'
                  ? 'border-[#0284C7] text-slate-900 font-semibold'
                  : 'border-transparent hover:text-slate-900'
              }`}
            >
              주제별 어휘장
            </button>
            <button
              type="button"
              onClick={() => setActiveNav('guide')}
              className={`py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
                activeNav === 'guide'
                  ? 'border-[#0284C7] text-slate-900 font-semibold'
                  : 'border-transparent hover:text-slate-900'
              }`}
            >
              2시간 운영 가이드
            </button>
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={() => setIsNotebookModalOpen(true)}
              className="px-4 py-2 text-xs font-medium text-white bg-[#0F172A] rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0"
            >
              나의 표현 노트 ({savedExpressions.length})
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Container (1400px desktop presence) */}
      <main className="flex-1 max-w-[1400px] w-full mx-auto px-4 sm:px-6 py-8">
        {activeNav === 'lesson' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left / Main Interactive Textbook Stage (8 columns) */}
            <div className="lg:col-span-8">
              <LessonStageView
                session={currentSession}
                activeTab={lessonTab}
                onTabChange={setLessonTab}
                lowPressureMode={lowPressureMode}
                showReading={showReading}
                selectedPersona={selectedPersona}
                savedExpressions={savedExpressions}
                onToggleSaveExpression={handleToggleSaveExpression}
                isFavoriteTopic={favoriteSessionIds.includes(currentSession.id)}
                onToggleFavoriteTopic={() =>
                  handleToggleFavoriteSession(currentSession.id)
                }
              />
            </div>

            {/* Right Control & Concept Deck (4 columns) */}
            <aside className="lg:col-span-4 space-y-5">
              {/* 1. Session Selector Deck */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-slate-500">
                    12회차 수업 이동
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={currentSessionId <= 1}
                      onClick={() =>
                        setCurrentSessionId((id) => Math.max(1, id - 1))
                      }
                      className="p-1.5 rounded-md border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40"
                      title="이전 회차"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      disabled={currentSessionId >= 12}
                      onClick={() =>
                        setCurrentSessionId((id) => Math.min(12, id + 1))
                      }
                      className="p-1.5 rounded-md border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40"
                      title="다음 회차"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <select
                  value={currentSessionId}
                  onChange={(e) => setCurrentSessionId(Number(e.target.value))}
                  aria-label="수업 회차 선택"
                  className="w-full px-3 py-2.5 text-sm font-medium bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-[#0284C7]"
                >
                  {CURRICULUM_SESSIONS.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.code}회차. {s.titleKr} ({s.titleJp})
                    </option>
                  ))}
                </select>
              </div>

              {/* 2. Comfort & Persona Control Deck */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
                <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                    <Sliders className="w-3.5 h-3.5 text-[#0284C7]" />
                    <span>수업 컨디션 & 답변 시점 설정</span>
                  </div>
                  <span className="text-xs text-slate-400">심리적 부담 완화</span>
                </div>

                {/* Energy Mode Switch */}
                <div className="space-y-1.5">
                  <div className="text-xs font-medium text-slate-700">
                    오늘의 수업 에너지 모드
                  </div>
                  <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 rounded-lg">
                    <button
                      type="button"
                      onClick={() => setLowPressureMode(false)}
                      className={`py-2 px-2.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                        !lowPressureMode
                          ? 'bg-white text-slate-900 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      일반 회화 모드
                    </button>
                    <button
                      type="button"
                      onClick={() => setLowPressureMode(true)}
                      className={`py-2 px-2.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                        lowPressureMode
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      차분한 저부담 모드
                    </button>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {lowPressureMode
                      ? '피곤한 날을 위해 직접 작문 대신 단어 타일 클릭과 읽기·고르기 중심으로 안내합니다.'
                      : '예문을 변형하고 취향 카드로 짧게 말해 보는 기본 모드입니다.'}
                  </p>
                </div>

                {/* Reading Furigana Toggle */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <span className="text-xs font-medium text-slate-700">
                    일본어 한자 후리가나(발음) 표시
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowReading((prev) => !prev)}
                    className={`px-3 py-1 text-xs font-medium rounded-md border transition-colors ${
                      showReading
                        ? 'bg-sky-50 border-sky-200 text-[#0284C7]'
                        : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    {showReading ? '표시 중' : '숨김'}
                  </button>
                </div>

                {/* Fictional Persona Selector */}
                <div className="pt-2 border-t border-slate-100 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-slate-700">
                    <UserCheck className="w-3.5 h-3.5 text-[#0284C7]" />
                    <span>답변 시점 선택 (가상 인물 활용 가능)</span>
                  </div>
                  <div className="grid grid-cols-1 gap-1.5">
                    {PERSONA_OPTIONS.map((persona) => {
                      const active = selectedPersona.id === persona.id;
                      return (
                        <button
                          key={persona.id}
                          type="button"
                          onClick={() => setSelectedPersona(persona)}
                          className={`p-2.5 rounded-lg border text-left transition-colors ${
                            active
                              ? 'bg-sky-50/70 border-[#0284C7] text-slate-900'
                              : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          <div className="text-xs font-bold text-slate-900">
                            {persona.name}
                          </div>
                          <div className="text-xs text-slate-500 mt-0.5">
                            {persona.description}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* 3. 120-Minute Pacing Navigator */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3.5">
                <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                    <Clock className="w-3.5 h-3.5 text-[#0284C7]" />
                    <span>2시간 수업 흐름 (120분 가이드)</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveNav('guide')}
                    className="text-xs text-[#0284C7] hover:underline"
                  >
                    상세 운영법
                  </button>
                </div>

                <div className="space-y-1.5">
                  {LESSON_FLOW_STAGES.map((stage) => {
                    const active = lessonTab === stage.targetTab;
                    return (
                      <button
                        key={stage.step}
                        type="button"
                        onClick={() => setLessonTab(stage.targetTab)}
                        className={`w-full p-2.5 rounded-lg border text-left transition-colors flex items-center justify-between gap-2 ${
                          active
                            ? 'bg-slate-900 border-slate-900 text-white'
                            : 'bg-slate-50/70 border-slate-200/80 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <div>
                          <div className="text-xs font-semibold">
                            0{stage.step}. {stage.title}
                          </div>
                          <div
                            className={`text-xs mt-0.5 ${
                              active ? 'text-slate-300' : 'text-slate-500'
                            }`}
                          >
                            {lowPressureMode ? stage.lowEnergyGuide : stage.method}
                          </div>
                        </div>
                        <span
                          className={`text-xs font-mono-tabular shrink-0 ${
                            active ? 'text-sky-300 font-semibold' : 'text-slate-500'
                          }`}
                        >
                          {stage.durationMin}분
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 4. Quick Safety Phrases (안심 한마디 복사 카드) */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3">
                <div className="text-xs font-bold text-slate-900">
                  수업 중 편하게 쓰는 안심 요청 표현
                </div>
                <p className="text-xs text-slate-500">
                  수업 중 속도 조절이나 패스가 필요할 때 참고하거나 복사해 채팅에 붙여넣을 수 있습니다.
                </p>
                <div className="space-y-2">
                  {safetyPhrases.map((phrase, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-lg border border-slate-200 bg-slate-50/50 flex items-center justify-between gap-2"
                    >
                      <div className="space-y-1">
                        <div className="font-jp font-semibold text-xs text-slate-900">
                          <FuriganaText
                            text={phrase.jp}
                            showFurigana={showReading}
                          />
                        </div>
                        <div className="text-xs text-slate-500">
                          {phrase.kr}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopySafetyPhrase(phrase.jp, idx)}
                        className="px-2.5 py-1 text-xs font-medium bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 rounded-md transition-colors inline-flex items-center gap-1 shrink-0"
                      >
                        {copiedPhraseIdx === idx ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span>복사됨</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-[#0284C7]" />
                            <span>복사</span>
                          </>
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        )}

        {activeNav === 'curriculum' && (
          <CurriculumOverview
            currentSessionId={currentSessionId}
            onSelectSession={handleSelectSessionFromCurriculum}
            completedSessions={completedSessions}
            onToggleCompleteSession={handleToggleCompleteSession}
            favoriteSessionIds={favoriteSessionIds}
            onToggleFavoriteSession={handleToggleFavoriteSession}
          />
        )}

        {activeNav === 'vocabulary' && (
          <VocabularyStudio
            showReading={showReading}
            onSaveToNotebook={handleToggleSaveExpression}
          />
        )}

        {activeNav === 'guide' && (
          <TutorGuideView
            onJumpToLessonStage={(tab) => {
              setLessonTab(tab);
              setActiveNav('lesson');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      {/* Saved Expressions Modal (나의 표현 노트) */}
      {isNotebookModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-xl max-w-xl w-full p-6 space-y-5 shadow-lg max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <div className="text-xs font-semibold text-[#0284C7]">
                  오늘 새롭게 사용할 수 있게 된 표현들
                </div>
                <h2 className="text-lg font-bold text-slate-900 mt-0.5">
                  나의 일본어 표현 노트 ({savedExpressions.length}개)
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsNotebookModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
              {savedExpressions.length === 0 ? (
                <div className="py-10 text-center text-sm text-slate-500">
                  아직 저장된 문장이 없습니다. 수업 예문이나 취향 카드에서 마음에 드는 문장을 담아 보세요.
                </div>
              ) : (
                savedExpressions.map((item, idx) => (
                  <div
                    key={idx}
                    className="border border-slate-200 rounded-lg p-3.5 flex items-center justify-between gap-3 bg-slate-50/70"
                  >
                    <div className="space-y-1">
                      <div className="text-xs text-slate-400 font-mono-tabular">
                        #{idx + 1} · {item.sessionCode}회차
                      </div>
                      <div className="font-jp font-bold text-base text-slate-900">
                        <FuriganaText text={item.jp} showFurigana={showReading} />
                      </div>
                      <BlurTranslation
                        text={item.kr}
                        textClassName="text-xs text-slate-600"
                        resetKey={`modal-${idx}`}
                      />
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() =>
                          handleToggleSaveExpression(
                            item.jp,
                            item.kr,
                            item.sessionCode
                          )
                        }
                        className="text-xs text-slate-400 hover:text-rose-600 px-2 py-1"
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                수업 마지막 10분 정리 시간에 2~3개를 골라 소리 내어 읽어 보세요.
              </span>
              <button
                type="button"
                onClick={() => setIsNotebookModalOpen(false)}
                className="px-4 py-2 text-xs font-medium bg-slate-900 text-white rounded-lg hover:bg-slate-800"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quiet Footer */}
      <footer className="border-t border-slate-200 bg-white py-5 px-6 mt-12">
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            のんびり日本語 — 편안한 일상과 개인의 관심사를 중심으로 배우는 1:1 일본어 온라인 교재 플랫폼
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setActiveNav('curriculum')}
              className="hover:text-slate-900"
            >
              12회차 커리큘럼
            </button>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => setActiveNav('vocabulary')}
              className="hover:text-slate-900"
            >
              주제별 어휘 확장
            </button>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => setActiveNav('guide')}
              className="hover:text-slate-900"
            >
              교수·학습 가이드
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
