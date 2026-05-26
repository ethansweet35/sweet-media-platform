-- Seed internal_links for Adolescent Mental Health (idempotent; no-op on other brands).
-- Canonical keyword list lives in scripts/seed-amh-internal-links.mjs (AMH_INTERNAL_LINKS).

do $$
begin
  if not exists (
    select 1 from public.brand_settings where site_key = 'adolescent-mental-health'
  ) then
    raise notice 'seed_amh_internal_links: not adolescent-mental-health, skipping';
    return;
  end if;

  insert into public.internal_links (keyword, href, priority, active)
  select v.keyword, v.href, v.priority, true
  from (values
    ('virtual IOP for teens', '/virtual-iop-for-teens', 100),
    ('virtual intensive outpatient', '/virtual-iop-for-teens', 98),
    ('Virtual IOP', '/virtual-iop-for-teens', 97),
    ('intensive outpatient program', '/virtual-iop-for-teens', 95),
    ('intensive outpatient', '/virtual-iop-for-teens', 92),
    ('IOP for teens', '/virtual-iop-for-teens', 95),
    ('telehealth IOP', '/virtual-iop-for-teens', 90),
    ('online therapy for teens', '/virtual-iop-for-teens', 88),
    ('adolescent IOP', '/adolescent-iop-for-teens', 100),
    ('IOP for adolescents', '/adolescent-iop-for-teens', 98),
    ('levels of care', '/levels-of-care', 85),
    ('teen depression treatment', '/teen-depression-treatment', 100),
    ('depression treatment for teens', '/teen-depression-treatment', 98),
    ('teen depression', '/teen-depression-treatment', 90),
    ('adolescent depression', '/teen-depression-treatment', 90),
    ('PTSD treatment online', '/ptsd-treatment-online', 100),
    ('PTSD treatment for teens', '/ptsd-treatment-online', 98),
    ('trauma treatment for teens', '/ptsd-treatment-online', 95),
    ('post-traumatic stress', '/ptsd-treatment-online', 90),
    ('online anxiety treatment', '/online-anxiety-treatment', 100),
    ('anxiety treatment for teens', '/online-anxiety-treatment', 98),
    ('teen anxiety', '/online-anxiety-treatment', 88),
    ('online bipolar treatment', '/online-bipolar-treatment', 100),
    ('bipolar treatment for teens', '/online-bipolar-treatment', 98),
    ('bipolar disorder in teens', '/online-bipolar-treatment', 95),
    ('online OCD treatment', '/online-ocd-treatment', 100),
    ('OCD treatment for teens', '/online-ocd-treatment', 98),
    ('obsessive compulsive disorder', '/online-ocd-treatment', 92),
    ('ADHD treatment for teens', '/adhd-treatment-for-teens', 100),
    ('teen ADHD', '/adhd-treatment-for-teens', 90),
    ('attention deficit hyperactivity', '/adhd-treatment-for-teens', 88),
    ('self-harm', '/conditions/self-harm', 100),
    ('self harm', '/conditions/self-harm', 100),
    ('non-suicidal self-injury', '/conditions/self-harm', 95),
    ('cutting behavior', '/conditions/self-harm', 90),
    ('school avoidance', '/conditions/school-avoidance', 100),
    ('school refusal', '/conditions/school-avoidance', 98),
    ('insomnia treatment for teens', '/online-insomnia-treatment-for-teens', 100),
    ('teen insomnia', '/online-insomnia-treatment-for-teens', 90),
    ('sleep problems in teens', '/online-insomnia-treatment-for-teens', 88),
    ('schizophrenia in adolescence', '/schizophrenia-in-adolescence', 100),
    ('teen schizophrenia', '/schizophrenia-in-adolescence', 95),
    ('psychosis in teens', '/schizophrenia-in-adolescence', 92),
    ('psychiatrist for teens', '/psychiatrist-for-teens', 100),
    ('teen psychiatrist', '/psychiatrist-for-teens', 98),
    ('adolescent psychiatrist', '/psychiatrist-for-teens', 98),
    ('psychiatric care for teens', '/psychiatrist-for-teens', 95),
    ('cognitive behavioral therapy', '/online-cognitive-behavioral-therapy', 100),
    ('cognitive behavioural therapy', '/online-cognitive-behavioral-therapy', 100),
    ('CBT for teens', '/online-cognitive-behavioral-therapy', 98),
    ('online CBT', '/online-cognitive-behavioral-therapy', 95),
    ('dialectical behavioral therapy', '/online-dialectical-behavioral-therapy', 100),
    ('dialectical behaviour therapy', '/online-dialectical-behavioral-therapy', 100),
    ('DBT for teens', '/online-dialectical-behavioral-therapy', 98),
    ('online DBT', '/online-dialectical-behavioral-therapy', 95),
    ('individual therapy for teens', '/therapy/individual-therapy-for-teens', 98),
    ('one-on-one therapy for teens', '/therapy/individual-therapy-for-teens', 90),
    ('group therapy for teens', '/therapy/group-therapy-with-adolescents', 98),
    ('group therapy with adolescents', '/therapy/group-therapy-with-adolescents', 98),
    ('adolescent family therapy', '/therapy/adolescent-family-therapy', 98),
    ('family therapy for teens', '/therapy/adolescent-family-therapy', 98),
    ('family therapy', '/therapy/adolescent-family-therapy', 92),
    ('treatment programs', '/treatment', 80),
    ('mental health treatment for teens', '/treatment', 82),
    ('therapy for teens', '/therapy', 80),
    ('teen therapy', '/therapy', 78),
    ('verify insurance', '/verify-insurance', 85),
    ('insurance coverage', '/verify-insurance', 82),
    ('insurance verification', '/verify-insurance', 82),
    ('admissions process', '/admissions', 80),
    ('free assessment', '/admissions', 78),
    ('contact us', '/contact', 75),
    ('parent resources', '/resources', 70),
    ('about us', '/about', 65),
    ('Cigna', '/verify-insurance', 65),
    ('Anthem', '/verify-insurance', 65),
    ('Aetna', '/verify-insurance', 65),
    ('Blue Cross', '/verify-insurance', 60)
  ) as v(keyword, href, priority)
  where not exists (
    select 1 from public.internal_links il
    where il.keyword = v.keyword and il.href = v.href
  );
end $$;
