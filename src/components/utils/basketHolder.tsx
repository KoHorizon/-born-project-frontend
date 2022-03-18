import React, { useContext } from 'react'
import '../styles/basketHolder.css'
import Badge, { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { BasketContext } from '../../providers/providerBasket';
export default function BasketHolder(props: any) {

    const { prepareOrder } = useContext(BasketContext)


    const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
        '& .MuiBadge-badge': {
          right: -8,
          top: 13,
          border: `2px solid ${theme.palette.primary.main}`,
          padding: '0 4px',
          fontSize: 10
        },
      }));
      


  return (
    <div className='panier'>
        <div className='panier-content' onClick={() => {props.open((v:any)=> !v)}}>
            <p>Panier</p>
            <IconButton aria-label="cart">
            <StyledBadge badgeContent={prepareOrder.length} color="primary">
                <ShoppingCartIcon />
            </StyledBadge>
            </IconButton>
        </div>
    </div>
  )
}
