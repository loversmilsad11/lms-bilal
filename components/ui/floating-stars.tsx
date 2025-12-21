"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";

export function FloatingStars() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden h-full w-full" aria-hidden="true">
            {Array.from({ length: 15 }).map((_, i) => (
                <div
                    key={i}
                    className="absolute"
                    style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        animation: `float-star ${20 + Math.random() * 20}s infinite linear`,
                        animationDelay: `-${Math.random() * 20}s`,
                        opacity: 0.2 + Math.random() * 0.3
                    }}
                >
                    <Star
                        className="text-primary/40 dark:text-primary/60 fill-current"
                        size={Math.random() * 10 + 8} // 8px to 18px
                        strokeWidth={0}
                    />
                </div>
            ))}
            <style jsx>{`
        @keyframes float-star {
          0% {
            transform: translate(0, 0) rotate(0deg);
          }
          50% {
             transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(180deg);
          }
          100% {
            transform: translate(0, 0) rotate(360deg);
          }
        }
      `}</style>
        </div>
    );
}
