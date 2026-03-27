import type { Metadata } from "next";
import { Schibsted_Grotesk, Martian_Mono, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Grainient from "@/components/Grainient";
import Navbar from "@/components/Navbar";
import { PostHogProvider } from "./providers";
import PostHogPageView from "./PostHogPageView";
import { Suspense } from "react";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

const schibstedGrotesk = Schibsted_Grotesk({
    variable: "--font-schibsted-grotesk",
    subsets: ["latin"],
});

const martianMono = Martian_Mono({
    variable: "--font-martian-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "DevEvent",
    description: "The hub for every event that u mustn't miss",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={cn("font-sans", geist.variable)} suppressHydrationWarning>
        <body className={`${schibstedGrotesk.variable} ${martianMono.variable} antialiased`}>
        <PostHogProvider>
        <Suspense fallback={null}><PostHogPageView /></Suspense>
        <Navbar />


        {/* The Outer Wrapper */}
        <div className="relative min-h-screen w-full">

            {/* 1. The Background Layer */}
            <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
                <Grainient
                    color1="#00FFCC"
                    color2="#00CC99"
                    color3="#008080"
                    timeSpeed={1}
                    colorBalance={0}
                    warpStrength={1}
                    warpFrequency={5}
                    warpSpeed={2}
                    warpAmplitude={50}
                    blendAngle={0}
                    blendSoftness={0.05}
                    rotationAmount={500}
                    noiseScale={2}
                    grainAmount={0.1}
                    grainScale={2}
                    grainAnimated={false}
                    contrast={1}
                    gamma={0.5}
                    saturation={0.5}
                    centerX={0}
                    centerY={0}
                    zoom={0.9}
                />
            </div>

            {/* 2. The Content Layer */}
            <div className="relative z-10 w-full">
                <main>
                    {children}
                </main>
            </div>
        </div>
        </PostHogProvider>
        </body>
        </html>
    );
}