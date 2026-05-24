import { EditableText } from "@sweetmedia/admin-core/page-editor";
import VirtualLpFaqItem from "./VirtualLpFaqItem";
import { VIRTUAL_LP_FAQS } from "./content";

const ROUTE = "/virtual-lp";

export default function VirtualLpFaq() {
  return (
    <div className="divide-y divide-sand-dark border border-sand-dark bg-white">
      {VIRTUAL_LP_FAQS.map((faq, i) => (
        <VirtualLpFaqItem
          key={faq.q}
          initialOpen={i === 0}
          question={
            <EditableText
              routePath={ROUTE}
              fieldKey={`faqs.${i}.q`}
              defaultValue={faq.q}
              as="span"
            />
          }
          answer={
            <EditableText
              routePath={ROUTE}
              fieldKey={`faqs.${i}.a`}
              defaultValue={faq.a}
              as="span"
            />
          }
        />
      ))}
    </div>
  );
}
