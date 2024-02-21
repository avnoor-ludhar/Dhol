import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { RiCloseLine } from 'react-icons/ri';
import { HiOutlineMenu } from 'react-icons/hi';

import { logo } from '../assets';
//contains name of link in navbar, and the icon and the
//link href
import { links } from '../assets/constants';

//navbar
//we have a key for react components since they need some
//way to be uniquely selected
//to is where the link goes to
//onClick checks if it exists then fires it with the &&
//Note we can pass down components as well in an object 

const NavLinks = ({ handleClick }) => (
  <div className='mt-10'>
    {links.map((item) =>{
      return (<NavLink 
      key={item.name}
      to={item.to}
      className="flex flex-row justify-start items-center
      my-8 text-sm font-medium text-gray-400 hover:text-cyan-400"
      onClick={() => handleClick && handleClick()}>
        <item.icon className="w-6 h-6 mr-2" />
        {item.name}
      </NavLink>)
    })}
  </div>
)

const Sidebar = () => {
  //state for if we are in mobile mode
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  //first is the menu on desktop
  //second is the icon in the top right corner and third
  //is the menu when opened by the icon
  return (
    <>
      <div className="md:flex hidden flex-col w-[240px] 
      py-10 px-4 bg-[#191624] ">
        <img src={logo} alt="logo" className="w-full h-14
        object-contain"/>
        <NavLinks />
      </div>
      <div className="absolute md:hidden block top-6 right-3">
        {mobileMenuOpen ? (
          <RiCloseLine className="w-6 h-6 text-white mr-2" onClick={() => setMobileMenuOpen(false)}/>
        ) : <HiOutlineMenu className="w-6 h-6 text-white mr-2" onClick={() => setMobileMenuOpen(true)}/>}
      </div>

      <div className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl
       from-white/10 to-[#483d8b] backdrop-blur-lg
       z-10 p-6 md:hidden smooth-transition ${mobileMenuOpen ? 'left-0' :
        '-left-full'}`}>
        <img src={logo} alt="logo" className="w-full h-14
        object-contain"/>
        <NavLinks handleClick={() => setMobileMenuOpen(false)}/>
      </div>
    </>
  )
};

export default Sidebar;

//empty fragment <></> used to add multiple items to DOM
//without adding an extra node of a div. used since react components
//must return single div.  
//<React.Fragment></React.Fragment> also syntax for this

/* tailwind classes

bg-[] gives custom colour to be added

h-screen sets height to 100 vh

absolute positiioning because we want it in terms of the 
page on the left component

w-2/3 width 2/3 of the screen

bg-gradient-to-tl
from-white/10 
to-[#483d8b]
sets a gradient background from the first colour to the second

z-10: z-index to 10

backdrop-blur-lg: assume blurs background

-left-full: sets left to -100%
left-0: sets left to 0 

smooth-transition: small entrance animation 
*/