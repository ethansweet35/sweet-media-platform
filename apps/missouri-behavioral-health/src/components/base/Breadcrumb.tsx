import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  light?: boolean; // true = cream text (for dark hero backgrounds)
}

export default function Breadcrumb({ items, light = true }: BreadcrumbProps) {
  return (
    <nav className="flex items-center gap-2 flex-wrap" aria-label="Breadcrumb">
      <Link
        href="/"
        className={`text-[11px] uppercase tracking-widest font-medium transition-colors duration-200 cursor-pointer ${
          light
            ? 'text-[#F8FAFC]/50 hover:text-[#F8FAFC]/90'
            : 'text-[#3A4A3C]/40 hover:text-[#3A4A3C]/80'
        }`}
      >
        Home
      </Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-2">
          <span className={`text-[11px] ${light ? 'text-[#F8FAFC]/25' : 'text-[#3A4A3C]/25'}`}>
            /
          </span>
          {item.path ? (
            <Link
              href={item.path}
              className={`text-[11px] uppercase tracking-widest font-medium transition-colors duration-200 cursor-pointer ${
                light
                  ? 'text-[#F8FAFC]/50 hover:text-[#F8FAFC]/90'
                  : 'text-[#3A4A3C]/40 hover:text-[#3A4A3C]/80'
              }`}
            >
              {item.label}
            </Link>
          ) : (
            <span
              className={`text-[11px] uppercase tracking-widest font-medium ${
                light ? 'text-[#DDA15E]' : 'text-[#2563EB]'
              }`}
            >
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
