import React, { useContext, useEffect, useState } from 'react'
import { Grid, Paper, Typography, TextField, Button, Stack, Card, CardContent, CardActions, IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import UserContext from './context/UserContext';
import { display } from '@mui/system';

function DisplayProducts() {

    const [myProducts, setProducts] = useState([])

    const [reload, setLoad] = useState(0)

    const context = useContext(UserContext)

    const {displayProducts, deleteProduct} = context

    const handleDelete = async (id) => {
        await deleteProduct(id)
        setLoad(reload + 1)
    }


    useEffect(() => {
            async function display () {
            let pro = await displayProducts()    
            setProducts(pro)
        }
        display()
    }, [reload])

  return (
    <Paper sx={{ padding: "32px" }} elevation={2}>
      <Grid container>
        <Grid item lg={3} md={1} sm={0} xs={0}></Grid>
        <Grid item lg={6} md={10} sm={12} xs={12}>
            <Stack spacing={2} textAlign='center'>
                <Typography variant='h3'>My Products</Typography>
                <Grid container>
                    {myProducts.map(product => {
                        return (
                            <Grid m={1} item lg={4} md={6} sm={12} xs={12}>
                    <Card sx={{bgcolor: 'smoke', margin:"1%"}}>
                        <CardContent>
                            <Typography variant='h4'>{product.title}</Typography>
                            <Typography variant='h5'>{product.brand}</Typography>
                            <Typography variant='h5'>{product.company}</Typography>
                        </CardContent>
                        <Stack direction={'row-reverse'}>
                            <CardActions>
                                <IconButton><EditIcon color='primary'/></IconButton>
                                <IconButton onClick={() => handleDelete(product._id)}><DeleteForeverIcon color='primary'/></IconButton>
                            </CardActions>
                        </Stack>
                    </Card>
                </Grid>
                        )
                    })}
                </Grid>
            </Stack>
        </Grid>
        <Grid item lg={3} md={1} sm={0} xs={0}></Grid>
     </Grid>
    </Paper>    
  )
}

export default DisplayProducts