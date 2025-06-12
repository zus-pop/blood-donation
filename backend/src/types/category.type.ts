export interface CategoryQuery {
  name?: string | {};
  slug?: string;
}

export interface CreateCategoryDto {
  name: string;
  slug: string;
  description?: string;
}
export interface UpdateCategoryDto {
  name?: string;
  slug?: string;
  description?: string;
}
