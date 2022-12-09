
export interface ISEOTags {
    title?: string;
    description?: string;
    keywords?: string;
    robots?: string[];
    ogType?: 'article' | 'blog' | 'website';
    image?: string;
    extraHeadTags?: string;
};