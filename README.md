# Test

# Recently Played Songs In-Memory Store
This is a simple implementation of an in-memory store for recently played songs.
The store allows each user to have a playlist with a fixed capacity and manages recently played songs for each user.
When the store becomes full, it eliminates the least recently played songs.

## Table of Contents in the code

- [Overview](#overview)
- [Implementation](#implementation)
- [Usage](#usage)
- [Tests](#tests)

## Overview

The in-memory store is implemented using JavaScript and follows object-oriented programming principles.

## Implementation

The implementation consists of two classes:
// Node class
// RecentlyPlayedStore class

### `Node` class

The `Node` class represents a node in the doubly linked list. It contains information about the song and the user who played it.

### `RecentlyPlayedStore` class

The `RecentlyPlayedStore` class manages the recently played songs.
