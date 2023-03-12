import { useSelect } from "@mui/base";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Update from "./Update";

const Container = styled.div`
  width: ${(props) => props.type !== "sm" && "310px"};
  margin-bottom: ${(props) => (props.type === "sm" ? "10px" : "40px")};
  cursor: pointer;
  display: ${(props) => props.type === "sm" && "flex"};
  gap: 10px;
`;

const Image = styled.img`
  border-radius: 10px;
  width: 100%;
  height: ${(props) => (props.type === "sm" ? "120px" : "202px")};
  background-color: #999;
  flex: 1;
`;

const Details = styled.div`
  display: flex;
  margin-top: ${(props) => props.type !== "sm" && "16px"};
  gap: 12px;
  flex: 1;
`;

const Texts = styled.div``;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 500;
`;

const ChannelName = styled.h2`
  font-size: 18px;
  margin: 9px 0px;
`;

const Info = styled.div`
  font-size: 14px;
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
`;

const Button = styled.button`
  gap: 10px;
  border: none;
  padding: 6px 12px;
  font-size: 14px;
  font-weight: 500;
  border-radius: 4px;
  cursor: pointer;
  justify-content: space-between;
  background-color: #3f69aa;
  color: #fff;
  &:hover {
    opacity: 0.8;
  }
`;

const Card = ({ book }) => {
  const [channel, setChannel] = useState({});
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchChannel = async () => {
      const res = await axios.get(`/users/find/${book.userId}`);
      setChannel(res.data);
    };
    fetchChannel();
  }, [book.userId]);

  const handleDelete = async () => {
    await axios.delete(`/books/${book._id}`);
    window.location.reload();
  };

  return (
    <Container>
      <Image src={book.cover} />
      <Details>
        <Texts>
          <Title>{book.title}</Title>
          <ChannelName>{channel.name}</ChannelName>
          <Info></Info>
        </Texts>
        <div>
          {currentUser && book.userId === currentUser._id ? (
            <Buttons>
              <Button
                onClick={() => setOpen(true)}
              >
              
                Edit
              </Button>
              <Button
                style={{ backgroundColor: "red", marginLeft: "10px" }}
                onClick={handleDelete}
              >
                Delete
              </Button>
            </Buttons>
          ) : (
            <Info>{book.description}</Info>
          )}
        </div>
      </Details>
      {open && <Update setOpen={setOpen} book={book} />}
    </Container>
  );
};

export default Card;
