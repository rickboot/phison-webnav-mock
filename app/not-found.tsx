import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-32 px-4">
      <h1 className="text-4xl font-bold text-gray-900">Page Not Found</h1>
      <p className="mt-4 text-gray-600">The page you are looking for does not exist in this prototype.</p>
      <Link
        href="/"
        className="mt-8 btn-pill-orange"
      >
        Return Home
      </Link>
    </div>
  );
}
