import React, { useEffect, useRef } from 'react';
import { PersonalityTrait } from '../../types';

interface RadarChartProps {
  traits: PersonalityTrait[];
}

const RadarChart: React.FC<RadarChartProps> = ({ traits }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const animationProgress = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawRadar = () => {
      if (!canvas || !ctx) return;
      
      // Set canvas dimensions
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      
      // Chart configuration
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(centerX, centerY) * 0.8;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Calculate points
      const points = traits.map((trait, i) => {
        const angle = (Math.PI * 2 * i) / traits.length - Math.PI / 2;
        // Apply animation easing
        const progress = Math.min(1, animationProgress.current);
        const value = trait.value * progress;
        return {
          x: centerX + radius * value * Math.cos(angle),
          y: centerY + radius * value * Math.sin(angle),
          label: {
            x: centerX + (radius + 20) * Math.cos(angle),
            y: centerY + (radius + 20) * Math.sin(angle),
            text: trait.trait,
            align: angle > Math.PI / 2 && angle < Math.PI * 3 / 2 ? 'right' : 'left',
            baseline: angle < 0 || angle > Math.PI ? 'top' : 'bottom'
          }
        };
      });
      
      // Draw background circles and axes
      for (let i = 5; i > 0; i--) {
        const level = i / 5;
        
        // Draw circle
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius * level, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(99, 102, 241, ${level * 0.2})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        
        if (i % 2 === 0 || i === 5) {
          ctx.fillStyle = `rgba(255, 255, 255, ${level * 0.3})`;
          ctx.fillText(`${level * 100}%`, centerX + 5, centerY - (radius * level) + 15);
        }
      }
      
      // Draw axes
      traits.forEach((_, i) => {
        const angle = (Math.PI * 2 * i) / traits.length - Math.PI / 2;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(
          centerX + radius * Math.cos(angle),
          centerY + radius * Math.sin(angle)
        );
        ctx.strokeStyle = 'rgba(99, 102, 241, 0.3)';
        ctx.lineWidth = 1;
        ctx.stroke();
      });
      
      // Draw data shape
      ctx.beginPath();
      points.forEach((point, i) => {
        if (i === 0) {
          ctx.moveTo(point.x, point.y);
        } else {
          ctx.lineTo(point.x, point.y);
        }
      });
      ctx.closePath();
      
      // Create gradient fill
      const gradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, radius
      );
      gradient.addColorStop(0, 'rgba(139, 92, 246, 0.8)');
      gradient.addColorStop(1, 'rgba(67, 56, 202, 0.2)');
      
      ctx.fillStyle = gradient;
      ctx.fill();
      
      ctx.strokeStyle = 'rgba(139, 92, 246, 0.8)';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Draw points
      points.forEach(point => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(139, 92, 246, 1)';
        ctx.fill();
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 1;
        ctx.stroke();
      });
      
      // Draw labels
      ctx.font = '10px sans-serif';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      
      points.forEach(point => {
        ctx.textAlign = point.label.align as CanvasTextAlign;
        ctx.textBaseline = point.label.baseline as CanvasTextBaseline;
        ctx.fillText(point.label.text, point.label.x, point.label.y);
      });
      
      // Continue animation
      if (animationProgress.current < 1) {
        animationProgress.current += 0.04;
        animationRef.current = requestAnimationFrame(drawRadar);
      }
    };
    
    // Start animation
    animationProgress.current = 0;
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    animationRef.current = requestAnimationFrame(drawRadar);
    
    // Handle resize
    const handleResize = () => {
      drawRadar();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [traits]);

  return (
    <canvas ref={canvasRef} className="w-full h-[240px]" />
  );
};

export default RadarChart;