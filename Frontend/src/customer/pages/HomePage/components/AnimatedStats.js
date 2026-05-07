import React, { useEffect, useRef } from 'react';

function useCountUp(target, durationMs = 1200) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let start = 0;
    const end = Number(target) || 0;
    const startTs = performance.now();
    let rafId;
    const step = (ts) => {
      const progress = Math.min(1, (ts - startTs) / durationMs);
      const value = Math.floor(start + (end - start) * progress);
      el.textContent = value.toString();
      if (progress < 1) rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [target, durationMs]);
  return ref;
}

const Stat = ({ label, value, suffix = '' }) => {
  const ref = useCountUp(value);
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border p-6 bg-white dark:bg-gray-900 dark:border-gray-700">
      <p className="text-3xl font-extrabold text-pink-950 dark:text-white">
        <span ref={ref}>0</span>
        {suffix}
      </p>
      <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{label}</p>
    </div>
  );
};

const AnimatedStats = () => {
  return (
    <section className="px-2 md:px-0">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <Stat label="Happy Customers" value={12000} suffix="+" />
        <Stat label="Designs" value={850} suffix="+" />
        <Stat label="Stores & Partners" value={35} suffix="+" />
        <Stat label="Years Crafting" value={10} suffix="+" />
      </div>
    </section>
  );
};

export default AnimatedStats;









