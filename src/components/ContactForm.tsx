import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Banknote, Mail, MapPin, Send } from 'lucide-react'
import { InstagramIcon } from './icons/InstagramIcon'
import { ICON_STROKE } from '../lib/lucideDefaults'
import { premiumContainer, premiumSectionX } from '../lib/sectionLayout'
import {
  premiumSpring,
  sectionUnfoldContainer,
  sectionUnfoldItem,
} from '../lib/motionPresets'

type FormField = 'name' | 'email' | 'message'

type FieldErrors = Partial<Record<FormField, string>>

type FormState = {
  name: string
  email: string
  phone: string
  message: string
}

const initialForm: FormState = {
  name: '',
  email: '',
  phone: '',
  message: '',
}

function validateField(email: string, name: string, message: string): FieldErrors {
  const errors: FieldErrors = {}
  if (!name.trim()) errors.name = 'Please enter your name.'
  if (!email.trim()) errors.email = 'Please enter your email.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Enter a valid email address.'
  }
  if (!message.trim()) errors.message = 'Tell us a bit about your session.'
  return errors
}

const inputClass =
  'mt-1.5 w-full rounded-xl border border-foreground/[0.08] bg-foreground/[0.04] px-4 py-3 text-foreground placeholder:text-foreground/35 shadow-inner shadow-black/20 transition focus:border-accent-indigo/50 focus:outline-none focus:ring-1 focus:ring-accent-indigo/40'

function ContactHeadingBlock() {
  return (
    <>
      <h2
        id="contact-heading"
        className="font-serif text-3xl tracking-tight text-foreground sm:text-4xl md:text-[2.75rem]"
      >
        Bookings & inquiries
      </h2>
      <p className="mt-5 max-w-md text-pretty text-sm leading-relaxed text-foreground/65 sm:text-base">
        Kabash Imagery Studio crafts refined photography for clients who value discretion, artistry,
        and enduring images — serving Asaba, Lagos, and across Nigeria by appointment.
      </p>
    </>
  )
}

function InvestmentCallout() {
  return (
    <div className="mt-8 max-w-md rounded-2xl p-6 glass-panel">
      <div className="mb-3 inline-flex rounded-xl bg-foreground/[0.06] p-2 text-accent ring-1 ring-foreground/[0.06]">
        <Banknote className="size-5" strokeWidth={ICON_STROKE} aria-hidden />
      </div>
      <h3 className="font-serif text-xl text-foreground">Investment & retainers</h3>
      <p className="mt-2 text-sm font-normal leading-relaxed text-foreground/65">
        Collections and commissions are quoted in{' '}
        <span className="font-normal text-champagne">Naira (₦)</span> with clear deliverables. Share
        your date and vision — we&apos;ll reply with availability and a tailored estimate.
      </p>
    </div>
  )
}

function ContactMetaList() {
  return (
    <ul className="mt-10 space-y-7 pb-14 text-sm text-foreground/75 md:pb-10">
      <li className="flex gap-3">
        <MapPin
          className="mt-0.5 size-5 shrink-0 text-accent"
          strokeWidth={ICON_STROKE}
          aria-hidden
        />
        <div>
          <p className="font-medium text-foreground">Location</p>
          <p>Osubi, Delta State, Nigeria</p>
        </div>
      </li>
      <li className="flex gap-3">
        <Mail
          className="mt-0.5 size-5 shrink-0 text-accent"
          strokeWidth={ICON_STROKE}
          aria-hidden
        />
        <div>
          <p className="font-medium text-foreground">Email</p>
          <a
            href="mailto:hello@kabashimagery.com"
            className="underline-offset-4 transition hover:text-accent-bright hover:underline"
          >
            hello@kabashimagery.com
          </a>
        </div>
      </li>
      <li className="flex gap-3">
        <InstagramIcon className="mt-0.5 size-5 shrink-0 text-accent" />
        <div>
          <p className="font-medium text-foreground">Social</p>
          <a
            href="https://instagram.com/kabashimagery"
            target="_blank"
            rel="noreferrer"
            className="underline-offset-4 transition hover:text-accent-bright hover:underline"
          >
            @kabashimagery
          </a>
        </div>
      </li>
    </ul>
  )
}

