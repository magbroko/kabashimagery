import type { LucideIcon } from 'lucide-react'
import { Building2, Calendar, Camera, Heart, Sparkles, Users } from 'lucide-react'

export interface ServiceItem {
  title: string
  description: string
  icon: LucideIcon
}

export const services: readonly ServiceItem[] = [
  {
    title: 'Content Space',
    description:
      'Editorial sets and creative direction for brands that need imagery with intention — polished, on-brief, and ready for campaigns.',
    icon: Sparkles,
  },
  {
    title: 'Portrait',
    description:
      'Timeless portraits with refined lighting and direction — from executive headshots to expressive personal work.',
    icon: Camera,
  },
  {
    title: 'Family & Lifestyle',
    description:
      'Honest, warm documentation of families and everyday luxury — relaxed sessions that still feel elevated.',
    icon: Users,
  },
  {
    title: 'Weddings',
    description:
      'Full-day storytelling with an eye for emotion, detail, and atmosphere — discreet presence, unforgettable images.',
    icon: Heart,
  },
  {
    title: 'Events',
    description:
      'Galas, launches, and milestone celebrations captured with clarity and rhythm.',
    icon: Calendar,
  },
  {
    title: 'Studio',
    description:
      'Controlled lighting and composition for lookbooks, portfolios, and fine-art prints.',
    icon: Building2,
  },
]
