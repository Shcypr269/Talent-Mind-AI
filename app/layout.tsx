"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import MainLayout from "./main-layout";

const inter = Inter({ subsets: ["latin"] });

const variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLandingPage = pathname === "/";

  return (
    <html lang="en">
      <body className={inter.className}>
        <AnimatePresence mode="wait">
          {isLandingPage ? (
            <motion.div
              key={pathname}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={variants}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
          ) : (
            <MainLayout>
              <motion.div
                key={pathname}
                initial="initial"
                animate="animate"
                exit="exit"
                variants={variants}
                transition={{ duration: 0.3 }}
              >
                {children}
              </motion.div>
            </MainLayout>
          )}
        </AnimatePresence>
      </body>
    </html>
  );
}
