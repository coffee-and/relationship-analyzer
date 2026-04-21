import { CATEGORY_META } from "../../data/config.js";

// 질문 카드 컴포넌트는 각 질문과 선택지를 보여주는 역할

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
      <div className="question-card__top">
        <div className="question-card__badge-wrap">
          <div className="question-card__badge-group">
            <span className="badge badge--soft">{categoryLabel}</span>
            <span className="question-card__index">Q {String(questionNumber).padStart(2, "0")}</span>
          </div>
        </div>

        <div className="question-card__line" />
      </div>

      <h2 className="question-card__title">
        <span className="question-card__title-number">{questionNumber}.</span>{" "}
        {question.prompt}
      </h2>

      <p className="question-card__hint">
        지금 가장 가까운 느낌을 하나 골라줘.
      </p>

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
              <span className="option-card__text">{option.label}</span>
              <span className="option-card__dot" />
            </button>
          );
        })}
      </div>

      <button
        type="button"
        className="button button--primary button--full question-card__next"
        disabled={!selectedOptionId}
        onClick={onNext}
      >
        다음 질문으로
      </button>
    </section>
  );
}