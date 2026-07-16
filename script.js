document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const mainScreen = document.getElementById('main-screen');
    const statusBarTime = document.getElementById('status-bar-time');
    const widgetTime = document.getElementById('widget-time');
    const widgetDate = document.getElementById('widget-date');

    // Simulate loading time
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        mainScreen.classList.remove('hidden');
        updateDateTime(); // Initial update
        setInterval(updateDateTime, 1000); // Update every second
    }, 2000); // 2 seconds loading

    function updateDateTime() {
        const now = new Date();
        const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: false };
        const dateOptions = { weekday: 'short', month: 'short', day: 'numeric' };

        const currentTime = now.toLocaleTimeString([], timeOptions);
        const currentDate = now.toLocaleDateString([], dateOptions);

        statusBarTime.textContent = currentTime;
        widgetTime.textContent = currentTime;
        widgetDate.textContent = currentDate;
    }
});
