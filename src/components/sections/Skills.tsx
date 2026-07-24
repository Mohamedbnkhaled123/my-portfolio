import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { RevealCard } from '../RevealCard';
import { motion, AnimatePresence } from 'framer-motion';
import { SiReact, SiNextdotjs, SiTypescript, SiFirebase, SiJavascript, SiHtml5 } from 'react-icons/si';
import { FaCss3Alt, FaGitAlt } from 'react-icons/fa';

// --- Enriched Skill Data ---
interface SkillData {
  name: string;
  Icon: React.ElementType;
  color: string;
  glowColor: string;
  // Concrete hex for CSS gradient usage (no var() references)
  swirlColor: string;
}

const coreSkills: SkillData[] = [
  { name: 'React',       Icon: SiReact,      color: '#61DAFB', glowColor: '#61DAFB', swirlColor: '#61DAFB' },
  { name: 'Next.js',     Icon: SiNextdotjs,  color: 'var(--text-primary)', glowColor: '#94a3b8', swirlColor: '#94a3b8' },
  { name: 'TypeScript',  Icon: SiTypescript,  color: '#3178C6', glowColor: '#3178C6', swirlColor: '#3178C6' },
  { name: 'Git',         Icon: FaGitAlt,      color: '#F05032', glowColor: '#F05032', swirlColor: '#F05032' },
  { name: 'Firebase',    Icon: SiFirebase,    color: '#FFCA28', glowColor: '#FFCA28', swirlColor: '#FFCA28' },
  { name: 'JavaScript',  Icon: SiJavascript,  color: '#F7DF1E', glowColor: '#F7DF1E', swirlColor: '#F7DF1E' },
  { name: 'HTML5',       Icon: SiHtml5,       color: '#E34F26', glowColor: '#E34F26', swirlColor: '#E34F26' },
  { name: 'CSS3',        Icon: FaCss3Alt,     color: '#1572B6', glowColor: '#1572B6', swirlColor: '#1572B6' },
];

