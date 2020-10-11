const key = '18518367-60788b25c9bdd8e2c754a390a';

export default {
  searchQuery: '',
  page: 1,
  fetchPhotoes() {
    const url = `https://pixabay.com/api/?key=${key}&q=${this.searchQuery}&page=${this.page}&per_page=12`;
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        this.incrementPage();
       
        return data.hits;
      });
  },
  resetPage() {
    this.page = 1;
  },
  incrementPage() {
    this.page += 1;
  },
  get query() {
    return this.searchQuery;
  },
  set query(value) {
    this.searchQuery = value;
  },
};
