import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Plus, Minus, Edit, Calendar, ExternalLink, Search, Filter } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState, useEffect } from 'react';
import { apiClient, RegulatoryFeed } from '../utils/api';

interface FeedsDashboardProps {
  onFeedClick?: (feedId: string) => void;
}

export function FeedsDashboard({ onFeedClick }: FeedsDashboardProps) {
  const [feeds, setFeeds] = useState<RegulatoryFeed[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedUrgency, setSelectedUrgency] = useState('');

  useEffect(() => {
    loadFeeds();
  }, []);

  const loadFeeds = async () => {
    try {
      setLoading(true);
      const response = await apiClient.getFeeds();
      if (response.success) {
        setFeeds(response.data);
      }
    } catch (error) {
      console.error('Error loading feeds:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await apiClient.searchFeeds({
        q: searchTerm,
        category: selectedCategory,
        region: selectedRegion,
        urgency: selectedUrgency,
      });
      if (response.success) {
        setFeeds(response.data);
      }
    } catch (error) {
      console.error('Error searching feeds:', error);
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedRegion('');
    setSelectedUrgency('');
    loadFeeds();
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };
  const statsData = [
    { label: "Total Feeds", count: feeds.length, icon: Plus, color: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400" },
    { label: "High Priority", count: feeds.filter(f => f.urgency === 'High').length, icon: Edit, color: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400" },
    { label: "This Week", count: feeds.filter(f => {
      const feedDate = new Date(f.date);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return feedDate >= weekAgo;
    }).length, icon: Calendar, color: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400" }
  ];

  const regulatoryUpdates = [
    {
      id: "fda-real-world-evidence",
      authority: "FDA",
      image: "https://images.unsplash.com/photo-1591180566378-2e983423b68a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxGREElMjBnb3Zlcm5tZW50JTIwYnVpbGRpbmd8ZW58MXx8fHwxNzU4NTY2NjIyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "FDA Updates",
      description: "New biosimilar guidance and enhanced post-market surveillance requirements."
    },
    {
      id: "ema-adaptive-trials",
      authority: "EMA",
      image: "https://images.unsplash.com/photo-1670009935273-5730d29867b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxFdXJvcGVhbiUyMG1lZGljYWwlMjBhZ2VuY3l8ZW58MXx8fHwxNzU4NTY2NjI1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "EMA Guidelines",
      description: "Updated clinical trial regulations and new digital submission requirements."
    },
    {
      id: "pmda-notices",
      authority: "PMDA",
      image: "https://images.unsplash.com/photo-1671108503276-1d3d5ab23a3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaGFybWFjZXV0aWNhbCUyMHJlZ3VsYXRpb258ZW58MXx8fHwxNzU4NTY2NjI3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "PMDA Notices",
      description: "New drug approval pathways and accelerated orphan drug reviews."
    },
    {
      id: "health-canada-gmp",
      authority: "Health Canada",
      image: "https://images.unsplash.com/photo-1591180566378-2e983423b68a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxGREElMjBnb3Zlcm5tZW50JTIwYnVpbGRpbmd8ZW58MXx8fHwxNzU4NTY2NjIyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "Health Canada",
      description: "Natural health products and cannabis pharmaceutical requirements updated."
    },
    {
      id: "tga-australia",
      authority: "TGA",
      image: "https://images.unsplash.com/photo-1670009935273-5730d29867b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxFdXJvcGVhbiUyMG1lZGljYWwlMjBhZ2VuY3l8ZW58MXx8fHwxNzU4NTY2NjI1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "TGA Australia",
      description: "New scheduling framework for controlled substances and medical devices."
    },
    {
      id: "anvisa-brazil",
      authority: "ANVISA",
      image: "https://images.unsplash.com/photo-1671108503276-1d3d5ab23a3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaGFybWFjZXV0aWNhbCUyMHJlZ3VsYXRpb258ZW58MXx8fHwxNzU4NTY2NjI3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "ANVISA Brazil",
      description: "Generic drug approvals and new biosafety regulations for biologics."
    }
  ];

  const recentUpdates = [
    {
      id: "fda-real-world-evidence",
      title: "FDA Issues Draft Guidance on Real-World Evidence for Drug Development",
      date: "Sept 22, 2025",
      category: "Guidance",
      authority: "FDA"
    },
    {
      id: "ema-adaptive-trials",
      title: "EMA Publishes Final Report on Adaptive Clinical Trial Designs",
      date: "Sept 21, 2025", 
      category: "Report",
      authority: "EMA"
    },
    {
      id: "health-canada-gmp",
      title: "Health Canada Updates Good Manufacturing Practices Guidelines",
      date: "Sept 20, 2025",
      category: "GMP",
      authority: "Health Canada"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-3 gap-4">
        {statsData.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.count}</p>
                </div>
                <div className={`p-2 rounded-full ${stat.color}`}>
                  <stat.icon className="h-4 w-4" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search and Filter Section */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filter Regulatory Feeds</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search feeds, regulations, or content..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <Button onClick={handleSearch} className="px-6">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
            
            {/* Filters */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Categories</SelectItem>
                    <SelectItem value="Drug Approval">Drug Approval</SelectItem>
                    <SelectItem value="Medical Devices">Medical Devices</SelectItem>
                    <SelectItem value="Clinical Trials">Clinical Trials</SelectItem>
                    <SelectItem value="Cannabis Regulation">Cannabis Regulation</SelectItem>
                    <SelectItem value="Vaccines">Vaccines</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Region</label>
                <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Regions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Regions</SelectItem>
                    <SelectItem value="United States">United States</SelectItem>
                    <SelectItem value="European Union">European Union</SelectItem>
                    <SelectItem value="Japan">Japan</SelectItem>
                    <SelectItem value="Canada">Canada</SelectItem>
                    <SelectItem value="Global">Global</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Urgency</label>
                <Select value={selectedUrgency} onValueChange={setSelectedUrgency}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Priorities" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Priorities</SelectItem>
                    <SelectItem value="High">High Priority</SelectItem>
                    <SelectItem value="Medium">Medium Priority</SelectItem>
                    <SelectItem value="Low">Low Priority</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end gap-2">
                <Button variant="outline" onClick={clearFilters} className="flex-1">
                  <Filter className="h-4 w-4 mr-2" />
                  Clear
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Live Regulatory Feeds */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Live Regulatory Feeds</span>
            <Badge variant="secondary">{feeds.length} feeds found</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <span className="ml-2">Loading feeds...</span>
            </div>
          ) : feeds.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No feeds found matching your criteria.
            </div>
          ) : (
            <div className="space-y-4">
              {feeds.map((feed) => (
                <div 
                  key={feed.id} 
                  className="p-4 border border-border rounded-lg hover:bg-accent transition-colors cursor-pointer"
                  onClick={() => onFeedClick?.(feed.id)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-medium mb-2 hover:text-primary transition-colors">
                        {feed.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {feed.summary}
                      </p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground mt-1 ml-4 flex-shrink-0" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(feed.date).toLocaleDateString()}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {feed.agency}
                      </Badge>
                      <span>{feed.region}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {feed.category}
                      </Badge>
                      <Badge className={`text-xs ${getUrgencyColor(feed.urgency)}`}>
                        {feed.urgency}
                      </Badge>
                    </div>
                  </div>
                  
                  {feed.tags && feed.tags.length > 0 && (
                    <div className="flex items-center gap-1 mt-3 flex-wrap">
                      {feed.tags.slice(0, 4).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {feed.tags.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{feed.tags.length - 4} more
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}