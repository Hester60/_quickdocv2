import { MenuItem, Typography } from "@mui/material";
import { useState } from "react";
import RemoveProjectDialog from "../../../Project/RemoveProject/RemoveProjectDialog";

export default function RemoveProjectMenuItem() {

  const [open, setOpen] = useState(false);

  return (
    <>
      <MenuItem onClick={() => {setOpen(true);}}><Typography color="error">Remove project</Typography></MenuItem>
      <RemoveProjectDialog open={open} setOpen={setOpen}/>
    </>
  )
}
