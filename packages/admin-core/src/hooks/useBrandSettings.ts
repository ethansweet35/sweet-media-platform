"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabase";

export interface BusinessHoursRow {
  day: string;
  open: string;
  close: string;
}

/** Shape returned from Supabase — only the 18 migration columns. */
export interface BrandSettingsRow {
  phone: string | null;
  street_address: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  latitude: number | null;
  longitude: number | null;
  social_facebook: string | null;
  social_instagram: string | null;
  social_linkedin: string | null;
  social_twitter: string | null;
  license_number: string | null;
  license_authority: string | null;
  founded_year: number | null;
  accreditations: string[] | null;
  insurance_accepted: string[] | null;
  levels_of_care: string[] | null;
  business_hours: BusinessHoursRow[] | null;
}

/** Only the 18 new columns are ever written — never site_key, site_name, logo_url, or AI fields. */
const SELECT_COLS = [
  "phone",
  "street_address",
  "city",
  "state",
  "zip",
  "latitude",
  "longitude",
  "social_facebook",
  "social_instagram",
  "social_linkedin",
  "social_twitter",
  "license_number",
  "license_authority",
  "founded_year",
  "accreditations",
  "insurance_accepted",
  "levels_of_care",
  "business_hours",
].join(",");

export function useBrandSettings() {
  const [data, setData] = useState<BrandSettingsRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const siteKey = process.env.NEXT_PUBLIC_SITE_ID;

  const fetch = useCallback(async () => {
    if (!siteKey) {
      setError("NEXT_PUBLIC_SITE_ID is not set — cannot identify the brand settings row.");
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const { data: rows, error: sbError } = await supabase
        .from("brand_settings")
        .select(SELECT_COLS)
        .eq("site_key", siteKey)
        .limit(1)
        .single();

      if (sbError) throw sbError;
      setData(rows as unknown as BrandSettingsRow);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load brand settings.");
    } finally {
      setLoading(false);
    }
  }, [siteKey]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const save = useCallback(
    async (payload: Partial<BrandSettingsRow>): Promise<boolean> => {
      if (!siteKey) return false;
      try {
        const { error: sbError } = await supabase
          .from("brand_settings")
          .update({ ...payload, updated_at: new Date().toISOString() })
          .eq("site_key", siteKey);
        if (sbError) throw sbError;
        await fetch();
        return true;
      } catch {
        return false;
      }
    },
    [siteKey, fetch]
  );

  return { data, loading, error, refetch: fetch, save };
}
