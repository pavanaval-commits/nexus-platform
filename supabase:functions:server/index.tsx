import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import { createClient } from 'npm:@supabase/supabase-js@2';
import * as kv from './kv_store.tsx';

const app = new Hono();

// CORS and logging
app.use('*', cors({
  origin: '*',
  allowHeaders: ['*'],
  allowMethods: ['*'],
}));
app.use('*', logger(console.log));

// Supabase client with fallback values
const supabaseUrl = Deno.env.get('SUPABASE_URL') || 'https://mkknfgjcrvzklfqfuvjb.supabase.co';
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ra25mZ2pjcnZ6a2xmcWZ1dmpiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODU4Nzc5MSwiZXhwIjoyMDc0MTYzNzkxfQ.g6zW9hcZJ-D8xJoQmhTm8vYX2z1A0nF5qXwJcS9pL4E';

const supabase = createClient(supabaseUrl, supabaseServiceKey);
// Regulatory Feeds Data
const sampleFeeds = [
  {
    id: 'feed-1',
    title: 'FDA Announces New Drug Approval Pathway for Rare Diseases',
    category: 'Drug Approval',
    region: 'United States',
    agency: 'FDA',
    date: '2024-01-15',
    urgency: 'High',
    summary: 'The FDA has introduced an expedited approval pathway for drugs treating rare diseases affecting fewer than 200,000 patients in the US.',
    content: 'The Food and Drug Administration announced a significant policy change that will accelerate the approval process for treatments targeting rare diseases. This new pathway, called the Rare Disease Expedited Review (RDER), aims to reduce approval timelines from an average of 12 months to 6-8 months for qualifying therapies. The initiative addresses the critical need for faster access to life-saving treatments for patients with rare conditions who have limited therapeutic options.',
    tags: ['FDA', 'Rare Diseases', 'Drug Approval', 'Expedited Review'],
    source: 'FDA.gov',
    impact: 'Pharmaceutical companies developing rare disease therapies can expect faster market access, potentially reducing development costs and improving patient outcomes.',
    consultants: ['Dr. Sarah Chen - FDA Regulatory Specialist', 'Michael Rodriguez - Rare Disease Expert']
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
    content: 'The European Medicines Agency has published comprehensive guidelines addressing the regulatory framework for AI-powered medical devices. These guidelines establish clear requirements for algorithm validation, data quality standards, and post-market surveillance obligations. Medical device manufacturers must now demonstrate algorithmic transparency and provide detailed documentation of training datasets and model performance metrics.',
    tags: ['EMA', 'AI/ML', 'Medical Devices', 'Guidelines'],
    source: 'EMA.europa.eu',
    impact: 'MedTech companies developing AI solutions must now comply with stricter validation requirements, potentially extending development timelines but improving device reliability.',
    consultants: ['Dr. Emma Thompson - AI Regulatory Affairs', 'Lars Nielsen - EMA Compliance Specialist']
  },
  {
    id: 'feed-3',
    title: 'PMDA Introduces Digital Submission Platform for Clinical Trials',
    category: 'Clinical Trials',
    region: 'Japan',
    agency: 'PMDA',
    date: '2024-01-10',
    urgency: 'Low',
    summary: 'Japan\'s PMDA launches a new digital platform for clinical trial submissions, aiming to streamline the approval process.',
    content: 'The Pharmaceuticals and Medical Devices Agency of Japan has launched a comprehensive digital submission platform designed to modernize clinical trial applications. The platform supports electronic submission of protocols, investigator brochures, and safety reports. This initiative is part of Japan\'s broader digital transformation strategy and aims to reduce submission processing times by 40%.',
    tags: ['PMDA', 'Digital Submission', 'Clinical Trials', 'Japan'],
    source: 'PMDA.go.jp',
    impact: 'Clinical research organizations and pharmaceutical companies conducting trials in Japan will benefit from faster submission processing and reduced administrative burden.',
    consultants: ['Hiroshi Tanaka - PMDA Regulatory Expert', 'Dr. Yuki Sato - Clinical Trials Specialist']
  },
  {
    id: 'feed-4',
    title: 'Health Canada Publishes Cannabis Medical Research Framework',
    category: 'Cannabis Regulation',
    region: 'Canada',
    agency: 'Health Canada',
    date: '2024-01-08',
    urgency: 'Medium',
    summary: 'Health Canada releases new framework for conducting clinical research with cannabis-based medical products.',
    content: 'Health Canada has established a comprehensive regulatory framework governing clinical research involving cannabis-derived medical products. The framework addresses study design requirements, patient safety protocols, and quality standards for cannabis research. This represents a significant step forward in legitimizing cannabis research within the Canadian healthcare system.',
    tags: ['Health Canada', 'Cannabis', 'Clinical Research', 'Medical Cannabis'],
    source: 'Canada.ca',
    impact: 'Researchers and pharmaceutical companies can now conduct cannabis-based medical research with clearer regulatory guidance, potentially accelerating development of cannabis therapeutics.',
    consultants: ['Dr. Jennifer Walsh - Cannabis Research Specialist', 'Robert Kim - Health Canada Liaison']
  },
  {
    id: 'feed-5',
    title: 'WHO Issues New Guidelines for Global Vaccine Distribution',
    category: 'Vaccines',
    region: 'Global',
    agency: 'WHO',
    date: '2024-01-05',
    urgency: 'High',
    summary: 'World Health Organization publishes updated guidelines for international vaccine distribution and emergency use authorization.',
    content: 'The World Health Organization has released updated guidelines for global vaccine distribution, focusing on emergency use authorization procedures and international coordination protocols. These guidelines establish standardized criteria for vaccine approval across member countries and provide frameworks for rapid deployment during health emergencies.',
    tags: ['WHO', 'Vaccines', 'Global Health', 'Emergency Use'],
    source: 'WHO.int',
    impact: 'Vaccine manufacturers will need to align with new international standards, potentially simplifying multi-country approval processes but requiring additional documentation.',
    consultants: ['Dr. Maria Rodriguez - WHO Policy Expert', 'David Chen - Global Regulatory Affairs']
  }
];

