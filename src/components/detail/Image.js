import html from './image.html';
import Template from '../Template';
import './image.css';
import { getUrl } from '../../services/cloudinary';
import { db } from '../../services/firebase';


const template = new Template(html);
const itemsImages = db.ref('items-images');

export default class Image {
  constructor(key, isOwner) {
    this.key = key;
    this.isOwner = isOwner;
    this.itemsImages = itemsImages.child(key).limitToFirst(1);
  }

  render() {
    const dom = template.clone();

    this.image = dom.querySelector('img');
    this.remove = dom.querySelector('button.remove');

    this.onImageValue = this.itemsImages.on('child_added', data => {
      this.image.src = getUrl(data.val(), 'ar_3:2,c_fill,g_face,w_600,q_auto:best');
    });

    return dom;
  }

  unrender() {
    this.itemsImages.off('child_added', this.onImageValue); 
  }
}