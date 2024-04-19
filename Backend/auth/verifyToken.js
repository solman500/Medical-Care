import jwt from 'jsonwebtoken';
import Doctor from '../models/DoctorSchema.js';
import User from '../models/UserSchema.js';

// Middleware function to authenticate user tokens
export const authenticate = async (req, res, next) => {
  const authToken = req.headers.authorization;

  if (!authToken || !authToken.startsWith('Bearer')) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  try {
    const token = authToken.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userId = decoded.id;
    req.role = decoded.role;

    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, message: "Token Expired" });
    }

    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
};

// Middleware function to restrict access based on user roles
export const restrict = (roles) => async (req, res, next) => {
  const userId = req.userId;

  let user;
  const patient = await User.findById(userId);
  const doctor = await Doctor.findById(userId);

  if (patient) {
    user = patient;
  }
  if (doctor) {
    user = doctor;
  }
  if (!roles.includes(user.role)) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  next();
};
