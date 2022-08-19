import { Box, Text } from "@mantine/core";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllUsers } from "../../actions/auth";
import MembersTable from "../../components/Members/MembersTable";

const Members = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);
  return (
    <>
      <Text className="text-2xl font-bold pb-6"> Members </Text>
      <Box className="bg-white p-10">
        <MembersTable />
      </Box>
    </>
  );
};

export default Members;
