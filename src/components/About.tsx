import { Code2, Brain, Rocket, Coffee } from 'lucide-react';

const highlights = [
  { icon: Code2, label: 'Lines of Code', value: '50K+' },
  { icon: Brain, label: 'ML Projects', value: '10+' },
  { icon: Rocket, label: 'Hackathons', value: '5+' },
  { icon: Coffee, label: 'Cups of Coffee', value: '∞' },
];

const About = () => {
  return (
    <section id="about" className="py-24 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 dot-pattern opacity-30" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image/Avatar Section */}
          <div className="relative order-2 lg:order-1">
            <div className="relative max-w-md mx-auto">
              {/* Gradient Border Container */}
              <div className="gradient-border rounded-2xl p-1">
                <div className="relative aspect-square rounded-2xl overflow-hidden glass-card">
                  {/* Placeholder Avatar - Replace with actual image */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <div className="text-8xl font-bold gradient-text">S</div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 px-4 py-2 rounded-lg glass-card border border-primary/30 animate-float">
                <span className="text-sm font-medium text-primary">AI/ML</span>
              </div>
              <div className="absolute -bottom-4 -left-4 px-4 py-2 rounded-lg glass-card border border-secondary/30 animate-float" style={{ animationDelay: '1s' }}>
                <span className="text-sm font-medium text-secondary">React</span>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div className="order-1 lg:order-2">
            <span className="text-primary font-mono text-sm mb-4 block">{'<About />'}</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Turning <span className="gradient-text">Ideas</span> into
              <br />
              Intelligent Solutions
            </h2>
            
            <div className="space-y-4 text-muted-foreground mb-8">
              <p>
                I'm a second-year Computer Science student with an insatiable curiosity for 
                artificial intelligence and machine learning. My journey in tech started with 
                simple "Hello World" programs, and now I'm building neural networks that can 
                understand and generate human language.
              </p>
              <p>
                When I'm not training models or debugging code, you'll find me exploring the 
                latest research papers, contributing to open-source projects, or experimenting 
                with new technologies. I believe in learning by building, and every project 
                is an opportunity to push my boundaries.
              </p>
              <p>
                My goal? To create AI systems that make a positive impact on the world while 
                continuously growing as a developer and researcher.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {highlights.map(({ icon: Icon, label, value }) => (
                <div key={label} className="p-4 rounded-xl glass-card border border-border text-center group hover:border-primary/50 transition-all duration-300">
                  <Icon className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold text-foreground">{value}</div>
                  <div className="text-xs text-muted-foreground">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
