"use client";

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function ScrollPath() {
  const svgContainerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [sunPosition, setSunPosition] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: svgContainerRef,
    offset: ["start start", "end end"]
  });
  
  const pathLength = useTransform(scrollYProgress, (value) => {
    if (pathRef.current) {
        return pathRef.current.getTotalLength() * value;
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

  const pathD = "M 150 120 C 250 220, 50 450, 150 550 S 250 750, 100 900 S 0 1100, 200 1300 S 300 1500, 150 1700 S 50 1900, 150 2100 S 250 2300, 100 2500 S 50 2700, 200 2900 S 300 3100, 150 3300";
  
  return (
    <div ref={svgContainerRef} className="absolute top-0 right-0 w-[300px] h-full pointer-events-none">
       <svg
        width="300"
        height="100%"
        viewBox="0 0 300 3400"
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
