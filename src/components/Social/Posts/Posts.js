import React from "react";
import { Grid } from "@material-ui/core";
import { useSelector } from "react-redux";
import { Text } from "@mantine/core";
import Post from "../Post/Post";

const Posts = ({ currentId, setCurrentId }) => {
  const posts = useSelector((state) => state.posts);

  return !posts.length ? (
    <Text>No Posts</Text>
  ) : (
    <Grid
      className="flex items-center"
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={6} md={6}>
          <Post post={post} currentId={currentId} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
