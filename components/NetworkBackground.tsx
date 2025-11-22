import React, { useEffect, useRef } from 'react';

interface Node {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  type: 'GATEWAY' | 'SERVICE' | 'DB';
  label: string;
  radius: number;
}

interface Packet {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  progress: number;
  speed: number;
  color: string;
}

interface Log {
  x: number;
  y: number;
  text: string;
  life: number;
  color: string;
  vy: number;
}

const NetworkBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // Configuration
    const NODE_COUNT = window.innerWidth < 768 ? 6 : 12;
    const CONNECTION_DIST = Math.min(width, height) * 0.35;
    
    // State
    const nodes: Node[] = [];
    let packets: Packet[] = [];
    let logs: Log[] = [];

    // Vocabulary for logs
    const HTTP_METHODS = ['GET', 'POST', 'PATCH', 'DELETE'];
    const ENDPOINTS = ['/api/auth', '/api/user', '/graphql', '/payment', '/stream'];
    const DB_OPS = ['SELECT *', 'INSERT INTO', 'JOIN users', 'CACHE_MISS', 'INDEX_SCAN'];
    const STATUS_CODES = ['200 OK', '201 Created', '202 Accepted', '304 Not Mod'];

    // Initialize Nodes
    for (let i = 0; i < NODE_COUNT; i++) {
        const typeRand = Math.random();
        let type: 'GATEWAY' | 'SERVICE' | 'DB' = 'SERVICE';
        let label = `SVC-0${i}`;
        let radius = 30;

        if (typeRand > 0.75) {
            type = 'DB';
            label = `PG-SQL-0${i}`;
            radius = 35;
        } else if (typeRand < 0.15) {
            type = 'GATEWAY';
            label = 'NGINX-GW';
            radius = 40;
        }

        nodes.push({
            id: i,
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.2, // Slow drift
            vy: (Math.random() - 0.5) * 0.2,
            type,
            label,
            radius
        });
    }

    // Drawing Helpers
    const drawDatabase = (x: number, y: number, r: number, color: string) => {
        ctx.fillStyle = color;
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        
        // Cylinder body
        const h = r * 1.2;
        const w = r * 1.6;
        
        ctx.beginPath();
        ctx.ellipse(x, y - h/2, w/2, r/3, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.ellipse(x, y + h/2, w/2, r/3, 0, 0, Math.PI); // Bottom curve
        ctx.ellipse(x, y - h/2, w/2, r/3, 0, 0, Math.PI); // Top hidden curve
        ctx.lineTo(x + w/2, y + h/2);
        ctx.lineTo(x + w/2, y - h/2);
        ctx.moveTo(x - w/2, y + h/2);
        ctx.lineTo(x - w/2, y - h/2);
        
        ctx.fillStyle = `${color}22`; // Low opacity fill
        ctx.fill();
        ctx.stroke();
        
        // Disks
        ctx.beginPath();
        ctx.ellipse(x, y, w/2, r/3, 0, 0, Math.PI);
        ctx.stroke();
    };

    const drawHexagon = (x: number, y: number, r: number, color: string) => {
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i;
            const px = x + r * Math.cos(angle);
            const py = y + r * Math.sin(angle);
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.fillStyle = `${color}22`;
        ctx.fill();
        ctx.stroke();
        
        // Inner detail
        ctx.beginPath();
        ctx.arc(x, y, r/2, 0, Math.PI * 2);
        ctx.stroke();
    };

    const drawServerBox = (x: number, y: number, r: number, color: string) => {
        const s = r * 1.5;
        ctx.strokeStyle = color;
        ctx.fillStyle = `${color}22`;
        ctx.lineWidth = 2;
        
        // Main Box
        ctx.beginPath();
        ctx.rect(x - s/2, y - s/2, s, s);
        ctx.fill();
        ctx.stroke();
        
        // Server Rack Lines
        ctx.beginPath();
        ctx.moveTo(x - s/2 + 5, y - s/6);
        ctx.lineTo(x + s/2 - 5, y - s/6);
        ctx.moveTo(x - s/2 + 5, y + s/6);
        ctx.lineTo(x + s/2 - 5, y + s/6);
        ctx.stroke();
        
        // Status Lights
        ctx.fillStyle = '#10b981'; // Green light
        ctx.beginPath();
        ctx.arc(x + s/2 - 10, y - s/2 + 10, 2, 0, Math.PI * 2);
        ctx.fill();
    };

    // Animation Loop
    let lastTime = 0;
    const render = (time: number) => {
        const dt = time - lastTime;
        lastTime = time;

        // Clear with transparency to allow CSS background to show through
        ctx.clearRect(0, 0, width, height);

        // Move Nodes
        nodes.forEach(node => {
            node.x += node.vx;
            node.y += node.vy;
            
            // Bounce
            if (node.x < node.radius + 20 || node.x > width - node.radius - 20) node.vx *= -1;
            if (node.y < node.radius + 20 || node.y > height - node.radius - 20) node.vy *= -1;
        });

        // Draw Connections & Packets
        ctx.lineWidth = 1;
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const n1 = nodes[i];
                const n2 = nodes[j];
                const dx = n1.x - n2.x;
                const dy = n1.y - n2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < CONNECTION_DIST) {
                    const opacity = 1 - (dist / CONNECTION_DIST);
                    
                    // Draw Line
                    ctx.strokeStyle = `rgba(124, 58, 237, ${opacity * 0.4})`; // Violet
                    ctx.beginPath();
                    ctx.moveTo(n1.x, n1.y);
                    ctx.lineTo(n2.x, n2.y);
                    ctx.stroke();

                    // Randomly spawn packet
                    if (Math.random() < 0.008) {
                        let color = '#ffffff'; // Default HTTP
                        if (n2.type === 'DB' || n1.type === 'DB') color = '#06b6d4'; // Cyan SQL
                        else if (n1.type === 'GATEWAY' || n2.type === 'GATEWAY') color = '#facc15'; // Yellow Gateway
                        else if (Math.random() > 0.5) color = '#e879f9'; // Fuchsia Internal

                        packets.push({
                            fromX: n1.x, fromY: n1.y,
                            toX: n2.x, toY: n2.y,
                            progress: 0,
                            speed: 0.005 + Math.random() * 0.01,
                            color
                        });
                    }
                }
            }
        }

        // Draw & Update Packets
        for (let i = packets.length - 1; i >= 0; i--) {
            const p = packets[i];
            p.progress += p.speed;
            
            const currX = p.fromX + (p.toX - p.fromX) * p.progress;
            const currY = p.fromY + (p.toY - p.fromY) * p.progress;

            // Draw Packet (Square data block)
            ctx.fillStyle = p.color;
            ctx.shadowBlur = 8;
            ctx.shadowColor = p.color;
            ctx.fillRect(currX - 4, currY - 4, 8, 8);
            ctx.shadowBlur = 0;

            // Reach Destination
            if (p.progress >= 1) {
                packets.splice(i, 1);
                
                // Spawn Log
                let logText = 'ACK';
                let logColor = '#4ade80'; // Green
                
                if (p.color === '#06b6d4') { // DB Color
                    logText = DB_OPS[Math.floor(Math.random() * DB_OPS.length)];
                    logColor = '#22d3ee';
                } else if (p.color === '#facc15') { // Gateway
                    logText = `REQ: ${ENDPOINTS[Math.floor(Math.random() * ENDPOINTS.length)]}`;
                    logColor = '#facc15';
                } else {
                    if (Math.random() > 0.6) {
                        const method = HTTP_METHODS[Math.floor(Math.random() * HTTP_METHODS.length)];
                        logText = `${method}`;
                        logColor = '#e879f9';
                    } else {
                        logText = STATUS_CODES[Math.floor(Math.random() * STATUS_CODES.length)];
                    }
                }

                logs.push({
                    x: currX,
                    y: currY,
                    text: logText,
                    life: 1.0,
                    color: logColor,
                    vy: -0.5 - Math.random() * 0.5
                });
            }
        }

        // Draw Nodes
        nodes.forEach(node => {
            if (node.type === 'DB') {
                drawDatabase(node.x, node.y, node.radius, '#06b6d4'); // Cyan
            } else if (node.type === 'GATEWAY') {
                drawHexagon(node.x, node.y, node.radius, '#facc15'); // Yellow
            } else {
                drawServerBox(node.x, node.y, node.radius, '#c084fc'); // Purple
            }

            // Label
            ctx.fillStyle = 'rgba(255,255,255,0.7)';
            ctx.font = '11px "JetBrains Mono", monospace';
            ctx.textAlign = 'center';
            ctx.fillText(node.label, node.x, node.y + node.radius + 18);
        });

        // Draw & Update Logs
        ctx.font = 'bold 13px "JetBrains Mono", monospace';
        for (let i = logs.length - 1; i >= 0; i--) {
            const l = logs[i];
            l.life -= 0.01;
            l.y += l.vy;
            
            if (l.life <= 0) {
                logs.splice(i, 1);
                continue;
            }

            ctx.fillStyle = l.color;
            ctx.globalAlpha = l.life;
            ctx.fillText(`> ${l.text}`, l.x, l.y - 25);
            ctx.globalAlpha = 1;
        }

        requestAnimationFrame(render);
    };

    requestAnimationFrame(render);

    const handleResize = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas 
        ref={canvasRef} 
        className="absolute inset-0 pointer-events-none z-0 opacity-40"
        style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default NetworkBackground;