'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { orderSchema, OrderSchema } from '@/lib/validations';
import { wilayaOptions } from '@/lib/wilayas';

const techniques = ['DTF', 'Sérigraphie', 'Broderie', 'Sublimation'] as const;
const colors = ['blanc', 'noir', 'gris', 'bleu marine', 'rouge', 'autre'] as const;
const sizes = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'] as const;

const techniqueInfo: Record<string, string> = {
    DTF: 'Idéal pour photos, dégradés & couleurs multiples. Dès 10 pièces.',
    Sérigraphie: 'Parfait pour 1–4 couleurs plates, grands tirages. Durable.',
    Broderie: 'Aspect luxueux, relief 3D. Pour logos, emblèmes.',
    Sublimation: 'Full-couleur sur tissu blanc 100% polyester.',
};

function FormField({
    label,
    error,
    children,
    required,
}: {
    label: string;
    error?: string;
    children: React.ReactNode;
    required?: boolean;
}) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="font-display text-sm text-[var(--color-ink)]" style={{ fontWeight: 600 }}>
                {label} {required && <span className="text-[var(--color-accent)]">*</span>}
            </label>
            {children}
            <AnimatePresence>
                {error && (
                    <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        className="font-body text-xs text-[var(--color-accent)] flex items-center gap-1"
                    >
                        <span>⚠</span> {error}
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    );
}

const inputClass =
    'w-full font-body text-sm bg-[var(--color-canvas)] border border-[var(--color-border)] rounded-xl px-4 py-3 text-[var(--color-ink)] placeholder:text-gray-400 focus:outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/10 transition-all duration-200';

