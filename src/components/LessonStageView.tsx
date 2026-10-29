import React, { useState, useEffect } from 'react';
import {
  Copy,
  Check,
  Bookmark,
  RotateCcw,
  ArrowRight,
  Sparkles,
  MessageSquare,
  Sliders,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import {
  CurriculumSession,
  PersonaOption
} from '../data/curriculumData';
import { getFiveExamplesForVocab } from '../data/vocabExamplesData';
import { FuriganaText, stripFurigana } from './FuriganaText';
import { BlurTranslation } from './BlurTranslation';

export type StudySectionTab =
  | 'warmup'
  | 'grammar'
  | 'examples'
  | 'practice'
  | 'conversation'
  | 'wrapup';

interface LessonStageViewProps {
  session: CurriculumSession;
  activeTab: StudySectionTab;
  onTabChange: (tab: StudySectionTab) => void;
  lowPressureMode: boolean;
  showReading: boolean;
  selectedPersona: PersonaOption;
  savedExpressions: { jp: string; kr: string; sessionCode: string }[];
  onToggleSaveExpression: (jp: string, kr: string, sessionCode: string) => void;
  isFavoriteTopic: boolean;
  onToggleFavoriteTopic: () => void;
}

export const LessonStageView: React.FC<LessonStageViewProps> = ({
  session,
  activeTab,
  onTabChange,
  lowPressureMode,
  showReading,
  selectedPersona,
  savedExpressions,
  onToggleSaveExpression,
  isFavoriteTopic,
  onToggleFavoriteTopic
}) => {
  // Step 01 Warm-up Flashcards & Quick Sentence state
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});
  const [warmupSelectedWordIdx, setWarmupSelectedWordIdx] = useState<number>(0);

  // Step 03 Vocabulary expanded 5-examples state
  const [expandedVocabRows, setExpandedVocabRows] = useState<Record<number, boolean>>({
    0: true,
    1: true
  });

  // Step 04 Substitution state
  const [slot1Index, setSlot1Index] = useState(0);
  const [slot2Index, setSlot2Index] = useState(0);

  // Step 04 Drill state
  const [revealedDrills, setRevealedDrills] = useState<Record<string, boolean>>({});
  const [selectedTiles, setSelectedTiles] = useState<Record<string, string[]>>({});

  // Step 05 Preference Card state
  const [cardChoice1Id, setCardChoice1Id] = useState<string>(
    session.cardActivity.step1Choices[0]?.id || ''
  );
  const [cardChoice2Id, setCardChoice2Id] = useState<string>(
    session.cardActivity.step2Choices[0]?.id || ''
  );
  const [copiedCard, setCopiedCard] = useState(false);
  const [activeFollowUpIdx, setActiveFollowUpIdx] = useState<number | null>(null);
  const [skippedFollowUp, setSkippedFollowUp] = useState(false);

  // Step 06 Custom note in wrapup
  const [customSentenceJp, setCustomSentenceJp] = useState('');
  const [customSentenceKr, setCustomSentenceKr] = useState('');

  // Reset local interactive states when session changes
  useEffect(() => {
    setFlippedCards({});
    setWarmupSelectedWordIdx(0);
    setExpandedVocabRows({ 0: true, 1: true });
    setSlot1Index(0);
    setSlot2Index(0);
    setRevealedDrills({});
    setSelectedTiles({});
    setCardChoice1Id(session.cardActivity.step1Choices[0]?.id || '');
    setCardChoice2Id(session.cardActivity.step2Choices[0]?.id || '');
    setCopiedCard(false);
    setActiveFollowUpIdx(null);
    setSkippedFollowUp(false);
  }, [session.id]);

  const currentSlot1 =
    session.substitution.slot1Options[slot1Index] ||
    session.substitution.slot1Options[0];
  const currentSlot2 =
    session.substitution.slot2Options[slot2Index] ||
    session.substitution.slot2Options[0];

  const substitutedJp = `${currentSlot1.jp}${session.substitution.connectorParticle}${currentSlot2.jp}`;
  const substitutedKr = `${currentSlot1.kr} · ${currentSlot2.kr}`;

  const selectedCard1 =
    session.cardActivity.step1Choices.find((c) => c.id === cardChoice1Id) ||
    session.cardActivity.step1Choices[0];
  const selectedCard2 =
    session.cardActivity.step2Choices.find((c) => c.id === cardChoice2Id) ||
    session.cardActivity.step2Choices[0];

  const builtCardSentence = session.cardActivity.buildSentence(
    selectedCard1,
    selectedCard2
  );

  const isExpressionSaved = (jp: string) => {
    const clean = stripFurigana(jp);
    return savedExpressions.some((item) => stripFurigana(item.jp) === clean);
  };

  const handleCopySentence = (text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(stripFurigana(text));
      setCopiedCard(true);
      setTimeout(() => setCopiedCard(false), 1800);
    }
  };

  const handleTileClick = (drillId: string, tile: string) => {
    setSelectedTiles((prev) => {
      const current = prev[drillId] || [];
      if (current.includes(tile)) {
        return { ...prev, [drillId]: current.filter((t) => t !== tile) };
      }
      return { ...prev, [drillId]: [...current, tile] };
    });
  };

  const handleAddCustomExpression = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customSentenceJp.trim()) return;
    onToggleSaveExpression(
      customSentenceJp.trim(),
      customSentenceKr.trim() || '나만의 응용 문장',
      session.code
    );
    setCustomSentenceJp('');
    setCustomSentenceKr('');
  };

  // Exact 1:1 match with LESSON_FLOW_STAGES (01 to 06)
  const tabs: { id: StudySectionTab; label: string; stepNum: string }[] = [
    { id: 'grammar', label: '문법 학습', stepNum: '01' },
    { id: 'examples', label: '어휘·예문', stepNum: '02' },
    { id: 'practice', label: '반복 연습', stepNum: '03' },
    { id: 'warmup', label: '가벼운 복습', stepNum: '04' },
    { id: 'conversation', label: '회화 활동', stepNum: '05' },
    { id: 'wrapup', label: '정리', stepNum: '06' }
  ];

  const warmupWords = session.vocabulary.slice(0, 6);
  const allSessionWords = session.vocabulary;
  const activeWarmupWord =
    allSessionWords[warmupSelectedWordIdx] || allSessionWords[0];
  const activeWarmupExamples = activeWarmupWord
    ? getFiveExamplesForVocab(
        activeWarmupWord.jp,
        activeWarmupWord.reading,
        activeWarmupWord.kr,
        activeWarmupWord.sampleJp,
        activeWarmupWord.sampleKr
      )
    : [];

  return (
    <div className="space-y-6">
      {/* Session Header Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="font-mono-tabular font-medium text-[#0284C7]">
              SESSION {session.code}
            </span>
            <span aria-hidden="true">·</span>
            <span>{session.themeCategory}</span>
            <span aria-hidden="true">·</span>
            <span className="font-jp">
              <FuriganaText text={session.titleJp} showFurigana={showReading} />
            </span>
          </div>

          <button
            type="button"
            onClick={onToggleFavoriteTopic}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 ${
              isFavoriteTopic
                ? 'bg-amber-50 border-amber-300 text-amber-900'
                : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900'
            }`}
          >
            {isFavoriteTopic ? '★ 학생 선호 주제 등록됨' : '☆ 관심 주제로 표시'}
          </button>
        </div>

        <div className="mt-4 flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {session.code}회차. {session.titleKr}
            </h1>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed max-w-2xl">
              {session.comfortNote}
            </p>
          </div>
          <div className="bg-slate-50 border border-slate-200/80 rounded-lg px-4 py-3 shrink-0">
            <div className="text-xs text-slate-500">이번 회차 학습 목표</div>
            <div className="text-sm font-semibold text-slate-900 mt-0.5">
              {session.learningGoal}
            </div>
            <div className="text-xs text-[#0284C7] font-jp mt-1">
              문법: <FuriganaText text={session.grammarSummary} showFurigana={showReading} />
            </div>
          </div>
        </div>

        {/* Interactive Stage Tabs (01 ~ 06 matching 2-hour lesson flow) */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto pb-1">
          {tabs.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTabChange(tab.id)}
                className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                  active
                    ? 'bg-[#0F172A] text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
                }`}
              >
                <span className="font-mono-tabular opacity-75">{tab.stepNum}.</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* SECTION 04: WARM-UP REVIEW (15분 가벼운 복습: 단어 카드, 짧은 문장 완성) */}
      {activeTab === 'warmup' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="text-xs font-semibold text-[#0284C7]">
                  04단계 · 15분 가벼운 복습
                </div>
                <h2 className="text-xl font-bold text-slate-900 mt-0.5">
                  단어 카드 & 어휘별 5가지 활용 예문 복습
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  일본어 문장을 먼저 스스로 읽고 해석해 본 뒤, [블러 해제] 버튼을 눌러 한국어 해석을 확인해 보세요.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onTabChange('conversation')}
                className="px-4 py-2 text-xs font-medium text-white bg-[#0284C7] rounded-lg hover:bg-[#0369A1] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
              >
                <span>05. 회화 활동으로 이동</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Warmup Activity 1: Interactive Word Cards */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900">
                  ① 워밍업 단어 카드 (카드를 클릭하면 한국어 뜻과 대표 예문이 나타납니다)
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    const allOpen = warmupWords.every((_, i) => flippedCards[i]);
                    if (allOpen) {
                      setFlippedCards({});
                    } else {
                      const next: Record<number, boolean> = {};
                      warmupWords.forEach((_, i) => {
                        next[i] = true;
                      });
                      setFlippedCards(next);
                    }
                  }}
                  className="text-xs text-[#0284C7] hover:underline font-medium"
                >
                  뜻 전체 열기 / 닫기
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {warmupWords.map((word, idx) => {
                  const isFlipped = !!flippedCards[idx];
                  const firstEx = getFiveExamplesForVocab(
                    word.jp,
                    word.reading,
                    word.kr,
                    word.sampleJp,
                    word.sampleKr
                  )[0];

                  return (
                    <div
                      key={idx}
                      className={`rounded-xl border p-4 transition-colors flex flex-col justify-between ${
                        isFlipped
                          ? 'bg-sky-50/50 border-[#0284C7]'
                          : 'bg-slate-50/60 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            setFlippedCards((prev) => ({
                              ...prev,
                              [idx]: !prev[idx]
                            }))
                          }
                          className="text-left flex-1"
                        >
                          <div className="text-xs text-slate-400 font-mono-tabular">
                            CARD 0{idx + 1} · {word.tier}
                          </div>
                          <div className="font-jp font-bold text-xl text-slate-900 mt-1">
                            <FuriganaText
                              text={word.jp}
                              showFurigana={showReading}
                            />
                          </div>
                        </button>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-200/70">
                        {isFlipped ? (
                          <div className="space-y-1.5">
                            <div className="text-sm font-bold text-slate-900">
                              뜻: {word.kr}
                            </div>
                            <div className="text-xs font-jp text-slate-800">
                              <FuriganaText
                                text={firstEx.jpRuby}
                                showFurigana={showReading}
                              />
                            </div>
                            <BlurTranslation
                              text={firstEx.kr}
                              textClassName="text-xs text-slate-600"
                            />
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() =>
                              setFlippedCards((prev) => ({
                                ...prev,
                                [idx]: true
                              }))
                            }
                            className="text-xs font-medium text-[#0284C7] hover:underline"
                          >
                            클릭하여 한국어 뜻 확인하기 →
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Warmup Activity 2: 5 Diverse Example Sentences per Word with Accurate Furigana */}
            {activeWarmupWord && (
              <div className="border border-slate-200 rounded-xl p-5 bg-slate-50/70 space-y-4">
                <div className="flex flex-col gap-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">
                        ② 짧은 문장 완성으로 입 풀기 (어휘별 5가지 다양한 예문)
                      </h3>
                      <p className="text-xs text-slate-600 mt-0.5">
                        일본어 예문을 먼저 읽고 스스로 뜻을 떠올려 본 뒤, [블러 해제] 버튼을 눌러 해석을 확인해 보세요.
                      </p>
                    </div>
                    <span className="text-xs text-[#0284C7] font-mono-tabular font-semibold">
                      총 {activeWarmupExamples.length}개 예문 제공
                    </span>
                  </div>

                  {/* All Vocabulary Buttons for the Session */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {allSessionWords.map((w, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setWarmupSelectedWordIdx(i)}
                        className={`px-3 py-1.5 text-xs font-jp font-medium rounded-md border transition-colors whitespace-nowrap shrink-0 ${
                          warmupSelectedWordIdx === i
                            ? 'bg-slate-900 text-white border-slate-900'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {w.jp} ({w.kr})
                      </button>
                    ))}
                  </div>
                </div>

                {/* 5 Diverse Examples Container */}
                <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs text-slate-500">선택한 어휘:</span>
                      <span className="font-jp font-bold text-lg text-slate-900">
                        <FuriganaText
                          text={activeWarmupWord.jp}
                          showFurigana={showReading}
                        />
                      </span>
                      <span className="text-sm font-semibold text-[#0284C7]">
                        — {activeWarmupWord.kr}
                      </span>
                      <span className="text-xs text-slate-400">
                        ({activeWarmupWord.tier})
                      </span>
                    </div>
                  </div>

                  {/* 5 Diverse Example Sentences List */}
                  <div className="divide-y divide-slate-100">
                    {activeWarmupExamples.map((ex, exIdx) => {
                      const plainJp = stripFurigana(ex.jpRuby);
                      const saved = isExpressionSaved(plainJp);

                      return (
                        <div
                          key={exIdx}
                          className="py-3.5 first:pt-1 last:pb-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                        >
                          <div className="space-y-1.5">
                            <div className="flex items-baseline gap-2.5">
                              <span className="font-mono-tabular text-xs font-semibold text-[#0284C7] shrink-0">
                                예문 0{exIdx + 1}
                              </span>
                              <div className="font-jp font-bold text-base sm:text-lg text-slate-900">
                                <FuriganaText
                                  text={ex.jpRuby}
                                  showFurigana={showReading}
                                />
                              </div>
                            </div>
                            <div className="pl-12">
                              <BlurTranslation
                                text={ex.kr}
                                textClassName="text-sm text-slate-600"
                                resetKey={`${session.id}-${warmupSelectedWordIdx}-${exIdx}`}
                              />
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 pl-12 sm:pl-0 shrink-0">
                            <button
                              type="button"
                              onClick={() =>
                                onToggleSaveExpression(plainJp, ex.kr, session.code)
                              }
                              className={`px-2.5 py-1.5 text-xs font-medium rounded-md border transition-colors inline-flex items-center gap-1 whitespace-nowrap shrink-0 ${
                                saved
                                  ? 'bg-sky-50 border-sky-300 text-[#0284C7]'
                                  : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900'
                              }`}
                            >
                              <Bookmark className="w-3 h-3" />
                              <span>{saved ? '저장됨' : '담기'}</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SECTION 01: GRAMMAR (25분 문법 학습) */}
      {activeTab === 'grammar' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-xs font-semibold text-[#0284C7]">
                01단계 · 25분 문법 학습
              </div>
              <h2 className="text-xl font-bold text-slate-900 mt-0.5">
                핵심 문법 4개
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                설명은 짧고 직관적으로 확인하고, 일본어 예문을 먼저 해석해 본 뒤 [블러 해제]로 뜻을 확인해 보세요.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onTabChange('examples')}
              className="px-4 py-2 text-xs font-medium text-white bg-[#0284C7] rounded-lg hover:bg-[#0369A1] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
            >
              <span>02. 어휘·예문으로 이동</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Clean Grammar Table */}
          <div className="overflow-x-auto border border-slate-200 rounded-lg">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600">
                  <th className="py-3.5 px-4 w-1/4">문법 패턴</th>
                  <th className="py-3.5 px-4 w-1/4">의미</th>
                  <th className="py-3.5 px-4">대표 예문 및 해석 확인</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-sm">
                {session.grammarPoints.map((gp, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-4 px-4 align-top font-jp font-bold text-[#0284C7] text-base">
                      <FuriganaText text={gp.pattern} showFurigana={showReading} />
                    </td>
                    <td className="py-4 px-4 align-top font-medium text-slate-800">
                      {gp.meaning}
                    </td>
                    <td className="py-4 px-4 align-top">
                      <div>
                        <div className="font-jp font-semibold text-slate-900 text-base">
                          <FuriganaText
                            text={gp.exampleJp}
                            showFurigana={showReading}
                          />
                        </div>
                        <div className="mt-1.5">
                          <BlurTranslation
                            text={gp.exampleKr}
                            textClassName="text-sm text-slate-700"
                            resetKey={`${session.id}-gp-${idx}`}
                          />
                        </div>
                        <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                          팁: {gp.usageNote}
                        </p>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SECTION 02: VOCABULARY & EXAMPLES (25분 어휘·예문) */}
      {activeTab === 'examples' && (
        <div className="space-y-6">
          {/* Part A: Categorized Example Sentences */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="text-xs font-semibold text-[#0284C7]">
                  02단계 · 25분 어휘·예문
                </div>
                <h2 className="text-xl font-bold text-slate-900 mt-0.5">
                  상황별 예문 학습 & 어휘별 5가지 활용 문장
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  일본어 문장만 보고 먼저 스스로 해석해 본 뒤, [블러 해제] 버튼을 눌러 한국어 해석을 확인하세요.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onTabChange('practice')}
                className="px-4 py-2 text-xs font-medium text-white bg-[#0284C7] rounded-lg hover:bg-[#0369A1] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
              >
                <span>03. 반복 연습으로 이동</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-5">
              {session.exampleGroups.map((group) => (
                <div
                  key={group.id}
                  className="border border-slate-200 rounded-lg p-5 space-y-4"
                >
                  <h3 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-100">
                    {group.title}
                  </h3>
                  <div className="divide-y divide-slate-100">
                    {group.sentences.map((sent, idx) => {
                      const saved = isExpressionSaved(sent.jp);
                      return (
                        <div
                          key={idx}
                          className="py-3.5 first:pt-1 last:pb-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                        >
                          <div className="space-y-1.5">
                            <div className="font-jp text-base sm:text-lg font-semibold text-slate-900">
                              <FuriganaText
                                text={sent.jp}
                                showFurigana={showReading}
                              />
                            </div>
                            <BlurTranslation
                              text={sent.kr}
                              textClassName="text-sm text-slate-700"
                              resetKey={`${group.id}-${idx}`}
                            />
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              type="button"
                              onClick={() =>
                                onToggleSaveExpression(sent.jp, sent.kr, session.code)
                              }
                              className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors flex items-center gap-1 whitespace-nowrap shrink-0 ${
                                saved
                                  ? 'bg-sky-50 border-sky-300 text-[#0284C7]'
                                  : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900'
                              }`}
                            >
                              <Bookmark className="w-3.5 h-3.5" />
                              <span>{saved ? '저장됨' : '표현 담기'}</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Part B: Core Vocabulary with 5 Examples Each */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  이번 회차 핵심 어휘 ({session.vocabulary.length}개) · 어휘별 5가지 예문
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  각 단어의 5가지 활용 문장을 일본어로 먼저 읽고, [블러 해제]를 눌러 해석을 대조해 보세요.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  const allOpen = session.vocabulary.every(
                    (_, i) => expandedVocabRows[i]
                  );
                  if (allOpen) {
                    setExpandedVocabRows({});
                  } else {
                    const next: Record<number, boolean> = {};
                    session.vocabulary.forEach((_, i) => {
                      next[i] = true;
                    });
                    setExpandedVocabRows(next);
                  }
                }}
                className="text-xs font-medium text-[#0284C7] hover:underline"
              >
                모든 어휘 5개 예문 전체 펼치기 / 접기
              </button>
            </div>

            <div className="space-y-3">
              {session.vocabulary.map((v, idx) => {
                const fiveExamples = getFiveExamplesForVocab(
                  v.jp,
                  v.reading,
                  v.kr,
                  v.sampleJp,
                  v.sampleKr
                );
                const isExpanded = !!expandedVocabRows[idx];

                return (
                  <div
                    key={idx}
                    className="border border-slate-200 rounded-xl overflow-hidden"
                  >
                    <div className="bg-slate-50/70 px-4 py-3.5 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="font-mono-tabular text-xs text-slate-400">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <span className="font-jp font-bold text-lg text-slate-900">
                          <FuriganaText
                            text={v.jp}
                            showFurigana={showReading}
                          />
                        </span>
                        <span className="text-sm font-bold text-slate-800">
                          — {v.kr}
                        </span>
                        <span className="text-xs text-slate-500">
                          · {v.tier}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            setExpandedVocabRows((prev) => ({
                              ...prev,
                              [idx]: !prev[idx]
                            }))
                          }
                          className="px-3 py-1.5 text-xs font-medium bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-md transition-colors inline-flex items-center gap-1 whitespace-nowrap shrink-0"
                        >
                          <span>활용 예문 {fiveExamples.length}개</span>
                          {isExpanded ? (
                            <ChevronUp className="w-3.5 h-3.5" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="p-4 bg-white divide-y divide-slate-100">
                        {fiveExamples.map((ex, exIdx) => {
                          const plainJp = stripFurigana(ex.jpRuby);
                          return (
                            <div
                              key={exIdx}
                              className="py-2.5 first:pt-0.5 last:pb-0.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                            >
                              <div className="space-y-1">
                                <div className="font-jp font-semibold text-sm sm:text-base text-slate-900">
                                  <span className="text-xs font-mono-tabular text-slate-400 mr-2">
                                    {exIdx + 1}.
                                  </span>
                                  <FuriganaText
                                    text={ex.jpRuby}
                                    showFurigana={showReading}
                                  />
                                </div>
                                <div className="pl-5">
                                  <BlurTranslation
                                    text={ex.kr}
                                    textClassName="text-xs text-slate-600"
                                    resetKey={`${session.id}-v-${idx}-${exIdx}`}
                                  />
                                </div>
                              </div>
                              <div className="flex items-center gap-1.5 pl-5 sm:pl-0 shrink-0">
                                <button
                                  type="button"
                                  onClick={() =>
                                    onToggleSaveExpression(
                                      plainJp,
                                      ex.kr,
                                      session.code
                                    )
                                  }
                                  className="px-2.5 py-1 text-xs font-medium text-slate-600 hover:text-[#0284C7] border border-slate-200 rounded whitespace-nowrap shrink-0"
                                >
                                  {isExpressionSaved(plainJp) ? '★ 저장됨' : '+ 담기'}
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 03: DRILLS & WORD SUBSTITUTION (25분 반복 연습) */}
      {activeTab === 'practice' && (
        <div className="space-y-6">
          {/* Interactive Word Replacement Switcher */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-xs text-[#0284C7] font-semibold">
                  03단계 · 25분 반복 연습 (단어 교체 및 문장 확장)
                </div>
                <h2 className="text-xl font-bold text-slate-900 mt-0.5">
                  같은 문장 틀에서 단어만 바꾸어 말해 보기
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  {session.substitution.instruction}
                </p>
              </div>
              <Sliders className="w-5 h-5 text-slate-400 shrink-0" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Slot 1 */}
              <div className="border border-slate-200 rounded-lg p-4 space-y-3">
                <div className="text-xs font-semibold text-slate-600">
                  1. {session.substitution.slot1Label}
                </div>
                <div className="flex flex-wrap gap-2">
                  {session.substitution.slot1Options.map((opt, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSlot1Index(idx)}
                      className={`px-3 py-2 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 ${
                        slot1Index === idx
                          ? 'bg-[#0284C7] text-white border-[#0284C7]'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <span className="font-jp font-bold">{opt.jp}</span>
                      <span className="opacity-80 ml-1">({opt.kr})</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Slot 2 */}
              <div className="border border-slate-200 rounded-lg p-4 space-y-3">
                <div className="text-xs font-semibold text-slate-600">
                  2. {session.substitution.slot2Label}
                </div>
                <div className="flex flex-wrap gap-2">
                  {session.substitution.slot2Options.map((opt, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSlot2Index(idx)}
                      className={`px-3 py-2 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 ${
                        slot2Index === idx
                          ? 'bg-[#0F172A] text-white border-[#0F172A]'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <span className="font-jp font-bold">{opt.jp}</span>
                      <span className="opacity-80 ml-1">({opt.kr})</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Live Resulting Sentence */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="text-xs text-slate-500">조합된 일본어 문장</div>
                <div className="text-xl sm:text-2xl font-bold font-jp text-slate-900">
                  <FuriganaText
                    text={substitutedJp}
                    showFurigana={showReading}
                  />
                </div>
                <BlurTranslation
                  text={substitutedKr}
                  textClassName="text-xs text-slate-600"
                  resetKey={`${session.id}-${slot1Index}-${slot2Index}`}
                />
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() =>
                    onToggleSaveExpression(
                      substitutedJp,
                      substitutedKr,
                      session.code
                    )
                  }
                  className="px-3.5 py-2 text-xs font-medium bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors whitespace-nowrap shrink-0"
                >
                  {isExpressionSaved(substitutedJp) ? '★ 노트에 저장됨' : '+ 노트에 담기'}
                </button>
              </div>
            </div>
          </div>

          {/* Korean Prompt -> Japanese Sentence Drills */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  반복 연습: 한국어 뜻을 보고 일본어 문장 만들기
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  {lowPressureMode
                    ? '차분한 저부담 모드 켜짐: 직접 말하기 부담스러우면 아래 단어 타일을 클릭해 문장을 조립해 보세요.'
                    : '교사가 한국어 문장을 제시하면 학생이 일본어로 말해 본 뒤 모범 문장을 확인합니다.'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => onTabChange('warmup')}
                className="px-4 py-2 text-xs font-medium text-white bg-[#0284C7] rounded-lg hover:bg-[#0369A1] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
              >
                <span>04. 가벼운 복습으로 이동</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-4">
              {session.drills.map((drill, idx) => {
                const isRevealed = !!revealedDrills[drill.id];
                const currentChosen = selectedTiles[drill.id] || [];
                const assembledText = currentChosen.join('');

                return (
                  <div
                    key={drill.id}
                    className="border border-slate-200 rounded-lg p-4 space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono-tabular text-xs font-semibold text-slate-400">
                          0{idx + 1}.
                        </span>
                        <span className="text-base font-semibold text-slate-900">
                          {drill.krPrompt}
                        </span>
                      </div>
                      <span className="text-xs text-slate-500">
                        힌트: {drill.grammarHint}
                      </span>
                    </div>

                    {/* Word Tile Assembly */}
                    <div className="pt-1 flex flex-wrap items-center gap-2">
                      <span className="text-xs text-slate-500 mr-1">
                        단어 조각 클릭:
                      </span>
                      {drill.tiles.map((tile, tIdx) => {
                        const active = currentChosen.includes(tile);
                        return (
                          <button
                            key={tIdx}
                            type="button"
                            onClick={() => handleTileClick(drill.id, tile)}
                            className={`px-3 py-1.5 text-xs font-jp font-medium rounded-md border transition-colors whitespace-nowrap shrink-0 ${
                              active
                                ? 'bg-sky-50 border-[#0284C7] text-[#0284C7]'
                                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            <FuriganaText text={tile} showFurigana={showReading} />
                          </button>
                        );
                      })}
                      {currentChosen.length > 0 && (
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedTiles((prev) => ({ ...prev, [drill.id]: [] }))
                          }
                          className="px-2 py-1 text-xs text-slate-500 hover:text-slate-800 inline-flex items-center gap-1"
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>초기화</span>
                        </button>
                      )}
                    </div>

                    {/* Assembled or Revealed Answer */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
                      <div className="min-h-[1.75rem] flex items-center">
                        {isRevealed ? (
                          <div className="font-jp font-bold text-base text-[#059669]">
                            ✓{' '}
                            <FuriganaText
                              text={drill.jpAnswer}
                              showFurigana={showReading}
                            />
                          </div>
                        ) : currentChosen.length > 0 ? (
                          <span className="font-jp font-semibold text-base text-slate-900">
                            조립 중:{' '}
                            <FuriganaText
                              text={assembledText}
                              showFurigana={showReading}
                            />
                          </span>
                        ) : (
                          <span className="text-xs text-slate-400">
                            스스로 말해보거나 단어 조각을 눌러 문장을 완성해 보세요.
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() =>
                            setRevealedDrills((prev) => ({
                              ...prev,
                              [drill.id]: !prev[drill.id]
                            }))
                          }
                          className="px-3 py-1.5 text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md transition-colors whitespace-nowrap shrink-0"
                        >
                          {isRevealed ? '정답 숨기기' : '일본어 문장 확인'}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 05: CONVERSATION PREFERENCE CARD (20분 회화 활동) */}
      {activeTab === 'conversation' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6">
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <div className="text-xs font-semibold text-[#0284C7] font-jp">
                05단계 · 20분 회화 활동 (
                <FuriganaText
                  text={session.cardActivity.headerJp}
                  showFurigana={showReading}
                />
                )
              </div>
              <h2 className="text-xl font-bold text-slate-900 mt-0.5">
                {session.cardActivity.headerKr}
              </h2>
              <p className="text-sm text-slate-600 mt-1 max-w-2xl">
                {session.cardActivity.subNote}
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-700 shrink-0">
              현재 답변 시점: <strong className="text-slate-900">{selectedPersona.name}</strong>
              <div className="text-slate-500 mt-0.5">{selectedPersona.sampleTrait}</div>
            </div>
          </div>

          {/* Step 1: Choose Item */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900">
              STEP 1. {session.cardActivity.step1Prompt}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {session.cardActivity.step1Choices.map((choice) => {
                const selected = choice.id === selectedCard1.id;
                return (
                  <button
                    key={choice.id}
                    type="button"
                    onClick={() => {
                      setCardChoice1Id(choice.id);
                      setSkippedFollowUp(false);
                    }}
                    className={`p-4 rounded-xl border text-left transition-colors ${
                      selected
                        ? 'bg-sky-50/70 border-[#0284C7] text-slate-900'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-jp font-bold text-lg text-slate-900">
                        <FuriganaText
                          text={choice.jp}
                          showFurigana={showReading}
                        />
                      </span>
                      <span className="text-xs font-medium text-[#0284C7]">
                        {selected ? '✓ 선택됨' : '선택'}
                      </span>
                    </div>
                    <div className="text-sm font-medium text-slate-700 mt-1">
                      — {choice.kr}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Choose Reason / Detail */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900">
              STEP 2. {session.cardActivity.step2Prompt}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {session.cardActivity.step2Choices.map((reason) => {
                const selected = reason.id === selectedCard2.id;
                return (
                  <button
                    key={reason.id}
                    type="button"
                    onClick={() => {
                      setCardChoice2Id(reason.id);
                      setSkippedFollowUp(false);
                    }}
                    className={`p-4 rounded-xl border text-left transition-colors ${
                      selected
                        ? 'bg-slate-900 border-slate-900 text-white'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-jp font-bold text-base">
                        <FuriganaText
                          text={reason.jp}
                          showFurigana={showReading}
                        />
                      </span>
                      <span
                        className={`text-xs ${
                          selected ? 'text-sky-300' : 'text-slate-400'
                        }`}
                      >
                        {selected ? '✓ 선택됨' : '선택'}
                      </span>
                    </div>
                    <div
                      className={`text-sm mt-1 ${
                        selected ? 'text-slate-200' : 'text-slate-600'
                      }`}
                    >
                      — {reason.kr}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Completed Sentence Showcase */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-semibold text-[#0284C7]">
                완성 예문 ({selectedPersona.name} 시점)
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleCopySentence(builtCardSentence.jp)}
                  className="px-3 py-1.5 text-xs font-medium bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors inline-flex items-center gap-1.5 whitespace-nowrap shrink-0"
                >
                  {copiedCard ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>복사 완료</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>예문 복사</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() =>
                    onToggleSaveExpression(
                      builtCardSentence.jp,
                      builtCardSentence.kr,
                      session.code
                    )
                  }
                  className="px-3 py-1.5 text-xs font-medium bg-[#0284C7] text-white hover:bg-[#0369A1] rounded-lg transition-colors whitespace-nowrap shrink-0"
                >
                  {isExpressionSaved(builtCardSentence.jp)
                    ? '★ 표현 노트에 저장됨'
                    : '+ 오늘의 표현에 저장'}
                </button>
              </div>
            </div>

            <div className="py-2 space-y-2">
              <div className="text-2xl sm:text-3xl font-bold font-jp text-slate-900 tracking-tight">
                <FuriganaText
                  text={builtCardSentence.jp}
                  showFurigana={showReading}
                />
              </div>
              <BlurTranslation
                text={builtCardSentence.kr}
                textClassName="text-base text-slate-700"
                resetKey={`${session.id}-${cardChoice1Id}-${cardChoice2Id}`}
              />
            </div>

            {/* Optional Low-Pressure Follow-up Prompts */}
            <div className="pt-4 border-t border-slate-200/80 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="text-xs text-slate-600 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-[#0284C7]" />
                  <span>
                    선택형 가벼운 추가 질문 (더 답하고 싶을 때만 눌러 보세요)
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSkippedFollowUp(true);
                    setActiveFollowUpIdx(null);
                  }}
                  className="text-xs text-slate-500 hover:text-slate-900 underline whitespace-nowrap shrink-0"
                >
                  다른 선택지로 가볍게 넘어가기 (패스)
                </button>
              </div>

              {skippedFollowUp ? (
                <div className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-3.5 py-2.5">
                  ✓ 충분히 잘 대답하셨어요! 추가 설명 없이 다음 카드로 넘어가거나 06. 정리 단계로 이동해도 좋습니다.
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {session.cardActivity.followUps.map((f, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setActiveFollowUpIdx(i)}
                      className={`px-3.5 py-2 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 ${
                        activeFollowUpIdx === i
                          ? 'bg-sky-50 border-[#0284C7] text-[#0284C7]'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span className="font-jp font-bold">
                        <FuriganaText text={f.jp} showFurigana={showReading} />
                      </span>
                      <span className="ml-1.5 text-slate-500">({f.kr})</span>
                    </button>
                  ))}
                </div>
              )}

              {activeFollowUpIdx !== null &&
                session.cardActivity.followUps[activeFollowUpIdx] && (
                  <div className="bg-white border border-slate-200 rounded-lg p-4 space-y-2">
                    <div className="text-xs font-semibold text-slate-800">
                      교사 질문:{' '}
                      <FuriganaText
                        text={session.cardActivity.followUps[activeFollowUpIdx].jp}
                        showFurigana={showReading}
                      />{' '}
                      ({session.cardActivity.followUps[activeFollowUpIdx].kr})
                    </div>
                    <div className="text-xs text-slate-600">
                      안심 가이드: {session.cardActivity.followUps[activeFollowUpIdx].tip}
                    </div>
                    <div className="pt-1 flex flex-wrap items-center justify-between gap-2 bg-slate-50 rounded-md px-3 py-2">
                      <div className="text-xs space-y-1">
                        <div>
                          <span className="text-slate-500">확장 답변 예시: </span>
                          <span className="font-jp font-semibold text-slate-900">
                            <FuriganaText
                              text={selectedCard1.followUpExampleJp}
                              showFurigana={showReading}
                            />
                          </span>
                        </div>
                        <BlurTranslation
                          text={selectedCard1.followUpExampleKr}
                          textClassName="text-xs text-slate-600"
                          resetKey={`followup-${selectedCard1.id}`}
                        />
                      </div>
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 06: WRAP-UP & TODAY'S EXPRESSIONS (10분 정리) */}
      {activeTab === 'wrapup' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6">
          <div>
            <div className="text-xs font-semibold text-[#059669]">
              06단계 · 마지막 10분 정리 (Positive Wrap-up)
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-0.5">
              오늘 새롭게 사용할 수 있게 된 나의 일본어 표현 2~3개
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              틀린 표현을 나열하는 대신, 오늘 수업에서 내가 직접 골라 완성한 문장들을 칭찬하며 갈무리합니다.
            </p>
          </div>

          {/* Saved Expressions List */}
          <div className="space-y-3">
            {savedExpressions.length === 0 ? (
              <div className="border border-slate-200 rounded-lg p-6 text-center space-y-2">
                <p className="text-sm text-slate-600">
                  아직 담아둔 문장이 없어요. 예문 학습이나 취향 카드에서 마음에 드는 문장을 담아 보세요!
                </p>
                <button
                  type="button"
                  onClick={() =>
                    onToggleSaveExpression(
                      builtCardSentence.jp,
                      builtCardSentence.kr,
                      session.code
                    )
                  }
                  className="px-4 py-2 text-xs font-medium bg-[#0284C7] text-white rounded-lg hover:bg-[#0369A1] transition-colors"
                >
                  방금 만든 취향 카드 문장 담기
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3">
                {savedExpressions.map((item, idx) => (
                  <div
                    key={idx}
                    className="border border-slate-200 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/60"
                  >
                    <div className="space-y-1">
                      <div className="text-xs text-slate-500 font-mono-tabular">
                        표현 {String(idx + 1).padStart(2, '0')} · {item.sessionCode}회차
                      </div>
                      <div className="font-jp font-bold text-lg text-slate-900">
                        <FuriganaText text={item.jp} showFurigana={showReading} />
                      </div>
                      <BlurTranslation
                        text={item.kr}
                        textClassName="text-sm text-slate-600"
                        resetKey={`wrapup-${idx}`}
                      />
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() =>
                          onToggleSaveExpression(item.jp, item.kr, item.sessionCode)
                        }
                        className="px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-rose-600 transition-colors whitespace-nowrap shrink-0"
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Add Custom Expression Form */}
          <form
            onSubmit={handleAddCustomExpression}
            className="border border-slate-200 rounded-lg p-4 space-y-3 bg-white"
          >
            <div className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#0284C7]" />
              <span>수업 중 잘 말한 문장 직접 기록하기</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                value={customSentenceJp}
                onChange={(e) => setCustomSentenceJp(e.target.value)}
                placeholder="일본어 문장 (예: 猫が好きです。可愛いからです。)"
                className="px-3 py-2 text-sm border border-slate-200 rounded-lg font-jp focus:outline-none focus:border-[#0284C7]"
              />
              <input
                type="text"
                value={customSentenceKr}
                onChange={(e) => setCustomSentenceKr(e.target.value)}
                placeholder="한국어 뜻 (예: 고양이를 좋아해요. 귀엽기 때문이에요.)"
                className="px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-[#0284C7]"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 text-xs font-medium bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0"
              >
                오늘의 성취 표현으로 추가
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
