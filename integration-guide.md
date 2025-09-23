# Nexus AI Integration Guide

## Component Integration Pattern

### 1. AI Tool Generated Component
```typescript
// AI generates: /components/RegAnalyticsDashboard.tsx
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { BarChart, TrendingUp, AlertCircle } from "lucide-react";

export function RegAnalyticsDashboard() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1>Regulatory Analytics</h1>
        <Button>Export Report</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Compliance Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">94%</div>
          </CardContent>
        </Card>
        {/* More cards... */}
      </div>
    </div>
  );
}
```

### 2. Add to LeftSidebar.tsx
```typescript
// Add new menu item
const menuItems = [
  // ... existing items
  { id: 'reg-analytics', label: 'Reg Analytics', icon: BarChart }
];
```

### 3. Add to MainContent.tsx
```typescript
// Add import
import { RegAnalyticsDashboard } from './RegAnalyticsDashboard';

// Add case in switch statement
case 'reg-analytics':
  return <RegAnalyticsDashboard />;
```

## AI Tool Specific Integration

### Figma Make Integration
1. Import Figma design directly
2. Generated components use your exact Tailwind tokens
3. Copy to /components directory
4. Import in MainContent.tsx

### v0.dev Integration
1. Describe component or upload screenshot
2. Copy generated TSX code
3. Update imports to match your structure:
   ```typescript
   // Change this:
   import { Button } from "@/components/ui/button"
   // To this:
   import { Button } from "./ui/button"
   ```

### Claude Artifacts Integration
1. Upload Figma screenshot
2. Use this prompt:
   ```
   Create a React component matching this design for my Nexus regulatory app:
   - Use TypeScript
   - Use Tailwind CSS with these design tokens: [paste your CSS variables]
   - Import UI components from "./ui/component-name"
   - Make it responsive
   - Include proper accessibility
   ```

## Styling Consistency

### Your Design System
- Colors: Automatically handled by CSS custom properties
- Typography: Handled by globals.css base layer
- Spacing: Use Tailwind spacing classes
- Components: Use existing shadcn/ui components

### AI Prompt Template
```
Component Requirements:
- Framework: React TypeScript
- Styling: Tailwind CSS
- UI Library: shadcn/ui components
- Color Scheme: Use CSS custom properties (background, foreground, primary, etc.)
- Typography: Don't override font sizes/weights (handled by base styles)
- Icons: Use lucide-react
- Layout: Responsive with mobile-first approach
- Accessibility: Include ARIA labels and keyboard navigation
```

## Testing Integration

### 1. Component Test
```typescript
// Add to MainContent.tsx temporarily
case 'test-component':
  return <YourNewComponent />;
```

### 2. Navigation Test
```typescript
// Add to LeftSidebar.tsx temporarily
{ id: 'test-component', label: 'Test', icon: TestTube }
```

### 3. Theme Test
- Switch between light/dark themes
- Verify colors adapt correctly
- Check responsive behavior

## Best Practices

### File Organization
```
/components
├── [Feature]Dashboard.tsx     # Main feature component
├── [Feature]Card.tsx         # Sub-components
├── [Feature]Modal.tsx        # Modal dialogs
├── [Feature]Filters.tsx      # Filter components
└── [Feature]Table.tsx        # Data tables
```

### State Management Pattern
```typescript
// Follow existing pattern in your components
const [selectedItem, setSelectedItem] = useState<string | null>(null);
const [filters, setFilters] = useState<FilterType>({});
const [loading, setLoading] = useState(false);
```

### Error Handling
```typescript
// Use your existing ErrorBoundary pattern
<ErrorBoundary>
  <YourNewComponent />
</ErrorBoundary>
```