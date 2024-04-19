
import User from "../models/UserSchema.js";
import Booking from "../models/BookingSchema.js";
import Doctor from "../models/DoctorSchema.js";

export const updateUser = async(req, res) => {
  const id = req.params.id;
  try {
    const updateUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "User has been updated successfully",
      data: updateUser,
    });
  } catch (err) {
    res.status(500).json({ success:false , message:"Faild to updated " });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  
  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "User has been deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Faild to delete " });
  }
};

export const getSingleUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id).populate("reviews").select("-password");
    res.status(200).json({
      success: true,
      message: "User Found",
      data: user,
    });
  } catch (err) {
    res.status(404).json({ success: false, message: "No user found" });
  }
};

export const getAllUser = async (req, res) => {
  
  try {
    const users = await User.find({}).select("-password")
    res.status(200).json({
      success: true,  
      message: "User Found",
      data: users,
    });
  } catch (err) {
    res.status(404).json({ success: false, message: "Not found" });
  }
};

export const getUserProfile = async(req,res)=>{
  // console.log("getUserProfile called"); // Add this line

const userId=req.userId ;
try {
  const user=await User.findById(userId);

  if(!user){
    return res.status(404).json({success:false,message:"User not found"})
  }

  const {password, ...rest }= user._doc;
  res.status(200).json({
    success:true,
    message:"Profile Info Is Get Successfully",
    data:{...rest}})

}catch(err){
  res.status(500).json({success:false,message:"Server Error"})
}
}; 

export const getMyAppointments = async(req,res)=>{
try{
  //retrive all appointments of the user (specific user)
  const bookings = await Booking.find({user:req.userId});

  //extract doctor ids from appointment bookings
  const doctorIds = bookings.map( el=>el.doctor.id);
  //now retriving doctors using doctor ids
  const doctors = await Doctor.find({_id:{$in:doctorIds}}).select("-password");
  
  res.status(200).json({
    success:true,
    message:"Appointments are get successfully",
    data:doctors
  })
}catch(err){
  res.status(500).json({success:false,message:"Server Error"})
}
};

