"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ListPlus, HandHeart, Truck, Leaf } from "lucide-react";
import { BackgroundPaths } from "@/components/ui/background-paths";

const steps = [
  {
    icon: ListPlus,
    title: "List Surplus",
    description:
      "Restaurants, stores, and farms post surplus food with peak surplus days, quantities, and availability hours.",
  },
  {
    icon: HandHeart,
    title: "Claim in Real-Time",
    description:
      "Households, food banks, and composters browse the map and claim available food nearby.",
  },
  {
    icon: Truck,
    title: "Pick Up & Enjoy",
    description:
      "Coordinate pickup times and rescue food before it goes to waste.",
  },
];


export default function HomePage() {
  return (
    <>
      {/* Hero — full-screen animated background */}
      <BackgroundPaths title="Second Serving">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto mb-4"
        >
          Connecting businesses with surplus food to households, food banks, and
          composters in your neighborhood — all in real time.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mb-10 inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-1.5 text-sm font-medium text-green-700"
        >
          <Leaf className="h-4 w-4" />
          Filling plates, not landfills
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/map"
            className="inline-flex items-center gap-2 rounded-2xl bg-green-600 px-8 py-4 text-base font-medium text-white shadow-lg hover:bg-green-700 hover:-translate-y-0.5 transition-all duration-300 hover:shadow-xl"
          >
            Find Food Near Me
            <ArrowRight className="h-5 w-5" />
          </Link>

          <Link
            href="/register/business"
            className="inline-flex items-center gap-2 rounded-2xl border border-green-200 bg-white/80 px-8 py-4 text-base font-medium text-green-700 backdrop-blur-sm hover:bg-green-50 hover:-translate-y-0.5 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            List Your Surplus
          </Link>
        </motion.div>
      </BackgroundPaths>

      {/* How It Works */}
      <section className="py-12 md:py-20 bg-white">
        <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
          <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center">
            <h2 className="text-balance text-4xl font-medium lg:text-5xl text-gray-900">How It Works</h2>
            <p className="text-gray-500">Three simple steps to reduce food waste</p>
          </div>
          <div className="relative mx-auto grid max-w-2xl lg:max-w-4xl divide-x divide-y border border-green-100 sm:grid-cols-3">
            {steps.map((step, idx) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="space-y-3 p-12"
              >
                <div className="flex items-center gap-2 text-green-700">
                  <step.icon className="size-4" />
                  <h3 className="text-sm font-medium">{step.title}</h3>
                </div>
                <p className="text-sm text-gray-500">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-green-50">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-balance text-4xl font-medium lg:text-5xl text-gray-900">
              Ready to Make a Difference?
            </h2>
            <p className="mt-4 text-gray-500">
              Join thousands of businesses and community members already reducing
              food waste in their neighborhoods.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-2xl bg-green-600 px-8 py-4 text-base font-medium text-white shadow-md hover:bg-green-700 hover:-translate-y-0.5 transition-all duration-300"
              >
                Find Food Near Me
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/register/business"
                className="inline-flex items-center gap-2 rounded-2xl border border-green-300 bg-white px-8 py-4 text-base font-medium text-green-700 hover:bg-green-50 hover:-translate-y-0.5 transition-all duration-300"
              >
                Register Your Business
              </Link>
              <Link
                href="/listings"
                className="inline-flex items-center gap-2 rounded-2xl border border-green-300 bg-white px-8 py-4 text-base font-medium text-green-700 hover:bg-green-50 hover:-translate-y-0.5 transition-all duration-300"
              >
                Browse Listings
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
