import { useEffect, useRef, useState } from 'react';
// `motion` is used via JSX (<motion.div>, ...); this minimal eslint config has no eslint-plugin-react
// jsx-uses-vars rule, so it can't see that usage.
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence, animate, useInView, useMotionValue, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import {
  Atom, ArrowRight, Award, ChevronDown, BriefcaseBusiness, Clock, Code2, Database, Download, Figma, FlaskConical, Github, Hexagon,
  Leaf, Lightbulb, Linkedin, Mail, MapPin, Menu, Monitor, Server, Settings, ShieldCheck, GraduationCap, Triangle,
  Trophy, Wind, Workflow, X, Zap, Heart,
} from 'lucide-react';

/* =====================================================================
   EDIT YOUR DETAILS HERE
   ===================================================================== */
const EMAIL = 'vishnupriyav1609@gmail.com';
const LINKS = {
  linkedin: 'https://www.linkedin.com/in/vishnupriya-venkatasubbu-3183b72a5',
  github: 'https://github.com/muralipriya-magi',
};
// Put your resume PDF in /public/documents/ with exactly this file name
const RESUME = '/documents/V-Vishnupriya-Resume.pdf';
const EMAIL_SUBJECT = 'Hello Vishnupriya - Portfolio enquiry';
const MAIL_HREF = `mailto:${EMAIL}?subject=${encodeURIComponent(EMAIL_SUBJECT)}`;

const NAV = ['Home', 'About', 'Projects', 'Skills', 'Experience', 'Education', 'Services', 'Contact'];

const SKILLS = [
  { n: 'React.js', c: 'Frontend', icon: Atom, color: '#22a6d6' },
  { n: 'JavaScript', c: 'Frontend', box: '.JS', bg: '#f7c325', fg: '#222' },
  { n: 'Tailwind CSS', c: 'Frontend', icon: Wind, color: '#38bdf8' },
  { n: 'Redux', c: 'Frontend', icon: Workflow, color: '#a78bfa' },
  { n: 'HTML5', c: 'Frontend', box: '5', bg: '#e44d26', fg: '#fff' },
  { n: 'CSS3', c: 'Frontend', box: '3', bg: '#2965f1', fg: '#fff' },
  { n: 'Material UI', c: 'Frontend', box: 'M', bg: '#007fff', fg: '#fff' },
  { n: 'Bootstrap', c: 'Frontend', box: 'B', bg: '#7952b3', fg: '#fff' },
  { n: 'Python', c: 'Backend', box: 'Py', bg: '#3776ab', fg: '#ffd43b' },
  { n: 'Node.js', c: 'Backend', icon: Hexagon, color: '#5fb35a' },
  { n: 'Express.js', c: 'Backend', txt: 'exe', color: '#94a3b8' },
  { n: 'Django', c: 'Backend', box: 'dj', bg: '#1f8a5b', fg: '#fff' },
  { n: 'Flask', c: 'Backend', icon: FlaskConical, color: '#cbd5e1' },
  { n: 'JWT & RBAC', c: 'Backend', icon: ShieldCheck, color: '#d63384' },
  { n: 'PostgreSQL', c: 'Database', icon: Database, color: '#5b9bd5' },
  { n: 'MySQL', c: 'Database', icon: Database, color: '#22a7c7' },
  { n: 'MongoDB', c: 'Database', icon: Leaf, color: '#4ade80' },
  { n: 'Supabase', c: 'Database', icon: Zap, color: '#2fbf82' },
  { n: 'Git & GitHub', c: 'Tools', icon: Github, color: '#e6edf7' },
  { n: 'Vercel', c: 'Tools', icon: Triangle, color: '#e6edf7' },
  { n: 'n8n', c: 'Tools', box: 'n8n', bg: '#ea4b71', fg: '#fff' },
  { n: 'Figma', c: 'Tools', icon: Figma, color: '#f24e1e' },
];
const TABS = ['All', 'Frontend', 'Backend', 'Database', 'Tools & Others'];