type InquiryFormFieldsProps = {
  form: FormState
  errors: FieldErrors
  onChange: (patch: Partial<FormState>) => void
}

function InquiryFormFields({ form, errors, onChange }: InquiryFormFieldsProps) {
  return (
    <>
      <div>
        <label htmlFor="name" className="text-sm text-foreground/70">
          Name
        </label>
        <input
          id="name"
          name="name"
          autoComplete="name"
          value={form.name}
          onChange={(e) => onChange({ name: e.target.value })}
          className={inputClass}
          placeholder="Your full name"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name && (
          <p id="name-error" className="mt-1 text-sm text-red-400/95">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="text-sm text-foreground/70">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={(e) => onChange({ email: e.target.value })}
          className={inputClass}
          placeholder="you@example.com"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <p id="email-error" className="mt-1 text-sm text-red-400/95">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="text-sm text-foreground/70">
          Phone <span className="text-foreground/45">(optional)</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          value={form.phone}
          onChange={(e) => onChange({ phone: e.target.value })}
          className={inputClass}
          placeholder="+234 …"
        />
      </div>

      <div>
        <label htmlFor="message" className="text-sm text-foreground/70">
          Project details
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={form.message}
          onChange={(e) => onChange({ message: e.target.value })}
          className={`${inputClass} resize-y`}
          placeholder="Date, occasion, city, and what you envision."
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message && (
          <p id="message-error" className="mt-1 text-sm text-red-400/95">
            {errors.message}
          </p>
        )}
      </div>
    </>
  )
}

type InquiryFormPanelProps = {
  submitted: boolean
  form: FormState
  errors: FieldErrors
  onFieldChange: (patch: Partial<FormState>) => void
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
}

function InquiryFormPanel({
  submitted,
  form,
  errors,
  onFieldChange,
  onSubmit,
}: InquiryFormPanelProps) {
  if (submitted) {
    return (
      <p className="text-center text-foreground/90" role="status">
        Thank you — we&apos;ll respond shortly with availability and next steps.
      </p>
    )
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate aria-label="Booking inquiry form">
      <InquiryFormFields form={form} errors={errors} onChange={onFieldChange} />
      <motion.button
        type="submit"
        whileHover={{ y: -3, rotateX: 5, scale: 1.015 }}
        transition={premiumSpring}
        style={{ transformPerspective: 900, transformStyle: 'preserve-3d' }}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-bright px-6 py-3.5 text-sm font-semibold text-background shadow-lg shadow-black/30 transition-colors hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-indigo"
      >
        <Send className="size-4" strokeWidth={ICON_STROKE} aria-hidden />
        Send inquiry
      </motion.button>
    </form>
  )
}

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialForm)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [submitted, setSubmitted] = useState(false)

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const next = validateField(form.email, form.name, form.message)
    setErrors(next)
    if (Object.keys(next).length > 0) return
    setSubmitted(true)
  }

  const patchForm = (patch: Partial<FormState>) => {
    setForm((f) => ({ ...f, ...patch }))
  }

  return (
    <section
      id="contact"
      className={`scroll-mt-28 ${premiumSectionX} pt-12 pb-36 sm:pt-14 sm:pb-40 md:pt-16 md:pb-40`}
      aria-labelledby="contact-heading"
      style={{ perspective: '1400px' }}
    >
      <motion.div
        variants={sectionUnfoldContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2, margin: '-40px' }}
        className={`${premiumContainer} grid gap-14 [transform-style:preserve-3d] lg:grid-cols-2 lg:gap-20`}
      >
        <motion.div
          variants={sectionUnfoldItem}
          className="min-w-0 [transform-style:preserve-3d] lg:max-w-none"
        >
          <ContactHeadingBlock />
          <InvestmentCallout />
          <ContactMetaList />
        </motion.div>

        <motion.div
          variants={sectionUnfoldItem}
          className="glass-panel rounded-3xl p-6 [transform-style:preserve-3d] md:p-9"
        >
          <InquiryFormPanel
            submitted={submitted}
            form={form}
            errors={errors}
            onFieldChange={patchForm}
            onSubmit={onSubmit}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
