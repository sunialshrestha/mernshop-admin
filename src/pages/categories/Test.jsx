import * as React from "react";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import TreeView from "@mui/lab/TreeView";
import TreeItem, { useTreeItem } from "@mui/lab/TreeItem";
import clsx from "clsx";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const CustomContent = React.forwardRef(function CustomContent(props, ref) {
  const {
    classes,
    label,
    nodeId,
    icon: iconProp,
    expansionIcon,
    displayIcon,
    onDelete,
  } = props;

  const {
    disabled,
    expanded,
    selected,
    focused,
    handleExpansion,
    handleSelection,
    preventSelection,
  } = useTreeItem(nodeId);

  const icon = iconProp || expansionIcon || displayIcon;
  const handleDelete = () => onDelete(nodeId);

  return (
    <div
      className={clsx(classes.root, {
        [classes.expanded]: expanded,
        [classes.selected]: selected,
        [classes.focused]: focused,
        [classes.disabled]: disabled,
      })}
      onMouseDown={preventSelection}
      ref={ref}
    >
      <span onClick={handleExpansion} className={classes.iconContainer}>
        {icon}
      </span>

      <Typography
        onClick={handleSelection}
        component="span"
        className={classes.label}
      >
        {label}
      </Typography>
      <IconButton size="small" onClick={handleDelete}>
        <DeleteIcon fontSize="small" />
      </IconButton>
    </div>
  );
});

function MyTreeItem(props) {
  return (
    <TreeItem
      {...props}
      ContentComponent={CustomContent}
      ContentProps={{
        onDelete: (nodeId) => console.log("delete", nodeId),
      }}
    />
  );
}

export default function ControlledTreeView() {
  return (
    <TreeView
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      <MyTreeItem nodeId="1" label="Applications">
        <MyTreeItem nodeId="2" label="Calendar" />
        <MyTreeItem nodeId="3" label="Chrome" />
        <MyTreeItem nodeId="4" label="Webstorm" />
      </MyTreeItem>
      <MyTreeItem nodeId="5" label="Documents">
        <MyTreeItem nodeId="6" label="Material-UI">
          <MyTreeItem nodeId="7" label="src">
            <MyTreeItem nodeId="8" label="index.js" />
            <MyTreeItem nodeId="9" label="tree-view.js" />
          </MyTreeItem>
        </MyTreeItem>
      </MyTreeItem>
    </TreeView>
  );
}
