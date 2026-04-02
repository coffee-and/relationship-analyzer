let current = 0;

const state = {
  totalScore: 0,
  totalRisk: 0,
  categoryScores: {
    emotion: 0,
    stability: 0,
    future: 0
  },
  conflictRisk: 0,
  typeTags: {},
  answers: []
};

function getCategoryLabel(category) {
  const labels = {
    emotion: "감정 상태",
    stability: "관계 안정성",
    conflict: "갈등 패턴",
    future: "미래 정렬도"
  };
  return labels[category] || category;
}

function getTypeLabel(typeTag) {
  const labels = {
    avoidant: "회피형",
    explosive: "폭발형",
    cold: "냉담형",
    pursuer: "추적형",
    stable: "안정형"
  };
  return labels[typeTag] || "분석 중";
}

function updateProgress() {
  const progressText = document.getElementById("progressText");
  const progressFill = document.getElementById("progressFill");
  const total = questions.length;
  const currentDisplay = Math.min(current + 1, total);
  const percent = (current / total) * 100;

  if (progressText) {
    progressText.textContent = `${currentDisplay} / ${total}`;
  }

  if (progressFill) {
    progressFill.style.width = `${percent}%`;
  }
}

function renderQuestion() {
  const q = questions[current];
  const questionEl = document.getElementById("question");
  const optionsEl = document.getElementById("options");
  const nextBtn = document.getElementById("nextBtn");
  const categoryEl = document.getElementById("questionCategory");
  const resultEl = document.getElementById("result");

  updateProgress();
  resultEl.innerHTML = "";
  categoryEl.textContent = getCategoryLabel(q.category);
  questionEl.textContent = `${current + 1}. ${q.question}`;
  optionsEl.innerHTML = "";
  nextBtn.style.display = "none";
  nextBtn.onclick = null;

  q.options.forEach((opt) => {
    const btn = document.createElement("button");
    btn.textContent = opt.label;
    btn.className = "option-btn";

    btn.onclick = () => {
      document.querySelectorAll(".option-btn").forEach((b) => {
        b.classList.remove("selected");
      });
      btn.classList.add("selected");

      nextBtn.style.display = "block";
      nextBtn.onclick = () => handleAnswer(q, opt);
    };

    optionsEl.appendChild(btn);
  });
}

function handleAnswer(question, option) {
  const score = option.score ?? 0;
  const risk = option.risk ?? 0;
  const typeTag = option.typeTag ?? null;

  state.totalScore += score;
  state.totalRisk += risk;

  if (question.category === "emotion" || question.category === "stability" || question.category === "future") {
    state.categoryScores[question.category] += score;
  }

  if (question.category === "conflict") {
    state.conflictRisk += risk;
  }

  if (typeTag) {
    state.typeTags[typeTag] = (state.typeTags[typeTag] || 0) + 1;
  }

  state.answers.push({
    id: question.id,
    category: question.category,
    question: question.question,
    selected: option.label,
    score,
    risk,
    typeTag
  });

  current++;

  if (current < questions.length) {
    renderQuestion();
  } else {
    showResult();
  }
}

function getTopTypeTag() {
  const entries = Object.entries(state.typeTags);
  if (entries.length === 0) return "stable";
  entries.sort((a, b) => b[1] - a[1]);
  return entries[0][0];
}

function getFinalValue() {
  return state.totalScore - state.totalRisk;
}

function getRelationshipLevel(finalValue) {
  if (finalValue >= 70) {
    return {
      title: "안정적인 관계",
      desc: "현재 관계는 신뢰, 회복력, 미래 방향성 면에서 비교적 탄탄한 편이에요. 큰 갈등이 생겨도 다시 정렬될 가능성이 높고, 서로를 삶의 동반자로 인식하는 기반도 괜찮은 편으로 보여요."
    };
  }

  if (finalValue >= 25) {
    return {
      title: "유지 가능하지만 관리가 필요한 관계",
      desc: "기본적인 애정과 연결감은 있지만, 반복되는 갈등 포인트나 감정 소진이 누적되면 관계 만족도가 흔들릴 수 있어요. 지금 시점에서 대화 방식과 기대치 조율을 해두면 훨씬 안정적으로 갈 수 있어요."
    };
  }

  if (finalValue >= -15) {
    return {
      title: "경계 구간의 관계",
      desc: "좋았던 순간과 힘든 순간의 폭이 모두 존재하는 관계로 보여요. 감정적 피로, 신뢰의 미세한 흔들림, 갈등 후 회복 지연이 동시에 나타날 수 있어서, 그냥 버티기만 하면 오히려 더 지칠 가능성이 있어요."
    };
  }

  return {
    title: "지속 가능성을 점검해야 하는 관계",
    desc: "현재 관계는 감정 소진, 갈등 누적, 미래 방향성의 불일치가 함께 작동하고 있을 가능성이 커 보여요. 단순한 오해 수준인지, 구조적인 문제인지 차분히 구분해서 보는 것이 중요해요."
  };
}

