import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import{ FiSearch} from 'react-icons/fi';

const Searchbar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${searchTerm}`)
  }

  return (
  <form onSubmit={handleSubmit} autoComplete="off" className="p-2 text-gray-400
  focus-within:text-gray-600">
    <label htmlFor="search-field" className="sr-only">
      Search all songs
    </label>
    <div className="flex flex-row justify-start items-center">
      <FiSearch className="w-5 h-5 ml-4"/>
      <input 
        name="search-field" 
        autoComplete="off"
        id="search-field"
        placeholder="Search"
        type="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="flex-1 bg-transparent border-none
        outline-none placeholder-gray-500 text-base text-white p-4"
      />
    </div>
  </form>
)};

export default Searchbar;

/*
focus is when the form is active and ready to 
receive input which is why the focus pseudo selector
is used here. usually in 2 forms

keyboard focus: when a user navigates through a web page
using the keyboard 
or a mouse click as well

<label></label> html element is used to associate 
a text label with a form control like <input>,
<select>, or <textarea, or a custom form control.

what is the for attribute in html 
<label for=""></label>
is used to associate the id of the specific form control elemnet 
it will have the same id as the one put into the for attribute.

in this case for react they just changed the naem to avoid conflicts 
with key words to htmlFor


focus-within:text-gray-600 
works when any of the decendants receive focus(clicked etc)
then the text-gray-600 class will be applied to the
element that it is a property of in this case the form.

sr-only 
is to make the element not visual to users but to make it available 
for screen readers when using the website. So the content inside will 
stil be read aloud.

outline-none
just makes the outline of the default search field none when it achieves 
focus

placeholder-gray-500
changes the placeholder text to the colour described

bg-transparent
background colour to transparent
*/