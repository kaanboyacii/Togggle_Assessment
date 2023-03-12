import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000000a7;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid;
`;

const Wrapper = styled.div`
  width: 540px;
  height: 540px;
  background-color: #ffff;
  color: #ffff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
`;
const Close = styled.div`
  color: black;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;
const Title = styled.h1`
  text-align: center;
  color: black;
`;

const Input = styled.input`
  border: 1px solid;
  color: black;
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  z-index: 999;
`;
const Desc = styled.textarea`
  border: 1px solid;
  color: black;
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
`;
const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
`;
const Label = styled.label`
  font-size: 14px;
  color: black;
`;
const Upload = ({ setOpen }) => {
  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const res = await axios.post("/books", { ...inputs });
    setOpen(false);
    res.status === 200 && navigate("/");
    window.location.reload();
  };

  return (
    <Container>
      <Wrapper>
        <Close onClick={() => setOpen(false)}>X</Close>
        <Title>Add a New Book</Title>
        <Input
          type="text"
          placeholder="Title"
          name="title"
          onChange={handleChange}
        />
        <Desc
          placeholder="Description"
          name="desc"
          rows={5}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="author"
          placeholder="Author"
          onChange={handleChange}
        />
        <Input
          type="number"
          name="year"
          placeholder="Year"
          onChange={handleChange}
        />
        <Label>Image:</Label>

        <Input
          type="text"
          placeholder="Image URL"
          name="cover"
          onChange={handleChange}
        />
        <Button onClick={handleUpload}>Upload</Button>
      </Wrapper>
    </Container>
  );
};

export default Upload;
