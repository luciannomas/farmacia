"use client";
import { useSession, signOut } from "next-auth/react";
import DashLayout from '../ui/layouts/DashLayout/page'
import Typography  from '@mui/material/Typography';


function DashboardPage() {
  const { data: session, status } = useSession();

  console.log(session, status);

  return (
    <DashLayout>
        
        <Typography style ={{ marginTop: '10px', marginLeft: '10px'}}> aqui info user o ultimos movimientos.. </Typography>

    </DashLayout>
  );
}

export default DashboardPage;
