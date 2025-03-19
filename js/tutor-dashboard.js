// Sample data (in a real application, this would come from a backend)
const tutorData = {
    name: "Dr. Sarah Johnson",
    rating: 4.8,
    reviewCount: 125,
    totalSessions: 156,
    monthSessions: 24,
    earnings: 1280,
    imageUrl: "https://placeholder.com/150x150"
};

const upcomingSessions = [
    {
        id: 1,
        studentName: "John Smith",
        subject: "Advanced Mathematics",
        date: "2024-02-15",
        time: "14:00",
        duration: 60
    },
    {
        id: 2,
        studentName: "Emma Wilson",
        subject: "Physics",
        date: "2024-02-16",
        time: "10:00",
        duration: 90
    }
];

const pendingRequests = [
    {
        id: 1,
        studentName: "Michael Brown",
        subject: "Calculus",
        date: "2024-02-18",
        time: "15:00",
        duration: 60
    },
    {
        id: 2,
        studentName: "Lisa Davis",
        subject: "Physics",
        date: "2024-02-19",
        time: "11:00",
        duration: 90
    }
];

// Initialize dashboard
document.addEventListener('DOMContentLoaded', () => {
    initializeProfile();
    displayUpcomingSessions();
    initializeAvailabilityGrid();
    displayPendingRequests();
});

// Initialize profile section
function initializeProfile() {
    document.getElementById('tutor-name').textContent = tutorData.name;
    document.getElementById('profile-image').src = tutorData.imageUrl;
    
    document.getElementById('edit-profile-btn').addEventListener('click', () => {
        // Implement edit profile functionality
        alert('Edit profile functionality will be implemented here');
    });
}

// Display upcoming sessions
function displayUpcomingSessions() {
    const sessionsContainer = document.getElementById('upcoming-sessions');
    sessionsContainer.innerHTML = '';

    upcomingSessions.forEach(session => {
        const sessionCard = document.createElement('div');
        sessionCard.className = 'session-card';
        sessionCard.innerHTML = `
            <h3>${session.subject} with ${session.studentName}</h3>
            <p>Date: ${formatDate(session.date)}</p>
            <p>Time: ${session.time} (${session.duration} minutes)</p>
            <button class="btn" onclick="viewSessionDetails(${session.id})">View Details</button>
        `;
        sessionsContainer.appendChild(sessionCard);
    });
}

// Initialize availability grid
function initializeAvailabilityGrid() {
    const availabilityGrid = document.getElementById('availability-grid');
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const times = ['9:00', '10:00', '11:00', '14:00', '15:00', '16:00'];

    // Create header row
    days.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.className = 'time-slot';
        dayHeader.textContent = day;
        availabilityGrid.appendChild(dayHeader);
    });

    // Create time slots
    times.forEach(time => {
        days.forEach(day => {
            const timeSlot = document.createElement('div');
            timeSlot.className = 'time-slot';
            timeSlot.dataset.day = day;
            timeSlot.dataset.time = time;
            timeSlot.textContent = time;
            
            // Random availability for demo purposes
            timeSlot.classList.add(Math.random() > 0.5 ? 'available' : 'unavailable');
            
            timeSlot.addEventListener('click', () => toggleAvailability(timeSlot));
            availabilityGrid.appendChild(timeSlot);
        });
    });
}

// Display pending requests
function displayPendingRequests() {
    const requestsContainer = document.getElementById('pending-requests');
    requestsContainer.innerHTML = '';

    pendingRequests.forEach(request => {
        const requestCard = document.createElement('div');
        requestCard.className = 'request-card';
        requestCard.innerHTML = `
            <div>
                <h3>${request.subject} - ${request.studentName}</h3>
                <p>Date: ${formatDate(request.date)} at ${request.time}</p>
                <p>Duration: ${request.duration} minutes</p>
            </div>
            <div>
                <button class="btn accept-btn" onclick="acceptRequest(${request.id})">Accept</button>
                <button class="btn decline-btn" onclick="declineRequest(${request.id})">Decline</button>
            </div>
        `;
        requestsContainer.appendChild(requestCard);
    });
}

// Utility functions
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function toggleAvailability(timeSlot) {
    timeSlot.classList.toggle('available');
    timeSlot.classList.toggle('unavailable');
}

function viewSessionDetails(sessionId) {
    // Implement session details view
    alert(`Viewing details for session ${sessionId}`);
}

function acceptRequest(requestId) {
    // Implement request acceptance
    alert(`Accepting request ${requestId}`);
}

function declineRequest(requestId) {
    // Implement request declination
    alert(`Declining request ${requestId}`);
}

// Save availability changes
document.getElementById('save-availability').addEventListener('click', () => {
    // Implement saving availability to backend
    alert('Availability changes saved successfully!');
});