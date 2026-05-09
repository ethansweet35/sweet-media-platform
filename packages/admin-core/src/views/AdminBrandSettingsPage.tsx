"use client";

import { useState, useEffect, useCallback, useRef, KeyboardEvent } from "react";
import AdminPageHeader from "../components/AdminPageHeader";
import { ADMIN_OCEAN, ADMIN_OCEAN_HOVER } from "../lib/adminTheme";
import { useBrandSettings, type BusinessHoursRow } from "../hooks/useBrandSettings";

// ─── Constants ───────────────────────────────────────────────────────────────

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

// ─── Internal form types ──────────────────────────────────────────────────────

interface HoursEntry {
  open: string;
  close: string;
  is24: boolean;
}

type HoursMap = Record<string, HoursEntry>;

interface FormState {
  phone: string;
  street_address: string;
  city: string;
  state: string;
  zip: string;
  latitude: string;
  longitude: string;
  social_facebook: string;
  social_instagram: string;
  social_linkedin: string;
  social_twitter: string;
  license_number: string;
  license_authority: string;
  founded_year: string;
  accreditations: string[];
  insurance_accepted: string[];
  levels_of_care: string[];
  hours: HoursMap;
}

function emptyHoursMap(): HoursMap {
  return Object.fromEntries(DAYS.map((d) => [d, { open: "", close: "", is24: false }]));
}

function hoursArrayToMap(rows: BusinessHoursRow[] | null | undefined): HoursMap {
  const map = emptyHoursMap();
  if (!rows) return map;
  for (const row of rows) {
    if (row.day && map[row.day] !== undefined) {
      const is24 = row.open === "00:00" && row.close === "23:59";
      map[row.day] = { open: is24 ? "" : row.open, close: is24 ? "" : row.close, is24 };
    }
  }
  return map;
}

