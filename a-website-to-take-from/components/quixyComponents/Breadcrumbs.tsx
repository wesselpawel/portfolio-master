import Link from "next/link";
export default function Breadcrumbs({
  breadcrumbs,
}: {
  breadcrumbs: { url: string; title: string }[];
}) {
  return (
    <div className="!text-white breadcrumbs relative z-50">
      <ul className="flex flex-wrap font-light">
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={index}>
            <Link
              title={breadcrumb.title}
              href={`/${breadcrumbs.slice(0, index + 1).join("/")}`}
            >
              {breadcrumb.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
