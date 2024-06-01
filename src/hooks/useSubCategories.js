import { useState, useEffect } from 'react';
import { apiURL } from '@/lib/api';

const useSubCategories = (bannerCategoryId) => {
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const response = await fetch(`${apiURL}/api/sub-category?banner_category=${bannerCategoryId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch subcategories');
        }
        const data = await response.json();
        setSubCategories(data);
      } catch (error) {
        console.error('Error fetching subcategories:', error);
      }
    };

    if (bannerCategoryId) {
      fetchSubCategories();
    }
  }, [bannerCategoryId]);

  return subCategories;
};

export default useSubCategories;
