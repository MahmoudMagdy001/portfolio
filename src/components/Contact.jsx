import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, ArrowUpRight, CheckCircle, Loader2 } from 'lucide-react';
import { SiGithub, SiWhatsapp } from 'react-icons/si';
import { FaLinkedin } from 'react-icons/fa';

const socialLinks = [
  {
    label: 'Email',
    value: 'mahmodmansour2001@gmail.com',
    href: 'mailto:mahmodmansour2001@gmail.com',
    Icon: Mail,
    color: '#6366f1',
    bg: 'rgba(99,102,241,0.08)',
    border: 'rgba(99,102,241,0.2)',
  },
  {
    label: 'LinkedIn',
    value: 'mahmoud-magdy-mansour',
    href: 'https://linkedin.com/in/mahmoud-magdy-mansour',
    Icon: FaLinkedin,
    color: '#0ea5e9',
    bg: 'rgba(14,165,233,0.08)',
    border: 'rgba(14,165,233,0.2)',
  },
  {
    label: 'GitHub',
    value: 'MahmoudMagdy001',
    href: 'https://github.com/MahmoudMagdy001',
    Icon: SiGithub,
    color: '#f1f5f9',
    bg: 'rgba(241,245,249,0.06)',
    border: 'rgba(241,245,249,0.12)',
  },
  {
    label: 'WhatsApp',
    value: '+20 155 579 8495',
    href: 'https://wa.me/201555798495',
    Icon: SiWhatsapp,
    color: '#10b981',
    bg: 'rgba(16,185,129,0.08)',
    border: 'rgba(16,185,129,0.2)',
  },
];

const EMPTY_FORM = { name: '', email: '', subject: '', message: '' };