// --- Advanced WebGL Fragment Shader Continuous Fluid Simulation ---
const WebGLPlasma: React.FC<{ colorHex: string; isDark: boolean }> = ({ colorHex, isDark }) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl', { alpha: false, antialias: false });
    if (!gl) return;

    const c = colorHex.replace('#', '');
    const r = parseInt(c.substring(0, 2), 16) / 255 || 0;
    const g = parseInt(c.substring(2, 4), 16) / 255 || 0;
    const b = parseInt(c.substring(4, 6), 16) / 255 || 0;

    const vsSource = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fsSource = `
      precision highp float;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform vec3 u_color;
      uniform float u_isDark;

      // Pseudo-random and noise functions
      float random(in vec2 st) {
          return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
      }

      float noise(in vec2 st) {
          vec2 i = floor(st);
          vec2 f = fract(st);
          float a = random(i);
          float b = random(i + vec2(1.0, 0.0));
          float c = random(i + vec2(0.0, 1.0));
          float d = random(i + vec2(1.0, 1.0));
          vec2 u = f*f*(3.0-2.0*f);
          return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
      }

      // Fractal Brownian Motion for swirling
      float fbm(in vec2 st) {
          float v = 0.0;
          float a = 0.5;
          vec2 shift = vec2(100.0);
          mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
          for (int i = 0; i < 5; ++i) {
              v += a * noise(st);
              st = rot * st * 2.0 + shift;
              a *= 0.5;
          }
          return v;
      }

      void main() {
          vec2 st = gl_FragCoord.xy / u_resolution.xy;
          
          // Raw UV for box edge checking later (from -0.5 to 0.5)
          vec2 uv = st - 0.5;

          // Center coordinate system for rotation
          st -= 0.5;
          st.x *= u_resolution.x / u_resolution.y;

          // ⭐ 3D CUP DEPTH DEFORMATION ⭐
          // Parabolically stretch coordinates to simulate a concave liquid surface inside a cup
          float dist = length(st);
          st *= 1.0 + dist * 0.8; // Reduced multiplier to keep plasma flowing cleanly to edges

          // ⭐ CLOCKWISE VORTEX ROTATION ⭐
          float speed = 0.8;
          float angle = -u_time * speed;
          
          // Stirring vortex distortion: spins faster near the center
          angle -= exp(-dist * 3.0) * u_time * 1.5;

          mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
          st = rot * st;

          // Zoom scale
          st *= 1.6; // Slightly zoomed in to fill out the edges more

          // Domain warping (feeding noise into noise) to create liquid motion
          vec2 q = vec2(0.);
          q.x = fbm( st + 0.05 * u_time);
          q.y = fbm( st + vec2(1.0));

          vec2 r = vec2(0.);
          r.x = fbm( st + 1.0*q + vec2(1.7,9.2)+ 0.15*u_time );
          r.y = fbm( st + 1.0*q + vec2(8.3,2.8)+ 0.126*u_time);

          float f = fbm(st+r);

          // ⭐ THEME AWARE COLOR DOMINANCE & SATURATION ⭐
          vec3 darkBg = u_color * 0.1;
          vec3 lightBg = mix(vec3(1.0), u_color, 0.15); // soft light background
          vec3 bg = mix(lightBg, darkBg, u_isDark);

          vec3 darkBaseCol = u_color * 0.6;
          vec3 lightBaseCol = mix(vec3(1.0), u_color, 0.4); 
          vec3 baseCol = mix(lightBaseCol, darkBaseCol, u_isDark);

          vec3 midCol = u_color; // Pure brand color (highly dominant)
          
          vec3 highlightCol = mix(u_color * 1.5, u_color * 2.0, u_isDark);
          vec3 whiteCol = mix(u_color * 1.2 + vec3(0.5), mix(u_color * 3.0, vec3(1.0), 0.5), u_isDark);

          float intensity = smoothstep(0.0, 1.0, f);
          intensity = pow(intensity, mix(0.9, 1.1, u_isDark)); // Less crunchy contrast in light mode

          // Push the distribution so midCol and baseCol dominate the volume
          vec3 col = mix(bg, baseCol, smoothstep(0.0, 0.2, intensity));
          col = mix(col, midCol, smoothstep(0.15, 0.5, intensity));
          col = mix(col, highlightCol, smoothstep(0.45, 0.75, intensity));
          col = mix(col, whiteCol, smoothstep(0.7, 1.0, intensity));

          // Boost the most intense swirls to add a magical flare
          float flare = smoothstep(0.4, 1.0, length(r.x));
          col += u_color * flare * mix(0.3, 0.5, u_isDark);

          // ⭐ 3D RIM SHADOW (The Cup Illusion) ⭐
          float boxDist = max(abs(uv.x), abs(uv.y));
          float rimShadow = smoothstep(0.35, 0.55, boxDist);
          
          vec3 rimShadowCol = mix(bg * 0.85, bg * 0.3, u_isDark);
          col = mix(col, rimShadowCol, rimShadow * 0.7);

          gl_FragColor = vec4(col, 1.0);
      }
    `;

    const compileShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    };

    const vs = compileShader(gl.VERTEX_SHADER, vsSource);
    const fs = compileShader(gl.FRAGMENT_SHADER, fsSource);
    const program = gl.createProgram();
    if (!program || !vs || !fs) return;

    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);

    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const posLocation = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(posLocation);
    gl.vertexAttribPointer(posLocation, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, 'u_resolution');
    const uTime = gl.getUniformLocation(program, 'u_time');
    const uColor = gl.getUniformLocation(program, 'u_color');
    const uIsDark = gl.getUniformLocation(program, 'u_isDark');

    gl.uniform3f(uColor, r, g, b);
    gl.uniform1f(uIsDark, isDark ? 1.0 : 0.0);

    let animationFrameId: number;
    let startTime = performance.now();

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        const dpr = window.devicePixelRatio || 1;
        canvas.width = parent.clientWidth * dpr;
        canvas.height = parent.clientHeight * dpr;
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.uniform2f(uRes, canvas.width, canvas.height);
      }
    };

    window.addEventListener('resize', resize);
    // Observe parent element for explicit layout shifts
    const observer = new ResizeObserver(resize);
    if(canvas.parentElement) observer.observe(canvas.parentElement);
    resize(); 

    const render = (time: number) => {
      gl.uniform1f(uTime, (time - startTime) / 1000);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationFrameId = requestAnimationFrame(render);
    };
    render(performance.now());

    return () => {
      window.removeEventListener('resize', resize);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
      gl.deleteProgram(program);
    };
  }, [colorHex]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full rounded-[inherit] pointer-events-none" />;
};