function hoursMapToArray(map: HoursMap): BusinessHoursRow[] {
  const out: BusinessHoursRow[] = [];
  for (const day of DAYS) {
    const entry = map[day];
    if (!entry) continue;
    if (entry.is24) {
      out.push({ day, open: "00:00", close: "23:59" });
    } else if (entry.open.trim() || entry.close.trim()) {
      out.push({ day, open: entry.open.trim(), close: entry.close.trim() });
    }
  }
  return out;
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function SectionCard({
  icon,
  title,
  children,
}: {
  icon: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl border border-neutral-100 overflow-hidden">
      <div className="flex items-center gap-3 px-6 py-4 border-b border-neutral-100">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${ADMIN_OCEAN}14` }}
        >
          <i className={`${icon} text-sm`} style={{ color: ADMIN_OCEAN }}></i>
        </div>
        <h2 className="text-sm font-semibold text-neutral-900">{title}</h2>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-[10px] tracking-[0.2em] uppercase font-semibold text-neutral-400 mb-1.5">
      {children}
    </label>
  );
}

const inputCls =
  "w-full border border-neutral-200 rounded-xl px-3.5 py-2.5 text-sm text-neutral-800 placeholder:text-neutral-300 focus:outline-none focus:border-[#3d6f7f] transition-colors bg-white";

function TextField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={inputCls}
        step={type === "number" ? "any" : undefined}
      />
    </div>
  );
}

function TagInput({
  label,
  values,
  onChange,
  placeholder,
}: {
  label: string;
  values: string[];
  onChange: (v: string[]) => void;
  placeholder?: string;
}) {
  const [draft, setDraft] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const addTag = useCallback(() => {
    const trimmed = draft.trim();
    if (trimmed && !values.includes(trimmed)) {
      onChange([...values, trimmed]);
    }
    setDraft("");
  }, [draft, values, onChange]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    } else if (e.key === "Backspace" && draft === "" && values.length > 0) {
      onChange(values.slice(0, -1));
    }
  };

  const removeTag = (idx: number) => {
    onChange(values.filter((_, i) => i !== idx));
  };

  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <div
        className="min-h-[42px] flex flex-wrap gap-1.5 items-center border border-neutral-200 rounded-xl px-3 py-2 cursor-text transition-colors focus-within:border-[#3d6f7f] bg-white"
        onClick={() => inputRef.current?.focus()}
      >
        {values.map((tag, i) => (
          <span
            key={`${tag}-${i}`}
            className="inline-flex items-center gap-1 text-xs font-medium text-neutral-700 bg-neutral-100 rounded-lg px-2.5 py-1"
          >
            {tag}
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); removeTag(i); }}
              className="text-neutral-400 hover:text-neutral-600 transition-colors cursor-pointer leading-none"
              aria-label={`Remove ${tag}`}
            >
              <i className="ri-close-line text-[10px]"></i>
            </button>
          </span>
        ))}
        <input
          ref={inputRef}
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={addTag}
          placeholder={values.length === 0 ? (placeholder ?? "Type and press Enter…") : ""}
          className="flex-1 min-w-[120px] bg-transparent text-sm text-neutral-800 placeholder:text-neutral-300 focus:outline-none"
        />
      </div>
      <p className="text-[10px] text-neutral-400 mt-1">Type a value and press Enter or comma to add. Click × to remove.</p>
    </div>
  );
}

function BusinessHoursEditor({
  hours,
  onChange,
}: {
  hours: HoursMap;
  onChange: (h: HoursMap) => void;
}) {
  const update = (day: string, patch: Partial<HoursEntry>) => {
    onChange({ ...hours, [day]: { ...hours[day], ...patch } });
  };

  return (
    <div className="space-y-2">
      <div className="hidden sm:grid grid-cols-[120px_1fr_1fr_80px] gap-3 mb-1">
        <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-neutral-400">Day</span>
        <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-neutral-400">Open</span>
        <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-neutral-400">Close</span>
        <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-neutral-400 text-center">24 hrs</span>
      </div>
      {DAYS.map((day) => {
        const entry = hours[day] ?? { open: "", close: "", is24: false };
        return (
          <div
            key={day}
            className="grid grid-cols-[120px_1fr_1fr_80px] gap-3 items-center"
          >
            <span className="text-sm font-medium text-neutral-700">{day}</span>
            <input
              type="time"
              value={entry.open}
              disabled={entry.is24}
              onChange={(e) => update(day, { open: e.target.value })}
              className={`${inputCls} ${entry.is24 ? "opacity-40 cursor-not-allowed" : ""}`}
            />
            <input
              type="time"
              value={entry.close}
              disabled={entry.is24}
              onChange={(e) => update(day, { close: e.target.value })}
              className={`${inputCls} ${entry.is24 ? "opacity-40 cursor-not-allowed" : ""}`}
            />
            <div className="flex justify-center">
              <button
                type="button"
                role="switch"
                aria-checked={entry.is24}
                onClick={() => update(day, { is24: !entry.is24 })}
                className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer flex-shrink-0 ${
                  entry.is24 ? "bg-emerald-500" : "bg-neutral-300"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${
                    entry.is24 ? "translate-x-5" : ""
                  }`}
                />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AdminBrandSettingsPage() {
  const { data, loading, error, save } = useBrandSettings();

  const [form, setForm] = useState<FormState>({
    phone: "",
    street_address: "",
    city: "",
    state: "",
    zip: "",
    latitude: "",
    longitude: "",
    social_facebook: "",
    social_instagram: "",
    social_linkedin: "",
    social_twitter: "",
    license_number: "",
    license_authority: "",
    founded_year: "",
    accreditations: [],
    insurance_accepted: [],
    levels_of_care: [],
    hours: emptyHoursMap(),
  });

  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Populate form when data loads
  useEffect(() => {
    if (!data) return;
    setForm({
      phone: data.phone ?? "",
      street_address: data.street_address ?? "",
      city: data.city ?? "",
      state: data.state ?? "",
      zip: data.zip ?? "",
      latitude: data.latitude != null ? String(data.latitude) : "",
      longitude: data.longitude != null ? String(data.longitude) : "",
      social_facebook: data.social_facebook ?? "",
      social_instagram: data.social_instagram ?? "",
      social_linkedin: data.social_linkedin ?? "",
      social_twitter: data.social_twitter ?? "",
      license_number: data.license_number ?? "",
      license_authority: data.license_authority ?? "",
      founded_year: data.founded_year != null ? String(data.founded_year) : "",
      accreditations: data.accreditations ?? [],
      insurance_accepted: data.insurance_accepted ?? [],
      levels_of_care: data.levels_of_care ?? [],
      hours: hoursArrayToMap(data.business_hours),
    });
  }, [data]);

  const set = useCallback(<K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  }, []);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleSave = async () => {
    setSaving(true);
    const latParsed = form.latitude.trim() !== "" ? parseFloat(form.latitude) : null;
    const lngParsed = form.longitude.trim() !== "" ? parseFloat(form.longitude) : null;
    const yearParsed = form.founded_year.trim() !== "" ? parseInt(form.founded_year, 10) : null;
    const hoursArray = hoursMapToArray(form.hours);

    const payload = {
      phone: form.phone.trim() || null,
      street_address: form.street_address.trim() || null,
      city: form.city.trim() || null,
      state: form.state.trim() || null,
      zip: form.zip.trim() || null,
      latitude: latParsed != null && !isNaN(latParsed) ? latParsed : null,
      longitude: lngParsed != null && !isNaN(lngParsed) ? lngParsed : null,
      social_facebook: form.social_facebook.trim() || null,
      social_instagram: form.social_instagram.trim() || null,
      social_linkedin: form.social_linkedin.trim() || null,
      social_twitter: form.social_twitter.trim() || null,
      license_number: form.license_number.trim() || null,
      license_authority: form.license_authority.trim() || null,
      founded_year: yearParsed != null && !isNaN(yearParsed) ? yearParsed : null,
      accreditations: form.accreditations.length > 0 ? form.accreditations : null,
      insurance_accepted: form.insurance_accepted.length > 0 ? form.insurance_accepted : null,
      levels_of_care: form.levels_of_care.length > 0 ? form.levels_of_care : null,
      business_hours: hoursArray.length > 0 ? hoursArray : null,
    };

    const ok = await save(payload);
    setSaving(false);
    if (ok) {
      showToast("Brand settings saved");
    } else {
      showToast("Failed to save — check your permissions and try again", "error");
    }
  };

  return (
    <div>
      <AdminPageHeader
        title="Brand Settings"
        subtitle="Contact details, location, social profiles, credentials, and business hours used for structured data and site-wide context."
      />

      {loading && (
        <div className="bg-white rounded-2xl border border-neutral-100 p-16 text-center">
          <i className="ri-loader-4-line animate-spin text-3xl text-neutral-300 mb-3 block"></i>
          <p className="text-sm text-neutral-400">Loading settings…</p>
        </div>
      )}

      {error && !loading && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
          <i className="ri-error-warning-line text-3xl text-red-400 mb-3 block"></i>
          <p className="text-sm font-medium text-red-600 mb-1">Failed to load brand settings</p>
          <p className="text-xs text-red-500">{error}</p>
        </div>
      )}

      {!loading && !error && (
        <div className="space-y-6">

          {/* ── Contact & Location ── */}
          <SectionCard icon="ri-map-pin-2-line" title="Contact & Location">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="sm:col-span-2 lg:col-span-1">
                <TextField
                  label="Phone"
                  value={form.phone}
                  onChange={(v) => set("phone", v)}
                  placeholder="e.g. 949-776-7093"
                />
              </div>
              <div className="sm:col-span-2 lg:col-span-2">
                <TextField
                  label="Street Address"
                  value={form.street_address}
                  onChange={(v) => set("street_address", v)}
                  placeholder="e.g. 123 Main St"
                />
              </div>
              <TextField
                label="City"
                value={form.city}
                onChange={(v) => set("city", v)}
                placeholder="e.g. Newport Beach"
              />
              <TextField
                label="State (2-letter)"
                value={form.state}
                onChange={(v) => set("state", v.toUpperCase().slice(0, 2))}
                placeholder="CA"
              />
              <TextField
                label="ZIP"
                value={form.zip}
                onChange={(v) => set("zip", v)}
                placeholder="92660"
              />
              <TextField
                label="Latitude"
                value={form.latitude}
                onChange={(v) => set("latitude", v)}
                placeholder="33.6189"
                type="number"
              />
              <TextField
                label="Longitude"
                value={form.longitude}
                onChange={(v) => set("longitude", v)}
                placeholder="-117.9298"
                type="number"
              />
            </div>
          </SectionCard>

          {/* ── Social Profiles ── */}
          <SectionCard icon="ri-share-line" title="Social Profiles">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TextField
                label="Facebook"
                value={form.social_facebook}
                onChange={(v) => set("social_facebook", v)}
                placeholder="https://facebook.com/yourbrand"
              />
              <TextField
                label="Instagram"
                value={form.social_instagram}
                onChange={(v) => set("social_instagram", v)}
                placeholder="https://instagram.com/yourbrand"
              />
              <TextField
                label="LinkedIn"
                value={form.social_linkedin}
                onChange={(v) => set("social_linkedin", v)}
                placeholder="https://linkedin.com/company/yourbrand"
              />
              <TextField
                label="X / Twitter"
                value={form.social_twitter}
                onChange={(v) => set("social_twitter", v)}
                placeholder="https://x.com/yourbrand"
              />
            </div>
          </SectionCard>

          {/* ── Credentials ── */}
          <SectionCard icon="ri-award-line" title="Credentials & History">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <TextField
                label="License Number"
                value={form.license_number}
                onChange={(v) => set("license_number", v)}
                placeholder="e.g. 180003AP"
              />
              <div className="sm:col-span-2">
                <TextField
                  label="License Authority"
                  value={form.license_authority}
                  onChange={(v) => set("license_authority", v)}
                  placeholder="e.g. California DHCS"
                />
              </div>
              <TextField
                label="Founded Year"
                value={form.founded_year}
                onChange={(v) => set("founded_year", v)}
                placeholder="e.g. 1994"
                type="number"
              />
            </div>
          </SectionCard>

          {/* ── Tag Inputs ── */}
          <SectionCard icon="ri-price-tag-3-line" title="Accreditations, Insurance & Levels of Care">
            <div className="space-y-5">
              <TagInput
                label="Accreditations"
                values={form.accreditations}
                onChange={(v) => set("accreditations", v)}
                placeholder="e.g. Joint Commission"
              />
              <TagInput
                label="Insurance Accepted"
                values={form.insurance_accepted}
                onChange={(v) => set("insurance_accepted", v)}
                placeholder="e.g. Aetna"
              />
              <TagInput
                label="Levels of Care"
                values={form.levels_of_care}
                onChange={(v) => set("levels_of_care", v)}
                placeholder="e.g. Detox"
              />
            </div>
          </SectionCard>

          {/* ── Business Hours ── */}
          <SectionCard icon="ri-time-line" title="Business Hours">
            <BusinessHoursEditor
              hours={form.hours}
              onChange={(h) => set("hours", h)}
            />
            <p className="text-[10px] text-neutral-400 mt-4">
              Leave open and close empty for days the business is closed. Toggle "24 hrs" to set 00:00–23:59 automatically.
            </p>
          </SectionCard>

          {/* ── Save ── */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 rounded-xl px-7 py-3 text-[11px] font-bold uppercase tracking-[0.12em] text-white transition-opacity hover:opacity-95 shadow-[0_2px_12px_rgba(61,111,127,0.2)] disabled:opacity-50 cursor-pointer"
              style={{ backgroundColor: saving ? ADMIN_OCEAN_HOVER : ADMIN_OCEAN }}
            >
              {saving ? (
                <i className="ri-loader-4-line animate-spin text-xs"></i>
              ) : (
                <i className="ri-save-line text-xs"></i>
              )}
              {saving ? "Saving…" : "Save Settings"}
            </button>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-lg transition-all duration-300 ${
            toast.type === "success" ? "bg-[#3d6f7f] text-white" : "bg-red-500 text-white"
          }`}
        >
          <i
            className={`text-base ${
              toast.type === "success" ? "ri-check-line" : "ri-error-warning-line"
            }`}
          ></i>
          <span className="text-sm font-medium">{toast.message}</span>
        </div>
      )}
    </div>
  );
}
