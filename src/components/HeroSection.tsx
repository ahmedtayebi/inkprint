'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// ─── Animation variants ────────────────────────────────────────────────────────
const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

// const fadeUpFast = {
//   hidden: { opacity: 0, y: 20 },
//   show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
// };

// ─── Stats data ────────────────────────────────────────────────────────────────
const stats = [
  { value: '+500', label: 'Clients Satisfaits' },
  { value: '58', label: 'Wilayas' },
  { value: '48–72h', label: 'Livraison' },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax for mockup on scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const mockupY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const mockupRotate = useTransform(scrollYProgress, [0, 1], ['-8deg', '-2deg']);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-[var(--color-ink)]"
      style={{ isolation: 'isolate' }}
    >
      {/* ── Grain texture overlay ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px',
          opacity: 0.035,
          mixBlendMode: 'overlay',
        }}
      />

      {/* ── Ghosted "T" background letter ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center select-none overflow-hidden"
      >
        <span
          className="font-display text-white select-none"
          style={{
            fontSize: 'clamp(400px, 60vw, 900px)',
            fontWeight: 800,
            lineHeight: 1,
            opacity: 0.025,
            letterSpacing: '-0.05em',
            transform: 'translateX(15%)',
          }}
        >
          T
        </span>
      </div>

      {/* ── Subtle red gradient glow, bottom-right ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full z-0"
        style={{
          background: 'radial-gradient(circle, rgba(230,57,70,0.18) 0%, transparent 70%)',
        }}
      />

      {/* ── Main grid ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full pt-24 pb-16 grid lg:grid-cols-[55fr_45fr] gap-12 lg:gap-0 items-center min-h-screen">

        {/* ════ Left column: Text ════ */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col justify-center"
        >
          {/* Eyebrow */}
          <motion.div variants={fadeUp} className="mb-8">
            <span className="inline-flex items-center gap-2 text-xs font-display uppercase tracking-[0.2em] text-gray-400 border border-white/10 rounded-full px-4 py-2 bg-white/5 backdrop-blur-sm">
              🇩🇿{' '}
              <span>Livraison dans toute l&apos;Algérie</span>
            </span>
          </motion.div>

          {/* Headline — 3 lines */}
          <h1 className="mb-7 overflow-visible" aria-label="Votre Design, Imprimé. Livré.">
            {/* Line 1 */}
            <motion.span
              variants={fadeUp}
              className="block font-display text-white leading-[1.05]"
              style={{ fontSize: 'clamp(3rem, 6.5vw, 6rem)', fontWeight: 300, letterSpacing: '-0.03em' }}
            >
              Votre Design,
            </motion.span>

            {/* Line 2 — bold red italic */}
            <motion.span
              variants={fadeUp}
              className="block font-display leading-[1.0]"
              style={{
                fontSize: 'clamp(3.5rem, 8vw, 7.5rem)',
                fontWeight: 800,
                fontStyle: 'italic',
                letterSpacing: '-0.04em',
                color: 'var(--color-accent)',
                WebkitTextStroke: '0px',
              }}
            >
              Imprimé.
            </motion.span>

            {/* Line 3 */}
            <motion.span
              variants={fadeUp}
              className="block font-display text-white leading-[1.05]"
              style={{ fontSize: 'clamp(3rem, 6.5vw, 6rem)', fontWeight: 300, letterSpacing: '-0.03em' }}
            >
              Livré.
            </motion.span>
          </h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeUp}
            className="font-body text-gray-400 max-w-lg mb-10 leading-relaxed"
            style={{ fontSize: 'clamp(1rem, 1.5vw, 1.125rem)' }}
          >
            Impression sur T-shirts de qualité premium — pour particuliers,
            équipes, événements et entreprises.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mb-14">
            <a
              href="#order-form"
              className="group inline-flex items-center gap-2.5 font-display text-sm font-700 text-white px-7 py-3.5 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-red-900/30"
              style={{
                fontWeight: 700,
                background: 'var(--color-accent)',
              }}
            >
              Commander Maintenant
              <svg
                className="transition-transform duration-300 group-hover:translate-x-1"
                width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="#gallery"
              className="inline-flex items-center gap-2.5 font-display text-sm font-500 text-white px-7 py-3.5 rounded-full border border-white/20 hover:border-white/60 hover:bg-white/5 transition-all duration-300"
              style={{ fontWeight: 500 }}
            >
              Voir nos réalisations
            </a>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="flex flex-wrap gap-0 border-t border-white/10 pt-7"
          >
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`flex flex-col pr-8 ${i !== 0 ? 'pl-8 border-l border-white/10' : ''} ${i === stats.length - 1 ? '' : ''}`}
              >
                <span
                  className="font-display text-white"
                  style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', fontWeight: 800, color: 'var(--color-accent)' }}
                >
                  {stat.value}
                </span>
                <span className="font-body text-gray-500 text-xs uppercase tracking-widest mt-0.5">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ════ Right column: T-shirt mockup ════ */}
        <div className="relative flex items-center justify-center lg:justify-end h-full">

          {/* Decorative arc/circle behind tshirt */}
          <div
            aria-hidden
            className="absolute w-[420px] h-[420px] rounded-full border border-white/5"
          />
          <div
            aria-hidden
            className="absolute w-[320px] h-[320px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(230,57,70,0.08) 0%, transparent 70%)',
            }}
          />

          {/* The floating mockup */}
          <motion.div
            style={{ y: mockupY, rotate: mockupRotate }}
            className="relative z-10"
          >
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              initial={{ opacity: 0, scale: 0.85, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              /* whileInView on nested won't conflict since parent uses style */
            >
              {/* T-shirt card */}
              <div
                className="relative w-72 h-80 sm:w-80 sm:h-96 rounded-3xl flex flex-col items-center justify-center overflow-hidden border border-white/10"
                style={{
                  background:
                    'linear-gradient(145deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)',
                  boxShadow: '0 40px 80px -20px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.05)',
                  backdropFilter: 'blur(16px)',
                }}
              >
                {/* Big emoji mockup */}
                <span
                  className="select-none"
                  style={{ fontSize: '7rem', lineHeight: 1, filter: 'drop-shadow(0 8px 24px rgba(230,57,70,0.35))' }}
                  aria-label="T-shirt"
                >
                  👕
                </span>

                {/* Brand pill inside card */}
                <div
                  className="mt-5 flex items-center gap-2 px-4 py-2 rounded-full border border-white/15"
                  style={{ background: 'rgba(255,255,255,0.06)' }}
                >
                  <span
                    className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse"
                    aria-hidden
                  />
                  <span className="font-display text-xs text-white/70 uppercase tracking-widest">
                    PrintDZ Quality
                  </span>
                </div>

                {/* Corner badge */}
                <div
                  className="absolute top-4 right-4 px-3 py-1 rounded-full text-white text-[10px] font-display uppercase tracking-wider"
                  style={{ background: 'var(--color-accent)', fontWeight: 700 }}
                >
                  Premium
                </div>

                {/* Inset glow at bottom */}
                <div
                  aria-hidden
                  className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(230,57,70,0.12), transparent)',
                  }}
                />
              </div>
            </motion.div>

            {/* Floating label cards */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="absolute -left-10 top-12 bg-white rounded-2xl px-4 py-3 shadow-2xl border border-gray-100/10"
              style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.12)' }}
            >
              <p className="font-display text-xs text-white" style={{ fontWeight: 700 }}>
                ✅ Devis sous 24h
              </p>
              <p className="font-body text-xs text-gray-400 mt-0.5">Réponse garantie</p>
            </motion.div>

            <motion.div
              animate={{ y: [0, 7, 0] }}
              transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute -right-8 bottom-16"
              style={{
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '1rem',
                padding: '0.75rem 1rem',
                boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
              }}
            >
              <p className="font-display text-xs text-white" style={{ fontWeight: 700 }}>
                🚚 48–72h
              </p>
              <p className="font-body text-xs text-gray-400 mt-0.5">58 wilayas</p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── Horizontal rule at bottom ── */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="font-display text-[10px] uppercase tracking-[0.2em] text-gray-600">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-10 bg-gradient-to-b from-gray-600 to-transparent"
        />
      </motion.div>
    </section>
  );
}
