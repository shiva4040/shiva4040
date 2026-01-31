import { useState } from 'react';
import { 
  Cpu, Code2, Globe, Wrench, Database, Sparkles,
  ChevronRight
} from 'lucide-react';

const skillCategories = [
  {
    id: 'languages',
    icon: Code2,
    title: 'Programming Languages',
    skills: [
      { name: 'Python', level: 90 },
      { name: 'JavaScript', level: 85 },
      { name: 'TypeScript', level: 80 },
      { name: 'Java', level: 75 },
      { name: 'C++', level: 70 },
    ],
  },
  {
    id: 'aiml',
    icon: Cpu,
    title: 'AI & Machine Learning',
    skills: [
      { name: 'TensorFlow', level: 85 },
      { name: 'PyTorch', level: 80 },
      { name: 'scikit-learn', level: 90 },
      { name: 'Pandas', level: 95 },
      { name: 'NumPy', level: 95 },
    ],
  },
  {
    id: 'web',
    icon: Globe,
    title: 'Web Development',
    skills: [
      { name: 'React', level: 85 },
      { name: 'Node.js', level: 75 },
      { name: 'HTML/CSS', level: 90 },
      { name: 'Tailwind CSS', level: 85 },
      { name: 'Next.js', level: 70 },
    ],
  },
  {
    id: 'tools',
    icon: Wrench,
    title: 'Tools & Platforms',
    skills: [
      { name: 'Git', level: 90 },
      { name: 'Docker', level: 70 },
      { name: 'VS Code', level: 95 },
      { name: 'Jupyter', level: 90 },
      { name: 'Linux', level: 75 },
    ],
  },
  {
    id: 'databases',
    icon: Database,
    title: 'Databases',
    skills: [
      { name: 'PostgreSQL', level: 80 },
      { name: 'MongoDB', level: 75 },
      { name: 'MySQL', level: 80 },
      { name: 'Redis', level: 65 },
    ],
  },
  {
    id: 'learning',
    icon: Sparkles,
    title: 'Currently Learning',
    skills: [
      { name: 'Deep Learning', level: 60 },
      { name: 'NLP', level: 55 },
      { name: 'Computer Vision', level: 50 },
      { name: 'Transformers', level: 45 },
    ],
  },
];

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('languages');

  const activeSkills = skillCategories.find(cat => cat.id === activeCategory)?.skills || [];

  return (
    <section id="skills" className="py-24 relative">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute left-0 top-1/3 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="text-primary font-mono text-sm mb-4 block">{'<Skills />'}</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            My <span className="gradient-text">Tech Stack</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A diverse toolkit built through hands-on projects and continuous learning.
            Always expanding, always improving.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Category Tabs */}
          <div className="lg:col-span-4">
            <div className="glass-card border border-border rounded-xl p-2 space-y-1">
              {skillCategories.map(({ id, icon: Icon, title }) => (
                <button
                  key={id}
                  onClick={() => setActiveCategory(id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-300 ${
                    activeCategory === id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium text-sm">{title}</span>
                  <ChevronRight size={16} className={`ml-auto transition-transform ${activeCategory === id ? 'rotate-90' : ''}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Skills Display */}
          <div className="lg:col-span-8">
            <div className="glass-card border border-border rounded-xl p-6 md:p-8">
              <div className="space-y-6">
                {activeSkills.map((skill, index) => (
                  <div key={skill.name} className="space-y-2" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-foreground">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: `${skill.level}%`,
                          background: 'linear-gradient(90deg, hsl(187 85% 43%) 0%, hsl(270 70% 55%) 100%)',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Stats */}
              <div className="mt-8 pt-6 border-t border-border flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <span>Proficient ({'>'}80%)</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-3 h-3 rounded-full bg-primary/60" />
                  <span>Intermediate (60-80%)</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-3 h-3 rounded-full bg-primary/30" />
                  <span>Learning ({'<'}60%)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
