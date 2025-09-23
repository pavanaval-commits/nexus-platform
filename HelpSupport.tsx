import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { 
  HelpCircle, 
  Search, 
  Book, 
  Video, 
  MessageCircle, 
  Mail, 
  Phone,
  FileText,
  Play,
  Download,
  ExternalLink,
  ChevronRight,
  Lightbulb,
  Users,
  Calendar,
  Zap,
  Shield,
  Settings,
  BarChart3,
  Globe,
  CheckCircle,
  ArrowRight,
  Star,
  Clock
} from 'lucide-react';

export function HelpSupport() {
  const [searchQuery, setSearchQuery] = useState('');

  const quickActions = [
    {
      title: "Getting Started Guide",
      description: "Complete walkthrough of Nexus platform features",
      icon: Book,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      action: "tutorial"
    },
    {
      title: "Video Tutorials",
      description: "Step-by-step video guides for common tasks",
      icon: Video,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      action: "videos"
    },
    {
      title: "Contact Support",
      description: "Get help from our regulatory experts",
      icon: MessageCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
      action: "contact"
    },
    {
      title: "API Documentation",
      description: "Technical documentation for integrations",
      icon: FileText,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      action: "api"
    }
  ];

  const popularTopics = [
    {
      title: "How to Set Up Feed Alerts",
      views: 1248,
      category: "Regulatory Intelligence",
      difficulty: "Beginner",
      duration: "5 min"
    },
    {
      title: "Creating and Managing RFPs",
      views: 892,
      category: "Marketplace",
      difficulty: "Intermediate",
      duration: "12 min"
    },
    {
      title: "Finding the Right Consultant",
      views: 756,
      category: "Marketplace", 
      difficulty: "Beginner",
      duration: "8 min"
    },
    {
      title: "Advanced Search and Filtering",
      views: 634,
      category: "Platform Features",
      difficulty: "Advanced",
      duration: "15 min"
    },
    {
      title: "Document Comparison Features",
      views: 523,
      category: "Regulatory Intelligence",
      difficulty: "Intermediate", 
      duration: "10 min"
    }
  ];

  const faqData = [
    {
      category: "Getting Started",
      questions: [
        {
          question: "How do I set up my first regulatory feed?",
          answer: "Navigate to the Reg Intel section, select 'Feeds', and click 'Add Feed'. Choose your regulatory authorities (FDA, EMA, PMDA, etc.), select relevant topics, and configure alert preferences. The system will automatically start monitoring for new updates matching your criteria."
        },
        {
          question: "What's the difference between consultants and vendors?",
          answer: "Consultants are individual experts or consulting firms who provide advisory services, while vendors offer technology solutions and platforms. Both can be found in our Marketplace section with detailed profiles, ratings, and contact information."
        },
        {
          question: "How do I create my first RFP?",
          answer: "Go to Marketplace > RFP and click 'Create New RFP'. Follow the 5-step workflow: Project Details, Requirements, Timeline, Budget, and Review. The system will automatically match relevant vendors based on your requirements."
        }
      ]
    },
    {
      category: "Regulatory Intelligence",
      questions: [
        {
          question: "How often are regulatory feeds updated?",
          answer: "Our system monitors regulatory authorities 24/7 and updates feeds in real-time. Most updates appear within 15-30 minutes of publication by the regulatory authority. You can configure refresh intervals in your settings."
        },
        {
          question: "Can I customize feed alerts and notifications?",
          answer: "Yes, you can set up custom alerts based on keywords, regulatory authorities, document types, and urgency levels. Notifications can be delivered via email, in-app alerts, or browser notifications."
        },
        {
          question: "What is document comparison and how does it work?",
          answer: "Document comparison allows you to identify changes between different versions of regulatory documents. Our AI-powered system highlights additions, deletions, and modifications with color-coded annotations and provides summaries of key changes."
        }
      ]
    },
    {
      category: "Marketplace Features",
      questions: [
        {
          question: "How is the VendorFit score calculated?",
          answer: "VendorFit scores are calculated based on multiple factors including past performance, client ratings, relevant experience, technical capabilities, geographic coverage, and cost competitiveness. Scores are updated monthly based on new reviews and completed projects."
        },
        {
          question: "Can I schedule consultations with experts?",
          answer: "Yes, many consultants offer direct scheduling through the platform. Click 'Contact' on any consultant profile to see available time slots, consultation rates, and booking options. Some offer free initial consultations."
        },
        {
          question: "How do I track RFP responses and proposals?",
          answer: "All RFP responses are tracked in your RFP dashboard. You'll receive notifications when new proposals are submitted, can compare vendor responses side-by-side, and use our scoring system to evaluate proposals against your criteria."
        }
      ]
    },
    {
      category: "Account & Billing",
      questions: [
        {
          question: "What subscription plans are available?",
          answer: "We offer Basic (individual users), Professional (small teams), and Enterprise (large organizations) plans. Each includes different levels of access to feeds, marketplace features, and support. Contact our sales team for custom enterprise solutions."
        },
        {
          question: "How do I export my data?",
          answer: "You can export data from your user settings under the 'Data' tab. Available formats include CSV, JSON, PDF, and Excel. Exports include feed history, RFP data, consultant contacts, and bookmarks. Large exports may take a few minutes to generate."
        },
        {
          question: "Is my data secure and compliant?",
          answer: "Yes, we maintain SOC 2 Type II compliance, use enterprise-grade encryption, and follow strict data governance policies. We're also GDPR compliant and regularly undergo security audits. Your regulatory data is never shared without explicit permission."
        }
      ]
    }
  ];

  const tutorials = [
    {
      title: "Platform Overview",
      description: "Complete introduction to Nexus features and navigation",
      duration: "15 min",
      type: "video",
      difficulty: "Beginner",
      views: 2340
    },
    {
      title: "Setting Up Regulatory Feeds",
      description: "Configure alerts and monitor regulatory updates effectively",
      duration: "10 min",
      type: "interactive",
      difficulty: "Beginner",
      views: 1890
    },
    {
      title: "Advanced Search Techniques",
      description: "Master complex searches across feeds and marketplace",
      duration: "12 min",
      type: "video",
      difficulty: "Intermediate",
      views: 1234
    },
    {
      title: "RFP Management Workflow",
      description: "End-to-end RFP creation, management, and vendor selection",
      duration: "18 min",
      type: "interactive",
      difficulty: "Intermediate",
      views: 987
    },
    {
      title: "Consultant Matching and Selection",
      description: "Find and engage the right regulatory experts",
      duration: "8 min",
      type: "video",
      difficulty: "Beginner",
      views: 1456
    },
    {
      title: "API Integration Guide",
      description: "Connect Nexus with your existing regulatory systems",
      duration: "25 min",
      type: "documentation",
      difficulty: "Advanced",
      views: 567
    }
  ];

  const contactOptions = [
    {
      method: "Live Chat",
      description: "Get instant help from our support team",
      availability: "Mon-Fri, 9 AM - 6 PM EST",
      responseTime: "< 2 minutes",
      icon: MessageCircle,
      color: "text-green-600",
      action: "chat"
    },
    {
      method: "Email Support",
      description: "Detailed assistance for complex issues", 
      availability: "24/7 (responses within 4-6 hours)",
      responseTime: "< 6 hours",
      icon: Mail,
      color: "text-blue-600",
      action: "email"
    },
    {
      method: "Phone Support",
      description: "Priority support for enterprise customers",
      availability: "Mon-Fri, 8 AM - 8 PM EST",
      responseTime: "Immediate",
      icon: Phone,
      color: "text-purple-600",
      action: "phone"
    },
    {
      method: "Expert Consultation",
      description: "One-on-one guidance from regulatory specialists",
      availability: "By appointment",
      responseTime: "Within 24 hours",
      icon: Users,
      color: "text-orange-600",
      action: "consultation"
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
          <HelpCircle className="h-8 w-8 text-blue-600" />
          Help & Support
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Find answers, learn new features, and get the most out of your Nexus regulatory intelligence platform
        </p>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search help articles, tutorials, and FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 text-lg"
            />
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className={`p-3 rounded-lg ${action.bgColor} mb-3 w-fit`}>
                <action.icon className={`h-6 w-6 ${action.color}`} />
              </div>
              <h3 className="font-semibold mb-2">{action.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{action.description}</p>
              <Button variant="ghost" size="sm" className="p-0 h-auto">
                Get Started <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Popular Topics */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-600" />
              Popular Topics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {popularTopics.map((topic, index) => (
                <div key={index} className="p-3 border border-border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer">
                  <h4 className="font-medium text-sm mb-1">{topic.title}</h4>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Badge variant="secondary" className={`text-xs ${getDifficultyColor(topic.difficulty)}`}>
                      {topic.difficulty}
                    </Badge>
                    <span>{topic.duration}</span>
                    <span>•</span>
                    <span>{topic.views} views</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="tutorials" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
              <TabsTrigger value="faq">FAQ</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
            </TabsList>

            {/* Tutorials */}
            <TabsContent value="tutorials">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Video className="h-5 w-5 text-purple-600" />
                    Video Tutorials & Guides
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-96">
                    <div className="space-y-4">
                      {tutorials.map((tutorial, index) => (
                        <div key={index} className="flex items-center gap-4 p-3 border border-border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer">
                          <div className="p-2 rounded-lg bg-accent">
                            {tutorial.type === 'video' ? (
                              <Play className="h-4 w-4" />
                            ) : tutorial.type === 'interactive' ? (
                              <Zap className="h-4 w-4" />
                            ) : (
                              <FileText className="h-4 w-4" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm">{tutorial.title}</h4>
                            <p className="text-xs text-muted-foreground mt-1">{tutorial.description}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="outline" className={`text-xs ${getDifficultyColor(tutorial.difficulty)}`}>
                                {tutorial.difficulty}
                              </Badge>
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                {tutorial.duration}
                              </div>
                              <span className="text-xs text-muted-foreground">{tutorial.views} views</span>
                            </div>
                          </div>
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            {/* FAQ */}
            <TabsContent value="faq">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-blue-600" />
                    Frequently Asked Questions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-96">
                    <Accordion type="single" collapsible className="space-y-2">
                      {faqData.map((category, categoryIndex) => (
                        <div key={categoryIndex} className="space-y-2">
                          <h3 className="font-semibold text-sm text-primary mb-3 pt-4 first:pt-0">
                            {category.category}
                          </h3>
                          {category.questions.map((faq, faqIndex) => (
                            <AccordionItem 
                              key={`${categoryIndex}-${faqIndex}`} 
                              value={`${categoryIndex}-${faqIndex}`}
                              className="border border-border rounded-lg px-4"
                            >
                              <AccordionTrigger className="text-sm font-medium hover:no-underline">
                                {faq.question}
                              </AccordionTrigger>
                              <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                                {faq.answer}
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </div>
                      ))}
                    </Accordion>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Contact */}
            <TabsContent value="contact">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-green-600" />
                    Contact Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {contactOptions.map((option, index) => (
                      <div key={index} className="p-4 border border-border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-lg bg-accent ${option.color}`}>
                            <option.icon className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm mb-1">{option.method}</h4>
                            <p className="text-xs text-muted-foreground mb-2">{option.description}</p>
                            <div className="space-y-1 text-xs text-muted-foreground">
                              <p><strong>Available:</strong> {option.availability}</p>
                              <p><strong>Response:</strong> {option.responseTime}</p>
                            </div>
                            <Button variant="outline" size="sm" className="mt-3 w-full">
                              Contact Now
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-sm text-blue-800 mb-2">Need Enterprise Support?</h4>
                    <p className="text-xs text-blue-700 mb-3">
                      Get dedicated support, training, and onboarding for your organization.
                    </p>
                    <Button variant="outline" size="sm">
                      Contact Sales Team
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
