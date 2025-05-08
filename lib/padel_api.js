const accessToken = '9V4CdVgPVbeVxEgfwXlbtoII5kbSLSEcNVrH8oZjaa989760';
const apiUrl = 'https://pt.fantasypadeltour.com/api/players';
const wikimediaCoreApiUrl = 'https://api.wikimedia.org/core/v1/commons';


const fetchPlayerImage = async (playerName) => {
    try {
        const searchResponse = await fetch(
            `${wikimediaCoreApiUrl}/search/title?q=${encodeURIComponent(playerName)}&limit=1`,
            {
                headers: {
                    'User-Agent': 'FantasyPadelTour/1.0 (your@email.com)'
                }
            }
        );

        if (!searchResponse.ok) {
            console.error("Wikimedia search failed");
            return null;
        }

        const searchData = await searchResponse.json();

        if (!searchData.pages || searchData.pages.length === 0) {
            return null;
        }

        const imageTitle = searchData.pages[0].key;

        const imageResponse = await fetch(
            `${wikimediaCoreApiUrl}/file/${encodeURIComponent(imageTitle)}`,
            {
                headers: {
                    'User-Agent': 'FantasyPadelTour/1.0 (your@email.com)'
                }
            }
        );

        if (!imageResponse.ok) {
            console.error("Failed to fetch image metadata");
            return null;
        }

        const imageData = await imageResponse.json();
        return imageData.preferred.url;

    } catch (error) {
        console.error("Error fetching player image:", error);
        return null;
    }
};

const fetchAllPlayers = async () => {
    try {
        const response = await fetch(`${apiUrl}?per_page=20`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(`Fetched ${data.data.length} players`);

        const playersContainer = document.getElementById('players-container');
        playersContainer.innerHTML = '';

        for (const [index, player] of data.data.entries()) {
            const imageUrl = await fetchPlayerImage(player.name);

            const playerElement = document.createElement('div');
            playerElement.className = 'player-card';
            playerElement.innerHTML = `
                <div class="player-header">
                    <span class="player-rank">#${index + 1}</span>
                    ${imageUrl 
                        ? `<img src="${imageUrl}" alt="${player.name}" class="player-image" onerror="this.src='https://via.placeholder.com/300'">` 
                        : `<div class="player-image placeholder">No Image</div>`
                    }
                </div>
                <div class="player-info">
                    <h3>${player.name}</h3>
                    <p><strong>Ranking:</strong> ${player.ranking}</p>
                    <p><strong>Nationality:</strong> ${player.nationality}</p>
                    <p><strong>Main Hand:</strong> ${player.hand}</p>
                </div>
            `;
            playersContainer.appendChild(playerElement);
        }

        return data.data;

    } catch (error) {
        console.error('Error fetching players:', error);
        const playersContainer = document.getElementById('players-container');
        playersContainer.innerHTML = '<p>Failed to load players. Please try again later.</p>';
        throw error;
    }
};

fetchAllPlayers();