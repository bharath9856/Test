
    const assert = require('assert');
    
    class Node {
      constructor(song, user) {
        this.song = song;
        this.user = user;
        this.prev = null;
        this.next = null;
      }
    }
    
    class RecentlyPlayedStore {
      constructor(capacityPerUser, initialCapacity) {
        this.capacityPerUser = capacityPerUser;
        this.capacity = capacityPerUser * initialCapacity;
        this.userSongMap = {}; // Object to store user-specific data
        this.head = null;
        this.tail = null;
      }
    
      _addNodeToHead(node) {
        if (!this.head) {
          this.head = node;
          this.tail = node;
        } else {
          node.next = this.head;
          this.head.prev = node;
          this.head = node;
        }
      }
    
      _removeNode(node) {
        if (node.prev) {
          node.prev.next = node.next;
        } else {
          this.head = node.next;
        }
    
        if (node.next) {
          node.next.prev = node.prev;
        } else {
          this.tail = node.prev;
        }
      }
    
      _moveNodeToHead(node) {
        this._removeNode(node);
        this._addNodeToHead(node);
      }
    
      addPlay(song, user) {
        const userData = this.userSongMap[user] || {};
        if (Object.keys(userData).length === this.capacityPerUser) {
          // Remove least recently played song for this user
          const tailSong = this.tail.song;
          this._removeNode(this.tail);
          delete userData[tailSong];
        }
    
        const newNode = new Node(song, user);
        this._addNodeToHead(newNode);
        userData[song] = newNode;
        this.userSongMap[user] = userData;
      }
    
      getRecentlyPlayedSongs(user) {
        const userData = this.userSongMap[user] || {};
        const recentlyPlayed = [];
        let currentNode = this.head;
        while (currentNode) {
          if (currentNode.user === user) {
            recentlyPlayed.push(currentNode.song);
          }
          currentNode = currentNode.next;
        }
        return recentlyPlayed;
      }
    }
    
    // Test the implementation
    const store = new RecentlyPlayedStore(3, 3);
    
    store.addPlay("S1", "User1");
    store.addPlay("S2", "User1");
    store.addPlay("S3", "User1");

    assert.deepStrictEqual(store.getRecentlyPlayedSongs("User1"), ["S3", "S2", "S1"]);
    console.log(store.getRecentlyPlayedSongs("User1")); // Output: ["S3", "S2", "S1"]

    store.addPlay("S4", "User1");
    assert.deepStrictEqual(store.getRecentlyPlayedSongs("User1"), ["S4", "S3", "S2"]);
    console.log(store.getRecentlyPlayedSongs("User1")); // Output: ["S4", "S3", "S2"]
    
    store.addPlay("S2", "User1");
    assert.deepStrictEqual(store.getRecentlyPlayedSongs("User1"), ["S2", "S4", "S3"]);
    console.log(store.getRecentlyPlayedSongs("User1")); // Output: ["S2", "S4", "S3"]
    
    store.addPlay("S1", "User1");
    assert.deepStrictEqual(store.getRecentlyPlayedSongs("User1"), ["S1", "S2", "S4"]);
    console.log(store.getRecentlyPlayedSongs("User1")); // Output: ["S1", "S2", "S4"]
    

