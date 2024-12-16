/* eslint-disable react/no-unescaped-entities */
"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import ReactStarRatings from "react-star-ratings";
import { Autoplay, Pagination } from "swiper/modules";


const CustomerReviews = () => {
  // Static reviews data (replace with dynamic data when available)
  const reviews = [
    {
      id: 1,
      name: "John Doe",
      profileImage: "https://randomuser.me/api/portraits/men/1.jpg",
      rating: 4.5,
      comment: "Amazing shop! Excellent products and fast delivery.",
    },
    {
      id: 2,
      name: "Jane Smith",
      profileImage: "https://randomuser.me/api/portraits/women/1.jpg",
      rating: 5,
      comment: "Highly recommended! Great customer service.",
    },
    {
      id: 3,
      name: "Alex Johnson",
      profileImage: "https://randomuser.me/api/portraits/men/2.jpg",
      rating: 4,
      comment: "Good quality products at reasonable prices.",
    },
    {
      id: 4,
      name: "Emily Davis",
      profileImage: "https://randomuser.me/api/portraits/women/2.jpg",
      rating: 4.8,
      comment: "Loved the fresh items! Will definitely shop here again.",
    },
    {
      id: 5,
      name: "Michael Brown",
      profileImage: "https://randomuser.me/api/portraits/men/3.jpg",
      rating: 5,
      comment: "Fantastic selection and great prices. Highly satisfied!",
    },
    {
      id: 6,
      name: "Sarah Wilson",
      profileImage: "https://randomuser.me/api/portraits/women/3.jpg",
      rating: 4.3,
      comment: "Good experience overall, but delivery was a bit delayed.",
    },
    {
      id: 7,
      name: "Daniel Garcia",
      profileImage: "https://randomuser.me/api/portraits/men/4.jpg",
      rating: 4.7,
      comment: "Exceptional quality and customer service. Five stars!",
    },
    {
      id: 8,
      name: "Sophia Martinez",
      profileImage: "https://randomuser.me/api/portraits/women/4.jpg",
      rating: 5,
      comment: "Absolutely love the variety and freshness of the products.",
    },
    {
      id: 9,
      name: "Chris Lee",
      profileImage: "https://randomuser.me/api/portraits/men/5.jpg",
      rating: 4,
      comment: "Great shop, but some items were out of stock.",
    },
    {
      id: 10,
      name: "Olivia Taylor",
      profileImage: "https://randomuser.me/api/portraits/women/5.jpg",
      rating: 4.9,
      comment: "Top-notch! The products exceeded my expectations.",
    },
    {
      id: 11,
      name: "David Hernandez",
      profileImage: "https://randomuser.me/api/portraits/men/6.jpg",
      rating: 5,
      comment: "Fast service, excellent products. Couldn't be happier!",
    },
    {
      id: 12,
      name: "Laura Anderson",
      profileImage: "https://randomuser.me/api/portraits/women/6.jpg",
      rating: 4.6,
      comment: "Great shop with competitive prices. Will come back soon.",
    },
  ];
  

  return (
    <section className="container mx-auto mt-12 p-4">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Customer <span className="text-green-500">Reviews</span>
      </h2>
     
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={true}
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          loop={true}
          className="category-swiper mx-auto"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id}>
              <div className="flex flex-col bg-white p-6 items-center text-center">
                {/* Profile Image */}
                <div className="w-16 h-16 rounded-full overflow-hidden mb-4">
                  <img
                    src={review.profileImage}
                    alt={review.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                {/* Name */}
                <h3 className="text-xl font-semibold text-gray-800">
                  {review.name}
                </h3>
                {/* Rating */}
                <div className="flex items-center justify-center my-2">
                  <ReactStarRatings
                    rating={review.rating}
                    starRatedColor="gold"
                    numberOfStars={5}
                    starDimension="20px"
                    starSpacing="2px"
                    name={`rating-${review.id}`}
                  />
                  <span className="text-sm font-medium text-gray-600 ml-2">
                    ({review.rating})
                  </span>
                </div>
                {/* Comment */}
                <p className="text-gray-600 text-sm italic max-w-xs">
                  "{review.comment}"
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      
    </section>
  );
};

export default CustomerReviews;
