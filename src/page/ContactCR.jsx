import { useState } from "react";
import { MdPersonSearch } from "react-icons/md";
import facebook from "../assets/images/facebook.png";
import messenger from "../assets/images/messenger.png";
import mubina from "../assets/images/profile.png";
import Raju from "../assets/images/Raju.jpg";
import Rayhan from "../assets/images/rayhan.jpg";
import whatsapp from "../assets/images/whatsapp.png";
import NumberList from "../Data/Phonenumber";
function ContactCR() {
  const [filteredNumbers, setFilteredNumbers] = useState(NumberList);
  const contactCRList = [
    {
      name: "Abu Rayhan",
      image: Rayhan,
      position: "male CR",
      facebook: "https://www.facebook.com/shaku.rayhan",
      whatsapp: "01719015997",
    },
    {
      name: "Raju Islam",
      image: Raju,
      position: "Treasurer of IHC 18th",
      facebook:
        "https://www.facebook.com/profile.php?id=100029956242064&mibextid=ZbWKwL",
      whatsapp: "8801773684846",
    },
    {
      name: "Mubina akter",
      image: mubina,
      position: "female CR",
      facebook: "https://www.facebook.com/mubina.akter.726233",
      whatsapp: "+8801791-975207",
    },
  ];
  const handelSearch = (name) => {
    const filteredNumbers = NumberList.filter((n) =>
      n.name.toLowerCase().includes(name.toLowerCase())
    );
    setFilteredNumbers(filteredNumbers);
  };

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
        {contactCRList.map((cr) => (
          <div
            key={crypto.randomUUID()}
            className={`w-full flex-1 shadow-lg rounded-lg mt-8 p-8 order-3 ${
              cr.name === "Raju Islam"
                ? "bg-gray-900 text-gray-400"
                : "bg-white"
            }shadow-xl rounded-xl md:rounded-3xl sm:w-96 lg:w-full lg:order-3 `}
          >
            <div className="mb-7 pb-7 flex items-center border-b border-gray-300">
              <img
                src={cr.image}
                alt="Mubina akter"
                className="rounded-full w-20 h-20"
              />
              <div className="ml-5">
                <span
                  className={` ${
                    cr.name === "Raju Islam" && "text-gray-200"
                  } block capitalize  text-2xl font-semibold`}
                >
                  {cr.name}
                </span>
                <span className="text-gray-500 font-medium capitalize ">
                  {cr.position}
                </span>
              </div>
            </div>
            <ul className="mb-7 font-medium text-gray-500">
              <li className="flex text-lg mb-2">
                <img className="h-8 w-8" src={facebook} alt="Facebook" />
                <a href={cr.facebook} className="ml-3">
                  Contact me
                </a>
              </li>
              <li className="flex text-lg mb-2">
                <img className="h-8 w-8" src={whatsapp} alt="WhatsApp" />
                <span className="ml-3">{cr.whatsapp}</span>
              </li>
            </ul>
            <a
              href="https://m.me/j/AbZ6C5I0VVK8diqS/"
              className="flex justify-center items-center bg-indigo-600 rounded-md md:rounded-xl py-2 md:py-6 px-4 text-center text-white md:text-2xl"
            >
              Department Group
              <img src={messenger} alt="Arrow Right" className="ml-2 h-8 w-8" />
            </a>
          </div>
        ))}
      </div>

      <div>
        <h1 className="text-4xl font-semibold mb-6 lg:text-5xl text-center mt-10">
          <span className="text-indigo-600">Contact with</span> students
        </h1>
        <p className="text-xl text-gray-500 font-medium text-center">
          You need to contact with your friends. You can contact with them.
        </p>
        <div className="relative w-1/2 mx-auto mt-10">
          <input
            className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded focus:outline-none"
            onChange={(e) => handelSearch(e.target.value)}
            type="text"
            placeholder="Type name..."
          />
          <MdPersonSearch
            size={24}
            className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
          />
         
        </div>
          <p className="text-gray-500 capitalize text-center my-4">Note: tap on the number and redirect to mobile app</p>

        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4 mt-10">
          {filteredNumbers.map((number, index) => (
            <div
              key={crypto.randomUUID()}
              className={`flex justify-between items-center  shadow-lg rounded-lg mt-8 p-8 w-full max-w-md mx-auto ${
                index % 2 === 1 ? "bg-blue-50" : "bg-lime-50"
              }`}
            >
              <div>
                <h2 className="text-xl font-semibold">{number.name}</h2>
                <a href={`tel:${number.mobile}`} className="text-blue-500 ">
                  Call: {number.mobile}
                </a>
                <p className="text-rose-500">Blood: {number.bloodGroup}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default ContactCR;
