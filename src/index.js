import 'lightgallery.js';
import '../node_modules/lightgallery.js/dist/css/lightgallery.css';
import createGalleryMarkup from './js/create-gallery-markup';
import pixabayService from './js/pixabay-service';
import refs from './js/refs';
import './scss/styles.scss';

refs.searchFormRef.addEventListener('submit', event => {
  event.preventDefault();

  const form = event.currentTarget;
  pixabayService.query = form.elements.query.value.trim();

  if (pixabayService.query !== '') {
    refs.galleryContainerRef.innerHTML = '';

    pixabayService.resetPage();
    getPhotoes();
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
      lightGallery(document.getElementById('ul-li'));
      window.scrollTo({
        top: document.documentElement.offsetHeight,
        behavior: 'smooth',
      });
    })
    .catch(error =>
     console.log(error))
    .finally(() => {
      refs.spinnerRef.classList.add('is-hidden');
    });
}
