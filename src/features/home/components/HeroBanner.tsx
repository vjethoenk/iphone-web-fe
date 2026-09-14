import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useGetBannersActive } from "@/features/banner/hooks/useBanner";

export default function HeroBanner() {
    const [current, setCurrent] = useState(0);

    const {
        data: banners = [],
        isLoading,
    } = useGetBannersActive();

    useEffect(() => {
        if (banners.length <= 1) return;

        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % banners.length);
        }, 3000);

        return () => clearInterval(timer);
    }, [banners.length]);

    const prevSlide = () => {
        setCurrent(
            (prev) => (prev - 1 + banners.length) % banners.length
        );
    };

    const nextSlide = () => {
        setCurrent(
            (prev) => (prev + 1) % banners.length
        );
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (banners.length === 0) {
        return null;
    }

    return (
        <section className="relative w-full overflow-hidden">
            {/* Banner */}
            <div className="relative h-[400px] w-full md:h-[540px]">
                {banners.map((banner, index) => (
                    <div
                        key={banner.id}
                        className={`absolute inset-0 transition-opacity duration-700 ${index === current
                            ? "z-10 opacity-100"
                            : "z-0 opacity-0"
                            }`}
                    >
                        <img
                            src={banner.imageUrl}
                            alt={banner.title}
                            className="h-full w-full object-cover"
                        />

                        <div className="absolute inset-0 bg-black/5" />
                    </div>
                ))}
            </div>

            {/* Previous */}
            <button
                onClick={prevSlide}
                className="absolute left-5 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition hover:bg-white/40"
                aria-label="Previous slide"
            >
                <ChevronLeft size={24} />
            </button>

            {/* Next */}
            <button
                onClick={nextSlide}
                className="absolute right-5 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition hover:bg-white/40"
                aria-label="Next slide"
            >
                <ChevronRight size={24} />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
                {banners.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`h-2 rounded-full transition-all duration-300 ${index === current
                            ? "w-8 bg-white"
                            : "w-2 bg-white/50"
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
}