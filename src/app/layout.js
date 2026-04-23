import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "next-themes"; // <-- Using the official package!

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Mynee Smart Knee",
  description: "Advanced Edge-Computed Biomechanics",
};

export default function RootLayout({ children }) {
  return (
    // suppressHydrationWarning is required by next-themes to prevent flashes
    <html lang="en" suppressHydrationWarning> 
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-50 dark:bg-[#030305] text-gray-900 dark:text-gray-100 transition-colors duration-500`}>
        
        {/* attribute="class" tells it to use Tailwind's .dark logic */}
        <ThemeProvider attribute="class" defaultTheme="dark">
          <Navbar />
          {children}
        </ThemeProvider>

      </body>
    </html>
  );
}