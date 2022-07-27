import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Omar Gamal',
    email: 'omar@examble.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Mohamed Ahmed',
    email: 'mohamed@examble.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Khaled Amr',
    email: 'khaled@examble.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

export default users;
