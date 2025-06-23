export interface BlogQuery {
  title?: string | {};
  slug?: string;
  category?: string;
}

export interface CreateBlogDto {
  slug: string;
  title: string;
  category: string;
  summary: string;
  content: string;
  image: string;
}

export interface UpdateBlogDto {
  image?: string;
  title?: string;
  slug?: string;
  category?: string;
  summary?: string;
  content?: string;
}
