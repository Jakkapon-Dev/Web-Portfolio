import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { Sparkles, RotateCcw, Compass, Move, Flame, ArrowDown } from 'lucide-react';

export default function PhysicsSkillBox() {
  const { lang, t } = useLanguage();
  const { theme } = useTheme();
  const containerRef = useRef(null);
  const engineRef = useRef(null);
  const renderRef = useRef(null);
  const runnerRef = useRef(null);
  const bodiesRef = useRef([]);

  const [zeroGravity, setZeroGravity] = useState(false);

  const skillsData = [
    { name: '⚡ Next.js 14', bg: '#020617', text: '#F8FAFC', border: '#F59E0B', w: 120, h: 38 },
    { name: '⚛️ React 18', bg: '#082F49', text: '#38BDF8', border: '#38BDF8', w: 110, h: 38 },
    { name: '📘 TypeScript', bg: '#172554', text: '#93C5FD', border: '#60A5FA', w: 125, h: 38 },
    { name: '🟢 Node.js', bg: '#052E16', text: '#86EFAC', border: '#4ADE80', w: 105, h: 38 },
    { name: '🚂 Express.js', bg: '#1E293B', text: '#E2E8F0', border: '#94A3B8', w: 120, h: 38 },
    { name: '💎 Prisma ORM', bg: '#3B0764', text: '#E9D5FF', border: '#C084FC', w: 130, h: 38 },
    { name: '🐘 PostgreSQL', bg: '#1E3A8A', text: '#BFDBFE', border: '#93C5FD', w: 125, h: 38 },
    { name: '🎨 Tailwind CSS', bg: '#082F49', text: '#7DD3FC', border: '#38BDF8', w: 130, h: 38 },
    { name: '🔌 Socket.io', bg: '#18181B', text: '#F472B6', border: '#A855F7', w: 110, h: 38 },
    { name: '🐳 Docker', bg: '#0C4A6E', text: '#7DD3FC', border: '#38BDF8', w: 100, h: 38 },
    { name: '🛡️ Zod Schema', bg: '#1E1B4B', text: '#C7D2FE', border: '#818CF8', w: 130, h: 38 },
    { name: '⚡ Redis Cache', bg: '#450A0A', text: '#FECACA', border: '#F87171', w: 125, h: 38 },
    { name: '🤖 n8n Pipelines', bg: '#431407', text: '#FED7AA', border: '#FB923C', w: 140, h: 38 },
    { name: '🌿 Git Flow', bg: '#431407', text: '#FDBA74', border: '#F97316', w: 105, h: 38 },
    { name: '🚀 Full-Stack Dev', bg: '#78350F', text: '#FEF08A', border: '#FDE047', w: 145, h: 40 },
    { name: '📱 LINE Bot API', bg: '#064E3B', text: '#A7F3D0', border: '#34D399', w: 130, h: 38 },
    { name: '🧪 Jest Testing', bg: '#500724', text: '#FBCFE8', border: '#F472B6', w: 130, h: 38 },
    { name: '🔐 JWT & RBAC', bg: '#431407', text: '#FED7AA', border: '#FB923C', w: 125, h: 38 }
  ];

  // Robust cross-browser rounded rectangle drawer
  const drawPill = (ctx, x, y, width, height, radius, fill, stroke) => {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x - width / 2 + radius, y - height / 2);
    ctx.lineTo(x + width / 2 - radius, y - height / 2);
    ctx.quadraticCurveTo(x + width / 2, y - height / 2, x + width / 2, y - height / 2 + radius);
    ctx.lineTo(x + width / 2, y + height / 2 - radius);
    ctx.quadraticCurveTo(x + width / 2, y + height / 2, x + width / 2 - radius, y + height / 2);
    ctx.lineTo(x - width / 2 + radius, y + height / 2);
    ctx.quadraticCurveTo(x - width / 2, y + height / 2, x - width / 2, y + height / 2 - radius);
    ctx.lineTo(x - width / 2, y - height / 2 + radius);
    ctx.quadraticCurveTo(x - width / 2, y - height / 2, x - width / 2 + radius, y - height / 2);
    ctx.closePath();
    ctx.fillStyle = fill;
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = stroke;
    ctx.stroke();
    ctx.restore();
  };

  const setupWorld = () => {
    if (!containerRef.current) return;

    // Clean previous engine
    if (runnerRef.current) Matter.Runner.stop(runnerRef.current);
    if (renderRef.current) {
      Matter.Render.stop(renderRef.current);
      if (renderRef.current.canvas) renderRef.current.canvas.remove();
    }
    if (engineRef.current) {
      Matter.World.clear(engineRef.current.world);
      Matter.Engine.clear(engineRef.current);
    }

    const container = containerRef.current;
    const width = container.clientWidth || 900;
    const height = 400;

    const Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      Bodies = Matter.Bodies,
      Composite = Matter.Composite,
      Mouse = Matter.Mouse,
      MouseConstraint = Matter.MouseConstraint;

    const engine = Engine.create({
      gravity: { x: 0, y: zeroGravity ? 0 : 0.85, scale: 0.001 }
    });
    engineRef.current = engine;

    const isDark = theme === 'dark' || document.documentElement.classList.contains('dark');
    const bgColor = isDark ? '#020617' : '#0F172A'; // Sleek dark canvas background

    const render = Render.create({
      element: container,
      engine: engine,
      options: {
        width: width,
        height: height,
        wireframes: false,
        background: bgColor,
        pixelRatio: window.devicePixelRatio || 1
      }
    });
    renderRef.current = render;

    // Boundaries
    const wallThick = 100;
    const ground = Bodies.rectangle(width / 2, height + wallThick / 2 - 2, width * 3, wallThick, {
      isStatic: true,
      render: { visible: false }
    });
    const leftWall = Bodies.rectangle(-wallThick / 2, height / 2, wallThick, height * 3, {
      isStatic: true,
      render: { visible: false }
    });
    const rightWall = Bodies.rectangle(width + wallThick / 2, height / 2, wallThick, height * 3, {
      isStatic: true,
      render: { visible: false }
    });
    const topCap = Bodies.rectangle(width / 2, -350, width * 3, wallThick, {
      isStatic: true,
      render: { visible: false }
    });

    Composite.add(engine.world, [ground, leftWall, rightWall, topCap]);

    // Create pills inside viewport
    const cols = Math.max(3, Math.min(6, Math.floor(width / 150)));
    const colSpacing = (width - 160) / cols;

    const createdBodies = skillsData.map((item, idx) => {
      const c = idx % cols;
      const r = Math.floor(idx / cols);
      const startX = 80 + c * colSpacing + (Math.random() - 0.5) * 20;
      const startY = 35 + r * 48;

      const body = Bodies.rectangle(startX, startY, item.w, item.h, {
        chamfer: { radius: 18 },
        restitution: 0.68,
        friction: 0.15,
        frictionAir: 0.01,
        density: 0.002,
        render: {
          fillStyle: item.bg,
          strokeStyle: item.border,
          lineWidth: 2
        }
      });

      body.skillMeta = item;
      return body;
    });

    bodiesRef.current = createdBodies;
    Composite.add(engine.world, createdBodies);

    // Render loop for custom rounded pill cards & crisp typography
    Matter.Events.on(render, 'afterRender', () => {
      const ctx = render.context;
      if (!ctx) return;

      createdBodies.forEach((body) => {
        const { x, y } = body.position;
        const angle = body.angle;
        const meta = body.skillMeta;
        if (!meta) return;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);

        // Draw rounded pill
        drawPill(ctx, 0, 0, meta.w, meta.h, 18, meta.bg, meta.border);

        // Draw text
        ctx.font = 'bold 11px ui-monospace, SFMono-Regular, Menlo, monospace';
        ctx.fillStyle = meta.text;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(meta.name, 0, 1);

        ctx.restore();
      });
    });

    // Mouse drag
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.25,
        render: { visible: false }
      }
    });

    Composite.add(engine.world, mouseConstraint);
    render.mouse = mouse;

    Render.run(render);
    const runner = Runner.create();
    runnerRef.current = runner;
    Runner.run(runner, engine);
  };

  useEffect(() => {
    // Delay slightly to ensure layout is complete
    const timer = setTimeout(() => {
      setupWorld();
    }, 50);

    const handleResize = () => {
      setupWorld();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
      if (runnerRef.current) Matter.Runner.stop(runnerRef.current);
      if (renderRef.current) Matter.Render.stop(renderRef.current);
      if (engineRef.current) Matter.World.clear(engineRef.current.world);
    };
  }, [theme, zeroGravity]);

  // Explode / Scatter Force
  const handleScatter = () => {
    bodiesRef.current.forEach((body) => {
      const forceX = (Math.random() - 0.5) * 0.18;
      const forceY = -Math.random() * 0.22 - 0.1;
      Matter.Body.applyForce(body, body.position, { x: forceX, y: forceY });
    });
  };

  // Toggle Zero Gravity / Float Mode
  const toggleZeroGravity = () => {
    setZeroGravity(prev => !prev);
  };

  return (
    <div className="w-full my-12 rounded-3xl p-6 sm:p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-5 text-left">
      
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
        
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
              <Sparkles className="w-4 h-4" />
            </span>
            <h3 className="font-extrabold text-lg sm:text-xl text-slate-900 dark:text-white tracking-tight">
              {t('Interactive 2D Physics Gravity Sandbox', 'กล่องทักษะแรงโน้มถ่วงฟิสิกส์ 2D (Interactive Playground)')}
            </h3>
          </div>
          <p className="text-xs font-mono-code text-slate-500 dark:text-slate-400 mt-1">
            {t('Click, drag, grab, and toss skill pills with 60fps real physics engine.', 'ใช้เมาส์คลิกจับ โยน ปา หรือปล่อยทักษะให้เด้งชนกันด้วย Real-time 2D Physics')}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          
          {/* Scatter / Explode Button */}
          <button
            onClick={handleScatter}
            className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono-code font-bold text-xs transition-all shadow-sm flex items-center gap-1.5"
            title="Scatter pills with explosion force"
          >
            <Flame className="w-3.5 h-3.5" />
            <span>{t('Explode / Fling', 'ระเบิดแรงเหวี่ยง 💥')}</span>
          </button>

          {/* Zero Gravity Button */}
          <button
            onClick={toggleZeroGravity}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono-code font-bold border transition-all flex items-center gap-1.5 ${
              zeroGravity
                ? 'bg-sky-500 text-white border-sky-400 shadow-md shadow-sky-500/20'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:text-amber-500'
            }`}
            title="Toggle Zero Gravity Float"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>{zeroGravity ? t('Zero Gravity (Floating)', 'ไร้น้ำหนัก (ลอยอิสระ) 🌌') : t('Normal Gravity', 'แรงโน้มถ่วงปกติ 🌍')}</span>
          </button>

          {/* Reset / Drop Again */}
          <button
            onClick={setupWorld}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            title="Drop Skills Again"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

        </div>

      </div>

      {/* 2D Physics Canvas Container */}
      <div 
        className="relative w-full h-[400px] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-inner bg-slate-950 cursor-grab active:cursor-grabbing"
      >
        <div ref={containerRef} className="w-full h-full" />

        {/* Floating Hint Overlay */}
        <div className="absolute top-3 left-3 pointer-events-none px-3 py-1 rounded-full bg-slate-900/85 backdrop-blur-md text-[11px] font-mono-code text-slate-300 border border-slate-700 flex items-center gap-1.5 shadow-md">
          <Move className="w-3 h-3 text-amber-400 animate-bounce" />
          <span>{t('Grab & Toss any skill pill with mouse', 'คลิกจับและโยนป้ายทักษะเล่นได้เลย')}</span>
        </div>
      </div>

    </div>
  );
}
