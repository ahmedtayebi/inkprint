'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import Image from 'next/image';

const categories = ['Tous', 'DTF', 'Sérigraphie', 'Broderie', 'Sublimation'];

const items = [
    { id: 1, title: 'Team Startup Alger', category: 'DTF', technique: 'DTF haute définition', seed: 'tshirt-dtf-1' },
    { id: 2, title: 'Sport Club Oran', category: 'Sérigraphie', technique: 'Sérigraphie 4 couleurs', seed: 'serigraphie-sport' },
    { id: 3, title: 'Brand Lifestyle', category: 'Broderie', technique: 'Broderie 3D relief', seed: 'broderie-brand' },
    { id: 4, title: 'Festival Constantine', category: 'DTF', technique: 'DTF all-over', seed: 'festival-tshirt' },
    { id: 5, title: 'Entreprise Corporate', category: 'Broderie', technique: 'Logo brodé', seed: 'corporate-broderie' },
    { id: 6, title: 'Association Culturelle', category: 'Sérigraphie', technique: 'Sérigraphie 2 couleurs', seed: 'association-seri' },
    { id: 7, title: 'Collection Été 2025', category: 'Sublimation', technique: 'Sublimation full-couleur', seed: 'sublimation-ete' },
    { id: 8, title: 'Club Moto DZ', category: 'DTF', technique: 'DTF + finition mate', seed: 'moto-club-dtf' },
    { id: 9, title: 'École Privée Annaba', category: 'Broderie', technique: 'Broderie patch', seed: 'ecole-broderie' },
];

// Picsum seeds for consistent beautiful images
const picsumSeeds: Record<string, number> = {
    'tshirt-dtf-1': 10,
    'serigraphie-sport': 20,
    'broderie-brand': 30,
    'festival-tshirt': 40,
    'corporate-broderie': 50,
    'association-seri': 60,
    'sublimation-ete': 70,
    'moto-club-dtf': 80,
    'ecole-broderie': 90,
};

const categoryColors: Record<string, string> = {
    DTF: 'var(--color-accent)',
    Sérigraphie: 'var(--color-accent-warm)',
    Broderie: '#6366F1',
    Sublimation: '#10B981',
};

export default function GallerySection() {
    const [active, setActive] = useState('Tous');
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });

    const filtered = active === 'Tous' ? items : items.filter((i) => i.category === active);

    return (
        <section id="gallery" className="py-28 bg-[var(--color-canvas)]">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <span className="font-display text-xs uppercase tracking-widest text-[var(--color-accent)] mb-4 block">
                        Nos réalisations
                    </span>
                    <h2
                        className="font-display text-[var(--color-ink)] mb-4 leading-tight"
                        style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 800 }}
                    >
                        Ce que nous créons
                    </h2>
                    <p className="font-body text-[var(--color-muted)] max-w-xl mx-auto">
                        Des centaines de commandes livrées à travers toute l&apos;Alg&eacute;rie — voici quelques exemples.
                    </p>
                </motion.div>

                {/* Filter tabs */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActive(cat)}
                            className={`font-display text-sm px-5 py-2 rounded-full border transition-all duration-200 ${active === cat
                                    ? 'bg-[var(--color-accent)] text-white border-[var(--color-accent)] shadow-md'
                                    : 'bg-transparent text-[var(--color-muted)] border-[var(--color-border)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <motion.div
                    ref={ref}
                    layout
                    className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {filtered.map((item, i) => (
                        <motion.div
                            key={item.id}
                            layout
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={inView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                            className="group relative bg-[var(--color-surface)] rounded-3xl overflow-hidden border border-[var(--color-border)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                        >
                            {/* Image */}
                            <div className="relative h-56 bg-gray-100 overflow-hidden">
                                <Image
                                    src={`https://picsum.photos/seed/${picsumSeeds[item.seed]}/600/400`}
                                    alt={item.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                {/* Category badge */}
                                <div
                                    className="absolute top-4 left-4 px-3 py-1 rounded-full text-white text-xs font-display font-700"
                                    style={{ background: categoryColors[item.category] || 'var(--color-accent)', fontWeight: 700 }}
                                >
                                    {item.category}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-5">
                                <h3 className="font-display text-[var(--color-ink)] font-700 mb-1" style={{ fontWeight: 700 }}>
                                    {item.title}
                                </h3>
                                <p className="font-body text-sm text-[var(--color-muted)]">{item.technique}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Bottom note */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="text-center font-body text-sm text-[var(--color-muted)] mt-12"
                >
                    Et bien d&apos;autres… Contactez-nous pour voir plus de réalisations selon votre secteur.
                </motion.p>
            </div>
        </section>
    );
}
