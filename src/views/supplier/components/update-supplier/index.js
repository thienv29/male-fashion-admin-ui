import * as React from 'react';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useDispatch, useSelector } from 'react-redux';
import { closeAddSupplier, closeUpdateSupplier, setLoading, setSelected, setUpdateSupplier } from '../../slice';
import { Avatar, Grid, IconButton, Typography } from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import SupplierService from '../../../../services/supplier.service';
import { PhotoCamera } from '@mui/icons-material';
import LoadingSpinner from '../../../../ui-component/loading';
import { convertBase64 } from '../../../../core/utils/base64';
import { notifyErrorMessage } from '../../../../core/utils/notify-action';

const UpdateSupplier = ({ saveCompleteEvent }) => {
    const [supplierOld,setSupplierOld] = useState(undefined);
    const state = useSelector(state => state.supplier);
    const dispatch = useDispatch();
    useEffect(() => {
        getSupplierById();
    }, [state.selected[0]]);

    const getSupplierById = async () => {
        if (state.selected[0]) {
            const data = await SupplierService.getById(state.selected[0]);
            if (data.result) {
                setSupplierOld(data.result);
            }else{
                dispatch(closeUpdateSupplier());
            }
        }

    };
    const handleClose = () => {
        dispatch(closeUpdateSupplier());
    };
    const handleUpdateSupplier = async (values) => {
        const supplier = {
            ...supplierOld,
            ...values,
        }
        const data = await SupplierService.update(supplier);
        if (data) {
            saveCompleteEvent();
            dispatch(closeUpdateSupplier());
            dispatch(setSelected([]));
        }
    };
    const handleChangeMainImage = async (event) => {
        if (!validateSizeImage(event)) return;
        const base64 = await convertBase64(event.target.files[0]);
        setSupplierOld({...supplierOld, avatar: base64});
    };
    const validateSizeImage = (event) => {
        if (event.target.files[0].size > 300000) {
            notifyErrorMessage('Dung lượng ảnh quá lớn');
            return false;
        }
        return true;
    };
    return (

        <Dialog open={state.updateSupplier} onClose={handleClose}>
            <Typography variant={'h3'} margin={2}>Cập nhật Nhà cung cấp</Typography>
            {!supplierOld ? <LoadingSpinner /> :
                <Formik
                    initialValues={{
                        firstName: supplierOld.firstName,
                        lastName: supplierOld.lastName,
                        phone: supplierOld.phone,
                        birthday: supplierOld.birthday,
                        email: supplierOld.email,
                        address: supplierOld.address,
                        password: ''
                    }}
                    validationSchema={Yup.object().shape({
                        firstName: Yup.string().max(255).required('Vui lòng nhập name'),
                        lastName: Yup.string().max(255).required('Vui lòng nhập tên'),
                        phone: Yup.string().max(255).required('Vui lòng nhập số điện thoại'),
                        birthday: Yup.date(),
                        email: Yup.string().max(255).required('Vui lòng nhập email'),
                        address: Yup.string().max(255).required('Vui lòng nhập địa chỉ'),
                        password: Yup.string()
                    })}
                    onSubmit={handleUpdateSupplier}
                >
                    {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                        <form noValidate onSubmit={handleSubmit}>
                            <DialogContent>
                                <Grid container spacing={2}>
                                    <Grid container item xs={12} justifyContent={'center'} alignItems={'center'}>

                                        <IconButton color='primary' aria-label='upload picture'
                                                    component='label'>
                                            <input hidden accept='image/*'
                                                   onChange={handleChangeMainImage}
                                                   type='file' />
                                            <Avatar
                                                src={supplierOld.avatar}
                                                style={{
                                                    margin: '10px',
                                                    width: '60px',
                                                    height: '60px'
                                                }}
                                            />
                                            <PhotoCamera sx={{ position: 'absolute', bottom: '10px', right: '10px' }} />
                                        </IconButton>

                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField fullWidth
                                                   value={values.firstName}
                                                   onChange={handleChange}
                                                   label='Tên'
                                                   name='firstName'
                                                   size='small'
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField fullWidth
                                                   value={values.lastName}
                                                   onChange={handleChange}
                                                   label='Họ'
                                                   name='lastName'
                                                   size='small'
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField fullWidth
                                                   value={values.email}
                                                   onChange={handleChange}
                                                   label='Email'
                                                   name='email'
                                                   size='small'
                                                   autocomplete="off"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField fullWidth
                                                   value={values.phone}
                                                   onChange={handleChange}
                                                   label='Số điện thoại'
                                                   name='phone'
                                                   size='small'
                                                   autocomplete="off"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField fullWidth
                                                   value={values.address}
                                                   onChange={handleChange}
                                                   label='Địa chỉ'
                                                   name='address'
                                                   size='small'
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField fullWidth
                                                   value={values.birthday}
                                                   onChange={handleChange}
                                                   label='Ngày sinh'
                                                   name='birthday'
                                                   size='small'
                                                   type={'date'}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField fullWidth
                                                   value={values.password}
                                                   onChange={handleChange}
                                                   label='Mật khẩu'
                                                   name='password'
                                                   size='small'
                                                   type={'password'}
                                                   autocomplete="off"
                                        />
                                    </Grid>
                                </Grid>
                            </DialogContent>
                            <DialogActions sx={{ justifyContent: 'space-between', marginTop: 2 }}>
                                <Button onClick={handleClose}>Hủy</Button>
                                <Button type={'submit'}>Cập nhật</Button>
                            </DialogActions>
                        </form>
                    )}
                </Formik>}
        </Dialog>

    );

};
export default UpdateSupplier;
