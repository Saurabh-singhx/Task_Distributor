import jwt from "jsonwebtoken"
import User from "../models/user.model.js"
import Admin from "../models/admin.model.js";

export const protectRoute = async (req, res, next) => {

    try {

        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ message: "unauthorize - No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({ message: "unauthorize - Invalid Token" });
        }
        
        const user = await User.findById(decoded.userId).select("-password");
        const admin = await Admin.findById(decoded.userId).select("-password");

        if(!user && !admin){
            if(!user){
                return res.status(404).json({ message: "User not found" });
            }else{
                return res.status(404).json({ message: "admin not found" });
            }
        }
        if(user){
            req.user = user;
            req.role = "user";
        }
        if(admin){
            req.user = admin;
            req.role = "admin";
        }
        

        next();
    } catch (error) {
        console.log("error in protectRoute",error.message);
        return res.status(500).json({ message: "User not found" });
    }
}
export const checkAdmin = async (req, res, next) => {

    try {

        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ message: "unauthorize - No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({ message: "unauthorize - Invalid Token" });
        }

        const admin = await Admin.findById(decoded.userId).select("-password");

        if(!admin){
            return res.status(404).json({ message: "admin not found" });
        }
        if(admin){
            req.user = admin;
            req.role = "admin";
        }
        
        next();
    } catch (error) {
        console.log("error in protectRoute",error.message);
        return res.status(500).json({ message: "User not found" });
    }
}