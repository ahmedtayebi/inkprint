import { z } from 'zod';

const algerianPhoneRegex = /^(\+213|0)(5|6|7)\d{8}$/;

export const orderSchema = z.object({
    fullName: z
        .string()
        .min(3, 'Le nom complet doit comporter au moins 3 caractères')
        .max(80, 'Le nom est trop long'),

    phone: z
        .string()
        .regex(algerianPhoneRegex, 'Numéro de téléphone algérien invalide (ex: 0555123456)'),

    wilaya: z
        .string()
        .min(1, 'Veuillez sélectionner une wilaya')
        .regex(/^\d{2}$/, 'Code wilaya invalide'),

    commune: z
        .string()
        .min(2, 'La commune est requise')
        .max(100, 'Commune trop longue'),

    quantity: z
        .number()
        .int('La quantité doit être un nombre entier')
        .min(10, 'La commande minimum est de 10 pièces')
        .max(10000, 'Contactez-nous pour les commandes de plus de 10 000 pièces'),

    sizes: z
        .array(z.enum(['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL']))
        .min(1, 'Sélectionnez au moins une taille'),

    color: z.enum(['blanc', 'noir', 'gris', 'bleu marine', 'rouge', 'autre']),

    technique: z.enum(['DTF', 'Sérigraphie', 'Broderie', 'Sublimation']),

    designDescription: z
        .string()
        .min(10, 'Décrivez votre design en au moins 10 caractères')
        .max(1000, 'La description est trop longue'),

    hasDesignFile: z.boolean(),

    notes: z.string().max(500, 'Les notes sont trop longues').optional(),
});

export type OrderSchema = z.infer<typeof orderSchema>;
