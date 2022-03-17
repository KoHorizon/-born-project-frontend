import React, { useEffect, useState } from 'react';
// import { createProduct, deleteProduct, findAll, updateProduct } from '../api/products';
// import { Product } from '../types/product';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button, DialogTitle } from '@mui/material';
// import UpdateDialog from './editComponent';
// import CreateDialog from './createComponent';
import { Box } from '@mui/system';
import UpdateDialog from '../../modals/admin/editProductModal';
import { Product } from '../../types/product';
import { deleteProduct, getProducts, putProduct } from '../../api/product';



 


export default function MainAdminPage() {


    const [openEdit, setOpenEdit] = React.useState(false);
    const [openCreate, setOpenCreate] = React.useState(false);


    const [editProduct, setEditProduct] = useState<Product>();
    const [products,setProducts] = useState<Product[]>([]);


    const handleClickOpen = (id: number) => {
        setOpenEdit(true);
        const product = products.find((item) => item.id === id);
        if ( product ) setEditProduct(product); 
    };


    const handleClickOpenCreate = () => {
        setOpenCreate(true);
    };


    const handleCloseEdit = () => {
        setOpenEdit(false);
    };

    const handleCloseCreate = () => {
        setOpenCreate(false);
    };
    
    // const handleCreateProduct = async (value: Omit<Product,'_id' | 'rating' > ) => {
    //     try {
    //         const { data } = await createProduct(value); 
    //         setProducts((items) => [...items, data]);  
    //         handleCloseCreate();
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };


    const handleEditProduct = async (id: number, value: Omit<Product,'id' | 'availability' | 'img_name' | 'custom' >) => {
        try {
            // console.log(value,'d')
            const data  = await putProduct(id,value);  
            getProducts().then((res) => {
                const data: any = res.data.product;
                setProducts(data);
            }).catch(console.error);  
            handleCloseEdit();
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteProduct = async (id:number) => {
        
        const ok = confirm('This product is about to be deleted, do you confirm ?');
        if (!ok) return;
        try {
            const productDelete = await deleteProduct(id);
            setProducts((items) => items.filter(item => item.id !== id));
        } catch (error) {
            console.error(error);
        }

        
    };


    const disconnect = async () => {
        localStorage.removeItem('token');
        return window.location.reload();
    };

    useEffect(() => {
        getProducts().then((res) => {
            const data: any = res.data.product;
            setProducts(data);
        }).catch(console.error);
    },[]);


    return (
        <React.Fragment >
            <div>
                <Button variant="outlined" color="error" sx={{ m: 2 }} onClick={() => disconnect() }>
        Disconnect
                </Button> 
            </div>
            <Table >
                <TableHead>
                    <TableRow>
                        <TableCell>Nom</TableCell>
                        <TableCell>Prix</TableCell>
                        <TableCell>Produit du jour</TableCell>
                        <TableCell>Edit</TableCell>
                        <TableCell>Supprimer</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        products ? products.filter((product) => product.custom == false).map(({id,name,price, day_special})=> {
                            return ( 
                                <TableRow key={id}>
                                    <TableCell>{name}</TableCell>
                                    <TableCell>{price} €</TableCell>
                                    <TableCell>{day_special ? 'Oui' : 'Non'}</TableCell>
                                    <TableCell>
                                        <Button variant="contained" onClick={() => handleClickOpen(id)}>
                                            Edit
                                        </Button>    
                                    </TableCell>
                                    <TableCell>
                                        
                                        <Button variant="outlined" color="error" onClick={() => handleDeleteProduct(id)}>
                                            Delete
                                        </Button> 
                                    </TableCell>
                                </TableRow>); 
                        }) : 
                            <DialogTitle>Create a product</DialogTitle>
                
                    }
                </TableBody>
            </Table>

            <UpdateDialog
                update={handleEditProduct}
                product={editProduct}
                open={openEdit}
                onClose={handleCloseEdit}
            />
            {/* <Box textAlign='center' sx={{ m: 5 }} >
                <Button variant="outlined" size="large"sx={{ width: '75%' }} onClick={() => handleClickOpenCreate() }>
            Creer
                </Button> 
            </Box> */}

        </React.Fragment>
    );
}