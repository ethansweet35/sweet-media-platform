-- Normalize Cipher Billing blog bylines to brand_settings (not Ethan Sweet / Cipher Admin).
update public.brand_settings
set
  author_name = 'Cipher Billing',
  author_title = 'Behavioral Health Billing Team',
  author_bio = coalesce(
    nullif(trim(author_bio), ''),
    'Cipher Billing specializes in revenue cycle management for behavioral health organizations, helping mental health and substance use treatment providers maximize reimbursements and reduce claim denials.'
  ),
  updated_at = now()
where site_key = 'cipher-billing';

update public.blog_posts
set
  author = 'Cipher Billing',
  author_title = 'Behavioral Health Billing Team',
  author_bio = coalesce(
    nullif(trim(author_bio), ''),
    'Cipher Billing specializes in revenue cycle management for behavioral health organizations, helping mental health and substance use treatment providers maximize reimbursements and reduce claim denials.'
  ),
  updated_at = now()
where
  author is null
  or trim(author) = ''
  or lower(trim(author)) in ('ethan sweet', 'cipher admin', 'sweet media')
  or lower(trim(coalesce(author_title, ''))) in ('founder', 'cipher billing team', 'billing team', 'content team')
  or lower(trim(coalesce(author_bio, ''))) like '%sweet media%'
  or lower(trim(coalesce(author_bio, ''))) like '%ethan sweet%';
