import { ReactNode } from "react";
import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";

export default function LayoutPublic({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 md:px-6 lg:px-8 mb-32">
        {children}
      </main>
      <Footer />
    </div>
  );
}
