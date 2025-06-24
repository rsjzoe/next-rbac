"use client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";
import Loading from "./loading/loading";

export function NotConnectedGuard({ children }: NotConnectedGuardProps) {
  const {
    data: session,
    isPending, //loading state
  } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      // If no session, redirect to login page
      router.push("/users");
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

type NotConnectedGuardProps = PropsWithChildren<{}>;
