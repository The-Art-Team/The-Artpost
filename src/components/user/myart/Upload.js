import Template from '../../Template';
import html from './upload.html';
import './upload.css';
import Image from './Image';
// import { removeChildren } from '../dom';
import { db, auth } from '../../../services/firebase';

const template = new Template(html);
const items = db.ref('items');
const itemsByUser = db.ref('itemsByUser');
const itemsImages = db.ref('items-images');

export default class Upload {

  constructor(key) {
    const currentUser = auth.currentUser;
    this.myItems = itemsByUser.child(currentUser.uid);
    this.itemsImages = itemsImages.child(key);
    this.imageStorage = items.child(key);
    this.editable = editable;
  }

  // upload file
  handleUpload(file) {
    const itemImage = this.itemsImages.push();
    const uploadTask = this.imageStorage.child(itemsImages.key).put(file);

    uploadTask.on('state_changed', () => {

    }, err => {
      console.log(err); 
    }, () => {
      const downloadUrl = uploadTask.snapshot.downloadURL;
      this.fileInput.value = null;
      itemImage.set(downloadUrl);
    });
  }

  // embed file
  handleEmbed(url) {
    const itemImage = this.itemsImages.push();
    itemImage.set(url);
  }

  // remove file
  handleRemove(imageKey) {
    this.itemsImages.child(imageKey).remove();
    const storage = this.imageStorage.child(imageKey);
    storage.delete()
      .catch(err => {
        if(err.code === 'storage/object-not-found') return;
        console.error(err);
      });
  }

  render() {
    const dom = template.clone();

    if(this.editable) {
      this.fileInput = dom.querySelector('input[type=file]');
      this.fileInput.addEventListener('change', event => {
        const files = event.target.files;
        if(!files || !files.length) return;
        this.handleUpload(files[0]);
      });

      const embedForm = dom.querySelector('form');
      embedForm.addEventListener('submit', event => {
        event.preventDefault();
        this.handleEmbed(event.target.elements.url.value);
      });
    } else {
      dom.querySelector('.upload').remove();
    }

    const ul = dom.querySelector('ul');
    const map = new Map();

    this.childAdded = this.itemsImages.on('child_added', data => {
      const image = new Image(data.val(), this.editable ? () => this.handleRemove(data.key) : null);
      const imageDom = image.render();
      map.set(data.key, {
        nodes: [...imageDom.childNodes],
        component: image
      });
      ul.appendChild(imageDom);
    });

    this.childRemoved = this.itemsImages.on('child_removed', data => {
      const toRemove = map.get(data.key);
      toRemove.nodes.forEach(node => node.remove());
    });

    return dom;
  }

  unrender() {
    this.itemsImages.on('child_added', this.childAdded);
    this.itemsImages.on('child_removed', this.childRemoved);
  }
}