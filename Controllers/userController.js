const userService = require('../services/userservice');
const { userResponseDto } = require('../dtos/userDtos');
const { validateUser } = require('../validate/validator');
const { validateUserUpdate } = require('../validate/validator_update.js')

const getUsers = async (req, res) => {
    const users = await userService.getUsers();
    res.json(users.map(userResponseDto));
};

const getUserById = async (req, res) => {
    const user = await userService.getUserById(req.params.userId);
    res.json(userResponseDto(user));
};

const createUser = async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    const user = await userService.createUser(req.body);
    res.json(userResponseDto(user));
};

const updateUser = async (req, res) => {
    const { error } = validateUserUpdate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    const user = await userService.updateUser(req.params.userId, req.body);
    res.json(userResponseDto(user));
};

const deleteUser = async (req, res) => {
    await userService.deleteUser(req.params.userId);
    res.status(204).send();
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};
