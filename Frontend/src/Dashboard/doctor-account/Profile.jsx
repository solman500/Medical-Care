import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import uploadImageToCloudinary from "../../utils/uploadCloudinary";
import { BASE_URL, token } from "./../../config";
import { toast } from "react-toastify";

const Profile = ({ doctorData }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    bio: "",
    gender: "",
    specialization: "",
    ticketPrice: null,
    qualifications: [],
    experiences: [],
    timeSlots: [],
    about: "",
    photo: null,
  });

  useEffect(() => {
    setFormData({
      name: doctorData?.name || '', // Use empty string as a fallback value
      email: doctorData?.email || '',
      phone: doctorData?.phone,
      bio: doctorData?.bio,
      gender: doctorData?.gender,
      specialization: doctorData?.specialization,
      ticketPrice: doctorData?.ticketPrice,
      qualifications: doctorData?.qualifications,
      experiences: doctorData.experiences,
      timeSlots: doctorData.timeSlots,
      about: doctorData?.about,
      photo: doctorData?.photo,
    });
  }, [doctorData]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    const data = await uploadImageToCloudinary(file);
    // setPreviewURL(data.url);
    // setSelectedFile(data.url);
    setFormData({ ...formData, photo: data?.url });
    console.log(data);
  };

  const updateProfileHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${BASE_URL}/doctors/${doctorData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      // console.log(data);

      if (!res.ok) {
        throw Error(result.message);
      } else {
        toast.success(result.message);
      }
    } catch (err) {
      toast.error(err.response.result.message);
    }
  };

  //   reusable function  to handle the change of the qualification
  const addItem = (key, item) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: [...prevFormData[key], item],
    }));
  };

  //reusable input component
  const handleReusableInputChangeFunction = (key, index, event) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => {
      const updateItems = [...prevFormData[key]];
      updateItems[index][name] = value;

      return {
        ...prevFormData,
        [key]: updateItems,
      };
    });
  };

  // reusable function to delete the item

  const deleteItem = (key, index) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: prevFormData[key].filter((_, i) => i !== index),
    })); // <-- Closing parenthesis was missing here
  };

  const addQualification = (e) => {
    e.preventDefault();
    addItem("qualifications", {
      startingDate: "",
      endingDate: "",
      degree: "PHD",
      university: "South Valley University",
    });
  };

  const addExperience = (e) => {
    e.preventDefault();
    addItem("experiences", {
      startingDate: "",
      endingDate: "",
      position: "Doctor",
      hospital: "Cairo Hospital",
    });
  };

  const addTimeSlot = (e) => {
    e.preventDefault();
    addItem("timeSlots", {
      day: "Saturday",
      startingTime: "8:00 ",
      endingTime: "1:00",
    });
  };

  const handleQualificationChange = (event, index) => {
    handleReusableInputChangeFunction("qualifications", index, event);
  };

  const handleTimeSlotChange = (event, index) => {
    handleReusableInputChangeFunction("timeSlots", index, event);
  };

  const deleteTimeSlot = (e, index) => {
    e.preventDefault();
    deleteItem("timeSlots", index);
  };

  const handleTimeChange = (event, index) => {
    handleReusableInputChangeFunction("timeSlots", index, event);
  };
  const handleExperienceChange = (event, index) => {
    handleReusableInputChangeFunction("experiences", index, event);
  };

  const deleteExperience = (e, index) => {
    e.preventDefault();
    deleteItem("experiences", index); // <-- Closing parenthesis was missing here
  };

  const deleteQualification = (e, index) => {
    e.preventDefault();
    deleteItem("qualifications", index); // <-- Closing parenthesis was missing here
  };

  return (
    <div>
      <h2 className="text-headingColor font-bold text-[24px] leading-9 mb-10">
        Profile Information
      </h2>

      <form action="">
        
        <div className="mb-5">
          <p className="form__label">Name*</p>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Full Name"
            className="form__input"
          />
        </div>

        <div className="mb-5">
          <p className="form__label">Email*</p>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="form__input"
            readOnly
            aria-readonly
            disabled
          />
        </div>

        <div className="mb-5">
          <p className="form__label">Phone*</p>
          <input
            type="number"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="your phone number"
            className="form__input"
          />
        </div>

        <div className="mb-5">
          <p className="form__label">Bio*</p>
          <input
            type="text"
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            placeholder="Bio"
            className="form__input"
            maxLength={100}
          />
        </div>

        <div className="mb-5">
          <div className="grid grid-cols-3 gap-5 mb-[30px] ">
            <div className="">
              <p className="form__label">Gender*</p>
              <select
                name="gender"
                value={formData.gender}
                className="form__input"
                onChange={handleInputChange}
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="">
              <p className="form__label">Specialization*</p>
              <select
                name="specialization"
                value={formData.specialization}
                onChange={handleInputChange}
                className="form__input"
              >
                <option value="">Select</option>
                <option value="surgeon">Surgeon</option>
                <option value="neurologist">Neurologist</option>
                <option value="dermatologist">Dermatologist</option>
              </select>
            </div>

            <div className="">
              <p className="form__label">Ticket Price*</p>
              <input
                type="number"
                placeholder="100"
                name="ticketPrice"
                value={formData.ticketPrice}
                className="form__input"
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <div className="mb-5">
          <p className="form__label">Qualifications*</p>

          {formData.qualifications?.map((item, index) => (
            <div key={index}>
              <div>
                <div className="grid grid-cols-2 gap-5 ">
                  <div>
                    <p className="form__label">Starting Data*</p>
                    <input
                      type="date"
                      name="startingDate"
                      value={item.startingDate}
                      onChange={(e) => handleQualificationChange(e, index)}
                      className="form__input"
                    />
                  </div>

                  <div>
                    <p className="form__label">Ending Data*</p>
                    <input
                      type="date"
                      name="endingDate"
                      value={item.endingDate}
                      onChange={(e) => handleQualificationChange(e, index)}
                      className="form__input"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-5 ">
                  <div className="">
                    <p className="form__label">Degree*</p>
                    <input
                      type="text"
                      name="degree"
                      value={item.degree}
                      onChange={(e) => handleQualificationChange(e, index)}
                      className="form__input"
                    />
                  </div>

                  <div className="">
                    <p className="form__label">University*</p>
                    <input
                      type="text"
                      name="university"
                      value={item.university}
                      onChange={(e) => handleQualificationChange(e, index)}
                      className="form__input"
                    />
                  </div>
                </div>

                <button
                  onClick={(e) => deleteQualification(e, index)}
                  className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer"
                >
                  <AiOutlineDelete />
                </button>
              </div>
            </div>
          ))}

          <button
            onClick={addQualification}
            className="bg-[#000] py-2 px-2 rounded  text-white h-fit  cursor-pointer"
          >
            Add Qualification
          </button>
        </div>

        <div className="mb-5">
          <p className="form__label">Experiences*</p>

          {formData.experiences?.map((item, index) => (
            <div key={index}>
              <div>
                <div className="grid grid-cols-2 gap-5 ">
                  <div>
                    <p className="form__label">Starting Data*</p>
                    <input
                      type="date"
                      name="startingDate"
                      value={item.startingDate}
                      onChange={(e) => handleExperienceChange(e, index)}
                      className="form__input"
                    />
                  </div>

                  <div>
                    <p className="form__label">Ending Data*</p>
                    <input
                      type="date"
                      name="endingDate"
                      value={item.endingDate}
                      onChange={(e) => handleExperienceChange(e, index)}
                      className="form__input"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-5 ">
                  <div className="">
                    <p className="form__label">Position*</p>
                    <input
                      type="text"
                      name="position"
                      value={item.position}
                      onChange={(e) => handleExperienceChange(e, index)}
                      className="form__input"
                    />
                  </div>

                  <div className="">
                    <p className="form__label">Hospital*</p>
                    <input
                      type="text"
                      name="hospital"
                      value={item.hospital}
                      onChange={(e) => handleExperienceChange(e, index)}
                      className="form__input"
                    />
                  </div>
                </div>

                <button
                  className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-6 mb-5 cursor-pointer"
                  onClick={(e) => deleteExperience(e, index)}
                >
                  <AiOutlineDelete />
                </button>
              </div>
            </div>
          ))}

          <button
            className="bg-[#000] py-2 px-2 rounded  text-white h-fit  cursor-pointer"
            onClick={addExperience}
          >
            Add Experiences
          </button>
        </div>

        <div className="mb-5">
          <p className="form__label">Time Slots*</p>

          {formData.timeSlots?.map((item, index) => (
            <div key={index}>
              <div>
                <div className="grid grid-cols-2 md:grid-cols-4 mb-[30px] gap-5 ">
                  <div>
                    <p className="form__label">Day*</p>
                    <select
                      name="day"
                      value={item.day}
                      className="form__input py-3.5  "
                      onChange={(e) => handleTimeSlotChange(e, index)}
                    >
                      <option value="">Select</option>
                      <option value="saturday">Saturday</option>
                      <option value="sunday">Sunday</option>
                      <option value="monday">Monday</option>
                      <option value="tuesday">Tuesday</option>
                      <option value="wednsday">Wednsday</option>
                      <option value="thrusday">Thrusday</option>
                      <option value="friday">Friday</option>
                    </select>
                  </div>

                  <div>
                    <p className="form__label">Starting Time*</p>
                    <input
                      type="time"
                      name="startingTime"
                      value={item.startingTime}
                      className="form__input"
                      onChange={(e) => handleTimeSlotChange(e, index)}
                    />
                  </div>

                  <div>
                    <p className="form__label">Ending Time*</p>
                    <input
                      type="time"
                      name="endingTime"
                      value={item.endingTime}
                      className="form__input"
                      onChange={(e) => handleTimeSlotChange(e, index)}
                    />
                  </div>

                  <div className="flex items-center">
                    <button
                      onClick={(e) => deleteTimeSlot(e, index)}
                      className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-2  cursor-pointer"
                    >
                      <AiOutlineDelete />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <button
            className="bg-[#000] py-2 px-2 rounded  text-white h-fit  cursor-pointer"
            onClick={addTimeSlot}
          >
            Add TimeSlots
          </button>
        </div>

        <div className="mb-5">
          <p className="form__label">About*</p>
          <textarea
            name="about"
            rows={5}
            value={formData.about}
            placeholder="Write about You"
            onChange={handleInputChange}
            className="form__input"
          ></textarea>
        </div>

        <div className="mb-5 flex items-center gap-3 ">
          {formData.photo && (
            <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center">
              <img
                src={formData.photo}
                alt=""
                className="w-full h-full rounded-full "
              />
            </figure>
          )}
          <div className="relative w-[130px] h-[50px]">
            <input
              type="file"
              name="photo"
              onChange={handleFileInputChange}
              id="customFile"
              accept=".jpg, .png"
              className="absolute top-0 left-0 w-full h-full  opacity-0 cursor-pointer"
            />
            <label
              htmlFor="customFile"
              className="absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer "
            >
              Upload Photo
            </label>
          </div>
        </div>

        <div className="mt-7">
          <button
            type="submit"
            onClick={updateProfileHandler}
            className="bg-primaryColor text-white text-[18px] leading-[30px] w-full py-3 px-4  rounded-lg "
          >
            UpdateProfile
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
