import { assets } from "../assets/assets";
import NewsLetterBox from "../Components/NewsLetterBox";
import Title from "../Components/Title";

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img className="w-full md:max-w-[480px]" src={assets.contact_img} alt="Contact Us Image" />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-xl text-gray-600">Our Store</p>
          <p className="text-gray-500">54709 Williams Station <br /> Suite 350, Washington, USA</p>
          <p className="text-gray-500">Tel: (415) 555-0132 <br />Email: admin@Vmart.com</p>
          <p className="font-semibold text-xl text-gray-600">Careers at Vmart</p>
          <p className="text-gray-500">Learn more about our teams & job openings</p>
          <button 
            className="bg-black text-white px-8 py-3 mt-3 sm:mt-0 rounded-lg hover:bg-gray-800 transition-all duration-300"
            aria-label="Explore Jobs Button"
          >
            Explore jobs
          </button>
        </div>
      </div>
      
      <NewsLetterBox />
    </div>
  );
};

export default Contact;
