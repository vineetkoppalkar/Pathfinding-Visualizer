class PriorityQueueElement {
  constructor(element, priority) {
    this.element = element;
    this.priority = priority;
  }
}

class PriorityQueue {
  constructor() {
    this.items = [];
  }

  enqueue(element, priority) {
    const priorityQueueElement = new PriorityQueueElement(element, priority);

    if (this.isEmpty()) {
      this.items.push(priorityQueueElement);
    } else if (this.last().priority <= priority) {
      this.items.push(priorityQueueElement);
    } else {
      for (let i = 0; i < this.items.length; i++) {
        this.items.splice(i, 0, priorityQueueElement);
        break;
      }
    }
  }

  dequeue() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items.shift();
  }

  first() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items[0];
  }

  last() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  contains(element) {
    for (let i = 0; i < this.items.length; i++) {
      const queuedElement = this.items[i].element;
      if (queuedElement.equals(element)) {
        return true;
      }
    }
    return false;
  }

  getPriorityOf(element) {
    for (let i = 0; i < this.items.length; i++) {
      const queuedElement = this.items[i].element;
      if (queuedElement.equals(element)) {
        return this.items[i].priority;
      }
    }
    return null;
  }

  remove(element) {
    let queuedPriorityElement = null;
    for (let i = 0; i < this.items.length; i++) {
      const queuedElement = this.items[i].element;
      if (queuedElement.equals(element)) {
        queuedPriorityElement = queuedElement;
      }
    }

    if (queuedPriorityElement === null) return;

    const queuedPriorityElementIndex = this.items.indexOf(
      queuedPriorityElement
    );
    this.items.splice(queuedPriorityElementIndex, 1);
  }
}

export default PriorityQueue;
