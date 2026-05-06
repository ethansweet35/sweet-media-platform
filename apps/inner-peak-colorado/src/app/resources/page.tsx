import type { Metadata } from 'next';
import { resolveTrackedPageMetadata } from '@sweetmedia/admin-core';
import ResourcesPage from '@/views/resources/page';

const fallbackMetadata: Metadata = {
  title: 'Mental Health & Recovery Resources for Women | Inner Peak Colorado',
  description:
    "Free mental health and addiction recovery resources for women. Articles, guides, and tools from Inner Peak Colorado's clinical team.",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata('/resources', fallbackMetadata);
}

export default function Page() {
  return <ResourcesPage />;
}