export default function OrderForm() {
    const [submitted, setSubmitted] = useState(false);
    const [selectedTechnique, setSelectedTechnique] = useState<string>('DTF');

    const {
        register,
        handleSubmit,
        control,
        setValue,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<OrderSchema>({
        resolver: zodResolver(orderSchema),
        defaultValues: {
            technique: 'DTF',
            sizes: [],
            hasDesignFile: false,
            quantity: 10,
        },
    });

    const watchedSizes = watch('sizes');

    const toggleSize = (size: (typeof sizes)[number]) => {
        const current = watchedSizes || [];
        const updated = current.includes(size)
            ? current.filter((s) => s !== size)
            : [...current, size];
        setValue('sizes', updated, { shouldValidate: true });
    };

    const onSubmit = async (data: OrderSchema) => {
        // Simulate API call
        await new Promise((r) => setTimeout(r, 1200));
        console.log('Order submitted:', data);
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <section id="order" className="py-28 bg-[var(--color-canvas)]">
                <div className="max-w-2xl mx-auto px-6 text-center">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    >
                        <div className="text-7xl mb-6">🎉</div>
                        <h2 className="font-display text-4xl text-[var(--color-ink)] mb-4" style={{ fontWeight: 800 }}>
                            Commande reçue !
                        </h2>
                        <p className="font-body text-[var(--color-muted)] text-lg mb-8 leading-relaxed">
                            Merci pour votre commande. Notre équipe vous contactera sous{' '}
                            <strong className="text-[var(--color-ink)]">24 heures</strong> pour valider
                            les détails et vous envoyer votre devis.
                        </p>
                        <button
                            onClick={() => setSubmitted(false)}
                            className="font-display text-sm px-6 py-3 border border-[var(--color-border)] rounded-full hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
                        >
                            Passer une autre commande
                        </button>
                    </motion.div>
                </div>
            </section>
        );
    }

    return (
        <section id="order" className="py-28 bg-[var(--color-canvas)]">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="font-display text-xs uppercase tracking-widest text-[var(--color-accent)] mb-4 block">
                        Formulaire de commande
                    </span>
                    <h2
                        className="font-display text-[var(--color-ink)] mb-4 leading-tight"
                        style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 800 }}
                    >
                        Passez votre commande
                    </h2>
                    <p className="font-body text-[var(--color-muted)] max-w-xl mx-auto">
                        Remplissez ce formulaire et nous vous enverrons un devis détaillé sous 24h.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-10">
                    {/* Form */}
                    <motion.form
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        onSubmit={handleSubmit(onSubmit)}
                        className="lg:col-span-2 bg-[var(--color-surface)] rounded-3xl border border-[var(--color-border)] p-8 flex flex-col gap-7"
                    >
                        {/* Personal info */}
                        <div>
                            <h3 className="font-display text-[var(--color-ink)] text-base mb-5 pb-3 border-b border-[var(--color-border)]" style={{ fontWeight: 700 }}>
                                📋 Informations personnelles
                            </h3>
                            <div className="grid md:grid-cols-2 gap-5">
                                <FormField label="Nom complet" error={errors.fullName?.message} required>
                                    <input
                                        {...register('fullName')}
                                        placeholder="Ahmed Benali"
                                        className={inputClass}
                                    />
                                </FormField>
                                <FormField label="Numéro de téléphone" error={errors.phone?.message} required>
                                    <input
                                        {...register('phone')}
                                        placeholder="0555 123 456"
                                        type="tel"
                                        className={inputClass}
                                    />
                                </FormField>
                                <FormField label="Wilaya" error={errors.wilaya?.message} required>
                                    <select {...register('wilaya')} className={inputClass}>
                                        <option value="">— Sélectionner une wilaya —</option>
                                        {wilayaOptions.map((w) => (
                                            <option key={w.value} value={w.value}>
                                                {w.label}
                                            </option>
                                        ))}
                                    </select>
                                </FormField>
                                <FormField label="Commune / Ville" error={errors.commune?.message} required>
                                    <input
                                        {...register('commune')}
                                        placeholder="Bab Ezzouar"
                                        className={inputClass}
                                    />
                                </FormField>
                            </div>
                        </div>

                        {/* Technique */}
                        <div>
                            <h3 className="font-display text-[var(--color-ink)] text-base mb-5 pb-3 border-b border-[var(--color-border)]" style={{ fontWeight: 700 }}>
                                🎨 Technique d&apos;impression
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                                {techniques.map((t) => (
                                    <Controller
                                        key={t}
                                        name="technique"
                                        control={control}
                                        render={({ field }) => (
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    field.onChange(t);
                                                    setSelectedTechnique(t);
                                                }}
                                                className={`py-3 px-2 rounded-xl border text-sm font-display transition-all duration-200 ${field.value === t
                                                    ? 'bg-[var(--color-accent)] text-white border-[var(--color-accent)] shadow-md'
                                                    : 'bg-transparent text-[var(--color-muted)] border-[var(--color-border)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]'
                                                    }`}
                                                style={{ fontWeight: field.value === t ? 700 : 400 }}
                                            >
                                                {t}
                                            </button>
                                        )}
                                    />
                                ))}
                            </div>
                            <AnimatePresence mode="wait">
                                <motion.p
                                    key={selectedTechnique}
                                    initial={{ opacity: 0, y: 4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -4 }}
                                    className="font-body text-xs text-[var(--color-muted)] bg-[var(--color-canvas)] rounded-xl px-4 py-3 border border-[var(--color-border)]"
                                >
                                    ℹ️ {techniqueInfo[selectedTechnique]}
                                </motion.p>
                            </AnimatePresence>
                        </div>

                        {/* Order details */}
                        <div>
                            <h3 className="font-display text-[var(--color-ink)] text-base mb-5 pb-3 border-b border-[var(--color-border)]" style={{ fontWeight: 700 }}>
                                📦 Détails de la commande
                            </h3>
                            <div className="grid md:grid-cols-2 gap-5">
                                <FormField label="Quantité (min. 10 pièces)" error={errors.quantity?.message} required>
                                    <input
                                        {...register('quantity', { valueAsNumber: true })}
                                        type="number"
                                        min={10}
                                        placeholder="50"
                                        className={inputClass}
                                    />
                                </FormField>
                                <FormField label="Couleur de t-shirt" error={errors.color?.message} required>
                                    <select {...register('color')} className={inputClass}>
                                        <option value="">— Sélectionner —</option>
                                        {colors.map((c) => (
                                            <option key={c} value={c}>
                                                {c.charAt(0).toUpperCase() + c.slice(1)}
                                            </option>
                                        ))}
                                    </select>
                                </FormField>
                            </div>

                            {/* Sizes */}
                            <div className="mt-5">
                                <FormField label="Tailles souhaitées" error={errors.sizes?.message} required>
                                    <div className="flex flex-wrap gap-2 mt-1">
                                        {sizes.map((size) => (
                                            <button
                                                key={size}
                                                type="button"
                                                onClick={() => toggleSize(size)}
                                                className={`px-4 py-2 rounded-lg border text-sm font-display transition-all duration-200 ${(watchedSizes || []).includes(size)
                                                    ? 'bg-[var(--color-accent)] text-white border-[var(--color-accent)]'
                                                    : 'bg-transparent text-[var(--color-muted)] border-[var(--color-border)] hover:border-[var(--color-accent)]'
                                                    }`}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </FormField>
                            </div>
                        </div>

                        {/* Design */}
                        <div>
                            <h3 className="font-display text-[var(--color-ink)] text-base mb-5 pb-3 border-b border-[var(--color-border)]" style={{ fontWeight: 700 }}>
                                🖼️ Votre design
                            </h3>
                            <div className="flex flex-col gap-5">
                                <FormField label="Description du design" error={errors.designDescription?.message} required>
                                    <textarea
                                        {...register('designDescription')}
                                        rows={4}
                                        placeholder="Décrivez votre design : couleurs, texte, emplacement (poitrine, dos, manche)…"
                                        className={`${inputClass} resize-none`}
                                    />
                                </FormField>

                                <Controller
                                    name="hasDesignFile"
                                    control={control}
                                    render={({ field }) => (
                                        <label className="flex items-center gap-3 cursor-pointer group">
                                            <div
                                                onClick={() => field.onChange(!field.value)}
                                                className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${field.value
                                                    ? 'bg-[var(--color-accent)] border-[var(--color-accent)]'
                                                    : 'border-[var(--color-border)] group-hover:border-[var(--color-accent)]'
                                                    }`}
                                            >
                                                {field.value && (
                                                    <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                                                        <path d="M1 5L4.5 8.5L11 1.5" stroke="white" strokeWidth={2} strokeLinecap="round" />
                                                    </svg>
                                                )}
                                            </div>
                                            <span className="font-body text-sm text-[var(--color-ink)]">
                                                J&apos;ai un fichier de design (PNG, AI, PDF, SVG)
                                            </span>
                                        </label>
                                    )}
                                />

                                <FormField label="Notes supplémentaires" error={errors.notes?.message}>
                                    <textarea
                                        {...register('notes')}
                                        rows={3}
                                        placeholder="Délai souhaité, contraintes particulières, questions…"
                                        className={`${inputClass} resize-none`}
                                    />
                                </FormField>
                            </div>
                        </div>

                        {/* Submit */}
                        <motion.button
                            type="submit"
                            disabled={isSubmitting}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full bg-[var(--color-accent)] text-white font-display py-4 rounded-2xl hover:bg-[var(--color-accent-warm)] transition-colors duration-200 text-base shadow-lg disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                            style={{ fontWeight: 700 }}
                        >
                            {isSubmitting ? (
                                <>
                                    <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={3} strokeDasharray="31.4" strokeDashoffset="10" strokeLinecap="round" />
                                    </svg>
                                    Envoi en cours…
                                </>
                            ) : (
                                <>
                                    Envoyer ma demande
                                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </>
                            )}
                        </motion.button>
                    </motion.form>

                    {/* Sidebar */}
                    <motion.aside
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="flex flex-col gap-6"
                    >
                        {/* WhatsApp CTA */}
                        <div className="bg-[#25D366] rounded-3xl p-6 text-white">
                            <p className="font-display text-lg mb-2" style={{ fontWeight: 700 }}>
                                💬 Préférez WhatsApp ?
                            </p>
                            <p className="font-body text-sm text-white/80 mb-4 leading-relaxed">
                                Envoyez-nous directement votre design et posez vos questions.
                            </p>
                            <a
                                href="https://wa.me/213XXXXXXXXX?text=Bonjour%20PrintDZ%2C%20je%20voudrais%20passer%20une%20commande"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-white text-[#25D366] font-display text-sm px-5 py-2.5 rounded-full hover:shadow-lg transition-shadow"
                                style={{ fontWeight: 700 }}
                            >
                                Contacter sur WhatsApp
                            </a>
                        </div>

                        {/* Process recap */}
                        <div className="bg-[var(--color-surface)] rounded-3xl border border-[var(--color-border)] p-6">
                            <p className="font-display text-[var(--color-ink)] text-sm mb-5 pb-3 border-b border-[var(--color-border)]" style={{ fontWeight: 700 }}>
                                📋 Ce qui se passe ensuite
                            </p>
                            {[
                                { step: '1', text: 'Nous recevons votre demande' },
                                { step: '2', text: 'Devis envoyé sous 24h' },
                                { step: '3', text: 'Vous validez le bon à tirer' },
                                { step: '4', text: 'Production & livraison' },
                            ].map(({ step, text }) => (
                                <div key={step} className="flex items-center gap-3 mb-4 last:mb-0">
                                    <span className="w-7 h-7 rounded-full bg-[var(--color-accent)] text-white text-xs font-display flex items-center justify-center shrink-0" style={{ fontWeight: 700 }}>
                                        {step}
                                    </span>
                                    <p className="font-body text-sm text-[var(--color-muted)]">{text}</p>
                                </div>
                            ))}
                        </div>

                        {/* Minimum order */}
                        <div className="bg-[var(--color-canvas)] rounded-3xl border border-[var(--color-border)] p-6">
                            <p className="font-display text-[var(--color-ink)] text-sm mb-4" style={{ fontWeight: 700 }}>
                                ℹ️ À savoir
                            </p>
                            <ul className="font-body text-sm text-[var(--color-muted)] space-y-2.5">
                                <li className="flex items-start gap-2"><span className="text-[var(--color-accent)] mt-0.5">•</span>Commande minimum : <strong className="text-[var(--color-ink)]">10 pièces</strong></li>
                                <li className="flex items-start gap-2"><span className="text-[var(--color-accent)] mt-0.5">•</span>Délai production : <strong className="text-[var(--color-ink)]">5–10 jours</strong></li>
                                <li className="flex items-start gap-2"><span className="text-[var(--color-accent)] mt-0.5">•</span>Livraison dans les <strong className="text-[var(--color-ink)]">58 wilayas</strong></li>
                                <li className="flex items-start gap-2"><span className="text-[var(--color-accent)] mt-0.5">•</span>Formats acceptés : <strong className="text-[var(--color-ink)]">PNG, AI, PDF, SVG</strong></li>
                            </ul>
                        </div>
                    </motion.aside>
                </div>
            </div>
        </section>
    );
}
