  import { useState } from 'react';
  import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
  import { Button } from "./ui/button";
  import { Badge } from "./ui/badge";
  import { Separator } from "./ui/separator";
  import { Upload, FileText, Eye, Download } from 'lucide-react';
  
  interface DocumentChange {
    id: number;
    change: string;
    updateType: 'Added' | 'Deleted' | 'Modified';
    location: string;
    page?: number;
  }
  
  export function DocComparisonDashboard() {
    const [document1, setDocument1] = useState<File | null>(null);
    const [document2, setDocument2] = useState<File | null>(null);
    
    // Mock data for demonstration
    const mockChanges: DocumentChange[] = [
      {
        id: 1,
        change: "Regulatory Update for 510(k)",
        updateType: "Added",
        location: "paragraph 3",
        page: 29
      },
      {
        id: 2,
        change: "Clinical trial data requirements",
        updateType: "Modified",
        location: "section 4.2",
        page: 15
      },
      {
        id: 3,
        change: "Previous submission guidelines",
        updateType: "Deleted",
        location: "appendix A",
        page: 45
      },
      {
        id: 4,
        change: "Post-market surveillance protocols",
        updateType: "Added",
        location: "chapter 7",
        page: 78
      },
      {
        id: 5,
        change: "Device classification criteria",
        updateType: "Modified",
        location: "table 2.1",
        page: 12
      }
    ];
  
    // Mock document content with highlighted changes
    const sampleDocument1Content = `
      REGULATORY GUIDANCE DOCUMENT
      
      Section 1: Introduction
      This document provides comprehensive guidance for medical device submissions under the 510(k) pathway.
      
      Section 2: Pre-submission Requirements
      Before submitting a 510(k) application, manufacturers must ensure all preliminary requirements are met.
      
      <span class="bg-red-100 text-red-800 px-1 rounded">Previous submission guidelines must be reviewed carefully.</span>
      
      Section 3: Clinical Data Requirements
      <span class="bg-amber-100 text-amber-800 px-1 rounded">Clinical trial data requirements have been updated to include additional safety parameters.</span>
      
      Section 4: Device Classification
      <span class="bg-amber-100 text-amber-800 px-1 rounded">Device classification criteria now include expanded risk assessment protocols.</span>
    `;
  
    const sampleDocument2Content = `
      REGULATORY GUIDANCE DOCUMENT
      
      Section 1: Introduction
      This document provides comprehensive guidance for medical device submissions under the 510(k) pathway.
      
      Section 2: Pre-submission Requirements
      Before submitting a 510(k) application, manufacturers must ensure all preliminary requirements are met.
      
      <span class="bg-green-100 text-green-800 px-1 rounded">Regulatory Update for 510(k): New streamlined process for low-risk devices.</span>
      
      Section 3: Clinical Data Requirements
      <span class="bg-amber-100 text-amber-800 px-1 rounded">Clinical trial data requirements have been enhanced to include comprehensive safety and efficacy parameters.</span>
      
      Section 4: Device Classification
      <span class="bg-amber-100 text-amber-800 px-1 rounded">Device classification criteria now include comprehensive risk assessment and post-market surveillance protocols.</span>
      
      <span class="bg-green-100 text-green-800 px-1 rounded">Section 7: Post-market surveillance protocols for enhanced device monitoring and reporting.</span>
    `;
  
    const handleFileUpload = (file: File, documentNumber: 1 | 2) => {
      if (documentNumber === 1) {
        setDocument1(file);
      } else {
        setDocument2(file);
      }
    };
  
    const getUpdateTypeColor = (type: string) => {
      switch (type) {
        case 'Added':
          return 'bg-green-100 text-green-800';
        case 'Deleted':
          return 'bg-red-100 text-red-800';
        case 'Modified':
          return 'bg-amber-100 text-amber-800';
        default:
          return 'bg-gray-100 text-gray-800';
      }
    };
  
    return (
      <div className="space-y-6">
        {/* Document Upload and Comparison Section */}
        <div className="grid grid-cols-2 gap-6">
          {/* Document 1 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Document 1 (Original)
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!document1 ? (
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <Upload className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="mb-2">Upload Document</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Drag and drop your document here, or click to browse
                  </p>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(file, 1);
                    }}
                    className="hidden"
                    id="document1-upload"
                  />
                  <label htmlFor="document1-upload">
                    <Button variant="outline" className="cursor-pointer">
                      Browse Files
                    </Button>
                  </label>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      <span className="text-sm">{document1.name}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline">
                        <Upload className="h-3 w-3 mr-1" />
                        Replace
                      </Button>
                    </div>
                  </div>
                  <div className="border rounded-lg p-4 bg-muted/30 max-h-64 overflow-y-auto">
                    <div 
                      className="text-sm leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: sampleDocument1Content }}
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
  
          {/* Document 2 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Document 2 (Updated)
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!document2 ? (
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <Upload className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="mb-2">Upload Document</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Drag and drop your document here, or click to browse
                  </p>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(file, 2);
                    }}
                    className="hidden"
                    id="document2-upload"
                  />
                  <label htmlFor="document2-upload">
                    <Button variant="outline" className="cursor-pointer">
                      Browse Files
                    </Button>
                  </label>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      <span className="text-sm">{document2.name}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline">
                        <Upload className="h-3 w-3 mr-1" />
                        Replace
                      </Button>
                    </div>
                  </div>
                  <div className="border rounded-lg p-4 bg-muted/30 max-h-64 overflow-y-auto">
                    <div 
                      className="text-sm leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: sampleDocument2Content }}
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
  
        {/* Color Legend */}
        <Card>
          <CardHeader>
            <CardTitle>Change Legend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-100 border border-green-200 rounded"></div>
                <span className="text-sm">Added Content</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-100 border border-red-200 rounded"></div>
                <span className="text-sm">Deleted Content</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-amber-100 border border-amber-200 rounded"></div>
                <span className="text-sm">Modified Content</span>
              </div>
            </div>
          </CardContent>
        </Card>
  
        {/* Changes Summary */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Changes Summary</CardTitle>
            <Button size="sm" variant="outline">
              <Download className="h-3 w-3 mr-1" />
              Export Report
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockChanges.map((change, index) => (
                <div key={change.id} className="flex items-start gap-4 p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="min-w-8 h-8 bg-muted rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="font-medium mb-1">'{change.change}'</h4>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <Badge 
                            variant="secondary" 
                            className={getUpdateTypeColor(change.updateType)}
                          >
                            {change.updateType}
                          </Badge>
                          <span>{change.location}</span>
                          {change.page && (
                            <span>Page {change.page}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {mockChanges.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="h-8 w-8 mx-auto mb-4" />
                <p>No changes detected. Upload both documents to see comparison results.</p>
              </div>
            )}
          </CardContent>
        </Card>
  
        {/* Summary Statistics */}
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-green-600">
                {mockChanges.filter(c => c.updateType === 'Added').length}
              </div>
              <div className="text-sm text-muted-foreground">Items Added</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-red-600">
                {mockChanges.filter(c => c.updateType === 'Deleted').length}
              </div>
              <div className="text-sm text-muted-foreground">Items Deleted</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-amber-600">
                {mockChanges.filter(c => c.updateType === 'Modified').length}
              </div>
              <div className="text-sm text-muted-foreground">Items Modified</div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }