import Input from '../utils/Input';

const SearchCard = ({ btnStyle, className, text }) => {
  return (
    <div className='search-card-container'>
      <h3>What are we reading today?</h3>
      <Input
        placeholder='Search something here'
        className='rounded search-input'
      />
    </div>
  );
};

export default SearchCard;
