// u can use Vue, it has all these functionalities, but i made my move with v0 
'use client';

import { Element, useGameStore } from '@/store/game-store';
import { useState, useRef } from 'react';
import { soundManager } from '@/lib/sounds';

interface DraggableElementProps {
  element: Element;
  onDragStart?: (element: Element) => void;
  onDragEnd?: () => void;
  onTouchDragStart?: (element: Element, e: React.TouchEvent) => void;
  className?: string;
  isWorkspaceElement?: boolean;
  isDarkMode?: boolean;
  isNewlyDiscovered?: boolean;
}

const DraggableElement = ({ 
  element, 
  onDragStart, 
  onDragEnd,
  onTouchDragStart,
  className = '', 
  isWorkspaceElement = false,
  isDarkMode: propDarkMode,
  isNewlyDiscovered = false
}: DraggableElementProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const storeDarkMode = useGameStore((state) => state.isDarkMode);
  const isDarkMode = propDarkMode ?? storeDarkMode;
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  // Desktop drag handlers
  const handleDragStart = (e: React.DragEvent) => {
    setIsDragging(true);
    soundManager.playPickup();
    
    e.dataTransfer.effectAllowed = 'copy';
    e.dataTransfer.setData('application/json', JSON.stringify({
      ...element,
      isWorkspaceElement
    }));
    
    onDragStart?.(element);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    soundManager.playDrop();
    onDragEnd?.();
  };

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    
    // Small delay to differentiate tap from drag
    setTimeout(() => {
      if (touchStartRef.current) {
        setIsDragging(true);
        soundManager.playPickup();
        onTouchDragStart?.(element, e);
      }
    }, 100);
  };

  const handleTouchEnd = () => {
    touchStartRef.current = null;
    if (isDragging) {
      setIsDragging(false);
      soundManager.playDrop();
      onDragEnd?.();
    }
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      data-element-id={element.id}
      data-element-name={element.name}
      data-element-emoji={element.emoji}
      data-is-workspace={isWorkspaceElement}
      className={`
        inline-flex items-center gap-1.5 px-2.5 py-1.5
        rounded-md border
        cursor-grab active:cursor-grabbing
        text-sm font-medium
        transition-all duration-200 ease-out
        select-none touch-none
        will-change-transform
        ${isDragging ? 'opacity-50 scale-95' : 'hover:scale-105 active:scale-95'}
        ${isDarkMode 
          ? 'bg-black border-gray-600 text-white hover:bg-gray-900' 
          : 'bg-white border-gray-300 text-gray-900 hover:bg-gray-100 shadow-sm'
        }
        ${isNewlyDiscovered ? 'new-element-glow' : ''}
        ${className}
      `}
    >
      <span className="text-base">{element.emoji}</span>
      <span className="whitespace-nowrap">{element.name}</span>
    </div>
  );
};

export default DraggableElement;
