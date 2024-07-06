import groupPhoto from '../assets/images/grouppic1.jpg'
function Home() {
  
  return (
    <div>
      
      <section className="px-3 py-5 bg-neutral-100 lg:py-10 overflow-hidden">
  <div className="grid lg:grid-cols-2 items-center justify-items-center gap-5">
    <div className="order-2 lg:order-1 flex flex-col justify-center text-justify items-center" data-aos="fade-up" >
      <p className="text-3xl font-bold md:text-2xl text-center text-blue-600 ">Jagannath University IT Society (JnUITS) </p>
      <p className="mt-2 text-sm md:text-lg"> <span className="italic text-orange-600" >" step ahead with IT " </span> keeping this in mind,Jagannath University IT 
        society (jnuits) launched its operation from....xx under the professor and Chairman, 
       <span className="text-blue-600"> Dr Uzzal kumar Acharjee.president, Redwan Ahmed,general secretory, Rashed Rony,
        is in charge of this IT Society. </span> A large number of general member,executive and 
        subexecutive are engaged in this group and cared for as member of IT family.
        IT society was born with a new concept of networking upcoming world and
         producing a generation educated in science and technology  with 
         the highest emphasis on ict for fulfilling the vision 2041.
         This community comitted to empowering growth,  diversity,sustainability
         , social impact and work life  balace within the IT community at Jagannath University.
          For this,the organizers along with members have worked to offer skill development
           trainning like basic computer course,web development bootcap etc, networking
            opportunities,soft skill enhancement instruction,cybersecurity Awareness programme ,
             IT Career programme, National IT fest 2024,IT quiz bowl etc for 
             the students to enhance their Career during the information era of 21st century.
             Jnu IT society believes in collabroative learning as well as it is eager to do much
              more in this fast changing time by healping students fulfill their hopes and realize their ambition.</p>

    </div>
    <div className="order-1 lg:order-2" data-aos="fade-left">
      <img className="h-80 w-80 object-cover lg:w-[500px] lg:h-[500px]" src={groupPhoto} alt=""/>
    </div>
  </div>
</section>
    </div>
  )
}

export default Home