import * as React from 'react';
import { useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useDispatch, useSelector } from 'react-redux';
import { closeAddBuyOrder, setListSupplier, setLoading, setSupplierSelected } from '../../slice';
import { Divider, FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Select, Typography } from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import BuyOrderService from '../../../../services/buy-order.service';
import LoadingSpinner from '../../../../ui-component/loading';
import SupplierService from '../../../../services/supplier.service';

const AddBuyOrder = ({ saveCompleteEvent }) => {
    const state = useSelector(state => state.buyOrder);
    const dispatch = useDispatch();

    useEffect(() => {
        getSupplier();
    }, []);
    const getSupplier = async () => {
        dispatch(setLoading(true));
        const data = await SupplierService.getAll();
        if (data) {
            dispatch(setListSupplier(data.result || []));
            dispatch(setLoading(false));
        }
    };

    const handleClose = () => {
        dispatch(closeAddBuyOrder());
    };
    const handleAddBuyOrder = async (values) => {
        const data = await BuyOrderService.create(values);
        if (data) {
            saveCompleteEvent();
            dispatch(closeAddBuyOrder());
        }
    };

    return (

        <Dialog open={state.addBuyOrder} onClose={handleClose}>
            <Typography variant={'h3'} margin={2}>Cập nhật sản phẩm</Typography>
            {state.loading ? <LoadingSpinner /> :
                <Formik
                    initialValues={{
                        code: '',
                        description: ''

                    }}
                    validationSchema={Yup.object().shape({
                        code: Yup.string().max(255).required('Vui lòng nhập mã sản phẩm'),
                        description: Yup.string().max(255).required('Vui lòng nhập Diễn giải')
                    })}
                    onSubmit={handleAddBuyOrder}
                >
                    {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                        <form noValidate onSubmit={handleSubmit}>
                            <DialogContent>
                                <Grid container spacing={2}>

                                    <Grid item xs={4}>
                                        <FormControl fullWidth size='small' error={Boolean(touched.code && errors.code)}
                                        >
                                            <InputLabel htmlFor='product-code'>Code</InputLabel>
                                            <OutlinedInput
                                                id='product-code'
                                                type='text'
                                                value={values.code}
                                                name='code'
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                label='Code'
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <FormControl fullWidth size='small' error={Boolean(touched.name && errors.name)}
                                        >
                                            <InputLabel htmlFor='product-name'>Diễn giải</InputLabel>
                                            <OutlinedInput
                                                id='product-name'
                                                type='text'
                                                value={values.name}
                                                name='name'
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                label='Diễn giải'
                                            />
                                        </FormControl>
                                    </Grid>


                                    <Grid item xs={4}>
                                        <FormControl size={'small'} fullWidth>
                                            <InputLabel id='product-supplier'>Nhà cung cấp</InputLabel>
                                            <Select
                                                id='product-supplier'
                                                onChange={(evt) => dispatch(setSupplierSelected(evt.target.value))}
                                                input={<OutlinedInput label='Nhà cung cấp' />}
                                                defaultValue={state.listSuppliers[0]._id}
                                            >
                                                {state.listSuppliers.map((supplierItm) => (
                                                    <MenuItem
                                                        key={supplierItm._id}
                                                        value={supplierItm._id}
                                                    >
                                                        {supplierItm.sortName + ' - ' + supplierItm.phone}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>


                                    <Grid item xs={12}>
                                        <Divider />
                                    </Grid>


                                </Grid>

                            </DialogContent>
                            <DialogActions sx={{ justifyContent: 'space-between', marginTop: 2 }}>
                                <Button onClick={handleClose}>Hủy</Button>
                                <Button type={'submit'}>Cập nhật</Button>
                            </DialogActions>
                        </form>
                    )}
                </Formik>
            }
        </Dialog>

    );
};
export default AddBuyOrder;
