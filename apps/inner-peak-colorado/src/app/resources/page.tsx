import type { Metadata } from 'next';
import ResourcesPage from '@/views/resources/page';

export const metadata: Metadata = {
  title: 'Mental Health & Recovery Resources for Women | Inner Peak Colorado',
  description:
    "Free mental health and addiction recovery resources for women. Articles, guides, and tools from Inner Peak Colorado's clinical team.",
};

export default function Page() {
  return <ResourcesPage />;
}
