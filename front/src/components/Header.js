import { useState } from 'react';

const Header = () => {
  const titles = ['Register', 'Write', 'Publish', 'Enjoy'];

  const [selected, seSelected] = useState('');

  const handleSelect = (e) => {
    seSelected(e.target.id);
  };

  return (
    <header className='container grid header-content'>
      <div className='content-text'>
        {titles.map((title) => (
          <h1
            key={title}
            id={title}
            className={selected === title ? 'elem selected' : 'elem'}
            onClick={handleSelect}
          >
            {title}
          </h1>
        ))}
      </div>
      <div></div>
    </header>
  );
};

export default Header;
