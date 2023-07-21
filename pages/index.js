import Header from "@/components/Header";
import SwiperPage from "./Swiper";
import Projects from "./Projects";
import OGProjects from "./Projects";

export default function HomePage() {

   
  return (
    <div>
     <Header title = "events"/>
     <SwiperPage/>
     <OGProjects/>
    </div>
  );
}
