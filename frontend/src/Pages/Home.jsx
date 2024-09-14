import BestSeller from "../Components/BestSeller"
import Hero from "../Components/Hero"
import LatestCollection from "../Components/LatestCollection"
import NewsLetterBox from "../Components/NewsLetterBox"
import Policy from "../Components/Policy"

const Home = () => {
  return (
    <div>
      <Hero />
      <LatestCollection />
      <BestSeller/>
      <Policy/>
      <NewsLetterBox/>
    </div>
  )
}

export default Home