function getEmotionReport(score) {
  if (score >= -15) {
    return {
      title: "감정 영역은 비교적 안정적이에요",
      desc: "관계 안에서 과도한 긴장이나 소진이 크지 않고, 감정 회복도 어느 정도 가능한 상태로 보여요.",
      points: [
        "상대의 반응에 지나치게 흔들리지 않는 편일 수 있어요.",
        "갈등이 생겨도 관계 전체가 무너지는 느낌까지는 아닐 가능성이 커요.",
        "작은 불편도 너무 오래 쌓아두지 않는 습관이 도움이 돼요."
      ]
    };
  }

  if (score >= -55) {
    return {
      title: "감정 소모가 서서히 쌓이는 구간이에요",
      desc: "겉으로는 버틸 수 있어 보여도 내면에서는 불안, 서운함, 긴장감이 조금씩 누적될 수 있는 상태예요.",
      points: [
        "갈등 이후의 감정 잔상이 오래 남을 수 있어요.",
        "혼자만 애쓴다고 느끼는 순간이 늘어나면 만족도가 급격히 떨어질 수 있어요.",
        "관계 유지보다 감정 회복이 먼저 필요한 시기일 수도 있어요."
      ]
    };
  }

  return {
    title: "감정적으로 많이 지쳐 있을 가능성이 있어요",
    desc: "관계 안에서 편안함보다 긴장, 불안, 피로가 더 자주 느껴질 수 있는 상태예요.",
    points: [
      "상대와 함께 있을 때조차 마음이 쉬지 못할 수 있어요.",
      "헤어짐 고민이나 감정 억압이 반복되면 관계 만족도는 더 빠르게 낮아질 수 있어요.",
      "이 관계가 나를 소모시키는지, 성장시키는지 구분해 보는 게 중요해요."
    ]
  };
}

function getStabilityReport(score) {
  if (score >= 55) {
    return {
      title: "관계의 구조적 안정성이 높은 편이에요",
      desc: "신뢰, 존중, 회복력, 장기 방향성 같은 핵심 기반이 비교적 잘 맞아 있는 편이에요.",
      points: [
        "갈등이 있어도 다시 회복할 토대가 있는 관계일 가능성이 커요.",
        "서로를 바꾸려 하기보다 이해하려는 흐름이 형성되어 있을 수 있어요.",
        "익숙함 속에서도 대화를 줄이지 않는 것이 중요해요."
      ]
    };
  }

  if (score >= 10) {
    return {
      title: "기반은 있지만 흔들릴 포인트도 보여요",
      desc: "큰 틀에서는 관계를 이어갈 힘이 있지만, 반복 갈등이나 신뢰의 균열이 생기면 체감 안정감이 빠르게 떨어질 수 있어요.",
      points: [
        "미래 계획, 경제관, 존중 방식 중 일부는 더 맞춰갈 필요가 있어 보여요.",
        "관계를 유지하려는 의지는 있어도 방법이 부족할 수 있어요.",
        "중요한 주제를 미루지 않고 이야기하는 습관이 안정성에 큰 영향을 줘요."
      ]
    };
  }

  return {
    title: "관계의 토대가 약해졌을 수 있어요",
    desc: "신뢰, 존중, 회복력, 장기 방향성 중 한두 가지 이상에서 균형이 많이 흔들렸을 가능성이 있어요.",
    points: [
      "같은 문제를 반복해서 겪고 있다면 감정 문제보다 구조 문제일 수 있어요.",
      "상대를 믿기 어렵거나 미래를 함께 그리기 어려우면 관계 피로가 빨라져요.",
      "좋아하는 마음만으로 유지되기 어려운 구간일 수 있어요."
    ]
  };
}

