export interface OriginalUrl {
    id: string;
    url: string;
    times_shortened: number;
  }
  
export interface shortenedUrl{
    id: string;
    originalUrl: OriginalUrl;
    userId: string | null;
    nickname: string;
    clicksCount: number;
    accesses_count: number;
    creation_date: Date;
    expiration_date: Date;
    password: string | null;
  }