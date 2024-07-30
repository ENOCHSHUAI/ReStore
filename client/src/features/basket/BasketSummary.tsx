import { TableContainer, Paper, Table, TableBody, TableRow, TableCell, Typography } from "@mui/material";
import { currencyFormat } from "../../app/util/util";
import { useAppSelector } from "../../app/store/configureStore";

export default function BasketSummary() {
    const { basket } = useAppSelector(state => state.basket);
    const subtotal = basket?.items.reduce((sum, item) => sum + item.price * item.quantity, 0) ?? 0;
    const deliveryFee = subtotal > 10000 ? 0 : 500; // 假设超过100美元的订单免运费，其他的收取5美元运费

    return (
        <TableContainer component={Paper} variant={'outlined'} sx={{ mt: 2 }}>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell colSpan={2}>
                            <Typography variant="subtitle1">Subtotal</Typography>
                        </TableCell>
                        <TableCell align="right">
                            <Typography variant="subtitle1">{currencyFormat(subtotal)}</Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={2}>
                            <Typography variant="subtitle1">Delivery fee*</Typography>
                        </TableCell>
                        <TableCell align="right">
                            <Typography variant="subtitle1">{currencyFormat(deliveryFee)}</Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={2}>
                            <Typography variant="subtitle1">Total</Typography>
                        </TableCell>
                        <TableCell align="right">
                            <Typography variant="subtitle1">{currencyFormat(subtotal + deliveryFee)}</Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={3} align="right">
                            <Typography variant="body2" color="textSecondary" sx={{ fontStyle: 'italic' }}>
                                *Orders over $100 qualify for free delivery
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}
