'use client';
import { useState } from 'react';
import type { House } from '@/lib/content';

export default function Houses({ houses }: { houses: House[] }) {
  const [selectedHouse, setSelectedHouse] = useState<House | null>(null);

  return (
    <section id="domiki" className="py-24 bg-[#FAF6F0]">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-5xl font-bold text-center text-[#2A6B3E] mb-16">Наши домики и баня</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {houses.map((house) => (
            <div
              key={house.title}
              className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition group cursor-pointer"
              onClick={() => setSelectedHouse(house)}
            >
              <div className="relative h-64">
                <img src={house.image} alt={house.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-semibold mb-3">{house.title}</h3>
                <p className="text-[#3C2F2F] mb-6">{house.description}</p>

                <div className="flex justify-between items-center text-sm">
                  <div>
                    <span className="block text-gray-500">Вместимость</span>
                    <span className="font-medium">{house.capacity}</span>
                  </div>
                  <div className="text-right">
                    <span className="block text-gray-500">Цена</span>
                    <span className="font-semibold text-[#2A6B3E]">{house.price}</span>
                  </div>
                </div>

                <button className="mt-8 w-full bg-[#2A6B3E] text-white py-4 rounded-2xl hover:bg-[#1E5A3A]">
                  Подробнее
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
