import React, { useState, useEffect } from "react";
import "./App.css";

import Search from "./Search";
import Post from "./Post";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [searchVal, setSearchVal] = useState("");

  useEffect(() => {
    fetchPosts();
  }, [page]);

  const fetchPosts = () => {
    try {
      fetch(
        `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=20`
      )
        .then((res) => res.json())
        .then((data) => {
          const updatedPosts = data?.map((postObj) => {
            postObj.likes = 0;
            return postObj;
          });
          const mergedPosts = [...posts, ...updatedPosts];
          setPosts(mergedPosts);
          setFilteredPosts(mergedPosts);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleFilter();
  }, [searchVal]);

  const handleFilter = () => {
    let updatedPosts = [...posts];

    if (posts.length > 0)
      updatedPosts = posts.filter((postObj) => {
        if (postObj.title.includes(searchVal)) return postObj;
      });
    setFilteredPosts(updatedPosts);
  };

  const handleChange = (event) => {
    setSearchVal(event.target.value);
  };

  const handleLikes = (id) => {
    const updatedPosts = posts?.map((postObj) => {
      if (postObj.id === id) postObj.likes = postObj.likes + 1;
      return postObj;
    });
    setPosts(updatedPosts);
  };

  const handleMorePosts = () => {
    setPage(page + 1);
  };

  return (
    <div>
      <Search value={searchVal} onChange={handleChange} />
      <div className="postContainer">
        {filteredPosts.length > 0
        ? filteredPosts.map((postObj) => (
          <Post
          key={postObj.id}
          id = {postObj.id}
          title = {postObj.title}
          likes = {postObj.likes}
          imgUrl = {`https://picsum.photos/200?random=${postObj.id}`}
          handleLikes = {handleLikes} />
        ))
         : "Loading..." }
      </div>
      <button onClick={handleMorePosts} className="loadPostBtn">Load More Posts</button>
    </div>
  );
};

export default App;
