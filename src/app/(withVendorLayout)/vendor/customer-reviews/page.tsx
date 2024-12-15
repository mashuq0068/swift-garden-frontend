"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SectionHeader from "@/components/Shared/SectionHeader";
import ReactStarRatings from "react-star-ratings";

const CustomerReviews = () => {
  // Mock data for reviews (can be replaced with fetched data)
  const [reviews] = useState([
    {
      id: "1",
      user: { name: "John Doe" },
      product: { name: "Organic Lettuce" },
      rating: 4,
      comment: "Fresh and crunchy!",
    },
    {
      id: "2",
      user: { name: "Jane Smith" },
      product: { name: "Carrot" },
      rating: 5,
      comment: "Excellent quality!",
    },
    // Add more reviews as needed
  ]);

  return (
    <div>
      <SectionHeader title="Customer Reviews" />
      <div className="wrapper">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Comment</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reviews.map((review) => (
              <TableRow key={review.id}>
                <TableCell className="font-medium">
                  {review.user.name}
                </TableCell>
                <TableCell className="font-medium">
                  {review.product.name}
                </TableCell>
                <TableCell>
                  <ReactStarRatings
                    rating={review.rating} // Rating to display
                    starRatedColor="gold" // Color for the filled stars
                    numberOfStars={5} // Total stars
                    starDimension="20px" // Size of each star
                    starSpacing="2px" // Space between stars
                    name="rating" // Unique name for the rating field (optional)
                  />
                </TableCell>
                <TableCell>{review.comment}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CustomerReviews;
