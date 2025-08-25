import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  Brain, 
  FileQuestion, 
  TrendingUp, 
  Calendar,
  Clock,
  Target,
  Plus
} from "lucide-react";

const Dashboard = () => {
  // Mock data - in real app, would fetch from Supabase user's data
  const recentLessons = [
    {
      id: "1",
      title: "Understanding Photosynthesis",
      level: "Intermediate",
      createdAt: "2024-01-15",
      progress: 100,
    },
    {
      id: "2", 
      title: "Python Functions",
      level: "Beginner",
      createdAt: "2024-01-14",
      progress: 75,
    },
    {
      id: "3",
      title: "Market Economics Basics",
      level: "Advanced",
      createdAt: "2024-01-13",
      progress: 50,
    },
  ];

  const recentQuizzes = [
    {
      id: "1",
      title: "Photosynthesis Quiz",
      score: 85,
      completedAt: "2024-01-15",
      questionsTotal: 10,
    },
    {
      id: "2",
      title: "Python Functions Quiz", 
      score: 92,
      completedAt: "2024-01-14",
      questionsTotal: 8,
    },
  ];

  const flashcardSets = [
    {
      id: "1",
      title: "Photosynthesis Key Terms",
      totalCards: 15,
      masteredCards: 12,
      lastStudied: "2024-01-15",
    },
    {
      id: "2",
      title: "Python Vocabulary",
      totalCards: 20,
      masteredCards: 8,
      lastStudied: "2024-01-14",
    },
  ];

  const weeklyProgress = [
    { day: "Mon", lessons: 2, quizzes: 1 },
    { day: "Tue", lessons: 1, quizzes: 2 },
    { day: "Wed", lessons: 3, quizzes: 1 },
    { day: "Thu", lessons: 1, quizzes: 0 },
    { day: "Fri", lessons: 2, quizzes: 2 },
    { day: "Sat", lessons: 1, quizzes: 1 },
    { day: "Sun", lessons: 0, quizzes: 0 },
  ];

  const totalLessons = recentLessons.length;
  const totalQuizzes = recentQuizzes.length;
  const averageScore = recentQuizzes.reduce((acc, quiz) => acc + quiz.score, 0) / recentQuizzes.length;

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Your Learning Dashboard</h1>
            <p className="text-muted-foreground">Track your progress and continue learning</p>
          </div>
          
          <Link to="/">
            <Button className="btn-primary">
              <Plus className="h-4 w-4 mr-2" />
              New Lesson
            </Button>
          </Link>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="card-edu">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Lessons</p>
                  <p className="text-2xl font-bold">{totalLessons}</p>
                </div>
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="card-edu">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Quizzes Taken</p>
                  <p className="text-2xl font-bold">{totalQuizzes}</p>
                </div>
                <FileQuestion className="h-8 w-8 text-secondary" />
              </div>
            </CardContent>
          </Card>

          <Card className="card-edu">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Average Score</p>
                  <p className="text-2xl font-bold">{Math.round(averageScore)}%</p>
                </div>
                <Target className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>

          <Card className="card-edu">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">This Week</p>
                  <p className="text-2xl font-bold">
                    {weeklyProgress.reduce((acc, day) => acc + day.lessons + day.quizzes, 0)}
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="recent" className="space-y-6">
          <TabsList className="grid w-full md:w-auto grid-cols-4">
            <TabsTrigger value="recent">Recent Activity</TabsTrigger>
            <TabsTrigger value="lessons">Lessons</TabsTrigger>
            <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
            <TabsTrigger value="flashcards">Flashcards</TabsTrigger>
          </TabsList>

          <TabsContent value="recent" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Recent Lessons */}
              <Card className="card-edu">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    Recent Lessons
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentLessons.slice(0, 3).map((lesson) => (
                      <Link 
                        key={lesson.id}
                        to={`/lesson/${lesson.id}`}
                        className="block p-4 border rounded-xl hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium">{lesson.title}</h4>
                          <Badge variant="outline" className="text-xs">
                            {lesson.level}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {lesson.createdAt}
                          </div>
                          <div className="flex items-center gap-2">
                            <span>{lesson.progress}%</span>
                            <Progress value={lesson.progress} className="w-12 h-1" />
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Weekly Activity Chart */}
              <Card className="card-edu">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Weekly Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {weeklyProgress.map((day) => (
                      <div key={day.day} className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground w-8">{day.day}</span>
                        <div className="flex-1 mx-4">
                          <div className="flex gap-1">
                            {Array.from({ length: day.lessons }).map((_, i) => (
                              <div key={i} className="w-3 h-3 bg-primary rounded-sm" />
                            ))}
                            {Array.from({ length: day.quizzes }).map((_, i) => (
                              <div key={i} className="w-3 h-3 bg-secondary rounded-sm" />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {day.lessons + day.quizzes}
                        </span>
                      </div>
                    ))}
                    <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-sm" />
                        <span>Lessons</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-secondary rounded-sm" />
                        <span>Quizzes</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="lessons">
            <Card className="card-edu">
              <CardHeader>
                <CardTitle>All Lessons</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentLessons.map((lesson) => (
                    <Link 
                      key={lesson.id}
                      to={`/lesson/${lesson.id}`}
                      className="block p-4 border rounded-xl hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium">{lesson.title}</h4>
                        <Badge variant="outline">{lesson.level}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {lesson.createdAt}
                        </div>
                        <div className="flex items-center gap-2">
                          <span>{lesson.progress}% complete</span>
                          <Progress value={lesson.progress} className="w-20 h-1" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="quizzes">
            <Card className="card-edu">
              <CardHeader>
                <CardTitle>Quiz History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentQuizzes.map((quiz) => (
                    <Link 
                      key={quiz.id}
                      to={`/quiz/${quiz.id}`}
                      className="block p-4 border rounded-xl hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium">{quiz.title}</h4>
                        <Badge 
                          variant={quiz.score >= 80 ? "default" : "secondary"}
                          className={quiz.score >= 80 ? "bg-accent" : ""}
                        >
                          {quiz.score}%
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {quiz.completedAt}
                        </div>
                        <span>{quiz.questionsTotal} questions</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="flashcards">
            <Card className="card-edu">
              <CardHeader>
                <CardTitle>Flashcard Sets</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {flashcardSets.map((set) => (
                    <Link 
                      key={set.id}
                      to={`/flashcards/${set.id}`}
                      className="block p-4 border rounded-xl hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium">{set.title}</h4>
                        <Badge variant="outline">
                          {set.masteredCards}/{set.totalCards}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                        <div className="flex items-center gap-1">
                          <Brain className="h-3 w-3" />
                          {set.totalCards} cards
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {set.lastStudied}
                        </div>
                      </div>
                      <Progress 
                        value={(set.masteredCards / set.totalCards) * 100} 
                        className="h-1"
                      />
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;