import { ExternalLink, Github, Brain, Globe, Eye, BarChart3, Gamepad2 } from 'lucide-react';

const projects = [
  {
    id: 1,
    icon: Brain,
    title: 'Sentiment Analysis Model',
    description: 'Built a deep learning model that analyzes text sentiment with 94% accuracy. Uses LSTM networks and attention mechanisms to understand context and nuance in social media posts.',
    image: null,
    technologies: ['Python', 'TensorFlow', 'NLTK', 'Flask'],
    features: ['Real-time analysis', 'Multi-language support', 'API endpoint'],
    github: 'https://github.com/shiva/sentiment-analysis',
    demo: 'https://sentiment-demo.vercel.app',
    featured: true,
  },
  {
    id: 2,
    icon: Globe,
    title: 'Task Management App',
    description: 'Full-stack productivity application with real-time collaboration features. Includes drag-and-drop boards, team workspaces, and intelligent task prioritization.',
    image: null,
    technologies: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
    features: ['Real-time sync', 'Team collaboration', 'Dark mode'],
    github: 'https://github.com/shiva/taskflow',
    demo: 'https://taskflow-demo.vercel.app',
    featured: true,
  },
  {
    id: 3,
    icon: Eye,
    title: 'Object Detection System',
    description: 'Real-time object detection system using YOLOv8. Optimized for edge devices with custom training on a specialized dataset for autonomous navigation.',
    image: null,
    technologies: ['Python', 'OpenCV', 'YOLO', 'PyTorch'],
    features: ['30+ FPS', 'Custom training', 'Edge deployment'],
    github: 'https://github.com/shiva/object-detection',
    demo: null,
    featured: false,
  },
  {
    id: 4,
    icon: BarChart3,
    title: 'Predictive Analytics Dashboard',
    description: 'Interactive data visualization platform with ML-powered forecasting. Built for analyzing sales data with trend prediction and anomaly detection.',
    image: null,
    technologies: ['Python', 'Pandas', 'scikit-learn', 'Plotly'],
    features: ['Time-series forecasting', 'Interactive charts', 'Export reports'],
    github: 'https://github.com/shiva/analytics-dashboard',
    demo: 'https://analytics-demo.vercel.app',
    featured: false,
  },
  {
    id: 5,
    icon: Gamepad2,
    title: 'AI Game Bot',
    description: 'Reinforcement learning agent that masters classic arcade games. Trained using Deep Q-Networks to achieve superhuman performance in multiple environments.',
    image: null,
    technologies: ['Python', 'PyTorch', 'Gym', 'NumPy'],
    features: ['Self-learning', 'Multiple games', 'Visualization'],
    github: 'https://github.com/shiva/game-ai',
    demo: null,
    featured: false,
  },
];

const Projects = () => {
  return (
    <section id="projects" className="py-24 relative">
      {/* Background */}
      <div className="absolute inset-0 dot-pattern opacity-20" />
      <div className="absolute right-0 bottom-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute left-0 top-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="text-primary font-mono text-sm mb-4 block">{'<Projects />'}</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="gradient-text">Work</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A collection of projects that showcase my skills in AI, machine learning, 
            and full-stack development. Each one represents a unique challenge conquered.
          </p>
        </div>

        {/* Featured Projects */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {projects.filter(p => p.featured).map((project) => (
            <ProjectCard key={project.id} project={project} featured />
          ))}
        </div>

        {/* Other Projects */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.filter(p => !p.featured).map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* View More */}
        <div className="text-center mt-12">
          <a
            href="https://github.com/shiva"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg glass-card border border-border font-medium transition-all duration-300 hover:border-primary/50"
          >
            <Github size={18} />
            View More on GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

interface ProjectCardProps {
  project: typeof projects[0];
  featured?: boolean;
}

const ProjectCard = ({ project, featured = false }: ProjectCardProps) => {
  const Icon = project.icon;

  return (
    <div
      className={`group relative glass-card border border-border rounded-xl overflow-hidden transition-all duration-500 hover:border-primary/50 hover:shadow-lg ${
        featured ? 'p-6 md:p-8' : 'p-6'
      }`}
    >
      {/* Gradient Overlay on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-lg bg-primary/10 text-primary ${featured ? 'p-4' : 'p-3'}`}>
            <Icon size={featured ? 28 : 24} />
          </div>
          <div className="flex items-center gap-2">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
              >
                <Github size={18} />
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-muted/50 transition-all"
              >
                <ExternalLink size={18} />
              </a>
            )}
          </div>
        </div>

        {/* Content */}
        <h3 className={`font-bold text-foreground mb-2 ${featured ? 'text-2xl' : 'text-xl'}`}>
          {project.title}
        </h3>
        <p className={`text-muted-foreground mb-4 ${featured ? 'text-base' : 'text-sm'}`}>
          {project.description}
        </p>

        {/* Features */}
        {featured && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.features.map((feature) => (
              <span
                key={feature}
                className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary"
              >
                {feature}
              </span>
            ))}
          </div>
        )}

        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="text-xs font-mono px-2 py-1 rounded bg-muted text-muted-foreground"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
