import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { Separator } from "@radix-ui/react-separator";

export default function StoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <div
       className="max-w-screen-2xl mx-auto"
      >
        {children}
      </div>
      <Footer />
    </>
  );
}
