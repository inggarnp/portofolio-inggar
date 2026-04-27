'use client'

import { useState } from 'react'
import { ScrollReveal } from './ScrollReveal'

interface ContactForm {
  name: string
  email: string
  message: string
}

const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/inggarnp',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/inggarnp',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
]

const contactInfo = [
  {
    label: 'Email',
    value: 'inggarnp30@gmail.com',
    href: 'mailto:your-email@gmail.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
  {
    label: 'Location',
    value: 'West Java, Indonesia',
    href: null,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
  },
]

function FloatingInput({
  type = 'text',
  name,
  label,
  value,
  onChange,
  required,
}: {
  type?: string
  name: string
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
}) {
  const [focused, setFocused] = useState(false)
  const isActive = focused || value.length > 0

  return (
    <div className="relative group">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        className="peer w-full px-4 pt-6 pb-2 bg-[#0d1424] text-[#e5e7eb] rounded-xl border border-[#1f2937] outline-none transition-all duration-300 text-sm"
        style={{
          boxShadow: focused ? '0 0 0 1px #9ca3af33, 0 0 20px #9ca3af15' : 'none',
          borderColor: focused ? '#9ca3af88' : '',
        }}
      />
      <label
        className="absolute left-4 pointer-events-none transition-all duration-200 text-[#9ca3af]"
        style={{
          top: isActive ? '8px' : '50%',
          transform: isActive ? 'translateY(0)' : 'translateY(-50%)',
          fontSize: isActive ? '11px' : '14px',
          letterSpacing: isActive ? '0.05em' : '0',
          textTransform: isActive ? 'uppercase' : 'none',
        }}
      >
        {label}
      </label>
    </div>
  )
}

function FloatingTextarea({
  name,
  label,
  value,
  onChange,
  required,
}: {
  name: string
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  required?: boolean
}) {
  const [focused, setFocused] = useState(false)
  const isActive = focused || value.length > 0

  return (
    <div className="relative group">
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        rows={5}
        className="peer w-full px-4 pt-7 pb-2 bg-[#0d1424] text-[#e5e7eb] rounded-xl border border-[#1f2937] outline-none transition-all duration-300 resize-none text-sm"
        style={{
          boxShadow: focused ? '0 0 0 1px #9ca3af33, 0 0 20px #9ca3af15' : 'none',
          borderColor: focused ? '#9ca3af88' : '',
        }}
      />
      <label
        className="absolute left-4 pointer-events-none transition-all duration-200 text-[#9ca3af]"
        style={{
          top: isActive ? '10px' : '18px',
          fontSize: isActive ? '11px' : '14px',
          letterSpacing: isActive ? '0.05em' : '0',
          textTransform: isActive ? 'uppercase' : 'none',
        }}
      >
        {label}
      </label>
    </div>
  )
}

export default function Contact() {
  const [form, setForm] = useState<ContactForm>({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    // Placeholder - integrate dengan email service seperti Resend atau EmailJS
    setTimeout(() => {
      console.log('Form submitted:', form)
      setLoading(false)
      setSubmitted(true)
      setForm({ name: '', email: '', message: '' })
      setTimeout(() => setSubmitted(false), 3500)
    }, 800)
  }

  return (
    <section id="contact" className="relative py-24 px-6 md:px-12 lg:px-20 bg-[#020617] overflow-hidden">

      {/* Dot grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #1f293760 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
        }}
      />

      {/* Ambient glow top-left */}
      <div
        className="absolute -top-40 -left-40 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, #9ca3af0d 0%, transparent 70%)' }}
      />

      {/* Ambient glow bottom-right */}
      <div
        className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, #9ca3af0d 0%, transparent 70%)' }}
      />

      <div className="relative max-w-5xl mx-auto">

        {/* Header */}
        <ScrollReveal>
          <div className="mb-16">
            {/* Available badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#1f2937] bg-[#0d1424] mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-xs text-[#9ca3af] tracking-wider uppercase font-medium">
                Available for work
              </span>
            </div>

            <h2 className="text-5xl md:text-6xl font-bold text-[#e5e7eb] leading-tight tracking-tight mb-4">
              Get In{' '}
              <span
                style={{
                  WebkitTextStroke: '1px #9ca3af88',
                  color: 'transparent',
                }}
              >
                Touch
              </span>
            </h2>
            <p className="text-[#9ca3af] text-lg max-w-md">
              Ada pertanyaan atau ingin berkolaborasi? Jangan ragu untuk hubungi saya.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-5 gap-8 items-start">

          {/* Form — takes 3 cols */}
          <ScrollReveal delay={100} className="lg:col-span-3">
            <div
              className="relative rounded-2xl p-8"
              style={{
                background: 'linear-gradient(135deg, #0d1424 0%, #111827 100%)',
                border: '1px solid #1f2937',
                boxShadow: '0 25px 50px #00000060',
              }}
            >
              {/* Corner decoration */}
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-tr-2xl rounded-bl-full pointer-events-none"
                style={{ background: 'radial-gradient(circle at top right, #9ca3af08 0%, transparent 60%)' }}
              />

              <form onSubmit={handleSubmit} className="space-y-4 relative">
                <FloatingInput
                  name="name"
                  label="Nama Kamu"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
                <FloatingInput
                  type="email"
                  name="email"
                  label="Email Kamu"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
                <FloatingTextarea
                  name="message"
                  label="Pesan Kamu"
                  value={form.message}
                  onChange={handleChange}
                  required
                />

                <button
                  type="submit"
                  disabled={loading || submitted}
                  className="relative w-full py-3.5 rounded-xl font-semibold text-sm tracking-wide overflow-hidden transition-all duration-300 disabled:opacity-70 group"
                  style={{
                    background: submitted
                      ? 'linear-gradient(135deg, #10b981, #059669)'
                      : 'linear-gradient(135deg, #e5e7eb 0%, #9ca3af 100%)',
                    color: '#020617',
                    boxShadow: submitted
                      ? '0 0 20px #10b98133'
                      : '0 0 20px #9ca3af20',
                  }}
                >
                  <span className="relative flex items-center justify-center gap-2">
                    {loading && (
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                    )}
                    {submitted ? (
                      <>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        Pesan Terkirim!
                      </>
                    ) : loading ? 'Mengirim...' : (
                      <>
                        Kirim Pesan
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 transition-transform group-hover:translate-x-1">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12h12m0 0l-4-4m4 4l-4 4" />
                        </svg>
                      </>
                    )}
                  </span>
                </button>
              </form>
            </div>
          </ScrollReveal>

          {/* Info panel — takes 2 cols */}
          <ScrollReveal delay={200} className="lg:col-span-2">
            <div className="space-y-4">

              {/* Contact info cards */}
              {contactInfo.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-4 p-5 rounded-2xl transition-all duration-300"
                  style={{
                    background: '#0d1424',
                    border: '1px solid #1f2937',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = '#9ca3af44'
                    ;(e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 24px #00000040'
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = '#1f2937'
                    ;(e.currentTarget as HTMLDivElement).style.boxShadow = 'none'
                  }}
                >
                  <div
                    className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-[#9ca3af]"
                    style={{ background: '#1f2937' }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs text-[#9ca3af] uppercase tracking-widest mb-0.5">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-[#e5e7eb] text-sm font-medium hover:text-white transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-[#e5e7eb] text-sm font-medium">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}

              {/* Social links */}
              <div
                className="p-5 rounded-2xl"
                style={{ background: '#0d1424', border: '1px solid #1f2937' }}
              >
                <p className="text-xs text-[#9ca3af] uppercase tracking-widest mb-4">Socials</p>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      className="flex-1 py-3 rounded-xl flex items-center justify-center text-[#9ca3af] transition-all duration-300 group"
                      style={{ background: '#111827', border: '1px solid #1f2937' }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLAnchorElement).style.background = '#1f2937'
                        ;(e.currentTarget as HTMLAnchorElement).style.borderColor = '#9ca3af44'
                        ;(e.currentTarget as HTMLAnchorElement).style.color = '#e5e7eb'
                        ;(e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 16px #9ca3af15'
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLAnchorElement).style.background = '#111827'
                        ;(e.currentTarget as HTMLAnchorElement).style.borderColor = '#1f2937'
                        ;(e.currentTarget as HTMLAnchorElement).style.color = '#9ca3af'
                        ;(e.currentTarget as HTMLAnchorElement).style.boxShadow = 'none'
                      }}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* Response time note */}
              <p className="text-xs text-[#9ca3af66] text-center pt-1 tracking-wide">
                Biasanya balas dalam{' '}
                <span className="text-[#9ca3af]">24 jam</span>
              </p>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  )
}