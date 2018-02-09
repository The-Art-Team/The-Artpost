import Template from '../Template';
import html from './item-detail.html';
import Image from './Image';

import './item-detail.css';
import { auth, db, storage } from '../../services/firebase';

const template = new Template(html);
const items = db.ref('items');
const itemsByUser = db.ref('itemsByUser');
const itemsImages = db.ref('items-images');
const itemsImageStorage = storage.ref('items');
const users = db.ref('users');


export default class ItemDetail {

  constructor(key) {
    this.key = key;
    this.item = items.child(key);
    this.users = users;
    if(auth.currentUser) {
      this.currentUser = true;
      this.favoriteRef = users.child(auth.currentUser.uid).child('favorites').child(this.key);
      this.uid = auth.currentUser.uid;
    } else {
      this.uid = '';
    }
  }

  removeItem() {
    // TODO: improve
    if(!confirm('Remove?')) return;

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
    const bread = dom.querySelector('h5');
    const text = dom.querySelector('p');
    const imageSection = dom.querySelector('section.images');
    const removeButton = dom.querySelector('button.remove');
    const fav = dom.querySelector('.fav-flex');
    // const byArtist = dom.querySelector('.by-artist');
    this.favWrapper = dom.querySelector('.favwrapper');

    this.onValue = this.item.on('value', data => {
      const item = data.val();
      // we might have deleted:
      if(!item) return;

      
      this.favHeader = fav.querySelector('.fav');
      if(this.currentUser) {
        fav.addEventListener('click', () => {
          this.favoriteRef.transaction(current => {
            return current ? null : true ;
          });
        });

        this.onFavoriteValue = this.favoriteRef.on('value', (data) => {
          // this.favHeader.textContent = data.val() ? 'remove favorite' : 'add to favorite';
          this.favHeader.innerHTML = data.val() ? 'remove favorite' : 'add to favorite';
        });
      } else {
        this.favWrapper.classList.toggle('hideFav');
      }


      bread.innerHTML = `<a href="#home">home </a> > <a href="#category/${item.category}"> ${item.category} </a> > <a href="#items/${this.key}"> ${item.name}</a>`;
      header.textContent = `${item.name}`;
      text.textContent = `${item.description}`;
      // byArtist.textContent = `${users.name}`;

      const isOwner = item.owner === this.uid;
      this.images = new Image(this.key, isOwner);
      imageSection.append(this.images.render());

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
    this.favoriteRef.off('value', this.onFavoriteValue);
    items.child(this.key).off('value', this.onValue);
    this.images.unrender();
  }
}