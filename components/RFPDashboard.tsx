import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { Switch } from "./ui/switch";
import { Separator } from "./ui/separator";
import { Progress } from "./ui/progress";
import { Slider } from "./ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  FileText, 
  Users, 
  CheckCircle, 
  Clock, 
  XCircle, 
  Send, 
  Eye, 
  MessageSquare, 
  ArrowRight, 
  ArrowLeft,
  Star,
  Calendar,
  DollarSign,
  Award,
  Download,
  Upload,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit
} from 'lucide-react';

interface RFP {
  id: string;
  title: string;
  category: string;
  status: 'draft' | 'review' | 'approved' | 'published' | 'responses' | 'awarded';
  author: string;
  reviewer?: string;
  approver?: string;
  createdAt: string;
  awardedTo?: string;
  requirements: any;
  publishType: 'vendors' | 'public';
  selectedVendors: string[];
  responses: VendorResponse[];
}

interface VendorResponse {
  vendorId: string;
  vendorName: string;
  logo: string;
  timeline: string;
  costEstimate: string;
  proofPoints: string[];
  vendorFitScore: number;
  submittedAt: string;
  documents: string[];
}

export function RFPDashboard() {
  const [currentView, setCurrentView] = useState<'list' | 'create' | 'workflow'>('list');
  const [currentStep, setCurrentStep] = useState(1);
  const [currentRFP, setCurrentRFP] = useState<Partial<RFP>>({
    category: '',
    title: '',
    status: 'draft',
    author: 'John Smith',
    requirements: {
      timeline: [50],
      cost: [50],
      experience: [50],
      technologyFit: [50],
      supportModel: [50]
    },
    publishType: 'vendors',
    selectedVendors: []
  });

  const [comments, setComments] = useState([
    { author: 'Sarah Johnson', text: 'Please clarify the timeline requirements', timestamp: '2 hours ago' },
    { author: 'Mike Chen', text: 'Budget seems reasonable for this scope', timestamp: '1 day ago' }
  ]);

  // Mock data for RFP list
  const mockRFPs: RFP[] = [
    {
      id: '1',
      title: 'RIMS Implementation - Global Pharma',
      category: 'RIMS',
      status: 'responses',
      author: 'John Smith',
      createdAt: '2024-01-15',
      requirements: {},
      publishType: 'vendors',
      selectedVendors: ['veeva', 'arisglobal'],
      responses: []
    },
    {
      id: '2', 
      title: 'IDMP Compliance Solution',
      category: 'IDMP',
      status: 'awarded',
      author: 'Sarah Johnson',
      awardedTo: 'Veeva Systems',
      createdAt: '2024-01-10',
      requirements: {},
      publishType: 'public',
      selectedVendors: [],
      responses: []
    },
    {
      id: '3',
      title: 'Phase III CRO Services',
      category: 'CRO', 
      status: 'draft',
      author: 'Mike Chen',
      createdAt: '2024-01-20',
      requirements: {},
      publishType: 'vendors',
      selectedVendors: [],
      responses: []
    }
  ];

  const steps = [
    { id: 1, title: 'Draft RFP', icon: FileText },
    { id: 2, title: 'Internal Workflow', icon: Users },
    { id: 3, title: 'Publishing', icon: Send },
    { id: 4, title: 'Responses', icon: MessageSquare },
    { id: 5, title: 'Award', icon: CheckCircle }
  ];

  const categories = [
    'RIMS', 'IDMP', 'Web Apps', 'CRO', 'Consulting'
  ];

  const vendors = [
    { id: 'veeva', name: 'Veeva Systems', logo: '🟢', vendorFitScore: 4.5, capabilities: ['RIMS', 'Submissions'], clients: '500+' },
    { id: 'arisglobal', name: 'ArisGlobal', logo: '🔵', vendorFitScore: 4.3, capabilities: ['AI Platform', 'Regulatory'], clients: '200+' },
    { id: 'iqvia', name: 'IQVIA', logo: '🟣', vendorFitScore: 4.2, capabilities: ['CRO', 'Data'], clients: '1000+' },
    { id: 'oracle', name: 'Oracle', logo: '🔴', vendorFitScore: 4.0, capabilities: ['Cloud', 'Database'], clients: '300+' },
    { id: 'extedo', name: 'Extedo', logo: '🟡', vendorFitScore: 4.1, capabilities: ['IDMP', 'Submissions'], clients: '150+' },
    { id: 'freyr', name: 'Freyr', logo: '🟠', vendorFitScore: 3.9, capabilities: ['Regulatory', 'Consulting'], clients: '100+' }
  ];

  const mockResponses: VendorResponse[] = [
    {
      vendorId: 'veeva',
      vendorName: 'Veeva Systems',
      logo: '🟢',
      timeline: '8-12 months',
      costEstimate: '$850K - $1.2M',
      proofPoints: ['25+ RIM implementations', 'Fortune 500 client base', 'Avg 6 month go-live'],
      vendorFitScore: 4.5,
      submittedAt: '2 days ago',
      documents: ['Technical Proposal.pdf', 'Cost Breakdown.xlsx', 'Case Studies.pdf']
    },
    {
      vendorId: 'arisglobal',
      vendorName: 'ArisGlobal',
      logo: '🔵',
      timeline: '6-10 months',
      costEstimate: '$750K - $950K',
      proofPoints: ['AI-powered platform', 'Regulatory expertise', 'Cloud-native solution'],
      vendorFitScore: 4.3,
      submittedAt: '1 day ago',
      documents: ['Proposal_ArisGlobal.pdf', 'Pricing.pdf', 'References.pdf']
    }
  ];

  const renderFormField = (key: string, field: any) => {
    switch (field.type) {
      case 'multiselect':
        return (
          <div key={key} className="space-y-2">
            <label className="text-sm font-medium">{field.label}</label>
            <div className="border border-border rounded-md p-3 max-h-32 overflow-y-auto space-y-2">
              {field.options.map((option: string) => (
                <div key={option} className="flex items-center space-x-2">
                  <Checkbox
                    id={`${key}-${option}`}
                    checked={currentRFP.requirements?.[key]?.includes(option) || false}
                    onCheckedChange={(checked) => {
                      const current = currentRFP.requirements?.[key] || [];
                      const updated = checked 
                        ? [...current, option]
                        : current.filter((item: string) => item !== option);
                      setCurrentRFP(prev => ({
                        ...prev,
                        requirements: {
                          ...prev.requirements,
                          [key]: updated
                        }
                      }));
                    }}
                  />
                  <label htmlFor={`${key}-${option}`} className="text-sm cursor-pointer">
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>
        );
      case 'select':
        return (
          <div key={key} className="space-y-2">
            <label className="text-sm font-medium">{field.label}</label>
            <Select
              value={currentRFP.requirements?.[key] || ''}
              onValueChange={(value) => {
                setCurrentRFP(prev => ({
                  ...prev,
                  requirements: {
                    ...prev.requirements,
                    [key]: value
                  }
                }));
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder={`Select ${field.label}`} />
              </SelectTrigger>
              <SelectContent>
                {field.options.map((option: string) => (
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );
      case 'text':
        return (
          <div key={key} className="space-y-2">
            <label className="text-sm font-medium">{field.label}</label>
            <Textarea
              value={currentRFP.requirements?.[key] || ''}
              onChange={(e) => {
                setCurrentRFP(prev => ({
                  ...prev,
                  requirements: {
                    ...prev.requirements,
                    [key]: e.target.value
                  }
                }));
              }}
              placeholder={`Enter ${field.label.toLowerCase()}`}
            />
          </div>
        );
      case 'number':
        return (
          <div key={key} className="space-y-2">
            <label className="text-sm font-medium">{field.label}</label>
            <Input
              type="number"
              value={currentRFP.requirements?.[key] || ''}
              onChange={(e) => {
                setCurrentRFP(prev => ({
                  ...prev,
                  requirements: {
                    ...prev.requirements,
                    [key]: e.target.value
                  }
                }));
              }}
              placeholder={`Enter ${field.label.toLowerCase()}`}
            />
          </div>
        );
      case 'radio':
        return (
          <div key={key} className="space-y-2">
            <label className="text-sm font-medium">{field.label}</label>
            <div className="space-y-2">
              {field.options.map((option: string) => (
                <div key={option} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id={`${key}-${option}`}
                    name={key}
                    value={option}
                    checked={currentRFP.requirements?.[key] === option}
                    onChange={(e) => {
                      setCurrentRFP(prev => ({
                        ...prev,
                        requirements: {
                          ...prev.requirements,
                          [key]: e.target.value
                        }
                      }));
                    }}
                  />
                  <label htmlFor={`${key}-${option}`} className="text-sm cursor-pointer">
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'review': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-blue-100 text-blue-800';
      case 'published': return 'bg-green-100 text-green-800';
      case 'responses': return 'bg-purple-100 text-purple-800';
      case 'awarded': return 'bg-emerald-100 text-emerald-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderRFPList = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">RFP Management</h1>
          <p className="text-muted-foreground">Manage your Request for Proposals</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export All
          </Button>
          <Button onClick={() => setCurrentView('create')}>
            <Plus className="h-4 w-4 mr-2" />
            Create RFP
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>RFP Overview</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search RFPs..." className="pl-8 w-64" />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockRFPs.map((rfp) => (
              <div key={rfp.id} className="border border-border rounded-lg p-4 hover:bg-accent/50">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-medium">{rfp.title}</h3>
                      <Badge variant="outline">{rfp.category}</Badge>
                      <Badge className={getStatusColor(rfp.status)}>
                        {rfp.status.charAt(0).toUpperCase() + rfp.status.slice(1)}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Author: {rfp.author}</span>
                      <span>Created: {rfp.createdAt}</span>
                      {rfp.awardedTo && <span>Awarded to: {rfp.awardedTo}</span>}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1: // Draft RFP
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Draft RFP</CardTitle>
                <p className="text-muted-foreground">Create your Request for Proposal</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">RFP Title</label>
                    <Input
                      value={currentRFP.title || ''}
                      onChange={(e) => setCurrentRFP(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Enter RFP title"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Category</label>
                    <Select
                      value={currentRFP.category || ''}
                      onValueChange={(value) => setCurrentRFP(prev => ({ ...prev, category: value, requirements: { ...prev.requirements } }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Document & Product Information */}
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="text-lg">Document & Product Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Approx. # of Documents</label>
                        <Input
                          value={currentRFP.requirements?.documentCount || ''}
                          onChange={(e) => setCurrentRFP(prev => ({
                            ...prev,
                            requirements: { ...prev.requirements, documentCount: e.target.value }
                          }))}
                          placeholder="e.g., 10,000"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Approx. # of Products</label>
                        <Input
                          type="number"
                          value={currentRFP.requirements?.productCount || ''}
                          onChange={(e) => setCurrentRFP(prev => ({
                            ...prev,
                            requirements: { ...prev.requirements, productCount: e.target.value }
                          }))}
                          placeholder="e.g., 50"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Source Systems</label>
                        <Select
                          value={currentRFP.requirements?.sourceSystems || ''}
                          onValueChange={(value) => setCurrentRFP(prev => ({
                            ...prev,
                            requirements: { ...prev.requirements, sourceSystems: value }
                          }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select source system" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="documentum">Documentum</SelectItem>
                            <SelectItem value="custom-dms">Custom DMS</SelectItem>
                            <SelectItem value="spreadsheets">Spreadsheets</SelectItem>
                            <SelectItem value="sharepoint">SharePoint</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Migration Complexity</label>
                        <div className="space-y-2">
                          {['Simple', 'Moderate', 'Complex'].map(option => (
                            <div key={option} className="flex items-center space-x-2">
                              <input
                                type="radio"
                                id={`complexity-${option}`}
                                name="migrationComplexity"
                                value={option.toLowerCase()}
                                checked={currentRFP.requirements?.migrationComplexity === option.toLowerCase()}
                                onChange={(e) => setCurrentRFP(prev => ({
                                  ...prev,
                                  requirements: { ...prev.requirements, migrationComplexity: e.target.value }
                                }))}
                              />
                              <label htmlFor={`complexity-${option}`} className="text-sm cursor-pointer">
                                {option}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* User Base */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">User Base</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Expected # of Users</label>
                      <div className="space-y-2">
                        {['50–100', '100–200', '200–500', '500+'].map(option => (
                          <div key={option} className="flex items-center space-x-2">
                            <input
                              type="radio"
                              id={`users-${option}`}
                              name="expectedUsers"
                              value={option}
                              checked={currentRFP.requirements?.expectedUsers === option}
                              onChange={(e) => setCurrentRFP(prev => ({
                                ...prev,
                                requirements: { ...prev.requirements, expectedUsers: e.target.value }
                              }))}
                            />
                            <label htmlFor={`users-${option}`} className="text-sm cursor-pointer">
                              {option}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">User Types</label>
                      <div className="space-y-2">
                        {['Regulatory Affairs', 'Submission Managers', 'Regional Affiliates', 'External Partners'].map(option => (
                          <div key={option} className="flex items-center space-x-2">
                            <Checkbox
                              id={`userType-${option}`}
                              checked={currentRFP.requirements?.userTypes?.includes(option) || false}
                              onCheckedChange={(checked) => {
                                const current = currentRFP.requirements?.userTypes || [];
                                const updated = checked 
                                  ? [...current, option]
                                  : current.filter((item: string) => item !== option);
                                setCurrentRFP(prev => ({
                                  ...prev,
                                  requirements: { ...prev.requirements, userTypes: updated }
                                }));
                              }}
                            />
                            <label htmlFor={`userType-${option}`} className="text-sm cursor-pointer">
                              {option}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Compliance & Validation */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Compliance & Validation Requirements</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      'GxP compliance',
                      '21 CFR Part 11 validation',
                      'Audit Trail',
                      'Vendor to provide validation documentation (IQ/OQ/PQ)'
                    ].map(option => (
                      <div key={option} className="flex items-center space-x-2">
                        <Checkbox
                          id={`compliance-${option}`}
                          checked={currentRFP.requirements?.compliance?.includes(option) || false}
                          onCheckedChange={(checked) => {
                            const current = currentRFP.requirements?.compliance || [];
                            const updated = checked 
                              ? [...current, option]
                              : current.filter((item: string) => item !== option);
                            setCurrentRFP(prev => ({
                              ...prev,
                              requirements: { ...prev.requirements, compliance: updated }
                            }));
                          }}
                        />
                        <label htmlFor={`compliance-${option}`} className="text-sm cursor-pointer">
                          {option}
                        </label>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Implementation Preferences */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Implementation Preferences</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Deployment Model</label>
                        <Select
                          value={currentRFP.requirements?.deploymentModel || ''}
                          onValueChange={(value) => setCurrentRFP(prev => ({
                            ...prev,
                            requirements: { ...prev.requirements, deploymentModel: value }
                          }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select model" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="saas">SaaS</SelectItem>
                            <SelectItem value="on-prem">On-Premise</SelectItem>
                            <SelectItem value="hybrid">Hybrid</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Preferred Implementation Partner</label>
                        <Input
                          value={currentRFP.requirements?.implementationPartner || ''}
                          onChange={(e) => setCurrentRFP(prev => ({
                            ...prev,
                            requirements: { ...prev.requirements, implementationPartner: e.target.value }
                          }))}
                          placeholder="Enter partner name"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Engagement Model</label>
                        <Select
                          value={currentRFP.requirements?.engagementModel || ''}
                          onValueChange={(value) => setCurrentRFP(prev => ({
                            ...prev,
                            requirements: { ...prev.requirements, engagementModel: value }
                          }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select model" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="fixed-bid">Fixed Bid</SelectItem>
                            <SelectItem value="time-material">Time & Material</SelectItem>
                            <SelectItem value="hybrid">Hybrid</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Budget & Evaluation */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Budget & Evaluation Criteria</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={currentRFP.requirements?.includeBudget || false}
                          onCheckedChange={(checked) => setCurrentRFP(prev => ({
                            ...prev,
                            requirements: { ...prev.requirements, includeBudget: checked }
                          }))}
                        />
                        <label className="text-sm font-medium">Include Budget Band</label>
                      </div>
                      {currentRFP.requirements?.includeBudget && (
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Budget Band</label>
                          <div className="space-y-2">
                            {['<$200K', '$200–500K', '>$500K'].map(option => (
                              <div key={option} className="flex items-center space-x-2">
                                <input
                                  type="radio"
                                  id={`budget-${option}`}
                                  name="budgetBand"
                                  value={option}
                                  checked={currentRFP.requirements?.budgetBand === option}
                                  onChange={(e) => setCurrentRFP(prev => ({
                                    ...prev,
                                    requirements: { ...prev.requirements, budgetBand: e.target.value }
                                  }))}
                                />
                                <label htmlFor={`budget-${option}`} className="text-sm cursor-pointer">
                                  {option}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium">Evaluation Criteria Weighting</h4>
                      {[
                        { key: 'timeline', label: 'Timeline' },
                        { key: 'cost', label: 'Cost' },
                        { key: 'experience', label: 'Experience' },
                        { key: 'technologyFit', label: 'Technology Fit' },
                        { key: 'supportModel', label: 'Support Model' }
                      ].map(criteria => (
                        <div key={criteria.key} className="space-y-2">
                          <div className="flex justify-between">
                            <label className="text-sm font-medium">{criteria.label}</label>
                            <span className="text-sm text-muted-foreground">
                              {currentRFP.requirements?.[criteria.key]?.[0] || 50}%
                            </span>
                          </div>
                          <Slider
                            value={currentRFP.requirements?.[criteria.key] || [50]}
                            onValueChange={(value) => setCurrentRFP(prev => ({
                              ...prev,
                              requirements: { ...prev.requirements, [criteria.key]: value }
                            }))}
                            max={100}
                            step={5}
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Attachments */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Attachments / References</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Upload past RFPs or current process documents
                      </p>
                      <Button variant="outline" size="sm">
                        Choose Files
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </div>
        );

      case 2: // Internal Workflow
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Internal Workflow</CardTitle>
                <p className="text-muted-foreground">Review and approval process</p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Approval Routing */}
                <div className="space-y-4">
                  <h3 className="font-medium">Approval Routing</h3>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-sm">Author: {currentRFP.author}</span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    <div className="flex items-center space-x-2">
                      <Clock className="h-5 w-5 text-yellow-600" />
                      <span className="text-sm">Reviewer: Sarah Johnson</span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    <div className="flex items-center space-x-2">
                      <Clock className="h-5 w-5 text-gray-400" />
                      <span className="text-sm">Approver: Mike Chen</span>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Status */}
                <div className="space-y-2">
                  <h3 className="font-medium">Current Status</h3>
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                    Pending Review
                  </Badge>
                </div>

                <Separator />

                {/* Comments */}
                <div className="space-y-4">
                  <h3 className="font-medium">Comments & Collaboration</h3>
                  <div className="space-y-3">
                    {comments.map((comment, index) => (
                      <div key={index} className="border border-border rounded-md p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">{comment.author}</span>
                          <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                        </div>
                        <p className="text-sm">{comment.text}</p>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <Textarea placeholder="Add a comment..." />
                    <Button size="sm">Add Comment</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 3: // Publishing
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Publishing Options</CardTitle>
                <p className="text-muted-foreground">Choose how to distribute your RFP</p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Publishing Type */}
                <div className="space-y-4">
                  <h3 className="font-medium">Distribution Method</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="vendors"
                        name="publishType"
                        value="vendors"
                        checked={currentRFP.publishType === 'vendors'}
                        onChange={(e) => setCurrentRFP(prev => ({ ...prev, publishType: e.target.value as 'vendors' | 'public' }))}
                      />
                      <label htmlFor="vendors" className="text-sm">Option A: Select Specific Vendors</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="public"
                        name="publishType"
                        value="public"
                        checked={currentRFP.publishType === 'public'}
                        onChange={(e) => setCurrentRFP(prev => ({ ...prev, publishType: e.target.value as 'vendors' | 'public' }))}
                      />
                      <label htmlFor="public" className="text-sm">Option B: Public Publishing</label>
                    </div>
                  </div>
                </div>

                {currentRFP.publishType === 'vendors' && (
                  <div className="space-y-4">
                    <h3 className="font-medium">Select Vendors</h3>
                    <div className="grid grid-cols-1 gap-3">
                      {vendors.map(vendor => (
                        <div key={vendor.id} className="border border-border rounded-md p-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <Checkbox
                                id={vendor.id}
                                checked={currentRFP.selectedVendors?.includes(vendor.id) || false}
                                onCheckedChange={(checked) => {
                                  const current = currentRFP.selectedVendors || [];
                                  const updated = checked
                                    ? [...current, vendor.id]
                                    : current.filter(id => id !== vendor.id);
                                  setCurrentRFP(prev => ({ ...prev, selectedVendors: updated }));
                                }}
                              />
                              <span className="text-xl">{vendor.logo}</span>
                              <div>
                                <label htmlFor={vendor.id} className="text-sm font-medium cursor-pointer">
                                  {vendor.name}
                                </label>
                                <p className="text-xs text-muted-foreground">{vendor.capabilities.join(', ')}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center gap-1">
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                <span className="text-sm font-medium">{vendor.vendorFitScore}</span>
                              </div>
                              <p className="text-xs text-muted-foreground">{vendor.clients} clients</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <Separator />

                {/* Visibility Preview */}
                <div className="space-y-2">
                  <h3 className="font-medium">Visibility Preview</h3>
                  <div className="border border-border rounded-md p-3 bg-muted">
                    <div className="flex items-center gap-2 mb-2">
                      <Eye className="h-4 w-4" />
                      <span className="text-sm font-medium">Who will see this RFP:</span>
                    </div>
                    {currentRFP.publishType === 'public' ? (
                      <p className="text-sm">All registered vendors in our marketplace</p>
                    ) : (
                      <p className="text-sm">
                        {currentRFP.selectedVendors?.length || 0} selected vendors: {
                          currentRFP.selectedVendors?.map(id => 
                            vendors.find(v => v.id === id)?.name
                          ).join(', ') || 'None selected'
                        }
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 4: // Responses
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Vendor Responses</CardTitle>
                <p className="text-muted-foreground">Review submitted proposals</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4">
                  {mockResponses.map(response => (
                    <Card key={response.vendorId} className="border-2">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{response.logo}</span>
                            <div>
                              <h3 className="font-medium">{response.vendorName}</h3>
                              <p className="text-sm text-muted-foreground">Submitted {response.submittedAt}</p>
                            </div>
                          </div>
                          <Badge className="bg-green-100 text-green-800">
                            VendorFit {response.vendorFitScore}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mb-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="text-xs text-muted-foreground">Timeline</p>
                              <p className="text-sm font-medium">{response.timeline}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="text-xs text-muted-foreground">Cost Estimate</p>
                              <p className="text-sm font-medium">{response.costEstimate}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Award className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="text-xs text-muted-foreground">Documents</p>
                              <p className="text-sm font-medium">{response.documents.length} files</p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <p className="text-sm font-medium">Proof Points:</p>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {response.proofPoints.map((point, index) => (
                              <li key={index}>• {point}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex gap-2 mt-4">
                          <Button variant="outline" size="sm">View Details</Button>
                          <Button variant="outline" size="sm">Download Files</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Separator className="my-6" />

                <Button variant="outline" className="w-full">
                  Compare Responses Side-by-Side
                </Button>
              </CardContent>
            </Card>
          </div>
        );

      case 5: // Award
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Award RFP</CardTitle>
                <p className="text-muted-foreground">Select winning vendor and award RFP</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Final Selection</h3>
                  <div className="grid grid-cols-1 gap-3">
                    {mockResponses.map(response => (
                      <div key={response.vendorId} className="flex items-center justify-between p-3 border border-border rounded-md">
                        <div className="flex items-center gap-3">
                          <span>{response.logo}</span>
                          <div>
                            <span className="font-medium">{response.vendorName}</span>
                            <p className="text-sm text-muted-foreground">{response.costEstimate}</p>
                          </div>
                          <Badge variant="outline">Score: {response.vendorFitScore}</Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="default" 
                            size="sm"
                            onClick={() => setCurrentRFP(prev => ({ ...prev, awardedTo: response.vendorName }))}
                          >
                            Award RFP
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <label className="text-sm font-medium">Award Rationale</label>
                  <Textarea placeholder="Explain the decision rationale..." />
                </div>

                {currentRFP.awardedTo && (
                  <div className="border border-green-200 rounded-md p-4 bg-green-50">
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="h-5 w-5 text-green-600" />
                      <span className="font-medium text-green-800">RFP Awarded</span>
                    </div>
                    <p className="text-sm text-green-700">
                      This RFP has been awarded to {currentRFP.awardedTo}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  const renderWorkflowView = () => (
    <div className="space-y-6">
      {/* Progress Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>RFP Workflow</CardTitle>
              <p className="text-muted-foreground">{currentRFP.title || 'New RFP'}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setCurrentView('list')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to List
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export RFP
              </Button>
            </div>
          </div>
          <Progress value={(currentStep / steps.length) * 100} className="w-full" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.id} className="flex flex-col items-center">
                  <div className={`p-2 rounded-full ${
                    currentStep >= step.id 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="text-sm mt-1">{step.title}</span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Step Content */}
      {renderStepContent()}

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          disabled={currentStep === 1}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        <Button
          onClick={() => setCurrentStep(Math.min(5, currentStep + 1))}
          disabled={currentStep === 5}
        >
          {currentStep === 5 ? 'Complete' : 'Next'}
          {currentStep !== 5 && <ArrowRight className="h-4 w-4 ml-2" />}
        </Button>
      </div>
    </div>
  );

  // Main render logic
  if (currentView === 'list') {
    return <div className="p-6">{renderRFPList()}</div>;
  }

  if (currentView === 'create' || currentView === 'workflow') {
    return <div className="p-6">{renderWorkflowView()}</div>;
  }

  return null;
}