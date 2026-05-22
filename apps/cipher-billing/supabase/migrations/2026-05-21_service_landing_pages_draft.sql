-- Mark Cipher service landing routes as draft (inactive in admin, excluded from sitemap).
-- Pages remain deployable for internal preview; flip is_active = true when ready to publish.

insert into public.tracked_pages (
  route_path,
  page_title,
  default_seo_title,
  is_active,
  display_order,
  notes
)
select
  v.route_path,
  v.page_title,
  v.page_title,
  false,
  coalesce((select max(display_order) from public.tracked_pages), 0) + v.ord * 10,
  'Draft — service landing not published.'
from (
  values
    ('/iop-billing-services', 'IOP Billing Services', 1),
    ('/php-billing-services', 'PHP Billing Services', 2),
    ('/residential-treatment-billing-services', 'Residential Treatment Billing Services', 3),
    ('/substance-abuse-billing-services', 'Substance Abuse Billing Services', 4),
    ('/mental-health-billing-services', 'Mental Health Billing Services', 5),
    ('/detox-billing-services', 'Detox Billing Services', 6)
) as v(route_path, page_title, ord)
where not exists (
  select 1 from public.tracked_pages tp where tp.route_path = v.route_path
);

update public.tracked_pages
set
  is_active = false,
  notes = case
    when notes is null or trim(notes) = '' then 'Draft — service landing not published.'
    when notes ilike '%Draft — service landing not published.%' then notes
    else notes || E'\n' || 'Draft — service landing not published.'
  end,
  updated_at = now()
where route_path in (
  '/iop-billing-services',
  '/php-billing-services',
  '/residential-treatment-billing-services',
  '/substance-abuse-billing-services',
  '/mental-health-billing-services',
  '/detox-billing-services'
);
