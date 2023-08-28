import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Button, Table } from "@mui/joy";
import IconButton from "@mui/material/IconButton";

import CheckIcon from "@mui/icons-material/Check";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import BlockIcon from "@mui/icons-material/Block";
import { handleBlockUser, handleUnBlockUser } from "./HelperFunctions";
import { database } from "../../config/firebase";
import { ref, onValue } from "firebase/database";
import { makeAdminUser } from "../../services/user.services";

const PeopleTable: React.FC = () => {
  const { loggedInUser } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState([]);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(users.length / itemsPerPage);

  const usersRef = ref(database, "users");

  useEffect(() => {
    const usersListener = onValue(usersRef, (snapshot) => {
      const updatedUsers = [];
      snapshot.forEach((childSnapshot) => {
        const user = childSnapshot.val();
        updatedUsers.push(user);
      });
      setUsers(updatedUsers);
    });
    return () => {
      usersListener();
    };
  }, []);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const usersToDisplay = users.slice(startIndex, endIndex);

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>Name</th>
            <th style={{ textAlign: "center" }}>Email</th>
            <th style={{ textAlign: "center" }}>Role</th>
            <th style={{ textAlign: "center" }}>Status</th>
            <th style={{ textAlign: "center" }}>Action</th>
            <th style={{ textAlign: "center" }}>Make Admin</th>
          </tr>
        </thead>
        <tbody>
          {usersToDisplay.map((user) => (
            <tr key={user.id}>
              {loggedInUser.username === user.username ? (
                <td style={{ color: "gray" }}>you</td>
              ) : (
                <td>{user.username}</td>
              )}
              <td
                style={{
                  maxWidth: "150px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {user.email}
              </td>
              <td>{user.role}</td>
              {user.blockedStatus ? (
                <td style={{ color: "red" }}>Blocked</td>
              ) : (
                <td style={{ color: "green" }}>Active</td>
              )}
              <td>
                {user.role === "user" ? (
                  user.blockedStatus ? (
                    <IconButton
                      aria-label="unblock user"
                      onClick={() => handleUnBlockUser(user.username)}
                      style={{ color: "red" }}
                    >
                      <BlockIcon />
                    </IconButton>
                  ) : (
                    <IconButton
                      aria-label="block user"
                      onClick={() => handleBlockUser(user.username)}
                      style={{ color: "green" }}
                    >
                      <BlockIcon />
                    </IconButton>
                  )
                ) : (
                  <p>-</p>
                )}
              </td>
              {user.role !== 'admin' ? (
                <td>
                  <Button onClick={() => makeAdminUser(user.username)} style={{background: 'transparent'}}><CheckIcon style={{color: 'gray'}}/></Button>
                </td>
                ) : (
                  <td>
                  <p>Admin</p>
                  </td>
                )}
            </tr>
          ))}
        </tbody>
      </Table>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "16px",
        }}
      >
        <IconButton
          aria-label="previous page"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <KeyboardArrowLeftIcon />
        </IconButton>
        <IconButton
          aria-label="next page"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <KeyboardArrowRightIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default PeopleTable;
