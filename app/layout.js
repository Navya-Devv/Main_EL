import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from "@/components/ui/sonner";
import Footer from "./dashboard/_components/Footer";
import Header from "./dashboard/_components/Header";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
  fallback: ['system-ui', 'arial', 'sans-serif']
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
  fallback: ['Courier New', 'monospace']
});

export const metadata = {
  // Update this URL once you deploy to Vercel (e.g., https://lakshya-ai.vercel.app)
  metadataBase: new URL('https://lakshya-ai.vercel.app'),
  title: {
    default: 'Lakshya AI - Intelligent Interview Preparation',
    template: '%s | Lakshya AI'
  },
  description: 'Master your technical and behavioral interviews with Lakshya AI. Real-time feedback, AI-powered mocks, and confidence building.',
  keywords: [
    'AI interview preparation', 
    'mock interviews', 
    'Lakshya AI', 
    'career coaching', 
    'job interview help',
    'AI interview mocker'
  ],
  authors: [{ name: 'Lakshya AI Team' }],
  creator: 'Lakshya AI',
  publisher: 'Lakshya AI',
  
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://lakshya-ai.vercel.app/',
    title: 'Lakshya AI - Intelligent Interview Preparation',
    description: 'Master your technical and behavioral interviews with Lakshya AI. Real-time feedback, AI-powered mocks, and confidence building.',
    siteName: 'Lakshya AI',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Lakshya AI - Your Path to Success'
      }
    ]
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'Lakshya AI - Intelligent Interview Preparation',
    description: 'Master your technical and behavioral interviews with Lakshya AI. Real-time feedback, AI-powered mocks, and confidence building.',
    creator: '@LakshyaAI',
    images: ['/twitter-image.png']
  },
  
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  
  verification: {
    google: 'your-google-site-verification-code',
  }
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html 
        lang="en" 
        className={`${geistSans.variable} ${geistMono.variable}`}
      >
        <body 
          className={`
            antialiased 
            min-h-screen 
            flex 
            flex-col 
            bg-background 
            text-foreground 
            font-sans
          `}
        >
          {/* Skip to Content Button */}
          <a 
            href="#main-content" 
            className="
              absolute 
              top-[-999px] 
              left-[-999px] 
              z-[-1] 
              focus:top-0 
              focus:left-0 
              focus:z-50 
              p-4 
              bg-primary 
              text-primary-foreground
              rounded-br-lg
              font-medium
            "
          >
            Skip to main content
          </a>
          
          <Header />
          <Toaster />
          
          <main 
            id="main-content" 
            className="
              flex-grow 
              pt-16 
              sm:pt-20 
              max-w-7xl 
              mx-auto 
              w-full 
              px-4 
              sm:px-6 
              lg:px-8
            "
          >
            {children}
          </main>
          
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
