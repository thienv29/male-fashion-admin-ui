import * as React from 'react';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useDispatch, useSelector } from 'react-redux';
import { closeUpdateSupplier, setSelected } from '../../slice';
import { Avatar, FormHelperText, Grid, IconButton, Typography } from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import SupplierService from '../../../../services/supplier.service';
import { PhotoCamera } from '@mui/icons-material';
import LoadingSpinner from '../../../../ui-component/loading';
import { convertBase64 } from '../../../../core/utils/base64';
import { notifyErrorMessage } from '../../../../core/utils/notify-action';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const UpdateSupplier = ({ saveCompleteEvent }) => {
    const [supplierOld, setSupplierOld] = useState(undefined);
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
            } else {
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
            ...values
        };

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
        setSupplierOld({ ...supplierOld, avatar: base64 });
    };
    const validateSizeImage = (event) => {
        if (event.target.files[0].size > 300000) {
            notifyErrorMessage('Dung l?????ng ???nh qu?? l???n');
            return false;
        }
        return true;
    };
    return (

        <Dialog open={state.updateSupplier} onClose={handleClose}>
            <Typography variant={'h3'} margin={2}>C???p nh???t Nh?? cung c???p</Typography>
            {!supplierOld ? <LoadingSpinner /> :
                <Formik
                    initialValues={{
                        firstName: supplierOld.firstName,
                        lastName: supplierOld.lastName,
                        phone: supplierOld.phone,
                        email: supplierOld.email,
                        address: supplierOld.address
                    }}
                    validationSchema={Yup.object().shape({
                        lastName: Yup.string().max(255).required('Vui l??ng nh???p t??n'),
                        phone: Yup.string().max(255).matches(phoneRegExp, 'S??? ??i???n tho???i kh??ng h???p l???').required('Vui l??ng nh???p s??? ??i???n tho???i'),
                        email: Yup.string().max(255).required('Vui l??ng nh???p email')
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
                                                   value={values.lastName}
                                                   onChange={handleChange}
                                                   label='T??n'
                                                   name='lastName'
                                                   size='small'
                                        />
                                        {touched.lastName && errors.lastName && (
                                            <FormHelperText error>
                                                {errors.lastName}
                                            </FormHelperText>
                                        )}
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField fullWidth
                                                   value={values.firstName}
                                                   onChange={handleChange}
                                                   label='H???'
                                                   name='firstName'
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
                                                   autocomplete='off'
                                        />
                                        {touched.email && errors.email && (
                                            <FormHelperText error>
                                                {errors.email}
                                            </FormHelperText>
                                        )}
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField fullWidth
                                                   value={values.phone}
                                                   onChange={handleChange}
                                                   label='S??? ??i???n tho???i'
                                                   name='phone'
                                                   size='small'
                                                   autocomplete='off'
                                        />
                                        {touched.phone && errors.phone && (
                                            <FormHelperText error>
                                                {errors.phone}
                                            </FormHelperText>
                                        )}
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField fullWidth
                                                   value={values.address}
                                                   onChange={handleChange}
                                                   label='?????a ch???'
                                                   name='address'
                                                   size='small'
                                        />
                                    </Grid>

                                </Grid>
                            </DialogContent>
                            <DialogActions sx={{ justifyContent: 'space-between', marginTop: 2 }}>
                                <Button onClick={handleClose}>H???y</Button>
                                <Button type={'submit'}>C???p nh???t</Button>
                            </DialogActions>
                        </form>
                    )}
                </Formik>}
        </Dialog>

    );

};
export default UpdateSupplier;
