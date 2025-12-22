'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useGameStore } from '@/store/game-store';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

const NetworkBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const nodesRef = useRef<Node[]>([]);
  const { clearWorkspace, resetGame, isDarkMode, toggleDarkMode, isLoading } = useGameStore();
  const isDarkModeRef = useRef(isDarkMode);

  // Keep ref in sync with state
  useEffect(() => {
    isDarkModeRef.current = isDarkMode;
  }, [isDarkMode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initNodes();
    };

    const initNodes = () => {
      const nodeCount = Math.floor((canvas.width * canvas.height) / 15000);
      nodesRef.current = [];
      
      for (let i = 0; i < nodeCount; i++) {
        nodesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: Math.random() * 1.5 + 1,
        });
      }
    };

    const drawNode = (node: Node) => {
      if (!ctx) return;
      
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctx.fillStyle = isDarkModeRef.current ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.6)';
      ctx.fill();
    };

    const drawConnection = (nodeA: Node, nodeB: Node, distance: number, maxDistance: number) => {
      if (!ctx) return;
      
      const opacity = (1 - distance / maxDistance) * 0.6;
      ctx.beginPath();
      ctx.moveTo(nodeA.x, nodeA.y);
      ctx.lineTo(nodeB.x, nodeB.y);
      ctx.strokeStyle = isDarkModeRef.current 
        ? `rgba(255, 255, 255, ${opacity})` 
        : `rgba(0, 0, 0, ${opacity * 0.5})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    const updateNode = (node: Node) => {
      node.x += node.vx;
      node.y += node.vy;

      // Bounce off edges with soft padding
      if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
      if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

      // Keep nodes in bounds
      node.x = Math.max(0, Math.min(canvas.width, node.x));
      node.y = Math.max(0, Math.min(canvas.height, node.y));
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const maxDistance = 120;
      const nodes = nodesRef.current;

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            drawConnection(nodes[i], nodes[j], distance, maxDistance);
          }
        }
      }

      // Draw and update nodes
      nodes.forEach((node) => {
        drawNode(node);
        updateNode(node);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener('resize', resize);
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className={`fixed inset-0 -z-10 transition-colors duration-300 ${isDarkMode ? 'bg-black' : 'bg-gray-100'}`}
      />
      
      {/* Top left - Blix logo and pixelated text */}
      <div className="fixed top-3 left-3 sm:top-4 sm:left-4 z-20 flex items-center gap-2 sm:gap-3">
        <Image src="/Blixlogo.ico" alt="BLIX" width={32} height={32} className="select-none sm:w-10 sm:h-10" />
        <span 
          className={`font-bold tracking-widest select-none ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
          style={{
            fontSize: 'clamp(14px, 4vw, 20px)',
            fontFamily: '"Press Start 2P", "Courier New", "Lucida Console", monospace',
            textShadow: isDarkMode ? `
              2px 0px 0px #000,
              -2px 0px 0px #000,
              0px 2px 0px #000,
              0px -2px 0px #000,
              2px 2px 0px #000,
              -2px -2px 0px #000,
              2px -2px 0px #000,
              -2px 2px 0px #000
            ` : 'none',
            imageRendering: 'pixelated',
            filter: 'contrast(1.3) brightness(1.1)',
            letterSpacing: '0.2em',
            transform: 'scaleY(1.1)',
            WebkitFontSmoothing: 'none',
            fontSmooth: 'never'
          }}
        >
          BLIX
        </span>
      </div>

      {/* Bottom action buttons - responsive positioning */}
      <div className="fixed bottom-28 lg:bottom-4 left-4 lg:left-auto lg:right-96 z-30 flex items-center gap-2 sm:gap-3">
        {/* Loading spinner */}
        {isLoading && (
          <div className={`animate-spin w-4 h-4 sm:w-5 sm:h-5 border-2 border-t-transparent rounded-full ${isDarkMode ? 'border-white' : 'border-gray-600'}`} />
        )}

        {/* Day/Night toggle */}
        <button
          onClick={toggleDarkMode}
          className="opacity-80 hover:opacity-100 transition-opacity cursor-pointer p-1"
          title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDarkMode ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="sm:w-7 sm:h-7">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2" />
              <path d="M12 20v2" />
              <path d="M4.93 4.93l1.41 1.41" />
              <path d="M17.66 17.66l1.41 1.41" />
              <path d="M2 12h2" />
              <path d="M20 12h2" />
              <path d="M6.34 17.66l-1.41 1.41" />
              <path d="M19.07 4.93l-1.41 1.41" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="sm:w-7 sm:h-7">
              <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
            </svg>
          )}
        </button>

        {/* Reset game */}
        <button
          onClick={resetGame}
          className="opacity-80 hover:opacity-100 transition-opacity cursor-pointer p-1"
          title="Reset Game"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={isDarkMode ? "#ffffff" : "#333333"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="sm:w-6 sm:h-6">
            <path d="M21 21l-6 -6" />
            <path d="M3.268 12.043a7.017 7.017 0 0 0 6.634 4.957a7.012 7.012 0 0 0 7.043 -6.131a7 7 0 0 0 -5.314 -7.672a7.021 7.021 0 0 0 -8.241 4.403" />
            <path d="M3 4v4h4" />
          </svg>
        </button>

        {/* Clear canvas (broom) */}
        <button
          onClick={clearWorkspace}
          className="opacity-80 hover:opacity-100 transition-opacity cursor-pointer p-1"
          title="Clear Canvas"
        >
          <svg 
            height="24" 
            width="24" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 256 256" 
            fill={isDarkMode ? "#ffffff" : "#333333"}
            className="sm:w-7 sm:h-7"
          >
            <path d="M234.62,218.6C211.35,207.29,198,183,198,152V134.7a14,14,0,0,0-8.82-13l-24.89-9.83a10,10,0,0,1-5.59-13L180,45.9a26,26,0,0,0-15-34.33c-12.95-4.83-27.88,1.84-33.31,15l-21,53.11a10,10,0,0,1-13,5.61L72.37,75a13.9,13.9,0,0,0-15.2,3.19C36.49,99.42,26,124.26,26,152a109.53,109.53,0,0,0,30.62,76.16A6,6,0,0,0,61,230H232a6,6,0,0,0,2.62-11.4ZM65.77,86.52a2,2,0,0,1,2.12-.43l25.4,10.29a22,22,0,0,0,28.63-12.32l21-53c3-7.13,11-10.81,18-8.21a14,14,0,0,1,8,18.54l-21.36,53.1A22.05,22.05,0,0,0,159.86,123l24.88,9.83A2,2,0,0,1,186,134.7V152c0,1.34,0,2.65.08,4L52.74,102.61A110.07,110.07,0,0,1,65.77,86.52ZM114.33,218a89.6,89.6,0,0,1-25.5-43.5,6,6,0,1,0-11.62,3A102.87,102.87,0,0,0,97.81,218H63.56A97.56,97.56,0,0,1,38,152a87.42,87.42,0,0,1,8.71-38.86L187.35,169.4c3.15,19.92,11.77,36.66,25,48.6Z"/>
          </svg>
        </button>
      </div>
    </>
  );
};

export default NetworkBackground;