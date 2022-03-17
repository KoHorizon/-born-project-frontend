import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';

import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { postIngredients } from '../../api/ingredient';

export default function CreateIngredient () {

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
    const [inputFields, setInputFields] = useState<any>([
        { name: '', price: '', stock: ''},
    ]);

    
    const handleSubmit = async(e:any) => {
        e.preventDefault();
        try {
            for await (const iterator of inputFields) {
                if (iterator.name == '' || iterator.price =='' || iterator.stock == '') return                  
            }
            const response = await postIngredients(inputFields);
            setInputFields([{ name: '', price: '', stock: ''}])

        } catch (err){
            console.log(err);
        }
    };

    const handleAddFields = () => {
    	setInputFields([...inputFields, { name: '', price: '' , stock: ''}])
    }
    
    const handleRemoveFields = (index:any) => {
    	const values  = [...inputFields];
    	if (index !== 0) {
            values.splice(index, 1);
    	setInputFields(values);
    }
    }


    

    const handleChangeInput = (index:number, event:any) => {  // done

        const values = [...inputFields];
        console.log(values);
        
        values[index][event.target.name] = event.target.value;
        
        setInputFields(values);
    }


    return (
        <Container>
            <h1>Ajoutez des ingredients et leurs informations :</h1>
            <form className={classes.root} onSubmit={handleSubmit}>
                { inputFields.map((inputField: any,index: any) => (
                    <div key={index}>
                        <TextField
                            name="name"
                            label="Nom de l'ingredient"
                            variant="filled"
                            value={inputField.name}
                            onChange={event => handleChangeInput(index, event)}
                            />
                        <TextField
                            name="price"
                            label="prix"
                            variant="filled"
                            type="number"
                            value={inputField.price}
                            InputProps={{ inputProps: { min: 0, max: 200 } }}
                            onChange={event => { 
                                handleChangeInput(index, event)
                            
                            }}
                            />
                        <TextField
                            name="stock"
                            label="Stock"
                            variant="filled"
                            type="number"
                            value={inputField.stock}
                            InputProps={{ inputProps: { min: 0, max: 200 } }}
                            onChange={event => {
                                if(!isNaN(parseInt(event.target.value))) {
                                    handleChangeInput(index, event) 
                                }
                            
                            }}
                            />
                        <IconButton
                            onClick={() => handleRemoveFields(index)}
                        >
                        <RemoveIcon />
                        </IconButton>
                        <IconButton
                            onClick={() => handleAddFields()}
                        >
                        <AddIcon />
                        </IconButton>
                </div>
                ))}
            <Button
                className={classes.button}
                variant="contained" 
                color="primary" 
                type="submit" 
                endIcon={<Icon>send</Icon>}
                onClick={handleSubmit}
            >Send</Button>
        </form>
        </Container>
    )
}

    // {/* register your input into the hook by invoking the "register" function */}
    // <input defaultValue="test" {...register("name",{ required: true })} />
    // {errors.name && <span>This field is required</span>}
    
    // {/* include validation with required or other standard HTML validation rules */}
    // <input type="number" {...register("pincode", { required: true , min: 0, max: 10000 } )} />
    // {/* errors will return when field validation fails  */}
    // {errors.pincode && <span>This field is required</span>}