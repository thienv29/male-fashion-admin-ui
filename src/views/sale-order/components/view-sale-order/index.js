import * as React from 'react';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useDispatch, useSelector } from 'react-redux';
import { closeViewSaleOrder } from '../../slice';
import { Divider, FormControl, Grid, InputAdornment, InputLabel, OutlinedInput, Typography } from '@mui/material';
import LoadingSpinner from '../../../../ui-component/loading';
import SaleOrderService from '../../../../services/sale-order.service';
import UpdateStatusSaleOrder from '../update-status-sale-order';

const ViewSaleOrder = ({saveComplete}) => {
    const [saleOrderFull, setSaleOrderFull] = useState({
        listDetails: []
    });
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [showStatus, setShowStatus] = useState(true);
    const state = useSelector(state => state.saleOrder);
    const dispatch = useDispatch();

    useEffect(() => {
        getSaleOrderFull();
    }, [state.selected[0]]);

    const getSaleOrderFull = async () => {
        setLoading(true);
        if (state.selected[0]) {
            const data = await SaleOrderService.getFullById(state.selected[0]);
            if (data.result) {
                setSaleOrderFull(data.result);
                console.log(data.result);
                calculateTotal(data.result);
            }
        }
        setLoading(false);

    };
    const calculateTotal = (saleOrderFull) => {
        let total = 0;
        saleOrderFull.listDetails.forEach(e => {
            total += e.price * e.quantity;
        });
        setTotal(total);
    };

    const handleClose = () => {
        dispatch(closeViewSaleOrder());
    };

    const closeUpdateStatus = () => {
        setShowStatus(false);
    }


    return (
        <Dialog open={state.viewSaleOrder} onClose={handleClose} maxWidth={'md'}>
            <Typography variant={'h3'} margin={2}>Xem ????n h??ng</Typography>
            {loading ? <LoadingSpinner /> :
                <form noValidate>
                    <DialogContent>
                        <Grid container spacing={2}>

                            <Grid item xs={4}>
                                <FormControl fullWidth size='small'
                                >
                                    <InputLabel htmlFor='product-code'>Code</InputLabel>
                                    <OutlinedInput
                                        id='product-code'
                                        type='text'
                                        label='Code'
                                        value={saleOrderFull.code}

                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl  fullWidth size='small'

                                >
                                    <InputLabel htmlFor='product-createdBy'>Ng?????i t???o</InputLabel>
                                    <OutlinedInput
                                        id='product-createdBy'
                                        type='text'
                                        label='Code'
                                        value={saleOrderFull.user ? saleOrderFull.user.firstName + ' ' + saleOrderFull.user.lastName : ''}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl  fullWidth size='small'

                                >
                                    <InputLabel htmlFor='product-code'>Ng??y t???o</InputLabel>
                                    <OutlinedInput
                                        type='text'
                                        name='createdAt'
                                        value={saleOrderFull.createdAt ? saleOrderFull.createdAt.split('T')[0] : ''}
                                    />
                                </FormControl>
                            </Grid>


                            <Grid item xs={4}>
                                <FormControl  fullWidth size='small'

                                >
                                    <InputLabel htmlFor='product-code'>Ph????ng th???c thanh to??n</InputLabel>
                                    <OutlinedInput
                                        type='text'
                                        name='createdAt'
                                        label='Ph????ng th???c thanh to??n'
                                        value={saleOrderFull.paymentMethod}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={8}>
                                <FormControl fullWidth size='small'
                                >
                                    <InputLabel htmlFor='product-description'>Di???n gi???i</InputLabel>
                                    <OutlinedInput
                                        id='product-description'
                                        type='text'
                                        name='description'
                                        label='Di???n gi???i'
                                        value={saleOrderFull.description}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl fullWidth size='small'
                                >
                                    <InputLabel htmlFor='product-description'>Ghi ch?? c???a kh??ch h??ng</InputLabel>
                                    <OutlinedInput

                                        id='product-description'
                                        label='Ghi ch?? kh??ch h??ng'
                                        value={saleOrderFull.note}
                                    />
                                </FormControl>
                            </Grid>


                            <Grid item xs={12}>
                                <Divider />
                            </Grid>
                            <br />
                            <Grid item xs={12}>
                                <Typography variant={'h4'}> Th??ng tin ng?????i nh???n</Typography>
                            </Grid>
                            <br />
                            <Grid item xs={4}>
                                <FormControl fullWidth size='small'
                                >
                                    <InputLabel htmlFor='product-description'>H??? t??n</InputLabel>
                                    <OutlinedInput

                                        id='product-description'
                                        label='T??n'
                                        value={saleOrderFull.firstName + ' ' + saleOrderFull.lastName}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl fullWidth size='small'
                                >
                                    <InputLabel htmlFor='product-phone'>SDT</InputLabel>
                                    <OutlinedInput

                                        id='product-phone'
                                        label='T??n'
                                        value={saleOrderFull.phone}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl fullWidth size='small'
                                >
                                    <InputLabel htmlFor='product-phone'>Email</InputLabel>
                                    <OutlinedInput

                                        id='product-phone'
                                        label='T??n'
                                        value={saleOrderFull.email}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth size='small'
                                >
                                    <InputLabel htmlFor='product-phone'>?????a ch???</InputLabel>
                                    <OutlinedInput

                                        id='product-phone'
                                        label='?????a ch???'
                                        value={saleOrderFull.address}
                                    />
                                </FormControl>
                            </Grid>

                        </Grid>
                        <br/>
                        <Grid item xs={12}>
                            <Divider />
                        </Grid>
                        <br/>

                        <Grid container>
                            <Typography variant={'h4'} marginBottom={2}> Chi ti???t nh???p h??ng (M?? v?? t??n s???n ph???m, s???
                                l?????ng, gi??
                                nh???p)</Typography>
                        </Grid>
                        <Grid container maxHeight={300} style={{ overflowY: 'scroll' }}>
                            {saleOrderFull.listDetails.map((e, index) => {
                                return (
                                    <Grid item container spacing={1} xs={12} marginTop={1}
                                          key={e.productDetail._id}>
                                        <Grid item xs={8}>
                                            <FormControl fullWidth size='small'>
                                                <OutlinedInput
                                                    type='text'

                                                    value={e.productDetail.code + ' - ' + e.product.name}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <FormControl fullWidth size='small'>
                                                <OutlinedInput
                                                    type='number'
                                                    value={e.quantity}

                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <FormControl fullWidth size='small'>
                                                <OutlinedInput
                                                    type='number'
                                                    value={e.price}
                                                    endAdornment={<InputAdornment
                                                        position='end'>$</InputAdornment>}
                                                />
                                            </FormControl>
                                        </Grid>
                                    </Grid>);
                            })}

                        </Grid>
                        {saleOrderFull.listDetails.length > 0 ?
                            <Grid container item marginTop={2}>
                                <Grid item xs={8}>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography variant={'h4'} textAlign={'right'}>T???ng
                                        c???ng: {total}$</Typography>
                                </Grid>
                            </Grid>
                            : ''}

                    </DialogContent>
                    <DialogActions sx={{ justifyContent: 'space-between'}}>
                        <Button onClick={handleClose}>H???y</Button>
                        <Button onClick={()=> setShowStatus(!showStatus)}>C???p nh???t tr???ng th??i</Button>
                    </DialogActions>
                    <UpdateStatusSaleOrder saleOrderFull={saleOrderFull} showStatus={showStatus} closeUpdateStatus={closeUpdateStatus} saveComplete={saveComplete}/>
                </form>
            }
        </Dialog>

    );
};
export default ViewSaleOrder;
