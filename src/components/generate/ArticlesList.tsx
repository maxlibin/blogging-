import React from 'react';
import { Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { cn } from '../../lib/utils';

interface Article {
  id: number;
  title: string;
  status: string;
  updatedAt: string;
}

interface ArticlesListProps {
  articles: Article[];
  loading: boolean;
  currentPostId: number | null;
  onArticleClick: (id: number) => void;
}

export function ArticlesList({ articles, loading, currentPostId, onArticleClick }: ArticlesListProps) {
  return (
    <Card className="border-slate-200 shadow-sm overflow-hidden">
      <CardHeader className="pb-3 border-b border-slate-100">
        <CardTitle className="text-sm font-bold text-slate-700">Your Articles</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {loading ? (
          <div className="p-4 text-center text-slate-400">
            <Loader2 className="h-4 w-4 animate-spin mx-auto" />
          </div>
        ) : articles.length === 0 ? (
          <div className="p-4 text-center text-slate-400 text-xs">
            No articles yet
          </div>
        ) : (
          <div className="max-h-[400px] overflow-y-auto">
            {articles.map((post) => (
              <button
                key={post.id}
                onClick={() => onArticleClick(post.id)}
                className={cn(
                  "w-full text-left p-3 hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0",
                  currentPostId === post.id && "bg-purple-50 hover:bg-purple-50"
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <h4 className={cn(
                      "text-xs font-semibold truncate",
                      currentPostId === post.id ? "text-purple-700" : "text-slate-700"
                    )}>
                      {post.title}
                    </h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      {new Date(post.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge 
                    variant={post.status === 'published' ? 'success' : post.status === 'draft' ? 'secondary' : 'warning'}
                    className="text-[9px] px-1.5 py-0.5 shrink-0"
                  >
                    {post.status}
                  </Badge>
                </div>
              </button>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
