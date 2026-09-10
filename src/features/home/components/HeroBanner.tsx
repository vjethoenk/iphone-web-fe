import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const banners = [
    {
        id: 1,
        image:
            "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=1920&q=90",
        title: "iPhone 17 Pro",
        description: "Hiệu năng đột phá. Thiết kế hoàn toàn mới.",
    },
    {
        id: 2,
        image:
            "https://cdn.shopdunk.com/assets/31a3decf-34d4-4a2d-a5e4-ebbb4618662f?key=sd-home-hero-desktop",
        title: "",
        description: "",
    },
    {
        id: 3,
        image:
            "https://cdn.shopdunk.com/assets/14cad77a-7fd7-48ce-87e0-bff033c0bbe1?key=sd-home-hero-desktop",
        title: "iPhone 17",
        description: "Trải nghiệm iPhone thế hệ mới.",
    },
    {
        id: 4,
        image:
            "https://cdn.shopdunk.com/assets/5d43fc0b-6260-4340-94f5-06870dd08545?key=sd-home-hero-desktop",
        title: "iPhone 18",
        description: "Trải nghiệm iPhone thế hệ mới!.",
    },
];

export default function HeroBanner() {
    const [current, setCurrent] = useState(0);
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % banners.length);
        }, 5000);

        return () => clearInterval(timer);
    }, []);

    const prevSlide = () => {
        setCurrent((prev) => (prev - 1 + banners.length) % banners.length);
    };

    const nextSlide = () => {
        setCurrent((prev) => (prev + 1) % banners.length);
    };

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
                            src={banner.image}
                            alt={banner.title}
                            className="h-full w-full object-cover"
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/20" />

                        {/* Content */}
                        <div className="absolute inset-0 flex items-center">
                            <div className="mx-auto w-full max-w-7xl px-6">
                                <div className="max-w-xl text-white">


                                    {/* <h1 className="text-5xl font-bold tracking-tight md:text-7xl">
                                        {banner.title}
                                    </h1>

                                    <p className="mt-4 text-lg text-white/90 md:text-xl">
                                        {banner.description}
                                    </p> */}


                                </div>
                            </div>
                        </div>
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