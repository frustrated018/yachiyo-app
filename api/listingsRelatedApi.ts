export const fetchlistings = async () => {
  //TODO: Make the url dynamic to control the pagination data

  try {
    const result = await fetch(
      "https://yachiyo-app-db.vercel.app/listings?page=3&limit=20"
    );
    if (!result.ok) {
      throw new Error("Failed to fetch Listings");
    }
    return result.json();
  } catch (error) {
    console.log(error);
  }
};
