import React, { useState } from "react";
import styled from "styled-components";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Upload from "./Upload";
import { logout } from "../redux/userSlice.js";
import { useDispatch } from "react-redux";
import axios from "axios";

const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: #3f69aa;
  height: 56px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 0px 20px;
  position: relative;
`;

const Button = styled.button`
  font-size: 20px;
  margin-bottom: 5px;
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #ff2b2b;
  color: #ff2b2b;
  border-radius: 5px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  width: 170px;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
`;
const UserAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
  cursor: pointer;
`;
const UserMenu = styled.div`
  position: absolute;
  top: 56px;
  right: 20px;
  background-color: ${({ theme }) => theme.bgLighter};
  border-radius: 5px;
  padding: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
`;

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleUserClick = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    dispatch(logout());
    const res = await axios.post("/auth/logout");
    navigate("/");
  };

  return (
    <>
      <Container>
        <Wrapper>
          {currentUser ? (
            <User>
              <VideoCallOutlinedIcon
                style={{ cursor: "pointer", fontSize: "35px" }}
                onClick={() => setOpen(true)}
              />
              <UserAvatar onClick={handleUserClick}>
                <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-DbggIY68fkJvAnlZ-hWfoijAUYhz8R3NDsecAdlTlA&s" />
              </UserAvatar>
              {currentUser.name}
              {menuOpen && (
                <UserMenu>
                  <Button>User Panel</Button>
                  <Button>Settings</Button>
                  <Button onClick={handleLogout}>Logout</Button>
                </UserMenu>
              )}
            </User>
          ) : (
            <Link to="signin" style={{ textDecoration: "none" }}>
              <Button>
                <AccountCircleOutlinedIcon />
                Sign in
              </Button>
            </Link>
          )}
        </Wrapper>
      </Container>
      {open && <Upload setOpen={setOpen} />}
    </>
  );
};

export default Navbar;
