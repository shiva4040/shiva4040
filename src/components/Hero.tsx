import { ArrowDown, Github, Linkedin, Twitter, Mail } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-background">
        {/* Grid Pattern */}
        <div className="absolute inset-0 grid-pattern opacity-40" />
        
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-primary/30 mb-8 opacity-0 animate-fade-in">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm text-muted-foreground">Open to opportunities</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 opacity-0 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Hi, I'm{' '}
            <span className="gradient-text">Shiva</span>
          </h1>

          {/* Tagline */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-4 opacity-0 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            CS Student • AI/ML Enthusiast • Tech Explorer
          </p>

          {/* Description */}
          <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto mb-10 opacity-0 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            Passionate about building intelligent systems and exploring the frontiers of machine learning. 
            Transforming ideas into code, one algorithm at a time.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 opacity-0 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <a
              href="#projects"
              className="px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold transition-all duration-300 hover:opacity-90 glow-effect w-full sm:w-auto"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="px-8 py-4 rounded-lg glass-card border border-border font-semibold transition-all duration-300 hover:border-primary/50 w-full sm:w-auto"
            >
              Contact Me
            </a>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-6 opacity-0 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            {[
              { icon: Github, href: 'https://github.com/shiva', label: 'GitHub' },
              { icon: Linkedin, href: 'https://linkedin.com/in/shiva', label: 'LinkedIn' },
              { icon: Twitter, href: 'https://twitter.com/shiva', label: 'Twitter' },
              { icon: Mail, href: 'mailto:shiva@email.com', label: 'Email' },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg glass-card border border-border text-muted-foreground transition-all duration-300 hover:text-primary hover:border-primary/50 hover:scale-110"
                aria-label={label}
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <a
            href="#about"
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <span className="text-sm">Scroll Down</span>
            <ArrowDown size={20} className="animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
