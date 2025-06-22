"use client";

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function ScrollPath() {
  const pathRef = useRef<SVGPathElement>(null);
  const [sunPosition, setSunPosition] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    offset: ["start start", "end end"]
  });
  
  const pathLength = useTransform(scrollYProgress, (value) => {
    if (pathRef.current) {
        const totalLength = pathRef.current.getTotalLength();
        return totalLength * value;
    }
    return 0;
  });

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      if (pathRef.current) {
        const path = pathRef.current;
        const length = path.getTotalLength();
        if (length > 0) {
            const point = path.getPointAtLength(latest * length);
            setSunPosition({ x: point.x, y: point.y });
        }
      }
    });
  }, [scrollYProgress]);

  const pathD = "M 150 500 S 250 600, 150 700 S 50 800, 150 900 S 250 1000, 150 1100 S 50 1200, 150 1300 S 250 1400, 150 1500 S 50 1600, 150 1700 S 250 1800, 150 1900 S 50 2000, 150 2100 S 250 2200, 150 2300 S 50 2400, 150 2500 S 250 2600, 150 2700 S 50 2800, 150 2900 S 250 3000, 150 3100 S 50 3200, 150 3300 S 250 3400, 150 3500";
  
  return (
    <div className="absolute top-0 right-0 w-[300px] h-full pointer-events-none">
       <svg
        width="300"
        height="100%"
        viewBox="0 0 300 3600"
        preserveAspectRatio="xMidYMin slice"
        className="opacity-40"
      >
        <path
          d={pathD}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
        />
        <motion.path
          ref={pathRef}
          d={pathD}
          fill="none"
          stroke="hsl(var(--accent))"
          strokeWidth="2"
          style={{
            strokeDasharray: '10 10',
            pathLength: pathLength
          }}
          initial={{ pathLength: 0 }}
        />
      </svg>
      <motion.div
        className="absolute"
        style={{
          left: sunPosition.x,
          top: sunPosition.y,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: [1, 1.3, 1],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="w-5 h-5 rounded-full bg-accent" style={{
            boxShadow: '0 0 20px 8px hsl(var(--accent) / 0.7)',
        }}/>
      </motion.div>
    </div>
  );
}
