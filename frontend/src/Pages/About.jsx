import { assets } from "../assets/assets";
import NewsLetterBox from "../Components/NewsLetterBox";
import Title from "../Components/Title";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img className="w-full h-auto md:max-w-[450px] object-cover md:h-[300px] lg:h-[350px]" src={assets.about_img2} alt="About Us Image" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Forever was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can explore and purchase a wide range of products from the comfort of their home.
          </p>
          <p>
            Since our inception, we've worked tirelessly to curate a diverse selection of high-quality products that cater to every taste and preference.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Our mission at Forever is to empower customers with choice, convenience, and comfort. We are dedicated to providing a seamless shopping experience that exceeds expectations, from browsing to ordering, delivering, and beyond.
          </p>
        </div>
      </div>

      <div className="text-2xl text-center border-t pt-8 py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>

      {/* WHY CHOOSE US Section */}
      <div className="flex flex-col md:flex-row text-sm mb-20 gap-6">
        <div className="border shadow-lg hover:shadow-2xl rounded-lg px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 bg-white transition duration-300">
          <b className="text-lg">Quality Assurance</b>
          <p className="text-gray-600">We meticulously select each product to ensure it meets our stringent quality standards.</p>
        </div>

        <div className="border shadow-lg hover:shadow-2xl rounded-lg px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 bg-white transition duration-300">
          <b className="text-lg">Convenience</b>
          <p className="text-gray-600">With our user-friendly interface and hassle-free ordering process, shopping has never been easier.</p>
        </div>

        <div className="border shadow-lg hover:shadow-2xl rounded-lg px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 bg-white transition duration-300">
          <b className="text-lg">Exceptional Customer Service</b>
          <p className="text-gray-600">Our team of dedicated professionals is here to assist you every step of the way, ensuring your satisfaction is our top priority.</p>
        </div>
      </div>

      <div>
        <NewsLetterBox />
      </div>
    </div>
  );
};

export default About;