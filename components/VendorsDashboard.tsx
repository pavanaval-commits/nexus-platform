import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";
import { Star, DollarSign, MapPin, ExternalLink, TrendingUp, Globe, Search, Users, Mail, Building } from 'lucide-react';
import { apiClient, Vendor } from '../utils/api';

export function VendorsDashboard() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    specialties: '',
    location: '',
    employees: ''
  });

  useEffect(() => {
    loadVendors();
  }, []);

  const loadVendors = async () => {
    try {
      setLoading(true);
      const response = await apiClient.getVendors();
      if (response.success) {
        setVendors(response.data);
      }
    } catch (error) {
      console.error('Error loading vendors:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = !searchTerm || 
      vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = !filters.category || vendor.category === filters.category;
    const matchesSpecialty = !filters.specialties || vendor.specialties.includes(filters.specialties);
    const matchesLocation = !filters.location || vendor.location.includes(filters.location);
    const matchesEmployees = !filters.employees || vendor.employees === filters.employees;
    
    return matchesSearch && matchesCategory && matchesSpecialty && matchesLocation && matchesEmployees;
  });

  const clearFilters = () => {
    setSearchTerm('');
    setFilters({
      category: '',
      specialties: '',
      location: '',
      employees: ''
    });
  };

  const renderStars = (score: number) => {
    const rating = score / 20; // Convert 0-100 to 0-5 scale
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
      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Regulatory Technology Vendors</CardTitle>
          <p className="text-muted-foreground">Find the right vendors for your regulatory needs</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search vendors by name, services, or specialties..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
            
            {/* Filters */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Select value={filters.category} onValueChange={(value) => setFilters(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Categories</SelectItem>
                    <SelectItem value="Software">Software</SelectItem>
                    <SelectItem value="Analytics">Analytics</SelectItem>
                    <SelectItem value="Consulting">Consulting</SelectItem>
                    <SelectItem value="Medical Devices">Medical Devices</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Specialty</label>
                <Select value={filters.specialties} onValueChange={(value) => setFilters(prev => ({ ...prev, specialties: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Specialties" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Specialties</SelectItem>
                    <SelectItem value="Regulatory Intelligence">Regulatory Intelligence</SelectItem>
                    <SelectItem value="Data Analytics">Data Analytics</SelectItem>
                    <SelectItem value="FDA Submissions">FDA Submissions</SelectItem>
                    <SelectItem value="510(k) Submissions">510(k) Submissions</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Location</label>
                <Select value={filters.location} onValueChange={(value) => setFilters(prev => ({ ...prev, location: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Locations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Locations</SelectItem>
                    <SelectItem value="Boston">Boston</SelectItem>
                    <SelectItem value="San Francisco">San Francisco</SelectItem>
                    <SelectItem value="London">London</SelectItem>
                    <SelectItem value="Minneapolis">Minneapolis</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Company Size</label>
                <Select value={filters.employees} onValueChange={(value) => setFilters(prev => ({ ...prev, employees: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Sizes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Sizes</SelectItem>
                    <SelectItem value="50-100">50-100</SelectItem>
                    <SelectItem value="100-250">100-250</SelectItem>
                    <SelectItem value="250-500">250-500</SelectItem>
                    <SelectItem value="500-1000">500-1000</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vendor Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <span className="ml-2">Loading vendors...</span>
        </div>
      ) : filteredVendors.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">No vendors found matching your criteria.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVendors.map((vendor) => (
            <Card key={vendor.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedVendor(vendor)}>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                      {vendor.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold">{vendor.name}</h3>
                      <p className="text-sm text-muted-foreground">{vendor.category}</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                    VendorFit {vendor.vendorFitScore}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {vendor.description}
                </p>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{vendor.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{vendor.employees} employees</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <span>Founded {vendor.founded}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {vendor.specialties.slice(0, 3).map((specialty) => (
                    <Badge key={specialty} variant="outline" className="text-xs">
                      {specialty}
                    </Badge>
                  ))}
                  {vendor.specialties.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{vendor.specialties.length - 3} more
                    </Badge>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1" size="sm">
                    View Profile
                  </Button>
                  <Button className="flex-1" size="sm">
                    Contact
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Vendor Details Modal */}
      {selectedVendor && (
        <Card className="border-blue-200 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-2xl">
                  {selectedVendor.name.charAt(0)}
                </div>
                <div>
                  <CardTitle className="flex items-center gap-3">
                    {selectedVendor.name}
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                      VendorFit {selectedVendor.vendorFitScore}
                    </Badge>
                  </CardTitle>
                  <p className="text-muted-foreground mt-1">{selectedVendor.description}</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setSelectedVendor(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                ✕
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Company Info */}
              <div className="space-y-4">
                <div>
                  <span className="font-medium">Company Details</span>
                  <div className="space-y-2 mt-2">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedVendor.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedVendor.employees} employees</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <span>Founded in {selectedVendor.founded}</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <span className="font-medium">Specialties</span>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {selectedVendor.specialties.map((specialty) => (
                      <Badge key={specialty} variant="outline" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Services & Certifications */}
              <div className="space-y-4">
                <div>
                  <span className="font-medium">Key Services</span>
                  <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                    {selectedVendor.services.map((service, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-current rounded-full" />
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator />

                <div>
                  <span className="font-medium">Certifications</span>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {selectedVendor.certifications.map((cert) => (
                      <Badge key={cert} variant="secondary" className="text-xs">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contact & Actions */}
              <div className="space-y-4">
                <div>
                  <span className="font-medium">Client Testimonial</span>
                  <blockquote className="text-sm text-muted-foreground mt-2 italic border-l-2 border-muted pl-4">
                    "{selectedVendor.clientTestimonial}"
                  </blockquote>
                </div>

                <Separator />

                <div>
                  <span className="font-medium">Pricing</span>
                  <p className="text-sm text-muted-foreground mt-1">
                    {selectedVendor.pricing}
                  </p>
                </div>

                <div className="space-y-2 pt-4">
                  <Button className="w-full">
                    <Mail className="h-4 w-4 mr-2" />
                    Contact Vendor
                  </Button>
                  <Button variant="outline" className="w-full">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Visit Website
                  </Button>
                </div>
              </div>
            </div>

            {/* Recent Projects */}
            {selectedVendor.recentProjects && selectedVendor.recentProjects.length > 0 && (
              <div className="mt-6 pt-6 border-t">
                <span className="font-medium">Recent Projects</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                  {selectedVendor.recentProjects.map((project, index) => (
                    <div key={index} className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-sm">{project}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Results Summary */}
      {!loading && (
        <div className="text-center text-muted-foreground">
          Showing {filteredVendors.length} of {vendors.length} vendors matching your criteria
        </div>
      )}
    </div>
  );
}