function getConflictReport(risk, typeTag) {
  const typeMap = {
    avoidant: "회피형 경향이 보여요. 갈등이 생기면 대화보다 거리 두기를 택할 가능성이 있어요.",
    explosive: "폭발형 경향이 보여요. 감정이 한 번 올라오면 대화가 해결보다 상처로 번질 수 있어요.",
    cold: "냉담형 경향이 보여요. 말하지 않고 닫혀 버리는 방식이 반복되면 관계는 서서히 멀어질 수 있어요.",
    pursuer: "추적형 경향이 보여요. 불안을 해소하려고 확인과 반응을 강하게 요구하게 될 수 있어요.",
    stable: "안정형 경향이 보여요. 갈등 상황에서도 비교적 대화 중심으로 풀 가능성이 있어요."
  };

  let riskDesc = "";
  let points = [];

  if (risk <= 10) {
    riskDesc = "갈등 리스크는 비교적 낮은 편이에요. 의견 차이는 있어도 관계 전체를 흔드는 수준까지는 아닐 가능성이 커요.";
    points = [
      "갈등이 생겨도 회복 경로가 있는 편일 수 있어요.",
      "사과와 조율이 어느 정도 균형적으로 이루어질 가능성이 있어요.",
      "지금의 건강한 패턴을 유지하는 것이 중요해요."
    ];
  } else if (risk <= 40) {
    riskDesc = "갈등 자체보다 갈등을 다루는 방식에서 피로가 쌓일 수 있어 보여요. 반복 패턴을 빨리 인식하는 게 중요해요.";
    points = [
      "문제가 같은 방식으로 반복되는지 점검해볼 필요가 있어요.",
      "침묵, 회피, 폭발 같은 방식은 단기적으로 끝난 것처럼 보여도 잔상을 남기기 쉬워요.",
      "해결보다 회피가 익숙해지면 친밀감이 서서히 떨어질 수 있어요."
    ];
  } else {
    riskDesc = "갈등 리스크가 높은 편이에요. 문제의 크기보다 해결 방식의 상처가 더 크게 남을 가능성이 있어요.";
    points = [
      "반복 갈등, 신뢰 흔들림, 한쪽만 사과하는 흐름이 누적될 수 있어요.",
      "이 상태가 길어지면 애정보다 피로가 먼저 느껴질 수 있어요.",
      "갈등 후 회복 규칙을 새로 만드는 게 꼭 필요해 보여요."
    ];
  }

  return {
    title: "갈등 패턴 분석",
    desc: `${typeMap[typeTag] || "갈등 반응 패턴은 추가 관찰이 필요해요."} ${riskDesc}`,
    points
  };
}

function getFutureReport(score) {
  if (score >= 12) {
    return {
      title: "미래 정렬도는 좋은 편이에요",
      desc: "장기적인 방향성에서 서로를 같은 그림 안에 두고 있을 가능성이 커요.",
      points: [
        "장기 계획을 이야기할 수 있다는 건 관계의 지속성에 꽤 중요한 강점이에요.",
        "거주, 라이프스타일, 커리어 우선순위가 크게 어긋나지 않는 편일 수 있어요.",
        "이 강점은 실제 행동 계획으로 연결할수록 더 단단해져요."
      ]
    };
  }

  if (score >= 3) {
    return {
      title: "미래 이야기는 가능하지만 더 선명해질 필요가 있어요",
      desc: "서로의 방향성이 완전히 다르진 않지만, 구체적인 합의나 현실적인 조율은 아직 부족할 수 있어요.",
      points: [
        "막연히 좋아하는 것과 실제로 함께 살아가는 것은 다를 수 있어요.",
        "앞으로의 삶을 어디까지 함께 그리는지 확인해볼 필요가 있어요.",
        "이야기만 있고 실행 계획이 없으면 안정감이 낮아질 수 있어요."
      ]
    };
  }

  return {
    title: "미래 방향성은 조금 더 점검이 필요해요",
    desc: "현재는 감정 연결은 있어도 장기적 선택의 방향이 충분히 맞춰지지 않았을 수 있어요.",
    points: [
      "장기 관계에서는 가치관 차이가 감정보다 크게 작용할 때가 많아요.",
      "거주, 자녀, 커리어 같은 문제는 미룰수록 갈등 비용이 커질 수 있어요.",
      "미래 얘기를 피하고 있다면 그 자체가 중요한 신호일 수 있어요."
    ]
  };
}

