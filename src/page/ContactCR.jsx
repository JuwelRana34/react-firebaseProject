import bushra from "../assets/images/bushra.jpg"
import jakir from "../assets/images/jakir.jpg"
import Raju from "../assets/images/Raju.jpg"
import facebook from "../assets/images/facebook.png"
import messenger from "../assets/images/messenger.png"
import whatsapp from "../assets/images/whatsapp.png"
function ContactCR() {
  return (
    <main className="max-w-6xl mx-auto pt-10 pb-36 px-8">
      <div className="max-w-md mx-auto mb-14 text-center">
        <h1 className="text-4xl font-semibold mb-6 lg:text-5xl">
          <span className="text-indigo-600">Contact with</span> CR
        </h1>
        <p className="text-xl text-gray-500 font-medium">
          You have any problem just contact with our CR
        </p>
      </div>

      <div className="flex flex-col justify-between items-center lg:flex-row lg:items-start">
        
        {/* Jakir Hossine Card */}
        <div className="w-full flex-1 mt-8 p-8 order-2 bg-white shadow-xl rounded-xl md:rounded-3xl sm:w-96 lg:w-full lg:order-1 lg:rounded-r-none">
          <div className="mb-7 pb-7 flex items-center border-b border-gray-300">
            <img src={jakir} alt="Jakir Hossine" className="rounded-full w-20 h-20" />
            <div className="ml-5">
              <span className="block text-2xl font-semibold">Jakir Hossine</span>
              <span className="text-gray-500 font-medium">Male CR</span>
            </div>
          </div>
          <ul className="mb-7 font-medium text-gray-500">
            <li className="flex text-lg mb-2">
              <img className="h-8 w-8" src={facebook }alt="Facebook" />
              <a href="https://www.facebook.com/profile.php?id=100077713316568&mibextid=ZbWKwL" className="ml-3">
                Contact me
              </a>
            </li>
            <li className="flex text-lg mb-2">
              <img className="h-8 w-8" src={whatsapp} alt="WhatsApp" />
              <span className="ml-3">+8801765724729</span>
            </li>
          </ul>
          <a href="https://m.me/j/AbZ0Bl2T1CxyHzAc/" className="flex justify-center items-center bg-indigo-600 rounded-md md:rounded-xl py-2 md:py-6 px-4 text-center text-white md:text-2xl">
            Department Group
            <img src={messenger} alt="Arrow Right" className="ml-2 h-8 w-8" />
          </a>
        </div>
        
        {/* Raju Islam Card */}
        <div className="w-full flex-1 p-8 order-1 shadow-xl rounded-xl md:rounded-3xl bg-gray-900 text-gray-400 sm:w-96 lg:w-full lg:order-2 lg:mt-0">
          <div className="mb-8 pb-8 flex items-center border-b border-gray-600">
            <img src={Raju} alt="Raju Islam" className="rounded-full w-20 h-20" />
            <div className="ml-5">
              <span className="block text-3xl font-semibold text-white">Raju Islam</span>
              <span className="font-medium">Treasurer of IHC 18th</span>
            </div>
          </div>
          <ul className="mb-10 font-medium text-xl">
            <li className="flex mb-6">
              <img className="h-8 w-8" src={facebook} alt="Facebook" />
              <a href="https://www.facebook.com/profile.php?id=100029956242064&mibextid=ZbWKwL" className="ml-3 text-white">
                Contact Me
              </a>
            </li>
            <li className="flex mb-6">
              <img className="h-8 w-8" src={whatsapp} alt="WhatsApp" />
              <span className="ml-3 text-white">+8801773684846</span>
            </li>
          </ul>
          <a href="#/" className="flex justify-center items-center bg-indigo-600 rounded-md md:rounded-xl py-2 md:py-6 px-4 text-center text-white md:text-2xl">
            Department Group
            <img src={messenger} alt="Arrow Right" className="ml-2 h-8 w-8" />
          </a>
        </div>
        
        {/* Bushra Momtaj Card */}
        <div className="w-full flex-1 mt-8 p-8 order-3 bg-white shadow-xl rounded-xl md:rounded-3xl sm:w-96 lg:w-full lg:order-3 lg:rounded-l-none">
          <div className="mb-7 pb-7 flex items-center border-b border-gray-300">
            <img src={bushra} alt="Bushra Momtaj" className="rounded-full w-20 h-20" />
            <div className="ml-5">
              <span className="block text-2xl font-semibold">Bushra Momtaj</span>
              <span className="text-gray-500 font-medium">Female CR</span>
            </div>
          </div>
          <ul className="mb-7 font-medium text-gray-500">
            <li className="flex text-lg mb-2">
              <img className="h-8 w-8" src={facebook} alt="Facebook" />
              <a href="https://www.facebook.com/nilufa.yasmin.14661?mibextid=ZbWKwL" className="ml-3">
                Contact me
              </a>
            </li>
            <li className="flex text-lg mb-2">
              <img className="h-8 w-8" src={whatsapp} alt="WhatsApp" />
              <span className="ml-3">+8801723390736</span>
            </li>
          </ul>
          <a href="https://m.me/j/AbZ6C5I0VVK8diqS/" className="flex justify-center items-center bg-indigo-600 rounded-md md:rounded-xl py-2 md:py-6 px-4 text-center text-white md:text-2xl">
            Department Group
            <img src={messenger} alt="Arrow Right" className="ml-2 h-8 w-8" />
          </a>
        </div>
      </div>
    </main>
  );
}

export default ContactCR;
