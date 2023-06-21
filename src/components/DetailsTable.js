import React, { useContext, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import "../styles/table.css";
import swal from "sweetalert";
import { Dropdown, DropdownButton, Pagination } from "react-bootstrap";
import {
  Trash,
  PencilSquare,
  EyeFill,
  ChevronDown,
} from "react-bootstrap-icons";
import { MoreVert } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { toast } from "react-hot-toast";
import axios from "../axios/axios";
import { baseUrl } from "../constants/BaseURL";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const DetailsTable = ({ itemsPerPages }) => {
  // Accessing data from AppContext
  const { setUsersData, usersData } = useContext(AppContext);
  const navigate = useNavigate();
  const itemsPerPage = itemsPerPages || 6;
  const [currentPage, setCurrentPage] = useState(1);
  // Calculate the index range of the items to be displayed on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  // Extract the items for the current page
  const currentPageItems = usersData?.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  // Handle prev click button
  const handlePrevClick = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };
  // Handle Next click button
  const handleNextClick = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  // Fetch user data from the server
  useEffect(() => {
    try {
      axios
        .get("api/get-users")
        .then((response) => {
          if (response.data.status === "success") {
            setUsersData(response.data.result);
          } else {
            toast.error(response.data.message, "error");
          }
        })
        .catch((error) => {
          toast.error(error.message, "Network error");
        });
    } catch (error) {
      toast.error(error.message, "Network error");
    }
  }, [setUsersData]);

  // Handle edit button click
  const handleEdit = (id) => {
    navigate(`/edit-user/${id}`);
  };

  // Handle view button click
  const handleView = (id) => {
    navigate(`/view-user/${id}`);
  };

  // Handle delete button click
  const handleDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        try {
          axios
            .post("/api/delete-user", { id })
            .then((response) => {
              setUsersData(response.data.result);
              swal("Poof! Your imaginary file has been deleted!", {
                icon: "success",
              });
            })
            .catch((error) => {
              toast.error(error.message, "Network error");
            });
        } catch (error) {
          toast.error(error.message, "Network error");
        }
      } else {
        swal("Your file is safe!");
      }
    });
  };

  // Handle active button click
  const activeUser = (id, status) => {
    swal({
      title: "Are you sure?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willBlock) => {
      try {
        if (willBlock) {
          axios
            .post("/api/active-user", { id, status })
            .then((response) => {
              setUsersData(response.data.result);
            })
            .catch((err) => {
              swal(err.message);
            });
        } else {
          swal("Your work is not saved !");
        }
      } catch (error) {
        toast.error(error.message);
      }
    });
  };

  return (
    <div className="table-main">
      <div className="container table-container">
        <Table responsive="lg">
          <thead className="table-headers">
            <tr>
              <th>ID</th>
              <th>FullName</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Status</th>
              <th>Profile</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentPageItems.map((element, index) => {
              return (
                <tr key={element._id}>
                  <td>{startIndex + index + 1}</td>
                  <td>
                    {element.firstName} {element.lastName}
                  </td>
                  <td>{element.email}</td>
                  <td>{element.gender === "male" ? "M" : "F"}</td>
                  <td>
                    <Dropdown>
                      <Dropdown.Toggle
                        className="table-active-button"
                        variant="danger"
                        id="dropdown-basic"
                      >
                        {element.status}{" "}
                        <ChevronDown className="table-chevronbutton" />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item
                          href="#/action-1"
                          onClick={() => activeUser(element._id, "Active")}
                        >
                          Active
                        </Dropdown.Item>
                        <Dropdown.Item
                          href="#/action-2"
                          onClick={() => activeUser(element._id, "InActive")}
                        >
                          InActive
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                  <td>
                    <Avatar alt="Profile" src={`${baseUrl}${element.image}`} />
                  </td>
                  <td>
                    <DropdownButton
                      className="table-dropdown-button"
                      drop="down"
                      variant=""
                      style={null}
                      title={<MoreVert />}
                    >
                      <Dropdown.Item eventKey="1">
                        <EyeFill
                          className="table-view-button"
                          onClick={() => handleView(element._id)}
                        />
                        <span className="table-view">View</span>
                      </Dropdown.Item>
                      <Dropdown.Item
                        eventKey="2"
                        onClick={() => handleEdit(element._id)}
                      >
                        <PencilSquare className="table-edit-button" />
                        <span className="table-edit">Edit</span>
                      </Dropdown.Item>
                      <Dropdown.Item
                        eventKey="3"
                        onClick={() => handleDelete(element._id)}
                      >
                        <Trash className="table-delete-button" />
                        Delete
                      </Dropdown.Item>
                    </DropdownButton>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <Pagination
          className="pagination-container"
          totalPages={Math.ceil(usersData?.length / itemsPerPage)}
          currentPage={currentPage}
          onSelect={handlePageChange}
        >
          <Pagination.Prev
            className="pagination-arrow-button"
            onClick={handlePrevClick}
            disabled={currentPage === 1}
          />
          <Pagination.Item active>{currentPage}</Pagination.Item>
          <Pagination.Next
            className="pagination-arrow-button"
            onClick={handleNextClick}
            disabled={
              currentPage === Math.ceil(usersData?.length / itemsPerPage)
            }
          />
        </Pagination>
      </div>
    </div>
  );
};

export default DetailsTable;
