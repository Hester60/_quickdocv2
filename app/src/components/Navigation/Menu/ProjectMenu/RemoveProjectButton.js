import {useState} from "react";
import {Button} from "@mui/material";
import RemoveProjectDialog from "../../../Project/RemoveProject/RemoveProjectDialog";

export default function RemoveProjectButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button color="inherit" onClick={() => setOpen(true)}>Remove project</Button>
      <RemoveProjectDialog open={open} setOpen={setOpen} />
    </>
  )

}
