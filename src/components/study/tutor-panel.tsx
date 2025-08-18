
"use client"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ChevronLeft, ChevronRight, CheckCircle, XCircle, Lightbulb, Bot } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

// Mock data for quiz
const mockQuiz = {
  type: "small",
  questions: [
    {
      question: "According to Naval, what is the primary focus for building true wealth?",
      options: [
        "Accumulating money",
        "Creating assets that earn passively",
        "Achieving high social status",
      ],
      correctAnswer: "Creating assets that earn passively",
    },
    {
      question: "What is the difference between wealth and money?",
       options: [
        "They are the same thing",
        "Wealth is a system that works for you, money is temporary",
        "Money is more important than wealth",
      ],
      correctAnswer: "Wealth is a system that works for you, money is temporary",
    }
  ],
};

const QuizIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <path d="m10.4 12.6-1.8 1.8"></path>
        <path d="m12.2 12.6 1.8 1.8"></path>
        <path d="M11.25 19.25h.01"></path>
        <path d="M12 16.5c.5-1 1.5-1.5 2.5-1.5s2 .5 2.5 1.5"></path>
    </svg>
);


export function TutorPanel() {
  const [quiz, setQuiz] = useState<any>(mockQuiz); // Set to mockQuiz, or null to hide
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleAnswerChange = (questionIndex: number, answer: string) => {
    setSelectedAnswers(prev => ({ ...prev, [questionIndex]: answer }));
  };
  
  const handleSubmit = () => {
    setSubmitted(true);
  };

  const getResult = (index: number) => {
    if (!submitted) return null;
    const isCorrect = selectedAnswers[index] === quiz.questions[index].correctAnswer;
    return {
        isCorrect,
        icon: isCorrect ? <CheckCircle className="text-green-500" /> : <XCircle className="text-destructive" />,
    }
  };

  return (
    <>
      <Card className="h-full flex flex-col shadow-md">
        <CardHeader>
          <CardTitle className="font-headline text-xl flex items-center gap-2"><Bot /> AI Tutor</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 space-y-6 overflow-y-auto pr-6">
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <h3>Understanding Wealth Creation</h3>
            <p>
              Naval Ravikant argues that wealth is not a zero-sum game. It's about creating abundance. True wealth isn't just money; it's assets that earn while you sleep. This can be code, media, or businesses.
            </p>
            <p>
              The key is to seek wealth, not money or status. Wealth is having assets that earn while you sleep. Money is how we transfer time and wealth. Status is your social standing. Focus on creating things society wants but doesn't yet know how to get.
            </p>
            {quiz && (
                <div className="p-4 rounded-lg bg-primary/10 border border-primary/20 flex items-center gap-3">
                    <Lightbulb className="w-6 h-6 text-primary" />
                    <p className="text-base font-medium text-primary-foreground">Your {quiz.type} quiz is ready! Click the button below when you want to take it.</p>
                </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="border-t p-4 justify-end gap-2">
          <Button variant="outline">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous Concept
          </Button>
          <Button>
              Next Concept
              <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </CardFooter>
      </Card>

      {quiz && (
         <Dialog onOpenChange={(open) => !open && setSubmitted(false)}>
            <DialogTrigger asChild>
                <Button className="fixed bottom-20 right-6 h-16 w-16 rounded-full shadow-lg z-20" size="lg">
                    <QuizIcon className="h-8 w-8" />
                    <span className="sr-only">Take Quiz</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <QuizIcon /> {quiz.type === 'large' ? 'Topic' : 'Quick'} Quiz
                    </DialogTitle>
                </DialogHeader>
                <div className="max-h-[60vh] overflow-y-auto p-1 pr-4 space-y-6">
                    {quiz.questions.map((q: any, index: number) => (
                        <Card key={index} className={submitted ? (getResult(index)?.isCorrect ? 'border-green-500' : 'border-destructive') : ''}>
                           <CardHeader className="flex flex-row items-center justify-between">
                             <p className="font-semibold">{index + 1}. {q.question}</p>
                              {submitted && getResult(index)?.icon}
                           </CardHeader>
                            <CardContent>
                                <RadioGroup onValueChange={(value) => handleAnswerChange(index, value)} disabled={submitted}>
                                    {q.options.map((option: string, i: number) => (
                                        <div key={i} className="flex items-center space-x-2">
                                            <RadioGroupItem value={option} id={`q${index}o${i}`} />
                                            <Label htmlFor={`q${index}o${i}`}>{option}</Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </CardContent>
                             {submitted && !getResult(index)?.isCorrect && (
                                <CardFooter>
                                    <p className="text-sm text-muted-foreground">Correct answer: <span className="font-semibold text-green-400">{q.correctAnswer}</span></p>
                                </CardFooter>
                            )}
                        </Card>
                    ))}
                </div>
                 <DialogFooter>
                    {!submitted ? (
                        <Button onClick={handleSubmit}>Submit Quiz</Button>
                    ) : (
                         <DialogClose asChild>
                            <Button variant="outline">Close</Button>
                         </DialogClose>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
      )}
    </>
  );
}

    