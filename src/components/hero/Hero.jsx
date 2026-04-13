// 상단 소개 영역은 브랜딩과 진행 정보를 함께 보여줘요.
export function Hero({ eyebrow, title, subtitle, progressText }) {
  return (
    <header className="hero">
      <div className="hero__copy">
        <span className="hero__eyebrow">{eyebrow}</span>
        <h1 className="hero__title">{title}</h1>
        <p className="hero__subtitle">{subtitle}</p>
      </div>

      <aside className="hero__meta">
        <div className="hero__badge">{progressText}</div>
      </aside>
    </header>
  );
}