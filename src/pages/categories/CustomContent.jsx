import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import TreeView from "@material-ui/lab/TreeView";
import TreeItem, { useTreeItem } from "@material-ui/lab/TreeItem";
import clsx from "clsx";

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
      <div onClick={handleExpansion} className={classes.iconContainer}>
        {icon}
      </div>
      <IconButton size="small" onClick={handleDelete}>
        <DeleteIcon fontSize="small" />
      </IconButton>
      <Typography
        onClick={handleSelection}
        component="div"
        className={classes.label}
      >
        {label}
      </Typography>
    </div>
  );
});
