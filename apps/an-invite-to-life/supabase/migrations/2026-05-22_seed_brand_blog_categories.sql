-- Seed canonical blog_categories for the current project's brand (single site_key in brand_settings).
-- Re-run safe: upserts by (site_id, slug).

do $$
declare
  sk text;
  cats text[];
  cat text;
  idx int;
  slug text;
begin
  select site_key into sk from public.brand_settings order by updated_at desc nulls last limit 1;
  if sk is null then
    raise notice 'seed_brand_blog_categories: no brand_settings row, skipping';
    return;
  end if;

  cats := case sk
    when 'sweet-media' then array['SEO','Paid Media','Web Development','Social Media','Compliance','Strategy']
    when 'addiction-interventions' then array['Addiction & Recovery','Alcohol','Intervention','Mental Health','State Resources','Strategy']
    when 'northbound-treatment' then array['Addiction Treatment','Mental Health','Family Resources','Insurance & Admissions','Recovery & Aftercare','Clinical Education']
    when 'inner-peak-colorado' then array['Mental Health','Women''s Treatment','Levels of Care','Therapy & Healing','Family & Support','Colorado Resources']
    when 'cipher-billing' then array['Billing & Coding','Revenue Cycle','Compliance','IOP & PHP Billing','Insurance & Payers','Practice Management']
    when 'rize-oc' then array['Treatment & Recovery','Mental Health','Family Resources','Orange County','Admissions & Insurance','Education']
    when 'simple-health' then array['Weight Loss','Peptides & Hormones','GLP-1','Wellness','Patient Education','Treatment Guides']
    when 'adolescent-mental-health' then array['Teen Mental Health','Family Support','Treatment Programs','School & Social Life','Crisis & Safety','Parent Resources']
    when 'the-family-recovery-foundation' then array['Family Recovery','Education','Community','Resources','Events','Support']
    when 'mountainview-treatment' then array['Addiction Treatment','Mental Health','Veterans & Tricare','Family Resources','Levels of Care','Nevada Resources']
    else array['Company News','Education','Resources','Guides']
  end case;

  update public.blog_categories
  set is_active = false, updated_at = now()
  where site_id = sk
    and slug in ('company-news', 'education', 'resources', 'guides');

  idx := 0;
  foreach cat in array cats loop
    idx := idx + 10;
    slug := lower(regexp_replace(replace(trim(cat), '''', '', 'g'), '[^a-z0-9]+', '-', 'g'));
    slug := trim(both '-' from slug);

    insert into public.blog_categories (site_id, name, slug, sort_order, is_active)
    values (sk, cat, slug, idx, true)
    on conflict (site_id, slug) do update
    set name = excluded.name,
        sort_order = excluded.sort_order,
        is_active = true,
        updated_at = now();
  end loop;

  update public.brand_settings
  set blog_categories = to_jsonb(cats),
      updated_at = now()
  where site_key = sk;
end $$;
