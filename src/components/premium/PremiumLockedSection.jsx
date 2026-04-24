import { PREMIUM_PRICE, premiumBenefits } from '../../data/premiumContent.js';

// 프리미엄 리포트 결제 전 잠금 카드예요.
export function PremiumLockedSection({ onClickPayment }) {
  return (
    <section className="card premium-lock">
      <div className="premium-lock__label">PREMIUM REPORT</div>

      <h3 className="premium-lock__title">
        더 깊은 관계 분석을 열어볼까요?
      </h3>

      <p className="premium-lock__desc">
        무료 결과에서는 핵심 흐름만 보여주고, 프리미엄 리포트에서는 반복되는
        갈등 원인과 실제로 써볼 수 있는 대화 가이드까지 제공해요.
      </p>

      <ul className="premium-lock__list">
        {premiumBenefits.map((benefit) => (
          <li key={benefit}>{benefit}</li>
        ))}
      </ul>

      <button
        type="button"
        className="button button--primary premium-lock__button"
        onClick={onClickPayment}
      >
        프리미엄 리포트 열기 ₩{PREMIUM_PRICE.toLocaleString()}
      </button>
    </section>
  );
}