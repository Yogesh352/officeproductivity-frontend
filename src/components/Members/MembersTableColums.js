import { format } from "date-fns";
import moment from "moment";
import { titleCase } from "../../functions/upperCase";

export const columns = [
  {
    field: "name",
    headerName: "Name",
    width: 150,
    editable: true,
  },
  {
    field: "email",
    headerName: "Email",
    width: 380,
    editable: true,
  },
  {
    field: "createdAt",
    headerName: "Joined On",
    width: 300,
    type: Date,
    editable: true,
    valueFormatter: (params) => moment(params?.value).format("DD-MM-YYYY"),
  },
  {
    field: "status",
    headerName: "Online",
    width: 200,

    editable: true,
  },
];
