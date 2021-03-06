import axios from 'axios';
import { alert, notice, info, success, error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import refs from './refs';

const key = '18518367-60788b25c9bdd8e2c754a390a';

axios.defaults.baseURL = 'https://pixabay.com/api';

export default {
  searchQuery: '',
  page: 1,
  async fetchPhotoes() {
    const response = await axios.get(
      `?key=${key}&q=${this.searchQuery}&page=${this.page}&per_page=12`,
    );

    this.incrementPage();

    if (response.data.hits.length === 0) {
      this.error();
    } else {
      this.success();
      refs.loadMoreButtonRef.classList.remove('is-hidden');
    }

    return response.data.hits;

    // try-catch is the alternative way
    /*try {
      const url = `https://pixabay.com/api/?key=${key}&q=${this.searchQuery}&page=${this.page}&per_page=12`;
      const request = await fetch(url);
      const result = await request.json();
      const data = await result.hits;
      this.incrementPage();

      if (data.length === 0) {
      this.error();
    } else {
      this.success();
      refs.loadMoreButtonRef.classList.remove('is-hidden');
    }

      return data;

    } catch (error) {
      throw error;
    }
    */
  },
  error() {
    error({
      text: 'Please enter a more specific query!',
      hide: true,
      delay: 3000,
      width: '280px',
    });
  },
  success() {
    success({
      text: 'Your query is successful!',
      hide: true,
      delay: 2000,
      width: '280px',
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
