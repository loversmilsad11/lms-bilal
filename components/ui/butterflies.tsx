"use client";

import { useEffect, useState } from "react";

export function Butterflies() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-[10] overflow-hidden" aria-hidden="true">
            {Array.from({ length: 8 }).map((_, i) => (
                <div
                    key={i}
                    className="absolute"
                    style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        // Separation of concerns: Outer div handles position/float. Inner div handles flap.
                        animation: `float ${15 + Math.random() * 10}s infinite linear`,
                        animationDelay: `-${Math.random() * 10}s`,
                        opacity: 0.6
                    }}
                >
                    <ButterflyIcon className="w-6 h-6 md:w-8 md:h-8 text-primary/70 dark:text-primary/80 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
                </div>
            ))}
        </div>
    );
}

function ButterflyIcon({ className }: { className?: string }) {
    return (
        <div style={{ animation: "flap 0.4s ease-in-out infinite alternate" }}>
            <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className={className}
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M12 3C10 3 9 4 9 5C9 6.5 10 9 12 11C14 9 15 6.5 15 5C15 4 14 3 12 3Z" opacity="0.9" />
                <path d="M12 21C10 21 8 18 8 16C8 14 10 12 12 12C14 12 16 14 16 16C16 18 14 21 12 21Z" opacity="0.9" />
                <path d="M5 6C4 6 2 8 2 11C2 13 4 14 6 12C7 11 8 10 9 10C8 8 6 6 5 6Z" opacity="0.7" />
                <path d="M19 6C20 6 22 8 22 11C22 13 20 14 18 12C17 11 16 10 15 10C16 8 18 6 19 6Z" opacity="0.7" />
                <path d="M4 16C4 18 5 20 7 20C8.5 20 9.5 18 10 16C9 15 8 14 7 14C5.5 14 4 15 4 16Z" opacity="0.7" />
                <path d="M20 16C20 18 19 20 17 20C15.5 20 14.5 18 14 16C15 15 16 14 17 14C18.5 14 20 15 20 16Z" opacity="0.7" />
            </svg>
        </div>
    );
}
