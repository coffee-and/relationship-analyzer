import { useRef } from "react";
import html2canvas from "html2canvas";
import { APP_COPY, CATEGORY_META } from "../../data/config.js";
import { MetricGrid } from "./MetricGrid.jsx";
import { SectionCard } from "./SectionCard.jsx";

// 공유 문구는 네이티브 공유가 되면 우선 사용해요.
async function shareResult(shareConfig, relationshipLevelTitle, finalValue) {
  const shareText = `내 연인 관계 지속성 테스트 결과: ${relationshipLevelTitle} (최종 판단값 ${finalValue})`;

  try {
    if (navigator.share) {
      await navigator.share({
        title: shareConfig.title,
        text: shareText,
      });
      return;
    }

    await navigator.clipboard.writeText(shareText);
    window.alert("결과 문구를 클립보드에 복사했어요.");
  } catch (error) {
    window.alert("공유를 완료하지 못했어요. 다시 시도해 주세요.");
  }
}

// 결과 화면은 저장 가능한 카드와 상세 보고서를 함께 보여줘요.
export function ResultView({ analysis, answers, onRestart, shareConfig }) {
  const captureRef = useRef(null);

  async function handleCapture() {
    if (!captureRef.current) return;

    const canvas = await html2canvas(captureRef.current, {
      backgroundColor: null,
      scale: 2,
    });

    const link = document.createElement("a");
    link.download = shareConfig.fileName;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  return (
    <>
      <section ref={captureRef} className="capture-panel">
        <div className="capture-panel__floating capture-panel__floating--top" />
        <div className="capture-panel__floating capture-panel__floating--bottom" />

        <div className="capture-panel__brand">{APP_COPY.brand}</div>

        <div className="capture-panel__hero">
          <div>
            <p className="capture-panel__label">CORE ANALYSIS</p>
            <h2 className="capture-panel__title">{analysis.relationshipLevel.title}</h2>
            <p className="capture-panel__desc">{analysis.relationshipLevel.desc}</p>
          </div>
          <div className="capture-panel__type">{analysis.topTypeLabel}</div>
        </div>

        <div className="capture-panel__grid">
          <div className="capture-panel__block capture-panel__block--highlight">
            <span className="capture-panel__block-label">핵심 한줄 분석</span>
            <div className="capture-panel__headline">{analysis.summaryLines[0]}</div>
            <p className="capture-panel__copy">
              {analysis.summaryLines[1] ??
                "현재 관계 흐름을 조금 더 정교하게 점검해보면, 유지 가능성과 감정 만족도를 더 분명하게 볼 수 있어요."}
            </p>
          </div>

          <div className="capture-panel__block">
            <span className="capture-panel__block-label">핵심 지표</span>
            <MetricGrid
              items={[
                { label: "최종 판단값", value: analysis.finalValue },
                { label: "대표 갈등 유형", value: analysis.topTypeLabel },
                { label: "관계 안정성", value: analysis.categoryScores.stability },
                { label: "갈등 리스크", value: analysis.conflictRisk },
              ]}
            />
          </div>
        </div>

        <div className="capture-panel__footer">
          <p>{APP_COPY.footer}</p>
          <span>relationship-analyzer</span>
        </div>
      </section>

      <SectionCard
        title={analysis.relationshipLevel.title}
        desc={analysis.relationshipLevel.desc}
      />

      <SectionCard title="한눈에 보는 관계 보고서" points={analysis.summaryLines} />

      <SectionCard
        title={analysis.emotionReport.title}
        desc={analysis.emotionReport.desc}
        points={analysis.emotionReport.points}
      />

      <SectionCard
        title={analysis.stabilityReport.title}
        desc={analysis.stabilityReport.desc}
        points={analysis.stabilityReport.points}
      />

      <SectionCard
        title={analysis.conflictReport.title}
        desc={analysis.conflictReport.desc}
        points={analysis.conflictReport.points}
      />

      <SectionCard
        title={analysis.futureReport.title}
        desc={analysis.futureReport.desc}
        points={analysis.futureReport.points}
      />

      <section className="card result-card">
        <h3 className="result-card__title">카테고리별 세부 점수</h3>
        <MetricGrid
          items={[
            { label: CATEGORY_META.emotion.label, value: analysis.categoryScores.emotion },
            { label: CATEGORY_META.stability.label, value: analysis.categoryScores.stability },
            { label: "갈등 리스크", value: analysis.conflictRisk },
            { label: CATEGORY_META.future.label, value: analysis.categoryScores.future },
          ]}
        />
      </section>

      <section className="card result-card">
        <h3 className="result-card__title">내가 선택한 답변 보기</h3>
        <ul className="answer-list">
          {answers.map((answer) => (
            <li key={answer.questionId}>
              <strong>[{CATEGORY_META[answer.category]?.label ?? answer.category}]</strong>{" "}
              {answer.question}
              <br />→ {answer.selectedLabel}
            </li>
          ))}
        </ul>
      </section>

      <section className="card result-card">
        <h3 className="result-card__title">결과 저장 / 공유</h3>
        <p className="result-card__desc">
          결과 카드 이미지를 저장하거나, 결과 문구를 바로 공유할 수 있어요.
        </p>

        <div className="button-row">
          <button type="button" className="button button--ghost" onClick={handleCapture}>
            결과 카드 이미지 저장
          </button>

          <button
            type="button"
            className="button button--primary"
            onClick={() =>
              shareResult(shareConfig, analysis.relationshipLevel.title, analysis.finalValue)
            }
          >
            결과 문구 공유하기
          </button>

          <button type="button" className="button button--secondary" onClick={onRestart}>
            다시 테스트하기
          </button>
        </div>
      </section>
    </>
  );
}