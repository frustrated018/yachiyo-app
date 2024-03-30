interface fetchlistingsProps {
  currentPage: number;
}

export const fetchlistings = async ({ currentPage }: fetchlistingsProps) => {
  //TODO: Make the url dynamic to control the pagination data

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
  }
};
