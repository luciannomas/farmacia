"use client"
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function ResetPassword({ params }) {
    const [error, setError] = React.useState("");
    const [verify, setVerify] = React.useState(false);
    const [user, setUser] = React.useState(null);
    const router = useRouter();

    React.useEffect(() => {

        const verifyToken = async () => {
            try {
                /* const res = await fetch("/api/auth/verify", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        token: params.token
                    })
                }); */
                const res = await axios.post("/api/auth/verify", {
                    token: params.token
                });
                
                if (res.status == 400) {
                    setError("Invalid token or has expired");
                    setVerify(true);
                }

                if (res.status == 200) {
                    setError("");
                    setVerify(true);
                    const userData = res.data;
                    setUser(userData);
                    //router.push("/login")
                }
            } catch (error) {
                setError("Error try again!!");
                console.log("error", error)
            }
        }

        verifyToken();

    }, [params.token])

    React.useEffect(() => {
        /* const { data: session, status: sessionStatus } = useSession();

        useEffect(() => {
            if (sessionStatus === "authenticated") {
                router.replace("/dashboard");
            }
        }, [sessionStatus, router]); */


    })

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
            const formData = new FormData(event.currentTarget);
            const res = await fetch("/api/auth/reset", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    password: formData.get("password"),
                    email: user.email
                })
            });

            if (res.status == 400) {
                setError("Something web wrong, try again");
            }

            if (res.status == 200) {
                setError("");
                router.push("/login")
            }
        } catch (error) {
            setError("Error try again!!");
            console.log("error", error)
        }
    };

    // if (sessionStatus === "loading")
    /* if ( true && !verify ) {
        return <h1>Loading...</h1>;
    }
     */
    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Reset password
                    </Typography>
                    {error && <Box style={{ color: 'red', fontSize: 'small', marginTop: '15px' }}>{error}</Box>}
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="password"
                            label="Password Address"
                            name="password"
                            autoComplete="password"
                            autoFocus
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Reset
                        </Button>

                        <Grid container>
                            <Grid item xs>
                                <Link href="/login" variant="body2">
                                    Return to login
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="register" variant="body2">
                                    {"Register"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}
