import Template from '../../Template';
import html from './my-art.html';
import './myart.css';
import Upload from './Upload';
import { db, auth, storage } from '../../../services/firebase';

const template = new Template(html);
const items = db.ref('items');
const itemsByUser = db.ref('itemsByUser');
const itemsImages = db.ref('items-images');
const itemsImageStorage = storage.ref('items');

export default class MyArt {
  
  constructor(key) {
    this.key = key;
    this.item = items.child(key);
  }

  removeItem() {
    if(!confirm('Are you sure you want to remove?')) return;
    
    const storage = itemsImageStorage.child(this.key);
    storage.delete()
      .catch(err => {
        if(err.code === 'storage/object-not-found') return;
        console.error(err);
      });

    const updates = {
      [items.child(this.key).path]: null,
      [itemsImages.child(this.key).path]: null,
      [itemsByUser.child(auth.currentUser.uid).child(this.key).path]: null
    };  

    db.ref().update(updates)
      .then(() => window.location.hash = '#user/myart')
      .catch(console.error);
  }
  
  render() {
    const dom = template.clone();

    const header = dom.querySelector('h2');
    
    const uploadSection = dom.querySelector('section.upload');
    const removeButton = dom.querySelector('button.remove');

    this.onValue = this.item.on('value', data => {
      const item = data.val();
      if(!item) return;

      header.textContent = `${item.name}`;

      const isOwner = item.owner === auth.currentUser.uid;

      this.upload = new Upload(this.key, isOwner);
      uploadSection.append(this.upload.render());

      if(isOwner) {
        removeButton.addEventListener('click', () => {
          this.removeItem();
        });
      }
      else {
        removeButton.remove();
      }
    });


    return dom;
  }
  unrender() {
    items.child(this.key).off('value', this.onValue);
    this.images.unrender();
  }
}