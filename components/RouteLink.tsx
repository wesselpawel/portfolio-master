"use client";
import { useRouter } from "next/navigation";
interface RouteProps {
  to: string;
  className?: string;
  children: React.ReactNode;
}
export const LinkRoute = ({ to, className, children }: RouteProps) => {
  const router = useRouter();
  const path = to.startsWith("/") ? to : `/${to}`;
  return (
    <button className={className} onClick={() => router.push(path)}>
      {children}
    </button>
  );
};
