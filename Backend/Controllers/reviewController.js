import Review from '../models/ReviewSchema.js';
import Doctor from '../models/DoctorSchema.js';
// import User from '../models/UserSchema.js';

export const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find({});
        res.status(200).json({ success: true, data:reviews , message: "Successful" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    } 
};


export const createReview=async(req,res)=>{

    if(!req.body.doctor ) req.body.doctor = req.params.doctorId;
    if(!req.body.user ) req.body.user = req.params.userId;

    const newReview =  new Review(req.body);

    try {

        const savedReview = await newReview.save();

        await Doctor.findByIdAndUpdate(req.body.doctor, { $push: { reviews: savedReview._id } });

        res.status(200).json({ success: true, data: savedReview, message: "Review created successfully" });
     
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}