import { alert, notice, info, success, error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import createGalleryMarkup from './js/create-gallery-markup';
import pixabayService from './js/pixabay-service';
import refs from './js/refs';
import './scss/styles.scss';

refs.searchFormRef.addEventListener('submit', event => {
  event.preventDefault();

  const form = event.currentTarget;
  pixabayService.query = form.elements.query.value;

  if (pixabayService.query !== '') {
    refs.galleryContainerRef.innerHTML = '';

    pixabayService.resetPage();
    getPhotoes();
    success({
      text: 'Your query is successful!',
      hide: true,
      delay: 2000,
      width: '280px',
    });
    form.reset();
  }
});

refs.loadMoreButtonRef.addEventListener('click', getPhotoes);

function getPhotoes() {
  refs.loadMoreButtonRef.classList.add('is-hidden');
  refs.spinnerRef.classList.remove('is-hidden');

  pixabayService
    .fetchPhotoes()
    .then(photoes => {
      createGalleryMarkup(photoes);
      success({
        text: 'Your query is successful!',
        hide: true,
        delay: 2000,
        width: '280px',
      });
      refs.loadMoreButtonRef.classList.remove('is-hidden');
    })
    .catch(error => {
      error({
        text: 'Please enter a more specific query!',
        hide: true,
        delay: 2000,
        width: '280px',
      });
    })
    .finally(() => {
      refs.spinnerRef.classList.add('is-hidden');
    });
}
