import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, RotateCcw, ChevronLeft, ChevronRight, CheckCircle, X } from "lucide-react";

const Flashcards = () => {
  const { id } = useParams();
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredCards, setMasteredCards] = useState<Set<number>>(new Set());
  const [needsPractice, setNeedsPractice] = useState<Set<number>>(new Set());

  // Mock flashcard data - in real app, would fetch from Supabase
  const flashcardSet = {
    id,
    title: "Photosynthesis Key Terms",
    description: "Essential vocabulary for understanding photosynthesis",
    cards: [
      {
        id: 1,
        front: "Chlorophyll",
        back: "The green pigment in plants that captures light energy for photosynthesis",
      },
      {
        id: 2,
        front: "Glucose",
        back: "The simple sugar produced as the main product of photosynthesis",
      },
      {
        id: 3,
        front: "Stomata",
        back: "Small pores on the underside of leaves that allow gas exchange",
      },
      {
        id: 4,
        front: "Carbon Dioxide",
        back: "A gas absorbed from the atmosphere during photosynthesis",
      },
      {
        id: 5,
        front: "Light Reactions",
        back: "The first stage of photosynthesis where light energy is converted to chemical energy",
      },
    ],
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    setIsFlipped(false);
    if (currentCard < flashcardSet.cards.length - 1) {
      setCurrentCard(currentCard + 1);
    }
  };

  const handlePrevious = () => {
    setIsFlipped(false);
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1);
    }
  };

  const handleGotIt = () => {
    const newMastered = new Set(masteredCards);
    newMastered.add(currentCard);
    setMasteredCards(newMastered);
    
    const newPractice = new Set(needsPractice);
    newPractice.delete(currentCard);
    setNeedsPractice(newPractice);
    
    handleNext();
  };

  const handleNeedsPractice = () => {
    const newPractice = new Set(needsPractice);
    newPractice.add(currentCard);
    setNeedsPractice(newPractice);
    
    const newMastered = new Set(masteredCards);
    newMastered.delete(currentCard);
    setMasteredCards(newMastered);
    
    handleNext();
  };

  const progress = ((masteredCards.size) / flashcardSet.cards.length) * 100;

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
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">{flashcardSet.title}</h1>
              <p className="text-muted-foreground">{flashcardSet.description}</p>
            </div>
            
            <div className="text-right">
              <div className="text-sm text-muted-foreground mb-2">Progress</div>
              <div className="text-2xl font-bold">{Math.round(progress)}%</div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">
                Card {currentCard + 1} of {flashcardSet.cards.length}
              </span>
              <span className="text-sm text-muted-foreground">
                {masteredCards.size} mastered
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </CardContent>
        </Card>

        {/* Flashcard */}
        <div className="max-w-2xl mx-auto mb-8">
          <Card 
            className="card-edu min-h-[400px] cursor-pointer relative overflow-hidden"
            onClick={handleFlip}
          >
            <div className="absolute top-4 right-4">
              <Badge variant="outline">
                {isFlipped ? "Back" : "Front"}
              </Badge>
            </div>
            
            <CardContent className="p-8 h-full flex items-center justify-center text-center">
              <div className="space-y-4">
                <RotateCcw className="h-8 w-8 text-muted-foreground mx-auto mb-4" />
                
                {!isFlipped ? (
                  <div>
                    <h3 className="text-sm text-muted-foreground mb-2">Question</h3>
                    <p className="text-2xl font-semibold leading-relaxed">
                      {flashcardSet.cards[currentCard].front}
                    </p>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-sm text-muted-foreground mb-2">Answer</h3>
                    <p className="text-xl leading-relaxed text-muted-foreground">
                      {flashcardSet.cards[currentCard].back}
                    </p>
                  </div>
                )}
                
                <p className="text-sm text-muted-foreground mt-6">
                  Click card to {isFlipped ? "show question" : "reveal answer"}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation and Action Buttons */}
        <div className="max-w-2xl mx-auto space-y-4">
          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button 
              variant="outline" 
              onClick={handlePrevious}
              disabled={currentCard === 0}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            
            <div className="flex items-center gap-4">
              {masteredCards.has(currentCard) && (
                <Badge variant="default" className="bg-accent text-accent-foreground">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Mastered
                </Badge>
              )}
              {needsPractice.has(currentCard) && (
                <Badge variant="destructive">
                  <X className="h-3 w-3 mr-1" />
                  Needs Practice
                </Badge>
              )}
            </div>
            
            <Button 
              variant="outline" 
              onClick={handleNext}
              disabled={currentCard === flashcardSet.cards.length - 1}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>

          {/* Learning Actions */}
          {isFlipped && (
            <div className="grid grid-cols-2 gap-4">
              <Button 
                onClick={handleNeedsPractice}
                variant="outline" 
                className="border-destructive/20 hover:bg-destructive/5"
                size="lg"
              >
                <X className="h-4 w-4 mr-2" />
                Practice More
              </Button>
              
              <Button 
                onClick={handleGotIt}
                className="btn-success"
                size="lg"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Got It!
              </Button>
            </div>
          )}
        </div>

        {/* Study Stats */}
        <Card className="mt-8 max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-center">Study Session Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-accent">{masteredCards.size}</div>
                <div className="text-sm text-muted-foreground">Mastered</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-destructive">{needsPractice.size}</div>
                <div className="text-sm text-muted-foreground">Need Practice</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">
                  {flashcardSet.cards.length - masteredCards.size - needsPractice.size}
                </div>
                <div className="text-sm text-muted-foreground">Not Reviewed</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Flashcards;