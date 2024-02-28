"use client";

import DashLayout from '../../ui/layouts/DashLayout/page'
import Typography from '@mui/material/Typography';

import MUIDataTable from "mui-datatables";
import Box  from '@mui/material/Box';

const columns = [
    {
        name: "name",
        label: "Name",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "company",
        label: "Company",
        options: {
            filter: true,
            sort: false,
        }
    },
    {
        name: "city",
        label: "City",
        options: {
            filter: true,
            sort: false,
        }
    },
    {
        name: "state",
        label: "State",
        options: {
            filter: true,
            sort: false,
        }
    },
];

const data = [
    { name: "albert Dibu", company: "Test Corp", city: "Yonkers", state: "NY" },
    { name: "boris Walsh", company: "Test Corp", city: "Hartford", state: "CT" },
    { name: "luchito Herm", company: "Test Corp", city: "Tampa", state: "FL" },
    { name: "eldiego Armando", company: "Test Corp", city: "Dallas", state: "TX" },
    { name: "Martín Palermo", company: "Test Corp", city: "Yonkers", state: "NY" },
    { name: "John Rich", company: "Test Corp", city: "Hartford", state: "CT" },
    { name: "Ricky Bap", company: "Test Corp", city: "Tampa", state: "FL" },
    { name: "James pol", company: "Test Corp", city: "Dallas", state: "TX" },
    { name: "Joe Kepchun", company: "Test Corp", city: "Yonkers", state: "NY" },
    { name: "Raul Pax", company: "Test Corp", city: "Hartford", state: "CT" },
    { name: "Bob Ticol", company: "Test Corp", city: "Tampa", state: "FL" },
    { name: "James Houston", company: "Test Corp", city: "Dallas", state: "TX" },
];

const options = {
    filterType: 'checkbox',
};

export default function page() {
    return (
        <DashLayout>

            <Box>
                {/* <Typography style ={{ marginTop: '10px', marginLeft: '10px'}}> Tabla </Typography> */}
                <MUIDataTable
                    title={"Employee List"}
                    data={data}
                    columns={columns}
                    options={options}
                />
            </Box>
        </DashLayout>
    )
}
