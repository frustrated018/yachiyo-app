interface fetchlistingsProps {
  currentPage: number;
}

export const fetchlistings = async ({ currentPage }: fetchlistingsProps) => {
  try {
    const result = await fetch(
      `https://yachiyo-app-db.vercel.app/listings?page=${currentPage}&limit=15`
    );
    if (!result.ok) {
      throw new Error("Failed to fetch Listings");
    }
    return result.json();
  } catch (error) {
    console.log(error);
    throw new Error("Failded to Fetch Listings");
  }
};

interface fetchLisingByIdProps {
  id: string;
}

export const fetchLisingById = async ({ id }: fetchLisingByIdProps) => {
  try {
    const result = await fetch(
      `https://yachiyo-app-db.vercel.app/listings/findById?id=${id}`
    );

    if (!result.ok) {
      throw new Error("Failed to fetch Listings");
    }

    const data = await result.json();

    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch Listing");
  }
};
