import type { Metadata } from "next";
import LpGalpDetoxPage from "@/views/lp/LpGalpDetoxPage";

export const metadata: Metadata = {
  title: "Specialized 7-OH / Kratom Detox Treatment | Rize OC",
  description: "7-OH/Kratom can act like an opiate, leading to dependence and withdrawal. Our medical team provides safe, professional detox to help you stabilize and recover comfortably.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <LpGalpDetoxPage
      headline="Specialized 7-OH / Kratom Detox With Professional Support"
      subheadline="7-OH/Kratom can act like an opiate, leading to dependence, withdrawal, and increasing tolerance over time. Our medical team provides safe, professional detox to help you stabilize and start recovering comfortably."
      eyebrow="Kratom Detox Specialists"
      stat="24/7"
      statLabel="Medical Supervision"
      showLocationOptions={false}
      substances={[
        "Alcohol Addiction",
        "Meth Addiction",
        "Opiate / 7-OH / Kratom Addiction",
        "Cocaine Addiction",
        "Xanax Addiction",
        "Fentanyl Addiction",
        "Suboxone Addiction",
      ]}
      substanceHeadline="Substance Use Disorders We Treat"
      substanceIntro="Substance use disorders can affect anyone, regardless of age, background, or lifestyle. At Rize OC, we specialize in treating a wide range of substance use disorders including kratom and 7-OH dependence, providing the support and tools to help clients build lasting sobriety."
    />
  );
}
