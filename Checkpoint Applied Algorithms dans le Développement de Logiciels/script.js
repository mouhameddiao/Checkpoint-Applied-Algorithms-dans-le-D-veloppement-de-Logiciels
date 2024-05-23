function dijkstra(graph, start) {
    const distances = {};
    const visited = new Set();
    const priorityQueue = new PriorityQueue((a, b) => a.distance < b.distance);

    // Initialise les distances avec Infinity, et 0 pour le nœud de départ
    for (let node in graph) {
        distances[node] = Infinity;
    }
    distances[start] = 0;

  // Ajoute le nœud de démarrage à la file d'attente prioritaire
    priorityQueue.enqueue({ node: start, distance: 0 });

    while (!priorityQueue.isEmpty()) {
        const { node: currentNode, distance: currentDistance } = priorityQueue.dequeue();
        
      // Si nous avons déjà visité ce nœud, ignorez-le
        if (visited.has(currentNode)) continue;
        
       // Marque le nœud comme visité
        visited.add(currentNode);

      // Mettre à jour les distances aux nœuds adjacents
        for (let neighbor in graph[currentNode]) {
            if (visited.has(neighbor)) continue;

            const newDistance = currentDistance + graph[currentNode][neighbor];
            if (newDistance < distances[neighbor]) {
                distances[neighbor] = newDistance;
                priorityQueue.enqueue({ node: neighbor, distance: newDistance });
            }
        }
    }

    return distances;
}

// Implémentation de la file d'attente prioritaire à l'aide d'un Min-Heap
class PriorityQueue {
    constructor(comparator = (a, b) => a > b) {
        this._heap = [];
        this._comparator = comparator;
    }
    size() {
        return this._heap.length;
    }
    isEmpty() {
        return this.size() === 0;
    }
    peek() {
        return this._heap[0];
    }
    enqueue(value) {
        this._heap.push(value);
        this._siftUp();
    }
    dequeue() {
        const poppedValue = this.peek();
        const bottom = this.size() - 1;
        if (bottom > 0) {
            this._swap(0, bottom);
        }
        this._heap.pop();
        this._siftDown();
        return poppedValue;
    }
    _parent(index) {
        return ((index + 1) >>> 1) - 1;
    }
    _left(index) {
        return (index << 1) + 1;
    }
    _right(index) {
        return (index + 1) << 1;
    }
    _swap(i, j) {
        [this._heap[i], this._heap[j]] = [this._heap[j], this._heap[i]];
    }
    _siftUp() {
        let node = this.size() - 1;
        while (node > 0 && this._comparator(this._heap[node], this._heap[this._parent(node)])) {
            this._swap(node, this._parent(node));
            node = this._parent(node);
        }
    }
    _siftDown() {
        let node = 0;
        while (
            (this._left(node) < this.size() && this._comparator(this._heap[this._left(node)], this._heap[node])) ||
            (this._right(node) < this.size() && this._comparator(this._heap[this._right(node)], this._heap[node]))
        ) {
            let maxChild = (this._right(node) < this.size() && this._comparator(this._heap[this._right(node)], this._heap[this._left(node)])) ?
                this._right(node) : this._left(node);
            this._swap(node, maxChild);
            node = maxChild;
        }
    }
}

