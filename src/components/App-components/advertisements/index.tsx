// components/AdvertisementCarousel.tsx
import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge'; // Adjust the import path as necessary
import { Button} from '@/components/ui/button'; // Adjust the import path as necessary

interface Advertisement {
  id: number;
  title: string;
  subtitle: string;
  bgGradient: string;
  image: string;
  tag: string;
}

const AdvertisementCarousel: React.FC = () => {
  const [currentAdIndex, setCurrentAdIndex] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  // Advertisement data
  const advertisements: Advertisement[] = [
    {
      id: 1,
      title: "خصومات الصيف",
      subtitle: "حتى 70% على المنتجات المختارة",
      bgGradient: "from-pink-500 via-rose-500 to-blue-400",
      image: "🌺",
      tag: "عرض محدود"
    },
    {
      id: 2,
      title: "مجموعة الفخامة",
      subtitle: "منتجات حصرية للعناية بالبشرة",
      bgGradient: "from-purple-600 via-pink-500 to-indigo-400",
      image: "💎",
      tag: "جديد"
    },
    {
      id: 3,
      title: "الجمال الطبيعي",
      subtitle: "منتجات عضوية 100%",
      bgGradient: "from-emerald-500 via-teal-500 to-cyan-400",
      image: "🍃",
      tag: "الأكثر مبيعاً"
    }
  ];

  // Auto-slide for advertisements
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentAdIndex((prev) => (prev + 1) % advertisements.length);
        setIsTransitioning(false);
      }, 50); // Transition duration
    }, 4000); // Adjust this to control the time between slides
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* Advertisement Carousel */}
      <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(${currentAdIndex * 100}%)` }}>
        {advertisements.map((ad) => (
          <div key={ad.id} className="min-w-full">
            <div className={`bg-gradient-to-br ${ad.bgGradient} p-6 relative overflow-hidden`}>
              <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex-1">
                  <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm mb-2">
                    {ad.tag}
                  </Badge>
                  <h2 className="text-2xl font-bold text-white mb-2">{ad.title}</h2>
                  <p className="text-white/90 mb-4">{ad.subtitle}</p>
                  <Button className="bg-white text-gray-900 hover:bg-white/90 shadow-lg">
                    اكتشف المزيد
                  </Button>
                </div>
                <div className="text-6xl animate-float">{ad.image}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Carousel Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {advertisements.map((_, index) => (
          <div
            key={index}
            className={`h-2 rounded-full transition-all duration-300 ${index === currentAdIndex ? 'w-8 bg-white' : 'w-2 bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default AdvertisementCarousel;
