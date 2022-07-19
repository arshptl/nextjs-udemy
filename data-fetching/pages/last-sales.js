import { useEffect, useState } from "react"
import useSWR from 'swr';

function LastSale() {

    const { data, error } = useSWR('https://next-section5-bcbe4-default-rtdb.firebaseio.com/sales.json');
    const [sales, setSales] = useState();
    // const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (data) {
            const transformedSale = [];

            for (const key in rawData) {
                transformedSale.push(
                    {
                        id: key,
                        username: rawData[key].username,
                        volume: rawData[key].volume
                    }
                )
            }
            setSales(transformedSale);
        }

    }, [data]);

    // useEffect(async () => {
    //     const rawData = await fetch('https://next-section5-bcbe4-default-rtdb.firebaseio.com/sales.json').then((response) => response.json());
    //     const transformedSale = [];

    //     for (const key in rawData) {
    //         transformedSale.push(
    //             {
    //                 id: key,
    //                 username: rawData[key].username,
    //                 volume: rawData[key].volume
    //             } 
    //         )
    //     }
    //     setSales(transformedSale);
    //     setLoading(false)
    //     console.log(rawData);
    // }, []);

    console.log(sales);

    if (error) {
        return <p>Error loading data</p>
    }
    // if (loading) {
    //     return <p>loading</p>
    // }
    if (!data || !sales) {
        return <p>Loading..</p>
    }
    return (
        <>
            {sales.map(sale => <ul><li>username: {sale.username}<br /></li>
                <li>volume: {sale.volume}<br /></li>
            </ul>)}
        </>
    )
}

export default LastSale