// Marketplace Vendors Data
const sampleVendors = [
  {
    id: 'vendor-1',
    name: 'RegTech Solutions Inc.',
    category: 'Software',
    specialties: ['Regulatory Intelligence', 'Compliance Management', 'Document Management'],
    location: 'Boston, MA',
    employees: '250-500',
    founded: '2015',
    description: 'Leading provider of AI-powered regulatory intelligence and compliance management solutions for life sciences companies.',
    services: ['Regulatory Intelligence Platform', 'Submission Management', 'Compliance Monitoring', 'Risk Assessment'],
    vendorFitScore: 94,
    contactEmail: 'partnerships@regtech-solutions.com',
    website: 'www.regtech-solutions.com',
    certifications: ['ISO 27001', 'SOC 2 Type II', 'FDA 21 CFR Part 11'],
    clientTestimonial: 'RegTech Solutions transformed our regulatory processes, reducing submission times by 60% while improving compliance accuracy.',
    pricing: 'Starting at $50,000/year for enterprise platform',
    keyPersonnel: ['Sarah Johnson - CEO', 'Dr. Michael Chen - Chief Scientific Officer'],
    recentProjects: ['Global pharma company - EU MDR compliance', 'Biotech startup - FDA submission management']
  },
  {
    id: 'vendor-2',
    name: 'Compliance Analytics Pro',
    category: 'Analytics',
    specialties: ['Data Analytics', 'Regulatory Reporting', 'Risk Management'],
    location: 'San Francisco, CA',
    employees: '100-250',
    founded: '2018',
    description: 'Advanced analytics platform specializing in regulatory data analysis and predictive compliance modeling.',
    services: ['Predictive Analytics', 'Regulatory Dashboards', 'Risk Modeling', 'Automated Reporting'],
    vendorFitScore: 89,
    contactEmail: 'sales@compliance-analytics.com',
    website: 'www.compliance-analytics.com',
    certifications: ['GDPR Compliant', 'HIPAA Compliant', 'ISO 9001'],
    clientTestimonial: 'Their predictive analytics helped us identify compliance risks 3 months before they materialized.',
    pricing: 'Custom pricing based on data volume',
    keyPersonnel: ['Alex Rivera - Founder & CTO', 'Dr. Lisa Park - Head of Analytics'],
    recentProjects: ['Fortune 500 pharma - Risk prediction model', 'MedDevice company - Regulatory dashboard']
  },
  {
    id: 'vendor-3',
    name: 'Global Regulatory Services',
    category: 'Consulting',
    specialties: ['FDA Submissions', 'EMA Compliance', 'Global Strategy'],
    location: 'London, UK',
    employees: '500-1000',
    founded: '2008',
    description: 'Full-service regulatory consulting firm with expertise across global markets and therapeutic areas.',
    services: ['Regulatory Strategy', 'Submission Preparation', 'Agency Interactions', 'Training & Education'],
    vendorFitScore: 92,
    contactEmail: 'info@global-regulatory.com',
    website: 'www.global-regulatory.com',
    certifications: ['Good Clinical Practice', 'ISO 13485', 'RAPS Certified'],
    clientTestimonial: 'Their global expertise helped us navigate complex multi-regional submissions successfully.',
    pricing: 'Hourly rates: $300-$800 depending on expertise level',
    keyPersonnel: ['Dr. Elizabeth Thomson - Managing Director', 'James Wilson - VP Global Affairs'],
    recentProjects: ['Novel gene therapy - FDA/EMA approval', 'Digital therapeutics - Global regulatory strategy']
  },
  {
    id: 'vendor-4',
    name: 'MedDevice Regulatory Partners',
    category: 'Medical Devices',
    specialties: ['510(k) Submissions', 'CE Marking', 'Quality Systems'],
    location: 'Minneapolis, MN',
    employees: '50-100',
    founded: '2012',
    description: 'Specialized regulatory consulting firm focused exclusively on medical device approvals and compliance.',
    services: ['510(k) Preparation', 'CE Marking Support', 'QSR/ISO 13485 Implementation', 'Post-market Surveillance'],
    vendorFitScore: 87,
    contactEmail: 'contact@meddevice-regulatory.com',
    website: 'www.meddevice-regulatory.com',
    certifications: ['ISO 13485 Lead Auditor', 'FDA QSR Expert', 'EU MDR Certified'],
    clientTestimonial: 'They guided us through our first 510(k) submission with exceptional expertise and attention to detail.',
    pricing: 'Project-based: $25,000-$150,000 depending on complexity',
    keyPersonnel: ['Dr. Robert Kim - Principal Consultant', 'Maria Santos - Quality Systems Expert'],
    recentProjects: ['AI-powered diagnostic device - 510(k) clearance', 'Surgical robot - CE marking']
  }
];

