import * as React from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
// import { Product } from '../types/product';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Product } from '../../types/product';
// import { updateProduct } from '../api/products';




export interface SimpleDialogProps {
  update: (id: number, value: Omit<Product,'id' | 'availability' | 'img_name' | 'custom' > ) => void;
  product?: Product ;
  open: boolean;
  onClose: () => void;
}



const theme = createTheme();

export default function UpdateDialog(props: SimpleDialogProps) {

    const [nameValue, setName] = React.useState<any>('')
    const [priceValue, setPrice] = React.useState<any>('')
  
    const { product ,onClose, open , update} = props;
    const [checked, setChecked] = React.useState(false);

    React.useEffect(() => {
        setChecked(product?.day_special??false);

        setPrice(product?.price)
        setName(product?.name)

    },[product]);

    React.useEffect(() => {
        console.log(nameValue);
        
    },[nameValue])

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {      
        if (!product) return;
        event.preventDefault();
        
        const priceToString = priceValue
        // const warrantyYearsToString = data.get('warranty_years');
        
        console.log('dd')
        if(!priceToString || typeof priceToString != 'string') return;
        // if(!warrantyYearsToString || typeof warrantyYearsToString != 'string') return;
        

        const name = nameValue
        const price = parseInt(priceToString);
        // const warranty_years = parseInt(warrantyYearsToString);
    
    
        if ( typeof name != 'string') return;
        if ( typeof price != 'number') return;
        const day_special = checked? true : false;
        const updateObj = {
            name,
            price,
            day_special
            // warranty_years,
        };
        update( product.id, updateObj);
    
    };


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };


    const handleClose = () => {
        onClose();
    };



    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Modifiez le produit {product?.name}</DialogTitle>
            <ThemeProvider theme={theme}>
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
                        <Typography component="h1" variant="h5">
            Mettre a jour le produit
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                defaultValue={product?.name}
                                name="name"
                                label="name"
                                type="text"
                                id="name"
                                onChange={(event: any) => setName(event.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                defaultValue={product?.price}
                                name="price"
                                label="price"
                                type="number"
                                InputProps={{ inputProps: { min: 0, max: 2000 } }}
                                id="price"
                                onChange={(event: any) => setPrice(event.target.value)}
                            />
                     
                            <FormControlLabel
                                control={<Checkbox checked={checked} onChange={handleChange} />}
                                label="Check if available"
                                name="day_special"
                                id="day_special"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 1 }}
                            >
              UPDATE
                            </Button>
                            <Button
                                fullWidth
                                sx={{ mt: 1, mb: 2 }}
                                onClick={handleClose}
                            >
              CLOSE
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </Dialog>
    );
}