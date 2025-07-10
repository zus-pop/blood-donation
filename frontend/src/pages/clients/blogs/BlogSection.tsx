import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useQuery } from "@tanstack/react-query";
import { Calendar, Droplets, Filter, Search } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { getBlogs } from "@/apis/blog.api";
import { getCategoriesGroupBy } from "@/apis/category.api";
import Loading from "@/components/loading";
import { formatDate } from "@/lib/utils";

export default function BlogSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTitle, setSearchTitle] = useState("");
  const { data: categories = [] } = useQuery({
    queryKey: ["categories-group"],
    queryFn: getCategoriesGroupBy,
  });

  const { data: blogs = [], isPending } = useQuery({
    queryKey: ["blogs", selectedCategory, searchTitle],
    queryFn: () =>
      getBlogs({
        category: selectedCategory === "all" ? undefined : selectedCategory,
        title: searchTitle,
      }),
    staleTime: 1000 * 60,
  });
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setMobileFilterOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Blog Header */}
      <section className="bg-red-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Bloody Blogs
            </h1>
            <p className="text-lg text-red-100 max-w-2xl">
              Stay informed with the latest news, stories, and tips about blood
              donation and its impact on our community.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar - Categories (Desktop) */}
            <div className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24">
                <h3 className="text-lg font-semibold mb-4">Categories</h3>
                <div className="space-y-1">
                  {categories?.map((category) => (
                    <Button
                      key={category._id}
                      variant={
                        selectedCategory === category._id ? "default" : "ghost"
                      }
                      className={`w-full justify-start ${
                        selectedCategory === category.slug
                          ? "bg-red-600 hover:bg-red-700 text-white"
                          : ""
                      }`}
                      onClick={() => handleCategoryChange(category.slug)}
                    >
                      <span>{category.name}</span>
                      <Badge
                        variant="outline"
                        className={`ml-auto ${
                          selectedCategory === category.slug
                            ? "text-white border-black bg-black"
                            : ""
                        }`}
                      >
                        {category.totalBlogs}
                      </Badge>
                    </Button>
                  ))}
                </div>

                <Separator className="my-6" />

                <h3 className="text-lg font-semibold mb-4">Search</h3>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search articles..."
                    className="pl-8"
                    value={searchTitle}
                    onChange={(e) => setSearchTitle(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Mobile Filters */}
              <div className="flex items-center justify-between mb-6 lg:hidden">
                <h2 className="text-2xl font-bold">Blog Posts</h2>
                <div className="flex gap-2">
                  <Sheet
                    open={mobileFilterOpen}
                    onOpenChange={setMobileFilterOpen}
                  >
                    <SheetTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Filter className="h-4 w-4 mr-2" />
                        Filter
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="right">
                      <h3 className="text-lg font-semibold mb-4">Categories</h3>
                      <div className="space-y-1">
                        {categories?.map((category) => (
                          <Button
                            key={category._id}
                            variant={
                              selectedCategory === category._id
                                ? "default"
                                : "ghost"
                            }
                            className={`w-full justify-start ${
                              selectedCategory === category._id
                                ? "bg-red-600 hover:bg-red-700"
                                : ""
                            }`}
                            onClick={() => handleCategoryChange(category.slug)}
                          >
                            <span>{category.name}</span>
                            <Badge variant="outline" className="ml-auto">
                              {category.totalBlogs}
                            </Badge>
                          </Button>
                        ))}
                      </div>
                    </SheetContent>
                  </Sheet>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Search className="h-4 w-4 mr-2" />
                        Search
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[300px] p-4">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="search"
                          placeholder="Search title..."
                          className="pl-8"
                          value={searchTitle}
                          onChange={(e) => setSearchTitle(e.target.value)}
                        />
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Desktop Title */}
              <div className="hidden lg:block mb-6">
                <h2 className="text-2xl font-bold">
                  {selectedCategory === "all"
                    ? "All Blog Posts"
                    : categories?.find((c) => c._id === selectedCategory)?.name}
                </h2>
                <p className="text-muted-foreground">
                  {blogs?.length} {blogs?.length === 1 ? "article" : "articles"}{" "}
                  found
                </p>
              </div>

              {/* Blog Posts Grid */}
              {isPending ? (
                <Loading fullscreen={false} />
              ) : blogs.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
                  {blogs.map((blog) => (
                    <Link
                      to={`/blogs/${blog._id}`}
                      className="transition-colors"
                    >
                      <Card
                        key={blog._id}
                        className="pt-0 hover:shadow-lg hover:scale-102 transition-all duration-300"
                      >
                        <div className="relative h-60 w-full overflow-hidden rounded-t-lg">
                          <img
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                            src={blog.image}
                            alt={blog.title}
                          />
                          <div className="absolute top-4 left-4">
                            <Badge className="bg-red-600 hover:bg-red-700">
                              {blog.category.name}
                            </Badge>
                          </div>
                        </div>
                        <CardHeader>
                          <CardTitle className="text-lg">
                            {blog.title}
                          </CardTitle>
                          <CardDescription className="line-clamp-2">
                            {blog.summary}
                          </CardDescription>
                        </CardHeader>
                        <CardFooter className="flex justify-between text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Calendar className="mr-1 size-4" />
                            <span>
                              {formatDate(new Date(blog.createdAt), false)}
                            </span>
                          </div>
                        </CardFooter>
                      </Card>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="mx-auto h-12 w-12 text-muted-foreground">
                    <Search className="h-12 w-12" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">
                    No articles found
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    We couldn't find any articles matching your search criteria.
                  </p>
                  <Button
                    className="mt-4"
                    onClick={() => {
                      setSelectedCategory("all");
                      setSearchTitle("");
                    }}
                  >
                    Clear filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-12 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <Droplets className="h-10 w-10 text-red-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-muted-foreground mb-6">
              Stay updated with the latest articles, blood drive events, and
              donation tips.
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <Input
                type="email"
                placeholder="Your email address"
                className="flex-1"
              />
              <Button className="bg-red-600 hover:bg-red-700">Subscribe</Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