// Consultants Data
const sampleConsultants = [
  {
    id: 'consultant-1',
    name: 'Dr. Sarah Mitchell',
    specialty: 'FDA Drug Approvals',
    experience: '15 years',
    location: 'Washington, DC',
    education: 'PharmD, Harvard; MBA, Wharton',
    certifications: ['RAC (Regulatory Affairs Certified)', 'Project Management Professional'],
    description: 'Former FDA reviewer with extensive experience in NDA and BLA submissions across multiple therapeutic areas.',
    expertise: ['New Drug Applications', 'Biologics License Applications', 'FDA Meetings', 'Regulatory Strategy'],
    rate: '$450/hour',
    availability: 'Available for new projects',
    vendorFitScore: 96,
    languages: ['English', 'Spanish'],
    recentProjects: ['Oncology drug NDA approval', 'Orphan drug designation', 'Type B meeting preparation'],
    clientReview: 'Dr. Mitchell\'s FDA insider knowledge was invaluable for our successful drug approval.',
    contactEmail: 'sarah.mitchell@regconsulting.com'
  },
  {
    id: 'consultant-2',
    name: 'James Chen, PhD',
    specialty: 'EMA Regulatory Affairs',
    experience: '12 years',
    location: 'Amsterdam, Netherlands',
    education: 'PhD Pharmacology, Oxford; MSc Regulatory Science, Kings College',
    certifications: ['European Regulatory Affairs Certified', 'GCP Certified'],
    description: 'European regulatory expert specializing in centralized and national procedures for innovative therapies.',
    expertise: ['Centralized Procedure', 'PRIME Designation', 'Scientific Advice', 'Pediatric Investigation Plans'],
    rate: '€380/hour',
    availability: 'Limited availability',
    vendorFitScore: 93,
    languages: ['English', 'Dutch', 'Mandarin'],
    recentProjects: ['Gene therapy PRIME designation', 'Biosimilar centralized approval', 'Pediatric development plan'],
    clientReview: 'James provided exceptional guidance through our complex EMA submission process.',
    contactEmail: 'j.chen@euroregs.eu'
  },
  {
    id: 'consultant-3',
    name: 'Dr. Maria Rodriguez',
    specialty: 'Medical Device Regulation',
    experience: '18 years',
    location: 'Barcelona, Spain',
    education: 'MD, University of Barcelona; MSc Biomedical Engineering, MIT',
    certifications: ['EU MDR Expert', 'ISO 13485 Lead Auditor', 'Notified Body Assessor'],
    description: 'Medical device regulatory specialist with deep expertise in EU MDR transition and global market access.',
    expertise: ['EU MDR Compliance', 'Clinical Evaluation', 'Risk Management', 'Global Harmonization'],
    rate: '€420/hour',
    availability: 'Available immediately',
    vendorFitScore: 91,
    languages: ['Spanish', 'English', 'French', 'Portuguese'],
    recentProjects: ['Class III device EU MDR compliance', 'Clinical evaluation report', 'Risk management file'],
    clientReview: 'Maria\'s expertise in EU MDR helped us achieve compliance ahead of schedule.',
    contactEmail: 'maria.rodriguez@meddeviceexpert.es'
  }
];

