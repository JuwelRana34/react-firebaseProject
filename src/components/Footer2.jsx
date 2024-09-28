import logo from '../assets/images/logo.png'
import InstallPWAButton from './InstallPWAButton ';

function Footer2() {
  return (
    
      <footer className='w-full  bg-slate-100'>
        <div className=' w-full shadow-xl   mx-auto'>
          <div className=' flex-col justify-center items-center text-center '>
            <img src={logo} className='h-12 w-12 m-2 mx-auto' alt="" />
            <h1 className='m-2 text-xl font-semibold text-orange-600 '>Jagannath University Department of IHC
            </h1> <br />
            <h1>install app  </h1><InstallPWAButton/>
          </div>
          
          <hr />
          <span className='text-center inline-block w-full py-3 text-white text-lg bg-green-radial '> © 2022 - {new Date().getFullYear()} IHC 18th Batch <br />
          {/* <Link to='/RulesAndRegulations' className=' underline text-blue-700'>Rules and regulations</Link> */}
          </span>
        </div>
      </footer>
    
  )
}

export default Footer2