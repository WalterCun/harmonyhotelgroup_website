
"use client";

import Image from 'next/image';
import Link from 'next/link';
import type { FC } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ThumbsUp, MessageCircle, Share2, ExternalLink, CalendarDays, UserCircle } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';
import type { BlogPost } from '@/lib/mock-data'; // Ensure correct path
import { format } from 'date-fns';
import { es, fr } from 'date-fns/locale';

// Simple SVG placeholder icons
const FacebookIconSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-blue-600">
    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.209 2h-1.791v7h-3v-7h-2v-2h2v-2.308c0-1.769.931-2.692 3.029-2.692h1.971v3z"/>
  </svg>
);
const InstagramIconSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-pink-500">
    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 2c2.761 0 3.056.011 4.14.061.947.043 1.514.223 1.942.416.43.195.75.43 1.078.759.328.328.564.648.759 1.078.193.428.373.995.416 1.942.05 1.084.061 1.379.061 4.14s-.011 3.056-.061 4.14c-.043.947-.223 1.514-.416 1.942-.195.43-.43.75-.759 1.078-.328.328-.648.564-1.078.759-.428.193-.995.373-1.942.416-1.084.05-1.379.061-4.14.061s-3.056-.011-4.14-.061c-.947-.043-1.514-.223-1.942-.416-.43-.195-.75-.43-1.078-.759-.328-.328-.564-.648-.759-1.078-.193-.428-.373-.995-.416-1.942-.05-1.084-.061-1.379-.061-4.14s.011-3.056.061-4.14c.043-.947.223-1.514.416-1.942.195-.43.43.75.759-1.078.328-.328.648-.564 1.078-.759.428-.193.995-.373 1.942-.416 1.084-.05 1.379-.061 4.14-.061zm0 4.5c-1.933 0-3.5 1.567-3.5 3.5s1.567 3.5 3.5 3.5 3.5-1.567 3.5-3.5-1.567-3.5-3.5-3.5zm0 6c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5zm4.5-7.5c-.552 0-1 .448-1 1s.448 1 1 1 1-.448 1-1-.448-1-1-1z"/>
  </svg>
);
const TikTokIconSvg = () => (
 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-black dark:text-white">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-1.06-.6-1.9-1.44-2.46-2.45a5.96 5.96 0 0 1-1.36-3.11V11.9c.94.13 1.9.2 2.83.15.73-.03 1.44-.19 2.14-.41.69-.22 1.34-.5 1.97-.82V.02z" />
  </svg>
);

const sourceIcons: Record<string, JSX.Element> = { // Allow any string for source
  Facebook: <FacebookIconSvg />,
  Instagram: <InstagramIconSvg />,
  TikTok: <TikTokIconSvg />,
};


interface BlogPostCardProps {
  post: BlogPost;
}

export const BlogPostCard: FC<BlogPostCardProps> = ({ post }) => {
  const { t, language } = useLanguage();

  const getDateLocale = () => {
    if (language === 'es') return es;
    if (language === 'fr') return fr;
    return undefined; // Defaults to browser/system locale for English or others
  };

  const formattedDate = format(new Date(post.date), "PP", { locale: getDateLocale() });

  return (
    <Card className="shadow-lg overflow-hidden flex flex-col h-full group">
      <div className="relative h-64 w-full">
        <Image
          src={post.imageUrl}
          alt={t(post.titleKey, post.title)}
          layout="fill"
          objectFit="cover"
          data-ai-hint={post.dataAiHint}
          className="group-hover:scale-105 transition-transform duration-300"
        />
        {post.type === 'social' && post.source && sourceIcons[post.source] && (
          <span className="absolute top-3 left-3 bg-background/80 p-1.5 rounded-full shadow z-10">
            {sourceIcons[post.source]}
          </span>
        )}
      </div>
      <CardHeader className="pb-3">
        <CardTitle className="text-xl text-primary group-hover:text-accent transition-colors">
          {t(post.titleKey, post.title)}
        </CardTitle>
        <div className="flex items-center text-xs text-muted-foreground space-x-3">
          <div className="flex items-center">
            <CalendarDays size={14} className="mr-1" />
            <span>{formattedDate}</span>
          </div>
          {post.author && (
            <div className="flex items-center">
              <UserCircle size={14} className="mr-1" />
              <span>{t(post.authorKey || 'author_placeholder', post.author)}</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription className="text-foreground/80 leading-relaxed line-clamp-3">
          {t(post.contentSnippetKey, post.contentSnippet)}
        </CardDescription>
        {post.tags && post.tags.length > 0 && (
          <div className="mt-3">
            {post.tags.map(tag => (
              <Badge key={tag} variant="secondary" className="mr-1.5 mb-1.5 text-xs">{tag}</Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-4 border-t flex flex-col items-start space-y-3">
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <ThumbsUp size={16} className="mr-1 text-primary/70" />
            <span>{post.popularityMetrics.reactions}</span>
          </div>
          <div className="flex items-center">
            <MessageCircle size={16} className="mr-1 text-primary/70" />
            <span>{post.popularityMetrics.comments}</span>
          </div>
          <div className="flex items-center">
            <Share2 size={16} className="mr-1 text-primary/70" />
            <span>{post.popularityMetrics.shares}</span>
          </div>
        </div>
        {post.type === 'social' && post.socialPostUrl ? (
          <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mt-auto">
            <a href={post.socialPostUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink size={18} className="mr-2" />
              {t('blog_view_on_social', { source: post.source || 'Social Media' })}
            </a>
          </Button>
        ) : post.type === 'local' ? (
          <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mt-auto">
            {/* For now, local posts link to a placeholder. Update to /blog/[id] when detail page exists */}
            <Link href={`/blog#${post.id}`}> 
              {t('blog_read_more')}
            </Link>
          </Button>
        ) : null}
      </CardFooter>
    </Card>
  );
};
    