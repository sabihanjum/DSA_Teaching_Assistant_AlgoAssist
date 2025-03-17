
import React from 'react';
import FadeIn from '@/components/animations/FadeIn';
import { BarChart2, BookOpen, Code, Compass, Cpu, Layers, Lightbulb, Zap } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay }) => (
  <FadeIn delay={delay}>
    <Card className="h-full border border-border/50 bg-background/50 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:bg-background/80">
      <CardHeader className="pb-2">
        <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-primary/5 text-primary mb-4">
          {icon}
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-muted-foreground text-base">{description}</CardDescription>
      </CardContent>
    </Card>
  </FadeIn>
);

const Features: React.FC = () => {
  const features = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Interactive Learning",
      description: "Explore DSA concepts through interactive visualizations and step-by-step explanations tailored to your learning style."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Real-time Feedback",
      description: "Get instant feedback on your solutions to help identify mistakes and improve your problem-solving skills."
    },
    {
      icon: <Layers className="w-6 h-6" />,
      title: "Comprehensive Library",
      description: "Access a vast collection of data structures and algorithms with detailed explanations and implementation examples."
    },
    {
      icon: <Cpu className="w-6 h-6" />,
      title: "Algorithm Visualizer",
      description: "Watch algorithms in action with animated visualizations to understand how they work under the hood."
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "Practice Problems",
      description: "Solve curated problems from easy to hard, categorized by topics and companies to prepare for technical interviews."
    },
    {
      icon: <BarChart2 className="w-6 h-6" />,
      title: "Performance Tracking",
      description: "Monitor your progress with detailed analytics to identify strengths and areas that need improvement."
    },
    {
      icon: <Compass className="w-6 h-6" />,
      title: "Learning Paths",
      description: "Follow structured learning paths designed to guide you from basics to advanced topics in a logical progression."
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Interview Prep",
      description: "Prepare for technical interviews with mock interviews, commonly asked questions, and pattern recognition strategies."
    },
  ];

  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Everything you need to master DSA
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
              Comprehensive tools and resources designed to help you understand complex algorithms and ace technical interviews.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={100 + index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
