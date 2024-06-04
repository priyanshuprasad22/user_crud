const userDao = require('../dao/userDao');

const createUser = async (userData) => {
    return await userDao.createUser(userData);
};

const getUsers = async () => {
    return await userDao.getUsers();
};

const getUserById = async (userId) => {
    return await userDao.getUserById(userId);
};

const updateUser = async (userId, userData) => {
    return await userDao.updateUser(userId, userData);
};

const deleteUser = async (userId) => {
    return await userDao.deleteUser(userId);
};

module.exports = {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
};
