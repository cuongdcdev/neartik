import { connect, Contract, keyStores, WalletConnection } from 'near-api-js'
import getConfig from './config'

// const nearConfig = getConfig(process.env.NODE_ENV || 'development')
const nearConfig = getConfig('development')

// Initialize contract & set global variables
export async function initContract() {
  // Initialize connection to the NEAR testnet
  const near = await connect(Object.assign({ deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() } }, nearConfig))

  // Initializing Wallet based Account. It can work with NEAR testnet wallet that
  // is hosted at https://wallet.testnet.near.org
  window.walletConnection = new WalletConnection(near)

  // Getting the Account ID. If still unauthorized, it's just empty string
  window.accountId = window.walletConnection.getAccountId()

  // Initializing our contract APIs by contract name and configuration
  window.contract = await new Contract(window.walletConnection.account(), nearConfig.contractName, {
    // View methods are read only. They don't modify the state, but usually return some value.
    viewMethods: ['getPost', 'getPostsFrom', 'getPosts', 'getComments', 'getProfile', 'getPostsId'],
    // Change methods can modify the state. But you don't receive the returned value when called.
    changeMethods: ['addPost', 'setComment', 'setProfile', 'setPostId'],
  })
}

export function logout() {
  window.walletConnection.signOut()
  // reload page
  window.location.replace(window.location.origin + window.location.pathname)
}

export function login() {
  // Allow the current app to make calls to the specified contract on the
  // user's behalf.
  // This works by creating a new access key for the user's account and storing
  // the private key in localStorage.
  window.walletConnection.requestSignIn(nearConfig.contractName)
}


//favorite posts 
export function toggleFavorite(k, p) {
  isFavorite(k) ? removeFavorite(k) : addFavorite(k, p)
}

function addFavorite(k, p) {
  var favObj = getFavorites();
  var obj = { id: k, post: p };
  if (!isFavorite(k, p)) {
    favObj.push(obj);
    console.log("new ids", favObj);
  }
  localStorage.setItem(window.accountId + "fav", JSON.stringify(favObj));
}

function removeFavorite(k) {
  var favObj = getFavorites();
  var newIds = [];
  favObj.forEach(element => {
    if (element.id != k) {
      newIds.push(element);
    }
  });
  localStorage.setItem(window.accountId + "fav", JSON.stringify(newIds));
}

export function isFavorite(k) {
  var favObj = getFavorites();
  var isFav = false;
  favObj.forEach(element => {
    console.log("element id ", element.id)
    if (element.id == k ) {
      isFav = true;
    }
  });
  return isFav;
}

export function getFavorites() {
  return localStorage.getItem(window.accountId + "fav") ? JSON.parse(localStorage.getItem(window.accountId + "fav")) : [];

}
//get favorite posts in local 