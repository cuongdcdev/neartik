/*
 * This is an example of an AssemblyScript smart contract with two simple,
 * symmetric functions:
 *
 * 1. setGreeting: accepts a greeting, such as "howdy", and records it for the
 *    user (account_id) who sent the request
 * 2. getGreeting: accepts an account_id and returns the greeting saved for it,
 *    defaulting to "Hello"
 *
 * Learn more about writing NEAR smart contracts with AssemblyScript:
 * https://docs.near.org/docs/develop/contracts/as/intro
 *
 */

import { Context, logging, storage, PersistentUnorderedMap } from 'near-sdk-as'


// // Exported functions will be part of the public interface for your smart contract.
// // Feel free to extract behavior to non-exported functions!
// export function getGreeting(accountId: string): string | null {
//   // This uses raw `storage.get`, a low-level way to interact with on-chain
//   // storage for simple contracts.
//   // If you have something more complex, check out persistent collections:
//   // https://docs.near.org/docs/concepts/data-storage#assemblyscript-collection-types
//   return storage.get<string>(accountId, DEFAULT_MESSAGE)
// }

// export function setGreeting(message: string): void {
//   const accountId = Context.sender
//   // Use logging.log to record logs permanently to the blockchain!
//   logging.log(`Saving greeting "${message}" for account "${accountId}"`)
//   storage.set(accountId, message)
// }

//====================================  POST  ====================================
/**
 *  posts contains all posts of an account, each account have own posts collection
 * @param postId 
 * @param postObject 
 */

export function addPost(postId: string, postObject: string): void {
  const accountId = Context.sender;
  let posts = new PersistentUnorderedMap<string, string>(accountId + "_post");
  posts.set(postId, postObject);
}
/**
 * posts contains all posts of an account, each account have own posts collection  
 * @param accountId 
 * @param postId 
 * @returns 
 */
export function getPost(accountId: string, postId: string): string | null {
  let posts = new PersistentUnorderedMap<string, string>(accountId + "_post");
  return posts.get(postId);
}

/**
 * get posts from author 
 * @param accountId 
 * @param from 
 * @param to 
 * @returns 
 */
export function getPostsFrom(accountId: string, from: i32, to: i32): string[] {
  let posts = new PersistentUnorderedMap<string, string>(accountId + "_post");
  return posts.values(from, to);
}

/**
 * get posts id
 * @param from 
 * @param to 
 * @returns array of postId 
 */
 export function getPostsId( from: i32, to: i32): string[] {
  let posts = new PersistentUnorderedMap<string, string>("posts");
  return posts.values(from, to);
}

//save postId to db if its not exist
//key: postId - value: acountId
export function setPostId(postId: string  ):void{
  let posts = new PersistentUnorderedMap<string, string>("posts");
  if( !posts.get(postId) ){
    posts.set( postId, Context.sender + "|" + postId );
  }
}



// ==================================== COMMENT ==================================== 
export function getComments(postId: string, from: i32, to: i32): string[] {
  let comments = new PersistentUnorderedMap<string, string>(postId);
  return comments.values(from, to);
}


export function setComment(postId: string, commentId: string, commentObject: string): void {
  let comments = new PersistentUnorderedMap<string, string>(postId);
  comments.set(commentId, commentObject);
}

//==================================== USER PROFILE ====================================

/**
 * set user Profile 
 * @param profileObject 
 */
export function setProfile(profileObject: string): void {
  let profiles = new PersistentUnorderedMap<string, string>("uprofile");
  profiles.set(Context.sender, profileObject);
}

/**
 * 
 * @param userId 
 * @returns profileObject
 */
export function getProfile(userId: string): string | null {
  let profiles = new PersistentUnorderedMap<string, string>("uprofile");
  return profiles.get(userId);
}

