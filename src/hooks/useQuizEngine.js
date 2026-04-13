import { useMemo, useState } from "react";
import { questions } from "../data/questions.js";
import { createInitialState } from "../domain/createInitialState.js";
import { applyOptionEffects } from "../domain/applyOptionEffects.js";

// 퀴즈 진행 상태를 화면과 분리해서 관리하는 Hook이에요.
export function useQuizEngine({ planType = "FREE" } = {}) {
  const [state, setState] = useState(() => createInitialState(planType));

  const currentQuestion = questions[state.currentIndex] ?? null;
  const totalQuestions = questions.length;
  const isComplete = state.currentIndex >= totalQuestions;
  const progress = Math.min((state.currentIndex / totalQuestions) * 100, 100);

  const resultPayload = useMemo(
    () => ({
      totalScore: state.totalScore,
      totalRisk: state.totalRisk,
      categoryScores: state.categoryScores,
      conflictRisk: state.conflictRisk,
      typeTags: state.typeTags,
    }),
    [
      state.totalScore,
      state.totalRisk,
      state.categoryScores,
      state.conflictRisk,
      state.typeTags,
    ]
  );

  function handleSelectOption(optionId) {
    setState((prev) => ({
      ...prev,
      selectedOptionId: optionId,
    }));
  }

  function handleNext() {
    if (!currentQuestion || !state.selectedOptionId) return;

    const option = currentQuestion.options.find(
      (item) => item.id === state.selectedOptionId
    );
    if (!option) return;

    setState((prev) => applyOptionEffects(prev, currentQuestion, option));
  }

  function handleRestart() {
    setState(createInitialState(planType));
  }

  return {
    currentQuestion,
    currentIndex: state.currentIndex,
    selectedOptionId: state.selectedOptionId,
    progress,
    totalQuestions,
    answers: state.answers,
    resultPayload,
    isComplete,
    handleSelectOption,
    handleNext,
    handleRestart,
  };
}