// CROs Data
const sampleCROs = [
  {
    id: 'cro-1',
    name: 'Precision Clinical Research',
    category: 'Full Service CRO',
    specialties: ['Phase I-III Trials', 'Oncology', 'Rare Diseases'],
    location: 'Multiple Global Locations',
    employees: '2,000-5,000',
    founded: '2005',
    description: 'Global CRO specializing in complex clinical trials with expertise in oncology and rare disease research.',
    services: ['Protocol Development', 'Site Management', 'Data Management', 'Biostatistics', 'Regulatory Affairs'],
    vendorFitScore: 95,
    contactEmail: 'business.development@precision-clinical.com',
    website: 'www.precision-clinical.com',
    accreditations: ['AAHRPP Accredited', 'ISO 9001', 'GCP Compliant'],
    therapeuticAreas: ['Oncology', 'Neurology', 'Rare Diseases', 'Immunology'],
    geographicReach: ['North America', 'Europe', 'Asia-Pacific', 'Latin America'],
    recentTrials: ['Global Phase III oncology study (1,200 patients)', 'Rare disease natural history study'],
    clientTestimonial: 'Precision Clinical delivered our Phase III trial on time and under budget with exceptional data quality.',
    keyCapabilities: ['Patient recruitment', 'Regulatory submissions', 'Data analytics', 'Risk-based monitoring']
  },
  {
    id: 'cro-2',
    name: 'BioTrials Excellence',
    category: 'Specialized CRO',
    specialties: ['Biomarker Studies', 'Digital Health', 'Decentralized Trials'],
    location: 'Boston, MA',
    employees: '500-1,000',
    founded: '2010',
    description: 'Innovative CRO focused on biomarker-driven trials and digital health technologies.',
    services: ['Biomarker Strategy', 'Digital Endpoints', 'Remote Monitoring', 'Real-World Evidence'],
    vendorFitScore: 88,
    contactEmail: 'partnerships@biotrials-excellence.com',
    website: 'www.biotrials-excellence.com',
    accreditations: ['CAP Accredited', 'CLIA Certified', 'Digital Medicine Society Member'],
    therapeuticAreas: ['Precision Medicine', 'Digital Therapeutics', 'Biomarker Development'],
    geographicReach: ['North America', 'Europe'],
    recentTrials: ['Digital biomarker validation study', 'Decentralized Phase II trial'],
    clientTestimonial: 'Their expertise in digital endpoints was crucial for our innovative trial design.',
    keyCapabilities: ['Digital health integration', 'Biomarker analytics', 'Patient-centric design']
  }
];

