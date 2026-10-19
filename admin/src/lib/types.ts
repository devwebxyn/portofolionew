export interface Project {
  $id: string;
  title: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  category?: string;
  language?: string;
  imageUrl?: string;
  createdAt?: string;
}
