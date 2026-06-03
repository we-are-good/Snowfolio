import Link from "next/link";

const navItems = [
  { label: "지수 & 환율", href: "/indices" },
  { label: "업종 & 섹터", href: "/sectors" },
  { label: "주식", href: "/" },
  { label: "계산기", href: "/calculators" },
] as const;

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-40 flex h-full w-56 flex-col border-r border-sidebar-border bg-sidebar-bg text-sidebar-text">
      <nav className="flex flex-col gap-1 p-4" aria-label="메인 메뉴">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-white/10"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
