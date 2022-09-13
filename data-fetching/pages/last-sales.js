import { useEffect, useState } from "react";
import useSWR from "swr";

function LastSale({ saleData }) {
  const [sales, setSales] = useState(saleData);
  const fetcher = (url) => fetch(url).then((r) => r.json());
  const { data, error } = useSWR(
    "https://next-section5-bcbe4-default-rtdb.firebaseio.com/sales.json",
    fetcher
  );
  // const [loading, setLoading] = useState(true);

  // combines the static site generation + client side data fetching
  useEffect(() => { 
    console.log(data);
    if (data) {
      const transformedSale = [];

      for (const key in data) {
        transformedSale.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
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
    return <p>Error loading data</p>;
  }
  // if (loading) {
  //     return <p>loading</p>
  // }
  if (!data && !sales) {
    return <p>Loading..</p>;
  }
  return (
    <>
      {sales.map((sale) => (
        <ul>
          <li>
            username: {sale.username}
            <br />
          </li>
          <li>
            volume: {sale.volume}
            <br />
          </li>
        </ul>
      ))}
    </>
  );
}

export default LastSale;

// runs on the server, use to get the data from the api endpoint
// also has revalidation in the return, so will fetch newly data every 10 min
export async function getStaticProps() {
  const rawData = await fetch(
    "https://next-section5-bcbe4-default-rtdb.firebaseio.com/sales.json"
  );
  const data = await rawData.json();
  const transformedSale = [];

  for (const key in data) {
    transformedSale.push({
      id: key,
      username: data[key].username,
      volume: data[key].volume,
    });
  }

  return {
    props: {
      saleData: transformedSale,
    },
    revalidate: 10,
  };
}
