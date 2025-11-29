import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface TextSliderProps {
    className?: string;
}

const slides = [
    {
        title: "Gérez vos paiements en toute simplicité",
        description: "Shawapay vous offre une solution complète pour accepter et gérer vos paiements en ligne",
        stats: [
            { value: "99.9%", label: "Disponibilité" },
            { value: "24/7", label: "Support" },
            { value: "150+", label: "Pays" },
            { value: "100K+", label: "Utilisateurs" }
        ]
    },
    {
        title: "Sécurité de niveau bancaire",
        description: "Vos transactions sont protégées par les normes de sécurité les plus strictes de l'industrie",
        stats: [
            { value: "PCI", label: "DSS Certifié" },
            { value: "256-bit", label: "Chiffrement" },
            { value: "3D", label: "Secure" },
            { value: "0%", label: "Fraude" }
        ]
    },
    {
        title: "Intégration rapide et facile",
        description: "Intégrez Shawapay à votre site web ou application mobile en quelques minutes seulement",
        stats: [
            { value: "10min", label: "Intégration" },
            { value: "SDK", label: "Disponibles" },
            { value: "API", label: "RESTful" },
            { value: "Dev", label: "Friendly" }
        ]
    }
];

export const TextSlider = ({ className }: TextSliderProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={cn("relative h-full flex flex-col items-center justify-center p-8 text-white", className)}>
            <div className="relative w-full max-w-lg">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={cn(
                            "absolute top-1/2 left-0 w-full transform -translate-y-1/2 transition-all duration-700 ease-in-out",
                            index === currentIndex
                                ? "opacity-100 translate-x-0"
                                : index < currentIndex
                                    ? "opacity-0 -translate-x-10"
                                    : "opacity-0 translate-x-10"
                        )}
                        style={{
                            position: index === currentIndex ? 'relative' : 'absolute',
                            visibility: index === currentIndex ? 'visible' : 'hidden'
                        }}
                    >
                        <div className="space-y-6 text-center">
                            <h2 className="text-3xl font-bold leading-tight">
                                {slide.title}
                            </h2>
                            <p className="text-lg opacity-90">
                                {slide.description}
                            </p>

                        </div>
                    </div>
                ))}
            </div>

            {/* Dots Indicator */}
            <div className="absolute bottom-8 flex gap-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        className={cn(
                            "w-2 h-2 rounded-full transition-all duration-300",
                            index === currentIndex ? "bg-white w-6" : "bg-white/40 hover:bg-white/60"
                        )}
                        onClick={() => setCurrentIndex(index)}
                    />
                ))}
            </div>
        </div>
    );
};
