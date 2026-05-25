// /src/components/AnimatedGridIcon.tsx
"use client";

import { motion } from "framer-motion";

// ... (interface dan variants tetap sama) ...
interface AnimatedGridIconProps {
  isOpen: boolean;
  onClick: () => void;
}
const dotVariants = {
  closed: { scale: 1, opacity: 1 },
  open: { scale: 0, opacity: 0 },
};


export const AnimatedGridIcon = ({ isOpen, onClick }: AnimatedGridIconProps) => {
  return (
    <motion.button
      onClick={onClick}
      // HAPUS 'md:hidden' dari sini untuk tampil di semua layar
      className="relative h-8 w-8 text-text-body z-50" 
      animate={isOpen ? "open" : "closed"}
      aria-label="Toggle menu"
      // TAMBAHKAN efek hover ini
      whileHover={{ scale: 1.1 }}
    >
      {/* ... (sisa kode komponen tidak berubah) ... */}
      <motion.span
        className="absolute h-0.5 w-full bg-current"
        style={{ left: '50%', top: '50%', x: '-50%', y: '-50%' }}
        variants={{ closed: { rotate: 0, scaleX: 0 }, open: { rotate: 45, scaleX: 1 } }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
      <motion.span
        className="absolute h-0.5 w-full bg-current"
        style={{ left: '50%', top: '50%', x: '-50%', y: '-50%' }}
        variants={{ closed: { rotate: 0, scaleX: 0 }, open: { rotate: -45, scaleX: 1 } }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-1">
        {[...Array(9)].map((_, i) => (
          <motion.span
            key={i}
            className="h-full w-full rounded-full bg-current"
            variants={dotVariants}
            transition={{ duration: 0.2 }}
          />
        ))}
      </div>
    </motion.button>
  );
};