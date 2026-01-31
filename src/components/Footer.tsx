import { Github, Linkedin, Twitter, Mail, ArrowUp, Heart } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative pt-16 pb-8 border-t border-border">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-10" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <a href="#" className="text-2xl font-bold gradient-text mb-4 inline-block">
              Shiva
            </a>
            <p className="text-muted-foreground text-sm mb-6 max-w-sm">
              Second-year CS student passionate about AI, machine learning, and building 
              innovative solutions. Let's create something amazing together.
            </p>
            <div className="flex items-center gap-4">
              {[
                { icon: Github, href: 'https://github.com/shiva' },
                { icon: Linkedin, href: 'https://linkedin.com/in/shiva' },
                { icon: Twitter, href: 'https://twitter.com/shiva' },
                { icon: Mail, href: 'mailto:shiva@email.com' },
              ].map(({ icon: Icon, href }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-muted-foreground hover:text-primary transition-colors"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2">
              {[
                { name: 'About', href: '#about' },
                { name: 'Skills', href: '#skills' },
                { name: 'Projects', href: '#projects' },
                { name: 'Experience', href: '#experience' },
                { name: 'Contact', href: '#contact' },
                { name: 'Resume', href: '#' },
              ].map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Built With</h4>
            <div className="flex flex-wrap gap-2">
              {['React', 'TypeScript', 'Tailwind CSS', 'Vite'].map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            © 2026 Shiva. Made with <Heart size={14} className="text-red-400" /> and lots of ☕
          </p>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
          >
            Back to top
            <ArrowUp size={16} className="group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
