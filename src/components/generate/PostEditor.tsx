import React from 'react';
import { CheckCircle2, Loader2, Zap, Image as ImageIcon } from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { TipTapEditor } from '../TipTapEditor';
import { GeneratedPost, PostStatus } from '../../types';

interface PostEditorProps {
  generatedPost: GeneratedPost;
  editorContent: string;
  onEditorChange: (content: string) => void;
  status: PostStatus;
  publishResult: { id: number; link: string } | null;
  wpConnected: boolean;
  onPublish: () => void;
}

export function PostEditor({ 
  generatedPost, 
  editorContent, 
  onEditorChange, 
  status,
  publishResult,
  wpConnected,
  onPublish 
}: PostEditorProps) {
  return (
    <Card className="border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden flex flex-col animate-in fade-in duration-500">
      {/* Editor Toolbar Header */}
      <div className="h-16 border-b border-slate-100 flex items-center justify-between px-6 bg-white sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="rounded-md bg-purple-50 text-purple-700 border-purple-100">
            AI Generated
          </Badge>
        </div>
        
        <div className="flex items-center gap-3">
          {publishResult ? (
            <Badge variant="success" className="h-9 px-4 rounded-md gap-2 text-sm">
              <CheckCircle2 size={14} /> Published
              <a href={publishResult.link} target="_blank" rel="noreferrer" className="underline text-white/80 hover:text-white">View</a>
            </Badge>
          ) : (
            wpConnected ? (
              <Button 
                onClick={onPublish} 
                disabled={status === PostStatus.CONNECTING_WP} 
                className="bg-slate-900 text-white hover:bg-slate-800 rounded-md h-9 px-6 font-bold text-xs"
              >
                {status === PostStatus.CONNECTING_WP ? <Loader2 className="animate-spin mr-2 h-3 w-3" /> : <Zap className="mr-2 h-3 w-3" />}
                Publish to WordPress
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                <Badge variant="warning" className="h-9 px-4 rounded-md">Connect WP to Publish</Badge>
              </div>
            )
          )}
        </div>
      </div>

      {/* Editor Body */}
      <div className="flex-1 bg-white p-0 relative flex flex-col">
        
        {/* Featured Image Section */}
        {generatedPost.featuredImage && (
          <div className="w-full bg-slate-50 relative group border-b border-slate-100">
            <div className="aspect-video max-h-[400px] w-full overflow-hidden relative">
              <img 
                src={generatedPost.featuredImage} 
                alt="Featured" 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-slate-900 px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-2 shadow-sm">
              <ImageIcon size={12} className="text-purple-600" /> Featured Image
            </div>
          </div>
        )}

        <div className="flex-1">
          <TipTapEditor 
            content={generatedPost.content} 
            onChange={onEditorChange} 
            className="border-none shadow-none rounded-none min-h-[600px] p-8 md:p-12"
          />
        </div>
      </div>
    </Card>
  );
}
