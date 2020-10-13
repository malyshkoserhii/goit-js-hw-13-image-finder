const key = '18518367-60788b25c9bdd8e2c754a390a';

export default {
  searchQuery: '',
  page: 1,
  async fetchPhotoes() {
    try {
      const url = `https://pixabay.com/api/?key=${key}&q=${this.searchQuery}&page=${this.page}&per_page=12`;
      const request = await fetch(url);
      const result = await request.json();
      const data = await result.hits;
      this.incrementPage();

      return data;
      
    } catch (error) {
      throw error;
    }
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
