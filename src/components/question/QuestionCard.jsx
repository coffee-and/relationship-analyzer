import { CATEGORY_META } from "../../data/config.js";

// 질문 카드 하나만 책임지게 해서 재사용성을 높여요.
export function QuestionCard({
  question,
  questionNumber,
  selectedOptionId,
  onSelectOption,
  onNext,
}) {
  const categoryLabel = CATEGORY_META[question.category]?.label ?? question.category;

  return (
    <section className="card question-card">
      <div className="question-card__header">
        <span className="badge badge--soft">{categoryLabel}</span>
      </div>

      <h2 className="question-card__title">
        {questionNumber}. {question.prompt}
      </h2>

      <div className="option-list">
        {question.options.map((option) => {
          const isSelected = option.id === selectedOptionId;

          return (
            <button
              key={option.id}
              type="button"
              className={`option-card ${isSelected ? "option-card--selected" : ""}`}
              onClick={() => onSelectOption(option.id)}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        className="button button--primary button--full"
        disabled={!selectedOptionId}
        onClick={onNext}
      >
        다음 질문
      </button>
    </section>
  );
}