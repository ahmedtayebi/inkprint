'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const steps = [
    {
        number: '01',
        icon: '🎨',
        title: 'Envoyez votre design',
        description:
            'Téléchargez votre fichier (PNG, AI, PDF) ou décrivez votre idée. Notre équipe prend en charge la préparation technique.',
    },
    {
        number: '02',
        icon: '📋',
        title: 'Choisissez vos options',
        description:
            'Sélectionnez la technique (DTF, sérigraphie, broderie), la quantité, les tailles et la couleur de t-shirt.',
    },
    {
        number: '03',
        icon: '✅',
        title: 'Validation & devis',
        description:
            'Nous vous envoyons un aperçu avant impression et un devis détaillé sous 24h. Votre accord = c\'est parti.',
    },
    {
        number: '04',
        icon: '🚚',
        title: 'Livraison en Algérie',
        description:
            'Production en 5–10 jours ouvrés, livraison vers les 58 wilayas via nos partenaires logistiques.',
    },
];

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

export default function HowItWorks() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section id="how-it-works" className="py-28 bg-[var(--color-ink)] relative overflow-hidden">
            {/* Decorative background */}
            <div
                aria-hidden
                className="absolute inset-0 opacity-5"
                style={{
                    backgroundImage:
                        'radial-gradient(circle at 50% 50%, var(--color-accent) 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                }}
            />

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <span className="font-display text-xs uppercase tracking-widest text-[var(--color-accent)] mb-4 block">
                        Processus simplifié
                    </span>
                    <h2
                        className="font-display text-white mb-4 leading-tight"
                        style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 800 }}
                    >
                        Comment ça marche ?
                    </h2>
                    <p className="font-body text-gray-400 max-w-xl mx-auto text-lg">
                        De votre idée à la livraison, un processus clair et professionnel en 4 étapes.
                    </p>
                </motion.div>

                {/* Steps */}
                <motion.div
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    {steps.map((step, i) => (
                        <motion.div key={step.number} variants={cardVariants} className="relative">
                            {/* Connector line */}
                            {i < steps.length - 1 && (
                                <div
                                    aria-hidden
                                    className="hidden lg:block absolute top-10 left-full w-8 h-px bg-gradient-to-r from-[var(--color-accent)] to-transparent -translate-x-4 z-10"
                                />
                            )}

                            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 h-full hover:border-[var(--color-accent)]/50 hover:bg-white/8 transition-all duration-300 group">
                                {/* Number */}
                                <div className="flex items-start justify-between mb-6">
                                    <span className="text-4xl">{step.icon}</span>
                                    <span
                                        className="font-display text-white/10 group-hover:text-[var(--color-accent)]/30 transition-colors"
                                        style={{ fontSize: '3.5rem', fontWeight: 800, lineHeight: 1 }}
                                    >
                                        {step.number}
                                    </span>
                                </div>

                                <h3
                                    className="font-display text-white text-lg mb-3"
                                    style={{ fontWeight: 700 }}
                                >
                                    {step.title}
                                </h3>
                                <p className="font-body text-gray-400 text-sm leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="mt-16 text-center"
                >
                    <a
                        href="#order"
                        className="inline-flex items-center gap-3 bg-[var(--color-accent)] text-white font-display px-8 py-4 rounded-full hover:bg-[var(--color-accent-warm)] transition-colors duration-200 text-sm font-700"
                        style={{ fontWeight: 700 }}
                    >
                        Commencer ma commande
                        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
