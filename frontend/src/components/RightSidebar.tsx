'use client';

import { useGameStore, Element } from '@/store/game-store';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { useState, useEffect, useRef } from 'react';
import { soundManager } from '@/lib/sounds';
import { assignEmojiToElement } from '@/lib/emoji-utils';

interface TouchDragState {
  element: Element;
  currentX: number;
  currentY: number;
}

const RightSidebar = () => {
  const { discoveredElements, isDarkMode, addWorkspaceElement } = useGameStore();
  const [touchDrag, setTouchDrag] = useState<TouchDragState | null>(null);

  const { data: stats } = useQuery({
    queryKey: ['gameStats'],
    queryFn: api.getStats,
    refetchInterval: 30000,
  });

  // Touch handlers for sidebar elements
  const handleTouchStart = (element: Element, e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    soundManager.playPickup();
    setTouchDrag({
      element,
      currentX: touch.clientX,
      currentY: touch.clientY
    });
  };

  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      if (!touchDrag) return;
      e.preventDefault();
      const touch = e.touches[0];
      setTouchDrag(prev => prev ? {
        ...prev,
        currentX: touch.clientX,
        currentY: touch.clientY
      } : null);
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchDrag) return;
      
      const touch = e.changedTouches[0];
      
      // Find canvas element
      const canvas = document.querySelector('[data-canvas="true"]') || 
                     document.elementFromPoint(touch.clientX, touch.clientY)?.closest('.min-h-screen');
      
      if (canvas) {
        const rect = canvas.getBoundingClientRect();
        
        // Check if dropped on canvas area (not on sidebar)
        const isOnCanvas = touch.clientX < rect.right - 320 || window.innerWidth < 1024;
        const isAboveBottomBar = window.innerWidth >= 1024 || touch.clientY < window.innerHeight - 100;
        
        if (isOnCanvas && isAboveBottomBar) {
          const dropX = touch.clientX - 50;
          const dropY = touch.clientY - 20;
          
          addWorkspaceElement({
            ...touchDrag.element,
            x: Math.max(0, dropX),
            y: Math.max(0, dropY)
          });
          
          soundManager.playDrop();
        }
      }
      
      setTouchDrag(null);
    };

    if (touchDrag) {
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [touchDrag, addWorkspaceElement]);

  const ElementItem = ({ element }: { element: Element }) => (
    <div
      draggable
      onDragStart={(e) => {
        soundManager.playPickup();
        e.dataTransfer.effectAllowed = 'copy';
        e.dataTransfer.setData('application/json', JSON.stringify(element));
      }}
      onDragEnd={() => soundManager.playDrop()}
      onTouchStart={(e) => handleTouchStart(element, e)}
      className={`
        inline-flex items-center gap-1.5 px-2.5 py-1.5
        rounded-md border cursor-grab active:cursor-grabbing
        text-sm font-medium select-none touch-none
        transition-all duration-150 ease-out
        hover:scale-105 active:scale-105 flex-shrink-0
        ${isDarkMode 
          ? 'bg-black border-gray-600 text-white hover:bg-gray-900' 
          : 'bg-white border-gray-300 text-gray-900 hover:bg-gray-100 shadow-sm'
        }
      `}
    >
      <span className="text-base">{element.emoji}</span>
      <span className="whitespace-nowrap">{element.name}</span>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={`hidden lg:block fixed right-0 top-0 h-full w-80 backdrop-blur-sm border-l shadow-lg z-10 overflow-y-auto transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-black/90 border-gray-700' 
          : 'bg-white/90 border-gray-200'
      }`}>
        <div className="p-6">
          <div className={`text-sm mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Discovered: {discoveredElements.length} elements
          </div>

          <div className="mb-6">
            <div className="flex flex-wrap gap-1.5">
              {discoveredElements.map((element) => (
                <ElementItem key={element.id} element={element} />
              ))}
            </div>
          </div>

          {stats && (
            <div className="mb-6">
              <h3 className={`font-medium mb-3 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                <span>📊</span>
                Statistics
              </h3>
              <div className={`rounded-lg p-4 space-y-2 text-sm transition-colors duration-300 ${
                isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
              }`}>
                <div className="flex justify-between">
                  <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Total Elements:</span>
                  <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{stats.total_elements}</span>
                </div>
                <div className="flex justify-between">
                  <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Combinations:</span>
                  <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{stats.total_combinations}</span>
                </div>
                <div className="flex justify-between">
                  <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Cache Size:</span>
                  <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{stats.cache_size}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Bottom Bar */}
      <div className={`lg:hidden fixed bottom-0 left-0 right-0 z-20 transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-black/95 border-gray-700' 
          : 'bg-white/95 border-gray-200'
      } border-t backdrop-blur-sm`}>
        <div className="p-3">
          <div className={`text-xs mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {discoveredElements.length} elements
          </div>
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
            {discoveredElements.map((element) => (
              <ElementItem key={element.id} element={element} />
            ))}
          </div>
        </div>
      </div>

      {/* Touch drag ghost */}
      {touchDrag && (
        <div
          className="fixed pointer-events-none z-50"
          style={{
            left: touchDrag.currentX - 50,
            top: touchDrag.currentY - 20,
          }}
        >
          <div className={`
            inline-flex items-center gap-1.5 px-2.5 py-1.5
            rounded-md border text-sm font-medium opacity-80
            ${isDarkMode 
              ? 'bg-black border-gray-600 text-white' 
              : 'bg-white border-gray-300 text-gray-900 shadow-lg'
            }
          `}>
            <span className="text-base">{touchDrag.element.emoji}</span>
            <span className="whitespace-nowrap">{touchDrag.element.name}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default RightSidebar;
