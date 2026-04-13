import {
  categoryReportRules,
  relationshipLevelRules,
  conflictRiskRules,
  conflictTypeDescriptions,
} from "../data/reportRules.js";
import { TYPE_LABELS } from "../data/config.js";

// 기준값에 맞는 첫 번째 규칙을 찾아서 결과로 사용해요.
function pickRule(value, rules) {
  return rules.find((rule) => value >= rule.min);
}

// 가장 많이 나온 갈등 태그를 대표 유형으로 선택해요.
function getTopTypeTag(typeTags) {
  const entries = Object.entries(typeTags);
  if (!entries.length) return "stable";
  return entries.sort((a, b) => b[1] - a[1])[0][0];
}

// 요약 문구는 점수 조합으로 더 사람답게 만들어요.
function buildPersonalizedSummary({
  finalValue,
  emotionScore,
  stabilityScore,
  conflictRisk,
  futureScore,
}) {
  const lines = [];

  if (emotionScore <= -56) {
    lines.push("지금 관계에서는 감정적인 편안함보다 긴장과 소모가 더 크게 느껴질 가능성이 있어 보여요.");
  } else if (emotionScore <= -16) {
    lines.push("관계를 유지하는 힘은 있지만, 감정 회복 속도가 조금 느려질 수 있는 흐름이 보여요.");
  } else {
    lines.push("감정적인 연결감 자체는 아직 비교적 건강한 편으로 보여요.");
  }

  if (stabilityScore >= 55) {
    lines.push("서로를 향한 신뢰와 관계 유지 의지는 꽤 단단한 축으로 작동하고 있을 가능성이 커요.");
  } else if (stabilityScore < 10) {
    lines.push("좋아하는 마음과 별개로, 관계를 지탱하는 구조적 안정성은 다시 점검해볼 필요가 있어 보여요.");
  }

  if (conflictRisk >= 41) {
    lines.push("특히 갈등을 해결하는 방식이 관계 만족도를 크게 떨어뜨리는 핵심 원인일 수 있어요.");
  } else if (conflictRisk >= 11) {
    lines.push("갈등의 빈도보다 갈등 후 회복 과정이 더 중요한 포인트로 보여요.");
  } else {
    lines.push("갈등 관리 능력은 현재 관계의 강점 중 하나일 가능성이 있어요.");
  }

  if (futureScore <= 2) {
    lines.push("장기적인 그림을 함께 그릴 수 있는지에 대한 대화가 조금 더 필요해 보여요.");
  } else {
    lines.push("미래 방향성은 관계를 붙잡아주는 긍정적인 요소가 될 수 있어요.");
  }

  if (finalValue < -15) {
    lines.push("지금은 억지로 버티는 것보다, 무엇이 반복적으로 나를 지치게 하는지 정확히 보는 게 더 중요해 보여요.");
  } else if (finalValue < 25) {
    lines.push("관계를 이어갈 수는 있지만, 그냥 흘려보내면 같은 문제로 다시 지칠 가능성이 있어요.");
  } else {
    lines.push("지금의 좋은 기반을 유지하려면 솔직한 대화와 작은 조율을 계속 이어가는 것이 중요해요.");
  }

  return lines;
}

// 퀴즈 결과를 최종 보고서 포맷으로 변환해요.
export function analyzeRelationship(result) {
  const finalValue = result.totalScore - result.totalRisk;
  const topTypeTag = getTopTypeTag(result.typeTags);

  const relationshipLevel = pickRule(finalValue, relationshipLevelRules);
  const emotionReport = pickRule(
    result.categoryScores.emotion,
    categoryReportRules.emotion
  );
  const stabilityReport = pickRule(
    result.categoryScores.stability,
    categoryReportRules.stability
  );
  const futureReport = pickRule(
    result.categoryScores.future,
    categoryReportRules.future
  );
  const conflictRiskRule = conflictRiskRules.find(
    (rule) => result.conflictRisk <= rule.max
  );

  return {
    finalValue,
    topTypeTag,
    topTypeLabel: TYPE_LABELS[topTypeTag] ?? "분석 중",
    relationshipLevel,
    emotionReport,
    stabilityReport,
    futureReport,
    conflictReport: {
      title: "갈등 패턴 분석",
      desc: `${
        conflictTypeDescriptions[topTypeTag] ??
        "갈등 반응 패턴은 추가 관찰이 필요해요."
      } ${conflictRiskRule.desc}`,
      points: conflictRiskRule.points,
    },
    categoryScores: result.categoryScores,
    totalScore: result.totalScore,
    totalRisk: result.totalRisk,
    conflictRisk: result.conflictRisk,
    summaryLines: buildPersonalizedSummary({
      finalValue,
      emotionScore: result.categoryScores.emotion,
      stabilityScore: result.categoryScores.stability,
      conflictRisk: result.conflictRisk,
      futureScore: result.categoryScores.future,
    }),
  };
}