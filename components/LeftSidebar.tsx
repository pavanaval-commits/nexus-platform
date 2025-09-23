import { useState } from 'react';
import { 
  ChevronDown, 
  ChevronRight, 
  FileText, 
  GitCompare, 
  HelpCircle, 
  Users, 
  UserCheck, 
  Building, 
  Briefcase,
  Home,
  Settings,
  Bell,
  Bookmark,
  LifeBuoy,
  BarChart3
} from 'lucide-react';

interface LeftSidebarProps {
  activeItem: string;
  onItemSelect: (item: string) => void;
}

export function LeftSidebar({ activeItem, onItemSelect }: LeftSidebarProps) {
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({
    'main': true,
    'reg-intel': false,
    'marketplace': false,
    'account': false
  });

  const toggleMenu = (menuKey: string) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuKey]: !prev[menuKey]
    }));
  };

  const menuItems = [
    {
      key: 'main',
      title: 'Overview',
      icon: Home,
      subItems: [
        { key: 'dashboard', title: 'Dashboard', icon: Home },
        { key: 'analytics', title: 'Analytics', icon: BarChart3 },
        { key: 'notifications', title: 'Notifications', icon: Bell },
        { key: 'bookmarks', title: 'Bookmarks', icon: Bookmark }
      ]
    },
    {
      key: 'reg-intel',
      title: 'Reg Intel',
      icon: FileText,
      subItems: [
        { key: 'feeds', title: 'Feeds', icon: FileText },
        { key: 'doc-comparison', title: 'Doc Comparison', icon: GitCompare },
        { key: 'quiz', title: 'Quiz', icon: HelpCircle }
      ]
    },
    {
      key: 'marketplace',
      title: 'Market Place',
      icon: Building,
      subItems: [
        { key: 'vendors', title: 'Vendors', icon: Users },
        { key: 'consultants', title: 'Consultants', icon: UserCheck },
        { key: 'cros', title: 'CROs', icon: Building },
        { key: 'rfp', title: 'RFP', icon: Briefcase }
      ]
    },
    {
      key: 'account',
      title: 'Account',
      icon: Settings,
      subItems: [
        { key: 'settings', title: 'Settings', icon: Settings },
        { key: 'help', title: 'Help & Support', icon: LifeBuoy }
      ]
    }
  ];

  return (
    <div className="w-64 bg-card border-r border-border h-full p-4">
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <div className="relative group">
            {/* Logo - Nexus Connection Symbol */}
            <div className="w-10 h-10 relative">
              {/* Outer ring with gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow duration-300"></div>
              {/* Inner background */}
              <div className="absolute inset-1 bg-card rounded-lg"></div>
              {/* Central nexus pattern */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-6 h-6 relative">
                  {/* Central hub */}
                  <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-sm"></div>
                  
                  {/* Orbital nodes */}
                  <div className="absolute top-0 left-1/2 w-1 h-1 bg-blue-500 rounded-full transform -translate-x-1/2"></div>
                  <div className="absolute bottom-0 left-1/2 w-1 h-1 bg-purple-500 rounded-full transform -translate-x-1/2"></div>
                  <div className="absolute top-1/2 left-0 w-1 h-1 bg-indigo-500 rounded-full transform -translate-y-1/2"></div>
                  <div className="absolute top-1/2 right-0 w-1 h-1 bg-blue-500 rounded-full transform -translate-y-1/2"></div>
                  
                  {/* Diagonal nodes */}
                  <div className="absolute top-1 right-1 w-0.5 h-0.5 bg-purple-400 rounded-full"></div>
                  <div className="absolute top-1 left-1 w-0.5 h-0.5 bg-blue-400 rounded-full"></div>
                  <div className="absolute bottom-1 right-1 w-0.5 h-0.5 bg-indigo-400 rounded-full"></div>
                  <div className="absolute bottom-1 left-1 w-0.5 h-0.5 bg-purple-400 rounded-full"></div>
                  
                  {/* Connection lines - creating a network effect */}
                  <div className="absolute top-1/2 left-1/2 w-5 h-px bg-gradient-to-r from-blue-600 via-blue-400 to-transparent transform -translate-x-1/2 -translate-y-1/2 opacity-80"></div>
                  <div className="absolute top-1/2 left-1/2 w-5 h-px bg-gradient-to-r from-purple-600 via-purple-400 to-transparent transform -translate-x-1/2 -translate-y-1/2 rotate-90 opacity-80"></div>
                  <div className="absolute top-1/2 left-1/2 w-4 h-px bg-gradient-to-r from-indigo-600 via-indigo-400 to-transparent transform -translate-x-1/2 -translate-y-1/2 rotate-45 opacity-60"></div>
                  <div className="absolute top-1/2 left-1/2 w-4 h-px bg-gradient-to-r from-blue-600 via-blue-400 to-transparent transform -translate-x-1/2 -translate-y-1/2 rotate-135 opacity-60"></div>
                </div>
              </div>
              {/* Subtle glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent group-hover:from-blue-700 group-hover:to-purple-700 transition-all duration-300">
              Nexus
            </h1>
            <p className="text-xs text-muted-foreground font-medium tracking-wide">Regulatory Intelligence Hub</p>
          </div>
        </div>
      </div>
      
      <nav className="space-y-2">
        {menuItems.map((menu) => (
          <div key={menu.key}>
            <button
              onClick={() => toggleMenu(menu.key)}
              className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-accent transition-colors"
            >
              <div className="flex items-center gap-2">
                <menu.icon className="h-4 w-4" />
                <span>{menu.title}</span>
              </div>
              {expandedMenus[menu.key] ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>
            
            {expandedMenus[menu.key] && (
              <div className="ml-4 mt-1 space-y-1">
                {menu.subItems.map((subItem) => (
                  <button
                    key={subItem.key}
                    onClick={() => onItemSelect(subItem.key)}
                    className={`w-full flex items-center gap-2 p-2 pl-4 rounded-lg transition-colors ${
                      activeItem === subItem.key
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-accent'
                    }`}
                  >
                    <subItem.icon className="h-3 w-3" />
                    <span className="text-sm">{subItem.title}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}