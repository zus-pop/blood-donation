export interface BlogQuery {
  title?: string | {};
  slug?: string;
}

export interface CreateBlogDto {
    slug: string;
    title: string;
    category: string;
    summary: string;
    content: string;
    image: string
}
