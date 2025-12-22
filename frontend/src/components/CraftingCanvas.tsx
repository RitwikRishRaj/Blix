'use client';

import { useGameStore, Element } from '@/store/game-store';
import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { assignEmojiToElement } from '@/lib/emoji-utils';
import { soundManager } from '@/lib/sounds';
import { useState, useRef, useEffect } from 'react';
import DraggableElement from './DraggableElement';

interface TouchDragState {
  element: Element;
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  isWorkspaceElement: boolean;
  originalId?: string;
}

const CraftingCanvas = () => {
  const { 
    workspaceElements, 
    addWorkspaceElement, 
    removeWorkspaceElement, 
    addDiscoveredElement,
    discoveredElements,
    setLoading,
    isDarkMode
  } = useGameStore();
  
  const canvasRef = useRef<HTMLDivElement>(null);
  const [touchDrag, setTouchDrag] = useState<TouchDragState | null>(null);
  const [lastCraftSource, setLastCraftSource] = useState<string | null>(null);
  const [lastCraftCached, setLastCraftCached] = useState<boolean>(false);
  const [newlyDiscoveredId, setNewlyDiscoveredId] = useState<string | null>(null);

  const craftMutation = useMutation({
    mutationFn: api.craft,
    onMutate: () => setLoading(true),
    onSettled: () => setLoading(false),
    onError: (error) => {
      console.error('Crafting failed:', error);
      setLoading(false);
    }
  });

  // this section handles desktop drag drop, obvs it has to be there
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    
    try {
      const jsonData = e.dataTransfer.getData('application/json');
      if (!jsonData) return;
      
      const elementData = JSON.parse(jsonData);
      const rect = canvasRef.current?.getBoundingClientRect();
      
      if (rect) {
        const x = e.clientX - rect.left - 50;
        const y = e.clientY - rect.top - 20;
        
        if (elementData.isWorkspaceElement) {
          removeWorkspaceElement(elementData.id);
        }
        
        addWorkspaceElement({
          ...elementData,
          isWorkspaceElement: undefined,
          x: Math.max(0, Math.min(x, rect.width - 100)),
          y: Math.max(0, Math.min(y, rect.height - 40))
        });
      }
    } catch (error) {
      console.error('Failed to parse dropped element:', error);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  // Combining elements
  const handleElementCombine = (droppedElement: Element, targetElement: Element) => {
    const targetPosition = { x: targetElement.x || 0, y: targetElement.y || 0 };
    
    craftMutation.mutate({
      element1: droppedElement.name,
      element2: targetElement.name
    }, {
      onSuccess: (data) => {
        if (data.success && data.result) {
          // Use emoji from backend if available, otherwise use frontend mapping; just incase it the backend emoji logic fails
          const backendEmoji = data.emoji;
          const frontendEmoji = assignEmojiToElement(data.result).emoji;
          const finalEmoji = backendEmoji && backendEmoji.length > 0 ? backendEmoji : frontendEmoji;
          
          const workspaceId = `${data.result.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`;
          
          const newElement: Element = {
            id: data.result.toLowerCase().replace(/\s+/g, '-'),
            name: data.result,
            emoji: finalEmoji,
            isBasic: false
          };
          
          // Check if this is a NEW discovery
          const isNewDiscovery = !discoveredElements.some((e: Element) => e.name.toLowerCase() === data.result?.toLowerCase());
          
          if (isNewDiscovery) {
            addDiscoveredElement(newElement);
            soundManager.playDiscovery();
            setNewlyDiscoveredId(workspaceId);
            setTimeout(() => setNewlyDiscoveredId(null), 2000);
          } else {
            soundManager.playCombine();
          }
          
          addWorkspaceElement({
            ...newElement,
            id: workspaceId,
            x: targetPosition.x,
            y: targetPosition.y
          });
          
          const displaySource = data.source === 'ai' ? 'AI' : (data.source ?? null);
          setLastCraftSource(displaySource);
          setLastCraftCached(!!data.cached);
          setTimeout(() => setLastCraftSource(null), 2500);
        }
      }
    });

    removeWorkspaceElement(droppedElement.id);
    removeWorkspaceElement(targetElement.id);
  };

  const handleWorkspaceElementDrop = (e: React.DragEvent, targetElement: Element) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      const droppedElementData = JSON.parse(e.dataTransfer.getData('application/json'));
      
      if (droppedElementData && droppedElementData.id !== targetElement.id) {
        if (droppedElementData.isWorkspaceElement) {
          removeWorkspaceElement(droppedElementData.id);
        }
        handleElementCombine(droppedElementData, targetElement);
      }
    } catch (error) {
      console.error('Failed to parse dropped element data:', error);
    }
  };

  // Touch handlers, for mobile/touchy devices
  const handleTouchDragStart = (element: Element, e: React.TouchEvent, isWorkspace: boolean = false, originalId?: string) => {
    const touch = e.touches[0];
    setTouchDrag({
      element,
      startX: touch.clientX,
      startY: touch.clientY,
      currentX: touch.clientX,
      currentY: touch.clientY,
      isWorkspaceElement: isWorkspace,
      originalId
    });
  };

  // Global touch move/end handlers
  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      if (!touchDrag) return;
      
      const touch = e.touches[0];
      setTouchDrag(prev => prev ? {
        ...prev,
        currentX: touch.clientX,
        currentY: touch.clientY
      } : null);
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchDrag) return;
      
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) {
        setTouchDrag(null);
        return;
      }

      const touch = e.changedTouches[0];
      const dropX = touch.clientX - rect.left - 50;
      const dropY = touch.clientY - rect.top - 20;

      // Check if dropped on canvas
      if (touch.clientX >= rect.left && touch.clientX <= rect.right &&
          touch.clientY >= rect.top && touch.clientY <= rect.bottom) {
        
        // Find nearby elements for collision (within 60px radius for easier mobile interaction)
        let closestElement: Element | null = null;
        let closestDistance = 60; // Collision radius in pixels
        
        workspaceElements.forEach(el => {
          if (el.id === touchDrag.originalId) return; // Skip self
          
          const elX = el.x || 0;
          const elY = el.y || 0;
          const distance = Math.sqrt(
            Math.pow(dropX - elX, 2) + Math.pow(dropY - elY, 2)
          );
          
          if (distance < closestDistance) {
            closestDistance = distance;
            closestElement = el;
          }
        });

        if (closestElement) {
          // Combine with closest element
          if (touchDrag.isWorkspaceElement && touchDrag.originalId) {
            removeWorkspaceElement(touchDrag.originalId);
          }
          handleElementCombine(touchDrag.element, closestElement);
        } else {
          // Drop on empty canvas
          if (touchDrag.isWorkspaceElement && touchDrag.originalId) {
            removeWorkspaceElement(touchDrag.originalId);
          }
          
          addWorkspaceElement({
            ...touchDrag.element,
            x: Math.max(0, Math.min(dropX, rect.width - 100)),
            y: Math.max(0, Math.min(dropY, rect.height - 40))
          });
        }
        
        soundManager.playDrop();
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
  }, [touchDrag, workspaceElements, addWorkspaceElement, removeWorkspaceElement]);

  return (
    <div className="relative w-full h-screen z-20">
      <div
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-20 min-h-screen"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        style={{ minHeight: '100vh' }}
      >
        {/* Workspace Elements */}
        {workspaceElements.map((element) => (
          <div
            key={element.id}
            className="absolute"
            style={{
              left: element.x || 0,
              top: element.y || 0,
            }}
            onDrop={(e) => handleWorkspaceElementDrop(e, element)}
            onDragOver={(e) => {
              e.preventDefault();
              e.dataTransfer.dropEffect = 'move';
            }}
          >
            <DraggableElement
              element={element}
              onTouchDragStart={(el, e) => handleTouchDragStart(el, e, true, element.id)}
              className="cursor-move"
              isWorkspaceElement={true}
              isNewlyDiscovered={element.id === newlyDiscoveredId}
            />
          </div>
        ))}

        {/* Touch drag ghost element */}
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

        {/* Empty canvas */}
        {workspaceElements.length === 0 && (
          <div className="absolute inset-0 pointer-events-none" />
        )}

        {/* Source Badge */}
        {lastCraftSource && (
          <div className="fixed bottom-28 lg:bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
            <div className={`px-3 py-2 rounded-md text-sm ${isDarkMode ? 'bg-black/70 text-white' : 'bg-white/90 text-gray-800 shadow-lg'}`}>
              {lastCraftCached ? 'Cached' : lastCraftSource?.toUpperCase()} result
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CraftingCanvas;
