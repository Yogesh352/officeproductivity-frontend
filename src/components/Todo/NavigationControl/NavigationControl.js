import { useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { SegmentedControl } from "@mantine/core";

export default function NavigationControl() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentTab = useMemo(
    () => location.pathname.split("/").at(-1),
    [location]
  );

  return (
    <SegmentedControl
      data={[
        { label: "Pending", value: "pending" },
        { label: "Completed", value: "completed" },
      ]}
      value={currentTab}
      onChange={(value) => {
        if (value !== currentTab) {
          navigate(`/todo/${value}`);
        }
      }}
    />
  );
}
