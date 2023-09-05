import React, { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Button, Table } from "@mui/joy";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import BlockIcon from "@mui/icons-material/Block";
import { handleBlockUser, handleUnBlockUser } from "./HelperFunctions";
import { addUserNotification, makeAdminUser } from "../../services/user.services";
import { Delete } from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { handleCopyDetails } from "../InboxAdminNotifications.tsx/HelperFunctions";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import Pagination from "../../views/Pagination/Pagination.tsx";
import SendIcon from "@mui/icons-material/Send";
import {
  UserTSInterface,
  AuthContextDataTSInterface,
} from "../TypeScript-Inteface/TypeScript-Interface.tsx";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const PeopleTable: React.FC = () => {
  const { loggedInUser, allUsers } =
    useContext<AuthContextDataTSInterface>(AuthContext);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [users, setUsers] = useState<UserTSInterface[]>(allUsers);
  const itemsPerPage = 5;
  const [usersToDisplay, setUsersToDisplay] = useState<UserTSInterface[]>(allUsers.slice(0, itemsPerPage));
  const [isSendMessageModalOpen, setIsSendMessageModalOpen] = useState(false);
  const [recipientUsername, setRecipientUsername] = useState("");
  const [messageContent, setMessageContent] = useState("");

  useEffect(() => {
    setUsers(allUsers);
    setUsersToDisplay(allUsers.filter((el) => usersToDisplay.includes(el)));
  }, [allUsers]);

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      setUsers(allUsers);
    } else {
      const filteredUsers = allUsers.filter(
        (user) =>
          user.username.includes(searchQuery) ||
          user.email.includes(searchQuery) ||
          user.phoneNumber.includes(searchQuery)
      );
      setUsers(filteredUsers);
    }
    setCurrentPage(1);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setUsers(allUsers);

    handleSearch();
    setCurrentPage(1);
  };

  return (
    <div>
      <div style={{ textAlign: "left" }}>
        <TextField
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by username, email, or phone"
          sx={{ width: "500px", marginBottom: "30px" }}
        />
        <span style={{ marginLeft: "10px", marginRight: "10px" }}>
          <Button
            onClick={() => handleSearch()}
            style={{ backgroundColor: "transparent" }}
          >
            <SearchIcon style={{ height: "50px", color: "blue" }} />
          </Button>
        </span>
        <span>
          <Button
            onClick={() => handleClearSearch()}
            style={{ backgroundColor: "transparent" }}
          >
            <Delete style={{ height: "50px", color: "blue" }} />
          </Button>
        </span>
      </div>
      <Table>
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>Name</th>
            <th style={{ textAlign: "center" }}>Email</th>
            <th style={{ textAlign: "center" }}>Role</th>
            <th style={{ textAlign: "center" }}>Status</th>
            <th style={{ textAlign: "center" }}>Action</th>
            <th style={{ textAlign: "center" }}>Make Admin</th>
            <th style={{ textAlign: "center" }}>Send Message</th>
          </tr>
        </thead>
        {usersToDisplay.length > 0 ? (
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
                  <Button
                    variant="outlined"
                    style={{ marginTop: "5px", border: "none" }}
                    onClick={() => handleCopyDetails(user.email)}
                  >
                    <FileCopyIcon />
                  </Button>
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
                {user.role !== "admin" ? (
                  <td>
                    <Button
                      onClick={() => makeAdminUser(user.username)}
                      style={{ background: "transparent" }}
                    >
                      <CheckIcon style={{ color: "gray" }} />
                    </Button>
                  </td>
                ) : (
                  <td>
                    <p>Admin</p>
                  </td>
                )}
                <td>
                  <Button
                    style={{
                      backgroundColor: "transparent",
                      color: "blueviolet",
                    }}
                    onClick={() => {
                      setIsSendMessageModalOpen(true);
                      setRecipientUsername(user.username);
                    }}
                  >
                    <SendIcon />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <tr>
            <td colSpan={6} style={{ textAlign: "center" }}>
              {searchQuery
                ? "No users match the search criteria."
                : "Loading users..."}
            </td>
          </tr>
        )}
      </Table>
      <Pagination
        data={users}
        itemsPerPage={itemsPerPage}
        setData={setUsersToDisplay}
      />
      <Modal
        open={isSendMessageModalOpen}
        onClose={() => setIsSendMessageModalOpen(false)}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            maxWidth: 400,
          }}
        >
          <h2>Send Message to {recipientUsername}</h2>
          <textarea
            value={messageContent}
            onChange={(e) => setMessageContent(e.target.value)}
            placeholder="Enter your message"
            rows={7}
            cols={40}
          />
          <Button
            onClick={() => {
              addUserNotification(recipientUsername, messageContent)
              setIsSendMessageModalOpen(false);
              setMessageContent('');
              setRecipientUsername('');
            }}
          >
            Send
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default PeopleTable;
