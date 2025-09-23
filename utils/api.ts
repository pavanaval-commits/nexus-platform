export interface RegulatoryFeed {
  id: string;
  title: string;
  summary: string;
  content: string;
  agency: string;
  region: string;
  category: string;
  urgency: string;
  date: string;
  tags: string[];
  url?: string;
  document_type?: string;
  status?: string;
}

export interface Vendor {
  id: string;
  name: string;
  description: string;
  services: string[];
  regions: string[];
  experience_years: number;
  client_count: number;
  vendorfit_score: number;
  contact_email: string;
  website: string;
  logo_url?: string;
  specializations: string[];
  certifications: string[];
  case_studies: string[];
}

export interface Consultant {
  id: string;
  name: string;
  title: string;
  company: string;
  expertise: string[];
  experience_years: number;
  hourly_rate: number;
  availability: string;
  vendorfit_score: number;
  bio: string;
  education: string[];
  certifications: string[];
  contact_email: string;
  linkedin: string;
  avatar_url?: string;
}

export interface CRO {
  id: string;
  name: string;
  description: string;
  therapeutic_areas: string[];
  study_phases: string[];
  regions: string[];
  patient_count: number;
  completed_studies: number;
  vendorfit_score: number;
  contact_email: string;
  website: string;
  logo_url?: string;
  capabilities: string[];
  certifications: string[];
}

export interface SearchFilters {
  q?: string;
  category?: string;
  region?: string;
  urgency?: string;
  agency?: string;
  date_from?: string;
  date_to?: string;
}

// Mock data for demo purposes
const mockFeeds: RegulatoryFeed[] = [
  {
    id: 'feed-1',
    title: 'FDA Announces New Drug Approval Pathway for Rare Diseases',
    category: 'Drug Approval',
    region: 'United States',
    agency: 'FDA',
    date: '2024-01-15',
    urgency: 'High',
    summary: 'The FDA has introduced an expedited approval pathway for drugs treating rare diseases affecting fewer than 200,000 patients in the US.',
    content: 'The Food and Drug Administration announced a significant policy change that will accelerate the approval process for treatments targeting rare diseases. This new pathway, called the Rare Disease Expedited Review (RDER), aims to reduce approval timelines from an average of 12 months to 6-8 months for qualifying therapies.',
    tags: ['FDA', 'Rare Diseases', 'Drug Approval', 'Expedited Review']
  },
  {
    id: 'feed-2',
    title: 'EMA Updates Guidelines for AI-Driven Medical Devices',
    category: 'Medical Devices',
    region: 'European Union',
    agency: 'EMA',
    date: '2024-01-12',
    urgency: 'Medium',
    summary: 'The European Medicines Agency has released updated guidelines for artificial intelligence and machine learning applications in medical devices.',
    content: 'The European Medicines Agency has published comprehensive guidelines addressing the regulatory framework for AI-powered medical devices. These guidelines establish clear requirements for algorithm validation, data quality standards, and post-market surveillance obligations.',
    tags: ['EMA', 'AI/ML', 'Medical Devices', 'Guidelines']
  }
];

const mockVendors: Vendor[] = [
  {
    id: 'vendor-1',
    name: 'RegTech Solutions Inc.',
    description: 'Leading provider of AI-powered regulatory intelligence solutions.',
    services: ['Regulatory Intelligence', 'Compliance Management'],
    regions: ['North America', 'Europe'],
    experience_years: 9,
    client_count: 150,
    vendorfit_score: 94,
    contact_email: 'partnerships@regtech-solutions.com',
    website: 'www.regtech-solutions.com',
    specializations: ['FDA Submissions', 'EMA Compliance'],
    certifications: ['ISO 27001', 'SOC 2'],
    case_studies: ['Global pharma compliance', 'Biotech FDA approval']
  }
];

const mockConsultants: Consultant[] = [
  {
    id: 'consultant-1',
    name: 'Dr. Sarah Mitchell',
    title: 'Senior Regulatory Consultant',
    company: 'Independent',
    expertise: ['FDA Drug Approvals', 'Regulatory Strategy'],
    experience_years: 15,
    hourly_rate: 450,
    availability: 'Available',
    vendorfit_score: 96,
    bio: 'Former FDA reviewer with extensive experience in drug approvals.',
    education: ['PharmD Harvard', 'MBA Wharton'],
    certifications: ['RAC Certified'],
    contact_email: 'sarah.mitchell@regconsulting.com',
    linkedin: 'linkedin.com/in/sarahmitchell'
  }
];

