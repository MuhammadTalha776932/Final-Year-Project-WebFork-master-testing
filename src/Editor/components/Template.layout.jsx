import React,{useState} from 'react'
import Navbar from './components/Navbar';
// import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import Hero from './components/Hero';
// import Analytics from './components/Analytics';
import Cards from './components/Cards';

import Single from './assets/single.png'
import Double from './assets/double.png'
import Triple from './assets/triple.png'

const TemplateLayout = () => {
  const [nav, setNav] = useState(false);
    const [textObject, setTextobject] = useState({
    MainLogo: "React.",
    HomeLink: "Home",
    CompanyLink: "Company",
    ResourcesLink: "Resources",
    AboutLink: "About",
    ContactLink:"Contact"
  })

  const [styleObject, setStyleObject] = useState({
    textColor: "#00df9a",
    fontFamily: "serif",
    backgroundColor:"#000300"
  })
  const onChangeHandler = (evt) => {
    evt.preventDefault();
    setTextobject(...textObject, [evt.target.name] = evt.target.value);
  }
  const handleNav = () => {
    setNav(!nav);
  };
  return (
      <>
      <div className={`flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-[${styleObject.textColor}]`} contentEditable onChange={(e=>onChangeHandler(e))}>
      <h1 className='w-full text-3xl font-bold text-[#00df9a]' id='MainLogo'>REACT.</h1>
      <ul className='hidden md:flex'>
        <li className='p-4' id='HomeLink'>Home</li>
        <li className='p-4' id='CompanyLink'>Company</li>
        <li className='p-4' id='ResourcesLink'>Resources</li>
        <li className='p-4' id='AboutLink'>About</li>
        <li className='p-4' id='ContactLink'>Contact</li>
      </ul>
      {/* <div onClick={handleNav} className='block md:hidden'>
          {nav ? <AiOutlineClose size={20}/> : <AiOutlineMenu size={20} />}
      </div> */}
      <ul className={nav ? 'fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500' : 'ease-in-out duration-500 fixed left-[-100%]'}>
        <h1 className='w-full text-3xl font-bold text-[#00df9a] m-4' id='MainLogo'>REACT.</h1>
          <li className='p-4 border-b border-gray-600' id='HomeLink'>Home</li>
          <li className='p-4 border-b border-gray-600' id='CompanyLink'>Company</li>
          <li className='p-4 border-b border-gray-600' id='ResourcesLink'>Resources</li>
          <li className='p-4 border-b border-gray-600' id='AboutLink'>About</li>
          <li className='p-4' id='ContactLink'>Contact</li>
      </ul>
    </div>
         <div className='text-black'>
      <div className='max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center'>
        <p className='text-[#00df9a] font-bold p-2'>
          GROWING WITH DATA ANALYTICS
        </p>
        <h1 className='md:text-7xl sm:text-6xl text-4xl font-bold md:py-6'>
          Grow with data.
        </h1>
        <div className='flex justify-center items-center'>
          <p className='md:text-5xl sm:text-4xl text-xl font-bold py-4'>
            Fast, flexible financing for
          </p>
          {/* <Typed
          className='md:text-5xl sm:text-4xl text-xl font-bold md:pl-4 pl-2'
            strings={['BTB', 'BTC', 'SASS']}
            typeSpeed={120}
            backSpeed={140}
            loop
          /> */}
        </div>
        <p className='md:text-2xl text-xl font-bold text-gray-500'>Monitor your data analytics to increase revenue for BTB, BTC, & SASS platforms.</p>
        <button className='bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black'>Get Started</button>
      </div>
    </div>
    <div className='w-full py-[10rem] px-4 bg-white'>
      <div className='max-w-[1240px] mx-auto grid md:grid-cols-3 gap-8'>
          <div className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
              <img className='w-20 mx-auto mt-[-3rem] bg-white' src={Single} alt="/" />
              <h2 className='text-2xl font-bold text-center py-8'>Single User</h2>
              <p className='text-center text-4xl font-bold'>$149</p>
              <div className='text-center font-medium'>
                  <p className='py-2 border-b mx-8 mt-8'>500 GB Storage</p>
                  <p className='py-2 border-b mx-8'>1 Granted User</p>
                  <p className='py-2 border-b mx-8'>Send up to 2 GB</p>
              </div>
              <button className='bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3'>Start Trial</button>
          </div>
          <div className='w-full shadow-xl bg-gray-100 flex flex-col p-4 md:my-0 my-8 rounded-lg hover:scale-105 duration-300'>
              <img className='w-20 mx-auto mt-[-3rem] bg-transparent' src={Double} alt="/" />
              <h2 className='text-2xl font-bold text-center py-8'>Single User</h2>
              <p className='text-center text-4xl font-bold'>$149</p>
              <div className='text-center font-medium'>
                  <p className='py-2 border-b mx-8 mt-8'>500 GB Storage</p>
                  <p className='py-2 border-b mx-8'>1 Granted User</p>
                  <p className='py-2 border-b mx-8'>Send up to 2 GB</p>
              </div>
              <button className='bg-black text-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3'>Start Trial</button>
          </div>
          <div className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
              <img className='w-20 mx-auto mt-[-3rem] bg-white' src={Triple} alt="/" />
              <h2 className='text-2xl font-bold text-center py-8'>Single User</h2>
              <p className='text-center text-4xl font-bold'>$149</p>
              <div className='text-center font-medium'>
                  <p className='py-2 border-b mx-8 mt-8'>500 GB Storage</p>
                  <p className='py-2 border-b mx-8'>1 Granted User</p>
                  <p className='py-2 border-b mx-8'>Send up to 2 GB</p>
              </div>
              <button className='bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3'>Start Trial</button>
          </div>
      </div>
    </div>
            <div className='max-w-[1240px] mx-auto py-16 px-4 grid lg:grid-cols-3 gap-8 text-gray-700'>
      <p className="text-center">Copyright 2022, All Right Reserve</p></div>
      </>
  )
}

export default TemplateLayout