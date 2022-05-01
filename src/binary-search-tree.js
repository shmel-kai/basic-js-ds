const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor () {
    this.rootElement = null;
  }

  root() {
    return this.rootElement;
  }

  insert(node, newNode){
    if(newNode.data < node.data) {
      if(node.left === null) {
        node.left = newNode;
      } else {
        this.insert(node.left, newNode);
      }
    } else {
      if(node.right === null){
        node.right = newNode;
      } else {
        this.insert(node.right, newNode);
      }
    }
  }

  add(data) {
    const newNode = new Node(data);

    if(this.rootElement === null){
      this.rootElement = newNode;
    } else {
      this.insert(this.rootElement, newNode);
    }
  }

  search(node, data) {
    if (node === null) {
      return null;
    } else if (data < node.data) {
      return this.search(node.left, data);
    } else if (data > node.data) {
      return this.search(node.right, data);
    } else {
      return node;
    }
  }

  has(data) {
    return !!this.search(this.rootElement, data);  
  }

  find(data) {
    return this.search(this.rootElement, data);
  }

  remove(data) {
    this.rootElement = this.removeNode(this.rootElement, data);
  }

  removeNode(node, key) {
    if (!node) {
      return null;
    } else if (key < node.data) {
      node.left = this.removeNode(node.left, key);

      return node;
    } else if (key > node.data) {
      node.right = this.removeNode(node.right, key);

      return node;
    } else {
      if (!node.left && !node.right) {
        node = null;

        return node;
      }

      if (!node.left) {
        node = node.right;

        return node;
      } else if (!node.right) {
        node = node.left;

        return node;
      }

      const tempNode = this.findMinNode(node.right);

      node.data = tempNode.data;

      node.right = this.removeNode(node.right, tempNode.data);

      return node;
    }
  }

  findMinNode(node) {
    if (!node.left) {
      return node;
    } else {
      return this.findMinNode(node.left);
    }
  }

  min() {
    let node = this.rootElement;

    while (node.left) {
      node = node.left;
    }

    return node.data;
  }

  max() {
    let node = this.rootElement;

    while (node.right) {
      node = node.right;
    }

    return node.data;
  }
};


module.exports = {
  BinarySearchTree
};