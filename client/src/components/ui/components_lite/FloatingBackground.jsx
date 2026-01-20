import React from 'react';

// Floating icons for the background
const floatingIcons = ['💼', '🎯', '📊', '💡', '🚀', '⭐', '📈', '🎨', '💻', '🔮', '✨', '🌟'];

const FloatingBackground = () => {
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: -1 }}>
            {/* Gradient base */}
            <div
                className="absolute inset-0"
                style={{
                    background: 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(240,253,244,0.5) 50%, rgba(255,255,255,1) 100%)'
                }}
            ></div>

            {/* Grid pattern */}
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: 'radial-gradient(circle, rgba(34,197,94,0.08) 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}
            ></div>

            {/* Floating emoji icons */}
            {floatingIcons.map((icon, i) => (
                <div
                    key={i}
                    className="absolute select-none"
                    style={{
                        left: `${5 + (i * 8) % 85}%`,
                        top: `${10 + (i * 11) % 75}%`,
                        fontSize: `${1.2 + (i % 3) * 0.4}rem`,
                        opacity: 0.15,
                        animation: `floatAround ${18 + (i % 5) * 4}s ease-in-out infinite`,
                        animationDelay: `${i * 0.5}s`,
                    }}
                >
                    {icon}
                </div>
            ))}

            {/* Large gradient orbs */}
            <div
                className="absolute rounded-full blur-3xl"
                style={{
                    width: '400px',
                    height: '400px',
                    left: '10%',
                    top: '20%',
                    background: 'radial-gradient(circle, rgba(34,197,94,0.12) 0%, transparent 70%)',
                    animation: 'pulse 10s ease-in-out infinite',
                }}
            ></div>
            <div
                className="absolute rounded-full blur-3xl"
                style={{
                    width: '500px',
                    height: '500px',
                    right: '5%',
                    bottom: '10%',
                    background: 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)',
                    animation: 'pulse 15s ease-in-out infinite',
                    animationDelay: '5s',
                }}
            ></div>
            <div
                className="absolute rounded-full blur-2xl"
                style={{
                    width: '300px',
                    height: '300px',
                    left: '50%',
                    top: '60%',
                    transform: 'translateX(-50%)',
                    background: 'radial-gradient(circle, rgba(52,211,153,0.08) 0%, transparent 70%)',
                    animation: 'pulse 12s ease-in-out infinite',
                    animationDelay: '3s',
                }}
            ></div>

            {/* Sparkle dots */}
            {[...Array(25)].map((_, i) => (
                <div
                    key={`sparkle-${i}`}
                    className="absolute rounded-full"
                    style={{
                        width: `${3 + (i % 3)}px`,
                        height: `${3 + (i % 3)}px`,
                        left: `${3 + (i * 4) % 94}%`,
                        top: `${5 + (i * 5) % 85}%`,
                        backgroundColor: `rgba(34, 197, 94, ${0.2 + (i % 3) * 0.1})`,
                        animation: `twinkle ${2 + (i % 3)}s ease-in-out infinite`,
                        animationDelay: `${i * 0.2}s`,
                    }}
                ></div>
            ))}

            {/* Moving lines */}
            <div
                className="absolute h-px bg-gradient-to-r from-transparent via-green-300 to-transparent"
                style={{
                    width: '200px',
                    top: '30%',
                    left: '-200px',
                    opacity: 0.3,
                    animation: 'moveLine 20s linear infinite',
                }}
            ></div>
            <div
                className="absolute h-px bg-gradient-to-r from-transparent via-emerald-300 to-transparent"
                style={{
                    width: '150px',
                    top: '70%',
                    left: '-150px',
                    opacity: 0.25,
                    animation: 'moveLine 25s linear infinite',
                    animationDelay: '8s',
                }}
            ></div>

            {/* Global keyframes */}
            <style>{`
        @keyframes floatAround {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(15px, -25px) rotate(8deg);
          }
          50% {
            transform: translate(-10px, -15px) rotate(-5deg);
          }
          75% {
            transform: translate(20px, -35px) rotate(5deg);
          }
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 0.6;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.1);
          }
        }
        @keyframes twinkle {
          0%, 100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.8);
          }
        }
        @keyframes moveLine {
          0% {
            left: -200px;
          }
          100% {
            left: 100%;
          }
        }
      `}</style>
        </div>
    );
};

export default FloatingBackground;
