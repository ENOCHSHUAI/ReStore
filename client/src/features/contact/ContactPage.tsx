import { Button, ButtonGroup, Typography, Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { decrement, increment } from "./counterSlice";

export default function ContactPage() {
    const dispatch = useAppDispatch();
    const { data, title } = useAppSelector((state => state.counter));

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant='h2' gutterBottom>
                {title}
            </Typography>

            <Typography variant='h4' gutterBottom>
                The data is: {data}
            </Typography>

            <ButtonGroup variant='contained'>
                <Button onClick={() => dispatch(decrement(1))} color='error'>Decrement</Button>
                <Button onClick={() => dispatch(increment(1))} color='primary'>Increment</Button>
                <Button onClick={() => dispatch(increment(5))} color='secondary'>Increment by 5</Button>
            </ButtonGroup>
        </Box>
    );
}
