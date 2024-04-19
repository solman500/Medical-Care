import User from "../models/UserSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Doctor from "../models/DoctorSchema.js";

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET_KEY,
    {
       expiresIn: "15d" 
      }
  );
};



export const register = async (req, res) => {
  const { name, email, password, role, photo, gender } = req.body;
  try {
    let user = null;

    if (role === "patient") {

      user = await User.findOne({ email });
    } else if (role === "doctor") {
      user = await Doctor.findOne({ email });
    }

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    if (role === "patient") {
      user = new User({
        name,
        email,
        password: hashedPassword,
        photo,
        gender,
        role,
      });
    }

    if (role === "doctor") {
      user = new Doctor({
        name,
        email,
        password: hashedPassword,
        photo,
        gender,
        role,
      });
    }

    await user.save();

    
      res.status(200)
      .json({ success: true, message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const {email} = req.body;

  try {
    let user = null;

    const patient = await User.findOne({email});
    const doctor = await Doctor.findOne({ email });

    if (patient) {
      user = patient;
    }

    if (doctor) {
      user = doctor;
    }

    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordMatch) {
      return res.status(400)
        .json({ status: false, message: "Invalid Credentials" });
        
    }

    const token = generateToken(user);

    const { password, role, appointments, ...rest } = user._doc;
    
     res.status(200).json({
        status:true,
        message: "successfully login",
        token,
        data: { ...rest },
        role,
      });
     
  } catch (err) {
    res.status(500).json({ status: false, message: "Faild to login" });
  }
};
