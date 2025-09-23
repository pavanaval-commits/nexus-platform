import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Separator } from "./ui/separator";
import { Checkbox } from "./ui/checkbox";
import { Star, Building2, Users, MapPin, ExternalLink, TrendingUp, Globe, Award, FlaskConical } from 'lucide-react';

interface CRO {
  id: string;
  name: string;
  logo: string;
  services: string[];
  therapeuticAreas: string[];
  geographicCoverage: string[];
  trialPhaseFocus: string[];
  vendorFitScore: number;
  customerRating: number;
  npsScore: number;
  proofPoint: string;
  totalTrials: number;
  totalReviews: number;
  description: string;
  keyCapabilities: string[];
  recentWins: string[];
}

export function CRODashboard() {
  const [selectedCRO, setSelectedCRO] = useState<CRO | null>(null);
  const [filters, setFilters] = useState({
    category: 'All',
    therapeuticAreas: [] as string[],
    geographicCoverage: 'All',
    trialPhaseFocus: 'All'
  });

  const cros: CRO[] = [
    {
      id: 'iqvia',
      name: 'IQVIA',
      logo: '🔵',
      services: ['Clinical Trials (Phase I–IV)', 'Data Management', 'Biostatistics', 'Regulatory Submissions Support'],
      therapeuticAreas: ['Oncology', 'Rare Diseases', 'Cardiology', 'CNS', 'General'],
      geographicCoverage: ['Global', 'North America', 'EU', 'APAC'],
      trialPhaseFocus: ['Phase I', 'Phase II', 'Phase III', 'Phase IV'],
      vendorFitScore: 4.6,
      customerRating: 4.3,
      npsScore: 76,
      proofPoint: 'Conducted 5,000+ clinical trials globally',
      totalTrials: 5247,
      totalReviews: 189,
      description: 'World\'s largest contract research organization providing comprehensive clinical development services',
      keyCapabilities: ['Global reach (100+ countries)', 'Real-world evidence platform', 'Regulatory expertise', 'Technology integration'],
      recentWins: ['Pfizer COVID-19 vaccine trials', 'Rare disease program (15 countries)', 'AI-powered patient recruitment']
    },
    {
      id: 'syneos',
      name: 'Syneos Health',
      logo: '🟢',
      services: ['Clinical Trials (Phase I–IV)', 'Site Management / Monitoring', 'Regulatory Submissions Support', 'Data Management'],
      therapeuticAreas: ['Oncology', 'CNS', 'Vaccines', 'Infectious Diseases'],
      geographicCoverage: ['Global', 'North America', 'EU'],
      trialPhaseFocus: ['Phase I', 'Phase II', 'Phase III'],
      vendorFitScore: 4.4,
      customerRating: 4.2,
      npsScore: 74,
      proofPoint: 'Accelerated 200+ drug approvals worldwide',
      totalTrials: 3890,
      totalReviews: 143,
      description: 'Integrated biopharmaceutical solutions organization combining clinical and commercial services',
      keyCapabilities: ['Integrated model (clinical + commercial)', 'Therapeutic expertise', 'Site network', 'Data analytics'],
      recentWins: ['Oncology biomarker study', 'CNS Phase III program', 'Vaccine development partnership']
    },
    {
      id: 'ppd-thermo',
      name: 'PPD (Thermo Fisher)',
      logo: '🔴',
      services: ['Clinical Trials (Phase I–IV)', 'Biostatistics', 'Pharmacovigilance / Safety', 'Data Management'],
      therapeuticAreas: ['Oncology', 'Rare Diseases', 'Cardiology', 'General'],
      geographicCoverage: ['Global', 'North America', 'EU', 'APAC'],
      trialPhaseFocus: ['Preclinical', 'Phase I', 'Phase II', 'Phase III'],
      vendorFitScore: 4.5,
      customerRating: 4.4,
      npsScore: 78,
      proofPoint: 'Early-phase expertise with 95% on-time delivery',
      totalTrials: 4156,
      totalReviews: 167,
      description: 'Leading CRO specializing in early-phase development and complex study designs',
      keyCapabilities: ['Early-phase excellence', 'Biomarker expertise', 'Regulatory strategy', 'Global infrastructure'],
      recentWins: ['First-in-human oncology studies', 'Rare disease natural history study', 'Biomarker-driven trials']
    },
    {
      id: 'covance',
      name: 'Covance (LabCorp)',
      logo: '🟡',
      services: ['Clinical Trials (Phase I–IV)', 'Site Management / Monitoring', 'Biostatistics', 'Pharmacovigilance / Safety'],
      therapeuticAreas: ['CNS', 'Vaccines', 'Infectious Diseases', 'General'],
      geographicCoverage: ['Global', 'North America', 'EU'],
      trialPhaseFocus: ['Phase I', 'Phase II', 'Phase III', 'Phase IV'],
      vendorFitScore: 4.3,
      customerRating: 4.1,
      npsScore: 72,
      proofPoint: 'CNS trials with 40% faster patient recruitment',
      totalTrials: 3742,
      totalReviews: 134,
      description: 'Comprehensive drug development services with strong CNS and vaccine expertise',
      keyCapabilities: ['CNS specialization', 'Central lab services', 'Site management', 'Regulatory consulting'],
      recentWins: ['Major CNS Phase III program', 'COVID-19 vaccine trials', 'Alzheimer\'s prevention study']
    },
    {
      id: 'parexel',
      name: 'Parexel',
      logo: '🟣',
      services: ['Clinical Trials (Phase I–IV)', 'Regulatory Submissions Support', 'Data Management', 'Site Management / Monitoring'],
      therapeuticAreas: ['Oncology', 'Rare Diseases', 'Cardiology'],
      geographicCoverage: ['Global', 'North America', 'EU', 'APAC'],
      trialPhaseFocus: ['Phase II', 'Phase III', 'Phase IV'],
      vendorFitScore: 4.2,
      customerRating: 4.0,
      npsScore: 70,
      proofPoint: 'Regulatory expertise: 2,000+ successful submissions',
      totalTrials: 2956,
      totalReviews: 118,
      description: 'Global CRO with deep regulatory and late-stage clinical development expertise',
      keyCapabilities: ['Regulatory excellence', 'Late-stage trials', 'Market access', 'Technology solutions'],
      recentWins: ['Oncology combination therapy', 'Rare cardiovascular study', 'Post-market surveillance program']
    },
    {
      id: 'icon',
      name: 'ICON',
      logo: '🔶',
      services: ['Clinical Trials (Phase I–IV)', 'Biostatistics', 'Data Management', 'Pharmacovigilance / Safety'],
      therapeuticAreas: ['Oncology', 'CNS', 'Vaccines', 'General'],
      geographicCoverage: ['Global', 'EU', 'APAC'],
      trialPhaseFocus: ['Phase I', 'Phase II', 'Phase III'],
      vendorFitScore: 4.1,
      customerRating: 4.2,
      npsScore: 73,
      proofPoint: 'Oncology expertise: 500+ cancer trials completed',
      totalTrials: 2834,
      totalReviews: 102,
      description: 'Global healthcare intelligence and clinical research organization',
      keyCapabilities: ['Oncology focus', 'Healthcare intelligence', 'Patient analytics', 'Global presence'],
      recentWins: ['Immuno-oncology platform study', 'Pediatric CNS trial', 'Digital biomarker validation']
    }
  ];

  const therapeuticAreaOptions = [
    'Oncology', 'Rare Diseases', 'Vaccines', 'Cardiology', 
    'CNS (Neurology/Psychiatry)', 'Infectious Diseases', 'General'
  ];

  const handleTherapeuticAreaChange = (area: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      therapeuticAreas: checked 
        ? [...prev.therapeuticAreas, area]
        : prev.therapeuticAreas.filter(a => a !== area)
    }));
  };

  const filteredCROs = cros.filter(cro => {
    if (filters.category !== 'All' && !cro.services.includes(filters.category)) return false;
    if (filters.therapeuticAreas.length > 0 && !filters.therapeuticAreas.some(area => cro.therapeuticAreas.includes(area))) return false;
    if (filters.geographicCoverage !== 'All' && !cro.geographicCoverage.includes(filters.geographicCoverage) && !cro.geographicCoverage.includes('Global')) return false;
    if (filters.trialPhaseFocus !== 'All' && !cro.trialPhaseFocus.includes(filters.trialPhaseFocus)) return false;
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
          <CardTitle>Contract Research Organizations (CROs)</CardTitle>
          <p className="text-muted-foreground">Find the right CRO partner for your clinical development needs</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Category */}
            <div className="space-y-3">
              <label className="text-sm">Category</label>
              <Select value={filters.category} onValueChange={(value) => setFilters(prev => ({ ...prev, category: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Services</SelectItem>
                  <SelectItem value="Clinical Trials (Phase I–IV)">Clinical Trials (Phase I–IV)</SelectItem>
                  <SelectItem value="Data Management">Data Management</SelectItem>
                  <SelectItem value="Biostatistics">Biostatistics</SelectItem>
                  <SelectItem value="Pharmacovigilance / Safety">Pharmacovigilance / Safety</SelectItem>
                  <SelectItem value="Regulatory Submissions Support">Regulatory Submissions Support</SelectItem>
                  <SelectItem value="Site Management / Monitoring">Site Management / Monitoring</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Geographic Coverage */}
            <div className="space-y-3">
              <label className="text-sm">Geographic Coverage</label>
              <Select value={filters.geographicCoverage} onValueChange={(value) => setFilters(prev => ({ ...prev, geographicCoverage: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Regions</SelectItem>
                  <SelectItem value="North America">North America</SelectItem>
                  <SelectItem value="EU">EU</SelectItem>
                  <SelectItem value="APAC">APAC</SelectItem>
                  <SelectItem value="Global">Global</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Trial Phase Focus */}
            <div className="space-y-3">
              <label className="text-sm">Trial Phase Focus</label>
              <Select value={filters.trialPhaseFocus} onValueChange={(value) => setFilters(prev => ({ ...prev, trialPhaseFocus: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Phases</SelectItem>
                  <SelectItem value="Preclinical">Preclinical</SelectItem>
                  <SelectItem value="Phase I">Phase I</SelectItem>
                  <SelectItem value="Phase II">Phase II</SelectItem>
                  <SelectItem value="Phase III">Phase III</SelectItem>
                  <SelectItem value="Phase IV / Post-marketing">Phase IV / Post-marketing</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Therapeutic Area */}
            <div className="space-y-3">
              <label className="text-sm">Therapeutic Area</label>
              <div className="border border-border rounded-md p-3 max-h-40 overflow-y-auto space-y-2">
                {therapeuticAreaOptions.map((area) => (
                  <div key={area} className="flex items-center space-x-2">
                    <Checkbox
                      id={area}
                      checked={filters.therapeuticAreas.includes(area)}
                      onCheckedChange={(checked) => handleTherapeuticAreaChange(area, checked as boolean)}
                    />
                    <label htmlFor={area} className="text-sm cursor-pointer">
                      {area}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CRO Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCROs.map((cro) => (
          <Card key={cro.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{cro.logo}</div>
                  <div>
                    <h3 className="font-semibold">{cro.name}</h3>
                    <p className="text-sm text-muted-foreground">{cro.totalTrials.toLocaleString()} trials completed</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedCRO(cro)}
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
                  {cro.vendorFitScore}/5.0
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <FlaskConical className="h-4 w-4 text-muted-foreground" />
                  <span>{cro.services.length} service areas</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{cro.geographicCoverage.includes('Global') ? 'Global' : cro.geographicCoverage.join(', ')}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Award className="h-4 w-4 text-muted-foreground" />
                  <span>{cro.therapeuticAreas.length} therapeutic areas</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1">
                {cro.services.slice(0, 2).map((service) => (
                  <Badge key={service} variant="outline" className="text-xs">
                    {service.replace(' (Phase I–IV)', '')}
                  </Badge>
                ))}
                {cro.services.length > 2 && (
                  <Badge variant="outline" className="text-xs">
                    +{cro.services.length - 2} more
                  </Badge>
                )}
              </div>

              <div className="text-sm text-muted-foreground">
                <strong>Specialties:</strong> {cro.therapeuticAreas.slice(0, 3).join(', ')}
                {cro.therapeuticAreas.length > 3 && '...'}
              </div>

              <Button className="w-full" variant="outline">
                Request Proposal
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* CRO Details */}
      {selectedCRO && (
        <Card className="border-blue-200 bg-blue-50/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-4xl">{selectedCRO.logo}</div>
                <div>
                  <CardTitle className="flex items-center gap-3">
                    {selectedCRO.name}
                    <Badge className="bg-green-100 text-green-800">
                      VendorFit {selectedCRO.vendorFitScore}
                    </Badge>
                  </CardTitle>
                  <p className="text-muted-foreground mt-1">{selectedCRO.description}</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setSelectedCRO(null)}
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
                      ({selectedCRO.totalReviews} reviews)
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex">{renderStars(selectedCRO.customerRating)}</div>
                    <span className="font-medium">{selectedCRO.customerRating}/5.0</span>
                  </div>
                </div>

                <Separator />

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium">NPS Score</span>
                    <button className="text-blue-600 hover:underline text-sm">
                      (View Reviews)
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="font-medium text-green-600">{selectedCRO.npsScore}% recommend</span>
                  </div>
                </div>

                <Separator />

                <div>
                  <span className="font-medium">Trial Volume</span>
                  <p className="text-2xl font-bold text-blue-600 mt-1">{selectedCRO.totalTrials.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Completed trials</p>
                </div>
              </div>

              {/* Services & Capabilities */}
              <div className="space-y-4">
                <div>
                  <span className="font-medium">Services Offered</span>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {selectedCRO.services.map((service) => (
                      <Badge key={service} variant="outline" className="text-xs">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <span className="font-medium">Therapeutic Areas</span>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {selectedCRO.therapeuticAreas.map((area) => (
                      <Badge key={area} variant="secondary" className="text-xs">
                        {area}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <span className="font-medium">Geographic Coverage</span>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {selectedCRO.geographicCoverage.map((region) => (
                      <Badge key={region} variant="outline" className="text-xs flex items-center gap-1">
                        <Globe className="h-3 w-3" />
                        {region}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <span className="font-medium">Proof Point</span>
                  <p className="text-muted-foreground mt-1">{selectedCRO.proofPoint}</p>
                </div>
              </div>

              {/* Key Capabilities & Recent Wins */}
              <div className="space-y-4">
                <div>
                  <span className="font-medium">Key Capabilities</span>
                  <ul className="mt-2 space-y-1">
                    {selectedCRO.keyCapabilities.map((capability, index) => (
                      <li key={index} className="text-sm text-muted-foreground">
                        • {capability}
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator />

                <div>
                  <span className="font-medium">Recent Wins</span>
                  <ul className="mt-2 space-y-1">
                    {selectedCRO.recentWins.map((win, index) => (
                      <li key={index} className="text-sm text-muted-foreground">
                        • {win}
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator />

                <div className="space-y-3">
                  <Button variant="outline" className="w-full">
                    View Profile
                  </Button>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Request Proposal
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results Summary */}
      <div className="text-center text-muted-foreground">
        Showing {filteredCROs.length} of {cros.length} CROs matching your criteria
      </div>
    </div>
  );
}
