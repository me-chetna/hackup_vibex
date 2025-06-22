"use client";

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function ScrollPath({ target }: { target: React.RefObject<HTMLDivElement> }) {
  const pathRef = useRef<SVGPathElement>(null);
  const [sunPosition, setSunPosition] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target,
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

  const pathD = "M 150 400 C 250 500, 50 730, 150 830 S 250 1030, 100 1180 S 0 1380, 200 1580 S 300 1780, 150 1980 S 50 2180, 150 2380 S 250 2580, 100 2780 S 50 2980, 200 3180 S 300 3380, 150 3580";
  
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
