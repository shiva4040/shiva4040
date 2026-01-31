import { GraduationCap, Briefcase, Award, Trophy } from 'lucide-react';

const education = {
  university: 'University of Technology',
  degree: 'Bachelor of Science in Computer Science',
  period: '2023 - 2027 (Expected)',
  status: 'Second Year',
  gpa: '3.8/4.0',
  coursework: [
    'Data Structures & Algorithms',
    'Machine Learning',
    'Database Systems',
    'Computer Networks',
    'Operating Systems',
    'Software Engineering',
  ],
};

const experiences = [
  {
    title: 'Machine Learning Intern',
    company: 'Tech Startup Inc.',
    period: 'Summer 2025',
    description: 'Developed ML models for customer behavior prediction. Improved model accuracy by 15% through feature engineering.',
    type: 'internship',
  },
  {
    title: 'Open Source Contributor',
    company: 'Various Projects',
    period: '2024 - Present',
    description: 'Contributing to popular ML libraries and frameworks. Fixed bugs, improved documentation, and added features.',
    type: 'contribution',
  },
  {
    title: 'AI/ML Club Lead',
    company: 'University Tech Club',
    period: '2024 - Present',
    description: 'Leading workshops and study groups on AI/ML topics. Organized hackathons with 100+ participants.',
    type: 'leadership',
  },
];

const achievements = [
  { icon: Trophy, title: 'Hackathon Winner', description: 'First place at University Tech Fest 2024' },
  { icon: Award, title: "Dean's List", description: 'Academic excellence recognition' },
  { icon: Award, title: 'LeetCode 500+', description: 'Solved 500+ coding problems' },
];

const certifications = [
  'Deep Learning Specialization - Coursera',
  'TensorFlow Developer Certificate',
  'AWS Cloud Practitioner',
  'Git & GitHub Professional Certificate',
];

const Experience = () => {
  return (
    <section id="experience" className="py-24 relative">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute left-1/4 top-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="text-primary font-mono text-sm mb-4 block">{'<Experience />'}</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Education & <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My academic journey and professional experiences that have shaped my skills.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Education & Experience Timeline */}
          <div className="space-y-8">
            {/* Education Card */}
            <div className="glass-card border border-border rounded-xl p-6 md:p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-lg bg-primary/10 text-primary">
                  <GraduationCap size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">Education</h3>
                  <p className="text-sm text-muted-foreground">{education.status}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground">{education.university}</h4>
                  <p className="text-muted-foreground text-sm">{education.degree}</p>
                  <p className="text-primary text-sm">{education.period}</p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">GPA:</span>
                  <span className="font-semibold text-foreground">{education.gpa}</span>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Relevant Coursework:</p>
                  <div className="flex flex-wrap gap-2">
                    {education.coursework.map((course) => (
                      <span
                        key={course}
                        className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Experience Timeline */}
            <div className="glass-card border border-border rounded-xl p-6 md:p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-lg bg-secondary/10 text-secondary">
                  <Briefcase size={24} />
                </div>
                <h3 className="text-xl font-bold text-foreground">Experience</h3>
              </div>

              <div className="space-y-6">
                {experiences.map((exp, index) => (
                  <div key={index} className="relative pl-6 border-l-2 border-border last:border-transparent">
                    <div className="absolute left-0 top-0 w-3 h-3 -translate-x-[7px] rounded-full bg-primary" />
                    <div className="pb-6">
                      <h4 className="font-semibold text-foreground">{exp.title}</h4>
                      <p className="text-sm text-primary">{exp.company}</p>
                      <p className="text-xs text-muted-foreground mb-2">{exp.period}</p>
                      <p className="text-sm text-muted-foreground">{exp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Achievements & Certifications */}
          <div className="space-y-8">
            {/* Achievements */}
            <div className="glass-card border border-border rounded-xl p-6 md:p-8">
              <h3 className="text-xl font-bold text-foreground mb-6">Achievements</h3>
              <div className="space-y-4">
                {achievements.map((achievement, index) => {
                  const Icon = achievement.icon;
                  return (
                    <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-muted/30 border border-border">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        <Icon size={20} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{achievement.title}</h4>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Certifications */}
            <div className="glass-card border border-border rounded-xl p-6 md:p-8">
              <h3 className="text-xl font-bold text-foreground mb-6">Certifications</h3>
              <div className="space-y-3">
                {certifications.map((cert, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-primary/50 transition-all duration-300"
                  >
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-sm text-foreground">{cert}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Fun Fact */}
            <div className="gradient-border rounded-xl">
              <div className="glass-card rounded-xl p-6 text-center">
                <p className="text-lg font-medium text-foreground mb-2">Fun Fact</p>
                <p className="text-muted-foreground text-sm">
                  I've written more Python code than English essays. 
                  My terminal has more themes than my wardrobe has colors. 🚀
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
