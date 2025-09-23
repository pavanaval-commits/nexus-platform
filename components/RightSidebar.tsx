import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { 
  Clock, 
  ExternalLink, 
  Globe, 
  TrendingUp, 
  AlertCircle, 
  Calendar, 
  Building2,
  FileText,
  Eye,
  Bookmark
} from 'lucide-react';

export function RightSidebar() {
  const globalNewsItems = [
    {
      title: "FDA Approves First AI-Powered Drug Discovery Platform",
      summary: "Revolutionary approval allows pharmaceutical companies to use AI for accelerated drug development with regulatory oversight.",
      time: "1 hour ago",
      category: "FDA",
      priority: "high",
      views: 1247,
      link: "#"
    },
    {
      title: "EMA Implements New Digital Submission Standards",
      summary: "Enhanced electronic Common Technical Document (eCTD) requirements now include structured data elements for faster review.",
      time: "3 hours ago",
      category: "EMA",
      priority: "medium",
      views: 892,
      link: "#"
    },
    {
      title: "PMDA Fast-Track Program Extended to Rare Diseases",
      summary: "Japan's regulatory agency expands expedited review pathway to include additional orphan drug categories.",
      time: "5 hours ago",
      category: "PMDA",
      priority: "medium",
      views: 643,
      link: "#"
    },
    {
      title: "ICH Guidelines Update: Real-World Evidence Standards",
      summary: "International harmonized guidance on RWE data quality and regulatory acceptance criteria published.",
      time: "8 hours ago",
      category: "ICH",
      priority: "high",
      views: 1056,
      link: "#"
    },
    {
      title: "Health Canada Cannabis Pharmaceutical Regulations",
      summary: "New framework for cannabis-derived pharmaceutical products with streamlined approval pathways.",
      time: "12 hours ago",
      category: "Health Canada",
      priority: "low",
      views: 429,
      link: "#"
    },
    {
      title: "TGA Medical Device Classification Changes",
      summary: "Australia updates medical device risk classification system affecting software and AI-enabled devices.",
      time: "1 day ago",
      category: "TGA",
      priority: "medium",
      views: 567,
      link: "#"
    }
  ];

  const trendingUpdates = [
    {
      title: "Veeva RIM 23R2 Release",
      summary: "Major update includes enhanced IDMP compliance features and AI-powered document intelligence.",
      type: "System Update",
      company: "Veeva Systems",
      time: "2 hours ago",
      impact: "High",
      link: "#"
    },
    {
      title: "Oracle Argus Safety 8.3 Launch",
      summary: "New pharmacovigilance platform features include automated case processing and regulatory reporting.",
      type: "Product Launch",
      company: "Oracle",
      time: "6 hours ago",
      impact: "Medium",
      link: "#"
    },
    {
      title: "MasterControl Updates GxP Cloud",
      summary: "Enhanced document management capabilities with advanced workflow automation and audit trails.",
      type: "Feature Update",
      company: "MasterControl",
      time: "10 hours ago",
      impact: "Medium",
      link: "#"
    },
    {
      title: "Ennov Solutions Regulatory Suite 2024",
      summary: "Comprehensive regulatory information management with integrated eCTD publishing capabilities.",
      type: "Major Release",
      company: "Ennov",
      time: "1 day ago",
      impact: "High",
      link: "#"
    },
    {
      title: "TrackWise Digital QMS Enhancement",
      summary: "Sparta Systems introduces AI-powered quality management with predictive analytics.",
      type: "Enhancement",
      company: "Sparta Systems",
      time: "2 days ago",
      impact: "Medium",
      link: "#"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="w-80 bg-card border-l border-border h-full flex flex-col">
      {/* Global Regulatory News */}
      <div className="p-4 border-b border-border">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <Globe className="h-5 w-5 text-blue-600" />
              Global Regulatory News
            </CardTitle>
            <p className="text-sm text-muted-foreground">Latest updates from regulatory authorities worldwide</p>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-64 px-4">
              <div className="space-y-3 pb-4">
                {globalNewsItems.map((item, index) => (
                  <div key={index} className="border border-border rounded-lg p-3 hover:bg-accent/50 transition-colors cursor-pointer">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {item.category}
                        </Badge>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${getPriorityColor(item.priority)}`}
                        >
                          {item.priority}
                        </Badge>
                      </div>
                      <ExternalLink className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                    </div>
                    
                    <h4 className="font-semibold text-sm leading-tight mb-2">
                      {item.title}
                    </h4>
                    
                    <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                      {item.summary}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {item.time}
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {item.views}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="h-4 px-1">
                        <Bookmark className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Trending System Updates */}
      <div className="p-4 flex-1">
        <Card className="h-full">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              System & Platform Updates
            </CardTitle>
            <p className="text-sm text-muted-foreground">Latest technology updates affecting regulatory workflows</p>
          </CardHeader>
          <CardContent className="p-0 h-full">
            <ScrollArea className="h-72 px-4">
              <div className="space-y-3 pb-4">
                {trendingUpdates.map((item, index) => (
                  <div key={index} className="border border-border rounded-lg p-3 hover:bg-accent/50 transition-colors cursor-pointer">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {item.type}
                        </Badge>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${getImpactColor(item.impact)}`}
                        >
                          {item.impact} Impact
                        </Badge>
                      </div>
                      <ExternalLink className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                    </div>
                    
                    <h4 className="font-semibold text-sm leading-tight mb-1">
                      {item.title}
                    </h4>
                    
                    <div className="flex items-center gap-1 mb-2">
                      <Building2 className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs font-medium text-muted-foreground">{item.company}</span>
                    </div>
                    
                    <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                      {item.summary}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {item.time}
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" className="h-4 px-1">
                          <FileText className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-4 px-1">
                          <Bookmark className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}