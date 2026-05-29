import React, { useEffect, useRef } from "react";

const ParticlesBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animFrameId: number;
    let width = 0;
    let height = 0;
    
    // Web Development specific symbols & SVGs
    const symbols = ['</>', '{}', '[]', '()', '=>', '||', '&&', '===', '!=', '??', '...', '01'];
    const colors = ['#a78bfa', '#e879f9', '#ffffff', '#818cf8', '#2dd4bf'];

    const iconUrls = [
      // JS
      'data:image/svg+xml;charset=utf-8,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"%3E%3Cpath fill="%23F7DF1E" d="M0 0h128v128H0z"/%3E%3Cpath d="M67.312 108.25c-5.062 5.062-15.375 7.688-29.25 7.688-12.188 0-21.75-2.062-28.5-6.188l6.375-13.688c5.438 3.562 14.25 5.812 21.375 5.812 5.625 0 8.812-1.312 8.812-4.312 0-3-2.438-4.125-9.375-6.375-11.812-3.562-19.688-7.5-19.688-18.75 0-11.25 8.25-18.562 21.75-18.562 10.875 0 18.75 2.625 24 5.812l-5.812 13.5c-4.5-2.625-11.25-4.875-17.438-4.875-5.062 0-7.875 1.5-7.875 4.125 0 3 2.625 3.938 10.312 6.375 12 3.75 18.75 8.625 18.75 18.562 0 4.875-1.125 8.625-3.375 10.875zm48.188-3.375c-4.688 4.312-12.75 6.938-23.062 6.938-12.938 0-22.312-3.375-27.562-7.5l6-13.875c5.062 3.375 13.125 6.375 21 6.375 6 0 9-1.5 9-4.312 0-2.812-2.438-4.312-9.75-6.562-12-3.75-19.688-7.875-19.688-18.75 0-10.875 8.25-18.562 21.938-18.562 10.688 0 18.562 2.625 23.812 5.625l-5.812 13.688c-4.312-2.625-11.062-4.688-17.062-4.688-5.062 0-7.875 1.688-7.875 4.312 0 2.812 2.625 4.125 10.125 6.562 12.188 3.938 18.938 8.812 18.938 18.75 0 5.25-1.5 9.375-4.312 11.812z"/%3E%3C/svg%3E',
      // TS
      'data:image/svg+xml;charset=utf-8,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"%3E%3Cpath fill="%233178C6" d="M0 0h128v128H0z"/%3E%3Cpath fill="%23FFF" d="M65.4 96.6c-4.9 3.5-13.6 6.1-23.5 6.1-12 0-21.2-2.8-27.4-7.4l6.1-10.9c4.9 3.5 12.5 6.1 19.9 6.1 5.8 0 9.2-1.5 9.2-4.7 0-3-2.6-4.5-9.6-6.6-11.4-3.5-19.5-7.4-19.5-18.4 0-10.9 8.5-18.2 21.9-18.2 9.6 0 16.9 2.6 22.3 5.9l-5.7 10.7c-4.6-2.6-10.9-4.9-16.6-4.9-5.4 0-8.1 1.9-8.1 4.5 0 2.8 2.6 4.3 10.1 6.6 11.8 3.7 19.3 8.3 19.3 18.2.1 4.8-2.6 9.4-8.4 12.9zM116.6 45.4h-17.8v55.9H83.5V45.4H65.8V32.9h50.8v12.5z"/%3E%3C/svg%3E',
      // React
      'data:image/svg+xml;charset=utf-8,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="-11.5 -10.232 23 20.463"%3E%3Ccircle r="2.05" fill="%2361dafb"/%3E%3Cg stroke="%2361dafb" fill="none"%3E%3Cellipse rx="11" ry="4.2"/%3E%3Cellipse rx="11" ry="4.2" transform="rotate(60)"/%3E%3Cellipse rx="11" ry="4.2" transform="rotate(120)"/%3E%3C/g%3E%3C/svg%3E',
      // Node.js
      'data:image/svg+xml;charset=utf-8,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"%3E%3Cpath fill="%23539E43" d="M64 4L11.5 34.3v60.7L64 125.3l52.5-30.3V34.3z"/%3E%3C/svg%3E',
      // MongoDB
      'data:image/svg+xml;charset=utf-8,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"%3E%3Cpath fill="%2347A248" d="M64 0S36 29 36 67c0 25 21 44 28 61 7-17 28-36 28-61C92 29 64 0 64 0z"/%3E%3C/svg%3E',
      // Python
      'data:image/svg+xml;charset=utf-8,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"%3E%3Cpath fill="%233776AB" d="M64 4C30 4 33.3 28.5 33.3 28.5V43H64v6H27S4 47 4 64s23 21 23 21h12V60s-.3-21 21-21h31s14-1.2 14-14-10-18-28-18c-18 0-13-4-13-4zm-14 13c3.3 0 6 2.7 6 6s-2.7 6-6 6-6-2.7-6-6 2.7-6 6-6z"/%3E%3Cpath fill="%23FFD43B" d="M64 124c34 0 30.7-24.5 30.7-24.5V85H64v-6h37s23-2 23-19-23-21-23-21H89v25s.3 21-21 21H37s-14 1.2-14 14 10 18 28 18c18 0 13 4 13 4zm14-13c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6z"/%3E%3C/svg%3E'
    ];

    const icons: HTMLImageElement[] = [];
    iconUrls.forEach(url => {
      const img = new Image();
      img.src = url;
      icons.push(img);
    });

    interface CodeParticle {
      type: 'text' | 'icon';
      x: number;
      y: number;
      size: number;
      vx: number;
      vy: number;
      alpha: number;
      symbol: string;
      color: string;
      iconIndex: number;
      rotation: number;
      vRot: number;
    }

    let particles: CodeParticle[] = [];

    const updateSize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      
      if (particles.length === 0) {
        initParticles();
      } else {
        // Reposition out of bound particles to fit the new viewport layout
        particles.forEach(p => {
          if (p.x > width + 40) p.x = Math.random() * width;
          if (p.y > height + 40) p.y = Math.random() * height;
        });
      }
    };

    const initParticles = () => {
      particles = [];
      const particleCount = Math.min(Math.floor((width * height) / 25000), 55);
      for (let i = 0; i < particleCount; i++) {
        const isIcon = Math.random() > 0.45; // ~55% chance for an icon
        particles.push({
          type: isIcon ? 'icon' : 'text',
          x: Math.random() * width,
          y: Math.random() * height,
          size: isIcon ? Math.random() * 20 + 20 : Math.random() * 12 + 10,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          alpha: isIcon ? Math.random() * 0.4 + 0.2 : Math.random() * 0.3 + 0.1,
          symbol: symbols[Math.floor(Math.random() * symbols.length)],
          color: colors[Math.floor(Math.random() * colors.length)],
          iconIndex: Math.floor(Math.random() * icons.length),
          rotation: Math.random() * Math.PI * 2,
          vRot: (Math.random() - 0.5) * 0.015
        });
      }
    };

    window.addEventListener("resize", updateSize);
    updateSize();

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Draw Connections
      ctx.lineWidth = 0.5;
      const maxDist = 160;
      const maxDistSq = maxDist * maxDist;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxDistSq) {
            const dist = Math.sqrt(distSq);
            ctx.globalAlpha = (1 - dist / maxDist) * 0.15;
            ctx.strokeStyle = particles[i].color;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.vRot;

        if (p.x < -40) p.x = width + 40;
        if (p.x > width + 40) p.x = -40;
        if (p.y < -40) p.y = height + 40;
        if (p.y > height + 40) p.y = -40;

        ctx.globalAlpha = p.alpha;
        
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        
        if (p.type === 'text') {
            ctx.fillStyle = p.color;
            ctx.font = `bold ${p.size}px "JetBrains Mono", monospace`;
            ctx.fillText(p.symbol, 0, 0);
        } else if (p.type === 'icon') {
            const img = icons[p.iconIndex];
            if (img.complete && img.naturalWidth > 0) {
                // Draw image perfectly centered
                ctx.drawImage(img, -p.size/2, -p.size/2, p.size, p.size);
            }
        }
        
        ctx.restore();
      }

      ctx.globalAlpha = 1;
      animFrameId = requestAnimationFrame(render);
    };

    animFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", updateSize);
      cancelAnimationFrame(animFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[-5]"
    />
  );
};

export default ParticlesBackground;
