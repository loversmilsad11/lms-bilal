"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

interface Star {
    x: number;
    y: number;
    z: number;
    size: number;
    opacity: number;
    baseX: number;
    baseY: number;
}

export function Starfield() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [mounted, setMounted] = useState(false);
    const { resolvedTheme } = useTheme();

    // Mouse state
    const mouseRef = useRef({ x: 0, y: 0 });
    const targetRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        // Track mouse position
        const handleMouseMove = (e: MouseEvent) => {
            // Normalize mouse from -1 to 1 based on center of screen
            targetRef.current.x = (e.clientX - window.innerWidth / 2) * 0.001;
            targetRef.current.y = (e.clientY - window.innerHeight / 2) * 0.001;
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mounted]);

    useEffect(() => {
        if (!mounted) return;
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        const stars: Star[] = [];
        const numStars = 250;

        // Initialize stars with 3D depth approximation (z)
        for (let i = 0; i < numStars; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            stars.push({
                x,
                y,
                z: Math.random() * 3 + 1, // Depth factor: 1 to 4
                size: Math.random() * 1.5,
                opacity: Math.random(),
                baseX: x,
                baseY: y,
            });
        }

        let animationId: number;
        const isDark = resolvedTheme === "dark";
        // Colors: Pure White for Dark Mode, Deep Indigo for Light Mode
        const baseColor = isDark ? "255, 255, 255" : "70, 20, 160";

        const render = () => {
            ctx.clearRect(0, 0, width, height);

            // Smoothly interpolate current offset towards target mouse offset
            // This creates a smooth "lag" effect
            mouseRef.current.x += (targetRef.current.x - mouseRef.current.x) * 0.05;
            mouseRef.current.y += (targetRef.current.y - mouseRef.current.y) * 0.05;

            const moveX = mouseRef.current.x * width; // Max pixel shift
            const moveY = mouseRef.current.y * height;

            stars.forEach((star) => {
                // Parallax offset: stars with higher Z move MORE (are close) or LESS (are far)?
                // Traditionally close objects move FASTER opposite to movement.
                // Let's assume Z is "closeness" multiplier.
                // Also move stars inversely to mouse for "looking around" feel.

                const offsetX = -moveX * star.z * 0.2;
                const offsetY = -moveY * star.z * 0.2;

                let px = star.baseX + offsetX;
                let py = star.baseY + offsetY;

                // Wrap Logic to keep field dense
                // If star moves off screen, wrap it? 
                // Simple modulo might jump. Since changes are small, we might not need wrapping.
                // But let's wrap just in case of large window resize or movement.
                // Actually, no wrapping needed for parallax unless we scroll infinitely.

                ctx.fillStyle = `rgba(${baseColor}, ${star.opacity})`;
                ctx.beginPath();
                ctx.arc(px, py, star.size, 0, Math.PI * 2);
                ctx.fill();

                // Twinkle
                if (Math.random() > 0.99) {
                    star.opacity = Math.random();
                }
            });

            animationId = requestAnimationFrame(render);
        };

        render();

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationId);
        };
    }, [mounted, resolvedTheme]);

    if (!mounted) return null;

    return (
        <canvas
            ref={canvasRef}
            className={`fixed inset-0 pointer-events-none z-[-1] transition-opacity duration-1000 ${resolvedTheme === "dark" ? "mix-blend-screen opacity-100" : "opacity-80"
                }`}
            style={{ background: 'transparent' }}
        />
    );
}