// live / code: leave as null to hide that link on the card until you have a URL
const PROJECTS = [
  { t: 'Vconstech CRM', img: '/images/project1.png', tags: ['React', 'Node.js', 'Supabase'], d: 'Construction Management ERP CRM that streamlines customer onboarding, lead tracking and business management workflows.', live: 'https://crm.thevsoft.com', code: null },
  { t: 'Resume Analyzer', img: '/images/project-2.jpg', tags: ['Next.js', 'Supabase', 'Prisma'], d: 'AI-powered resume analyzer to match skills, analyze ATS score and provide improvement suggestions.', live: null, code: null },
  { t: 'VedaConnect Website', img: '/images/project3.png', tags: ['React', 'Node.js', 'Supabase'], d: 'Community and networking platform for women entrepreneurs in the eco-friendly, herbal and handmade-products industry.', live: 'https://member.vedacraftscommunity.in', code: null },
  { t: 'Vedacraft Seller Portal', img: '/images/project4.jpg', tags: ['React', 'Node.js', 'Supabase'], d: 'E-commerce seller portal built during internship for Vedacraft, helping women entrepreneurs sell eco-friendly, natural, herbal and handmade products with seller onboarding, product listing and order management.', live: null, code: null },
  { t: 'ExpoSphere', img: '/images/project5.png', tags: ['React', 'Django REST', 'PostgreSQL'], d: 'Digital exhibition management system for exhibition registration, stall booking and event management.', live: 'https://exposphere-seven.vercel.app/', code: null },
  { t: 'Weather App', img: '/images/project-6.jpg', tags: ['Python', 'Flask', 'Render'], d: 'Weather web application built with Python and Flask, deployed on Render.', live: 'https://weather-flask-gyew.onrender.com', code: 'https://github.com/muralipriya-magi/weather_flask' },
];
const TIMELINE = [
  { d: 'Apr 2026 – Present', t: 'AI Full-Stack Intern', s: 'Vsoft Solutions, Thirunelveli', b: [
    'Built key modules of a Construction Management ERP CRM: customer onboarding, lead tracking and business workflows.',
    'Engineered the VedaConnect platform with React, an ecosystem and networking forum for women entrepreneurs in the eco-friendly herbal products industry.',
    'Integrated Supabase and Node.js services for real-time data sync, secure authentication and API endpoints.',
    'Automated client-management workflows with n8n.',
  ] },
  { d: 'Jan 2019 – Aug 2019', t: 'Assistant Lecturer', s: 'KIET College, Odisha', b: [
    'Lectured diploma students and delivered training sessions.',
    'Strengthened communication, mentoring and presentation skills.',
  ] },
];
const EDUCATION = [
  { i: GraduationCap, t: 'ME – Applied Electronics', s: 'Hindustan College of Engineering & Technology, Coimbatore', m: '82.5%' },
  { i: GraduationCap, t: 'BE – Electronics & Communication', s: 'PSRR College of Engineering for Women, Sivakasi', m: '77.7%' },
  { i: Award, t: 'Full Stack Developer Certification', s: 'TN Skill Corporation', m: 'Certification' },
];
const SERVICES = [
  { t: 'Web Application Development', d: 'Building modern, responsive and scalable web applications.', i: Monitor },
  { t: 'Frontend Development', d: 'Creating beautiful and intuitive user interfaces with React.', i: Code2 },
  { t: 'Backend Development', d: 'Developing REST APIs, database design and server-side logic.', i: Server },
];
// n + s = animated counter (10+), v = plain text
const STATS = [
  { i: Settings, n: PROJECTS.length, s: '', l: 'Projects Completed' },
  { i: Clock, n: 6, s: '+', l: 'Months Internship' },
  { i: Trophy, v: 'Hackathon', l: 'Prize Winner' },
  { i: BriefcaseBusiness, v: 'Open to', l: 'Opportunities' },
];
const FACTS = [
  { i: MapPin, t: 'Based in', s: 'Kovilpatti, Tamil Nadu' }, { i: Monitor, t: 'Open to', s: 'Remote / Onsite' },
  { i: GraduationCap, t: 'Always Learning', s: 'New Technologies' }, { i: Lightbulb, t: 'Problem Solver', s: 'with a Growth Mindset' },
];

// Hero code card: c = highlighted string
const CODE = [
  { t: 'const developer = {\n' },
  { t: '  name: ' }, { t: '"Vishnupriya"', c: 1 }, { t: ',\n  role: ' }, { t: '"Full Stack Developer"', c: 1 },
  { t: ',\n  passion: ' }, { t: '"Building Solutions"', c: 1 }, { t: '\n};' },
];
const CODE_LEN = CODE.reduce((a, s) => a + s.t.length, 0);

