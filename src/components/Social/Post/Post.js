import {
  ActionIcon,
  Card,
  Group,
  Image,
  Menu,
  Stack,
  Text,
} from "@mantine/core";
import { Button } from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import moment from "moment";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/posts";
import { titleCase } from "../../../functions/upperCase";

import { DeleteIcon, DropdownMenuIcon, EditIcon } from "../../Icon";
import PostForm from "../PostForm/PostForm";

const Post = ({ post, currentId, setCurrentId }) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  const [formOpen, setFormOpen] = useState(false);

  const handleOpen = () => setFormOpen(true);
  const handleClose = () => {
    setFormOpen(false);
  };

  const Likes = () => {
    if (post?.likes?.length > 0) {
      return post?.likes?.find(
        (like) => like === (user?.result?.googleId || user?.result?._id)
      ) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {post?.likes?.length > 2
            ? `You and ${post?.likes?.length - 1} others`
            : `${post?.likes?.length} like${
                post?.likes?.length > 1 ? "s" : ""
              }`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{post?.likes?.length}{" "}
          {post?.likes?.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  return (
    <>
      <PostForm
        currentId={currentId}
        setCurrentId={setCurrentId}
        open={formOpen}
        setOpen={setFormOpen}
        handleOpen={handleOpen}
        handleClose={handleClose}
      />
      <Card className="flex justify-between flex-col w-full  h-fixed rounded-md h-96 relative">
        <Card.Section>
          <Image src={post.selectedFile} height={160} alt="Uploaded Photo" />
        </Card.Section>
        <Group position="apart">
          <Text className="font-bold">{post?.name}</Text>
          {user?.result?._id === post?.creator && (
            <Menu withinPortal position="bottom-end" shadow="sm">
              <Menu.Target>
                <ActionIcon>
                  <DropdownMenuIcon size={16} />
                </ActionIcon>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item
                  onClick={() => {
                    setCurrentId(post._id);
                    setFormOpen(true);
                  }}
                  icon={<EditIcon />}
                >
                  Edit
                </Menu.Item>
                <Menu.Item
                  onClick={() => {
                    dispatch(deletePost(post._id));
                  }}
                  icon={<DeleteIcon size={14} />}
                  color="red"
                >
                  Delete
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          )}
        </Group>
        <Text weight={700} className="text-2xl">
          {post.title}
        </Text>
        <Text className="text-gray-700 text-sm">
          {post?.tags?.map((tag) => `#${tag} `)}
        </Text>
        <Stack>
          <Text color="gray">{moment(post.createdAt).fromNow()}</Text>

          <Text className="line-clamp-2">{post.message}</Text>
          <Group postion="left">
            <Button
              size="small"
              color="primary"
              disabled={!user?.result}
              onClick={() => {
                dispatch(likePost(post._id));
              }}
            >
              <Likes />
            </Button>
          </Group>
        </Stack>
      </Card>
    </>
  );
};

export default Post;