const Contact = () => {
  const [formState, setFormState] = useState(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) =>
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const { name, email, subject, message } = formState;

    // Client-side validation
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Please fill in all required fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);

    // Simulate a brief loading state for a polished UX feel
    setTimeout(() => {
      try {
        const text = `*New Portfolio Message*\n\n*Name:* ${name.trim()}\n*Email:* ${email.trim()}\n*Subject:* ${subject.trim() || 'No Subject'}\n*Message:* ${message.trim()}`;
        const whatsappUrl = `https://wa.me/201555798495?text=${encodeURIComponent(text)}`;
        
        // Open WhatsApp in a new tab
        window.open(whatsappUrl, '_blank');
        
        setSubmitted(true);
        setFormState(EMPTY_FORM);
      } catch (err) {
        setError('Something went wrong. Please try again or reach me via email.');
      } finally {
        setLoading(false);
      }
    }, 800);
  };

  return (
    <section id="contact" className="relative bg-transparent pt-24 pb-2 overflow-hidden">
      {/* Background */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-primary/8 rounded-full blur-[150px] pointer-events-none" aria-hidden="true" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" aria-hidden="true" />

      <div className="container-safe relative z-10 flex flex-col gap-1">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p className="chapter-label mb-1 text-xs tracking-widest text-primary/80 uppercase font-mono">Chapter 09 — Contact</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-1.5 leading-tight">
            Let's build something <span className="gradient-text">amazing together.</span>
          </h2>
          <p className="text-slate-400 text-xs md:text-sm max-w-lg mx-auto font-light">
            Ready to transform your vision into a cinematic mobile experience? Let's start the conversation.
          </p>
        </motion.div>

        {/* Grid Content */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-start xl:px-16 my-auto">
          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="space-y-3"
          >
            <h3 className="text-lg font-bold text-white mb-2">Connect with me</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {socialLinks.map((link, i) => (
                <motion.a
                  key={i}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-3 p-3 rounded-lg transition-all duration-300 group"
                  style={{ background: link.bg, border: `1px solid ${link.border}` }}
                >
                  <div
                    className="w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `${link.color}15`, border: `1px solid ${link.color}30` }}
                  >
                    <link.Icon size={16} style={{ color: link.color }} aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[8px] text-slate-500 uppercase tracking-widest mb-0.5 font-mono">{link.label}</p>
                    <p className="text-white text-[11px] font-medium truncate">{link.value}</p>
                  </div>
                  <ArrowUpRight size={12} className="text-slate-600 group-hover:text-white transition-colors flex-shrink-0" aria-hidden="true" />
                </motion.a>
              ))}
            </div>

            {/* Availability badge */}
            <div className="flex items-center gap-2.5 p-3 rounded-lg glass border border-emerald-500/20 w-full">
              <div className="relative" aria-hidden="true">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <div className="absolute inset-0 w-2 h-2 rounded-full bg-emerald-400 animate-ping opacity-50" />
              </div>
              <div>
                <p className="text-emerald-400 font-semibold text-xs">Available for new projects</p>
                <p className="text-slate-500 text-[10px]">Usually responds within 24 hours</p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card rounded-xl p-8 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', bounce: 0.5, delay: 0.1 }}
                >
                  <CheckCircle size={40} className="text-emerald-400 mx-auto mb-3" aria-hidden="true" />
                </motion.div>
                <h4 className="text-lg font-bold text-white mb-1">Message Sent!</h4>
                <p className="text-slate-400 text-xs">Thanks for reaching out. I'll get back to you within 24 hours.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="glass-card rounded-xl p-5 space-y-3 relative overflow-hidden" noValidate>
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" aria-hidden="true" />

                <h3 className="text-base font-bold text-white">Send a message</h3>

                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="contact-name" className="block text-[9px] font-mono uppercase tracking-widest text-slate-500 mb-1">Your Name</label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      required
                      className="form-input py-2 px-3 text-xs rounded-md"
                      placeholder="John Doe"
                      value={formState.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-[9px] font-mono uppercase tracking-widest text-slate-500 mb-1">Email</label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      required
                      className="form-input py-2 px-3 text-xs rounded-md"
                      placeholder="john@example.com"
                      value={formState.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-subject" className="block text-[9px] font-mono uppercase tracking-widest text-slate-500 mb-1">Subject</label>
                  <input
                    id="contact-subject"
                    type="text"
                    name="subject"
                    className="form-input py-2 px-3 text-xs rounded-md"
                    placeholder="Let's build something together"
                    value={formState.subject}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-[9px] font-mono uppercase tracking-widest text-slate-500 mb-1">Message</label>
                  <textarea
                    id="contact-message"
                    rows={2}
                    name="message"
                    required
                    className="form-input py-2 px-3 text-xs rounded-md resize-none"
                    placeholder="Tell me about your project, timeline, and goals..."
                    value={formState.message}
                    onChange={handleChange}
                  />
                </div>

                {error && (
                  <p className="text-red-400 text-[10px] font-mono">{error}</p>
                )}

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={loading ? {} : { scale: 1.01, boxShadow: '0 0 20px rgba(99,102,241,0.3)' }}
                  whileTap={loading ? {} : { scale: 0.99 }}
                  className="w-full py-2.5 bg-primary text-white rounded-md font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-primary/10 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <><Loader2 size={14} className="animate-spin" aria-hidden="true" /> Sending…</>
                  ) : (
                    <>Send Message <Send size={14} aria-hidden="true" /></>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="pt-3 mt-4 border-t border-white/5 text-center px-4"
        >
          <div className="mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 max-w-6xl">
            <p className="text-slate-600 text-[10px] font-mono">
              © 2026 Mahmoud Magdy Mansour. Crafted with Flutter-level precision.
            </p>
            <div className="flex items-center gap-1.5 text-slate-600 text-[10px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
              <span>Open to work</span>
            </div>
            <div className="flex items-center gap-3">
              <a href="https://github.com/MahmoudMagdy001" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-white transition-colors" aria-label="GitHub">
                <SiGithub size={14} aria-hidden="true" />
              </a>
              <a href="https://linkedin.com/in/mahmoud-magdy-mansour" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-white transition-colors" aria-label="LinkedIn">
                <FaLinkedin size={14} aria-hidden="true" />
              </a>
              <a href="mailto:mahmodmansour2001@gmail.com" className="text-slate-600 hover:text-white transition-colors" aria-label="Email">
                <Mail size={14} aria-hidden="true" />
              </a>
            </div>
          </div>
        </motion.footer>
      </div>
    </section>
  );
};

export default Contact;
