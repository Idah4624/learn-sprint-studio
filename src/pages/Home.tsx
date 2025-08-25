import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Brain, Lightbulb, Target, CheckCircle, Sparkles, BookOpen, FileQuestion } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@/assets/hero-education.jpg";

const Home = () => {
  const [topic, setTopic] = useState("");
  const [level, setLevel] = useState("");
  const [context, setContext] = useState("");
  const [generatedLesson, setGeneratedLesson] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!topic || !level) {
      toast({
        title: "Missing Information",
        description: "Please provide both a topic and difficulty level.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate API call - In a real app, this would connect to Supabase
    setTimeout(() => {
      const mockLesson = {
        id: Date.now(),
        title: `Understanding ${topic}`,
        objectives: [
          `Learn the fundamental concepts of ${topic}`,
          `Apply ${topic} principles to real-world scenarios`,
          `Understand key terminology and definitions`,
        ],
        keyPoints: [
          {
            title: "Definition and Overview",
            content: `${topic} is a fundamental concept that plays a crucial role in understanding...`,
          },
          {
            title: "Key Principles",
            content: `The main principles include several important aspects that help us understand...`,
          },
          {
            title: "Practical Applications",
            content: `In real-world scenarios, ${topic} can be applied in various ways...`,
          },
        ],
        workedExample: {
          title: "Worked Example",
          problem: `Let's work through a practical example of ${topic}...`,
          solution: "Step-by-step solution and explanation...",
        },
        summary: `In this lesson, we covered the essential aspects of ${topic}, including its definition, key principles, and practical applications. Remember to practice these concepts regularly to build your understanding.`,
        level,
        createdAt: new Date().toISOString(),
      };

      setGeneratedLesson(mockLesson);
      setIsGenerating(false);
      
      toast({
        title: "Lesson Generated!",
        description: `Your ${level.toLowerCase()} lesson on ${topic} is ready.`,
      });
    }, 2000);
  };

  const handleCreateQuiz = () => {
    toast({
      title: "Quiz Creation",
      description: "Connect to Supabase to enable quiz generation and storage.",
    });
  };

  const handleCreateFlashcards = () => {
    toast({
      title: "Flashcard Creation", 
      description: "Connect to Supabase to enable flashcard generation and storage.",
    });
  };

  const handleSaveToLibrary = () => {
    toast({
      title: "Save to Library",
      description: "Connect to Supabase to enable lesson saving and user library.",
    });
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Educational learning environment" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background"></div>
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <Sparkles className="h-4 w-4 mr-2" />
                AI-Powered Learning
              </Badge>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Learn Anything,<br />Anytime with EduSprint
            </h1>
            
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
              Generate personalized lessons, interactive quizzes, and smart flashcards instantly. 
              Transform any topic into an engaging learning experience.
            </p>
          </div>
        </div>
      </section>

      {/* Content Generation Form */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-2xl">
          <Card className="card-edu">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl flex items-center justify-center gap-2">
                <Brain className="h-6 w-6 text-primary" />
                Generate Your Lesson
              </CardTitle>
              <CardDescription>
                Enter a topic and we'll create a comprehensive micro-lesson tailored to your level
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="topic">What would you like to learn?</Label>
                <Input
                  id="topic"
                  placeholder="e.g., Photosynthesis, Python Functions, Market Economics..."
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="level">Difficulty Level</Label>
                <Select value={level} onValueChange={setLevel}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Select your level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner - New to the topic</SelectItem>
                    <SelectItem value="intermediate">Intermediate - Some knowledge</SelectItem>
                    <SelectItem value="advanced">Advanced - Deep understanding</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="context">Additional Context (Optional)</Label>
                <Textarea
                  id="context"
                  placeholder="Any specific aspects you'd like to focus on or background information..."
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  className="rounded-xl resize-none"
                  rows={3}
                />
              </div>
            </CardContent>

            <CardFooter>
              <Button 
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full btn-primary"
                size="lg"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Generating Your Lesson...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate Lesson
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Generated Lesson Display */}
      {generatedLesson && (
        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Your Generated Lesson</h2>
              <p className="text-muted-foreground">
                Ready to dive in? Here's your personalized learning content.
              </p>
            </div>

            <div className="space-y-8">
              {/* Lesson Overview */}
              <Card className="card-edu">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl">{generatedLesson.title}</CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-2">
                        <Badge variant="outline">{generatedLesson.level}</Badge>
                        <span>•</span>
                        <span>Generated {new Date(generatedLesson.createdAt).toLocaleDateString()}</span>
                      </CardDescription>
                    </div>
                    <Target className="h-8 w-8 text-primary" />
                  </div>
                </CardHeader>
                
                <CardContent>
                  <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    Learning Objectives
                  </h4>
                  <ul className="space-y-3">
                    {generatedLesson.objectives.map((objective: string, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                        <span>{objective}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Key Points */}
              <Card className="card-edu">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-6 w-6 text-primary" />
                    Key Points
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {generatedLesson.keyPoints.map((point: any, index: number) => (
                    <div key={index}>
                      <h4 className="font-semibold text-lg mb-2">{point.title}</h4>
                      <p className="text-muted-foreground leading-relaxed">{point.content}</p>
                      {index < generatedLesson.keyPoints.length - 1 && (
                        <Separator className="mt-6" />
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Worked Example */}
              <Card className="card-edu">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-6 w-6 text-primary" />
                    {generatedLesson.workedExample.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Problem:</h4>
                    <p className="text-muted-foreground">{generatedLesson.workedExample.problem}</p>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-semibold mb-2">Solution:</h4>
                    <p className="text-muted-foreground">{generatedLesson.workedExample.solution}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Summary */}
              <Card className="card-edu">
                <CardHeader>
                  <CardTitle>Summary</CardTitle>
                </CardHeader>
                
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{generatedLesson.summary}</p>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <Card className="card-edu border-primary/20">
                <CardHeader>
                  <CardTitle className="text-center">Ready to Test Your Knowledge?</CardTitle>
                  <CardDescription className="text-center">
                    Generate interactive content to reinforce your learning
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <Button onClick={handleCreateQuiz} className="btn-primary" size="lg">
                      <FileQuestion className="h-4 w-4 mr-2" />
                      Create Quiz
                    </Button>
                    
                    <Button onClick={handleCreateFlashcards} className="btn-secondary" size="lg">
                      <Brain className="h-4 w-4 mr-2" />
                      Create Flashcards
                    </Button>
                    
                    <Button onClick={handleSaveToLibrary} className="btn-success" size="lg">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Save to Library
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Features Preview */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Everything You Need to Learn Effectively</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From content generation to progress tracking, EduSprint provides a complete learning ecosystem.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="card-edu text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
                  <Brain className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">AI-Generated Lessons</h3>
                <p className="text-muted-foreground">
                  Get comprehensive, structured lessons on any topic in seconds
                </p>
              </CardContent>
            </Card>

            <Card className="card-edu text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-secondary to-primary flex items-center justify-center">
                  <FileQuestion className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Interactive Quizzes</h3>
                <p className="text-muted-foreground">
                  Test your knowledge with auto-generated quizzes and instant feedback
                </p>
              </CardContent>
            </Card>

            <Card className="card-edu text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-accent to-secondary flex items-center justify-center">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Smart Library</h3>
                <p className="text-muted-foreground">
                  Organize and track all your learning materials in one place
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;