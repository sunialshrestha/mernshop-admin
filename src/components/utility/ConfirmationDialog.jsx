import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const ConfirmationDialog = (props) => {
  const { message, onDialog, nameProduct } = props;
  return (
    <div>
      <Dialog
        open={true}
        onClose={() => onDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{message}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {nameProduct}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onDialog(true)}>Delete</Button>
          <Button onClick={() => onDialog(false)} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ConfirmationDialog;
