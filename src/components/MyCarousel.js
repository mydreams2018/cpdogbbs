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
                        props.companyData.map((item)=>{
                          return <SwiperSlide key={item}>
                                     <img alt={item.describe} title={item.describe} onClick={()=>window.open(item.linkUrl,item.describe)} src={item.companyImages} />
                                </SwiperSlide>
                        })
                    }

                </Swiper>
            </div>
    );
}

export default MyCarousel;