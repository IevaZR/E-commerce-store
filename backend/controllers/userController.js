import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export const createUser = async (req, res) => {
    try {
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(req.body.password.toString(), salt)
        const user = new userModel({ ...req.body, password: hashedPassword });
        const data = await user.save();
        
        res.status(201).json("User created")
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find({})

        res.status(201).send(users);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
};

export const getUser = async (req, res) => {
    try {
        const user = await userModel.find({ email: req.params.email }, {password:0})

        res.status(201).send(user);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
};

export const deleteUser = async (req, res) => {
    try {
        const user = await userModel.deleteOne({ id: req.params.id })

        res.status(201).send("User deleted successfully");
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}

export const updateUser = async (req, res) => {
    try {
        const user = await userModel.findOneAndUpdate({ id: req.params.id }, { $set: req.body, }, { new: true })

        res.status(201).send(user);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}

export const loginAdmin = async (req, res) => {
    try {
        const foundUser = await userModel.findOne({ userName: req.body.userName })
        if (!foundUser) {
            return res.status(404).send('Username or Password is incorrect!')
        }

        const isUserPasswordCorrect = bcrypt.compareSync(req.body.password.toString(), foundUser.password)

        const isUserAdmin = () => {
            if (foundUser.admin === true) {
                return true
            } else {
                return false
            }
        }

        if (!isUserPasswordCorrect || !isUserAdmin()) {
            return res.status(404).send('Username or Password is incorrect!')
        }

        const token = jwt.sign({ id: foundUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" })

        if (isUserPasswordCorrect && isUserAdmin()) {
            console.log('Logged in')
            res.cookie('session_token', token, { httpOnly: true }).status(200).send(`Authorized`)
        }



    } catch (error) {
        console.log(error)
        res.status(400).send(error);
    }
}

export const loginUser = async (req, res) => {
    try {
        const foundUser = await userModel.findOne({ email: req.body.email })
        if (!foundUser) {
            return res.status(404).send('Username or Password is incorrect!')
        }

        const isUserPasswordCorrect = bcrypt.compareSync(req.body.password.toString(), foundUser.password)

        if (!isUserPasswordCorrect) {
            return res.status(404).send('Username or Password is incorrect!')
        }

        const token = jwt.sign({ id: foundUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" })

        if (isUserPasswordCorrect) {
            console.log('Logged in')
            res.cookie('session_token', token, { httpOnly: true }).status(200).send(`Authorized`)
        }

    } catch (error) {
        console.log(error)
        res.status(400).send(error);
    }
}

export const logoutUser = async (req, res) => {
    try {
        res.clearCookie("session_token");
        res.status(200).send("Logged out successfully");
    } catch (err) {
        console.log(err)
    }

}

export const checkAuth = async (req, res) => {
    try {
        const user = await userModel.findOne({
            email: req.body.email,
            password: 0
        })
        res.status(200).json(!!user)
    } catch (err) {
        console.log(err);
        res.status(400).send(error);
    }
}