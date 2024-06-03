import React, { useState, useEffect } from 'react';
import cartArrow from '../../../../public/images/cartArrow.svg';
import Image from 'next/image';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { cartDataAtom, cartOpenAtom } from '@/lib/atoms';

const CartButton = () => {
    const setCartOpen = useSetRecoilState(cartOpenAtom);
    const cartItems = useRecoilValue(cartDataAtom);
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        // Trigger animation
        setAnimate(true);
        // Remove animation class after animation duration
        const timeout = setTimeout(() => setAnimate(false), 1500); // Adjust timeout duration to match your animation duration
        return () => clearTimeout(timeout);
    }, [cartItems.length]);

    return (
        <div className={animate ? 'animate-pulse' : ''}>
            <Image
                onClick={() => { setCartOpen(prev => !prev); }}
                src={cartArrow}
                width={50}
                height={50}
                alt='Cart'
                className='cursor-pointer'
            />
        </div>
    );
}

export default CartButton;
