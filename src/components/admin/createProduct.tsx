// import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { IngredientContext } from '../../providers/providerIngredient';
import { useForm } from "react-hook-form";
import { ProductContext } from '../../providers/providerProducts';
import { Ingredient } from '../../types/ingredient';
import { useNavigate } from 'react-router-dom';
import { Button, Container, IconButton, makeStyles, TextField } from '@material-ui/core';
import { postIngredients } from '../../api/ingredient';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import '../styles/createProduct.css';
import { postProduct } from '../../api/product';


export default function CreateProduct() {

    const { ingredientProvider } = useContext(IngredientContext)
    const { product } = useContext(ProductContext)
    const [ingredients, setIngredients] = useState<any>([])
    useEffect(() => {
        // console.log(ingredients);

    }, [ingredients])

    useEffect(() => {
        console.log(ingredientProvider[0].default);
        
    },[])

    let navigate = useNavigate()

    const useStyles = makeStyles((theme) => ({
        root: {
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
            },
        },
        button: {
            margin: theme.spacing(1),
        }
    }))

    const classes = useStyles();
    const [productName, setProductName] = useState<any>('');

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {

            if (ingredients.length === 0 || productName === '') return            
            
            const anwser = []
            const arrayOfIdToLink = []
            let finalObj: any = {}
            for await (const id of ingredients) {
                let idIngredientObj: any = {}
                // console.log(id);
                idIngredientObj['id'] = id
                arrayOfIdToLink.push(idIngredientObj)
            }
            finalObj['product'] = {
                name: productName,
                custom: false,
            }
            finalObj['ingredients'] = arrayOfIdToLink
            anwser.push(finalObj)

            if (anwser.length > 0) {
                const productCreated = await postProduct(anwser)
                console.log(productCreated);
            }


            setProductName('');
            setIngredients([]);
        } catch (err) {

            console.log(err);

        }
        // console.log(inputFields);
    };



    const addIngredient = (idIngedient: any) => {
        if (ingredients.includes(idIngedient)) return
        setIngredients([...ingredients, idIngedient])
    }



    const handleChangeInput = (event: any) => {  // done
        setProductName(event.target.value);
    }


    return (
        <Container>

            {
                ingredientProvider[0].name !== 'default' &&
                <>
                    <h1>Lier votre Produit avec des ingredients :</h1>
                    <form className={classes.root} onSubmit={handleSubmit}>
                        <div>
                            <TextField
                                name="name"
                                label="Nom de l'ingredient"
                                variant="filled"
                                value={productName}
                                onChange={event => handleChangeInput(event)}
                            />
                        </div>
                        <Button
                            className={classes.button}
                            variant="contained"
                            color="primary"
                            type="submit"
                            endIcon={<Icon>send</Icon>}
                            onClick={handleSubmit}
                        >Send</Button>
                    </form>

                    <div className='ingredientToLink'>
                        {
                            ingredientProvider ? ingredientProvider.map((ingredient: any, index: any) => {
                                return (
                                    <div key={index} className="ingredientToAdd" onClick={() => addIngredient(ingredient.id)}>
                                        <span>{ingredient.name}</span>
                                    </div>
                                )
                            }) : <></>
                        }



                    </div>
                    <div className='ad'>
                        {
                            ingredients.length > 0 && <p className='addedIngredient-title'>
                                This is is the add ingredent to product
                            </p>
                        }
                        <div className='addedIngredient'>

                            {
                                ingredientProvider && ingredientProvider.filter((ingredient: any) => ingredients.includes(ingredient.id))
                                    .map((ingredient: any, index: any) => {
                                        return (
                                            <div key={index} className='added-Ingredient'>
                                                <p key={index}> {ingredient.name} </p>
                                            </div>
                                    )
                                }) 
                            }
                        </div>
                    </div>
                </>
            }

        </Container>
    )
}



{/* <FormControl fullWidth>
<InputLabel id="demo-simple-select-label">Age</InputLabel>
<Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    label="Age"
>
    <MenuItem value={10}>Ten</MenuItem>
    <MenuItem value={20}>Twenty</MenuItem>
    <MenuItem value={30}>Thirty</MenuItem>
</Select>
</FormControl> */}