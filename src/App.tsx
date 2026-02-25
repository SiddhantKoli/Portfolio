import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import '@fontsource/press-start-2p';
import { PlanetsShowcase } from './components/PlanetsShowcase';

const App: React.FC = () => {
  const [stars, setStars] = useState<{ id: number, x: number, y: number, size: number, duration: string }[]>([]);
  const [speedLines, setSpeedLines] = useState<{ id: number, spd: string, del: string, top: string, w: string }[]>([]);

  const heroRef = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const rocketY = useTransform(scrollYProgress, [0, 1], [0, -1200]);
  const rocketScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.5]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  useEffect(() => {
    const newStars = Array.from({ length: 300 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1.5 + 0.5,
      duration: `${Math.random() * 4 + 2}s`
    }));
    setStars(newStars);

    const newLines = Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      spd: `${(1.5 + Math.random() * 2).toFixed(2)}s`,
      del: `-${(Math.random() * 3).toFixed(2)}s`,
      top: `${Math.random() * 100}%`,
      w: `${80 + Math.floor(Math.random() * 180)}px`
    }));
    setSpeedLines(newLines);
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-[#0b0d17] text-white overflow-x-hidden">
      {/* Background Star Field */}
      <div className="fixed inset-0 pointer-events-none">
        {stars.map((star) => (
          <div
            key={star.id}
            className="star"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              '--duration': star.duration
            } as any}
          />
        ))}
      </div>

      {/* Speed lines */}
      <div className="speedlines z-0">
        {speedLines.map(line => (
          <div
            key={line.id}
            className="line"
            style={{
              '--spd': line.spd,
              '--del': line.del,
              '--top': line.top,
              '--w': line.w
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center bg-transparent">
        <div className="flex items-center gap-2">
          <span className="text-[#fdd835]">★</span>
          <span className="text-[10px] md:text-xs text-[#fdd835]">Siddhant's World</span>
        </div>
        <div className="flex gap-4 md:gap-8">
          {[
            { name: 'HOME', href: '#' },
            { name: 'PROJECTS', href: '#projects' },
            { name: 'SKILLS', href: '#skills' },
            { name: 'CONTACT', href: '#contact' }
          ].map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="cursor-pointer group no-underline"
            >
              <span className={`text-[8px] md:text-[10px] transition-colors ${item.name === 'HOME' ? 'text-[#fdd835]' : 'text-white/60 hover:text-white'}`}>
                {item.name}
              </span>
            </a>
          ))}
        </div>
      </nav>

      <main className="relative pt-20 pb-20 px-4 flex flex-col items-center">
        {/* Rocket Hero section acting as a fixed scroll timeline */}
        <section ref={heroRef} className="relative w-full h-[120vh]">
          <div className="sticky top-0 w-full h-screen flex flex-col items-center justify-center overflow-hidden">
            {/* Rocket Hero with Parallax Takeoff */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 z-0 opacity-80 pointer-events-none top-[35%]"
              style={{ y: rocketY, scale: rocketScale }}
            >
              <div className="scene">
                <div className="glow-trail"></div>
                <div className="pixel-art">
                  <div className="p tr"></div><div className="p tr"></div><div className="p tr"></div><div className="p tr"></div><div className="p tr"></div><div className="p tr"></div><div className="p tr"></div><div className="p cy"></div><div className="p cy"></div><div className="p tr"></div><div className="p tr"></div><div className="p tr"></div><div className="p tr"></div><div className="p tr"></div><div className="p tr"></div><div className="p tr"></div>
                  <div className="p tr"></div><div className="p tr"></div><div className="p tr"></div><div className="p tr"></div><div className="p tr"></div><div className="p tr"></div><div className="p cy"></div><div className="p lb"></div><div className="p lb"></div><div className="p cy"></div><div className="p tr"></div><div className="p tr"></div><div className="p tr"></div><div className="p tr"></div><div className="p tr"></div><div className="p tr"></div>
                  <div className="p tr"></div><div className="p tr"></div><div className="p tr"></div><div className="p tr"></div><div className="p tr"></div><div className="p cy"></div><div className="p lb"></div><div className="p w"></div><div className="p w"></div><div className="p lb"></div><div className="p cy"></div><div className="p tr"></div><div className="p tr"></div><div className="p tr"></div><div className="p tr"></div><div className="p tr"></div>
                  <div className="p tr"></div><div className="p tr"></div><div className="p tr"></div><div className="p tr"></div><div className="p cy"></div><div className="p lb"></div><div className="p w"></div><div className="p bk"></div><div className="p bk"></div><div className="p w"></div><div className="p lb"></div><div className="p cy"></div><div className="p tr"></div><div className="p tr"></div><div className="p tr"></div><div className="p tr"></div>
                  <div className="p tr"></div><div className="p tr"></div><div className="p tr"></div><div className="p cy"></div><div className="p lb"></div><div className="p w"></div><div className="p bk"></div><div className="p cy"></div><div className="p cy"></div><div className="p bk"></div><div className="p w"></div><div className="p lb"></div><div className="p cy"></div><div className="p tr"></div><div className="p tr"></div><div className="p tr"></div>
                  <div className="p tr"></div><div className="p tr"></div><div className="p cy"></div><div className="p lb"></div><div className="p w"></div><div className="p w"></div><div className="p w"></div><div className="p w"></div><div className="p w"></div><div className="p w"></div><div className="p w"></div><div className="p w"></div><div className="p lb"></div><div className="p cy"></div><div className="p tr"></div><div className="p tr"></div>
                  <div className="p tr"></div><div className="p cy"></div><div className="p lb"></div><div className="p w"></div><div className="p lg"></div><div className="p lg"></div><div className="p lg"></div><div className="p lg"></div><div className="p lg"></div><div className="p lg"></div><div className="p lg"></div><div className="p lg"></div><div className="p w"></div><div className="p lb"></div><div className="p cy"></div><div className="p tr"></div>
                  <div className="p cy"></div><div className="p lb"></div><div className="p w"></div><div className="p lg"></div><div className="p g"></div><div className="p g"></div><div className="p bl"></div><div className="p bl"></div><div className="p bl"></div><div className="p bl"></div><div className="p g"></div><div className="p g"></div><div className="p lg"></div><div className="p w"></div><div className="p lb"></div><div className="p cy"></div>
                  <div className="p cy"></div><div className="p w"></div><div className="p lg"></div><div className="p g"></div><div className="p g"></div><div className="p bl"></div><div className="p lb"></div><div className="p cy"></div><div className="p cy"></div><div className="p lb"></div><div className="p bl"></div><div className="p g"></div><div className="p g"></div><div className="p lg"></div><div className="p w"></div><div className="p cy"></div>
                  <div className="p cy"></div><div className="p w"></div><div className="p w"></div><div className="p lg"></div><div className="p bl"></div><div className="p lb"></div><div className="p cy"></div><div className="p w"></div><div className="p w"></div><div className="p cy"></div><div className="p lb"></div><div className="p bl"></div><div className="p lg"></div><div className="p w"></div><div className="p w"></div><div className="p cy"></div>
                  <div className="p tr"></div><div className="p cy"></div><div className="p w"></div><div className="p w"></div><div className="p lg"></div><div className="p g"></div><div className="p w"></div><div className="p w"></div><div className="p w"></div><div className="p w"></div><div className="p g"></div><div className="p lg"></div><div className="p w"></div><div className="p w"></div><div className="p cy"></div><div className="p tr"></div>
                  <div className="p tr"></div><div className="p tr"></div><div className="p cy"></div><div className="p w"></div><div className="p w"></div><div className="p w"></div><div className="p re"></div><div className="p re"></div><div className="p re"></div><div className="p re"></div><div className="p w"></div><div className="p w"></div><div className="p w"></div><div className="p cy"></div><div className="p tr"></div><div className="p tr"></div>
                  <div className="p tr"></div><div className="p tr"></div><div className="p tr"></div><div className="p cy"></div><div className="p w"></div><div className="p re"></div><div className="p ye"></div><div className="p ye"></div><div className="p ye"></div><div className="p ye"></div><div className="p re"></div><div className="p w"></div><div className="p cy"></div><div className="p tr"></div><div className="p tr"></div><div className="p tr"></div>
                  <div className="p tr"></div><div className="p tr"></div><div className="p tr"></div><div className="p tr"></div><div className="p cy"></div><div className="p w"></div><div className="p lg"></div><div className="p lg"></div><div className="p lg"></div><div className="p lg"></div><div className="p w"></div><div className="p cy"></div><div className="p tr"></div><div className="p tr"></div><div className="p tr"></div><div className="p tr"></div>
                  <div className="p cy"></div><div className="p lb"></div><div className="p w"></div><div className="p tr"></div><div className="p tr"></div><div className="p w"></div><div className="p g"></div><div className="p dg"></div><div className="p dg"></div><div className="p g"></div><div className="p w"></div><div className="p tr"></div><div className="p tr"></div><div className="p w"></div><div className="p lb"></div><div className="p cy"></div>
                  <div className="p lb"></div><div className="p w"></div><div className="p lg"></div><div className="p cy"></div><div className="p tr"></div><div className="p lg"></div><div className="p dg"></div><div className="p pk"></div><div className="p pk"></div><div className="p dg"></div><div className="p lg"></div><div className="p tr"></div><div className="p cy"></div><div className="p lg"></div><div className="p w"></div><div className="p lb"></div>
                  <div className="p w"></div><div className="p lg"></div><div className="p g"></div><div className="p lb"></div><div className="p cy"></div><div className="p g"></div><div className="p pk"></div><div className="p or"></div><div className="p or"></div><div className="p pk"></div><div className="p g"></div><div className="p cy"></div><div className="p lb"></div><div className="p g"></div><div className="p lg"></div><div className="p w"></div>
                  <div className="p lg"></div><div className="p g"></div><div className="p g"></div><div className="p w"></div><div className="p lb"></div><div className="p dg"></div><div className="p or"></div><div className="p ye"></div><div className="p ye"></div><div className="p or"></div><div className="p dg"></div><div className="p lb"></div><div className="p w"></div><div className="p g"></div><div className="p g"></div><div className="p lg"></div>
                  <div className="p g"></div><div className="p dg"></div><div className="p tr"></div><div className="p lg"></div><div className="p g"></div><div className="p or"></div><div className="p fl2"></div><div className="p fl1"></div><div className="p fl1"></div><div className="p fl2"></div><div className="p or"></div><div className="p g"></div><div className="p lg"></div><div className="p tr"></div><div className="p dg"></div><div className="p g"></div>
                  <div className="p tr"></div><div className="p tr"></div><div className="p tr"></div><div className="p g"></div><div className="p fl3"></div><div className="p fl2"></div><div className="p fl1"></div><div className="p fl2"></div><div className="p fl2"></div><div className="p fl1"></div><div className="p fl2"></div><div className="p fl3"></div><div className="p g"></div><div className="p tr"></div><div className="p tr"></div><div className="p tr"></div>
                  <div className="p tr"></div><div className="p tr"></div><div className="p tr"></div><div className="p fl3"></div><div className="p fl2"></div><div className="p fl3"></div><div className="p fl2"></div><div className="p fl3"></div><div className="p fl3"></div><div className="p fl2"></div><div className="p fl3"></div><div className="p fl2"></div><div className="p fl3"></div><div className="p tr"></div><div className="p tr"></div><div className="p tr"></div>
                  <div className="p tr"></div><div className="p tr"></div><div className="p tr"></div><div className="p tr"></div><div className="p fl3"></div><div className="p fl4"></div><div className="p fl3"></div><div className="p fl4"></div><div className="p fl4"></div><div className="p fl3"></div><div className="p fl4"></div><div className="p fl3"></div><div className="p tr"></div><div className="p tr"></div><div className="p tr"></div><div className="p tr"></div>
                  <div className="p tr"></div><div className="p tr"></div><div className="p tr"></div><div className="p tr"></div><div className="p tr"></div><div className="p fl4"></div><div className="p fl5"></div><div className="p fl4"></div><div className="p fl4"></div><div className="p fl5"></div><div className="p fl4"></div><div className="p tr"></div><div className="p tr"></div><div className="p tr"></div><div className="p tr"></div><div className="p tr"></div>
                  <div className="p tr"></div><div className="p tr"></div><div className="p tr"></div><div className="p tr"></div><div className="p tr"></div><div className="p tr"></div><div className="p fl5"></div><div className="p tr"></div><div className="p tr"></div><div className="p fl5"></div><div className="p tr"></div><div className="p tr"></div><div className="p tr"></div><div className="p tr"></div><div className="p tr"></div><div className="p tr"></div>
                </div>
              </div>
            </motion.div>

            {/* Title Content */}
            <motion.div style={{ opacity: titleOpacity }} className="relative z-10 flex flex-col items-center">
              <h1 className="text-2xl md:text-5xl font-black mb-8 text-center tracking-tighter">
                HELLO, WORLD_!
              </h1>

              <div className="flex items-center gap-4 mb-4">
                <div className="w-8 h-[2px] bg-white/10" />
                <span className="text-[10px] md:text-xs text-[#fdd835]">I'M A FULL STACK DEVELOPER</span>
                <div className="w-8 h-[2px] bg-white/10" />
              </div>

              <p className="text-[8px] md:text-[10px] text-white/40 tracking-[0.2em] uppercase">
                BUILDING THE DIGITAL UNIVERSE
              </p>
            </motion.div>
          </div>
        </section>

        <div className="relative w-full h-[130vh]"> {/* Extended scroll area for physics interactions */}
          <div className="sticky top-0 w-full h-screen overflow-hidden pointer-events-none">
            <div className="pointer-events-auto h-full w-full">
              <PlanetsShowcase />
            </div>
          </div>
        </div>

        {/* Featured Projects Title */}
        <section id="projects" className="w-full max-w-6xl pt-32 pb-32 mb-24 flex flex-col items-center scroll-mt-32 relative z-20 bg-[#0b0d17]">
          <div className="flex items-center gap-6 mb-12">
            <div className="w-12 h-[2px] bg-gradient-to-r from-transparent to-[#fdd835]" />
            <h2 className="text-xs md:text-sm tracking-widest text-center">FEATURED PROJECTS</h2>
            <div className="w-12 h-[2px] bg-gradient-to-l from-transparent to-[#fdd835]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            {[
              { id: 'task', title: 'MISSION CONTROL', tech: 'REACT', grad: 'grad-react', desc: 'Real-time dashboard for interplanetary telemetry.' },
              { id: 'space', title: 'STAR-SHIP OS', tech: 'TYPESCRIPT', grad: 'grad-js', desc: 'Secure kernel for deep-space navigation units.' },
              { id: 'weather', title: 'ATMOS-SCANNER', tech: 'WEBGL', grad: 'grad-api', desc: 'Visualizing gas giant storm patterns via API.' }
            ].map((proj) => (
              <motion.div
                key={proj.id}
                whileHover={{ scale: 1.02 }}
                className="pixel-card group overflow-hidden h-64 flex flex-col justify-end p-0 border-white/5 active"
              >
                <div className={`absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity ${proj.grad}`} />
                <div className="absolute top-6 left-6 text-2xl group-hover:rotate-12 transition-transform">🛸</div>

                <div className="relative p-6 bg-[#0b0d17]/80 backdrop-blur-md border-t border-white/10">
                  <h4 className="text-[12px] mb-2 font-bold">{proj.title}</h4>
                  <p className="text-[8px] text-white/40 mb-4 leading-relaxed">{proj.desc}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-[8px] text-[#00d1ff]">✦</span>
                      <span className="text-[8px] tracking-widest text-[#00d1ff] bg-[#00d1ff]/10 px-2 py-1 rounded">
                        {proj.tech}
                      </span>
                    </div>
                    <span className="text-[10px] text-[#fdd835] group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="w-full max-w-6xl mb-24 flex flex-col items-center scroll-mt-32">
          <div className="flex items-center gap-6 mb-12">
            <div className="w-12 h-[2px] bg-gradient-to-r from-transparent to-[#fdd835]" />
            <h2 className="text-xs md:text-sm tracking-widest text-center">TECHNICAL ARSENAL</h2>
            <div className="w-12 h-[2px] bg-gradient-to-l from-transparent to-[#fdd835]" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
            {[
              { name: 'FRONTEND', skills: ['React', 'Next.js', 'Tailwind', 'Three.js'], color: '#4fa1ff' },
              { name: 'BACKEND', skills: ['Node.js', 'Go', 'Postgres', 'Redis'], color: '#9c4fff' },
              { name: 'DEVOPS', skills: ['Docker', 'AWS', 'Linux', 'Vercel'], color: '#ff4f9c' },
              { name: 'AI/ML', skills: ['Python', 'PyTorch', 'OpenAI', 'LangChain'], color: '#fdd835' }
            ].map((category) => (
              <div key={category.name} className="pixel-card flex flex-col border-white/5 bg-black/20">
                <h3 className="text-[10px] mb-6 text-white/40">{category.name}</h3>
                <div className="space-y-4">
                  {category.skills.map((skill) => (
                    <div key={skill}>
                      <div className="flex justify-between text-[8px] mb-2">
                        <span>{skill}</span>
                        <span className="opacity-40">Lv. 99</span>
                      </div>
                      <div className="h-1 bg-white/5 overflow-hidden">
                        <motion.div
                          className="h-full"
                          style={{ backgroundColor: category.color }}
                          initial={{ width: 0 }}
                          whileInView={{ width: '85%' }}
                          transition={{ duration: 1 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="w-full max-w-4xl mb-24 flex flex-col items-center scroll-mt-32">
          <div className="pixel-card w-full p-8 border-[#fdd835]/30 bg-[#0b0d17]/60">
            <div className="flex items-center gap-2 mb-8 border-b border-white/5 pb-4">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              <div className="w-2 h-2 rounded-full bg-yellow-500" />
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="ml-4 text-[8px] text-white/30 tracking-widest">COMMS_TERMINAL.EXE</span>
            </div>

            <div className="space-y-8">
              <div>
                <p className="text-[10px] text-[#fdd835] mb-4">&gt; INITIALIZING_CONTACT_SEQUENCE...</p>
                <input
                  type="text"
                  placeholder="ENTER_YOUR_NAME_"
                  className="w-full bg-transparent border-b border-white/10 py-4 text-xs focus:outline-none focus:border-[#fdd835] transition-colors placeholder:text-white/10"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="LINK_SIGNAL_TO_(EMAIL)_"
                  className="w-full bg-transparent border-b border-white/10 py-4 text-xs focus:outline-none focus:border-[#fdd835] transition-colors placeholder:text-white/10"
                />
              </div>
              <div>
                <textarea
                  rows={4}
                  placeholder="ENCODE_YOUR_MESSAGE_HERE_"
                  className="w-full bg-transparent border-b border-white/10 py-4 text-xs focus:outline-none focus:border-[#fdd835] transition-colors placeholder:text-white/10 resize-none"
                />
              </div>
              <button className="pixel-button w-full mt-4 group">
                <span className="mr-4">BROADCAST SIGNAL</span>
                <span className="group-hover:translate-x-2 inline-block transition-transform">⚡</span>
              </button>
            </div>
          </div>

          <div className="mt-12 flex gap-8">
            {['GITHUB', 'TWITTER', 'LINKEDIN'].map(social => (
              <a key={social} href="#" className="text-[8px] text-white/40 hover:text-[#fdd835] transition-colors tracking-[0.2em]">{social}</a>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;
