export const apiURL = process.env.NEXT_PUBLIC_BACKEND_URL

export const ALL_PRODUCTS_API = apiURL + `/api/product`
export const ALL_BRANDS_API = apiURL + '/api/brand'
export const ALL_BANNER_CATEGORY_API = apiURL + '/api/banner-category'
export const ALL_PROMOTED_PRODUCTS_API = apiURL + '/api/product?promote=true'
export const ALL_REGIONS_API = apiURL + '/api/region'
export const ALL_SUB_CATEGORY_API = apiURL + '/api/sub-category?banner_category='