function getPersonalizedSummary(finalValue, emotionScore, stabilityScore, conflictRisk, futureScore) {
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

function renderPoints(points) {
  return points.map(point => `<li>${point}</li>`).join("");
}

function getShareText(levelTitle, finalValue) {
  return `내 연인 관계 지속성 테스트 결과: ${levelTitle} (최종 판단값 ${finalValue})\nRelationship Analyzer에서 확인해봤어.`;
}

async function shareResult(levelTitle, finalValue) {
  const shareText = getShareText(levelTitle, finalValue);

  try {
    if (navigator.share) {
      await navigator.share({
        title: "연인 관계 지속성 테스트 결과",
        text: shareText
      });
      return;
    }

    await navigator.clipboard.writeText(shareText);
    alert("결과 문구를 클립보드에 복사했어요.");
  } catch (error) {
    alert("공유를 완료하지 못했어요. 다시 시도해 주세요.");
  }
}

async function captureResultCard() {
  const card = document.getElementById("captureCard");

  if (!card) {
    alert("캡처할 결과 카드가 없어요.");
    return;
  }

  try {
    const canvas = await html2canvas(card, {
      backgroundColor: null,
      scale: 2
    });

    const link = document.createElement("a");
    link.download = "relationship-analyzer-result.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  } catch (error) {
    alert("이미지 저장에 실패했어요. 다시 시도해 주세요.");
  }
}

function restartTest() {
  current = 0;
  state.totalScore = 0;
  state.totalRisk = 0;
  state.categoryScores = {
    emotion: 0,
    stability: 0,
    future: 0
  };
  state.conflictRisk = 0;
  state.typeTags = {};
  state.answers = [];

  document.getElementById("app").innerHTML = `
    <header class="hero">
      <div class="hero-text">
        <span class="eyebrow">RELATIONSHIP ANALYZER</span>
        <h1>연인 관계 지속성 테스트</h1>
        <p class="subtitle">
          감정 상태, 관계 안정성, 갈등 패턴, 미래 정렬도를 바탕으로
          지금 관계의 흐름을 분석해요.
        </p>
      </div>
      <div class="hero-side">
        <div id="progressText" class="progress-text">1 / ${questions.length}</div>
      </div>
    </header>

    <div class="progress">
      <div id="progressFill" class="progress-fill"></div>
    </div>

    <section class="question-card glass-card">
      <div class="question-top">
        <div id="questionCategory" class="category-badge"></div>
      </div>
      <div id="question" class="question"></div>
      <div id="options" class="options"></div>
      <button id="nextBtn" class="primary-btn" style="display:none;">다음 질문</button>
    </section>

    <div id="result"></div>
  `;

  renderQuestion();
}

function showResult() {
  current = questions.length;
  updateProgress();

  const finalValue = getFinalValue();
  const level = getRelationshipLevel(finalValue);
  const topType = getTopTypeTag();

  const emotionReport = getEmotionReport(state.categoryScores.emotion);
  const stabilityReport = getStabilityReport(state.categoryScores.stability);
  const conflictReport = getConflictReport(state.conflictRisk, topType);
  const futureReport = getFutureReport(state.categoryScores.future);
  const summaryLines = getPersonalizedSummary(
    finalValue,
    state.categoryScores.emotion,
    state.categoryScores.stability,
    state.conflictRisk,
    state.categoryScores.future
  );

  const resultEl = document.getElementById("result");

  resultEl.innerHTML = `
    <section id="captureCard" class="capture-card">
      <div class="capture-brand">RELATIONSHIP ANALYZER</div>

      <div class="capture-head">
        <div>
          <h2 class="capture-title">${level.title}</h2>
          <p class="capture-subtitle">${level.desc}</p>
        </div>
        <div class="capture-pill">${getTypeLabel(topType)}</div>
      </div>

      <div class="capture-main-grid">
        <div class="capture-block">
          <h3>핵심 한줄 분석</h3>
          <div class="capture-highlight">${summaryLines[0]}</div>
          <p class="capture-copy">
            ${summaryLines[1] || "현재 관계 흐름을 조금 더 정교하게 점검해보면, 유지 가능성과 감정 만족도를 더 분명하게 볼 수 있어요."}
          </p>
        </div>

        <div class="capture-block">
          <h3>핵심 지표</h3>
          <div class="capture-metrics">
            <div class="capture-metric">
              <div class="capture-metric-label">최종 판단값</div>
              <div class="capture-metric-value">${finalValue}</div>
            </div>
            <div class="capture-metric">
              <div class="capture-metric-label">대표 갈등 유형</div>
              <div class="capture-metric-value">${getTypeLabel(topType)}</div>
            </div>
            <div class="capture-metric">
              <div class="capture-metric-label">관계 안정성</div>
              <div class="capture-metric-value">${state.categoryScores.stability}</div>
            </div>
            <div class="capture-metric">
              <div class="capture-metric-label">갈등 리스크</div>
              <div class="capture-metric-value">${state.conflictRisk}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="capture-footer">
        <p class="capture-note">
          감정 상태, 관계 안정성, 갈등 패턴, 미래 정렬도를 바탕으로 분석한 결과예요.
          이 결과는 콘텐츠형 리포트이며, 관계를 점검하는 참고 자료로 활용해 보세요.
        </p>
        <div class="capture-url">relationship-analyzer</div>
      </div>
    </section>

    <section class="report-card">
      <h2 class="report-title">${level.title}</h2>
      <p class="report-desc">${level.desc}</p>
    </section>

    <section class="report-card">
      <h3>종합 점수 요약</h3>
      <div class="score-grid">
        <div class="score-box">
          <h4>총 점수</h4>
          <p>${state.totalScore}</p>
        </div>
        <div class="score-box">
          <h4>총 리스크</h4>
          <p>${state.totalRisk}</p>
        </div>
        <div class="score-box">
          <h4>최종 판단값</h4>
          <p>${finalValue}</p>
        </div>
        <div class="score-box">
          <h4>대표 갈등 유형</h4>
          <p>${getTypeLabel(topType)}</p>
        </div>
      </div>
      <p class="muted">최종 판단값은 총 점수에서 갈등/리스크 요소를 반영해 계산했어요.</p>
    </section>

    <section class="report-card">
      <h3>한눈에 보는 관계 보고서</h3>
      <ul class="summary-list">
        ${renderPoints(summaryLines)}
      </ul>
    </section>

    <section class="report-card">
      <h3>${emotionReport.title}</h3>
      <p>${emotionReport.desc}</p>
      <ul class="summary-list">
        ${renderPoints(emotionReport.points)}
      </ul>
    </section>

    <section class="report-card">
      <h3>${stabilityReport.title}</h3>
      <p>${stabilityReport.desc}</p>
      <ul class="summary-list">
        ${renderPoints(stabilityReport.points)}
      </ul>
    </section>

    <section class="report-card">
      <h3>${conflictReport.title}</h3>
      <p>${conflictReport.desc}</p>
      <ul class="summary-list">
        ${renderPoints(conflictReport.points)}
      </ul>
    </section>

    <section class="report-card">
      <h3>${futureReport.title}</h3>
      <p>${futureReport.desc}</p>
      <ul class="summary-list">
        ${renderPoints(futureReport.points)}
      </ul>
    </section>

    <section class="report-card">
      <h3>카테고리별 세부 점수</h3>
      <div class="score-grid">
        <div class="score-box">
          <h4>감정 상태</h4>
          <p>${state.categoryScores.emotion}</p>
        </div>
        <div class="score-box">
          <h4>관계 안정성</h4>
          <p>${state.categoryScores.stability}</p>
        </div>
        <div class="score-box">
          <h4>갈등 리스크</h4>
          <p>${state.conflictRisk}</p>
        </div>
        <div class="score-box">
          <h4>미래 정렬도</h4>
          <p>${state.categoryScores.future}</p>
        </div>
      </div>
    </section>

    <section class="report-card">
      <h3>내가 선택한 답변 보기</h3>
      <ul class="answer-list">
        ${state.answers.map(answer => `
          <li>
            <strong>[${getCategoryLabel(answer.category)}]</strong>
            ${answer.question}<br />
            → ${answer.selected}
          </li>
        `).join("")}
      </ul>
    </section>

    <section class="report-card">
      <h3>결과 저장 / 공유</h3>
      <p class="muted">
        예쁘게 정리된 상단 카드 이미지를 저장하거나, 결과 문구를 바로 공유할 수 있어요.
      </p>
      <div class="action-row">
        <button class="capture-btn" onclick="captureResultCard()">결과 카드 이미지 저장</button>
        <button class="share-btn" onclick='shareResult(${JSON.stringify(level.title)}, ${finalValue})'>결과 문구 공유하기</button>
        <button class="secondary-btn" onclick="restartTest()">다시 테스트하기</button>
      </div>
    </section>
  `;
}

renderQuestion();