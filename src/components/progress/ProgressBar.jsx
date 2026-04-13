// 진행률 바는 숫자보다 직관적으로 흐름을 보여줘요.
export function ProgressBar({ value }) {
  return (
    <div className="progress">
      <div className="progress__fill" style={{ width: `${value}%` }} />
    </div>
  );
}