"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function ScrollPath() {
  const pathRef = useRef<SVGPathElement>(null);

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

  // By mapping the scroll progress directly to the `top` CSS property,
  // we ensure the sun's movement is always synchronized with the scrollbar,
  // regardless of the page's actual height.
  // The path starts at y=500 in a 3600-height viewBox (13.8%).
  const sunY = useTransform(scrollYProgress, [0, 1], ['13.8%', '100%']);

  const pathD = "M 250 500 V 3600";
  
  return (
    <div className="absolute top-0 right-0 w-[300px] h-full pointer-events-none">
       <svg
        width="300"
        height="100%"
        viewBox="0 0 300 3600"
        preserveAspectRatio="xMidYMin slice"
        className="opacity-40"
      >
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
          left: '250px',
          top: sunY,
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
