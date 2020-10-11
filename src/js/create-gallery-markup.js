import galleryTpl from '../templates/gallery.hbs';
import refs from './refs';

function createGalleryMarkup(photoes) {
    const markup = galleryTpl(photoes);
    refs.galleryContainerRef.insertAdjacentHTML('beforeend', markup);
}

export default createGalleryMarkup;