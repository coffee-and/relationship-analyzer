// 결과 섹션은 제목, 설명, 포인트만 바꿔 끼우는 공통 카드예요.
export function SectionCard({ title, desc, points }) {
  return (
    <section className="card result-card">
      <h3 className="result-card__title">{title}</h3>
      {desc ? <p className="result-card__desc">{desc}</p> : null}

      {points?.length ? (
        <ul className="bullet-list">
          {points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}