/* ---- Animation helpers ---- */
const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } } };
const ownVariants = { hidden: { opacity: 0, y: 24 }, show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1 } }) };
const stagger = (gap = 0.08) => ({ hidden: {}, show: { transition: { staggerChildren: gap } } });
const Reveal = ({ children, className, delay = 0, variants = fadeUp, ...rest }) => (
  <motion.div className={className} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}
    variants={variants} transition={{ delay }} {...rest}>
    {children}
  </motion.div>
);

/** Number that counts up when it scrolls into view */
function CountUp({ to, suffix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return undefined;
    if (reduce) { setV(to); return undefined; }
    const c = animate(0, to, { duration: 1.5, ease: 'easeOut', onUpdate: (l) => setV(Math.round(l)) });
    return () => c.stop();
  }, [inView, to, reduce]);
  return <span ref={ref}>{v}{suffix}</span>;
}

/** Hero code card that types itself out */
function TypedCode() {
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (reduce) { setN(CODE_LEN); return undefined; }
    let id;
    const start = setTimeout(() => {
      let i = 0;
      id = setInterval(() => { i += 1; setN(i); if (i >= CODE_LEN) clearInterval(id); }, 32);
    }, 1000);
    return () => { clearTimeout(start); clearInterval(id); };
  }, [reduce]);
  let left = n;
  return (
    <pre className="font-mono whitespace-pre m-0 min-h-[88px]">
      {CODE.map((s, i) => {
        const part = s.t.slice(0, Math.max(0, left));
        left -= s.t.length;
        return part ? <span key={i} className={s.c ? 'text-code-hl' : ''}>{part}</span> : null;
      })}
      <span className="inline-block w-[5px] h-[10px] bg-code-hl align-middle ml-0.5 animate-pulse" />
    </pre>
  );
}

/** Wrapper that makes a button gently follow the cursor */
function Magnetic({ children, strength = 0.3 }) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16 });
  const sy = useSpring(y, { stiffness: 220, damping: 16 });
  const move = (e) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const leave = () => { x.set(0); y.set(0); };
  return <motion.div style={{ x: sx, y: sy }} onMouseMove={move} onMouseLeave={leave} className="inline-block">{children}</motion.div>;
}

/** Project card that tilts in 3D toward the cursor */
function TiltCard({ children, className, variants = fadeUp, custom, own }) {
  const reduce = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 180, damping: 18 });
  const sry = useSpring(ry, { stiffness: 180, damping: 18 });
  const move = (e) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 10);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 10);
  };
  const leave = () => { rx.set(0); ry.set(0); };
  return (
    <motion.article variants={variants} custom={custom} {...(own ? { initial: 'hidden', animate: 'show', exit: { opacity: 0, y: 16 } } : {})} whileHover={{ y: -6 }} onMouseMove={move} onMouseLeave={leave}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 900 }} className={className}>
      {children}
    </motion.article>
  );
}

