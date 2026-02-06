import { useState } from 'react';
import { Send, Mail, MapPin, Github, Linkedin, Twitter, Copy, Check } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('shiva@email.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-24 relative">
      {/* Background */}
      <div className="absolute inset-0 dot-pattern opacity-20" />
      <div className="absolute right-1/4 bottom-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      <div className="absolute left-0 top-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="text-primary font-mono text-sm mb-4 block">{'<Contact />'}</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or just want to chat about AI? 
            I'm always excited to meet new people and discuss innovative ideas.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="glass-card border border-border rounded-xl p-6 md:p-8">
              <h3 className="text-xl font-bold text-foreground mb-6">Get in Touch</h3>
              
              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary">
                    <Mail size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="text-foreground font-medium">shiva@email.com</p>
                  </div>
                  <button
                    onClick={copyEmail}
                    className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-muted/50 transition-all"
                    title="Copy email"
                  >
                    {copied ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
                  </button>
                </div>

                {/* Location */}
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-secondary/10 text-secondary">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="text-foreground font-medium">Delhi, India</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="glass-card border border-border rounded-xl p-6 md:p-8">
              <h3 className="text-xl font-bold text-foreground mb-6">Follow Me</h3>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { icon: Github, label: 'GitHub', href: 'https://github.com/shiva4040', color: 'hover:text-foreground' },
                  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/', color: 'hover:text-blue-400' },
                  { icon: Twitter, label: 'Twitter', href: 'https://twitter.com/', color: 'hover:text-sky-400' },
                ].map(({ icon: Icon, label, href, color }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex flex-col items-center gap-2 p-4 rounded-lg border border-border text-muted-foreground transition-all duration-300 hover:border-primary/50 ${color}`}
                  >
                    <Icon size={24} />
                    <span className="text-sm">{label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="gradient-border rounded-xl">
              <div className="glass-card rounded-xl p-6 text-center">
                <p className="text-lg font-semibold text-foreground mb-2">
                  Let's build something amazing together 🚀
                </p>
                <p className="text-sm text-muted-foreground">
                  Open for internships, collaborations, and exciting projects.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass-card border border-border rounded-xl p-6 md:p-8">
            <h3 className="text-xl font-bold text-foreground mb-6">Send a Message</h3>
            
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-green-400/20 flex items-center justify-center mb-4">
                  <Check size={32} className="text-green-400" />
                </div>
                <h4 className="text-xl font-semibold text-foreground mb-2">Message Sent!</h4>
                <p className="text-muted-foreground">Thanks for reaching out. I'll get back to you soon!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                    placeholder="Project Collaboration"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                    placeholder="Tell me about your project or just say hi..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-lg bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:opacity-90 disabled:opacity-50 glow-effect"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
