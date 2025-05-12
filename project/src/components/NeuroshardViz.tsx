import React, { useRef, useEffect, useState } from 'react';
import { useNeuroshard } from '../context/NeuroshardContext';
import { SkillNode, Connection } from '../types';

const NeuroshardViz: React.FC = () => {
  const { neuroshard } = useNeuroshard();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredNode, setHoveredNode] = useState<SkillNode | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [activeNode, setActiveNode] = useState<SkillNode | null>(null);
  
  // Animation frame handling
  const rafRef = useRef<number | null>(null);
  const frameCount = useRef(0);

  // Function to handle mouse movement on canvas
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Check if mouse is hovering over any node
    let foundNode = null;
    for (const node of neuroshard.skills) {
      const dx = node.x - x;
      const dy = node.y - y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < node.size / 2) {
        foundNode = node;
        setTooltipPos({ x: node.x, y: node.y - node.size - 10 });
        break;
      }
    }
    
    setHoveredNode(foundNode);
  };
  
  // Function to handle clicks on canvas
  const handleCanvasClick = () => {
    if (hoveredNode) {
      setActiveNode(hoveredNode === activeNode ? null : hoveredNode);
    } else {
      setActiveNode(null);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getBoundingClientRect();
    canvas.width = ctx.width;
    canvas.height = ctx.height;
    
    const drawFrame = () => {
      const context = canvas.getContext('2d');
      if (!context) return;
      
      // Clear canvas
      context.clearRect(0, 0, canvas.width, canvas.height);
      
      // Increment frame counter
      frameCount.current += 1;
      
      // Draw connections
      drawConnections(context);
      
      // Draw nodes
      drawNodes(context);
      
      // Continue animation loop
      rafRef.current = requestAnimationFrame(drawFrame);
    };
    
    const drawConnections = (context: CanvasRenderingContext2D) => {
      neuroshard.connections.forEach(connection => {
        const sourceNode = neuroshard.skills.find(node => node.id === connection.source);
        const targetNode = neuroshard.skills.find(node => node.id === connection.target);
        
        if (sourceNode && targetNode) {
          context.beginPath();
          context.moveTo(sourceNode.x, sourceNode.y);
          context.lineTo(targetNode.x, targetNode.y);
          
          // Determine if this connection involves the active or hovered node
          const isActive = 
            (activeNode && (connection.source === activeNode.id || connection.target === activeNode.id)) ||
            (hoveredNode && (connection.source === hoveredNode.id || connection.target === hoveredNode.id));
          
          // Set connection style
          context.strokeStyle = isActive 
            ? `rgba(165, 180, 252, ${connection.strength})` 
            : `rgba(99, 102, 241, ${connection.strength * 0.3})`;
            
          context.lineWidth = isActive ? 2 : 1;
          context.stroke();
          
          // Add pulsing effect to active connections
          if (isActive) {
            const pulse = Math.sin(frameCount.current * 0.05) * 0.5 + 0.5;
            context.beginPath();
            context.moveTo(sourceNode.x, sourceNode.y);
            context.lineTo(targetNode.x, targetNode.y);
            context.strokeStyle = `rgba(165, 180, 252, ${pulse * connection.strength * 0.5})`;
            context.lineWidth = 4;
            context.stroke();
          }
        }
      });
    };
    
    const drawNodes = (context: CanvasRenderingContext2D) => {
      neuroshard.skills.forEach(node => {
        const isActive = node === activeNode;
        const isHovered = node === hoveredNode;
        
        // Pulsing effect
        const baseSize = node.size;
        const pulseAmount = Math.sin(frameCount.current * 0.05 + node.value * 10) * 0.15 + 1;
        const size = baseSize * (isActive || isHovered ? 1.2 : pulseAmount);
        
        // Glow effect
        if (isActive || isHovered) {
          context.shadowBlur = 15;
          context.shadowColor = node.color;
        } else {
          context.shadowBlur = 5;
          context.shadowColor = node.color;
        }
        
        // Draw node
        context.beginPath();
        context.arc(node.x, node.y, size / 2, 0, Math.PI * 2);
        
        // Create gradient
        const gradient = context.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, size / 2
        );
        
        gradient.addColorStop(0, `${node.color}FF`);
        gradient.addColorStop(1, `${node.color}77`);
        
        context.fillStyle = gradient;
        context.fill();
        
        // Reset shadow for text
        context.shadowBlur = 0;
        
        // Add small pulse circles for highly skilled nodes
        if (node.value > 0.75 && !isActive && !isHovered) {
          const outerPulse = Math.sin(frameCount.current * 0.03 + node.value * 5) * 0.5 + 0.5;
          
          context.beginPath();
          context.arc(node.x, node.y, (size / 2) + 5 + outerPulse * 5, 0, Math.PI * 2);
          context.strokeStyle = `${node.color}33`;
          context.lineWidth = 2;
          context.stroke();
        }
      });
    };
    
    // Start animation loop
    rafRef.current = requestAnimationFrame(drawFrame);
    
    // Cleanup
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [neuroshard, hoveredNode, activeNode]);

  return (
    <div className="relative bg-slate-900/50 rounded-xl border border-indigo-900/50 p-4 shadow-lg overflow-hidden">
      <h2 className="text-lg font-semibold text-indigo-300 mb-2">Neuroshard Visualization</h2>
      <div className="relative mx-auto" style={{ width: '400px', height: '400px' }}>
        <canvas 
          ref={canvasRef} 
          className="w-full h-full cursor-pointer"
          onMouseMove={handleMouseMove}
          onClick={handleCanvasClick}
        />
        
        {hoveredNode && (
          <div 
            className="absolute pointer-events-none bg-slate-800/90 text-white text-sm px-3 py-1.5 rounded-lg border border-indigo-500/30 shadow-xl z-10 transform -translate-x-1/2"
            style={{ 
              left: tooltipPos.x, 
              top: tooltipPos.y,
              opacity: 0.9
            }}
          >
            <p className="font-medium">{hoveredNode.name}: {Math.round(hoveredNode.value * 100)}%</p>
          </div>
        )}
        
        {activeNode && (
          <div className="absolute inset-0 bg-slate-900/80 flex items-center justify-center p-6 z-20 rounded-xl">
            <div className="bg-slate-800 rounded-lg p-5 max-w-md border border-indigo-500/30 shadow-2xl">
              <h3 className="text-xl font-bold mb-3 text-indigo-300">{activeNode.name}</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-300 mb-1">Proficiency: {Math.round(activeNode.value * 100)}%</p>
                  <div className="w-full bg-slate-700 rounded-full h-2.5">
                    <div 
                      className="h-2.5 rounded-full" 
                      style={{ 
                        width: `${activeNode.value * 100}%`,
                        backgroundColor: activeNode.color
                      }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <p className="text-gray-300 mb-1">Connected Skills:</p>
                  <ul className="space-y-1">
                    {neuroshard.connections
                      .filter(conn => conn.source === activeNode.id || conn.target === activeNode.id)
                      .map(conn => {
                        const connectedNodeId = conn.source === activeNode.id ? conn.target : conn.source;
                        const connectedNode = neuroshard.skills.find(node => node.id === connectedNodeId);
                        return (
                          <li key={connectedNodeId} className="flex items-center">
                            <span 
                              className="inline-block w-2 h-2 rounded-full mr-2"
                              style={{ backgroundColor: connectedNode?.color }}
                            ></span>
                            <span className="text-sm">{connectedNode?.name} ({Math.round(conn.strength * 100)}% connection)</span>
                          </li>
                        );
                      })}
                  </ul>
                </div>
                
                <div className="pt-2">
                  <button 
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white text-sm"
                    onClick={() => setActiveNode(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NeuroshardViz;