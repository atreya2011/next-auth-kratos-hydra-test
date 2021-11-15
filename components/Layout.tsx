import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return <div className="flex flex-col justify-center w-full h-screen max-w-lg m-auto">{children}</div>;
}
