import React, { useContext, useState } from "react";
import { Form, Button } from "react-bootstrap";
import "../styles/search.css";
import { useNavigate } from "react-router-dom";
import axios from "../axios/axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-hot-toast";
import CSVExport from "./CSVExport";
const SearchBar = () => {
  const { setUsersData } = useContext(AppContext);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  // Handle search of user
  const handleSearch = () => {
    if (query.trim()) {
      try {
        axios
          .get("/api/search", {
            params: {
              query: query.trim(),
            },
          })
          .then((response) => {
            setUsersData(response.data.result);
          })
          .catch((error) => {
            toast.error(error.message, "Network error");
          });
      } catch (error) {
        toast.error(error.message, "Network error");
      }
    } else {
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
      } finally {
      }
    }
  };
  return (
    <div className="search-header">
      <div>
        <div className="container">
          <div className="row ">
            <div className="col-md-4">
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <Button variant="danger" onClick={handleSearch}>
                  Search
                </Button>
              </Form>
            </div>
            <div className="col-md-8  search-right">
              <CSVExport />
              <Button
                className="search-right-button"
                variant="danger"
                onClick={() => {
                  navigate("/add-user");
                }}
              >
                + Add User
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
