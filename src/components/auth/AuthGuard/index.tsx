import { usePathname, useRouter } from "next/navigation";

import Spinner from "@/components/common/Spinner/Spinner";
import { useAuthContext } from "@/context";

const publicRoutes = ["/signin", "/signup", "/"];

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, pending } = useAuthContext();
  const router = useRouter();
  const pathname = usePathname();

  if (pending) {
    return <Spinner />;
  }

  if (!user && !publicRoutes.includes(pathname)) {
    router.push("/signin");

    return null;
  }

  return <>{children}</>;
}
