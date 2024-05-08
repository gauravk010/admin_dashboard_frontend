import { HiOutlineViewGrid, HiOutlineCube, HiOutlineCog, HiLogout, HiOutlineShoppingCart, HiOutlineUsers} from "react-icons/hi";

export const Dashboard_Sidebar_Links = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: "/",
    icon: <HiOutlineViewGrid />,
  },
  {
    key: "products",
    label: "Products",
    path: "/products",
    icon: <HiOutlineCube />,
  },
  {
		key: 'orders',
		label: 'Orders',
		path: '/orders',
		icon: <HiOutlineShoppingCart />
	},
	{
		key: 'Users',
		label: 'Users',
		path: '/users',
		icon: <HiOutlineUsers />
	},
];

export const Dashboard_Sidebar_Bottom_Links = [
    {
      key: "settings",
      label: "Settings",
      path: "/profile",
      icon: <HiOutlineCog />,
    },
    {
      key: "logout",
      label: "Logout",
      path: "/logout",
      icon: <HiLogout />,
    },
  ];
