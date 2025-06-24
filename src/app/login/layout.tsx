import { NotConnectedGuard } from "@/components/not-connected-guard";
import { PropsWithChildren } from "react";

export default function Layout({ children }: LayoutProps) {
  return <NotConnectedGuard>{children}</NotConnectedGuard>;
}

type LayoutProps = PropsWithChildren;
