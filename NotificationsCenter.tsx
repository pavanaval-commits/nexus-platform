import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  Bell, 
  Check, 
  X, 
  Archive, 
  Settings,
  AlertTriangle,
  Info,
  CheckCircle,
  Clock,
  FileText,
  Users,
  Building2,
  Calendar,
  Star,
  Filter,
  Search,
  MoreVertical
} from 'lucide-react';

export function NotificationsCenter() {
  const [selectedTab, setSelectedTab] = useState('all');
  
  const notifications = [
    {
      id: 1,
      type: 'regulatory',
      priority: 'high',
      title: 'FDA Updates Drug Approval Guidelines',
      message: 'New guidance document published affecting MAA submissions for novel therapeutics',
      timestamp: '2 hours ago',
      read: false,
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      id: 2,
      type: 'deadline',
      priority: 'high',
      title: 'Submission Deadline Approaching',
      message: 'FDA 510(k) submission for Project Alpha due in 3 days',
      timestamp: '4 hours ago',
      read: false,
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      id: 3,
      type: 'consultant',
      priority: 'medium',
      title: 'New Expert Available',
      message: 'Dr. Sarah Johnson (IDMP specialist) has joined the platform with 15+ years experience',
      timestamp: '6 hours ago',
      read: true,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      id: 4,
      type: 'rfp',
      priority: 'medium',
      title: 'RFP Response Received',
      message: '5 new proposals received for RFP-2024-003: Veeva RIM Implementation',
      timestamp: '8 hours ago',
      read: true,
      icon: Building2,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      id: 5,
      type: 'system',
      priority: 'low',
      title: 'Weekly Regulatory Digest',
      message: '47 new regulatory updates from FDA, EMA, and PMDA this week',
      timestamp: '1 day ago',
      read: false,
      icon: FileText,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      id: 6,
      type: 'achievement',
      priority: 'low',
      title: 'Quiz Completed Successfully',
      message: 'You scored 95% on EU MDR Compliance Assessment - Above average!',
      timestamp: '2 days ago',
      read: true,
      icon: CheckCircle,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50'
    },
    {
      id: 7,
      type: 'meeting',
      priority: 'medium',
      title: 'Consultant Meeting Scheduled',
      message: 'Video call with David Williams scheduled for Dec 28, 2024 at 2:00 PM EST',
      timestamp: '2 days ago',
      read: true,
      icon: Calendar,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    },
    {
      id: 8,
      type: 'recommendation',
      priority: 'low',
      title: 'Consultant Recommendation',
      message: 'Based on your recent FDA feed activity, we recommend connecting with regulatory specialists',
      timestamp: '3 days ago',
      read: true,
      icon: Star,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    }
  ];

  const getFilteredNotifications = () => {
    switch (selectedTab) {
      case 'unread':
        return notifications.filter(n => !n.read);
      case 'high':
        return notifications.filter(n => n.priority === 'high');
      case 'regulatory':
        return notifications.filter(n => n.type === 'regulatory' || n.type === 'deadline');
      case 'marketplace':
        return notifications.filter(n => n.type === 'consultant' || n.type === 'rfp');
      default:
        return notifications;
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

  const unreadCount = notifications.filter(n => !n.read).length;
  const highPriorityCount = notifications.filter(n => n.priority === 'high').length;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Bell className="h-6 w-6" />
            Notifications
          </h1>
          <p className="text-muted-foreground">
            Stay updated on regulatory changes, deadlines, and marketplace activities
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Archive className="h-4 w-4 mr-2" />
            Archive All
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium">Total</span>
            </div>
            <p className="text-2xl font-bold mt-1">{notifications.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <span className="text-sm font-medium">Unread</span>
            </div>
            <p className="text-2xl font-bold mt-1">{unreadCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-orange-600" />
              <span className="text-sm font-medium">High Priority</span>
            </div>
            <p className="text-2xl font-bold mt-1">{highPriorityCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium">This Week</span>
            </div>
            <p className="text-2xl font-bold mt-1">
              {notifications.filter(n => 
                n.timestamp.includes('hour') || n.timestamp.includes('day')
              ).length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Notification Tabs */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Notifications</CardTitle>
            <Button variant="ghost" size="sm">
              <Check className="h-4 w-4 mr-2" />
              Mark All Read
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unread" className="relative">
                Unread
                {unreadCount > 0 && (
                  <Badge className="ml-2 h-4 w-4 p-0 text-xs bg-red-500 text-white">
                    {unreadCount}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="high">High Priority</TabsTrigger>
              <TabsTrigger value="regulatory">Regulatory</TabsTrigger>
              <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
            </TabsList>

            <TabsContent value={selectedTab} className="mt-4">
              <ScrollArea className="h-96">
                <div className="space-y-3">
                  {getFilteredNotifications().map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border border-border rounded-lg transition-all hover:shadow-sm cursor-pointer ${
                        !notification.read ? 'bg-accent/30 border-primary/20' : 'hover:bg-accent/50'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {/* Icon */}
                        <div className={`p-2 rounded-lg ${notification.bgColor}`}>
                          <notification.icon className={`h-4 w-4 ${notification.color}`} />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className={`font-medium text-sm ${!notification.read ? 'font-semibold' : ''}`}>
                                  {notification.title}
                                </h4>
                                {!notification.read && (
                                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                {notification.message}
                              </p>
                              <div className="flex items-center gap-3 mt-2">
                                <span className="text-xs text-muted-foreground">
                                  {notification.timestamp}
                                </span>
                                <Badge 
                                  variant="outline" 
                                  className={`text-xs ${getPriorityColor(notification.priority)}`}
                                >
                                  {notification.priority}
                                </Badge>
                                <Badge variant="outline" className="text-xs capitalize">
                                  {notification.type}
                                </Badge>
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-1">
                              {!notification.read && (
                                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                  <Check className="h-3 w-3" />
                                </Button>
                              )}
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <Archive className="h-3 w-3" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <X className="h-3 w-3" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <MoreVertical className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button variant="outline" className="h-16 flex-col gap-2">
              <Bell className="h-4 w-4" />
              <span className="text-xs">Notification Settings</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-2">
              <Filter className="h-4 w-4" />
              <span className="text-xs">Create Filter</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-2">
              <Archive className="h-4 w-4" />
              <span className="text-xs">View Archived</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-2">
              <Search className="h-4 w-4" />
              <span className="text-xs">Search History</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
