import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Button, Table, TableBody, TableCell, TableContainer } from "@mui/material"
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import BlockIcon from "@mui/icons-material/Block";
import { handleBlockUser, handleUnBlockUser } from "./HelperFunctions";
import {
  addUserNotification,
  makeAdminUser,
} from "../../services/user.services";
import { Delete } from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { handleCopyDetails } from "../InboxAdminNotifications.tsx/HelperFunctions";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import Pagination from "../../views/Pagination/Pagination.tsx";
import SendIcon from "@mui/icons-material/Send";
import {
  AuthContextDataTSInterface,
} from "../TypeScript-Inteface/TypeScript-Interface.tsx";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { MIN_LETTERS_NOTIFICATION } from "../../common/common.ts";
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import './PeopleTable.css'

interface UserTSInterface {
  id: string;
  username: string;
  email: string;
  phoneNumber: string;
  role: string;
  blockedStatus: boolean;
}

const PeopleTable: React.FC = () => {
  const { loggedInUser, allUsers } =
    useContext<AuthContextDataTSInterface>(AuthContext);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [users, setUsers] = useState<UserTSInterface[]>(allUsers);
  const itemsPerPage = 5;
  const [usersToDisplay, setUsersToDisplay] = useState<UserTSInterface[]>(
    allUsers.slice(0, itemsPerPage)
  );
  const [isSendMessageModalOpen, setIsSendMessageModalOpen] = useState(false);
  const [recipientUsername, setRecipientUsername] = useState("");
  const [messageContent, setMessageContent] = useState("");

  useEffect(() => {
    setUsers(allUsers);
    setUsersToDisplay(users.filter((user) => usersToDisplay.includes(user)));
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
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="table-cells">Name</TableCell>
              <TableCell className="table-cells">Email</TableCell>
              <TableCell className="table-cells">Role</TableCell>
              <TableCell className="table-cells">Status</TableCell>
              <TableCell className="table-cells">Action</TableCell>
              <TableCell className="table-cells">Make Admin</TableCell>
              <TableCell className="table-cells">Send Message</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usersToDisplay.length > 0 ? (
              usersToDisplay.map((user) => (
                <TableRow key={crypto.randomUUID()}>
                  <TableCell>
                    {loggedInUser.username === user.username ? (
                      <span style={{ color: "gray" }}>you</span>
                    ) : (
                      <span>{user.username}</span>
                    )}
                  </TableCell>
                  <TableCell
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
                  </TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    {user.blockedStatus ? (
                      <span style={{ color: "red" }}>Blocked</span>
                    ) : (
                      <span style={{ color: "green" }}>Active</span>
                    )}
                  </TableCell>
                  <TableCell>
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
                      <span>-</span>
                    )}
                  </TableCell>
                  {user.role !== "admin" ? (
                    <TableCell>
                      <Button
                        onClick={() => makeAdminUser(user.username)}
                        style={{ background: "transparent" }}
                      >
                        <CheckIcon style={{ color: "gray" }} />
                      </Button>
                    </TableCell>
                  ) : (
                    <TableCell>
                      <span>Admin</span>
                    </TableCell>
                  )}
                  <TableCell>
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
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} style={{ textAlign: "center" }}>
                  {searchQuery
                    ? "No users match the search criteria."
                    : "Loading users..."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
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
            maxWidth: 350,
            borderRadius: "5%",
          }}
        >
          <h2>Send Message to {recipientUsername}</h2>
          <textarea
            value={messageContent}
            onChange={(e) => setMessageContent(e.target.value)}
            placeholder="Enter your message"
            rows={7}
            cols={35}
          />
          {messageContent.length > MIN_LETTERS_NOTIFICATION && (
            <Button
              onClick={() => {
                addUserNotification(recipientUsername, messageContent);
                setIsSendMessageModalOpen(false);
                setMessageContent("");
                setRecipientUsername("");
              }}
              style={{ textAlign: "center" }}
            >
              Send
            </Button>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default PeopleTable;
