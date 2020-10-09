import createGalleryMarkup from './js/create-gallery-markup';
import pixabayService from './js/pixabay-service';
import refs from './js/refs';
import './scss/styles.scss';

refs.searchFormRef.addEventListener('submit', event => {
  event.preventDefault();

  const form = event.currentTarget;
  pixabayService.query = form.elements.query.value;

  if (pixabayService !== '') {
    refs.galleryContainerRef.innerHTML = '';

    pixabayService.resetPage();
    getPhotoes();
    form.reset();
  }
});

refs.loadMoreButtonRef.addEventListener('click', getPhotoes);

function getPhotoes() {
  pixabayService
    .fetchPhotoes()
    .then(photoes => {
      createGalleryMarkup(photoes);
    })
    .catch(error => console.log(error));
}
