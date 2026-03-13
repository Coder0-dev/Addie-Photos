// Initialize Feather Icons
feather.replace();

document.addEventListener('DOMContentLoaded', () => {
    const navButtons = document.querySelectorAll('.nav-btn');
    const viewSections = document.querySelectorAll('.view-section');
    const bookingForm = document.getElementById('booking-form');
    const bookingSuccess = document.getElementById('booking-success');
    const resetBookingBtn = document.getElementById('reset-booking');

    // Handle Navigation Switching
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');

            // Hide all sections
            viewSections.forEach(section => {
                section.classList.add('hidden-view');
            });

            // Show target section
            document.getElementById(targetId).classList.remove('hidden-view');

            // Update Navigation Button Styles
            navButtons.forEach(btn => {
                if (btn.getAttribute('data-target') === 'booking') {
                    // Reset booking button
                    btn.className = 'nav-btn bg-zinc-800 text-white px-4 py-2 rounded-md hover:bg-zinc-700 transition-colors';
                } else {
                    // Reset text buttons
                    btn.className = 'nav-btn text-zinc-500 transition-colors hover:text-zinc-300';
                }
            });

            // Highlight active button
            if (targetId === 'booking') {
                button.className = 'nav-btn bg-white text-black px-4 py-2 rounded-md hover:bg-zinc-200 transition-colors';
            } else {
                button.className = 'nav-btn text-white transition-colors hover:text-zinc-300';
            }
        });
    });

    // Handle Form Submission
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent page reload
        bookingForm.classList.add('hidden-view');
        bookingSuccess.classList.remove('hidden-view');
        bookingForm.reset(); // Clear the form fields
    });

    // Handle Reset Booking Form
    resetBookingBtn.addEventListener('click', () => {
        bookingSuccess.classList.add('hidden-view');
        bookingForm.classList.remove('hidden-view');
    });
});