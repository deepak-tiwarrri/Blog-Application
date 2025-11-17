import jwt from "jsonwebtoken";

export const generateToken = (userId, expiresTime) => {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: expiresTime })
    return token;
}