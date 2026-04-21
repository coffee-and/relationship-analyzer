// 상단 소개 영역은 브랜딩과 진행 정보를 함께 보여주는 중요한 부분입니다. 
// 이 Hero 컴포넌트는 사용자가 현재 어떤 단계에 있는지 명확하게 알 수 있도록 디자인되었습니다.

export function Hero({ eyebrow, title, subtitle, progressText }) {
  const [current, total] = progressText.split(" / ");

  return (
    <header className="hero">
      <div className="hero__copy">
        <span className="hero__eyebrow">{eyebrow}</span>

        <div className="hero__title-wrap">
          <p className="hero__kicker">EMOTION / STABILITY / FUTURE</p>
          <h1 className="hero__title">{title}</h1>
        </div>

        <p className="hero__subtitle">{subtitle}</p>
      </div>

      <aside className="hero__meta">
        <div className="hero__progress-card">
          <span className="hero__progress-label">STEP</span>
          <div className="hero__progress-value">
            <strong>{current}</strong>
            <span>/ {total}</span>
          </div>
        </div>

        <div className="hero__mini-card">
          <span className="hero__mini-label">CURRENT MODE</span>
          <strong>Relationship Scan</strong>
        </div>
      </aside>
    </header>
  );
}