import { Text } from "@mantine/core";
import { Button, Container, Grid, Grow } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getPosts } from "../../actions/posts";
import PostForm from "../../components/Social/PostForm/PostForm";
import Posts from "../../components/Social/Posts/Posts";

const PostPage = () => {
  const [currentId, setCurrentId] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    setCurrentId(null);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);
  return (
    <div>
      <Grow in>
        <Container>
          <Grid
            container
            justifyContent="space-between"
            alignItems="stretch"
            spacing={3}
          >
            {" "}
            <Grid item>
              <Text className="text-2xl font-bold"> BeSocial Posts </Text>
            </Grid>
            <Grid item>
              <Button
                style={{
                  backgroundColor: "#D580FF",
                }}
                onClick={handleOpen}
                variant="contained"
              >
                Create Post
              </Button>
              <PostForm
                currentId={currentId}
                setCurrentId={setCurrentId}
                open={open}
                setOpen={setOpen}
                handleOpen={handleOpen}
                handleClose={handleClose}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Posts currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </div>
  );
};

export default PostPage;
