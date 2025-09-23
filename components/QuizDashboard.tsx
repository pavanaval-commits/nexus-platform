import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Trophy, Star, Clock, ChevronLeft, ChevronRight } from 'lucide-react';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export function QuizDashboard() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const quizQuestions: QuizQuestion[] = [
    {
      id: 1,
      question: "What is the primary purpose of a 510(k) submission to the FDA?",
      options: [
        "To register a new pharmaceutical company",
        "To demonstrate substantial equivalence to a predicate device",
        "To apply for orphan drug designation",
        "To request a pre-market approval for Class III devices"
      ],
      correctAnswer: 1
    },
    {
      id: 2,
      question: "Which ICH guideline covers Good Clinical Practice (GCP)?",
      options: [
        "ICH E6",
        "ICH E2A",
        "ICH Q7",
        "ICH M4"
      ],
      correctAnswer: 0
    },
    {
      id: 3,
      question: "What is the maximum duration for a clinical trial under the FDA's IND regulations?",
      options: [
        "1 year",
        "2 years", 
        "5 years",
        "No specific limit if annual reports are submitted"
      ],
      correctAnswer: 3
    },
    {
      id: 4,
      question: "EMA's PRIME designation is designed for:",
      options: [
        "Generic drug applications",
        "Medicines addressing unmet medical needs",
        "Medical device submissions",
        "Cosmetic product approvals"
      ],
      correctAnswer: 1
    },
    {
      id: 5,
      question: "What does REMS stand for in FDA terminology?",
      options: [
        "Regulatory Evaluation and Monitoring System",
        "Risk Evaluation and Mitigation Strategies",
        "Research and Ethics Management Standards",
        "Rapid Emergency Medical Services"
      ],
      correctAnswer: 1
    },
    {
      id: 6,
      question: "Which document is required for initial marketing authorization in the EU?",
      options: [
        "Common Technical Document (CTD)",
        "Investigational New Drug (IND) application",
        "510(k) submission",
        "New Drug Application (NDA)"
      ],
      correctAnswer: 0
    },
    {
      id: 7,
      question: "The FDA's Breakthrough Therapy designation requires:",
      options: [
        "Completion of Phase III trials",
        "Preliminary clinical evidence of substantial improvement",
        "Prior approval in another country",
        "Orphan drug status"
      ],
      correctAnswer: 1
    },
    {
      id: 8,
      question: "What is the primary purpose of pharmacovigilance?",
      options: [
        "To monitor drug manufacturing processes",
        "To detect, assess, and prevent adverse drug reactions",
        "To conduct clinical trials",
        "To register pharmaceutical companies"
      ],
      correctAnswer: 1
    },
    {
      id: 9,
      question: "Which FDA center regulates biological products?",
      options: [
        "CDER (Center for Drug Evaluation and Research)",
        "CDRH (Center for Devices and Radiological Health)",
        "CBER (Center for Biologics Evaluation and Research)",
        "CFSAN (Center for Food Safety and Applied Nutrition)"
      ],
      correctAnswer: 2
    },
    {
      id: 10,
      question: "The EU Clinical Trials Regulation came into effect in:",
      options: [
        "2019",
        "2020",
        "2021",
        "2022"
      ],
      correctAnswer: 2
    },
    {
      id: 11,
      question: "What is required for an Investigational Medicinal Product Dossier (IMPD)?",
      options: [
        "Marketing authorization",
        "Quality, non-clinical and clinical data",
        "Commercial pricing information",
        "Distribution network details"
      ],
      correctAnswer: 1
    },
    {
      id: 12,
      question: "FDA's Real-World Evidence (RWE) can be used for:",
      options: [
        "Initial drug approval only",
        "Post-market studies only",
        "Both regulatory decisions and post-market requirements",
        "Manufacturing inspections only"
      ],
      correctAnswer: 2
    },
    {
      id: 13,
      question: "The PMDA (Japan) requires which type of clinical data for global development?",
      options: [
        "Only Japanese clinical data",
        "Bridge studies connecting foreign and Japanese data",
        "Only Western clinical data",
        "No clinical data required"
      ],
      correctAnswer: 1
    },
    {
      id: 14,
      question: "Which ICH region includes regulatory authorities from emerging markets?",
      options: [
        "ICH E region",
        "ICH J region",
        "ICH M region",
        "ICH does not include emerging markets"
      ],
      correctAnswer: 2
    },
    {
      id: 15,
      question: "The FDA's Orange Book lists:",
      options: [
        "Approved medical devices",
        "Therapeutic equivalence evaluations for prescription drugs",
        "Clinical trial protocols",
        "Adverse event reports"
      ],
      correctAnswer: 1
    },
    {
      id: 16,
      question: "What is the purpose of a Risk Management Plan (RMP) in the EU?",
      options: [
        "To plan clinical trials",
        "To identify and minimize product risks throughout its lifecycle",
        "To schedule regulatory inspections",
        "To manage supply chain logistics"
      ],
      correctAnswer: 1
    },
    {
      id: 17,
      question: "Health Canada's Notice of Compliance (NOC) is equivalent to:",
      options: [
        "FDA's IND approval",
        "FDA's NDA approval",
        "EMA's PRIME designation",
        "FDA's 510(k) clearance"
      ],
      correctAnswer: 1
    },
    {
      id: 18,
      question: "The Clinical Data Interchange Standards Consortium (CDISC) develops:",
      options: [
        "Regulatory guidelines",
        "Data standards for clinical research",
        "Manufacturing standards",
        "Marketing authorization procedures"
      ],
      correctAnswer: 1
    },
    {
      id: 19,
      question: "What triggers a Type C meeting with the FDA?",
      options: [
        "Routine development questions",
        "Emergency safety issues or critical path decisions",
        "Post-market commitments",
        "Annual report submissions"
      ],
      correctAnswer: 1
    },
    {
      id: 20,
      question: "The EU's Falsified Medicines Directive aims to:",
      options: [
        "Reduce drug development costs",
        "Prevent counterfeit medicines from entering the supply chain",
        "Accelerate drug approvals",
        "Harmonize clinical trial requirements"
      ],
      correctAnswer: 1
    }
  ];

  const userStats = {
    globalRank: 272,
    seasonPoints: 1847,
    category: "Intermediate",
    currentStreak: 7,
    totalQuizzes: 23
  };

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: answerIndex
    }));
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const getScore = () => {
    let correct = 0;
    Object.entries(selectedAnswers).forEach(([questionIndex, answerIndex]) => {
      if (quizQuestions[parseInt(questionIndex)].correctAnswer === answerIndex) {
        correct++;
      }
    });
    return correct;
  };

  const progressPercentage = ((currentQuestion + 1) / quizQuestions.length) * 100;

  if (!quizStarted) {
    return (
      <div className="space-y-6">
        {/* User Stats Header */}
        <div className="grid grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Trophy className="h-5 w-5 text-amber-500" />
                <span className="text-sm text-muted-foreground">Global Rank</span>
              </div>
              <div className="text-2xl font-bold">#{userStats.globalRank}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Star className="h-5 w-5 text-blue-500" />
                <span className="text-sm text-muted-foreground">Season Points</span>
              </div>
              <div className="text-2xl font-bold">{userStats.seasonPoints}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="mb-2">
                <span className="text-sm text-muted-foreground">Category</span>
              </div>
              <Badge variant="secondary" className="text-lg px-3 py-1">
                {userStats.category}
              </Badge>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="mb-2">
                <span className="text-sm text-muted-foreground">Streak</span>
              </div>
              <div className="text-2xl font-bold text-green-600">{userStats.currentStreak}</div>
            </CardContent>
          </Card>
        </div>

        {/* Quiz Start Card */}
        <Card>
          <CardHeader className="text-center">
            <div className="mb-4">
              <div className="text-sm text-muted-foreground mb-2">Quiz Sponsored by</div>
              <div className="flex items-center justify-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">A</span>
                </div>
                <span className="font-semibold text-lg">ArisGlobal</span>
              </div>
            </div>
            <CardTitle className="text-2xl">Regulatory Intelligence Quiz</CardTitle>
            <p className="text-muted-foreground mt-2">
              Test your knowledge on regulatory requirements, guidelines, and best practices
            </p>
          </CardHeader>
          <CardContent className="text-center">
            <div className="space-y-4 mb-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">20</div>
                  <div className="text-sm text-muted-foreground">Questions</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">15</div>
                  <div className="text-sm text-muted-foreground">Minutes</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">100</div>
                  <div className="text-sm text-muted-foreground">Max Points</div>
                </div>
              </div>
            </div>
            <Button size="lg" onClick={() => setQuizStarted(true)} className="w-full max-w-xs">
              Start Quiz
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (quizCompleted) {
    const score = getScore();
    const percentage = Math.round((score / quizQuestions.length) * 100);
    
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Quiz Completed!</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">{score}/{quizQuestions.length}</div>
              <div className="text-xl text-muted-foreground">{percentage}% Correct</div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-lg font-bold">+{score * 5}</div>
                <div className="text-sm text-muted-foreground">Points Earned</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold">#{userStats.globalRank - (score > 15 ? 5 : 0)}</div>
                <div className="text-sm text-muted-foreground">New Rank</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold">{userStats.currentStreak + (percentage >= 70 ? 1 : 0)}</div>
                <div className="text-sm text-muted-foreground">Current Streak</div>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <Button onClick={() => {
                setQuizStarted(false);
                setQuizCompleted(false);
                setCurrentQuestion(0);
                setSelectedAnswers({});
              }}>
                Take Another Quiz
              </Button>
              <Button variant="outline">View Detailed Results</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Quiz Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-sm text-muted-foreground">
            Sponsored by <span className="font-medium text-foreground">ArisGlobal</span>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Global Rank</div>
            <div className="font-bold">#{userStats.globalRank}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Season Points</div>
            <div className="font-bold">{userStats.seasonPoints}</div>
          </div>
          <Badge variant="secondary">{userStats.category}</Badge>
        </div>
      </div>

      {/* Progress */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Question: {currentQuestion + 1} of {quizQuestions.length}</span>
            </div>
            <span className="text-sm text-muted-foreground">{Math.round(progressPercentage)}% Complete</span>
          </div>
          <Progress value={progressPercentage} className="w-full" />
        </CardContent>
      </Card>

      {/* Question Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            Question {currentQuestion + 1}: {quizQuestions[currentQuestion].question}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={selectedAnswers[currentQuestion]?.toString()}
            onValueChange={(value) => handleAnswerSelect(currentQuestion, parseInt(value))}
            className="space-y-4"
          >
            {quizQuestions[currentQuestion].options.map((option, index) => (
              <div key={index} className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:bg-accent transition-colors">
                <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => {
              setQuizCompleted(true);
            }}
          >
            Submit Quiz
          </Button>
          <Button
            onClick={handleNext}
            disabled={selectedAnswers[currentQuestion] === undefined}
          >
            {currentQuestion === quizQuestions.length - 1 ? 'Finish' : 'Next'}
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}