import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LogoutIcon from '@mui/icons-material/Logout';
//import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";

export const ListItems = () => {
    const router = useRouter();

    const logout = async () => {

        try {
          const res = await axios.get("/api/auth/logout");
          console.log(res);
          router.push("/login")
        } catch (error) {
          console.error(error.message);
        }
        router.push("/login");
      };

    // console.log(session, status);
    return (
        <React.Fragment>
            <ListItemButton onClick={() => { router.push("/dashboard") }} >
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItemButton>
            <ListItemButton onClick={() => { router.push("/dashboard/profile") }}>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Profile" />
            </ListItemButton>
            <ListItemButton /* onClick={() => { router.push("/dashboard/categories") }} */ >
                <ListItemIcon>
                    {/* <DashboardIcon /> */}
                    <CategoryOutlinedIcon/>
                </ListItemIcon>
                <ListItemText primary="Categories" />
            </ListItemButton>
            <ListItemButton onClick={() => { router.push("/dashboard/products") }}>
                <ListItemIcon>
                    <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary="Products" />
            </ListItemButton>
            <ListItemButton>
                <ListItemIcon>
                    <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary="Reports" />
            </ListItemButton>
            <ListItemButton onClick={() => { logout() }}>
                <ListItemIcon>
                    <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="log out"  />
            </ListItemButton>
        </React.Fragment>
    )
};

