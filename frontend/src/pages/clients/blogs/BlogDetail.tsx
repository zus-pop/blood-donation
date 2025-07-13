"use client";
import {
  ArrowLeft,
  Calendar,
  ChevronRight,
  Droplets,
  Heart,
  Share2,
} from "lucide-react";

import { getBlog } from "@/apis/blog.api";
import { getCategoriesGroupBy } from "@/apis/category.api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router";

export default function BlogDetail() {
  const { id } = useParams();

  const { data: blog, isLoading } = useQuery({
    queryKey: ["blog", id],
    queryFn: () => getBlog(id!),
    staleTime: 1000 * 60,
  });

  const { data: categories = [] } = useQuery({
    queryKey: ["categories-group"],
    queryFn: getCategoriesGroupBy,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Droplets className="h-10 w-10 text-red-600 mx-auto animate-pulse" />
          <p className="mt-4">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return null; // This shouldn't render as we redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Blog Header */}
      <section className="relative py-16 md:py-20 lg:py-24 text-white">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={blog.image || "/placeholder.svg"}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        {/* Content */}
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <Link
              to="/blogs"
              className="flex items-center text-white/80 hover:text-white mb-6 md:mb-8 self-start"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Blog
            </Link>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 md:mb-8 text-white drop-shadow-lg leading-tight">
              {blog.title}
            </h1>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-white/90 text-sm md:text-base">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{formatDate(new Date(blog.createdAt), false)}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="lg:w-2/3">
              {/* Category and Tags */}
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <Badge className="bg-red-600 hover:bg-red-700">
                  {blog.category.name}
                </Badge>
              </div>

              {/* Article Content */}
              <div
                className="prose prose-lg max-w-none mb-8"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              ></div>

              {/* Share Section */}
              <div className="flex items-center space-x-4 mb-8">
                <span className="font-medium">Share this article:</span>
                <Button variant="outline" size="icon" className="rounded-full">
                  <svg
                    role="img"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>Facebook</title>
                    <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" />
                  </svg>
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <svg
                    role="img"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>X</title>
                    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                  </svg>
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/3">
              <div className="sticky top-24 space-y-8">
                {/* Call to Action */}
                <Card className="bg-red-600 text-white">
                  <CardHeader>
                    <CardTitle className="text-white">
                      Ready to Save Lives?
                    </CardTitle>
                    <CardDescription className="text-red-100">
                      Your blood donation can make a difference today.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link to="/donationevents" className="w-full">
                      <Button className="w-full bg-white text-red-600 hover:bg-red-100">
                        Schedule Donation
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                {/* Categories */}
                <div>
                  <h3 className="text-lg font-bold mb-4">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <Link
                        key={category._id}
                        to={`/blogs?category=${category.slug}`}
                        className="flex items-center justify-between p-2 rounded-md hover:bg-muted"
                      >
                        <span>{category.name}</span>
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* More Articles Section */}
      {/* <section className="py-12 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-center">
            More Articles You Might Like
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost) => (
              <Card key={relatedPost.id}>
                <div className="relative h-40 w-full">
                  <img
                    src={relatedPost.image || "/placeholder.svg"}
                    alt={relatedPost.title}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-red-600 hover:bg-red-700">
                      {relatedPost.categoryName}
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">
                    <Link
                      to={`/blog/${relatedPost.id}`}
                      className="hover:text-red-600 transition-colors"
                    >
                      {relatedPost.title}
                    </Link>
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {relatedPost.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-between text-xs text-muted-foreground">
                  <div className="flex items-center">
                    <User className="h-3 w-3 mr-1" />
                    {relatedPost.author}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {relatedPost.readTime}
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="outline" asChild>
              <Link to="/blog">
                View All Articles
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="py-12 bg-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <Heart className="h-12 w-12 mx-auto mb-4 text-white" />
            <h2 className="text-3xl font-bold mb-4">
              Inspired by What You Read?
            </h2>
            <p className="text-lg mb-6 text-red-100">
              Your blood donation can make a real difference in someone's life,
              just like in the stories you've read. Schedule an appointment
              today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/donationevents" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="bg-white text-red-600 hover:bg-red-100"
                >
                  Find a Blood Drive
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
