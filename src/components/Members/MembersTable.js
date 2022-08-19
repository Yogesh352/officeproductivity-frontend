import React from "react";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { columns } from "./MembersTableColums";

const MembersTable = () => {
  const members = useSelector((state) => state.auth);
  console.log(members);
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={members}
        columns={columns}
        getRowId={(member) => member._id}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
};

export default MembersTable;
