import { Dashboard } from './Dashboard';
import { AnalyticsDashboard } from './AnalyticsDashboard';
import { FeedsDashboard } from './FeedsDashboard';
import { FeedDetailView } from './FeedDetailView';
import { DocComparisonDashboard } from './DocComparisonDashboard';
import { QuizDashboard } from './QuizDashboard';
import { VendorsDashboard } from './VendorsDashboard';
import { ConsultantsDashboard } from './ConsultantsDashboard';
import { CRODashboard } from './CRODashboard';
import { RFPDashboard } from './RFPDashboard';
import { NotificationsCenter } from './NotificationsCenter';
import { BookmarksDashboard } from './BookmarksDashboard';
import { UserSettings } from './UserSettings';
import { HelpSupport } from './HelpSupport';
import { useState } from 'react';

interface MainContentProps {
  activeItem: string;
}

export function MainContent({ activeItem }: MainContentProps) {
  const [selectedFeedId, setSelectedFeedId] = useState<string | null>(null);

  const handleFeedClick = (feedId: string) => {
    setSelectedFeedId(feedId);
  };

  const handleBackToFeeds = () => {
    setSelectedFeedId(null);
  };
  const renderContent = () => {
    switch (activeItem) {
      case 'dashboard':
        return <Dashboard />;
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'notifications':
        return <NotificationsCenter />;
      case 'bookmarks':
        return <BookmarksDashboard />;
      case 'feeds':
        if (selectedFeedId) {
          return <FeedDetailView feedId={selectedFeedId} onBack={handleBackToFeeds} />;
        }
        return <FeedsDashboard onFeedClick={handleFeedClick} />;
      case 'doc-comparison':
        return <DocComparisonDashboard />;
      case 'quiz':
        return <QuizDashboard />;
      case 'vendors':
        return <VendorsDashboard />;
      case 'consultants':
        return <ConsultantsDashboard />;
      case 'cros':
        return <CRODashboard />;
      case 'rfp':
        return <RFPDashboard />;
      case 'settings':
        return <UserSettings />;
      case 'help':
        return <HelpSupport />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="h-full overflow-auto">
      {renderContent()}
    </div>
  );
}