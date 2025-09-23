import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";
import { 
  ArrowLeft, 
  ExternalLink, 
  Calendar, 
  FileText, 
  User, 
  Globe,
  Download,
  Share,
  Bookmark,
  Clock,
  Star,
  MessageCircle,
  Building2,
  MapPin
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface FeedDetailProps {
  feedId: string;
  onBack: () => void;
}

interface FeedDetail {
  id: string;
  title: string;
  authority: string;
  category: string;
  publishDate: string;
  lastUpdated: string;
  image: string;
  originalUrl: string;
  summary: string;
  keyChanges: string[];
  impactedAreas: string[];
  effectiveDate?: string;
  consultationPeriod?: string;
  fullContent: {
    sections: {
      title: string;
      content: string;
    }[];
  };
  relatedDocuments: {
    title: string;
    url: string;
    type: string;
  }[];
  tags: string[];
}

interface RecommendedConsultant {
  id: string;
  name: string;
  firmName: string;
  logo: string;
  specialization: string[];
  vendorFitScore: number;
  customerRating: number;
  experience: string;
  region: string[];
  proofPoint: string;
  relevanceReason: string;
}

const mockFeedDetails: { [key: string]: FeedDetail } = {
  'fda-real-world-evidence': {
    id: 'fda-real-world-evidence',
    title: 'FDA Issues Draft Guidance on Real-World Evidence for Drug Development',
    authority: 'FDA',
    category: 'Draft Guidance',
    publishDate: 'September 22, 2025',
    lastUpdated: 'September 22, 2025',
    image: 'https://images.unsplash.com/photo-1591180566378-2e983423b68a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxGREElMjBnb3Zlcm5tZW50JTIwYnVpbGRpbmd8ZW58MXx8fHwxNzU4NTY2NjIyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    originalUrl: 'https://www.fda.gov/regulatory-information/search-fda-guidance-documents/real-world-evidence-program',
    summary: 'The FDA has released comprehensive draft guidance on using real-world evidence (RWE) to support regulatory decision-making for drug development and approval. This guidance provides clarity on data standards, study design considerations, and submission requirements for real-world studies. The document emphasizes the importance of pre-specified analysis plans and robust data quality measures.',
    keyChanges: [
      'New requirements for real-world data quality assessment',
      'Clarified standards for electronic health record data',
      'Updated submission format for RWE studies',
      'Enhanced pre-submission meeting guidance',
      'Expanded therapeutic area applications'
    ],
    impactedAreas: [
      'Clinical Development',
      'Regulatory Affairs',
      'Data Management',
      'Biostatistics',
      'Medical Affairs'
    ],
    effectiveDate: 'January 1, 2026',
    consultationPeriod: '60 days (ends November 21, 2025)',
    fullContent: {
      sections: [
        {
          title: 'Introduction and Scope',
          content: 'This guidance provides recommendations on the use of real-world evidence (RWE) to support regulatory decision-making for human drugs and biologics. RWE is clinical evidence about the usage and potential benefits or risks of a medical product derived from analysis of real-world data (RWD). The scope includes observational studies, pragmatic clinical trials, and analysis of electronic health records.'
        },
        {
          title: 'Data Quality Standards',
          content: 'Real-world data must meet specific quality standards including data completeness, accuracy, and reliability. The guidance outlines expectations for data governance, validation procedures, and quality control measures. Organizations must demonstrate robust data management practices and provide comprehensive data lineage documentation.'
        },
        {
          title: 'Study Design Considerations',
          content: 'RWE studies should follow established epidemiological principles with clearly defined study objectives, target populations, and outcome measures. The guidance emphasizes the importance of minimizing bias through appropriate study design, including considerations for confounding variables and selection bias.'
        },
        {
          title: 'Submission Requirements',
          content: 'Submissions containing RWE should include detailed protocols, statistical analysis plans, and comprehensive datasets. The FDA recommends early engagement through pre-submission meetings to discuss study design and regulatory pathway. All submissions must comply with electronic Common Technical Document (eCTD) format.'
        }
      ]
    },
    relatedDocuments: [
      {
        title: 'FDA Real-World Evidence Framework',
        url: 'https://www.fda.gov/science-research/science-and-research-special-topics/real-world-evidence',
        type: 'Framework'
      },
      {
        title: 'ICH E17 General Principles for Planning Multiregional Clinical Trials',
        url: 'https://www.ich.org/page/efficacy-guidelines',
        type: 'ICH Guideline'
      },
      {
        title: 'FDA Guidance on Electronic Health Records',
        url: 'https://www.fda.gov/regulatory-information/search-fda-guidance-documents',
        type: 'Guidance'
      }
    ],
    tags: ['Real-World Evidence', 'Drug Development', 'Clinical Trials', 'Data Quality', 'Electronic Health Records']
  },
  'ema-adaptive-trials': {
    id: 'ema-adaptive-trials',
    title: 'EMA Publishes Final Report on Adaptive Clinical Trial Designs',
    authority: 'EMA',
    category: 'Final Report',
    publishDate: 'September 21, 2025',
    lastUpdated: 'September 21, 2025',
    image: 'https://images.unsplash.com/photo-1670009935273-5730d29867b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxFdXJvcGVhbiUyMG1lZGljYWwlMjBhZ2VuY3l8ZW58MXx8fHwxNzU4NTY2NjI1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    originalUrl: 'https://www.ema.europa.eu/en/documents/scientific-guideline',
    summary: 'The European Medicines Agency has published its final report on adaptive clinical trial designs, providing comprehensive recommendations for implementing flexible trial methodologies. The report covers statistical considerations, regulatory expectations, and operational challenges in adaptive trials.',
    keyChanges: [
      'Updated statistical methodology requirements',
      'New guidance on interim analysis protocols',
      'Enhanced regulatory interaction procedures',
      'Clarified documentation standards',
      'Expanded scope for pediatric applications'
    ],
    impactedAreas: [
      'Clinical Operations',
      'Biostatistics',
      'Regulatory Strategy',
      'Data Management',
      'Quality Assurance'
    ],
    effectiveDate: 'Immediate',
    fullContent: {
      sections: [
        {
          title: 'Adaptive Trial Methodology',
          content: 'Adaptive clinical trials allow for modifications to trial design based on interim analyses while maintaining scientific validity and integrity. This report provides detailed guidance on acceptable adaptations including sample size re-estimation, treatment arm selection, and population enrichment strategies.'
        },
        {
          title: 'Statistical Considerations',
          content: 'The report emphasizes the importance of controlling Type I error rates and maintaining study power throughout adaptive modifications. Detailed statistical methods are provided for various adaptive designs including group sequential, sample size re-estimation, and seamless phase II/III trials.'
        }
      ]
    },
    relatedDocuments: [
      {
        title: 'EMA Guideline on Clinical Trials',
        url: 'https://www.ema.europa.eu/en/human-regulatory/research-development/clinical-trials',
        type: 'Guideline'
      }
    ],
    tags: ['Adaptive Trials', 'Clinical Design', 'Statistics', 'Interim Analysis']
  }
};

export function FeedDetailView({ feedId, onBack }: FeedDetailProps) {
  // Get feed details from mock data, fallback to FDA RWE guidance
  const feedDetail = mockFeedDetails[feedId] || mockFeedDetails['fda-real-world-evidence'];

  // Consultant recommendations based on feed content
  const getRelevantConsultants = (feed: FeedDetail): RecommendedConsultant[] => {
    const consultants: RecommendedConsultant[] = [
      {
        id: 'deloitte-team',
        name: 'Life Sciences Technology',
        firmName: 'Deloitte',
        logo: '🟢',
        specialization: ['AI in Pharma', 'Other Digital Transformation', 'Regulatory Affairs Consulting'],
        vendorFitScore: 4.4,
        customerRating: 4.2,
        experience: 'Average 7 months Digital Transformation',
        region: ['Global', 'APAC', 'North America'],
        proofPoint: 'Implemented AI chatbots for 5 major pharma companies',
        relevanceReason: 'Deep expertise in real-world evidence analytics and regulatory data transformation'
      },
      {
        id: 'accenture-team',
        name: 'Regulatory Technology Team',
        firmName: 'Accenture',
        logo: '🔷',
        specialization: ['Veeva Implementation', 'RIM Implementation', 'Regulatory Affairs Consulting'],
        vendorFitScore: 4.5,
        customerRating: 4.3,
        experience: 'Average 8 months Veeva RIM Implementation',
        region: ['North America', 'EU', 'Global'],
        proofPoint: 'Delivered 3 IDMP programs across EU & US',
        relevanceReason: 'Proven track record with FDA guidance implementation and regulatory system updates'
      },
      {
        id: 'nextrove-team',
        name: 'Regulatory Solutions Team',
        firmName: 'Nextrove',
        logo: '🔵',
        specialization: ['CTIS', 'Clinical / Regulatory Submissions', 'IDMP'],
        vendorFitScore: 4.2,
        customerRating: 4.1,
        experience: 'Average 6 months CTIS Implementation',
        region: ['EU', 'Global'],
        proofPoint: 'CTIS implementation for 15+ clinical trials',
        relevanceReason: 'Specialized in clinical trial design adaptations and regulatory submission optimization'
      },
      {
        id: 'independent-williams',
        name: 'David Williams',
        firmName: 'Independent Consultant',
        logo: '🟡',
        specialization: ['Veeva Implementation', 'IDMP', 'Regulatory Affairs Consulting'],
        vendorFitScore: 4.3,
        customerRating: 4.5,
        experience: '16+ years in Regulatory Technology',
        region: ['EU', 'North America'],
        proofPoint: 'Veeva RIM expert with 25+ implementations',
        relevanceReason: 'Extensive experience adapting regulatory systems to new FDA guidance requirements'
      },
      {
        id: 'fme-team',
        name: 'Regulatory Technology Practice',
        firmName: 'FME Lifesciences',
        logo: '🟣',
        specialization: ['Clinical / Regulatory Submissions', 'AI in Pharma', 'Veeva Implementation'],
        vendorFitScore: 4.1,
        customerRating: 4.2,
        experience: 'Average 7 months Veeva Implementation',
        region: ['APAC', 'Global'],
        proofPoint: 'Automated submissions reduced timeline by 35%',
        relevanceReason: 'APAC regulatory expertise with AI-powered submission automation'
      },
      {
        id: 'independent-smith',
        name: 'John Smith',
        firmName: 'Independent Consultant',
        logo: '👤',
        specialization: ['SharePoint / Web Apps', 'RIM Implementation', 'Other Digital Transformation'],
        vendorFitScore: 4.0,
        customerRating: 4.4,
        experience: '8+ years in SharePoint & Regulatory Systems',
        region: ['North America'],
        proofPoint: 'Built 20+ SharePoint regulatory portals',
        relevanceReason: 'Specialized in regulatory document management and workflow automation'
      },
      {
        id: 'pwc-team',
        name: 'Life Sciences Regulatory',
        firmName: 'PwC',
        logo: '🔶',
        specialization: ['Regulatory Strategy', 'AI in Pharma', 'IDMP'],
        vendorFitScore: 4.3,
        customerRating: 4.1,
        experience: 'Average 9 months Regulatory Strategy',
        region: ['Global', 'EU', 'North America'],
        proofPoint: 'Global regulatory harmonization for 10+ Fortune 500 pharma',
        relevanceReason: 'Strategic regulatory guidance implementation and change management expertise'
      },
      {
        id: 'kpmg-team',
        name: 'Healthcare & Life Sciences',
        firmName: 'KPMG',
        logo: '🔷',
        specialization: ['Digital Transformation', 'Regulatory Affairs Consulting', 'AI in Pharma'],
        vendorFitScore: 4.2,
        customerRating: 4.0,
        experience: 'Average 8 months Digital Transformation',
        region: ['Global', 'North America', 'EU'],
        proofPoint: 'Digital regulatory transformation for 15+ mid-size pharma',
        relevanceReason: 'End-to-end regulatory digitization and compliance automation'
      }
    ];

    // Filter consultants based on feed content relevance
    if (feed.authority === 'EMA') {
      return consultants.filter(c => 
        c.region.includes('EU') || c.region.includes('Global') ||
        c.specialization.some(s => s.includes('CTIS') || s.includes('Clinical'))
      ).slice(0, 6);
    } else if (feed.tags.includes('Real-World Evidence') || feed.tags.includes('Clinical Trials')) {
      return consultants.filter(c => 
        c.specialization.some(s => s.includes('AI') || s.includes('Digital') || s.includes('Clinical'))
      ).slice(0, 6);
    } else {
      return consultants.slice(0, 6);
    }
  };

  const recommendedConsultants = getRelevantConsultants(feedDetail);

  return (
    <div className="space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Feeds
        </Button>
        <div className="flex gap-2 ml-auto">
          <Button variant="outline" size="sm">
            <Bookmark className="h-4 w-4 mr-2" />
            Save
          </Button>
          <Button variant="outline" size="sm">
            <Share className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Article Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-0">
              {/* Hero Image */}
              <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                <ImageWithFallback
                  src={feedDetail.image}
                  alt={feedDetail.authority}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Article Header */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="outline">{feedDetail.authority}</Badge>
                  <Badge variant="secondary">{feedDetail.category}</Badge>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground ml-auto">
                    <Calendar className="h-3 w-3" />
                    {feedDetail.publishDate}
                  </div>
                </div>
                
                <h1 className="text-2xl font-bold mb-4">{feedDetail.title}</h1>
                
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
                  {feedDetail.effectiveDate && (
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Effective: {feedDetail.effectiveDate}
                    </div>
                  )}
                  {feedDetail.consultationPeriod && (
                    <div className="flex items-center gap-1">
                      <FileText className="h-3 w-3" />
                      Comment Period: {feedDetail.consultationPeriod}
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    Last Updated: {feedDetail.lastUpdated}
                  </div>
                </div>

                {/* Original Source Link */}
                <Card className="mb-6 bg-blue-50 border-blue-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-blue-900">Original Document</h3>
                        <p className="text-sm text-blue-700">View the official source document</p>
                      </div>
                      <Button asChild>
                        <a href={feedDetail.originalUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Visit {feedDetail.authority}
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Executive Summary */}
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-3">Executive Summary</h2>
                  <p className="text-muted-foreground leading-relaxed">{feedDetail.summary}</p>
                </div>

                <Separator className="my-6" />

                {/* Key Changes */}
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-3">Key Changes</h2>
                  <ul className="space-y-2">
                    {feedDetail.keyChanges.map((change, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span className="text-muted-foreground">{change}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator className="my-6" />

                {/* Full Content Sections */}
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Detailed Analysis</h2>
                  {feedDetail.fullContent.sections.map((section, index) => (
                    <div key={index}>
                      <h3 className="text-lg font-medium mb-3">{section.title}</h3>
                      <p className="text-muted-foreground leading-relaxed mb-4">{section.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Impact Areas */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Impacted Areas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {feedDetail.impactedAreas.map((area, index) => (
                  <Badge key={index} variant="outline" className="mr-2 mb-2">
                    {area}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Related Documents */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Related Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {feedDetail.relatedDocuments.map((doc, index) => (
                  <div key={index} className="border border-border rounded-md p-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium mb-1">{doc.title}</p>
                        <Badge variant="secondary" className="text-xs">{doc.type}</Badge>
                      </div>
                      <Button variant="ghost" size="sm" asChild>
                        <a href={doc.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tags</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {feedDetail.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Expert Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-blue-600" />
                Want to Consult an Expert?
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Recommended consultants for this regulatory update
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <ScrollArea className="h-96 pr-4">
                <div className="space-y-4">
                  {recommendedConsultants.map((consultant) => (
                    <div key={consultant.id} className="border border-border rounded-lg p-3 hover:bg-accent/50 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{consultant.logo}</span>
                          <div>
                            <h4 className="text-sm font-medium">{consultant.name}</h4>
                            <p className="text-xs text-muted-foreground">{consultant.firmName}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs font-medium">{consultant.vendorFitScore}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2 mb-3">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Building2 className="h-3 w-3" />
                          <span>{consultant.experience}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          <span>{consultant.region.slice(0, 2).join(', ')}</span>
                        </div>
                      </div>

                      <div className="mb-3">
                        <p className="text-xs text-blue-700 bg-blue-50 p-2 rounded border-l-2 border-blue-200">
                          <strong>Why relevant:</strong> {consultant.relevanceReason}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {consultant.specialization.slice(0, 2).map((spec) => (
                          <Badge key={spec} variant="outline" className="text-xs">
                            {spec}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1 text-xs">
                          View Profile
                        </Button>
                        <Button size="sm" className="flex-1 text-xs bg-blue-600 hover:bg-blue-700">
                          Contact
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              
              <Separator />
              
              <Button variant="outline" className="w-full text-sm">
                <MessageCircle className="h-4 w-4 mr-2" />
                Browse All Consultants
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <FileText className="h-4 w-4 mr-2" />
                Add to Watchlist
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="h-4 w-4 mr-2" />
                Set Reminder
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Globe className="h-4 w-4 mr-2" />
                Track Changes
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}