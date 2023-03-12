import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import axios from "axios";

const Container = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const Home = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`/books`);
      setBooks(res.data);
    }
    fetchVideos();
  }, []);
  return (
    <Container>
      {books.map((book) => (
        <Card key={book._id} book={book}/>
      ))}
    </Container>
  );
};

export default Home;
