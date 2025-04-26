import { useEffect, useState } from "react";

const useHttp = (url, initialData) => {
    const [data, setData] = useState({
        data: initialData,
        isLoading: false,
        error: false
      });

    useEffect(() => {
        const fetchData = async () => {
            setData(prev => ({ ...prev, isLoading: true }));
            const response = await fetch(url);

            if (!response.ok) {
                setData(prev => ({ ...prev, isLoading: false, error: true }));
            }

            const data = await response.json();
            setData(prev => ({ ...prev, data: data.meals, isLoading: false }));
        }

        fetchData();
    }, []);

    return data;
}

export default useHttp;