const mockCROs: CRO[] = [
  {
    id: 'cro-1',
    name: 'Precision Clinical Research',
    description: 'Global CRO specializing in complex clinical trials.',
    therapeutic_areas: ['Oncology', 'Rare Diseases'],
    study_phases: ['Phase I', 'Phase II', 'Phase III'],
    regions: ['North America', 'Europe'],
    patient_count: 50000,
    completed_studies: 250,
    vendorfit_score: 95,
    contact_email: 'business.development@precision-clinical.com',
    website: 'www.precision-clinical.com',
    capabilities: ['Patient recruitment', 'Data management'],
    certifications: ['GCP Compliant', 'ISO 9001']
  }
];

class APIClient {
  // Simulate API delay
  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private async mockRequest<T>(data: T): Promise<{ success: boolean; data: T; error?: string }> {
    await this.delay(300); // Simulate network delay
    return { success: true, data };
  }

  // Regulatory Feeds
  async getFeeds(): Promise<{ success: boolean; data: RegulatoryFeed[]; error?: string }> {
    return this.mockRequest(mockFeeds);
  }

  async getFeed(id: string): Promise<{ success: boolean; data: RegulatoryFeed; error?: string }> {
    const feed = mockFeeds.find(f => f.id === id);
    if (!feed) {
      return { success: false, data: {} as RegulatoryFeed, error: 'Feed not found' };
    }
    return this.mockRequest(feed);
  }

  async searchFeeds(filters: SearchFilters): Promise<{ success: boolean; data: RegulatoryFeed[]; error?: string }> {
    const { q, category, region, urgency } = filters;
    let filtered = mockFeeds;

    if (q) {
      const query = q.toLowerCase();
      filtered = filtered.filter(feed =>
        feed.title.toLowerCase().includes(query) ||
        feed.summary.toLowerCase().includes(query) ||
        feed.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    if (category) filtered = filtered.filter(feed => feed.category === category);
    if (region) filtered = filtered.filter(feed => feed.region === region);
    if (urgency) filtered = filtered.filter(feed => feed.urgency === urgency);

    return this.mockRequest(filtered);
  }

  // Vendors
  async getVendors(): Promise<{ success: boolean; data: Vendor[]; error?: string }> {
    return this.mockRequest(mockVendors);
  }

  async getVendor(id: string): Promise<{ success: boolean; data: Vendor; error?: string }> {
    const vendor = mockVendors.find(v => v.id === id);
    if (!vendor) {
      return { success: false, data: {} as Vendor, error: 'Vendor not found' };
    }
    return this.mockRequest(vendor);
  }

  async searchVendors(filters: any): Promise<{ success: boolean; data: Vendor[]; error?: string }> {
    return this.mockRequest(mockVendors);
  }

  // Consultants
  async getConsultants(): Promise<{ success: boolean; data: Consultant[]; error?: string }> {
    return this.mockRequest(mockConsultants);
  }

  async getConsultant(id: string): Promise<{ success: boolean; data: Consultant; error?: string }> {
    const consultant = mockConsultants.find(c => c.id === id);
    if (!consultant) {
      return { success: false, data: {} as Consultant, error: 'Consultant not found' };
    }
    return this.mockRequest(consultant);
  }

  async searchConsultants(filters: any): Promise<{ success: boolean; data: Consultant[]; error?: string }> {
    return this.mockRequest(mockConsultants);
  }

  // CROs
  async getCROs(): Promise<{ success: boolean; data: CRO[]; error?: string }> {
    return this.mockRequest(mockCROs);
  }

  async getCRO(id: string): Promise<{ success: boolean; data: CRO; error?: string }> {
    const cro = mockCROs.find(c => c.id === id);
    if (!cro) {
      return { success: false, data: {} as CRO, error: 'CRO not found' };
    }
    return this.mockRequest(cro);
  }

  async searchCROs(filters: any): Promise<{ success: boolean; data: CRO[]; error?: string }> {
    return this.mockRequest(mockCROs);
  }

  // Global Search
  async globalSearch(query: string): Promise<{ success: boolean; data: any; error?: string }> {
    const q = query.toLowerCase();
    const results = {
      feeds: mockFeeds.filter(feed =>
        feed.title.toLowerCase().includes(q) ||
        feed.summary.toLowerCase().includes(q)
      ).slice(0, 3),
      vendors: mockVendors.filter(vendor =>
        vendor.name.toLowerCase().includes(q) ||
        vendor.specializations.some(s => s.toLowerCase().includes(q))
      ).slice(0, 3),
      consultants: mockConsultants.filter(consultant =>
        consultant.name.toLowerCase().includes(q) ||
        consultant.expertise.some(e => e.toLowerCase().includes(q))
      ).slice(0, 3),
      cros: mockCROs.filter(cro =>
        cro.name.toLowerCase().includes(q) ||
        cro.therapeutic_areas.some(t => t.toLowerCase().includes(q))
      ).slice(0, 3)
    };
    return this.mockRequest(results);
  }
}

export const apiClient = new APIClient();
