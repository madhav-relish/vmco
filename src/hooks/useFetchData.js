import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';

const useFetchData = (initialUrl, initialFilters) => {
  const [data, setData] = useState([]);
  const [nextUrl, setNextUrl] = useState(initialUrl);
  const [loading, setLoading] = useState(true); // Set initial loading to true
  const [loadingMore, setLoadingMore] = useState(false);
  const [filters, setFilters] = useState(initialFilters);
  const params = useSearchParams();
  const searchParam = params?.get('search') || '';

  const fetchData = useCallback(async (url, append = false) => {
    try {
      if (append) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const result = await response.json();
      setData((prevData) => append ? [...prevData, ...result.results] : result.results);
      setNextUrl(result.next);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      if (append) {
        setLoadingMore(false);
      } else {
        setLoading(false); // Set loading to false after first fetch
      }
    }
  }, []);

  useEffect(() => {
    if (filters.selectedCategory.length > 0 || filters.selectedBrand.length > 0) {
      const brands = filters.selectedBrand.join(',');
      const bannerCategory = filters.selectedCategory.join(',');
      const subCategory = filters.selectedSubcategory.join(',');
      const url = `${initialUrl}?brand=${brands}&banner_category=${bannerCategory}&sub_category=${subCategory}&search=${searchParam}`;

      setData([]); // Reset data before fetching new
      fetchData(url);
    }
  }, [filters, fetchData, initialUrl, searchParam]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight &&
      nextUrl
    ) {
      fetchData(nextUrl, true); // Append data when fetching more
    }
  }, [fetchData, nextUrl]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return { data, loading, loadingMore, setFilters, filters };
};

export default useFetchData;
