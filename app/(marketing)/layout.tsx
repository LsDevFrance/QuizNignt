import Footer from "@/components/marketing/layout/footer";
import Header from "@/components/marketing/layout/header";
import { PropsWithChildren } from "react";

export default function layout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
