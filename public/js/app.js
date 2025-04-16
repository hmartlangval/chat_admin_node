// Client-side JavaScript

// Socket.IO connection
let socket;

// DOM elements
const messageInput = document.getElementById('message-input');
const sendMessageBtn = document.getElementById('send-message');
const messagesContainer = document.getElementById('messages');
const socketStatus = document.getElementById('socket-status');
const fetchItemsBtn = document.getElementById('fetch-items');
const addItemBtn = document.getElementById('add-item');
const itemsTableBody = document.getElementById('items-table-body');
const apiStatus = document.getElementById('api-status');

// Initialize the application
function init() {
    // Connect to Socket.IO server
    initializeSocketIO();
    
    // Add event listeners
    addEventListeners();
}

// Initialize Socket.IO connection
function initializeSocketIO() {
    // Simple Socket.IO connection - no custom configuration needed
    socket = io();
    
    // Connection event
    socket.on('connect', () => {
        socketStatus.textContent = 'Connected';
        socketStatus.classList.remove('alert-info', 'alert-danger');
        socketStatus.classList.add('alert-success');
        console.log('Socket connected successfully');
    });
    
    // Connection error event
    socket.on('connect_error', (error) => {
        console.error('Socket connection error:', error);
        socketStatus.textContent = 'Connection Error: ' + error.message;
        socketStatus.classList.remove('alert-success', 'alert-info');
        socketStatus.classList.add('alert-danger');
    });
    
    // Disconnection event
    socket.on('disconnect', (reason) => {
        console.log('Socket disconnected:', reason);
        socketStatus.textContent = 'Disconnected: ' + reason;
        socketStatus.classList.remove('alert-success', 'alert-info');
        socketStatus.classList.add('alert-danger');
    });
    
    // Message event
    socket.on('message', (data) => {
        addMessage(data, false);
    });
}

// Add event listeners
function addEventListeners() {
    // Send message button
    sendMessageBtn.addEventListener('click', () => {
        const message = messageInput.value.trim();
        if (message) {
            socket.emit('message', message);
            addMessage(message, true);
            messageInput.value = '';
        }
    });
    
    // Message input - send on Enter key
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessageBtn.click();
        }
    });
    
    // Fetch items button
    fetchItemsBtn.addEventListener('click', fetchItems);
    
    // Add item button
    addItemBtn.addEventListener('click', addItem);
}

// Add a message to the messages container
function addMessage(message, isSent) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add(isSent ? 'message-sent' : 'message-received');
    messageElement.textContent = message;
    
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Fetch items from the API
async function fetchItems() {
    try {
        showApiStatus('Fetching items...', 'info');
        
        const response = await fetch('/api/items');
        const items = await response.json();
        
        displayItems(items);
        showApiStatus('Items fetched successfully!', 'success');
    } catch (error) {
        console.error('Error fetching items:', error);
        showApiStatus('Error fetching items', 'danger');
    }
}

// Add a new item
async function addItem() {
    try {
        const name = prompt('Enter item name:');
        if (!name) return;
        
        showApiStatus('Adding new item...', 'info');
        
        const response = await fetch('/api/items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name })
        });
        
        const newItem = await response.json();
        
        // Update the table with the new item
        fetchItems();
        
        showApiStatus('Item added successfully!', 'success');
    } catch (error) {
        console.error('Error adding item:', error);
        showApiStatus('Error adding item', 'danger');
    }
}

// Display items in the table
function displayItems(items) {
    itemsTableBody.innerHTML = '';
    
    if (items.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="3" class="text-center">No items found</td>';
        itemsTableBody.appendChild(row);
        return;
    }
    
    items.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td class="action-buttons">
                <button class="btn btn-sm btn-outline-primary" onclick="viewItem(${item.id})">View</button>
                <button class="btn btn-sm btn-outline-warning" onclick="editItem(${item.id}, '${item.name}')">Edit</button>
                <button class="btn btn-sm btn-outline-danger" onclick="deleteItem(${item.id})">Delete</button>
            </td>
        `;
        itemsTableBody.appendChild(row);
    });
}

// View an item
async function viewItem(id) {
    try {
        showApiStatus('Fetching item details...', 'info');
        
        const response = await fetch(`/api/items/${id}`);
        const item = await response.json();
        
        alert(`Item Details:\nID: ${item.id}\nName: ${item.name}`);
        showApiStatus('Item details fetched successfully!', 'success');
    } catch (error) {
        console.error('Error fetching item details:', error);
        showApiStatus('Error fetching item details', 'danger');
    }
}

// Edit an item
async function editItem(id, currentName) {
    try {
        const name = prompt('Edit item name:', currentName);
        if (!name || name === currentName) return;
        
        showApiStatus('Updating item...', 'info');
        
        const response = await fetch(`/api/items/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name })
        });
        
        const updatedItem = await response.json();
        
        // Update the table
        fetchItems();
        
        showApiStatus('Item updated successfully!', 'success');
    } catch (error) {
        console.error('Error updating item:', error);
        showApiStatus('Error updating item', 'danger');
    }
}

// Delete an item
async function deleteItem(id) {
    try {
        if (!confirm('Are you sure you want to delete this item?')) return;
        
        showApiStatus('Deleting item...', 'info');
        
        const response = await fetch(`/api/items/${id}`, {
            method: 'DELETE'
        });
        
        const result = await response.json();
        
        // Update the table
        fetchItems();
        
        showApiStatus('Item deleted successfully!', 'success');
    } catch (error) {
        console.error('Error deleting item:', error);
        showApiStatus('Error deleting item', 'danger');
    }
}

// Show API status message
function showApiStatus(message, type) {
    apiStatus.textContent = message;
    apiStatus.className = `alert alert-${type}`;
    apiStatus.classList.remove('d-none');
    
    // Hide the status message after 3 seconds
    setTimeout(() => {
        apiStatus.classList.add('d-none');
    }, 3000);
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', init); 