import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

interface Props {
  mainImage: string;
  images: string[];
  title: string;
}

const ImageCarousel: React.FC<Props> = ({ mainImage, images, title }) => {
  const allImages = [mainImage, ...(images || [])].filter(Boolean);

  return (
    <div className="relative w-full h-96 rounded-xl shadow-md">
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        loop
        className="w-full h-full rounded-xl"
      >
        {allImages.length > 0 ? (
          allImages.map((img, idx) => (
            <SwiperSlide key={idx}>
              <img
                src={img}
                alt={`${title} - Slide ${idx + 1}`}
                className="w-full h-full object-cover rounded-xl"
              />
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <img
              src="https://via.placeholder.com/600x400?text=No+Image"
              alt="No Image"
              className="w-full h-full object-cover rounded-xl"
            />
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  );
};

export default ImageCarousel;
