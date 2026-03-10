'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
    { label: 'Comment ça marche', href: '#how-it-works' },
    { label: 'Galerie', href: '#gallery' },
    { label: 'Pourquoi nous', href: '#why-us' },
    { label: 'Commander', href: '#order' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <>
            <motion.header
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                        ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-[var(--color-border)]'
                        : 'bg-transparent'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <span className="w-8 h-8 rounded-md flex items-center justify-center bg-[var(--color-accent)] text-white font-bold text-sm font-display">
                            P
                        </span>
                        <span
                            className="font-display font-800 text-xl tracking-tight text-[var(--color-ink)] group-hover:text-[var(--color-accent)] transition-colors"
                            style={{ fontWeight: 800 }}
                        >
                            Print<span className="text-[var(--color-accent)]">DZ</span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="font-body text-sm text-[var(--color-muted)] hover:text-[var(--color-ink)] transition-colors duration-200 relative group"
                            >
                                {link.label}
                                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-[var(--color-accent)] group-hover:w-full transition-all duration-300" />
                            </a>
                        ))}
                    </nav>

                    {/* CTA */}
                    <div className="hidden md:block">
                        <a
                            href="#order"
                            className="inline-flex items-center gap-2 bg-[var(--color-accent)] text-white font-display font-700 text-sm px-5 py-2.5 rounded-full hover:bg-[var(--color-accent-warm)] transition-colors duration-200 shadow-md shadow-red-100"
                        >
                            Commander maintenant
                        </a>
                    </div>

                    {/* Mobile hamburger */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="md:hidden flex flex-col gap-1.5 p-2"
                        aria-label="Toggle menu"
                    >
                        <motion.span
                            animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }}
                            className="w-5 h-0.5 bg-[var(--color-ink)] block origin-center transition-all"
                        />
                        <motion.span
                            animate={{ opacity: menuOpen ? 0 : 1 }}
                            className="w-5 h-0.5 bg-[var(--color-ink)] block"
                        />
                        <motion.span
                            animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }}
                            className="w-5 h-0.5 bg-[var(--color-ink)] block origin-center"
                        />
                    </button>
                </div>
            </motion.header>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        key="mobile-menu"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-x-0 top-16 z-40 bg-white border-b border-[var(--color-border)] shadow-lg md:hidden"
                    >
                        <nav className="flex flex-col px-6 py-6 gap-5">
                            {navLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMenuOpen(false)}
                                    className="font-display text-lg text-[var(--color-ink)] hover:text-[var(--color-accent)] transition-colors"
                                >
                                    {link.label}
                                </a>
                            ))}
                            <a
                                href="#order"
                                onClick={() => setMenuOpen(false)}
                                className="mt-2 inline-flex items-center justify-center bg-[var(--color-accent)] text-white font-display font-700 text-sm px-5 py-3 rounded-full"
                            >
                                Commander maintenant
                            </a>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
