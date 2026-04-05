"use client";

import React, { useState } from "react";

interface AccordionItemData {
  id: number;
  title: string;
  imageUrl: string;
}

interface AccordionItemProps {
  item: AccordionItemData;
  isActive: boolean;
  onMouseEnter: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ item, isActive, onMouseEnter }) => {
  return (
    <div
      className={`
        relative h-[450px] rounded-2xl overflow-hidden cursor-pointer
        transition-all duration-700 ease-in-out
        ${isActive ? "w-[400px]" : "w-[60px]"}
      `}
      onMouseEnter={onMouseEnter}
    >
      <img
        src={item.imageUrl}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.onerror = null;
          target.src = "https://placehold.co/400x450/BC6C50/ffffff?text=Food+Rescue";
        }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-40" />
      <span
        className={`
          absolute text-white text-lg font-semibold whitespace-nowrap
          transition-all duration-300 ease-in-out
          ${
            isActive
              ? "bottom-6 left-1/2 -translate-x-1/2 rotate-0"
              : "bottom-24 left-1/2 -translate-x-1/2 rotate-90"
          }
        `}
      >
        {item.title}
      </span>
    </div>
  );
};

const accordionItems: AccordionItemData[] = [
  {
    id: 1,
    title: "Fresh Produce",
    imageUrl:
      "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    title: "Restaurant Surplus",
    imageUrl:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    title: "Community Food Banks",
    imageUrl:
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: 4,
    title: "Farm Donations",
    imageUrl:
      "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: 5,
    title: "Zero Waste",
    imageUrl:
      "https://images.unsplash.com/photo-1542601906897-16cf33f18a40?w=400&auto=format&fit=crop&q=80",
  },
];

interface LandingAccordionItemProps {
  title?: React.ReactNode;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
  items?: AccordionItemData[];
}

export function LandingAccordionItem({
  title = "Rescue Food. Feed Communities.",
  description = "Every day, perfectly good food goes to waste. We connect businesses with surplus to households, food banks, and composters — all in real time.",
  ctaText = "Find Food Near Me",
  ctaHref = "/map",
  items = accordionItems,
}: LandingAccordionItemProps) {
  const [activeIndex, setActiveIndex] = useState(4);

  return (
    <section className="container mx-auto px-4 py-12 md:py-24">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Left: Text */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight tracking-tighter">
            {title}
          </h2>
          <p className="mt-6 text-lg text-gray-500 max-w-xl mx-auto md:mx-0">
            {description}
          </p>
          <div className="mt-8">
            <a
              href={ctaHref}
              className="inline-block bg-brand-600 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-brand-700 transition-colors duration-300"
            >
              {ctaText}
            </a>
          </div>
        </div>

        {/* Right: Accordion */}
        <div className="w-full md:w-1/2">
          <div className="flex flex-row items-center justify-center gap-4 overflow-x-auto p-4">
            {items.map((item, index) => (
              <AccordionItem
                key={item.id}
                item={item}
                isActive={index === activeIndex}
                onMouseEnter={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
