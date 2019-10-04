import * as types from './actionTypes';
import galleryService from '../../services/gallery';

export function getGallery(moduleId) {
    return async(dispatch, getState) => {
        try {
            const galleryObject = await galleryService.getGallery(moduleId);
            dispatch({ type: types.GALLERY_GET, galleryObject });
        } catch (error) {
            console.error("galleryObject", error);
        }
    };
}
export function saveGallery(gallery, filesList) {
    return async(dispatch, getState) => {
        try {
            const gallerySaveResult = await galleryService.saveGallery(gallery, filesList);
            dispatch({ type: types.GALLERY_POST, gallerySaveResult });
        } catch (error) {
            console.error("saveGallery", error);
        }
    };
}
export function cleanSaveState() {
    return async(dispatch, getState) => {
        try {
            dispatch({ type: types.GALLERY_CLEAN });
        } catch (error) {
            console.error("saveGallery", error);
        }
    };
}