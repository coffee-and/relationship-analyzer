import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import { APP_COPY, CATEGORY_META } from "../../data/config.js";
import { MetricGrid } from "./MetricGrid.jsx";
import { SectionCard } from "./SectionCard.jsx";
import { PremiumLockedSection } from "../premium/PremiumLockedSection.jsx";
import { PremiumReport } from "../premium/PremiumReport.jsx";

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

export function ResultView({ analysis, answers, onRestart, shareConfig }) {
  const captureRef = useRef(null);
  const [isPremium, setIsPremium] = useState(false);

  function handlePaymentClick() {
    // TODO: 실제 결제 연동 시 이곳에서 Toss/Stripe 결제 페이지로 연결해요.
    setIsPremium(true);
  }

  async function handleCapture() {
    if (!captureRef.current) return;

    const canvas = await html2canvas(captureRef.current, {
      backgroundColor: "#f7eef3",
      scale: 2,
      useCORS: true,
      scrollY: -window.scrollY,
    });

    const link = document.createElement("a");
    link.download = shareConfig.fileName;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  return (
    <>
      <div ref={captureRef} className="capture-export">
        <section className="capture-panel capture-panel--cozy">
          <div className="capture-panel__floating capture-panel__floating--top" />
          <div className="capture-panel__floating capture-panel__floating--bottom" />

          <div className="capture-panel__brand-row">
            <span className="capture-panel__brand">{APP_COPY.brand}</span>
            <span className="capture-panel__chip">RESULT REPORT</span>
          </div>

          <div className="capture-panel__hero">
            <div className="capture-panel__hero-main">
              <p className="capture-panel__label">RELATIONSHIP RESULT</p>
              <h2 className="capture-panel__title">
                {analysis.relationshipLevel.title}
              </h2>
              <p className="capture-panel__desc">
                {analysis.relationshipLevel.desc}
              </p>
            </div>

            <div className="capture-panel__type-box">
              <span className="capture-panel__type-label">대표 유형</span>
              <strong className="capture-panel__type-value">
                {analysis.topTypeLabel}
              </strong>
            </div>
          </div>

          <div className="capture-panel__summary-box">
            <span className="capture-panel__summary-label">핵심 한줄 분석</span>
            <p className="capture-panel__summary-text">
              {analysis.summaryLines[0]}
            </p>
            <p className="capture-panel__summary-sub">
              {analysis.summaryLines[1] ??
                "현재 관계 흐름을 조금 더 정교하게 점검해보면, 유지 가능성과 감정 만족도를 더 분명하게 볼 수 있어요."}
            </p>
          </div>

          <div className="capture-panel__grid">
            <div className="capture-panel__block">
              <span className="capture-panel__block-label">핵심 지표</span>
              <MetricGrid
                items={[
                  { label: "최종 판단값", value: analysis.finalValue },
                  { label: "대표 갈등 유형", value: analysis.topTypeLabel },
                  {
                    label: "관계 안정성",
                    value: analysis.categoryScores.stability,
                  },
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

        <section className="card result-overview-card">
          <div className="result-overview-card__head">
            <div>
              <span className="result-overview-card__eyebrow">OVERVIEW</span>
              <h3 className="result-overview-card__title">
                {analysis.relationshipLevel.title}
              </h3>
            </div>

            <div className="result-overview-card__score">
              <span>FINAL SCORE</span>
              <strong>{analysis.finalValue}</strong>
            </div>
          </div>

          <p className="result-overview-card__desc">
            {analysis.relationshipLevel.desc}
          </p>
        </section>

        <SectionCard
          title="한눈에 보는 관계 보고서"
          points={analysis.summaryLines}
        />

        <section className="card result-card">
          <h3 className="result-card__title">카테고리별 세부 점수</h3>
          <p className="result-card__desc">
            관계의 각 영역을 조금 더 세부적으로 볼 수 있어요.
          </p>

          <MetricGrid
            items={[
              {
                label: CATEGORY_META.emotion.label,
                value: analysis.categoryScores.emotion,
              },
              {
                label: CATEGORY_META.stability.label,
                value: analysis.categoryScores.stability,
              },
              { label: "갈등 리스크", value: analysis.conflictRisk },
              {
                label: CATEGORY_META.future.label,
                value: analysis.categoryScores.future,
              },
            ]}
          />
        </section>
      </div>

      {isPremium ? (
        <PremiumReport analysis={analysis} />
      ) : (
        <PremiumLockedSection onClickPayment={handlePaymentClick} />
      )}

      <section className="card result-card">
        <h3 className="result-card__title">내가 선택한 답변 보기</h3>
        <p className="result-card__desc">
          선택 흐름을 다시 보면 결과를 더 쉽게 이해할 수 있어요.
        </p>

        <ul className="answer-list">
          {answers.map((answer) => (
            <li key={answer.questionId}>
              <strong>
                [{CATEGORY_META[answer.category]?.label ?? answer.category}]
              </strong>{" "}
              {answer.question}
              <br />→ {answer.selectedLabel}
            </li>
          ))}
        </ul>
      </section>

      <section className="card result-card result-card--actions">
        <h3 className="result-card__title">결과 저장 / 공유</h3>
        <p className="result-card__desc">
          결과 카드 이미지를 저장하거나, 결과 문구를 바로 공유할 수 있어요.
        </p>

        <div className="button-row">
          <button
            type="button"
            className="button button--ghost"
            onClick={handleCapture}
          >
            결과 카드 이미지 저장
          </button>

          <button
            type="button"
            className="button button--primary"
            onClick={() =>
              shareResult(
                shareConfig,
                analysis.relationshipLevel.title,
                analysis.finalValue,
              )
            }
          >
            결과 문구 공유하기
          </button>

          <button
            type="button"
            className="button button--secondary"
            onClick={onRestart}
          >
            다시 테스트하기
          </button>
        </div>
      </section>
    </>
  );
}
