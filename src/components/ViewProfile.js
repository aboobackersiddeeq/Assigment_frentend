import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "../axios/axios";
import { baseUrl } from "../constants/BaseURL";
import { Avatar } from "@mui/material";
const ViewProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [details, setDetails] = useState("");
  // For get user data
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

  return (
    <div>
      <div className="container bootstrap-snippet header-container">
        <div className="bg-white">
          <div className="container  ">
            <h3 className="text-center df-header "> Your Profile </h3>

            <div className="media col-md-10 col-lg-8 col-xl-7 p-0 my-4 mx-auto">
              <div className="d-flex align-items-center flex-column">
                <Avatar
                  src={`${baseUrl}${details.image}`}
                  sx={{ width: 86, height: 86 }}
                  alt="Profile"
                />
                <h4 className="font-weight-bold mb-4">
                  {details?.firstName} {details?.lastName}
                </h4>
              </div>
              <div className="media-body ml-5">
                <div className="text-muted mb-4">
                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Full Name</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          {details?.firstName} {details?.lastName}
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Email</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          {details?.email}
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Mobile</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          {details?.mobile}
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Gender</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          {details?.gender}
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Status</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          {details?.status}
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Location</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          {details?.location}
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-sm-12">
                          <button
                            className="btn btn-danger "
                            target="__blank"
                            onClick={() => navigate(-1)}
                          >
                            Back
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr className="m-0" />
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
