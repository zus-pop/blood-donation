"use client";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  ChevronRight,
  Clock,
  Droplets,
  Facebook,
  Heart,
  Linkedin,
  Share2,
  Twitter,
  User,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router";
import { getBlog } from "../../../apis/blog.api";
import { formatDate } from "../../../lib/utils";

// Sample related posts
const relatedPosts = [
  {
    id: "3",
    title: "The Surprising Health Benefits of Regular Blood Donation",
    excerpt:
      "Did you know that donating blood regularly can have positive effects on your own health? Discover the unexpected benefits.",
    category: "health-benefits",
    categoryName: "Health Benefits",
    author: "Dr. Michael Chen",
    date: "June 5, 2025",
    readTime: "4 min read",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "5",
    title: "Preparing for Your First Blood Donation: A Complete Guide",
    excerpt:
      "Nervous about donating blood for the first time? This comprehensive guide will walk you through everything you need to know.",
    category: "donation-tips",
    categoryName: "Donation Tips",
    author: "James Wilson",
    date: "May 30, 2025",
    readTime: "8 min read",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "7",
    title: "Foods to Boost Iron Levels Before and After Donation",
    excerpt:
      "Learn about the best foods to eat before and after donating blood to maintain healthy iron levels and recover quickly.",
    category: "nutrition",
    categoryName: "Nutrition & Wellness",
    author: "Nutritionist Robert Kim",
    date: "May 25, 2025",
    readTime: "5 min read",
    image: "/placeholder.svg?height=200&width=400",
  },
];

export default function BlogDetail() {
  const { id } = useParams();

  const { data: blog, isLoading } = useQuery({
    queryKey: ["blog", id],
    queryFn: () => getBlog(id!),
    staleTime: 1000 * 60,
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
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Linkedin className="h-4 w-4" />
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
                    <Button className="w-full bg-white text-red-600 hover:bg-red-100">
                      Schedule Donation
                    </Button>
                  </CardContent>
                </Card>

                {/* Categories */}
                <div>
                  <h3 className="text-lg font-bold mb-4">Categories</h3>
                  <div className="space-y-2">
                    <Link
                      to="/blogs?category=donation-tips"
                      className="flex items-center justify-between p-2 rounded-md hover:bg-muted"
                    >
                      <span>Donation Tips</span>
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                    <Link
                      to="/blog?category=patient-stories"
                      className="flex items-center justify-between p-2 rounded-md hover:bg-muted"
                    >
                      <span>Patient Stories</span>
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                    <Link
                      to="/blog?category=health-benefits"
                      className="flex items-center justify-between p-2 rounded-md hover:bg-muted"
                    >
                      <span>Health Benefits</span>
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                    <Link
                      to="/blog?category=research"
                      className="flex items-center justify-between p-2 rounded-md hover:bg-muted"
                    >
                      <span>Medical Research</span>
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                    <Link
                      to="/blog?category=events"
                      className="flex items-center justify-between p-2 rounded-md hover:bg-muted"
                    >
                      <span>Events & Drives</span>
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* More Articles Section */}
      <section className="py-12 bg-muted/50">
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
      </section>

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
              <Button
                size="lg"
                className="bg-white text-red-600 hover:bg-red-100"
              >
                Schedule Donation
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-red-700"
              >
                Find a Blood Drive
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
