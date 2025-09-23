import { Search } from 'lucide-react';
import { Input } from './ui/input';

interface SearchBarProps {
  placeholder?: string;
}

export function SearchBar({ placeholder = "Search across regulatory intelligence, marketplace, and more..." }: SearchBarProps) {
  return (
    <div className="relative max-w-2xl mx-auto">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder={placeholder}
        className="pl-10 pr-4 py-2 w-full bg-input-background border-border"
      />
    </div>
  );
}