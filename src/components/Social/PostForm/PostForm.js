import { Group, Modal, Textarea, TextInput } from "@mantine/core";
import FileBase from "react-file-base64";
import { Button, Paper, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost, getPosts, updatePost } from "../../../actions/posts";
import useStyles from "./styles";

const PostForm = ({
  currentId,
  setCurrentId,
  open,
  setOpen,
  handleOpen,
  handleClose,
}) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const post = useSelector((state) =>
    currentId ? state.posts.find((p) => p._id === currentId) : null
  );

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  const clear = () => {
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
    setCurrentId(null);
  };

  useEffect(() => {
    if (post) {
      setPostData(post);
    } else {
      setPostData({
        title: "",
        message: "",
        tags: "",
        selectedFile: "",
      });
    }
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === null) {
      await dispatch(
        createPost({
          ...postData,
          name: user?.result?.name,
          creator: user?.result?._id,
        })
      );

      clear();
    } else {
      await dispatch(
        updatePost(currentId, { ...postData, name: user?.result?.name })
      ).then(dispatch(getPosts()));

      clear();
    }
    handleClose();
  };

  const notdisabled =
    Object.values(postData).every((postField) => postField.length !== 0) ||
    currentId !== null;

  return (
    <>
      <Modal opened={open} onClose={() => setOpen(false)}>
        <Paper className={`${classes.root} ${classes.form} p-2`}>
          <form
            autoComplete="off"
            noValidate
            className={classes.form}
            onSubmit={handleSubmit}
          >
            <Typography variant="h6">
              {currentId ? "Editing" : "Creating"} a task
            </Typography>

            <TextInput
              label="Title"
              required
              className="w-full p-2"
              size="lg"
              placeholder="Title"
              value={postData.title}
              onChange={(e) =>
                setPostData({ ...postData, title: e.target.value })
              }
            />
            <Textarea
              label="Message"
              className="w-full p-2"
              required
              size="lg"
              placeholder="Message"
              value={postData.message}
              onChange={(e) =>
                setPostData({ ...postData, message: e.target.value })
              }
            />
            <TextInput
              label="Tags"
              required
              className="w-full p-2"
              size="lg"
              placeholder="Tags"
              value={postData.tags}
              onChange={(e) =>
                setPostData({ ...postData, tags: e.target.value.split(",") })
              }
            />
            <div className={classes.fileInput}>
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  setPostData({ ...postData, selectedFile: base64 })
                }
              />
            </div>

            <Group position="right">
              <Button
                variant="contained"
                color="primary"
                disabled={!notdisabled}
                type="submit"
              >
                Submit
              </Button>
              <Button variant="contained" onClick={clear}>
                Clear
              </Button>
            </Group>
          </form>
        </Paper>
      </Modal>
    </>
  );
};

export default PostForm;
