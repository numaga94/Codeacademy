const apiKey = ''; // has to put your apiKey here
const Yelp = {
  async search(term, location, sortBy) {
    const endpoint = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`;
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${apiKey}`
      }
    });
    const jsonResponse = await response.json();
    if (jsonResponse.businesses) {
      return jsonResponse.businesses.map((business) => ({
        id: business.id,
        imageSrc: business.image_url,
        name: business.name,
        address: business.location.address1,
        city: business.location.city,
        state: business.location.state,
        zipCode: business.location.zip_code,
        country: business.location.country,
        category: business.categories[0].title,
        rating: business.rating,
        reviewCount: business.review_count,
        distance: (business.distance / 1000).toFixed(2)
      }));
    }
  }
};

export default Yelp;
