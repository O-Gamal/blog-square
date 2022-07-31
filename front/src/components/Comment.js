const Comment = ({ userName, date, children, author }) => {
  return (
    <div className={`comment ${author ? 'author-comment' : ''}`}>
      <div className='meta'>
        <h5>{userName}</h5>
        <span>{date}</span>
      </div>
      <div className='text'>
        <p>{children}</p>
      </div>
    </div>
  );
};

export default Comment;
