/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import { Toolbar, Typography, Button, IconButton, Icon } from "@mui/material";
import {
  LeftIcon,
  LogoSmall,
  NavAppBar,
  NavLink,
  RightNav,
} from "./navbar.styled";
import Logo from "../images/buy_sale_logo.png";
import NotificationIcon from "../images/notification.svg";
import AvatarIcon from "../images/avatar.png";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import CartIcon from "@mui/icons-material/ShoppingCart";
import React, { useEffect } from "react";
import { AppCSS, LinkBtn, TapButton, TxtInput, TxtSearch } from "./index";
import { Link, useNavigate } from "react-router-dom";
import { RowDiv } from "./Misc/misc.styled";
import DownIcon from "@mui/icons-material/ArrowDropDown";
import UserIcon from "@mui/icons-material/Person";

import { useDispatch } from "react-redux";

import ExitIcon from "@mui/icons-material/LogoutRounded";
import { useAppSelector } from "../state/hooks";
import { userLogin } from "../state/reducers/userSlice";
import { UserModel } from "../types";

interface NavItemProps {
  title?: string;
  linkTo?: string;
  selected?: boolean;
  onClick?: Function;
  id?: string;
}

export const NavItem: React.FC<NavItemProps> = ({
  title,
  linkTo,
  selected,
}) => {
  return (
    <NavLink
      style={{
        border: selected ? "1px solid #E3E1E5" : "none",
      }}
      to={linkTo ? linkTo : "#"}
    >
      {title && title}
    </NavLink>
  );
};

export const NavItemProfile: React.FC<NavItemProps> = ({
  linkTo,
  title,
  onClick,
  id,
}) => {
  return (
    <Button
      id={id}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      variant="text"
      onClick={() => (onClick ? onClick() : {})}
    >
      <img src={AvatarIcon} width={38} height={38} />
      {title && (
        <label
          style={{
            color: "#2E2C34",
            fontSize: "13px",
            marginLeft: "10px",
          }}
        >
          {title}
        </label>
      )}
    </Button>
  );
};

interface ProfileProps {}

export const ProfileMenu: React.FC<ProfileProps> = ({}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const viewProfilePic = () => {
    const dp = localStorage.getItem("dp");
    if (dp !== null && dp.length > 0) {
      const url = false; // IMG_URL(dp);
      return url ? url : AvatarIcon;
    }
    return AvatarIcon;
  };

  const allowedMenu = () => {
    return (
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          style={{
            width: 200,
          }}
          onClick={() => {
            handleClose();
            navigate("/profile");
          }}
        >
          Profile
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            navigate("/orders");
          }}
        >
          Orders
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            navigate("/manage-products");
          }}
        >
          Manage Products
        </MenuItem>
        <MenuItem
          onClick={() => {
            localStorage.clear();
            dispatch(userLogin({} as UserModel));
            handleClose();
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    );
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textTransform: "none",
        }}
      >
        <RowDiv
          style={{
            alignItems: "center",
          }}
        >
          <img
            style={{
              borderRadius: "20px",
            }}
            src={viewProfilePic()}
            width={38}
            height={38}
          />
          <label
            style={{
              color: "#2E2C34",
              fontSize: "13px",
              marginLeft: "10px",
              marginRight: "10px",
            }}
          >
            Account
          </label>
          <DownIcon color="disabled" />
        </RowDiv>
      </Button>
      {allowedMenu()}
    </div>
  );
};

