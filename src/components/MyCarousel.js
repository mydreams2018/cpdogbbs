import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Carousel.css";
import { Pagination, Navigation,Autoplay } from "swiper";

function MyCarousel(props){
    return (
            <div className={"my-carousel"}>
                <Swiper
                    pagination={{
                        type: "fraction",
                    }}
                    navigation={true}
                    modules={[Pagination, Navigation,Autoplay]}
                    className="mySwiper"
                    autoplay={true}>
                    {
                        props.imgs.map((item)=>{
                          return <SwiperSlide key={item}>
                                     <img title={"ddd"} onClick={()=>console.log("click")} src={item} />
                                </SwiperSlide>
                        })
                    }

                </Swiper>
            </div>
    );
}

export default MyCarousel;