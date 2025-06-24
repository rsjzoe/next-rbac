"use client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";
import Loading from "./loading/loading";

export function ConnectedGuard({ children }: ConnectedGuardProps) {
  const {
    data: session,
    isPending, //loading state
  } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      // If no session, redirect to login page
      router.push("/login");
    }
  }, [session]);

  if (isPending) {
    return (
      <>
        <Loading />
      </>
    );
  }
  return <>{children}</>;
}

type ConnectedGuardProps = PropsWithChildren<{}>;
