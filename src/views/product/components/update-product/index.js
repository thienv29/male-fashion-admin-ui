import * as React from 'react';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useDispatch, useSelector } from 'react-redux';
import { closeUpdateProduct, setSelected } from '../../slice';
import { Typography } from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import ProductService from '../../../../services/product.service';

const UpdateProduct = ({ saveCompleteEvent }) => {
    const state = useSelector(state => state.product);
    const [a, setA] = useState();
    const dispatch = useDispatch();
    useEffect(() => {
        getProductById();
    }, [state.selected[0]]);
    const getProductById = async () => {
        if (state.selected[0]) {
            const data = await ProductService.getById(state.selected[0]);
            setA(data.result);
        }

    };
    const handleClose = () => {
        dispatch(closeUpdateProduct());
    };
    const handleUpdateProduct = async (values) => {
        const data = await ProductService.update({ ...a, ...values });
        if (data) {
            saveCompleteEvent();
            dispatch(closeUpdateProduct());
            dispatch(setSelected([]));
        }
    };
    if (a) {
        return (

            <Dialog open={state.updateProduct} onClose={handleClose}>
                <Typography variant={'h3'} margin={2}>Sửa sản phẩm</Typography>
                <Formik
                    initialValues={{
                        name: a.name,
                        code: a.code
                    }}
                    validationSchema={Yup.object().shape({
                        name: Yup.string().max(255).required('Vui lòng nhập tên sản phẩm'),
                        code: Yup.string().max(255).required('Vui lòng chọn sản phẩm')
                    })}
                    onSubmit={handleUpdateProduct}
                >
                    {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                        <form noValidate onSubmit={handleSubmit}>
                            <DialogContent>
                                <TextField name={'name'} label='Tên sản phẩm' variant='outlined' value={values.name}
                                           onBlur={handleBlur}
                                           onChange={handleChange} />
                                <TextField name={'code'} type={'color'} label='Mã' sx={{ width: 50 }}
                                           value={values.code}
                                           onBlur={handleBlur}
                                           onChange={handleChange} />
                                {/*<FormHelperText error >*/}
                                {/*    {errors.email}*/}
                                {/*</FormHelperText>*/}
                            </DialogContent>
                            <DialogActions sx={{ justifyContent: 'space-between', marginTop: 2 }}>
                                <Button onClick={handleClose}>Hủy</Button>
                                <Button type={'submit'}>Sửa</Button>
                            </DialogActions>
                        </form>
                    )}
                </Formik>

            </Dialog>

        );
    }

};
export default UpdateProduct;
