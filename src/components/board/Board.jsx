import React, { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, Container, Stack } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import CircularProgress from "@mui/material/CircularProgress";
import Chip from "@mui/material/Chip";
import Fab from "@mui/material/Fab";
import ToDo from "./list1/ToDo";
import InProgress from "./list2/InProgress";
import Completed from "./list3/Completed";
import AddIcon from "@mui/icons-material/Add";
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
import AddToDo from "./list1/AddToDo";
import AddInProgress from "./list2/AddInProgress";
import Details from "./Details";
import AddCompleted from "./list3/AddComplete";

const theme = createTheme({
    palette: {
        background: {
            default: "#F8F9FD",
        },
    },
});

export default function Board() {
    const [user, setUser] = useState(null);
    const [list, setList] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [openTodo, setOpenTodo] = useState(false);
    const [openInProgress, setOpenInProgress] = useState(false);
    const [openCompleted, setOpenCompleted] = useState(false);
    const [openDetails, setOpenDetails] = useState(false);
    const [details, setDetails] = useState(null);
    const goTo = useNavigate();
    // console.log(tasks);

    const openAddTodo = () => setOpenTodo(true);
    const closeAddTodo = () => setOpenTodo(false);
    const openAddInProgress = () => setOpenInProgress(true);
    const closeAddInProgress = () => setOpenInProgress(false);
    const openAddCompleted = () => setOpenCompleted(true);
    const closeAddCompleted = () => setOpenCompleted(false);

    const openShowDetails = (id) => {
        // console.log(id);
        // console.log(tasks.find(el => el._id === id))
        setDetails(tasks.find(el => el._id === id));
        setOpenDetails(true);
    }
    const closeShowDetails = () => {
        setDetails(null);
        setOpenDetails(false);
    }

    const fetchList = async () => {
        try {
            const response = await fetch(
                "https://thullo-backend.herokuapp.com/users"
            );
            const data = await response.json();
            setList(data);
        } catch (err) {
            console.log(err);
        }
    };

    const fetchTasks = async () => {
        try {
            const response = await fetch(
                "https://thullo-backend.herokuapp.com/tasks"
            );
            const data = await response.json();
            setTasks(data);
        } catch (err) {
            console.log(err);
        }
    };

    const logout = () => {
        localStorage.removeItem("thulloUser");
        setUser(null);
        goTo("/");
    }

    useEffect(() => {
        const data = localStorage.getItem("thulloUser");
        if (!data) {
            goTo("/");
        }
        setUser(JSON.parse(data));
        fetchList();
        fetchTasks();
        // eslint-disable-next-line
    }, []);

    return (
        <ThemeProvider theme={theme}>
            {!user && (
                <CircularProgress
                    color="primary"
                    sx={{
                        position: "fixed",
                        left: "inherit",
                        right: "inherit",
                        top: "inherit",
                        bottom: "inherit",
                    }}
                />
            )}
            {user && (
                <Container component="main" maxWidth="lg">
                    <CssBaseline />
                    <Stack direction="row" justifyContent="center">
                        <Box
                            sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                width: "33%",
                                justifyContent: "center",
                                "& > :nth-child(1)": {
                                    m: 1,
                                    width: "100%",
                                    minHeight: "90vh",
                                },
                            }}
                        >
                            <ToDo tasks={tasks} showDetails={openShowDetails} />
                            <Chip
                                icon={<AddIcon />}
                                label="Add new To Do task"
                                color="warning"
                                onClick={openAddTodo}
                            />
                            {list && (
                                <AddToDo
                                    open={openTodo}
                                    handleClose={closeAddTodo}
                                    list={list}
                                    user={user}
                                />
                            )}
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                width: "33%",
                                justifyContent: "center",
                                "& > :nth-child(1)": {
                                    m: 1,
                                    width: "100%",
                                    minHeight: "90vh",
                                },
                            }}
                        >
                            <InProgress tasks={tasks} showDetails={openShowDetails} />
                            <Chip
                                icon={<AddIcon />}
                                label="Add new In Progress task"
                                color="info"
                                onClick={openAddInProgress}
                            />
                            {list && (
                                <AddInProgress
                                    open={openInProgress}
                                    handleClose={closeAddInProgress}
                                    list={list}
                                    user={user}
                                />
                            )}
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                width: "33%",
                                justifyContent: "center",
                                "& > :nth-child(1)": {
                                    m: 1,
                                    width: "100%",
                                    minHeight: "90vh",
                                },
                            }}
                        >
                            <Completed tasks={tasks} showDetails={openShowDetails} />
                            <Chip
                                icon={<AddIcon />}
                                label="Add new Completed task"
                                color="success"
                                onClick={openAddCompleted}
                            />
                            {list && (
                                <AddCompleted
                                    open={openCompleted}
                                    handleClose={closeAddCompleted}
                                    list={list}
                                    user={user}
                                />
                            )}
                        </Box>
                    </Stack>
                    <Details open={openDetails} handleClose={closeShowDetails} details={details} />
                    <Fab variant="extended" size="small" sx={{ position: "absolute", bottom: "10px", right: "10px", p: 2 }} onClick={() => logout()}>
                        <LogoutIcon sx={{ mr: 1 }} />
                        Logout
                    </Fab>
                </Container>
            )}
        </ThemeProvider>
    );
}
