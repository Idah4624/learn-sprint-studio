import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Download, FileText, Target, Lightbulb, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Lesson = () => {
  const { id } = useParams();
  const { toast } = useToast();

  // Mock lesson data - in real app, would fetch from Supabase
  const lesson = {
    id,
    title: "Understanding Photosynthesis",
    level: "Intermediate",
    createdAt: "2024-01-15",
    objectives: [
      "Understand the process of photosynthesis",
      "Identify the key components involved",
      "Explain the chemical equation",
    ],
    keyPoints: [
      {
        title: "What is Photosynthesis?",
        content: "Photosynthesis is the process by which plants convert light energy into chemical energy...",
      },
      {
        title: "Key Components",
        content: "The main components include chlorophyll, carbon dioxide, water, and sunlight...",
      },
    ],
    summary: "Photosynthesis is essential for life on Earth, converting solar energy into usable chemical energy.",
  };

  const handleExport = (type: string) => {
    toast({
      title: `Export as ${type}`,
      description: "Connect to Supabase to enable PDF and CSV export functionality.",
    });
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="container mx-auto py-8 px-4 max-w-4xl">
        <div className="mb-8">
          <Link 
            to="/dashboard" 
            className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
          
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">{lesson.title}</h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <Badge variant="outline">{lesson.level}</Badge>
                <span>Created: {lesson.createdAt}</span>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleExport("PDF")}
              >
                <FileText className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleExport("CSV")}
              >
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Learning Objectives */}
          <Card className="card-edu">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-6 w-6 text-primary" />
                Learning Objectives
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {lesson.objectives.map((objective, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary shrink-0 mt-2"></div>
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
              {lesson.keyPoints.map((point, index) => (
                <div key={index}>
                  <h4 className="font-semibold text-lg mb-2">{point.title}</h4>
                  <p className="text-muted-foreground leading-relaxed">{point.content}</p>
                  {index < lesson.keyPoints.length - 1 && (
                    <Separator className="mt-6" />
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="card-edu">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-primary" />
                Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{lesson.summary}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Lesson;