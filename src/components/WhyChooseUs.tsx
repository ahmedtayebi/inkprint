'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const features = [
    {
        icon: '🇩🇿',
        title: '100% Algérien',
        description:
            'Studio basé en Algérie, nous comprenons les besoins locaux et livrons dans toutes les 58 wilayas.',
    },
    {
        icon: '⚡',
        title: 'Délais respectés',
        description:
            'Production en 5–10 jours ouvrés. Nous nous engageons sur les délais — pas de mauvaises surprises.',
    },
    {
        icon: '🎯',
        title: 'Qualité certifiée',
        description:
            'Encres premium, machines dernière génération. Résultat : des impressions aux couleurs fidèles qui durent.',
    },
    {
        icon: '📐',
        title: '4 techniques maîtrisées',
        description:
            'DTF, sérigraphie, broderie, sublimation — nous choisissons avec vous la meilleure technique selon votre design.',
    },
    {
        icon: '💬',
        title: 'Suivi personnalisé',
        description:
            'Un interlocuteur dédié de la commande à la livraison. Vous êtes toujours informé de l\'avancement.',
    },
    {
        icon: '📦',
        title: 'Minimum 10 pièces',
        description:
            'Petites séries ou grandes quantités, nous acceptons dès 10 pièces. Idéal pour associations, startups et événements.',
    },
];

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

export default function WhyChooseUs() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section id="why-us" className="py-28 bg-[var(--color-surface)]">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="grid lg:grid-cols-2 gap-12 items-end mb-20"
                >
                    <div>
                        <span className="font-display text-xs uppercase tracking-widest text-[var(--color-accent)] mb-4 block">
                            Nos engagements
                        </span>
                        <h2
                            className="font-display text-[var(--color-ink)] leading-tight"
                            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 800 }}
                        >
                            Pourquoi choisir{' '}
                            <span className="text-[var(--color-accent)]">PrintDZ</span> ?
                        </h2>
                    </div>
                    <p className="font-body text-[var(--color-muted)] text-lg leading-relaxed">
                        Nous ne sommes pas qu&apos;un simple imprimeur. Nous sommes votre partenaire
                        créatif pour donner vie à vos projets textiles — avec le professionnalisme
                        que vous méritez.
                    </p>
                </motion.div>

                {/* Features grid */}
                <motion.div
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {features.map((feature) => (
                        <motion.div
                            key={feature.title}
                            variants={cardVariants}
                            className="group relative bg-[var(--color-canvas)] rounded-3xl p-8 border border-[var(--color-border)] hover:border-[var(--color-accent)]/40 hover:shadow-lg transition-all duration-300"
                        >
                            {/* Icon */}
                            <div className="text-4xl mb-5">{feature.icon}</div>

                            <h3
                                className="font-display text-[var(--color-ink)] text-lg mb-3"
                                style={{ fontWeight: 700 }}
                            >
                                {feature.title}
                            </h3>
                            <p className="font-body text-[var(--color-muted)] text-sm leading-relaxed">
                                {feature.description}
                            </p>

                            {/* Hover accent line */}
                            <div className="absolute bottom-0 left-8 right-8 h-0.5 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-warm)] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                        </motion.div>
                    ))}
                </motion.div>

                {/* Trust banner */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="mt-20 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-warm)] rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between gap-6"
                >
                    <div>
                        <h3
                            className="font-display text-white text-2xl mb-2"
                            style={{ fontWeight: 800 }}
                        >
                            Prêt à lancer votre commande ?
                        </h3>
                        <p className="font-body text-white/80">
                            Devis gratuit sous 24h. Aucun engagement.
                        </p>
                    </div>
                    <a
                        href="#order"
                        className="shrink-0 inline-flex items-center gap-2 bg-white text-[var(--color-accent)] font-display px-8 py-4 rounded-full hover:shadow-xl transition-shadow duration-200 text-sm"
                        style={{ fontWeight: 700 }}
                    >
                        Demander un devis
                        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
