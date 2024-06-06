import { useEffect, useState } from "react";
import axios from "axios";

const UseData = (url) => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true)
        const fetchData = async () => {
            const result = await axios.get(url);
            setData(result.data.data);
            setLoading(false)
        };

        fetchData();
    }, []);

    return { data, loading };
}

export default UseData;