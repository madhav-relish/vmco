
import { BeakerIcon, BuildingStorefrontIcon, GiftIcon, HomeIcon } from '@heroicons/react/24/solid'

export const categories = [
    {
        label: "Vending Machines",
        icon: <BuildingStorefrontIcon/>,
        slug: "vending_machines"
        
    },
    {
        label: "Coffee Machines",
        icon: <BuildingStorefrontIcon/>,
        slug: "coffee Machines"
    },
    {
        label: "Beverages Ingredients",
        icon: <BuildingStorefrontIcon/>,
        slug: "beverages_ingredients"
    },
    {
        label: "Sandwiches, Bakery & Pastry",
        icon: <BuildingStorefrontIcon/>,
        slug: "sandwiches_bakery_&_pastry"
    },
    {
        label: "Gelato",
        icon:  <BuildingStorefrontIcon/>,
        slug: "gelato"
    }
];


export const navbarItems = [
    {
        label: "Home",
        link: "/",
        icon: <HomeIcon className='size-5' />
    },
    {
        label: "Products",
        link: "/products",
        icon: <GiftIcon className='size-5'/>
    },
    {
        label: "E-commerce",
        link: "/",
        icon: <BuildingStorefrontIcon className='size-5'/>

    },
]