/** One project card (screenshot, tags, text, links) */
function ProjectCard({ p, ...motionProps }) {
  const projectEnquiry = `mailto:${EMAIL}?subject=${encodeURIComponent(`Question about ${p.t}`)}`;
  return (
    <TiltCard className="bg-card border border-line rounded-2xl p-2 pb-4 shadow-[0_6px_24px_rgba(0,0,0,.3)] transition-shadow hover:shadow-xl" {...motionProps}>
      <div className="overflow-hidden rounded-xl">
        <img src={p.img} alt={`${p.t} preview`} className="w-full aspect-[2/1] object-cover block transition-transform duration-500 hover:scale-105" />
      </div>
      <div className="pt-3 px-2.5">
        <div className="flex gap-1.5 flex-wrap">{p.tags.map((t) => <span key={t} className="bg-chip rounded-md text-[10px] px-2.5 py-1">{t}</span>)}</div>
        <h3 className="font-bold text-base mt-3 mb-1">{p.t}</h3>
        <p className="text-muted text-xs">{p.d}</p>
        {(p.live || p.code) ? (
          <div className="flex justify-between mt-3.5 text-xs font-semibold gap-4">
            {p.live && <a href={p.live} {...ext} className="group text-accent inline-flex gap-1.5 items-center">Live Demo <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" /></a>}
            {p.code && <a href={p.code} {...ext} className="inline-flex gap-1.5 items-center ml-auto">View Code <Github size={18} /></a>}
          </div>
        ) : (
          <a href={projectEnquiry} className="mt-3.5 text-xs font-semibold text-accent inline-flex items-center gap-1.5 group">
            Ask about this project <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </a>
        )}
      </div>
    </TiltCard>
  );
}

// Logo: paste your image at public/images/logo.png (PNG, SVG or WebP also work: change the extension here).
// Set SHOW_NAME to false if your logo already contains your name.
const LOGO = '/images/logo.png';
const SHOW_NAME = true;
function Brand() {
  const [hasLogo, setHasLogo] = useState(true); // hides itself if the file isn't there yet
  return (
    <a href="#home" className="inline-flex items-center gap-2.5 font-serif font-bold text-2xl">
      {hasLogo && <img src={LOGO} alt={SHOW_NAME ? '' : 'Vishnupriya'} className="h-9 w-auto" onError={() => setHasLogo(false)} />}
      {(SHOW_NAME || !hasLogo) && <span>Vishnu<span className="text-accent">priya</span></span>}
    </a>
  );
}
const ext = { target: '_blank', rel: 'noreferrer' };
const Social = ({ size = 22 }) => (
  <>
    <a href={LINKS.linkedin} {...ext} aria-label="LinkedIn" className="hover:text-accent hover:-translate-y-0.5 transition"><Linkedin size={size} /></a>
    <a href={LINKS.github} {...ext} aria-label="GitHub" className="hover:text-accent hover:-translate-y-0.5 transition"><Github size={size} /></a>
    <a href={MAIL_HREF} aria-label="Email" className="hover:text-accent hover:-translate-y-0.5 transition"><Mail size={size} /></a>
  </>
);
const Heading = ({ kick, children, action, href = '#', external, onToggle, expanded }) => {
  const btn = 'border border-accent rounded-full px-6 py-2.5 text-xs font-semibold inline-flex gap-2 items-center';
  const hover = { backgroundColor: 'rgba(56,189,248,0.12)' };
  return (
    <div className="flex justify-between items-end gap-3 flex-wrap mb-5">
      <div>
        <p className="text-accent text-xs font-bold tracking-wider uppercase mb-1.5">{kick}</p>
        <h2 className="font-serif font-bold text-[28px] sm:text-[32px] leading-tight">{children}</h2>
      </div>
      {action && onToggle && (
        <motion.button type="button" onClick={onToggle} aria-expanded={expanded} whileHover={hover} whileTap={{ scale: 0.97 }} className={btn}>
          {action} <ChevronDown size={14} className={`transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
        </motion.button>
      )}
      {action && !onToggle && (
        <motion.a whileHover={hover} whileTap={{ scale: 0.97 }} {...(external ? ext : {})} className={btn} href={href}>
          {action} <ArrowRight size={14} />
        </motion.a>
      )}
    </div>
  );
};

export default function App() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState('All');
  const [showAll, setShowAll] = useState(false);
  const [active, setActive] = useState('home');
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });
  const shown = tab === 'All' ? SKILLS : SKILLS.filter((s) => s.c === (tab === 'Tools & Others' ? 'Tools' : tab));

  // Scroll-spy: highlights the nav link of the section currently on screen
  useEffect(() => {
    const els = NAV.map((n) => document.getElementById(n.toLowerCase())).filter(Boolean);
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-40% 0px -55% 0px' },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // CTA banner spotlight follows the cursor
  const spot = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <div className="overflow-x-hidden">
      <motion.div style={{ scaleX: progress }} className="fixed top-0 inset-x-0 h-[3px] bg-accent origin-left z-50" aria-hidden="true" />

      <header className="sticky top-0 z-30 bg-cream/90 backdrop-blur-md">
        <div className="max-w-content mx-auto px-6 flex items-center justify-between h-[72px]">
          <Brand />
          <nav className="hidden lg:flex gap-7 text-xs font-medium" aria-label="Main">
            {NAV.map((n) => (
              <a key={n} href={`#${n.toLowerCase()}`} className="relative pb-1.5 hover:text-accent transition-colors">
                {n}
                {active === n.toLowerCase() && (
                  <motion.span layoutId="nav-underline" className="absolute left-0 right-0 bottom-0 h-0.5 bg-accent"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
                )}
              </a>
            ))}
          </nav>
          <Magnetic strength={0.2}>
            <motion.a whileHover={{ y: -2 }} whileTap={{ scale: 0.96 }} href={RESUME} download="V-Vishnupriya-Resume.pdf"
              className="hidden lg:inline-flex bg-deep text-white rounded-full px-5 py-2.5 text-xs font-semibold gap-2 items-center">
              Download CV <Download size={14} />
            </motion.a>
          </Magnetic>
          <button className="lg:hidden" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
        <AnimatePresence>
          {open && (
            <motion.nav initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              className="lg:hidden overflow-hidden bg-cream px-6" aria-label="Mobile">
              <div className="flex flex-col gap-4 py-4">
                {NAV.map((n) => (
                  <a key={n} href={`#${n.toLowerCase()}`} onClick={() => setOpen(false)} className="text-sm font-medium">{n}</a>
                ))}
                <a href={RESUME} download="V-Vishnupriya-Resume.pdf" className="text-sm font-semibold text-accent inline-flex items-center gap-2">
                  Download CV <Download size={14} />
                </a>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <main>
        <div className="max-w-content mx-auto px-6">
          <div id="home" className="grid lg:grid-cols-2 items-center gap-6 py-10 lg:py-16 scroll-mt-[72px]">
            <motion.div initial="hidden" animate="show" variants={stagger(0.12)}>
              <motion.span variants={fadeUp} className="inline-flex items-center gap-1.5 bg-soft rounded-lg px-3 py-1.5 text-xs font-semibold">
                <motion.span className="inline-block origin-[70%_70%]" animate={reduce ? {} : { rotate: [0, 16, -8, 16, -4, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 2.5 }}>👋</motion.span>
                Hello, I&apos;m
              </motion.span>
              <motion.h1 variants={fadeUp} className="font-serif font-bold text-[40px] sm:text-[52px] lg:text-[68px] leading-[1.05] mt-4 mb-1.5">
                Vishnu<span className="text-accent">priya</span>
              </motion.h1>
              <motion.h2 variants={fadeUp} className="font-serif font-bold text-2xl mb-4">Full Stack Developer</motion.h2>
              <motion.p variants={fadeUp} className="text-muted max-w-[400px]">
                I build modern, scalable and user-friendly web applications using React, Node.js and modern technologies, turning ideas into real products.
              </motion.p>
              <motion.div variants={fadeUp} className="flex gap-3.5 flex-wrap mt-6 items-center">
                <Magnetic>
                  <motion.a whileHover={{ y: -2 }} whileTap={{ scale: 0.96 }} href="#projects"
                    className="bg-deep text-white rounded-full px-5 py-2.5 text-xs font-semibold inline-flex gap-2 items-center">
                    View My Work <ArrowRight size={14} />
                  </motion.a>
                </Magnetic>
                <motion.a whileHover={{ backgroundColor: 'rgba(56,189,248,0.12)' }} whileTap={{ scale: 0.96 }} href="#contact"
                  className="border border-accent rounded-full px-6 py-2.5 text-xs font-semibold inline-flex items-center">
                  Let&apos;s Connect
                </motion.a>
              </motion.div>
              <motion.div variants={fadeUp} className="flex gap-4 mt-6"><Social /></motion.div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, ease: 'easeOut' }}
              className="relative h-80 w-[290px] sm:w-[460px] max-w-full mx-auto lg:justify-self-center">
              <motion.div className="absolute -left-[5px] -top-[5px] w-[300px] h-[300px] rounded-full bg-accent/15"
                animate={reduce ? {} : { y: [0, -12, 0], scale: [1, 1.03, 1] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} />
              <div className="absolute left-0 top-0 w-[290px] h-[290px] rounded-full overflow-hidden border-4 border-line shadow-2xl">
                <img src="/images/profile.jpeg" alt="Portrait of Vishnupriya working on a laptop" className="w-full h-full object-cover" />
              </div>
              <motion.div aria-hidden="true" initial={{ opacity: 0 }}
                animate={reduce ? { opacity: 1 } : { opacity: 1, y: [0, -7, 0] }}
                transition={{ opacity: { delay: 0.5, duration: 0.5 }, y: { delay: 1, duration: 4.5, repeat: Infinity, ease: 'easeInOut' } }}
                className="absolute left-[175px] top-[190px] w-[230px] bg-code border border-line rounded-xl text-code-fg text-[10px] leading-[1.6] p-3.5 shadow-xl hidden sm:block">
                <span className="inline-block w-1.5 h-1.5 rounded-full mr-1 bg-[#ef6a5b]" />
                <span className="inline-block w-1.5 h-1.5 rounded-full mr-1 bg-[#f4bf4f]" />
                <span className="inline-block w-1.5 h-1.5 rounded-full mr-1 bg-[#62c554]" />
                <TypedCode />
              </motion.div>
              <motion.p className="absolute right-0 top-4 text-left text-xl leading-tight font-hand hidden sm:block"
                initial={{ opacity: 0, rotate: -14 }} animate={{ opacity: 1, rotate: -8 }} transition={{ delay: 0.9, duration: 0.7 }}>
                Turning<br />Ideas into<br />Real Products
              </motion.p>
            </motion.div>
          </div>

          <Reveal className="bg-card border border-line rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,.3)] grid grid-cols-2 lg:grid-cols-4 p-5 gap-5 lg:gap-0 mb-14"
            variants={stagger(0.08)}>
            {STATS.map(({ i: I, n, s, v, l }) => (
              <motion.div key={l || v} variants={fadeUp} className="flex items-center gap-3.5 lg:px-6 lg:border-r lg:border-line lg:last:border-0">
                <motion.span whileHover={{ rotate: 12, scale: 1.1 }} className="w-11 h-11 rounded-xl bg-soft text-accent grid place-items-center flex-none"><I size={20} /></motion.span>
                <div>
                  <b className="text-base block">{n !== undefined ? <CountUp to={n} suffix={s} /> : v}</b>
                  {l && <small className="text-xs text-muted">{l}</small>}
                </div>
              </motion.div>
            ))}
          </Reveal>
        </div>

        <section id="about" className="py-14 scroll-mt-[72px]"><div className="max-w-content mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <p className="text-accent text-xs font-bold tracking-wider uppercase mb-1.5">About me —</p>
            <h2 className="font-serif font-bold text-[32px] leading-tight">Passionate Developer<br />Who Loves to <span className="text-accent">Build</span></h2>
            <p className="text-muted my-4 max-w-[440px]">
              I&apos;m a results-driven Full Stack Developer with hands-on experience building scalable web applications using React, Node.js, Supabase and n8n. I enjoy engineering clean frontend interfaces, robust backend APIs and automated workflows.
            </p>
            <Magnetic>
              <motion.a whileHover={{ y: -2 }} whileTap={{ scale: 0.96 }} href="#experience"
                className="bg-deep text-white rounded-full px-5 py-2.5 text-xs font-semibold inline-flex gap-2 items-center">
                More About Me <ArrowRight size={14} />
              </motion.a>
            </Magnetic>
          </Reveal>
          <Reveal delay={0.15} className="flex flex-wrap items-center gap-x-10 gap-y-6" variants={stagger(0.08)}>
            <div className="grid gap-5">
              {FACTS.map(({ i: I, t, s }) => (
                <motion.div variants={fadeUp} whileHover={{ x: 6 }} className="flex gap-4 items-center" key={t}>
                  <motion.span whileHover={{ rotate: 12, scale: 1.1 }} className="w-11 h-11 rounded-xl bg-soft text-accent grid place-items-center flex-none"><I size={20} /></motion.span>
                  <div><b className="block">{t}</b><small className="text-muted">{s}</small></div>
                </motion.div>
              ))}
            </div>
            <motion.p className="font-hand text-xl leading-snug border-l-2 border-accent/60 pl-4"
              animate={reduce ? {} : { y: [0, -5, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
              Clean Code<br />Better Solutions<br />Brighter Future
            </motion.p>
          </Reveal>
        </div></section>

        <section id="skills" className="py-14 scroll-mt-[72px]"><div className="max-w-content mx-auto px-6">
          <Heading kick="My skills">Technologies I Work With</Heading>
          <div className="flex gap-2.5 mb-5 flex-wrap" role="group" aria-label="Filter skills">
            {TABS.map((t) => (
              <button key={t} aria-pressed={tab === t} onClick={() => setTab(t)}
                className={`relative rounded-[10px] px-5 py-2.5 text-xs font-semibold transition-colors ${tab === t ? 'text-white' : 'bg-chip hover:bg-chip-hover'}`}>
                {tab === t && <motion.span layoutId="tab-pill" className="absolute inset-0 bg-deep rounded-[10px]" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
                <span className="relative">{t}</span>
              </button>
            ))}
          </div>
          <motion.div layout className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3.5" initial="hidden" animate="show" variants={stagger(0.04)}>
            {shown.map(({ n, icon: I, box, bg, fg, txt, color }) => (
              <motion.div layout key={n} variants={fadeUp} whileHover={{ y: -6, rotate: -1.5 }}
                className="bg-card border border-line rounded-2xl pt-4 px-1 pb-2.5 text-center text-[10px] text-muted transition-shadow hover:shadow-lg">
                {I && <span className="grid place-items-center h-10 mb-2" style={{ color }}><I size={30} /></span>}
                {box && <div className="w-9 h-9 mx-auto mb-2 rounded-md text-base grid place-items-center font-bold" style={{ background: bg, color: fg }}>{box}</div>}
                {txt && <span className="grid place-items-center h-10 mb-2 font-bold text-xl" style={{ color }}>{txt}</span>}
                {n}
              </motion.div>
            ))}
          </motion.div>
        </div></section>

        <section id="projects" className="py-14 scroll-mt-[72px]"><div className="max-w-content mx-auto px-6">
          <Heading kick="My work" action={showAll ? 'Show Fewer Projects' : 'View All Projects'} onToggle={() => setShowAll((v) => !v)} expanded={showAll}>Featured Projects</Heading>
          <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} variants={stagger(0.1)}>
            {PROJECTS.slice(0, 3).map((p) => <ProjectCard key={p.t} p={p} />)}
            <AnimatePresence>
              {showAll && PROJECTS.slice(3).map((p, i) => <ProjectCard key={p.t} p={p} own variants={ownVariants} custom={i} />)}
            </AnimatePresence>
          </motion.div>
        </div></section>

        <section id="experience" className="py-14 scroll-mt-[72px]"><div className="max-w-content mx-auto px-6">
          <Heading kick="My journey" action="View Full Resume" href={RESUME} external>Work Experience</Heading>
          <div className="grid lg:grid-cols-[1.3fr_1fr] gap-5 items-center relative">
            <div className="relative">
              <motion.div className="absolute left-[15px] lg:left-[155px] top-2 bottom-2 w-px bg-accent/50 origin-top"
                initial={{ scaleY: reduce ? 1 : 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 1.4, ease: 'easeInOut' }} />
              <motion.div className="relative grid gap-6" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={stagger(0.25)}>
                {TIMELINE.map((e) => (
                  <motion.div variants={fadeUp} key={e.t} className="grid grid-cols-[20px_1fr] lg:grid-cols-[140px_30px_1fr] text-sm">
                    <span className="hidden lg:block text-muted text-xs">{e.d}</span>
                    <motion.span variants={{ hidden: { scale: 0 }, show: { scale: 1, transition: { type: 'spring', stiffness: 400, damping: 14 } } }}
                      className="w-2.5 h-2.5 rounded-full bg-accent mt-1 relative left-2.5" />
                    <div className="pl-3 lg:pl-0"><p className="lg:hidden text-accent text-xs font-semibold mb-0.5">{e.d}</p><h3 className="font-semibold text-[15px]">{e.t}</h3><p className="text-muted text-xs">{e.s}</p>
                      <ul className="mt-1.5 pl-4 text-xs text-muted list-disc">{e.b.map((b) => <li key={b}>{b}</li>)}</ul></div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
            <Reveal delay={0.2} className="relative">
              <p className="absolute left-[4%] top-[3%] text-lg leading-tight -rotate-[4deg] font-hand hidden sm:block" aria-hidden="true">
                Continuous<br />Learning,<br />Better Future
              </p>
              <motion.img src="/images/journey.svg" alt="Illustration of a person climbing steps labelled Learn, Build, Grow" className="w-full"
                animate={reduce ? {} : { y: [0, -8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} />
            </Reveal>
          </div>
        </div></section>

        <section id="education" className="py-14 scroll-mt-[72px]"><div className="max-w-content mx-auto px-6">
          <Heading kick="My learning">Education</Heading>
          <motion.div className="grid lg:grid-cols-3 gap-5" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={stagger(0.1)}>
            {EDUCATION.map(({ t, s: sub, m, i: I }) => (
              <motion.div key={t} variants={fadeUp} whileHover={{ y: -4 }}
                className="bg-card border border-line rounded-2xl p-5 flex gap-4 shadow-[0_6px_24px_rgba(0,0,0,.3)] transition-shadow hover:shadow-lg">
                <motion.span whileHover={{ rotate: 12, scale: 1.1 }} className="w-11 h-11 rounded-xl bg-soft text-accent grid place-items-center flex-none"><I size={22} /></motion.span>
                <div><h3 className="font-bold text-[13px]">{t}</h3><p className="text-xs text-muted">{sub}</p><p className="text-xs text-accent font-semibold mt-1">{m}</p></div>
              </motion.div>
            ))}
          </motion.div>
        </div></section>

        <section id="services" className="py-14 scroll-mt-[72px]"><div className="max-w-content mx-auto px-6">
          <Heading kick="What I do">My Services</Heading>
          <motion.div className="grid lg:grid-cols-3 gap-5" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={stagger(0.1)}>
            {SERVICES.map(({ t, d, i: I }) => (
              <motion.div key={t} variants={fadeUp} whileHover={{ y: -4 }}
                className="bg-card border border-line rounded-2xl p-5 flex gap-4 shadow-[0_6px_24px_rgba(0,0,0,.3)] transition-shadow hover:shadow-lg">
                <motion.span whileHover={{ rotate: 12, scale: 1.1 }} className="w-11 h-11 rounded-xl bg-soft text-accent grid place-items-center flex-none"><I size={22} /></motion.span>
                <div><h3 className="font-bold text-[13px]">{t}</h3><p className="text-xs text-muted">{d}</p></div>
              </motion.div>
            ))}
          </motion.div>
        </div></section>

        <section id="contact" className="pt-5 pb-14 scroll-mt-[72px]"><div className="max-w-content mx-auto px-6">
          <Reveal onMouseMove={spot}
            className="group relative overflow-hidden bg-banner text-white rounded-[22px] p-9 lg:p-11 flex items-center justify-between gap-5 flex-wrap border-b-[3px] border-accent">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(320px_circle_at_var(--mx,50%)_var(--my,50%),rgba(56,189,248,.22),transparent_65%)]" />
            <div className="relative">
              <p className="text-accent text-xs font-bold tracking-wider uppercase mb-1.5">Let&apos;s work together —</p>
              <h2 className="font-serif font-bold text-[26px] sm:text-[32px] leading-tight my-1.5">Have a Project in Mind?</h2>
              <p className="opacity-85">I&apos;m always interested in new opportunities and exciting projects.<br />Let&apos;s build something amazing together!</p>
            </div>
            <div className="relative">
              <Magnetic>
                <motion.a whileHover={{ y: -2 }} whileTap={{ scale: 0.96 }} href={MAIL_HREF}
                  className="bg-accent text-cream rounded-full px-7 py-3 font-bold text-[13px] inline-flex gap-2 items-center">
                  Get in Touch <ArrowRight size={14} />
                </motion.a>
              </Magnetic>
            </div>
            <div className="relative flex gap-2.5">
              {[[Linkedin, LINKS.linkedin, 'LinkedIn', true], [Github, LINKS.github, 'GitHub', true], [Mail, MAIL_HREF, 'Email', false]].map(([I, h, l, e]) => (
                <motion.a whileHover={{ y: -3, backgroundColor: 'rgba(255,255,255,.12)' }} whileTap={{ scale: 0.92 }} key={l} href={h} aria-label={l} {...(e ? ext : {})}
                  className="w-[42px] h-[42px] border border-white/40 rounded-full grid place-items-center"><I size={18} /></motion.a>
              ))}
            </div>
          </Reveal>
        </div></section>
      </main>

      <footer className="pt-11 pb-5"><div className="max-w-content mx-auto px-6">
        <div className="flex justify-between items-center gap-5 flex-wrap">
          <div><Brand /><p className="text-xs text-muted">Full Stack Developer</p></div>
          <nav className="flex text-xs flex-wrap gap-x-5 gap-y-2" aria-label="Footer">
            {NAV.map((n) => <a key={n} href={`#${n.toLowerCase()}`} className="hover:text-accent transition-colors">{n}</a>)}
          </nav>
          <div className="flex gap-4"><Social /></div>
        </div>
        <div className="border-t border-line mt-6 pt-4 flex justify-between text-[11px] text-muted flex-wrap gap-2">
          <span>© 2026 Vishnupriya. All rights reserved.</span>
          <span className="inline-flex items-center gap-1">Built with
            <motion.span animate={reduce ? {} : { scale: [1, 1.25, 1] }} transition={{ duration: 1.2, repeat: Infinity }} className="inline-flex">
              <Heart size={12} fill="#e0354b" color="#e0354b" />
            </motion.span> using React and Tailwind CSS.</span>
        </div>
      </div></footer>
    </div>
  );
}
