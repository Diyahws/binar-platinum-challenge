'use strict';
const bcrypt = require('bcrypt')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const encryptedPasswordSuperAdmin = bcrypt.hashSync('superadmin123', 10)
    const encryptedPasswordAdmin = bcrypt.hashSync('admin123', 10)
    const encryptedPasswordUser = bcrypt.hashSync('user123', 10)
    return queryInterface.bulkInsert('Users', [
      {
        name: 'dava',
        email: 'erandadava@gmail.com',
        password:encryptedPasswordSuperAdmin,
        roles:'superadmin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'rama',
        email: 'amanullahr545@gmail.com',
        password:encryptedPasswordAdmin,
        roles:'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'diyah',
        email: 'diyahwulans@gmail.com',
        password:encryptedPasswordUser,
        roles:'user',
        createdAt: new Date(),
        updatedAt: new Date()
      },
  ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
