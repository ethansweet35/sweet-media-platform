"use client";

import { useRef, useState } from "react";

const POSITION_OPTIONS = [
  "Claims Resolution Specialist",
  "Utilization Review Specialist",
  "Billing Coordinator",
  "Experience Executive",
  "Director-Level / Leadership",
  "Other",
] as const;

const inputClass =
  "w-full rounded border border-[#166C96]/35 bg-white px-3 py-2.5 text-sm text-[#0D1833] placeholder:text-[#7a8791]/75 outline-none focus:border-[#166C96] focus:ring-1 focus:ring-[#166C96]/20 transition";

function Label({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#5a6570]"
    >
      {children}
    </label>
  );
}

type Status = "idle" | "sending" | "success" | "error";

export default function CareersApplyForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  function handleFile(file: File | null) {
    if (!file) return;
    const ext = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();
    if (![".pdf", ".doc", ".docx"].includes(ext)) {
      setErrorMsg("Only PDF, DOC, or DOCX files are accepted.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg("Resume must be under 10 MB.");
      return;
    }
    setErrorMsg(null);
    setFileName(file.name);
    // Assign file to the hidden input
    const dt = new DataTransfer();
    dt.items.add(file);
    if (fileInputRef.current) fileInputRef.current.files = dt.files;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg(null);

    if (!fileInputRef.current?.files?.length) {
      setErrorMsg("Please attach your resume before submitting.");
      return;
    }

    setStatus("sending");

    const fd = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/careers/apply", { method: "POST", body: fd });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      setStatus("success");
      formRef.current?.reset();
      setFileName(null);
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-[#166C96]/30 bg-[#EFF6FF] px-8 py-12 text-center shadow-sm">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#166C96]/15 text-[#166C96]">
          <i className="ri-checkbox-circle-line text-3xl leading-none" />
        </div>
        <h3 className="font-marcellus text-xl font-medium text-[#0D1833]">Application Received</h3>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-[#4a5565]">
          Thank you for your interest in joining Cipher Billing. Our hiring team will review your
          application and be in touch within 3–5 business days.
        </p>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      className="grid gap-5"
      noValidate
      suppressHydrationWarning
    >
      {/* Name row */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="ca-first-name">First Name <span className="text-red-500">*</span></Label>
          <input
            id="ca-first-name"
            name="firstName"
            autoComplete="given-name"
            required
            placeholder="First"
            className={inputClass}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="ca-last-name">Last Name <span className="text-red-500">*</span></Label>
          <input
            id="ca-last-name"
            name="lastName"
            autoComplete="family-name"
            required
            placeholder="Last"
            className={inputClass}
          />
        </div>
      </div>

      {/* Contact row */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="ca-email">Email Address <span className="text-red-500">*</span></Label>
          <input
            id="ca-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@email.com"
            className={inputClass}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="ca-phone">Phone Number</Label>
          <input
            id="ca-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="(555) 000-0000"
            className={inputClass}
          />
        </div>
      </div>

      {/* Position */}
      <div className="grid gap-2">
        <Label htmlFor="ca-position">Position of Interest <span className="text-red-500">*</span></Label>
        <select id="ca-position" name="position" required className={inputClass}>
          <option value="">Select a position…</option>
          {POSITION_OPTIONS.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      {/* LinkedIn */}
      <div className="grid gap-2">
        <Label htmlFor="ca-linkedin">LinkedIn Profile URL</Label>
        <input
          id="ca-linkedin"
          name="linkedin"
          type="url"
          placeholder="https://linkedin.com/in/yourprofile"
          className={inputClass}
        />
      </div>

      {/* Cover note */}
      <div className="grid gap-2">
        <Label htmlFor="ca-cover">Cover Note</Label>
        <textarea
          id="ca-cover"
          name="coverNote"
          rows={4}
          placeholder="Tell us why you're interested in joining Cipher Billing and what you'd bring to the team."
          className={`min-h-[110px] ${inputClass}`}
        />
      </div>

      {/* Resume upload */}
      <div className="grid gap-2">
        <Label htmlFor="ca-resume">
          Resume / CV <span className="text-red-500">*</span>
        </Label>

        {/* Hidden real file input */}
        <input
          ref={fileInputRef}
          id="ca-resume"
          name="resume"
          type="file"
          accept=".pdf,.doc,.docx"
          className="sr-only"
          onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
        />

        {/* Drop-zone */}
        <div
          role="button"
          tabIndex={0}
          aria-label="Click or drag to upload your resume"
          onKeyDown={(e) => e.key === "Enter" && fileInputRef.current?.click()}
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            handleFile(e.dataTransfer.files[0] ?? null);
          }}
          className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded border-2 border-dashed px-6 py-8 text-center transition ${
            dragOver
              ? "border-[#166C96] bg-[#166C96]/08"
              : fileName
              ? "border-[#166C96]/50 bg-[#EFF6FF]"
              : "border-[#166C96]/30 bg-[#F8FAFC] hover:border-[#166C96]/50 hover:bg-[#EFF6FF]"
          }`}
        >
          <i
            className={`text-2xl leading-none ${fileName ? "ri-file-check-line text-[#166C96]" : "ri-upload-cloud-2-line text-[#8fa6b8]"}`}
          />
          {fileName ? (
            <>
              <span className="text-sm font-semibold text-[#0D1833]">{fileName}</span>
              <span className="text-xs text-[#166C96]">Click to change file</span>
            </>
          ) : (
            <>
              <span className="text-sm font-medium text-[#0D1833]">
                Drop your resume here, or{" "}
                <span className="font-semibold text-[#166C96]">browse</span>
              </span>
              <span className="text-xs text-[#7a8791]">PDF, DOC, or DOCX · Max 10 MB</span>
            </>
          )}
        </div>
      </div>

      {errorMsg ? (
        <p className="text-sm font-medium text-red-700" role="alert">
          {errorMsg}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex w-full items-center justify-center gap-2 rounded bg-[#050a14] py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition hover:bg-[#166C96] disabled:opacity-60"
      >
        {status === "sending" ? (
          <>
            <i className="ri-loader-4-line animate-spin text-sm" />
            Submitting…
          </>
        ) : (
          <>
            <i className="ri-send-plane-line text-sm" />
            Submit Application
          </>
        )}
      </button>

      <p className="text-center text-[11px] leading-relaxed text-[#7a8791]">
        Your resume is stored securely and only shared with the Cipher Billing hiring team.
      </p>
    </form>
  );
}
