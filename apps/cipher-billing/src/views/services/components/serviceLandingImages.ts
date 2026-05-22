import { SERVICE_IMAGES_BASE } from "@/views/services/components/servicePageConstants";

/** Unique Supabase assets per service landing route (cb_<route>_<section><index>.jpg). */
export const IOP_LANDING_IMAGES = {
  hero: `${SERVICE_IMAGES_BASE}/cb_iop_hero01.jpg`,
  program: `${SERVICE_IMAGES_BASE}/cb_iop_program02.jpg`,
  rcm: `${SERVICE_IMAGES_BASE}/cb_iop_rcm02.jpg`,
} as const;

export const PHP_LANDING_IMAGES = {
  hero: `${SERVICE_IMAGES_BASE}/cb_php_hero01.jpg`,
  program: `${SERVICE_IMAGES_BASE}/cb_php_program02.jpg`,
  rcm: `${SERVICE_IMAGES_BASE}/cb_php_rcm02.jpg`,
} as const;

export const RESIDENTIAL_LANDING_IMAGES = {
  hero: `${SERVICE_IMAGES_BASE}/cb_residential_hero01.jpg`,
  asam: `${SERVICE_IMAGES_BASE}/cb_residential_asam02.jpg`,
} as const;

export const SUBSTANCE_ABUSE_LANDING_IMAGES = {
  hero: `${SERVICE_IMAGES_BASE}/cb_sud_hero01.jpg`,
  program: `${SERVICE_IMAGES_BASE}/cb_sud_program02.jpg`,
  rcm: `${SERVICE_IMAGES_BASE}/cb_sud_rcm02.jpg`,
} as const;

export const MENTAL_HEALTH_LANDING_IMAGES = {
  hero: `${SERVICE_IMAGES_BASE}/cb_mh_hero01.jpg`,
  program: `${SERVICE_IMAGES_BASE}/cb_mh_program02.jpg`,
  rcm: `${SERVICE_IMAGES_BASE}/cb_mh_rcm02.jpg`,
} as const;

export const DETOX_LANDING_IMAGES = {
  hero: `${SERVICE_IMAGES_BASE}/cb_detox_hero01.jpg`,
  program: `${SERVICE_IMAGES_BASE}/cb_detox_program02.jpg`,
  rcm: `${SERVICE_IMAGES_BASE}/cb_detox_rcm02.jpg`,
} as const;
