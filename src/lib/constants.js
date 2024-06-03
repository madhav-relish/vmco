
import EcomIcon from '@/components/Icons/EcomIcon';
import HomeIcon from '@/components/Icons/HomeIcon';
import ProductsIcon from '@/components/Icons/ProductsIcon';
import { BeakerIcon, BuildingStorefrontIcon, GiftIcon } from '@heroicons/react/24/solid'
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
        icon: <HomeIcon/>
    },
    {
        label: "Products",
        link: "/products",
        icon: <ProductsIcon/>
    },
    {
        label: "E-commerce",
        link: "/",
        icon: <EcomIcon/>

    },
]
