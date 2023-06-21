import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../styles/form.css";
import axios from "../axios/axios";
import { toast } from "react-hot-toast";
import { baseUrl } from "../constants/BaseURL";

const EditForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [details, setDetails] = useState("");
  const [profile, setProfile] = useState("");
  const [profileError, setProfileError] = useState("");
  // Validation schema of edit user
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().trim().required("First Name is required"),
    lastName: Yup.string().trim().required("Last Name is required"),
    email: Yup.string()
      .trim()
      .email("Invalid email address")
      .required("Email is required"),
    mobile: Yup.string()
      .trim()
      .matches(/^\d+$/, "Invalid mobile number")
      .required("Mobile is required"),
    gender: Yup.string().required("Gender is required"),
    status: Yup.string().required("Status is required"),
    location: Yup.string().trim().required("Location is required"),
  });
  // For getting user details
  useEffect(() => {
    try {
      axios
        .post("/api/get-user", { id })
        .then((response) => {
          if (response.data.status === "success") {
            setDetails(response.data.result);
          } else {
            toast.error(response.data.message, "error");
          }
        })
        .catch((error) => {
          toast.error(error.message, "Network error");
        });
    } catch (error) {
      toast.error(error.message, "Network error");
    } finally {
    }
  }, [id]);
  // Handle submit for update data of user
  const handleSubmit = (values, { setSubmitting }) => {
    setProfileError("");
    try {
      axios
        .post(
          "/api/edit-user",
          { values: values, img: profile, id },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          if (response.data.status === "success") {
            toast.success(response.data.message);
            navigate("/");
          } else {
            toast.error(response.data.message);
          }
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } catch (error) {
      toast.error("Network error");
    } finally {
      setSubmitting(false);
    }

    setSubmitting(false);
  };
  // Haandle file change and validate
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (validateFile(file)) {
        setProfile(file);
      }
    } else {
      setProfileError("Profile is required");
      setProfile("");
    }
  };
  // Validate file based on size and type
  const validateFile = (file) => {
    const allowedTypes = ["image/jpeg", "image/png"];
    const maxSize = 1 * 1024 * 1024; // 1MB

    if (!allowedTypes.includes(file.type)) {
      setProfileError("Invalid file type. Please select a JPEG or PNG image.");
      return false;
    }

    if (file.size > maxSize) {
      setProfileError("File size exceeds the maximum limit of 1MB.");
      return false;
    } else {
      setProfileError("");
      return true;
    }
  };

  return (
    <div>
      <div className="container ">
        <div className="row">
          <h1 className="text-center df-header ">Edit Your Details </h1>
          <div className="col-md-12 order-md-1 details_form ">
            {details && (
              <Formik
                initialValues={details}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form className="df_form">
                    <div className="d-flex align-items-center flex-column">
                      <div>
                        <Avatar
                          sx={{ width: 86, height: 86 }}
                          alt="Profile"
                          src={
                            profile
                              ? URL.createObjectURL(profile)
                              : `${baseUrl}${details.image}
                          `
                          }
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="firstName">First Name</label>
                        <Field
                          type="text"
                          id="firstName"
                          name="firstName"
                          className="form-control"
                          placeholder="Enter First Name"
                        />
                        <ErrorMessage
                          name="firstName"
                          component="div"
                          className="error"
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="lastName">Last Name</label>
                        <Field
                          type="text"
                          id="lastName"
                          name="lastName"
                          className="form-control"
                          placeholder="Enter Last Name"
                        />
                        <ErrorMessage
                          name="lastName"
                          component="div"
                          className="error"
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="email">Email address</label>
                        <Field
                          type="email"
                          id="email"
                          name="email"
                          className="form-control"
                          placeholder="Enter Email"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="error"
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="mobile">Mobile</label>
                        <Field
                          type="text"
                          id="mobile"
                          name="mobile"
                          className="form-control"
                          placeholder="Enter Mobile"
                        />
                        <ErrorMessage
                          name="mobile"
                          component="div"
                          className="error"
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="gender">Select Your Gender</label>
                        <div className="form-check mt-2">
                          <Field
                            type="radio"
                            id="male"
                            name="gender"
                            value="male"
                            className="form-check-input"
                          />
                          <label htmlFor="male" className="form-check-label">
                            Male
                          </label>
                        </div>
                        <div className="form-check">
                          <Field
                            type="radio"
                            id="female"
                            name="gender"
                            value="female"
                            className="form-check-input"
                          />
                          <label htmlFor="female" className="form-check-label">
                            Female
                          </label>
                        </div>
                        <ErrorMessage
                          name="gender"
                          component="div"
                          className="error"
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="status">Select Your Status</label>
                        <Field
                          as="select"
                          id="status"
                          name="status"
                          className="form-select form-control form-select-md mb-3"
                        >
                          <option value="">Select...</option>
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </Field>
                        <ErrorMessage
                          name="status"
                          component="div"
                          className="error"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="profile">Select Your Profile</label>
                        <input
                          type="file"
                          name="profile"
                          className="form-control"
                          onChange={handleFileChange}
                        />
                        {profileError && (
                          <p className="error">{profileError}</p>
                        )}
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="location">Enter Your Location</label>
                        <Field
                          type="text"
                          id="location"
                          name="location"
                          className="form-control"
                          placeholder="Enter Your Location"
                        />
                        <ErrorMessage
                          name="location"
                          component="div"
                          className="error"
                        />
                      </div>
                      <br />
                      <button
                        type="submit"
                        className="btn btn-danger btn-block"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Submitting..." : "Submit"}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditForm;