// Initialize database with sample data
async function initializeData() {
  try {
    // Store feeds
    await kv.set('regulatory_feeds', sampleFeeds);
    
    // Store marketplace data
    await kv.set('marketplace_vendors', sampleVendors);
    await kv.set('marketplace_consultants', sampleConsultants);
    await kv.set('marketplace_cros', sampleCROs);
    
    console.log('Sample data initialized successfully');
  } catch (error) {
    console.error('Error initializing data:', error);
  }
}

// Routes

// Get all regulatory feeds
app.get('/make-server-aac5ae31/feeds', async (c) => {
  try {
    const feeds = await kv.get('regulatory_feeds') || sampleFeeds;
    return c.json({ success: true, data: feeds });
  } catch (error) {
    console.error('Error fetching feeds:', error);
    return c.json({ success: false, error: 'Failed to fetch feeds' }, 500);
  }
});

// Get specific feed by ID
app.get('/make-server-aac5ae31/feeds/:id', async (c) => {
  try {
    const feedId = c.req.param('id');
    const feeds = await kv.get('regulatory_feeds') || sampleFeeds;
    const feed = feeds.find(f => f.id === feedId);
    
    if (!feed) {
      return c.json({ success: false, error: 'Feed not found' }, 404);
    }
    
    return c.json({ success: true, data: feed });
  } catch (error) {
    console.error('Error fetching feed:', error);
    return c.json({ success: false, error: 'Failed to fetch feed' }, 500);
  }
});

// Get marketplace vendors
app.get('/make-server-aac5ae31/vendors', async (c) => {
  try {
    const vendors = await kv.get('marketplace_vendors') || sampleVendors;
    return c.json({ success: true, data: vendors });
  } catch (error) {
    console.error('Error fetching vendors:', error);
    return c.json({ success: false, error: 'Failed to fetch vendors' }, 500);
  }
});

// Get marketplace consultants
app.get('/make-server-aac5ae31/consultants', async (c) => {
  try {
    const consultants = await kv.get('marketplace_consultants') || sampleConsultants;
    return c.json({ success: true, data: consultants });
  } catch (error) {
    console.error('Error fetching consultants:', error);
    return c.json({ success: false, error: 'Failed to fetch consultants' }, 500);
  }
});

// Get marketplace CROs
app.get('/make-server-aac5ae31/cros', async (c) => {
  try {
    const cros = await kv.get('marketplace_cros') || sampleCROs;
    return c.json({ success: true, data: cros });
  } catch (error) {
    console.error('Error fetching CROs:', error);
    return c.json({ success: false, error: 'Failed to fetch CROs' }, 500);
  }
});

// Search feeds
app.get('/make-server-aac5ae31/feeds/search', async (c) => {
  try {
    const query = c.req.query('q')?.toLowerCase() || '';
    const category = c.req.query('category');
    const region = c.req.query('region');
    const urgency = c.req.query('urgency');
    
    const feeds = await kv.get('regulatory_feeds') || sampleFeeds;
    
    let filteredFeeds = feeds.filter(feed => {
      const matchesQuery = !query || 
        feed.title.toLowerCase().includes(query) ||
        feed.summary.toLowerCase().includes(query) ||
        feed.content.toLowerCase().includes(query) ||
        feed.tags.some(tag => tag.toLowerCase().includes(query));
      
      const matchesCategory = !category || feed.category === category;
      const matchesRegion = !region || feed.region === region;
      const matchesUrgency = !urgency || feed.urgency === urgency;
      
      return matchesQuery && matchesCategory && matchesRegion && matchesUrgency;
    });
    
    return c.json({ success: true, data: filteredFeeds });
  } catch (error) {
    console.error('Error searching feeds:', error);
    return c.json({ success: false, error: 'Failed to search feeds' }, 500);
  }
});

// Initialize data on server start
await initializeData();

export default {
  fetch: app.fetch,
};

Deno.serve(app.fetch);
