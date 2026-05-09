/**
 * Northbound homepage Supabase asset URLs.
 * All hosted at site-assets/{logos,images}/ on the project's Supabase storage.
 */

const SUPABASE_BASE =
  "https://ahufsygjwpbymomfdazb.supabase.co/storage/v1/object/public/site-assets";

export const NB_LOGO = `${SUPABASE_BASE}/logos/northbound-logo.png`;

export const HERO_BG = `${SUPABASE_BASE}/images/nbt_hero_bg01.jpg`;

export const PROCESS_IMAGES = {
  feelBetter: `${SUPABASE_BASE}/images/nbt_process_step01_feel-better.jpg`,
  discoverYourself: `${SUPABASE_BASE}/images/nbt_process_step02_discover-yourself.jpg`,
  liveFree: `${SUPABASE_BASE}/images/nbt_process_step03_live-free.jpg`,
} as const;

export const SIGNATURE_IMAGES = {
  adventureTherapy: `${SUPABASE_BASE}/images/nbt_signature_adventure-therapy.jpg`,
  soundBath: `${SUPABASE_BASE}/images/nbt_signature_sound-bath.jpg`,
  artTherapy: `${SUPABASE_BASE}/images/nbt_signature_art-therapy.jpg`,
  wolfTherapy: `${SUPABASE_BASE}/images/nbt_signature_wolf-therapy.jpg`,
  musicRecovery: `${SUPABASE_BASE}/images/nbt_signature_music-recovery.jpg`,
  yoga: `${SUPABASE_BASE}/images/nbt_signature_yoga.jpg`,
} as const;

export const LOCATION_IMAGES = {
  newportBeach: `${SUPABASE_BASE}/images/nbt_location_newport-beach.jpg`,
  gardenGrove: `${SUPABASE_BASE}/images/nbt_location_garden-grove.jpg`,
  sanDiego: `${SUPABASE_BASE}/images/nbt_location_san-diego.jpg`,
  seattle: `${SUPABASE_BASE}/images/nbt_location_seattle.jpg`,
} as const;
