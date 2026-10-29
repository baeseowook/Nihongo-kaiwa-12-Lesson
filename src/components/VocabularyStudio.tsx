import React, { useState } from 'react';
import { CheckCircle2, Plus } from 'lucide-react';
import { THEMATIC_VOCAB_GROUPS } from '../data/curriculumData';
import { getFiveExamplesForVocab } from '../data/vocabExamplesData';
import { FuriganaText, stripFurigana } from './FuriganaText';
import { BlurTranslation } from './BlurTranslation';

interface VocabularyStudioProps {
  showReading: boolean;
  onSaveToNotebook: (jp: string, kr: string, sessionCode: string) => void;
}

export const VocabularyStudio: React.FC<VocabularyStudioProps> = ({
  showReading,
  onSaveToNotebook
}) => {
  const [activeGroupId, setActiveGroupId] = useState<string>(
    THEMATIC_VOCAB_GROUPS[0].id
  );
  const [practicedWords, setPracticedWords] = useState<
    { wordJp: string; sentenceJp: string; sentenceKr: string; theme: string }[]
  >([]);

  const activeGroup =
    THEMATIC_VOCAB_GROUPS.find((g) => g.id === activeGroupId) ||
    THEMATIC_VOCAB_GROUPS[0];

  const handlePracticeSentence = (
    wordJp: string,
    sentenceJpRuby: string,
    sentenceKr: string
  ) => {
    const plainJp = stripFurigana(sentenceJpRuby);
    setPracticedWords((prev) => {
      if (prev.some((p) => p.sentenceJp === plainJp)) return prev;
      return [
        ...prev,
        {
          wordJp,
          sentenceJp: plainJp,
          sentenceKr,
          theme: activeGroup.theme
        }
      ];
    });
  };

  const handleRemovePracticed = (sentenceJp: string) => {
    setPracticedWords((prev) =>
      prev.filter((p) => p.sentenceJp !== sentenceJp)
    );
  };

  const goalCount = 5;
  const progressCount = Math.min(practicedWords.length, goalCount);

  return (
    <div className="space-y-8">
      {/* Header & Guidelines */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="text-xs font-semibold text-[#0284C7]">
              주제별 어휘 확장 스튜디오
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              일상에서 콘텐츠·상상 여행까지 넓히는 주제별 어휘장 (어휘당 5예문)
            </h1>
            <p className="text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
              각 어휘마다 정확한 한자 후리가나가 달린 <strong>5가지 다양한 실전 예문</strong>을 제공합니다.
              일본어 문장을 먼저 스스로 해석해 본 뒤 <strong>[블러 해제]</strong>를 눌러 뜻을 확인하고, 마음에 드는 예문을 골라 직접 말해 보세요.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 shrink-0">
            <div className="text-xs text-slate-500">오늘 문장으로 말해 본 어휘</div>
            <div className="text-lg font-bold font-mono-tabular text-slate-900 mt-0.5">
              {practicedWords.length}문장 달성{' '}
              <span className="text-xs font-normal text-[#059669]">
                (권장 목표: 최소 {goalCount}문장)
              </span>
            </div>
          </div>
        </div>

        {/* Theme Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg overflow-x-auto">
            {THEMATIC_VOCAB_GROUPS.map((group) => (
              <button
                key={group.id}
                type="button"
                onClick={() => setActiveGroupId(group.id)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  activeGroupId === group.id
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {group.theme}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Split: Theme Words with 5 Examples + 5-Word Sentence Goal Builder */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 7 Cols: Theme Vocabulary Cards with 5 Examples Each */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                [{activeGroup.theme}] 추천 어휘 및 5가지 활용 예문
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {activeGroup.description}
              </p>
            </div>
            <div className="text-xs font-jp text-[#0284C7] bg-sky-50 px-3 py-1.5 rounded-md">
              문장 틀: <FuriganaText text={activeGroup.frameJp} showFurigana={showReading} />
            </div>
          </div>

          <div className="space-y-4">
            {activeGroup.words.map((w, idx) => {
              const fiveExamples = getFiveExamplesForVocab(
                w.jp,
                w.reading,
                w.kr,
                w.sampleJp,
                w.sampleKr
              );
              const isWordPracticed = practicedWords.some(
                (p) => p.wordJp === w.jp
              );

              return (
                <div
                  key={idx}
                  className={`border rounded-xl p-5 transition-colors space-y-4 ${
                    isWordPracticed
                      ? 'border-emerald-300 bg-emerald-50/20'
                      : 'border-slate-200 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-100">
                    <div className="flex items-baseline gap-2.5">
                      <span className="font-jp font-bold text-xl text-slate-900">
                        <FuriganaText
                          text={w.jp}
                          showFurigana={showReading}
                        />
                      </span>
                      <span className="text-sm font-bold text-slate-800">
                        — {w.kr}
                      </span>
                    </div>
                  </div>

                  {/* 5 Diverse Examples */}
                  <div className="divide-y divide-slate-100">
                    {fiveExamples.map((ex, exIdx) => {
                      const plainJp = stripFurigana(ex.jpRuby);
                      const isSentPracticed = practicedWords.some(
                        (p) => p.sentenceJp === plainJp
                      );

                      return (
                        <div
                          key={exIdx}
                          className="py-2.5 first:pt-0.5 last:pb-0.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                        >
                          <div className="space-y-1">
                            <div className="font-jp font-semibold text-sm sm:text-base text-slate-900">
                              <span className="font-mono-tabular text-xs text-[#0284C7] mr-2">
                                0{exIdx + 1}.
                              </span>
                              <FuriganaText
                                text={ex.jpRuby}
                                showFurigana={showReading}
                              />
                            </div>
                            <div className="pl-6">
                              <BlurTranslation
                                text={ex.kr}
                                textClassName="text-xs text-slate-600"
                                resetKey={`${activeGroupId}-${idx}-${exIdx}`}
                              />
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 pl-6 sm:pl-0 shrink-0">
                            <button
                              type="button"
                              onClick={() =>
                                handlePracticeSentence(w.jp, ex.jpRuby, ex.kr)
                              }
                              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors inline-flex items-center gap-1 whitespace-nowrap shrink-0 ${
                                isSentPracticed
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-[#0284C7] text-white hover:bg-[#0369A1]'
                              }`}
                            >
                              {isSentPracticed ? (
                                <>
                                  <CheckCircle2 className="w-3 h-3" />
                                  <span>연습함</span>
                                </>
                              ) : (
                                <>
                                  <Plus className="w-3 h-3" />
                                  <span>말해보기</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 5 Cols: 5-Sentence Active Output Tracker */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-6 space-y-5">
          <div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-semibold text-[#059669]">
                매회 최소 5문장 직접 말하기 챌린지
              </span>
              <span className="text-xs font-mono-tabular font-semibold text-slate-700">
                {progressCount} / {goalCount} 완료
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mt-1">
              오늘 내가 문장에 넣어 말해 본 어휘 리스트
            </h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              왼쪽 예문에서 [말해보기]를 누르면 오늘 연습한 문장 리스트에 기록됩니다.
            </p>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mt-3">
              <div
                className="h-full bg-[#059669] transition-transform duration-150 origin-left"
                style={{
                  transform: `scaleX(${progressCount / goalCount})`
                }}
              />
            </div>
          </div>

          <div className="space-y-2.5">
            {practicedWords.length === 0 ? (
              <div className="border border-slate-200 rounded-lg p-6 text-center text-xs text-slate-500">
                아직 말해 본 문장이 없습니다. 왼쪽 어휘 예문에서 마음에 드는 문장의 [+ 말해보기] 버튼을 눌러 보세요.
              </div>
            ) : (
              practicedWords.map((item, idx) => (
                <div
                  key={idx}
                  className="border border-slate-200 rounded-lg p-3.5 bg-slate-50/70 space-y-1.5"
                >
                  <div className="flex items-center justify-between gap-2 text-xs text-slate-500">
                    <span>
                      {String(idx + 1).padStart(2, '0')} · {item.theme} · 핵심어:{' '}
                      <strong className="font-jp text-slate-900">
                        {item.wordJp}
                      </strong>
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          onSaveToNotebook(
                            item.sentenceJp,
                            item.sentenceKr,
                            '어휘확장'
                          )
                        }
                        className="text-slate-600 hover:text-slate-900"
                      >
                        +노트저장
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemovePracticed(item.sentenceJp)}
                        className="text-slate-400 hover:text-rose-600"
                      >
                        제외
                      </button>
                    </div>
                  </div>
                  <div className="font-jp font-bold text-sm text-slate-900">
                    <FuriganaText
                      text={item.sentenceJp}
                      showFurigana={showReading}
                    />
                  </div>
                  <BlurTranslation
                    text={item.sentenceKr}
                    textClassName="text-xs text-slate-600"
                    resetKey={`practiced-${idx}`}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
