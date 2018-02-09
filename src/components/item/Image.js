import html from './image.html';
import './image.css';
import Template from '../../Template';
import { getUrl } from '../../../services/cloudinary';
import { db, storage } from '../../../services/firebase';

const template = new Template(html);
// const itemsImages = db.ref('items-images');
// const itemImageStorage = storage.ref('items');

export default class Image {
  // constructor(key) {
  //   this.itemImages = itemsImages.child(key);
  //   this.imageStorage = itemImageStorage.child(key);
  // }

  render() {
    const dom = template.clone();
    
    this.image = dom.querySelector('img');
    this.image.alt = this.src;

    dom.querySelector('img').src = getUrl(this.src, 'g_face,c_fill,w_500,h_500');

    return dom;
  }
}