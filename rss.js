document.addEventListener("DOMContentLoaded", function() {
    const rssFeeds = [
        'https://prod-qt-images.s3.amazonaws.com/production/prothomalo-bangla/feed.xml',
        'https://www.ajkerpatrika.com/feed/', // Replace with your second RSS feed URL
        'https://www.jagonews24.com/rss/rss.xml'  // Replace with your third RSS feed URL
    ];

    const rssContainers = [
        document.getElementById('rss-feed-1'),
        document.getElementById('rss-feed-2'),
        document.getElementById('rss-feed-3')
    ];

    function fetchRSSFeed(rssUrl, container) {
        const timestamp = new Date().getTime(); // Add a timestamp to the request
        fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}&nocache=${timestamp}`)
            .then(response => response.json())
            .then(data => {
                displayFeed(data.items.slice(0, 5), container);
            })
            .catch(error => console.error('Error fetching RSS feed:', error));
    }
    

    function displayFeed(items, container) {
        items.forEach(item => {
            const feedItem = document.createElement('div');
            feedItem.className = 'feed-item';

            const title = document.createElement('span');
            title.textContent = item.title;

            const link = document.createElement('a');
            link.href = item.link;
            link.target = '_blank';
            link.innerHTML = '↗'; // External link icon

            feedItem.appendChild(title);
            feedItem.appendChild(link);

            container.appendChild(feedItem);
        });
    }

    rssFeeds.forEach((url, index) => {
        fetchRSSFeed(url, rssContainers[index]);
    });

    // Clock and Bengali Date
    function updateClock() {
        const now = new Date();
        const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
        const banglaClock = now.toLocaleTimeString('bn-BD', options);
        document.getElementById('clock').textContent = banglaClock;
    }

    function updateBengaliDate() {
        const now = new Date();
        const bengaliDate = new Intl.DateTimeFormat('bn-BD', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long'
        }).format(now);

        document.getElementById('bengali-date').textContent = bengaliDate;
    }

    function handleSearch() {
        const searchBar = document.getElementById('search-bar');
        searchBar.addEventListener('keyup', function(event) {
            if (event.key === 'Enter') {
                const query = searchBar.value;
                if (query) {
                    window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
                }
            }
        });
    }

    setInterval(updateClock, 1000);
    updateClock();
    updateBengaliDate();
    handleSearch();
});
