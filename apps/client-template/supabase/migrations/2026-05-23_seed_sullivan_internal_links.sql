-- Seed internal_links for Sullivan Recovery (and idempotent re-run for that project only).
-- Other brands: no-op when site_key is not sullivan-recovery.

do $$
begin
  if not exists (
    select 1 from public.brand_settings where site_key = 'sullivan-recovery'
  ) then
    raise notice 'seed_sullivan_internal_links: not sullivan-recovery, skipping';
    return;
  end if;

  insert into public.internal_links (keyword, href, priority, active)
  select v.keyword, v.href, v.priority, true
  from (values
    ('detox', '/programs/detox/', 100),
    ('medical detox', '/programs/detox/', 95),
    ('orange county detox', '/programs/detox/orange-county/', 90),
    ('residential treatment', '/programs/residential-treatment/', 85),
    ('aftercare', '/programs/aftercare/', 80),
    ('insurance', '/insurance/', 75),
    ('verify insurance', '/insurance/', 74),
    ('Aetna', '/insurance/aetna/', 70),
    ('Anthem', '/insurance/anthem/', 70),
    ('Cigna', '/insurance/cigna/', 70),
    ('Beacon Health', '/insurance/beacon/', 70),
    ('United Healthcare', '/insurance/united-healthcare/', 65),
    ('Humana', '/insurance/humana/', 65),
    ('Blue Cross Blue Shield', '/insurance/blue-cross-blue-shield/', 65),
    ('Tricare', '/insurance/tricare/', 65),
    ('Kaiser', '/insurance/kaiser/', 65),
    ('Mission Viejo', '/programs/detox/orange-county/', 60),
    ('admissions', '/admissions/', 55),
    ('daily schedule', '/daily-schedule/', 50),
    ('our approach', '/our-approach/', 45),
    ('contact us', '/contact/', 40)
  ) as v(keyword, href, priority)
  where not exists (
    select 1 from public.internal_links il
    where il.keyword = v.keyword and il.href = v.href
  );
end $$;
