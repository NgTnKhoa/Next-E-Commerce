import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default function StoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
         <Header />
         <div className="px-[1.4rem] md:px-[4rem] lg:px-[6rem] xl:px-[8rem] 2xl:px-[12rem]">
            {children}
         </div>
         <Footer />
      </>
  );
}
