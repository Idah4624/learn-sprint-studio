import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle, XCircle, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Quiz = () => {
  const { id } = useParams();
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const { toast } = useToast();

  // Mock quiz data - in real app, would fetch from Supabase
  const quiz = {
    id,
    title: "Photosynthesis Quiz",
    description: "Test your understanding of photosynthesis",
    questions: [
      {
        id: "q1",
        type: "multiple-choice",
        question: "What is the primary pigment involved in photosynthesis?",
        options: ["Chlorophyll", "Carotene", "Anthocyanin", "Melanin"],
        correctAnswer: "Chlorophyll",
        explanation: "Chlorophyll is the green pigment that absorbs light energy for photosynthesis.",
      },
      {
        id: "q2", 
        type: "multiple-choice",
        question: "In which part of the plant cell does photosynthesis occur?",
        options: ["Nucleus", "Mitochondria", "Chloroplast", "Ribosome"],
        correctAnswer: "Chloroplast",
        explanation: "Chloroplasts contain chlorophyll and are the site of photosynthesis.",
      },
      {
        id: "q3",
        type: "short-answer",
        question: "What gas is released as a byproduct of photosynthesis?",
        correctAnswer: "Oxygen",
        explanation: "Oxygen is released when water molecules are split during photosynthesis.",
      },
    ],
  };

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length < quiz.questions.length) {
      toast({
        title: "Incomplete Quiz",
        description: "Please answer all questions before submitting.",
        variant: "destructive",
      });
      return;
    }

    // Calculate score
    let correct = 0;
    quiz.questions.forEach(question => {
      if (answers[question.id]?.toLowerCase().trim() === question.correctAnswer.toLowerCase()) {
        correct++;
      }
    });

    setScore((correct / quiz.questions.length) * 100);
    setShowResults(true);
    
    toast({
      title: "Quiz Completed!",
      description: `You scored ${correct}/${quiz.questions.length} correct answers.`,
    });
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="container mx-auto py-8 px-4 max-w-3xl">
        <div className="mb-8">
          <Link 
            to="/dashboard" 
            className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">{quiz.title}</h1>
              <p className="text-muted-foreground">{quiz.description}</p>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{quiz.questions.length} questions</span>
            </div>
          </div>
        </div>

        {!showResults ? (
          <div className="space-y-6">
            {quiz.questions.map((question, index) => (
              <Card key={question.id} className="card-edu">
                <CardHeader>
                  <CardTitle className="text-lg">
                    <Badge variant="outline" className="mr-3">
                      {index + 1}
                    </Badge>
                    {question.question}
                  </CardTitle>
                </CardHeader>
                
                <CardContent>
                  {question.type === "multiple-choice" ? (
                    <RadioGroup
                      value={answers[question.id] || ""}
                      onValueChange={(value) => handleAnswerChange(question.id, value)}
                    >
                      <div className="space-y-3">
                        {question.options?.map((option) => (
                          <div key={option} className="flex items-center space-x-2">
                            <RadioGroupItem value={option} id={`${question.id}-${option}`} />
                            <Label 
                              htmlFor={`${question.id}-${option}`}
                              className="flex-1 cursor-pointer"
                            >
                              {option}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  ) : (
                    <Input
                      placeholder="Type your answer here..."
                      value={answers[question.id] || ""}
                      onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                      className="rounded-xl"
                    />
                  )}
                </CardContent>
              </Card>
            ))}

            <Button 
              onClick={handleSubmit}
              className="w-full btn-primary"
              size="lg"
            >
              Submit Quiz
            </Button>
          </div>
        ) : (
          <Card className="card-edu">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl flex items-center justify-center gap-2">
                {score >= 70 ? (
                  <CheckCircle className="h-8 w-8 text-accent" />
                ) : (
                  <XCircle className="h-8 w-8 text-destructive" />
                )}
                Quiz Results
              </CardTitle>
              <div className="text-4xl font-bold mt-4">
                {Math.round(score)}%
              </div>
              <p className="text-muted-foreground">
                You got {quiz.questions.filter(q => answers[q.id]?.toLowerCase().trim() === q.correctAnswer.toLowerCase()).length} out of {quiz.questions.length} questions correct
              </p>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <h3 className="text-lg font-semibold">Answer Review</h3>
              
              {quiz.questions.map((question, index) => {
                const userAnswer = answers[question.id];
                const isCorrect = userAnswer?.toLowerCase().trim() === question.correctAnswer.toLowerCase();
                
                return (
                  <div key={question.id} className="border rounded-xl p-4">
                    <div className="flex items-start gap-3 mb-2">
                      {isCorrect ? (
                        <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <p className="font-medium mb-2">{question.question}</p>
                        <div className="text-sm space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground">Your answer:</span>
                            <span className={isCorrect ? "text-accent" : "text-destructive"}>
                              {userAnswer || "No answer"}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground">Correct answer:</span>
                            <span className="text-accent">{question.correctAnswer}</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">
                          {question.explanation}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
              
              <div className="flex gap-4 pt-4">
                <Button 
                  onClick={() => {
                    setShowResults(false);
                    setAnswers({});
                    setScore(0);
                  }}
                  variant="outline"
                  className="flex-1"
                >
                  Retake Quiz
                </Button>
                <Button className="flex-1 btn-primary">
                  Continue Learning
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Quiz;