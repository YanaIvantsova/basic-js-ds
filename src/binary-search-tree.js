const { NotImplementedError } = require('../extensions/index.js');

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  add(data) {
    const newNode = new Node(data);
    if (this.rootNode === null) {
      this.rootNode = newNode;
    } else {
      this.insertNode(this.rootNode, newNode);
    }
  }

  insertNode(node, newNode) {
    if (newNode.data < node.data) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }

  root() {
    return this.rootNode;
  }

  has(data) {
    let currentNode = this.rootNode;
    while (currentNode) {
      if (data === currentNode.data) {
        return true;
      } else if (data < currentNode.data) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }
    return false;
  }

  find(data) {
    let currentNode = this.rootNode;
    while (currentNode) {
      if (data === currentNode.data) {
        return currentNode;
      } else if (data < currentNode.data) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }
    return null;
  }

  remove(data) {
    this.root = this.removeNode(this.rootNode, data);
  }

  removeNode(currentNode, data) {
    if (!currentNode) {
      return null;
    }

    if (data === currentNode.data) {
      if (!currentNode.left && !currentNode.right) {
        return null;
      } else if (!currentNode.left) {
        return currentNode.right;
      } else if (!currentNode.right) {
        return currentNode.left;
      } else {
        const smallestNode = this.findSmallestNode(currentNode.right);
        currentNode.data = smallestNode.data;
        currentNode.right = this.removeNode(currentNode.right, smallestNode.data);
        return currentNode;
      }
    } else if (data < currentNode.data) {
      currentNode.left = this.removeNode(currentNode.left, data);
      return currentNode;
    } else {
      currentNode.right = this.removeNode(currentNode.right, data);
      return currentNode;
    }
  }

  findSmallestNode(currentNode) {
    while (currentNode.left) {
      currentNode = currentNode.left;
    }
    return currentNode;
  }

  min() {
    if (!this.rootNode) {
      return null;
    }
    let currentNode = this.rootNode;
    while (currentNode.left) {
      currentNode = currentNode.left;
    }
    return currentNode.data;
  }

  max() {
    if (!this.rootNode) {
      return null;
    }
    let currentNode = this.rootNode;
    while (currentNode.right) {
      currentNode = currentNode.right;
    }
    return currentNode.data;
  }
}

module.exports = {
  BinarySearchTree
};