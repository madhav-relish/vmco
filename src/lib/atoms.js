import axios from "axios";
import { atom, selector, selectorFamily } from "recoil";
import { ALL_BANNER_CATEGORY_API, ALL_BRANDS_API, ALL_PRODUCTS_API, ALL_PROMOTED_PRODUCTS_API, ALL_REGIONS_API, ALL_SUB_CATEGORY_API } from "./api";

export const nextUrlAtom = atom({
    key: "nextUrlAtom",
    default: ALL_PRODUCTS_API
});

export const cartOpenAtom = atom({
    key:"cartOpenAtom",
    default: false
})

export const cartDataAtom = atom({
    key:"cartDataAtom",
    default: []
})

export const allProductsAtom = atom({
    key: "allProductsAtom",
    default: []
});


export const searchQueryAtom = atom({
  key: 'searchQueryAtom',
  default: '',
});



export const productsAtom = selector({
    key: "productsAtom",
    get: async ({ get }) => {
        const url = get(nextUrlAtom);
        const response = await axios(url);
        const products = response.data.results;

        // Update allProductsAtom with the new data
        get(allProductsAtom).push(...products);

        return response.data;
    }
});


export const brandsAtom = selector({
    key: "brandsAtom",
    get:  async ({ get }) => {
        const response = await axios(ALL_BRANDS_API)
        return response.data;
    }
})

export const bannerCategoryAtom = selector({
    key: "bannerCategoryAtom",
    get:  async ({ get }) => {
        const response = await axios(ALL_BANNER_CATEGORY_API)
        return response.data;
    }
})

export const promotedProductsAtom = selector({
    key: "promotedProductsAtom",
    get:  async ({ get }) => {
        const response = await axios(ALL_PROMOTED_PRODUCTS_API)
        return response.data;
    }
})

export const allRegionsAtom = selector({
    key: "allRegionsAtom",
    get:  async ({ get }) => {
        const response = await axios(ALL_REGIONS_API)
        return response.data;
    }
})

export const allSubCategoryAtom = selectorFamily({
    key: "allRegionsAtom",
    get: bannerCategory => async ({ get }) => {
        const response = await axios(ALL_SUB_CATEGORY_API+bannerCategory)
        return response.data;
    }
})


