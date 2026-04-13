// 초기 상태를 함수로 분리해서 재시작과 테스트가 쉬워지게 만들어요.
export function createInitialState(planType = "FREE") {
  return {
    planType,
    currentIndex: 0,
    selectedOptionId: null,
    answers: [],
    totalScore: 0,
    totalRisk: 0,
    categoryScores: {
      emotion: 0,
      stability: 0,
      future: 0,
    },
    conflictRisk: 0,
    typeTags: {},
  };
}