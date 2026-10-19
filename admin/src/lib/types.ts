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

export interface Message {
  $id: string;
  subject: string;
  senderEmail: string;
  body: string;
  status?: "unread" | "read" | "replied";
  createdAt?: string;
  replyContent?: string;
}