// --- Skill Card ---
const SkillCard = ({ skill, isActive, onClick, isDark }: { skill: SkillData; isActive: boolean; onClick: () => void; isDark: boolean }) => {
  const c = skill.swirlColor;

  const [isHovered, setIsHovered] = React.useState(false);
  const [isFlashing, setIsFlashing] = React.useState(false);

  // When active (Clicked): Strong vibrant pulse glow
  // When hovered: Soft simple glow
  const iconShadow = isFlashing || isActive
    ? `drop-shadow(0 0 25px ${c}) drop-shadow(0 0 45px ${c}aa)` // Strong click glow
    : isHovered
    ? `drop-shadow(0 0 12px ${c}55) drop-shadow(0 0 20px ${c}33)` // Soft hover glow
    : `drop-shadow(0 0 8px ${c}22)`; // Idle faint shadow

  const handleCardClick = () => {
    if (!isActive) {
      setIsFlashing(true);
      setTimeout(() => setIsFlashing(false), 800); // 800ms flash duration
    }
    onClick();
  };

  return (
    <div 
      onClick={handleCardClick} 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="h-full relative block select-none"
    >
      <RevealCard
        isManualActive={true}
        manualState={false}
        className="h-full text-center group cursor-pointer relative z-10 w-full overflow-hidden"
        style={{
          '--spotlight-core': `${c}55`,
          '--spotlight-fade': `${c}15`,
          // Keeps the shimmering animation effect via a linear gradient, but exclusively uses the brand color
          '--card-glow-border': `linear-gradient(90deg, ${c}44, ${c}, ${c}22, ${c}, ${c}44)`,
          // Replaces the Cyan/Magenta inner glow with the brand color
          '--card-pulse-shadow': `inset 0 0 25px ${c}44, inset 0 0 50px ${c}33, 0 0 15px ${c}44`,
        } as React.CSSProperties}
      >
        {/* ═══ LIQUID SWIRL — fills entire card when active ═══ */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl"
              style={{ zIndex: 5 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <WebGLPlasma colorHex={c} isDark={isDark} />

              {/* Internal Vignette shadow overlay to give frame depth */}
              <div className="absolute inset-0 pointer-events-none rounded-xl" style={{ boxShadow: `inset 0 0 50px rgba(0,0,0,${isDark ? '0.8' : '0.2'}), inset 0 0 20px rgba(0,0,0,${isDark ? '0.6' : '0.1'})` }} />
              
              {/* Glowing High-Tech Border (Containment Field) 
                  Using ONLY boxShadow ensures it mathematically perfectly wraps the rounded corners 
                  without any border-box or 1px inset SVG clipping bugs. */}
              <motion.div
                className="absolute inset-0 rounded-xl pointer-events-none z-[20]"
                style={{ 
                  boxShadow: `inset 0 0 0 1px ${c}, 0 0 25px ${c}88, inset 0 0 15px ${c}66` 
                }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ═══ CARD CONTENT — uniformly fluid via cqw ═══ */}
        <div
          className="w-full h-full flex flex-col items-center justify-center text-center aspect-square"
          style={{ 
            position: 'relative', 
            zIndex: 15, 
            isolation: 'isolate',
            padding: '13.33cqw 8.88cqw',
            gap: '6.66cqw'
          }}
        >
          {/* Icon — completely fluid relative to card size */}
          <motion.div
            whileHover={{ scale: 1.15 }}
            animate={isFlashing ? { scale: 1.3 } : isActive ? { scale: 1.15 } : { scale: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            style={{ filter: iconShadow }}
            className="group-hover/skill:drop-shadow-[0_0_8px_var(--accent-cyan)] transition-all duration-300 flex items-center justify-center"
          >
            <skill.Icon
              style={{ 
                width: '22.22cqw', 
                height: '22.22cqw',
                color: skill.color !== 'var(--text-primary)' ? skill.color : undefined 
              }}
            />
          </motion.div>

          {/* Skill Name — font size fluidly bound to card width */}
          <h3
            className="font-medium text-primary tracking-wide mx-auto w-full text-center block leading-tight transition-all duration-300"
            style={{
              fontSize: '7.77cqw',
              textShadow: isActive && isDark
                ? '0px 10px 15px rgba(0,0,0,0.9), 0px 4px 6px rgba(0,0,0,0.8)'
                : 'none',
              transition: 'text-shadow 0.3s ease',
            }}
          >
            {skill.name}
          </h3>
        </div>
      </RevealCard>
    </div>
  );
};

// --- Main Skills Section ---
export const Skills: React.FC = () => {
  const { t, theme } = useAppStore();
  const [activeSkillIdx, setActiveSkillIdx] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (activeSkillIdx !== null) {
      const timer = setTimeout(() => {
        setActiveSkillIdx(null);
      }, 2000); // 2s full intensity, then 500ms AnimatePresence exit fade
      return () => clearTimeout(timer);
    }
  }, [activeSkillIdx]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 15 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: 'spring' as const, stiffness: 350, damping: 25 },
    },
  };

  return (
    <section id="skills" className="py-20 bg-card/10 relative overflow-hidden section-fade-edge scroll-mt-24">
      {/* Expanding max-width so proportional scaling can continue beyond strict 1024px caps. 
          Reduced by a total of 35% across the board starting at 1025px per request. */}
      <div className="w-[95vw] lg:w-[90vw] min-[1025px]:w-[60vw] max-w-[1440px] min-[1025px]:max-w-[950px] mx-auto px-4 md:px-8 transition-all duration-300">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-premium-gradient mb-4 relative inline-block no-underline tracking-normal leading-relaxed">
            {t('skills.title')}
          </h2>
        </div>

        <motion.div
          className="flex flex-wrap justify-center gap-3 min-[426px]:gap-4 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {coreSkills.map((skill, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="w-[calc(50%-0.375rem)] min-[321px]:w-[calc(33.333%-0.5rem)] min-[426px]:w-[calc(25%-0.75rem)] md:w-[calc(25%-1.125rem)] aspect-square transition-all duration-300"
              style={{ containerType: 'inline-size' }}
            >
              <SkillCard
                skill={skill}
                isDark={theme === 'dark'}
                isActive={activeSkillIdx === idx}
                onClick={() => setActiveSkillIdx(activeSkillIdx === idx ? null : idx)}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
