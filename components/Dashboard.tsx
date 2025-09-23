import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {
  BarChart3,
  TrendingUp,
  FileText,
  Users,
  Clock,
  Star,
  AlertTriangle,
  CheckCircle,
  Calendar,
  ArrowUpRight,
  Bookmark,
  Activity,
  Building2,
  MessageSquare,
  Bell,
} from "lucide-react";

export function Dashboard() {
  const quickStats = [
    {
      title: "Active Feeds",
      value: "147",
      change: "+12%",
      trend: "up",
      icon: FileText,
      color: "text-blue-600",
    },
    {
      title: "Consultants Available",
      value: "89",
      change: "+8%",
      trend: "up",
      icon: Users,
      color: "text-green-600",
    },
    {
      title: "Active RFPs",
      value: "23",
      change: "+3",
      trend: "up",
      icon: Building2,
      color: "text-purple-600",
    },
    {
      title: "Compliance Score",
      value: "94%",
      change: "+2%",
      trend: "up",
      icon: CheckCircle,
      color: "text-emerald-600",
    },
  ];

  const recentActivity = [
    {
      type: "feed",
      title: "FDA Updates Drug Approval Guidelines",
      time: "2 hours ago",
      priority: "high",
      icon: FileText,
    },
    {
      type: "consultant",
      title: "New consultant specializing in IDMP joined",
      time: "4 hours ago",
      priority: "medium",
      icon: Users,
    },
    {
      type: "rfp",
      title: "RFP-2024-003 received 5 new proposals",
      time: "6 hours ago",
      priority: "medium",
      icon: Building2,
    },
    {
      type: "quiz",
      title: "Quiz: EU MDR Compliance completed",
      time: "1 day ago",
      priority: "low",
      icon: CheckCircle,
    },
  ];

  const upcomingDeadlines = [
    {
      title: "FDA 510(k) Submission Review",
      date: "Dec 28, 2024",
      daysLeft: 6,
      type: "submission",
      priority: "high",
    },
    {
      title: "EMA Scientific Advice Meeting",
      date: "Jan 15, 2025",
      daysLeft: 24,
      type: "meeting",
      priority: "medium",
    },
    {
      title: "PMDA Consultation Response Due",
      date: "Jan 22, 2025",
      daysLeft: 31,
      type: "consultation",
      priority: "medium",
    },
  ];

  const topConsultants = [
    {
      name: "David Williams",
      firm: "Independent",
      rating: 4.8,
      specialization: "Veeva Implementation",
      recentWork: "IDMP Project",
    },
    {
      name: "Regulatory Tech Team",
      firm: "Accenture",
      rating: 4.7,
      specialization: "FDA Submissions",
      recentWork: "510(k) Process",
    },
    {
      name: "Life Sciences Practice",
      firm: "Deloitte",
      rating: 4.6,
      specialization: "AI in Pharma",
      recentWork: "Digital Transformation",
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Welcome back to Nexus
          </h1>
          <p className="text-muted-foreground mt-1">
            Your regulatory intelligence hub - Track, analyze,
            and connect across the regulatory landscape
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Meeting
          </Button>
          <Button>
            <MessageSquare className="h-4 w-4 mr-2" />
            Connect with Expert
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => (
          <Card
            key={index}
            className="hover:shadow-md transition-shadow"
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold mt-1">
                    {stat.value}
                  </p>
                  <p className="text-sm text-green-600 mt-1 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    {stat.change}
                  </p>
                </div>
                <div
                  className={`p-3 rounded-lg bg-accent ${stat.color}`}
                >
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors"
              >
                <div className="p-2 rounded-lg bg-accent">
                  <activity.icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">
                    {activity.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {activity.time}
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className={`text-xs ${getPriorityColor(activity.priority)}`}
                >
                  {activity.priority}
                </Badge>
              </div>
            ))}
            <Button variant="ghost" className="w-full text-sm">
              <ArrowUpRight className="h-4 w-4 mr-2" />
              View All Activity
            </Button>
          </CardContent>
        </Card>

        {/* Upcoming Deadlines */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-orange-600" />
              Upcoming Deadlines
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingDeadlines.map((deadline, index) => (
              <div
                key={index}
                className="p-3 border border-border rounded-lg"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-sm">
                    {deadline.title}
                  </h4>
                  <Badge
                    variant="outline"
                    className={`text-xs ${getPriorityColor(deadline.priority)}`}
                  >
                    {deadline.priority}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{deadline.date}</span>
                  <span className="font-medium">
                    {deadline.daysLeft} days left
                  </span>
                </div>
                <Progress
                  value={((30 - deadline.daysLeft) / 30) * 100}
                  className="mt-2"
                />
              </div>
            ))}
            <Button variant="ghost" className="w-full text-sm">
              <Calendar className="h-4 w-4 mr-2" />
              View Calendar
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Consultants */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-600" />
              Top Rated Consultants
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {topConsultants.map((consultant, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
              >
                <Avatar>
                  <AvatarFallback>
                    {consultant.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-sm">
                      {consultant.name}
                    </p>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs">
                        {consultant.rating}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {consultant.firm}
                  </p>
                  <p className="text-xs text-blue-600 mt-1">
                    {consultant.specialization}
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Contact
                </Button>
              </div>
            ))}
            <Button variant="ghost" className="w-full text-sm">
              <Users className="h-4 w-4 mr-2" />
              Browse All Consultants
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="h-20 flex-col gap-2"
              >
                <FileText className="h-5 w-5" />
                <span className="text-xs">Create RFP</span>
              </Button>
              <Button
                variant="outline"
                className="h-20 flex-col gap-2"
              >
                <Users className="h-5 w-5" />
                <span className="text-xs">Find Consultant</span>
              </Button>
              <Button
                variant="outline"
                className="h-20 flex-col gap-2"
              >
                <Bell className="h-5 w-5" />
                <span className="text-xs">Set Alerts</span>
              </Button>
              <Button
                variant="outline"
                className="h-20 flex-col gap-2"
              >
                <Bookmark className="h-5 w-5" />
                <span className="text-xs">Save Feed</span>
              </Button>
            </div>

            <div className="pt-4 border-t border-border">
              <h4 className="font-medium text-sm mb-3">
                Regulatory Insights
              </h4>
              <div className="space-y-2">
                <div className="p-2 bg-blue-50 rounded-lg border-l-2 border-blue-200">
                  <p className="text-xs font-medium text-blue-800">
                    📊 147 new regulatory updates this week
                  </p>
                </div>
                <div className="p-2 bg-green-50 rounded-lg border-l-2 border-green-200">
                  <p className="text-xs font-medium text-green-800">
                    ✅ 94% compliance score - Above industry
                    average
                  </p>
                </div>
                <div className="p-2 bg-orange-50 rounded-lg border-l-2 border-orange-200">
                  <p className="text-xs font-medium text-orange-800">
                    ⏰ 3 critical deadlines approaching
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}