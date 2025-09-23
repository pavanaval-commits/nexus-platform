import { projectId, publicAnonKey } from './supabase/client';

const BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-aac5ae31`;

class ApiClient {
  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${BASE_URL}${endpoint}`;
    const headers = {
      'Authorization': `Bearer ${publicAnonKey}`,
      'Content-Type': 'application/json',
      ...options.headers,
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  // Regulatory Feeds
  async getFeeds() {
    return this.request('/feeds');
  }

  async getFeed(id: string) {
    return this.request(`/feeds/${id}`);
  }

  async searchFeeds(params: {
    q?: string;
    category?: string;
    region?: string;
    urgency?: string;
  }) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value) searchParams.append(key, value);
    });
    
    return this.request(`/feeds/search?${searchParams.toString()}`);
  }

  // Marketplace
  async getVendors() {
    return this.request('/vendors');
  }

  async getConsultants() {
    return this.request('/consultants');
  }

  async getCROs() {
    return this.request('/cros');
  }
}

export const apiClient = new ApiClient();

// Types for API responses
export interface RegulatoryFeed {
  id: string;
  title: string;
  category: string;
  region: string;
  agency: string;
  date: string;
  urgency: string;
  summary: string;
  content: string;
  tags: string[];
  source: string;
  impact: string;
  consultants: string[];
}

export interface Vendor {
  id: string;
  name: string;
  category: string;
  specialties: string[];
  location: string;
  employees: string;
  founded: string;
  description: string;
  services: string[];
  vendorFitScore: number;
  contactEmail: string;
  website: string;
  certifications: string[];
  clientTestimonial: string;
  pricing: string;
  keyPersonnel: string[];
  recentProjects: string[];
}

export interface Consultant {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  location: string;
  education: string;
  certifications: string[];
  description: string;
  expertise: string[];
  rate: string;
  availability: string;
  vendorFitScore: number;
  languages: string[];
  recentProjects: string[];
  clientReview: string;
  contactEmail: string;
}

export interface CRO {
  id: string;
  name: string;
  category: string;
  specialties: string[];
  location: string;
  employees: string;
  founded: string;
  description: string;
  services: string[];
  vendorFitScore: number;
  contactEmail: string;
  website: string;
  accreditations: string[];
  therapeuticAreas: string[];
  geographicReach: string[];
  recentTrials: string[];
  clientTestimonial: string;
  keyCapabilities: string[];
}
