import { Button } from "@mui/material";

function ButtonUI({
  onClick,
  size,
  variant,
  disabled,
  styles,
  disableElevation,
  href,
  children,
  disableRipple,
  type
}) {
  // Create an object to hold the conditional props
  const buttonProps = {
    ...(size && { size }),
    ...(variant && { variant }),
    ...(disableElevation && { disableElevation }),
    ...(disableRipple && { disableRipple }),
    ...(href && { href }),
    ...(disabled && { disabled }),
    ...(type && { type }),
  };
  
  return (
    <Button {...buttonProps} onClick={onClick} sx={styles}>
      {children}
    </Button>
  );
}

export default ButtonUI;
