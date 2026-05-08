"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { PHONE_DISPLAY, PHONE_HREF } from "@/data/site";

export type QuizOption = {
  label: string;
  score: number;
};

export type QuizQuestion = {
  id: string;
  prompt: string;
  options: QuizOption[];
};

export type QuizResultBucket = {
  /** Inclusive lower bound of the score range (use 0 for the lowest bucket). */
  minScore: number;
  /** "low" | "moderate" | "high" — purely a label for styling. */
  level: "low" | "moderate" | "high";
  title: string;
  body: string;
  ctaLabel?: string;
};

export type QuizConfig = {
  intro: {
    eyebrow: string;
    headline: string;
    body: string;
  };
  questions: QuizQuestion[];
  /** Buckets must be sorted by minScore ascending. */
  buckets: QuizResultBucket[];
};

const LEVEL_STYLES: Record<
  QuizResultBucket["level"],
  { ring: string; chip: string; chipText: string; icon: string }
> = {
  low: {
    ring: "border-[var(--color-divider)]",
    chip: "bg-[var(--color-cream)]",
    chipText: "text-[var(--color-sage-deep)]",
    icon: "ri-checkbox-circle-line",
  },
  moderate: {
    ring: "border-[var(--color-sage)]",
    chip: "bg-[var(--color-sage)]/15",
    chipText: "text-[var(--color-sage-deep)]",
    icon: "ri-error-warning-line",
  },
  high: {
    ring: "border-[var(--color-sage-deep)]",
    chip: "bg-[var(--color-sage-deep)]",
    chipText: "text-white",
    icon: "ri-alarm-warning-line",
  },
};

export default function Quiz({ config }: { config: QuizConfig }) {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const total = config.questions.length;
  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === total;

  const score = useMemo(
    () => Object.values(answers).reduce((a, b) => a + b, 0),
    [answers],
  );

  const result = useMemo(() => {
    let chosen = config.buckets[0];
    for (const b of config.buckets) {
      if (score >= b.minScore) chosen = b;
    }
    return chosen;
  }, [score, config.buckets]);

  function setAnswer(qid: string, scoreVal: number) {
    setAnswers((prev) => ({ ...prev, [qid]: scoreVal }));
  }

  function reset() {
    setAnswers({});
    setSubmitted(false);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (submitted) {
    const styles = LEVEL_STYLES[result.level];
    return (
      <div className="mx-auto max-w-3xl px-6 py-16">
        <div
          className={`rounded-3xl border-2 bg-white p-8 md:p-12 ${styles.ring}`}
        >
          <div
            className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] ${styles.chip} ${styles.chipText}`}
          >
            <i className={`text-base ${styles.icon}`}></i>
            Your result
          </div>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[var(--color-ink)] md:text-4xl">
            {result.title}
          </h2>
          <p className="mt-5 text-base leading-7 text-[var(--color-ink-muted)] md:text-lg">
            {result.body}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={PHONE_HREF}
              className="inline-flex items-center gap-2 rounded-full bg-[var(--color-sage)] px-7 py-4 text-sm font-semibold uppercase tracking-wider text-white shadow-sm hover:bg-[var(--color-sage-deep)]"
            >
              <i className="ri-phone-fill text-base"></i>
              {result.ctaLabel ?? `Call ${PHONE_DISPLAY}`}
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--color-ink)] px-7 py-4 text-sm font-semibold uppercase tracking-wider text-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-white"
            >
              Request a Call Back
            </Link>
            <button
              type="button"
              onClick={reset}
              className="text-sm font-semibold text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] underline-offset-4 hover:underline"
            >
              Retake
            </button>
          </div>

          <p className="mt-8 text-xs text-[var(--color-ink-muted)]">
            This quiz is for informational purposes only and is not a clinical
            diagnosis. For an honest assessment of your situation, please speak
            with one of our certified interventionists directly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <div className="mb-8">
        <p className="brand-eyebrow text-[var(--color-sage-deep)]">
          {config.intro.eyebrow}
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--color-ink)] md:text-4xl">
          {config.intro.headline}
        </h1>
        <p className="mt-4 text-base leading-7 text-[var(--color-ink-muted)] md:text-lg">
          {config.intro.body}
        </p>
      </div>

      {/* Progress */}
      <div className="mb-8 flex items-center gap-3 text-sm text-[var(--color-ink-muted)]">
        <span>
          {answeredCount} of {total} answered
        </span>
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-[var(--color-divider)]">
          <div
            className="h-full rounded-full bg-[var(--color-sage)] transition-all"
            style={{ width: `${(answeredCount / total) * 100}%` }}
          />
        </div>
      </div>

      {/* Questions */}
      <div className="grid gap-6">
        {config.questions.map((q, qi) => (
          <fieldset
            key={q.id}
            className="rounded-2xl border border-[var(--color-divider)] bg-white p-6"
          >
            <legend className="px-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-sage-deep)]">
              Question {qi + 1}
            </legend>
            <p className="mt-1 text-base font-semibold text-[var(--color-ink)] md:text-lg">
              {q.prompt}
            </p>
            <div className="mt-5 grid gap-2">
              {q.options.map((opt) => {
                const checked = answers[q.id] === opt.score;
                return (
                  <label
                    key={opt.label}
                    className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 text-sm transition ${
                      checked
                        ? "border-[var(--color-sage)] bg-[var(--color-cream)]"
                        : "border-[var(--color-divider)] bg-white hover:border-[var(--color-sage)]"
                    }`}
                  >
                    <input
                      type="radio"
                      name={q.id}
                      value={opt.score}
                      checked={checked}
                      onChange={() => setAnswer(q.id, opt.score)}
                      className="mt-0.5 h-4 w-4 accent-[var(--color-sage-deep)]"
                    />
                    <span className="text-[var(--color-ink)]">{opt.label}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>
        ))}
      </div>

      {/* Submit */}
      <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
        <button
          type="button"
          disabled={!allAnswered}
          onClick={() => {
            setSubmitted(true);
            if (typeof window !== "undefined")
              window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="inline-flex items-center gap-2 rounded-full bg-[var(--color-sage)] px-7 py-4 text-sm font-semibold uppercase tracking-wider text-white shadow-sm hover:bg-[var(--color-sage-deep)] disabled:cursor-not-allowed disabled:opacity-50"
        >
          See My Result
          <i className="ri-arrow-right-line text-base"></i>
        </button>
        {!allAnswered && (
          <p className="text-xs text-[var(--color-ink-muted)]">
            Answer all {total} questions to see your result.
          </p>
        )}
      </div>
    </div>
  );
}
