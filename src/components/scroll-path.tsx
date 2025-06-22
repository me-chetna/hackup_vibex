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

  const pathD = "M 250 120 C 450 220, 50 450, 250 550 S 450 750, 200 900 S 0 1100, 300 1300 S 500 1500, 250 1700 S -50 1900, 250 2100 S 550 2300, 200 2500 S -50 2700, 300 2900 S 500 3100, 250 3300";
  
  return (
    <div ref={svgContainerRef} className="absolute top-0 left-0 w-[500px] h-full pointer-events-none">
       <svg
        width="500"
        height="100%"
        viewBox="0 0 500 3400"
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
