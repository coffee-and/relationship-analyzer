const questions = [
  {
    id: 1,
    category: "emotion",
    question: "싸움 후 감정이 얼마나 지속되나요?",
    options: [
      { label: "당일 안에 정리됨", score: 0 },
      { label: "하루 정도 지속", score: -5 },
      { label: "2~3일 지속", score: -10 },
      { label: "3일 이상 지속", score: -15 }
    ]
  },
  {
    id: 2,
    category: "emotion",
    question: "연락이 늦어지면 불안한가요?",
    options: [
      { label: "거의 없음", score: 0 },
      { label: "가끔 불안", score: -5 },
      { label: "자주 불안", score: -10 },
      { label: "매우 불안", score: -15 }
    ]
  },
  {
    id: 3,
    category: "emotion",
    question: "혼자만 노력한다고 느끼나요?",
    options: [
      { label: "전혀 아님", score: 0 },
      { label: "가끔 느낌", score: -5 },
      { label: "자주 느낌", score: -10 },
      { label: "항상 느낌", score: -15 }
    ]
  },
  {
    id: 4,
    category: "emotion",
    question: "상대 눈치를 보는 편인가요?",
    options: [
      { label: "거의 없음", score: 0 },
      { label: "가끔 있음", score: -5 },
      { label: "자주 있음", score: -10 },
      { label: "항상 있음", score: -15 }
    ]
  },
  {
    id: 5,
    category: "emotion",
    question: "갈등을 피하려고 감정을 억누르나요?",
    options: [
      { label: "전혀 아님", score: 0 },
      { label: "가끔 있음", score: -5 },
      { label: "자주 있음", score: -10 },
      { label: "거의 항상", score: -15 }
    ]
  },
  {
    id: 6,
    category: "emotion",
    question: "이 관계가 나를 성장시킨다고 느끼나요?",
    options: [
      { label: "매우 그렇다", score: 0 },
      { label: "어느 정도 그렇다", score: -3 },
      { label: "잘 모르겠다", score: -8 },
      { label: "전혀 아니다", score: -15 }
    ]
  },
  {
    id: 7,
    category: "emotion",
    question: "상대와 있을 때 긴장감이 있나요?",
    options: [
      { label: "전혀 없음", score: 0 },
      { label: "약간 있음", score: -5 },
      { label: "자주 있음", score: -10 },
      { label: "항상 긴장", score: -15 }
    ]
  },
  {
    id: 8,
    category: "emotion",
    question: "싸움 후 먼저 연락하는 쪽은?",
    options: [
      { label: "상대가 먼저", score: 0 },
      { label: "비슷함", score: -3 },
      { label: "내가 먼저", score: -8 },
      { label: "거의 항상 내가", score: -12 }
    ]
  },
  {
    id: 9,
    category: "emotion",
    question: "최근 3개월간 헤어짐을 고민한 적이 있나요?",
    options: [
      { label: "없음", score: 0 },
      { label: "1~2번", score: -8 },
      { label: "여러 번", score: -12 },
      { label: "거의 매주", score: -20 }
    ]
  },
  {
    id: 10,
    category: "emotion",
    question: "관계에서 감정적으로 소진된 느낌이 있나요?",
    options: [
      { label: "전혀 아님", score: 0 },
      { label: "가끔 있음", score: -5 },
      { label: "자주 있음", score: -10 },
      { label: "매우 심함", score: -20 }
    ]
  },
  {
    id: 11,
    category: "stability",
    question: "결혼/장기 관계 의향이 일치하나요?",
    options: [
      { label: "명확히 일치", score: 20 },
      { label: "대체로 비슷", score: 10 },
      { label: "애매함", score: 0 },
      { label: "다름", score: -20 }
    ]
  },
  {
    id: 12,
    category: "stability",
    question: "경제관은 비슷한가요?",
    options: [
      { label: "매우 비슷", score: 15 },
      { label: "대체로 비슷", score: 5 },
      { label: "약간 다름", score: -5 },
      { label: "많이 다름", score: -20 }
    ]
  },
  {
    id: 13,
    category: "stability",
    question: "갈등 후 회복 속도는?",
    options: [
      { label: "빠름", score: 20 },
      { label: "보통", score: 5 },
      { label: "오래 감", score: -10 },
      { label: "반복적으로 쌓임", score: -20 }
    ]
  },
  {
    id: 14,
    category: "stability",
    question: "미래 계획을 구체적으로 공유하나요?",
    options: [
      { label: "자주 공유", score: 15 },
      { label: "가끔 공유", score: 5 },
      { label: "거의 없음", score: -10 },
      { label: "전혀 없음", score: -20 }
    ]
  },
  {
    id: 15,
    category: "stability",
    question: "서로의 가족/지인 관계는 안정적인가요?",
    options: [
      { label: "매우 안정적", score: 10 },
      { label: "큰 문제 없음", score: 5 },
      { label: "갈등 있음", score: -5 },
      { label: "심각한 갈등", score: -15 }
    ]
  },
  {
    id: 16,
    category: "stability",
    question: "서로의 성향을 존중한다고 느끼나요?",
    options: [
      { label: "매우 그렇다", score: 15 },
      { label: "대체로 그렇다", score: 5 },
      { label: "가끔 무시됨", score: -5 },
      { label: "자주 무시됨", score: -20 }
    ]
  },
  {
    id: 17,
    category: "stability",
    question: "상대에 대한 신뢰 수준은?",
    options: [
      { label: "매우 높음", score: 20 },
      { label: "대체로 신뢰", score: 10 },
      { label: "불안함 있음", score: -10 },
      { label: "신뢰하기 어려움", score: -25 }
    ]
  },
  {
    id: 18,
    category: "stability",
    question: "같은 주제로 반복 갈등이 있나요?",
    options: [
      { label: "거의 없음", score: 5 },
      { label: "가끔 있음", score: 0 },
      { label: "자주 반복", score: -10 },
      { label: "항상 같은 문제", score: -20 }
    ]
  },
  {
    id: 19,
    category: "conflict",
    question: "갈등 시 상대의 반응은?",
    options: [
      { label: "대화를 피함", typeTag: "avoidant", risk: 8 },
      { label: "감정적으로 격해짐", typeTag: "explosive", risk: 10 },
      { label: "침묵 유지", typeTag: "cold", risk: 10 },
      { label: "차분히 해결", typeTag: "stable", risk: 0 }
    ]
  },
  {
    id: 20,
    category: "conflict",
    question: "갈등 시 나의 반응은?",
    options: [
      { label: "계속 확인 요구", typeTag: "pursuer", risk: 8 },
      { label: "감정 표현 강함", typeTag: "explosive", risk: 10 },
      { label: "말 안 함", typeTag: "cold", risk: 10 },
      { label: "대화 시도", typeTag: "stable", risk: 0 }
    ]
  },
  {
    id: 21,
    category: "conflict",
    question: "갈등 반복성은?",
    options: [
      { label: "같은 문제 반복", risk: 10 },
      { label: "가끔 반복", risk: 5 },
      { label: "거의 없음", risk: 0 }
    ]
  },
  {
    id: 22,
    category: "conflict",
    question: "갈등 해결 방식은?",
    options: [
      { label: "시간 지나 해결", risk: 5 },
      { label: "감정 폭발 후 해결", risk: 10 },
      { label: "침묵 유지", risk: 15 },
      { label: "즉시 대화 해결", risk: 0 }
    ]
  },
  {
    id: 23,
    category: "conflict",
    question: "사과 패턴은?",
    options: [
      { label: "한쪽만 자주 사과", risk: 10 },
      { label: "번갈아 사과", risk: 5 },
      { label: "균형적", risk: 0 }
    ]
  },
  {
    id: 24,
    category: "conflict",
    question: "갈등 빈도는?",
    options: [
      { label: "매주", risk: 15 },
      { label: "월 1~2회", risk: 5 },
      { label: "드묾", risk: 0 }
    ]
  },
  {
    id: 25,
    category: "conflict",
    question: "신뢰가 흔들린 경험이 있나요?",
    options: [
      { label: "있음", risk: 20 },
      { label: "약간 있음", risk: 10 },
      { label: "없음", risk: 0 }
    ]
  },
  {
    id: 26,
    category: "conflict",
    question: "중요한 결정을 함께 합의한 경험은?",
    options: [
      { label: "거의 없음", risk: 10 },
      { label: "몇 번 있음", risk: 5 },
      { label: "충분히 있음", risk: 0 }
    ]
  },
  {
    id: 27,
    category: "future",
    question: "3년 후 계획을 함께 이야기한 적이 있나요?",
    options: [
      { label: "구체적으로 있음", score: 5 },
      { label: "추상적으로 있음", score: 3 },
      { label: "없음", score: 0 }
    ]
  },
  {
    id: 28,
    category: "future",
    question: "거주/이사 계획이 일치하나요?",
    options: [
      { label: "명확히 일치", score: 5 },
      { label: "애매함", score: 0 },
      { label: "다름", score: -5 }
    ]
  },
  {
    id: 29,
    category: "future",
    question: "자녀/라이프스타일 방향성은 일치하나요?",
    options: [
      { label: "거의 일치", score: 5 },
      { label: "일부 차이", score: 0 },
      { label: "큰 차이", score: -5 }
    ]
  },
  {
    id: 30,
    category: "future",
    question: "커리어 우선순위 충돌이 있나요?",
    options: [
      { label: "충돌 없음", score: 5 },
      { label: "약간 충돌", score: 0 },
      { label: "명확한 충돌", score: -5 }
    ]
  }
];