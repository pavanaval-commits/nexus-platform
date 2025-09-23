import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { 
  Bookmark, 
  Star, 
  Search, 
  Filter, 
  FolderPlus,
  MoreVertical,
  ExternalLink,
  Share,
  Download,
  Trash2,
  FileText,
  Users,
  Building2,
  Calendar,
  Tag,
  Eye,
  Clock,
  Heart,
  Archive
} from 'lucide-react';

export function BookmarksDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  const bookmarkedItems = [
    {
      id: 1,
      type: 'feed',
      title: 'FDA Updates Drug Approval Guidelines for Novel Therapeutics',
      description: 'Comprehensive guidance on MAA submissions with enhanced clinical data requirements',
      url: '/feeds/fda-drug-approval-guidelines-2024',
      category: 'regulatory',
      tags: ['FDA', 'Drug Approval', 'MAA', 'Clinical Data'],
      dateBookmarked: '2024-12-20',
      lastViewed: '2024-12-22',
      views: 15,
      icon: FileText,
      source: 'FDA',
      priority: 'high'
    },
    {
      id: 2,
      type: 'consultant',
      title: 'Dr. David Williams - Veeva RIM Implementation Expert',
      description: 'Independent consultant with 16+ years in regulatory technology and 25+ Veeva implementations',
      url: '/consultants/david-williams',
      category: 'marketplace',
      tags: ['Veeva', 'RIM', 'IDMP', 'Implementation'],
      dateBookmarked: '2024-12-18',
      lastViewed: '2024-12-21',
      views: 8,
      icon: Users,
      source: 'Independent',
      priority: 'medium',
      rating: 4.8
    },
    {
      id: 3,
      type: 'document',
      title: 'EMA Digital Transformation Strategy 2025-2027',
      description: 'Strategic roadmap for digital submission processes and AI integration in regulatory review',
      url: '/documents/ema-digital-strategy-2025',
      category: 'regulatory',
      tags: ['EMA', 'Digital Transformation', 'AI', 'eCTD'],
      dateBookmarked: '2024-12-15',
      lastViewed: '2024-12-22',
      views: 22,
      icon: FileText,
      source: 'EMA',
      priority: 'high'
    },
    {
      id: 4,
      type: 'rfp',
      title: 'RFP-2024-003: Global Pharmacovigilance System Implementation',
      description: 'Multi-region PV system implementation with Argus Safety and automated case processing',
      url: '/rfp/rfp-2024-003',
      category: 'marketplace',
      tags: ['Pharmacovigilance', 'Argus Safety', 'Global', 'Automation'],
      dateBookmarked: '2024-12-12',
      lastViewed: '2024-12-20',
      views: 12,
      icon: Building2,
      source: 'PharmaCorp',
      priority: 'medium'
    },
    {
      id: 5,
      type: 'vendor',
      title: 'Veeva Systems - Regulatory Cloud Platform',
      description: 'Comprehensive regulatory information management with IDMP compliance and AI capabilities',
      url: '/vendors/veeva-systems',
      category: 'marketplace',
      tags: ['Veeva', 'RIM', 'Cloud', 'IDMP', 'AI'],
      dateBookmarked: '2024-12-10',
      lastViewed: '2024-12-19',
      views: 18,
      icon: Building2,
      source: 'Veeva Systems',
      priority: 'medium',
      vendorFitScore: 4.5
    },
    {
      id: 6,
      type: 'feed',
      title: 'PMDA Fast-Track Designation for Regenerative Medicine',
      description: 'New expedited pathway for cell and gene therapy products in Japan regulatory framework',
      url: '/feeds/pmda-regen-med-fast-track',
      category: 'regulatory',
      tags: ['PMDA', 'Regenerative Medicine', 'Fast-Track', 'Japan'],
      dateBookmarked: '2024-12-08',
      lastViewed: '2024-12-21',
      views: 9,
      icon: FileText,
      source: 'PMDA',
      priority: 'medium'
    },
    {
      id: 7,
      type: 'meeting',
      title: 'Regulatory Strategy Session with Accenture Team',
      description: 'Upcoming consultation on CTIS implementation and EU regulatory harmonization',
      url: '/meetings/accenture-consultation-dec28',
      category: 'meetings',
      tags: ['Accenture', 'CTIS', 'EU', 'Strategy'],
      dateBookmarked: '2024-12-05',
      lastViewed: '2024-12-22',
      views: 5,
      icon: Calendar,
      source: 'Accenture',
      priority: 'high',
      meetingDate: '2024-12-28'
    },
    {
      id: 8,
      type: 'document',
      title: 'ICH M10: Bioanalytical Method Validation Guidelines',
      description: 'Updated harmonized guidelines for bioanalytical method validation across regions',
      url: '/documents/ich-m10-bioanalytical',
      category: 'regulatory',
      tags: ['ICH', 'Bioanalytical', 'Validation', 'Harmonization'],
      dateBookmarked: '2024-12-02',
      lastViewed: '2024-12-18',
      views: 14,
      icon: FileText,
      source: 'ICH',
      priority: 'medium'
    }
  ];

  const getFilteredItems = () => {
    let filtered = bookmarkedItems;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Sort items
    switch (sortBy) {
      case 'recent':
        return filtered.sort((a, b) => new Date(b.dateBookmarked).getTime() - new Date(a.dateBookmarked).getTime());
      case 'viewed':
        return filtered.sort((a, b) => new Date(b.lastViewed).getTime() - new Date(a.lastViewed).getTime());
      case 'popular':
        return filtered.sort((a, b) => b.views - a.views);
      case 'alphabetical':
        return filtered.sort((a, b) => a.title.localeCompare(b.title));
      default:
        return filtered;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'feed': return FileText;
      case 'consultant': return Users;
      case 'vendor': return Building2;
      case 'rfp': return Building2;
      case 'document': return FileText;
      case 'meeting': return Calendar;
      default: return Bookmark;
    }
  };

  const categoryStats = {
    all: bookmarkedItems.length,
    regulatory: bookmarkedItems.filter(item => item.category === 'regulatory').length,
    marketplace: bookmarkedItems.filter(item => item.category === 'marketplace').length,
    meetings: bookmarkedItems.filter(item => item.category === 'meetings').length
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Bookmark className="h-6 w-6 text-blue-600" />
            Bookmarks & Favorites
          </h1>
          <p className="text-muted-foreground">
            Your saved regulatory feeds, consultants, documents, and marketplace items
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <FolderPlus className="h-4 w-4 mr-2" />
            Create Collection
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Bookmark className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium">Total Bookmarks</span>
            </div>
            <p className="text-2xl font-bold mt-1">{categoryStats.all}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium">Regulatory</span>
            </div>
            <p className="text-2xl font-bold mt-1">{categoryStats.regulatory}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium">Marketplace</span>
            </div>
            <p className="text-2xl font-bold mt-1">{categoryStats.marketplace}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-orange-600" />
              <span className="text-sm font-medium">Meetings</span>
            </div>
            <p className="text-2xl font-bold mt-1">{categoryStats.meetings}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Saved Items</CardTitle>
            <div className="flex items-center gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Recently Saved</SelectItem>
                  <SelectItem value="viewed">Recently Viewed</SelectItem>
                  <SelectItem value="popular">Most Viewed</SelectItem>
                  <SelectItem value="alphabetical">Alphabetical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search bookmarks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="regulatory">Regulatory</SelectItem>
                <SelectItem value="marketplace">Marketplace</SelectItem>
                <SelectItem value="meetings">Meetings</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All ({categoryStats.all})</TabsTrigger>
              <TabsTrigger value="regulatory">Regulatory ({categoryStats.regulatory})</TabsTrigger>
              <TabsTrigger value="marketplace">Marketplace ({categoryStats.marketplace})</TabsTrigger>
              <TabsTrigger value="meetings">Meetings ({categoryStats.meetings})</TabsTrigger>
            </TabsList>

            <TabsContent value={selectedCategory} className="mt-6">
              <ScrollArea className="h-96">
                <div className="space-y-4">
                  {getFilteredItems().map((item) => {
                    const IconComponent = getTypeIcon(item.type);
                    return (
                      <div
                        key={item.id}
                        className="p-4 border border-border rounded-lg hover:shadow-md transition-all cursor-pointer hover:bg-accent/30"
                      >
                        <div className="flex items-start gap-4">
                          {/* Icon */}
                          <div className="p-2 rounded-lg bg-accent">
                            <IconComponent className="h-5 w-5 text-muted-foreground" />
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <div>
                                <h3 className="font-semibold text-sm leading-tight">{item.title}</h3>
                                <p className="text-xs text-muted-foreground mt-1">{item.source}</p>
                              </div>
                              <div className="flex items-center gap-1">
                                <Badge 
                                  variant="outline" 
                                  className={`text-xs ${getPriorityColor(item.priority)}`}
                                >
                                  {item.priority}
                                </Badge>
                                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                  <MoreVertical className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>

                            <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                              {item.description}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-1 mb-3">
                              {item.tags.map((tag, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>

                            {/* Metadata and Actions */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Bookmark className="h-3 w-3" />
                                  <span>Saved {item.dateBookmarked}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Eye className="h-3 w-3" />
                                  <span>{item.views} views</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  <span>Last viewed {item.lastViewed}</span>
                                </div>
                                {item.rating && (
                                  <div className="flex items-center gap-1">
                                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                    <span>{item.rating}</span>
                                  </div>
                                )}
                              </div>

                              <div className="flex items-center gap-1">
                                <Button variant="ghost" size="sm" className="h-6 px-2">
                                  <ExternalLink className="h-3 w-3 mr-1" />
                                  <span className="text-xs">Open</span>
                                </Button>
                                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                  <Share className="h-3 w-3" />
                                </Button>
                                <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-red-600">
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}