export const NavBar = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData !== null) {
      const auth = JSON.parse(userData) as unknown as UserModel;
      dispatch(userLogin(auth));
    }
  }, []);

  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event: any) {
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget);
    }
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const navigate = useNavigate();

  const profile = useAppSelector((state) => state.userReducer.userProfile);

  useEffect(() => {
    if (!profile.token) {
      navigate("/");
    }
  }, [profile]);

  const authMenu = () => {
    return (
      <RightNav
        style={{
          display: "flex",
          alignItems: "center",
          height: "6:D0px",
        }}
      >
        <Link to={"/cart"}>
          <IconButton
            style={{
              borderRadius: 21,
              height: 42,
              background: AppCSS.WHITE,
              paddingLeft: 20,
              paddingRight: 20,
            }}
          >
            <CartIcon style={{ color: AppCSS.ORANGE }} />
            <p
              style={{
                fontSize: 16,
                fontWeight: "300",
                marginLeft: 10,
                color: AppCSS.ORANGE,
              }}
            >
              Cart
            </p>
          </IconButton>
        </Link>
        <ProfileMenu />
      </RightNav>
    );
  };

  const displayLogo = () => {
    return <LogoSmall src={Logo} />;
  };
  const availableOptions = () => {
    if (profile.token) {
      return authMenu();
    } else {
      return (
        <RightNav
          style={{
            display: "flex",
          }}
        >
          <Link to={"/login"}>
            <IconButton
              style={{
                borderRadius: 21,
                height: 42,
                background: AppCSS.WHITE,
                paddingLeft: 20,
                paddingRight: 20,
              }}
            >
              <CartIcon style={{ color: AppCSS.ORANGE }} />
              <p
                style={{
                  fontSize: 16,
                  fontWeight: "300",
                  marginLeft: 10,
                  color: AppCSS.ORANGE,
                }}
              >
                Cart
              </p>
            </IconButton>
          </Link>
          <div>
            <Button
              style={{
                color: AppCSS.WHITE,
                marginLeft: 10,
                borderRadius: 40,
                height: 42,
                width: 100,
                background: AppCSS.ORANGE,
              }}
              aria-owns={anchorEl ? "simple-menu" : undefined}
              aria-haspopup="true"
              onClick={handleClick}
              onMouseOver={handleClick}
            >
              <UserIcon style={{ color: AppCSS.WHITE }} /> Login
            </Button>
            <Menu
              elevation={0}
              id="simple-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              MenuListProps={{ onMouseLeave: handleClose }}
            >
              <MenuItem>
                <div
                  style={{
                    display: "flex",
                    width: 200,
                    justifyContent: "space-between",
                  }}
                >
                  <Button
                    variant="text"
                    style={{
                      width: 10,
                      color: AppCSS.BLACK,
                    }}
                    onClick={() => {
                      handleClose();
                      navigate("/login");
                    }}
                  >
                    Login
                  </Button>
                  <Button
                    style={{
                      color: AppCSS.BLACK,
                      fontWeight: "600",
                      borderRadius: 10,
                      paddingLeft: 10,
                      paddingRight: 10,
                      textDecoration: "underline",
                    }}
                    variant="text"
                    onClick={() => {
                      handleClose();
                      navigate("/signup");
                    }}
                  >
                    User Signup
                  </Button>
                </div>
              </MenuItem>
              {profile.userType === "BUYER" && (
                <MenuItem
                  onClick={() => {
                    handleClose();
                    navigate("/seller-program");
                  }}
                >
                  Join Seller Program
                </MenuItem>
              )}

              {profile.userType === "SELLER" && (
                <MenuItem
                  onClick={() => {
                    handleClose();
                    navigate("/manage-products");
                  }}
                >
                  Manage Products
                </MenuItem>
              )}
            </Menu>
          </div>
        </RightNav>
      );
    }
  };

  return (
    <NavAppBar position="sticky" elevation={0}>
      <Toolbar>
        <LeftIcon
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ borderRadius: 0 }}
          style={{
            marginLeft: "10%",
          }}
          onClick={() => navigate("/")}
        >
          {displayLogo()}
        </LeftIcon>
        <div
          style={{
            justifyContent: "center",
            height: 42,
            justifyItems: "center",
            margin: 0,
            display: "flex",
            width: "60%",
          }}
        >
          <TxtSearch onChange={() => {}} placeholder="Search product" />
        </div>
        <Typography
          color="#414141"
          component="div"
          sx={{ flexGrow: 1 }}
        ></Typography>
        {availableOptions()}
      </Toolbar>
    </NavAppBar>
  );
};
