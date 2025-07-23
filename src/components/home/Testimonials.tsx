import React from 'react';
import { Star } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const testimonials = [
  {
    id: 1,
    name: 'Priya Mehta',
    location: 'Mumbai, India',
    avatar:
      'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 5,
    text: 'TripCompare made planning our Thailand group trip super easy. We could compare activities, hotels, and prices across different tour operators in minutes. Saved us money and so much hassle!',
  },
  {
    id: 2,
    name: 'Rohan Kapoor',
    location: 'Delhi, India',
    avatar:
      'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 5,
    text: 'I used TripCompare to find a last-minute Ladakh package. The comparisons were super detailed — I knew exactly what I was paying for. Got the best deal without needing to call 5 agents!',
  },
  {
    id: 3,
    name: 'Ayesha Sheikh',
    location: 'Bangalore, India',
    avatar:
      'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4,
    text: 'For our Bali honeymoon, TripCompare helped us shortlist the best packages within our budget. It felt like having a personal travel advisor — without paying extra commissions!',
  },
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-16 bg-primary-50">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">What Our Travelers Say</h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Don’t just take our word for it — hear from travelers who found their perfect vacation through TripCompare.
          </p>
        </div>

        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 5000 }}
          pagination={{ clickable: true }}
          loop
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="bg-white rounded-xl p-6 h-full shadow-lg flex flex-col justify-between">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </div>

                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < testimonial.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>

                <p className="text-gray-700 text-sm leading-relaxed">"{testimonial.text}"</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
