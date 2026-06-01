import VirtualLpFaqItem from "./VirtualLpFaqItem";
import { VIRTUAL_LP_FAQS } from "./content";

export default function VirtualLpFaq() {
  return (
    <div className="divide-y divide-sand-dark border border-sand-dark bg-white">
      {VIRTUAL_LP_FAQS.map((faq, i) => (
        <VirtualLpFaqItem
          key={faq.q}
          initialOpen={i === 0}
          question={
            <span>{faq.q}</span>
          }
          answer={
            <span>{faq.a}</span>
          }
        />
      ))}
    </div>
  );
}
