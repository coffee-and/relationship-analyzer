import { useMemo } from "react";
import { APP_COPY, PLAN, SHARE } from "./data/config.js";
import { analyzeRelationship } from "./domain/analyzeRelationship.js";
import { useQuizEngine } from "./hooks/useQuizEngine.js";
import { AppShell } from "./components/layout/AppShell.jsx";
import { Hero } from "./components/hero/Hero.jsx";
import { ProgressBar } from "./components/progress/ProgressBar.jsx";
import { QuestionCard } from "./components/question/QuestionCard.jsx";
import { ResultView } from "./components/result/ResultView.jsx";
import { PremiumUpsell } from "./components/result/PremiumUpsell.jsx";

// 전체 앱 흐름을 묶는 최상위 컴포넌트예요.
export default function App() {
  const {
    currentQuestion,
    currentIndex,
    selectedOptionId,
    progress,
    totalQuestions,
    answers,
    resultPayload,
    isComplete,
    handleSelectOption,
    handleNext,
    handleRestart,
  } = useQuizEngine({ planType: PLAN.FREE });

  const analysis = useMemo(() => {
    if (!isComplete) return null;
    return analyzeRelationship(resultPayload);
  }, [isComplete, resultPayload]);

  return (
    <AppShell>
      <Hero
        eyebrow={APP_COPY.eyebrow}
        title={APP_COPY.title}
        subtitle={APP_COPY.subtitle}
        progressText={`${Math.min(currentIndex + 1, totalQuestions)} / ${totalQuestions}`}
      />

      <ProgressBar value={progress} />

      {!isComplete && currentQuestion ? (
        <QuestionCard
          question={currentQuestion}
          questionNumber={currentIndex + 1}
          selectedOptionId={selectedOptionId}
          onSelectOption={handleSelectOption}
          onNext={handleNext}
        />
      ) : null}

      {isComplete && analysis ? (
        <>
          <ResultView
            analysis={analysis}
            answers={answers}
            onRestart={handleRestart}
            shareConfig={SHARE}
          />
          <PremiumUpsell />
        </>
      ) : null}
    </AppShell>
  );
}