import express from "express";
import { createUser, deleteUser, getAllUsers, getUser, updateUser, loginAdmin, loginUser, logoutUser, checkAuth } from "../controllers/userController.js"
import { verifySessionToken } from "../middleweares/authenticationCheck.js";

const router = express.Router()

router.post('/create-user', createUser);
router.get('/get-all-users', getAllUsers);
router.get('/get-user/:email', getUser);
router.delete('/delete-user/:id', deleteUser)
router.put('/update-user/:id', updateUser)

router.post('/login-admin', loginAdmin)
router.post('/login-user', loginUser)
router.post('/logout', logoutUser)
router.post('/check-auth', checkAuth)


export default router;