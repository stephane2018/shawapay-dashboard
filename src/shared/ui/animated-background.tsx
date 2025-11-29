import React from 'react';
import { cn } from '@/lib/utils';

interface AnimatedBackgroundProps {
    className?: string;
    children?: React.ReactNode;
}

export const AnimatedBackground = ({ className, children }: AnimatedBackgroundProps) => {
    return (
        <div className={cn("relative w-full h-full overflow-hidden bg-slate-950", className)}>
            {/* Animated Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-violet-600 to-blue-600 bg-[length:400%_400%] animate-gradient-xy opacity-90" />

            {/* Dot Pattern Overlay */}
            <div className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
                    backgroundSize: '24px 24px'
                }}
            />

            {/* Sliding Text Background */}
            <div className="absolute inset-0 flex flex-col justify-center opacity-10 select-none pointer-events-none overflow-hidden">
                <div className="flex whitespace-nowrap animate-slide-left">
                    {Array.from({ length: 10 }).map((_, i) => (
                        <span key={i} className="text-[12rem] font-black text-white mx-8">
                            SHAWAPAY
                        </span>
                    ))}
                </div>
                <div className="flex whitespace-nowrap animate-slide-right mt-[-4rem]">
                    {Array.from({ length: 10 }).map((_, i) => (
                        <span key={i} className="text-[12rem] font-black text-white mx-8">
                            SHAWAPAY
                        </span>
                    ))}
                </div>
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 h-full w-full">
                {children}
            </div>

            <style>{`
                @keyframes gradient-xy {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                .animate-gradient-xy {
                    animation: gradient-xy 15s ease infinite;
                }
                @keyframes slide-left {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-slide-left {
                    animation: slide-left 60s linear infinite;
                }
                @keyframes slide-right {
                    0% { transform: translateX(-50%); }
                    100% { transform: translateX(0); }
                }
                .animate-slide-right {
                    animation: slide-right 60s linear infinite;
                }
            `}</style>
        </div>
    );
};
