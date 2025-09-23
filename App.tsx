import { useState, useEffect } from 'react';
import { LeftSidebar } from './components/LeftSidebar';
import { RightSidebar } from './components/RightSidebar';
import { MainContent } from './components/MainContent';
import { SearchBar } from './components/SearchBar';
import { FloatingChatbot } from './components/FloatingChatbot';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ThemeProvider } from './components/ThemeProvider';
import { ThemeToggle } from './components/ThemeToggle';
import { Button } from './components/ui/button';
import { ChevronLeft, ChevronRight, Menu, Bell, User } from 'lucide-react';

export default function App() {
  const [activeItem, setActiveItem] = useState('dashboard');
  const [leftSidebarCollapsed, setLeftSidebarCollapsed] = useState(false);
  const [rightSidebarCollapsed, setRightSidebarCollapsed] = useState(false);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ctrl/Cmd + K for global search
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        const searchInput = document.querySelector('input[placeholder*="Search"]') as HTMLInputElement;
        if (searchInput) {
          searchInput.focus();
        }
      }
      
      // Ctrl/Cmd + B to toggle left sidebar
      if ((event.ctrlKey || event.metaKey) && event.key === 'b') {
        event.preventDefault();
        setLeftSidebarCollapsed(!leftSidebarCollapsed);
      }
      
      // Ctrl/Cmd + . to toggle right sidebar
      if ((event.ctrlKey || event.metaKey) && event.key === '.') {
        event.preventDefault();
        setRightSidebarCollapsed(!rightSidebarCollapsed);
      }

      // Escape to close sidebars if on mobile
      if (event.key === 'Escape') {
        if (window.innerWidth < 1024) {
          setLeftSidebarCollapsed(true);
          setRightSidebarCollapsed(true);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [leftSidebarCollapsed, rightSidebarCollapsed]);

  return (
    <ThemeProvider defaultTheme="system" storageKey="nexus-ui-theme">
      <ErrorBoundary>
        <div className="h-screen flex bg-background" role="application" aria-label="Nexus Regulatory Intelligence Platform">
        {/* Left Sidebar */}
        <div className={`relative transition-all duration-300 ${leftSidebarCollapsed ? 'w-0' : 'w-64'}`}>
          {!leftSidebarCollapsed && (
            <ErrorBoundary>
              <LeftSidebar 
                activeItem={activeItem} 
                onItemSelect={setActiveItem} 
              />
            </ErrorBoundary>
          )}
          {/* Left Sidebar Toggle */}
          <Button
            variant="ghost"
            size="sm"
            className="absolute -right-3 top-4 z-50 h-6 w-6 rounded-full border border-border bg-background shadow-md hover:bg-accent"
            onClick={() => setLeftSidebarCollapsed(!leftSidebarCollapsed)}
            aria-label={leftSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            title={`${leftSidebarCollapsed ? 'Expand' : 'Collapse'} sidebar (Ctrl+B)`}
          >
            {leftSidebarCollapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
          </Button>
        </div>
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Top Search Bar */}
          <header className="border-b border-border p-4 bg-card" role="banner">
            <div className="flex items-center gap-4">
              {leftSidebarCollapsed && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setLeftSidebarCollapsed(false)}
                  aria-label="Show navigation menu"
                >
                  <Menu className="h-4 w-4" />
                </Button>
              )}
              <div className="flex-1">
                <SearchBar />
              </div>
              
              {/* Header Actions */}
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveItem('notifications')}
                  className="relative"
                  aria-label="View notifications"
                >
                  <Bell className="h-4 w-4" />
                  <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                </Button>
                
                <ThemeToggle />
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveItem('settings')}
                  aria-label="User settings"
                >
                  <User className="h-4 w-4" />
                </Button>
                
                {rightSidebarCollapsed && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setRightSidebarCollapsed(false)}
                    aria-label="Show global news sidebar"
                  >
                    <Menu className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </header>
          
          {/* Main Content */}
          <main className="flex-1" role="main">
            <ErrorBoundary>
              <MainContent activeItem={activeItem} />
            </ErrorBoundary>
          </main>
        </div>
        
        {/* Right Sidebar */}
        <aside className={`relative transition-all duration-300 ${rightSidebarCollapsed ? 'w-0' : 'w-80'}`} role="complementary">
          {!rightSidebarCollapsed && (
            <ErrorBoundary>
              <RightSidebar />
            </ErrorBoundary>
          )}
          {/* Right Sidebar Toggle */}
          <Button
            variant="ghost"
            size="sm"
            className="absolute -left-3 top-4 z-50 h-6 w-6 rounded-full border border-border bg-background shadow-md hover:bg-accent"
            onClick={() => setRightSidebarCollapsed(!rightSidebarCollapsed)}
            aria-label={rightSidebarCollapsed ? 'Show global news' : 'Hide global news'}
            title={`${rightSidebarCollapsed ? 'Show' : 'Hide'} global news (Ctrl+.)`}
          >
            {rightSidebarCollapsed ? <ChevronLeft className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
          </Button>
        </aside>

        {/* Floating Chatbot */}
        <ErrorBoundary>
          <FloatingChatbot />
        </ErrorBoundary>

        {/* Keyboard shortcuts info - hidden but available for screen readers */}
        <div className="sr-only" aria-live="polite">
          <p>Keyboard shortcuts: Ctrl+K for search, Ctrl+B for sidebar, Ctrl+. for news panel, Escape to close panels</p>
        </div>
        </div>
      </ErrorBoundary>
    </ThemeProvider>
  );
}
