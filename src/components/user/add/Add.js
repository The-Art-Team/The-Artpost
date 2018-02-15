import Template from '../../Template';
import html from './add.html';
import './add.css';
import { db, auth, storage } from '../../../services/firebase';


const template = new Template(html);
const items = db.ref('items');
const itemsByUser = db.ref('itemsByUser');
const itemsImages = db.ref('items-images');
const itemsImageStorage = storage.ref('items');

export default class Add {

  constructor() {
    const currentUser = auth.currentUser;
    this.myItems = itemsByUser.child(currentUser.uid);
  }

  // submit art
  handleSubmit(form) {
    this.error.textContent = '';

    const data = new FormData(form);
    const item = {};
    data.forEach((value, key) => item[key] = value);    
    
    item.owner = auth.currentUser.uid;
    const ref = items.push();
    
    this.handleUpload(form.elements.upload.files[0], ref.key)
      .then(image => {
        const updates = {
          [ref.path]: item,
          [this.myItems.child(ref.key).path]: true,
          [itemsImages.child(ref.key).child(image.imageKey).path]: image.downloadUrl
        };
        return db.ref().update(updates);
      })
      .then(() => window.location.hash = '#user/myart')
      .catch(err => this.error.textContent = err);
  }

  // upload file
  handleUpload(file, key) {
    const imageKey = itemsImages.child(key).push().key;
    const uploadTask = itemsImageStorage.child(key).child(imageKey).put(file);

    return new Promise((resolve, reject) => {
      uploadTask.on('state_changed', () => {
      }, 
      reject, 
      () => {
        const downloadUrl = uploadTask.snapshot.downloadURL;
        resolve({
          imageKey, downloadUrl
        });
      });
    }); 
  }

  render() {
    const dom = template.clone();

    this.error = dom.querySelector('.error');

    // form
    this.form = dom.querySelector('form');
    this.form.addEventListener('submit', event => {
      event.preventDefault();
      this.handleSubmit(event.target);
    });

    return dom;
  }

  unrender() {
    // no listeners used!
  }
}