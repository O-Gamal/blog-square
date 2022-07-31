import jwt from 'jsonwebtoken';

const genToken = (_id) => {
  const accessToken = jwt.sign({ _id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '30d',
  });
  return accessToken;
};

export default genToken;
