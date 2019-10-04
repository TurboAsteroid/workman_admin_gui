import * as types from './actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
    galleryObject: undefined,
    gallerySaveResult: undefined
});

export default function reduce(state = initialState, action = {}) {
    switch (action.type) {
        case types.GALLERY_GET:
            return state.merge({
                galleryObject: action.galleryObject
            });
        case types.GALLERY_POST:
            return state.merge({
                gallerySaveResult: action.gallerySaveResult
            });
        case types.GALLERY_CLEAN:
            return state.merge({
                gallerysObject: undefined,
                gallerySaveResult: undefined
            });
        default:
            return state;
    }
}

// selectors

export function getGalleryObject(state) {
    const galleryObject = state.gallery.galleryObject;
    return galleryObject;
}
export function getGallerySaveResult(state) {
    const getGallerySaveResult = state.gallery.gallerySaveResult;
    return getGallerySaveResult;
}