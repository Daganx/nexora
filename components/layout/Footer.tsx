"use client";

import Link from "next/link";

const footerColumns = [
  [
    { label: "Explore", href: "/explore", external: false },
    { label: "Blog", href: "/blog", external: false },
  ],
  [
    { label: "Log in", href: "/login", external: false },
    { label: "Sign Up", href: "/signup", external: false },
  ],
  [{ label: "Support", href: "https://buymeacoffee.com/", external: true }],
];

export function Footer() {
  return (
    <footer className="bg-[#E9E9E9] px-10 py-10 border-t">
      {/* Logo */}
      <div className="mb-10">
        <span className="text-2xl font-bold text-neutral-900">NEX.</span>
      </div>

      {/* Links grid — 4 colonnes comme dans l'image */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-y-2">
        {footerColumns.map((col, colIndex) => (
          <div key={colIndex} className="flex flex-col gap-5">
            {col.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="text-sm font-semibold text-neutral-900 hover:text-neutral-500 transition-colors w-fit"
              >
                {link.label}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </footer>
  );
}
