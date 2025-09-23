import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Separator } from "./ui/separator";
import { Star, Building2, Clock, MapPin, ExternalLink, TrendingUp, Globe, Award, Users } from 'lucide-react';

interface Consultant {
  id: string;
  name: string;
  firmName: string;
  logo: string;
  specialization: string[];
  experience: string;
  experienceLevel: string;
  engagementModel: string;
  region: string[];
  vendorFitScore: number;
  customerRating: number;
  npsScore: number;
  proofPoint: string;
  pastClients: string[];
  totalReviews: number;
  bio: string;
  certifications: string[];
  caseStudies: string[];
}

export function ConsultantsDashboard() {
  const [consultants, setConsultants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedConsultant, setSelectedConsultant] = useState<any>(null);
  const [filters, setFilters] = useState({
    specialization: '',
    region: 'All',
    experienceLevel: 'All',
    engagementModel: 'All'
  });

  useEffect(() => {
    loadConsultants();
  }, []);

  const loadConsultants = async () => {
    try {
      setLoading(true);
      const response = await apiClient.getConsultants();
      if (response.success) {
        setConsultants(response.data);
      }
    } catch (error) {
      console.error('Error loading consultants:', error);
    } finally {
      setLoading(false);
    }
  };

  const sampleConsultants: any[] = [
    {
      id: 'accenture-team',
      name: 'Regulatory Technology Team',
      firmName: 'Accenture',
      logo: '🔷',
      specialization: ['Veeva Implementation', 'RIM Implementation', 'Regulatory Affairs Consulting'],
      experience: 'Average 8 months Veeva RIM Implementation',
      experienceLevel: '10-15 years',
      engagementModel: 'Enterprise Consulting Firm',
      region: ['North America', 'EU', 'Global'],
      vendorFitScore: 4.5,
      customerRating: 4.3,
      npsScore: 78,
      proofPoint: 'Delivered 3 IDMP programs across EU & US',
      pastClients: ['Pfizer', 'J&J', 'Novartis', 'Merck'],
      totalReviews: 89,
      bio: 'Global team of senior consultants with 12+ years specializing in Veeva RIM implementations and regulatory transformation projects across Fortune 500 pharmaceutical companies.',
      certifications: ['Veeva Certified', 'PMP', 'CSPO', 'SAFe Agilist'],
      caseStudies: [
        'Under 8 months: Veeva RIM implementation for Top 10 Pharma',
        'Under 6 months: IDMP compliance program for EU market (24 countries)',
        'Under 12 months: Global regulatory harmonization initiative'
      ]
    },
    {
      id: 'deloitte-team',
      name: 'Life Sciences Technology',
      firmName: 'Deloitte',
      logo: '🟢',
      specialization: ['AI in Pharma', 'Other Digital Transformation', 'Regulatory Affairs Consulting'],
      experience: 'Average 7 months Digital Transformation',
      experienceLevel: '15+ years',
      engagementModel: 'Enterprise Consulting Firm',
      region: ['Global', 'APAC', 'North America'],
      vendorFitScore: 4.4,
      customerRating: 4.2,
      npsScore: 75,
      proofPoint: 'Implemented AI chatbots for 5 major pharma companies',
      pastClients: ['Roche', 'AstraZeneca', 'Genentech', 'Biogen'],
      totalReviews: 67,
      bio: 'Partner-led team driving AI and digital transformation initiatives in life sciences, with deep expertise in regulatory technology and automation.',
      certifications: ['AI/ML Certified', 'PMP', 'Digital Transformation Leader', 'Regulatory Affairs (RAC)'],
      caseStudies: [
        'Under 6 months: AI-powered regulatory submission system (reduced timeline by 40%)',
        'Under 8 months: Intelligent document processing for regulatory affairs',
        'Under 4 months: Chatbot implementation for regulatory Q&A'
      ]
    },
    {
      id: 'nextrove-team',
      name: 'Regulatory Solutions Team',
      firmName: 'Nextrove',
      logo: '🔵',
      specialization: ['CTIS', 'Clinical / Regulatory Submissions', 'IDMP'],
      experience: 'Average 6 months CTIS Implementation',
      experienceLevel: '10-15 years',
      engagementModel: 'Specialized Consulting Firm',
      region: ['EU', 'Global'],
      vendorFitScore: 4.2,
      customerRating: 4.1,
      npsScore: 72,
      proofPoint: 'CTIS implementation for 15+ clinical trials',
      pastClients: ['Sanofi', 'GSK', 'Bayer', 'Boehringer'],
      totalReviews: 54,
      bio: 'Specialized team focusing exclusively on EU regulatory systems, CTIS implementations, and clinical trial submissions with extensive IDMP experience.',
      certifications: ['CTIS Certified', 'IDMP Expert', 'Clinical Research', 'EU Regulatory Affairs'],
      caseStudies: [
        'Under 6 months: Multi-country CTIS deployment (12 EU countries)',
        'Under 8 months: IDMP data governance framework implementation',
        'Under 5 months: Clinical trial submission automation'
      ]
    },
    {
      id: 'fme-team',
      name: 'Regulatory Technology Practice',
      firmName: 'FME Lifesciences',
      logo: '🟣',
      specialization: ['Clinical / Regulatory Submissions', 'AI in Pharma', 'Veeva Implementation'],
      experience: 'Average 7 months Veeva Implementation',
      experienceLevel: '10-15 years',
      engagementModel: 'Specialized Consulting Firm',
      region: ['APAC', 'Global'],
      vendorFitScore: 4.1,
      customerRating: 4.2,
      npsScore: 74,
      proofPoint: 'Automated submissions reduced timeline by 35%',
      pastClients: ['Takeda', 'Astellas', 'Daiichi Sankyo', 'Chugai'],
      totalReviews: 38,
      bio: 'Specialized team at FME Lifesciences with expertise in clinical submissions, AI automation, and APAC regulatory requirements.',
      certifications: ['Clinical Research Professional', 'AI in Healthcare', 'APAC Regulatory Expert', 'Veeva Certified'],
      caseStudies: [
        'Under 7 months: Veeva RIM implementation for mid-size pharma',
        'Under 9 months: AI-powered clinical data review system',
        'Under 5 months: APAC multi-country submission strategy'
      ]
    },
    {
      id: 'independent-smith',
      name: 'John Smith',
      firmName: 'Independent Consultant',
      logo: '👤',
      specialization: ['SharePoint / Web Apps', 'RIM Implementation', 'Other Digital Transformation'],
      experience: '8+ years in SharePoint & Regulatory Systems',
      experienceLevel: '5-10 years',
      engagementModel: 'Independent Consultant',
      region: ['North America'],
      vendorFitScore: 4.0,
      customerRating: 4.4,
      npsScore: 82,
      proofPoint: 'Built 20+ SharePoint regulatory portals',
      pastClients: ['Amgen', 'Gilead', 'Moderna', 'Vertex'],
      totalReviews: 42,
      bio: 'Independent consultant with deep expertise in SharePoint development for regulatory affairs and document management systems.',
      certifications: ['SharePoint Expert', 'Microsoft Certified', 'Regulatory Technology', 'Agile Certified'],
      caseStudies: [
        'Regulatory document portal for biotech (reduced search time by 60%)',
        'SharePoint-based submission tracking system',
        'Automated regulatory workflow solutions'
      ]
    },
    {
      id: 'independent-williams',
      name: 'David Williams',
      firmName: 'Independent Consultant',
      logo: '🟡',
      specialization: ['Veeva Implementation', 'IDMP', 'Regulatory Affairs Consulting'],
      experience: '16+ years in Regulatory Technology',
      experienceLevel: '15+ years',
      engagementModel: 'Independent Consultant',
      region: ['EU', 'North America'],
      vendorFitScore: 4.3,
      customerRating: 4.5,
      npsScore: 80,
      proofPoint: 'Veeva RIM expert with 25+ implementations',
      pastClients: ['AbbVie', 'Eli Lilly', 'BMS', 'Celgene'],
      totalReviews: 73,
      bio: 'Independent consultant with 16+ years exclusively in regulatory technology implementations and strategy, formerly partner at RegTech Solutions.',
      certifications: ['Veeva Master Certified', 'IDMP Lead', 'Regulatory Strategy', 'Change Management'],
      caseStudies: [
        'Global Veeva RIM rollout (85 countries)',
        'IDMP master data strategy and implementation',
        'Regulatory process optimization (50% efficiency gain)'
      ]
    }
  ];

  const displayConsultants = consultants.length > 0 ? consultants : sampleConsultants;
  
  const filteredConsultants = displayConsultants.filter(consultant => {
    if (filters.specialization !== 'All' && filters.specialization && !consultant.expertise?.includes(filters.specialization)) return false;
    if (filters.region !== 'All' && !consultant.location?.includes(filters.region)) return false;
    if (filters.experienceLevel !== 'All' && consultant.experienceLevel !== filters.experienceLevel) return false;
    return true;
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) 
            ? 'fill-yellow-400 text-yellow-400' 
            : i < rating 
            ? 'fill-yellow-200 text-yellow-200' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Regulatory Consultants</CardTitle>
          <p className="text-muted-foreground">Find expert consultants for your regulatory technology projects</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm">Category (Specialization)</label>
              <Select value={filters.specialization} onValueChange={(value) => setFilters(prev => ({ ...prev, specialization: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Specializations</SelectItem>
                  <SelectItem value="Veeva Implementation">Veeva Implementation</SelectItem>
                  <SelectItem value="RIM Implementation">RIM Implementation</SelectItem>
                  <SelectItem value="AI in Pharma">AI in Pharma (chatbots, automation, analytics)</SelectItem>
                  <SelectItem value="SharePoint / Web Apps">SharePoint / Web Apps</SelectItem>
                  <SelectItem value="Regulatory Affairs Consulting">Regulatory Affairs Consulting</SelectItem>
                  <SelectItem value="IDMP">IDMP</SelectItem>
                  <SelectItem value="CTIS">CTIS</SelectItem>
                  <SelectItem value="Clinical / Regulatory Submissions">Clinical / Regulatory Submissions</SelectItem>
                  <SelectItem value="Other Digital Transformation">Other Digital Transformation</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm">Region</label>
              <Select value={filters.region} onValueChange={(value) => setFilters(prev => ({ ...prev, region: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Regions</SelectItem>
                  <SelectItem value="EU">EU</SelectItem>
                  <SelectItem value="North America">North America</SelectItem>
                  <SelectItem value="APAC">APAC</SelectItem>
                  <SelectItem value="Global">Global</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm">Experience Level</label>
              <Select value={filters.experienceLevel} onValueChange={(value) => setFilters(prev => ({ ...prev, experienceLevel: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Levels</SelectItem>
                  <SelectItem value="5-10 years">5–10 years</SelectItem>
                  <SelectItem value="10-15 years">10–15 years</SelectItem>
                  <SelectItem value="15+ years">15+ years</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm">Engagement Model</label>
              <Select value={filters.engagementModel} onValueChange={(value) => setFilters(prev => ({ ...prev, engagementModel: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Models</SelectItem>
                  <SelectItem value="Independent Consultant">Independent Consultant</SelectItem>
                  <SelectItem value="Specialized Consulting Firm">Specialized Consulting Firm</SelectItem>
                  <SelectItem value="Enterprise Consulting Firm">Enterprise Consulting Firm</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Consultant Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredConsultants.map((consultant) => (
          <Card key={consultant.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{consultant.logo}</div>
                  <div>
                    <h3 className="font-semibold">{consultant.name}</h3>
                    <p className="text-sm text-muted-foreground">{consultant.firmName}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedConsultant(consultant)}
                  className="text-blue-600 hover:text-blue-700"
                >
                  <div className="flex items-center gap-1">
                    <span>VendorFit</span>
                    <ExternalLink className="h-3 w-3" />
                  </div>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">VendorFit Score</span>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  {consultant.vendorFitScore}/5.0
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{consultant.experience}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <span>{consultant.engagementModel}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{consultant.region.join(', ')}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1">
                {consultant.specialization.slice(0, 2).map((spec) => (
                  <Badge key={spec} variant="outline" className="text-xs">
                    {spec}
                  </Badge>
                ))}
                {consultant.specialization.length > 2 && (
                  <Badge variant="outline" className="text-xs">
                    +{consultant.specialization.length - 2} more
                  </Badge>
                )}
              </div>

              <div className="text-sm text-muted-foreground">
                <strong>Past Clients:</strong> {consultant.pastClients.slice(0, 3).join(', ')}
                {consultant.pastClients.length > 3 && '...'}
              </div>

              <Button className="w-full" variant="outline">
                Contact
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Consultant Details */}
      {selectedConsultant && (
        <Card className="border-blue-200 bg-blue-50/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-4xl">{selectedConsultant.logo}</div>
                <div>
                  <CardTitle className="flex items-center gap-3">
                    {selectedConsultant.name} • {selectedConsultant.firmName}
                    <Badge className="bg-green-100 text-green-800">
                      VendorFit {selectedConsultant.vendorFitScore}
                    </Badge>
                  </CardTitle>
                  <p className="text-muted-foreground mt-1">{selectedConsultant.bio}</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setSelectedConsultant(null)}
                className="text-muted-foreground"
              >
                ✕
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Rating & Reviews */}
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium">Customer Rating</span>
                    <button className="text-blue-600 hover:underline text-sm">
                      ({selectedConsultant.totalReviews} reviews)
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex">{renderStars(selectedConsultant.customerRating)}</div>
                    <span className="font-medium">{selectedConsultant.customerRating}/5.0</span>
                  </div>
                </div>

                <Separator />

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium">NPS Score</span>
                    <button className="text-blue-600 hover:underline text-sm">
                      (View Feedback)
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="font-medium text-green-600">{selectedConsultant.npsScore}% recommend</span>
                  </div>
                </div>
              </div>

              {/* Specializations & Certifications */}
              <div className="space-y-4">
                <div>
                  <span className="font-medium">Specializations</span>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {selectedConsultant.specialization.map((spec) => (
                      <Badge key={spec} variant="outline" className="text-xs">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <span className="font-medium">Certifications</span>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {selectedConsultant.certifications.map((cert) => (
                      <Badge key={cert} variant="secondary" className="text-xs flex items-center gap-1">
                        <Award className="h-3 w-3" />
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <span className="font-medium">Proof Point</span>
                  <p className="text-muted-foreground mt-1">{selectedConsultant.proofPoint}</p>
                </div>
              </div>

              {/* Case Studies & CTA */}
              <div className="space-y-4">
                <div>
                  <span className="font-medium">
                    {selectedConsultant.engagementModel === 'Independent Consultant' ? 'Case Studies' : 'Implementation Timeline'}
                  </span>
                  <ul className="mt-2 space-y-1">
                    {selectedConsultant.caseStudies.map((study, index) => (
                      <li key={index} className="text-sm text-muted-foreground">
                        • {study}
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator />

                <div>
                  <span className="font-medium">Past Pharma Clients</span>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {selectedConsultant.pastClients.map((client) => (
                      <Badge key={client} variant="outline" className="text-xs flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {client}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <Button variant="outline" className="w-full">
                    View Profile
                  </Button>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Contact
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results Summary */}
      <div className="text-center text-muted-foreground">
        Showing {filteredConsultants.length} of {consultants.length} consultants matching your criteria
      </div>
    </div>
  );
}