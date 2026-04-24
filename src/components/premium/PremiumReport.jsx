import { premiumSections } from "../../data/premiumContent.js";

// 결제 후 보여줄 프리미엄 상세 리포트예요.
export function PremiumReport({ analysis }) {
  return (
    <section className="card premium-report">
      <div className="premium-report__label">PREMIUM REPORT OPENED</div>

      <h3 className="premium-report__title">
        지금 관계를 더 깊게 해석해볼게요
      </h3>

      <p className="premium-report__desc">
        무료 결과는 관계의 큰 흐름을 보여주고, 프리미엄 리포트는 감정 소모, 반복
        갈등, 회복 가능성, 실제 대화 방법까지 더 구체적으로 정리해요.
      </p>

      <div className="premium-report__summary">
        <div>
          <span>대표 갈등 유형</span>
          <strong>{analysis.topTypeLabel}</strong>
        </div>

        <div>
          <span>최종 판단값</span>
          <strong>{analysis.finalValue}</strong>
        </div>
      </div>

      <div className="premium-report__sections">
        {premiumSections.map((section) => (
          <article key={section.title} className="premium-report__section">
            <h4>{section.title}</h4>
            <p>{section.description}</p>

            {section.points?.length ? (
              <ul className="premium-report__points">
                {section.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
