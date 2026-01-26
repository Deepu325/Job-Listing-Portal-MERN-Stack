import React from 'react';
import { motion } from 'framer-motion';

const AnimatedBackground = () => {
    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-gray-50/50">
            {/* 1. Large Top-Left Blob */}
            <motion.div
                className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-green-200/30 rounded-full mix-blend-multiply filter blur-[80px]"
                animate={{
                    x: [0, 30, -20, 0],
                    y: [0, -50, 20, 0],
                    scale: [1, 1.1, 0.9, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                }}
            />

            {/* 2. Large Top-Right Blob */}
            <motion.div
                className="absolute top-[10%] right-[-10%] w-[35rem] h-[35rem] bg-emerald-200/30 rounded-full mix-blend-multiply filter blur-[80px]"
                animate={{
                    x: [0, -40, 20, 0],
                    y: [0, 40, -30, 0],
                    scale: [1, 1.2, 0.8, 1],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    delay: 2
                }}
            />

            {/* 3. Bottom-Left Blob */}
            <motion.div
                className="absolute bottom-[-10%] left-[20%] w-[45rem] h-[45rem] bg-teal-100/40 rounded-full mix-blend-multiply filter blur-[80px]"
                animate={{
                    x: [0, 50, -30, 0],
                    y: [0, -30, 40, 0],
                    scale: [1, 0.9, 1.1, 1],
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    delay: 5
                }}
            />

            {/* 4. Subtle Noise Overlay (Optional Texture) */}
            <div
                className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />
        </div>
    );
};

export default AnimatedBackground;
