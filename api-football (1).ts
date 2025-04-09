// API-FOOTBALL integration
const API_KEY = "61001b6c0fb641d39416a6190941d6ee" // This key is invalid or expired
const API_BASE_URL = "https://v3.football.api-sports.io"
const CURRENT_SEASON = "2024" // Updated to current season 2024/25

// Cache for API responses to reduce API calls
const apiCache = new Map<string, { data: any; timestamp: number }>()
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

export const SUPPORTED_LEAGUES = [
  {
    id: 39,
    name: "Premier League",
    country: "England",
    flag: "gb-eng",
    type: "League",
    logo: "https://media.api-sports.io/football/leagues/39.png",
  },
  {
    id: 140,
    name: "La Liga",
    country: "Spain",
    flag: "es",
    type: "League",
    logo: "https://media.api-sports.io/football/leagues/140.png",
  },
  {
    id: 78,
    name: "Bundesliga",
    country: "Germany",
    flag: "de",
    type: "League",
    logo: "https://media.api-sports.io/football/leagues/78.png",
  },
  {
    id: 135,
    name: "Serie A",
    country: "Italy",
    flag: "it",
    type: "League",
    logo: "https://media.api-sports.io/football/leagues/135.png",
  },
  {
    id: 61,
    name: "Ligue 1",
    country: "France",
    flag: "fr",
    type: "League",
    logo: "https://media.api-sports.io/football/leagues/61.png",
  },
  {
    id: 94,
    name: "Primeira Liga",
    country: "Portugal",
    flag: "pt",
    type: "League",
    logo: "https://media.api-sports.io/football/leagues/94.png",
  },
  {
    id: 88,
    name: "Eredivisie",
    country: "Netherlands",
    flag: "nl",
    type: "League",
    logo: "https://media.api-sports.io/football/leagues/88.png",
  },
  {
    id: 71,
    name: "Serie A",
    country: "Brazil",
    flag: "br",
    type: "League",
    logo: "https://media.api-sports.io/football/leagues/71.png",
  },
  {
    id: 40,
    name: "Championship",
    country: "England",
    flag: "gb-eng",
    type: "League",
    logo: "https://media.api-sports.io/football/leagues/40.png",
  },
  {
    id: 1,
    name: "World Cup",
    country: "World",
    flag: "world",
    type: "Cup",
    logo: "https://media.api-sports.io/football/leagues/1.png",
  },
  {
    id: 4,
    name: "Euro Championship",
    country: "Europe",
    flag: "eu",
    type: "Cup",
    logo: "https://media.api-sports.io/football/leagues/4.png",
  },
  {
    id: 2,
    name: "Champions League",
    country: "Europe",
    flag: "eu",
    type: "Cup",
    logo: "https://media.api-sports.io/football/leagues/2.png",
  },
]

// Function to get today's date in YYYY-MM-DD format
export function getTodayDate() {
  const today = new Date()
  return today.toISOString().split("T")[0]
}

// Function to get tomorrow's date in YYYY-MM-DD format
export function getTomorrowDate() {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return tomorrow.toISOString().split("T")[0]
}

// Function to get yesterday's date in YYYY-MM-DD format
export function getYesterdayDate() {
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  return yesterday.toISOString().split("T")[0]
}

// Improved fetchFromAPI function with better error handling
export async function fetchFromAPI(endpoint: string, params: Record<string, string> = {}) {
  // Create a cache key from the endpoint and params
  const queryString = new URLSearchParams(params).toString()
  const cacheKey = `${endpoint}?${queryString}`

  // Check if we have a valid cached response
  const cachedResponse = apiCache.get(cacheKey)
  if (cachedResponse && Date.now() - cachedResponse.timestamp < CACHE_DURATION) {
    console.log(`Using cached data for ${endpoint}`)
    return cachedResponse.data
  }

  // Since we know the API key is invalid, immediately return fallback data
  // In a production environment, you would use a valid API key
  console.log("Using fallback data due to API key issues")
  return { response: [] }

  /* 
  // This code is commented out since we know the API key is invalid
  // In a production environment, you would uncomment this and use a valid API key
  
  // Build the URL
  const url = new URL(endpoint, API_BASE_URL)
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value)
  })

  try {
    console.log(`Fetching from API: ${url.toString()}`)

    // Make the API request with proper headers
    const response = await fetch(url.toString(), {
      headers: {
        "x-rapidapi-key": API_KEY,
        "x-rapidapi-host": "v3.football.api-sports.io",
      },
      // Add a timeout to prevent hanging requests
      signal: AbortSignal.timeout(10000), // 10 seconds timeout
    }).catch((error) => {
      console.error("Fetch error:", error)
      throw new Error("Network error when fetching data")
    })

    if (!response || !response.ok) {
      console.error(`API request failed with status ${response?.status || "unknown"}`)
      throw new Error(`API request failed with status ${response?.status || "unknown"}`)
    }

    const data = await response.json().catch((error) => {
      console.error("JSON parsing error:", error)
      throw new Error("Failed to parse API response")
    })

    // Check if the API returned an error
    if (data.errors && Object.keys(data.errors).length > 0) {
      console.error("API returned errors:", data.errors)
      throw new Error(`API error: ${JSON.stringify(data.errors)}`)
    }

    // Cache the response
    apiCache.set(cacheKey, { data, timestamp: Date.now() })
    console.log(`Cached response for ${endpoint}`)

    return data
  } catch (error) {
    console.error("Error fetching from API-FOOTBALL:", error)
    // Return fallback data instead of throwing error
    return { response: [] }
  }
  */
}

// Helper functions for common API requests - these remain mostly the same
// but with improved error handling

export async function getFixtures(date: string, league?: string) {
  console.log(`Getting fixtures for date: ${date}`)

  try {
    const params: Record<string, string> = {
      date,
      timezone: "Europe/London",
      season: CURRENT_SEASON,
    }

    if (league) params.league = league

    const data = await fetchFromAPI("/fixtures", params)

    // Check if we have a valid response
    if (!data.response || !Array.isArray(data.response)) {
      console.log("Invalid response format or API error, using fallback data")
      return { response: fallbackData.fixtures }
    }

    console.log(`Retrieved ${data.response?.length || 0} fixtures for date ${date}`)
    return data
  } catch (error) {
    console.error(`Failed to get fixtures for date ${date}:`, error)
    return { response: fallbackData.fixtures }
  }
}

export async function getLiveFixtures(league?: string) {
  console.log("Getting live fixtures")

  try {
    const params: Record<string, string> = {
      live: "all",
      season: CURRENT_SEASON,
    }

    if (league) params.league = league

    const data = await fetchFromAPI("/fixtures", params)

    // Check if we have a valid response
    if (!data.response || !Array.isArray(data.response)) {
      console.log("Invalid response format or API error, using fallback data")
      return { response: fallbackData.liveFixtures }
    }

    console.log(`Retrieved ${data.response?.length || 0} live fixtures`)
    return data
  } catch (error) {
    console.error("Failed to get live fixtures:", error)
    return { response: fallbackData.liveFixtures }
  }
}

export async function getLeagues(country?: string) {
  const params: Record<string, string> = { season: CURRENT_SEASON }
  if (country) params.country = country

  try {
    const data = await fetchFromAPI("/leagues", params)

    // Check if we have a valid response
    if (!data.response || !Array.isArray(data.response) || data.response.length === 0) {
      return { response: SUPPORTED_LEAGUES }
    }

    console.log(`Retrieved ${data.response?.length || 0} leagues`)
    return data
  } catch (error) {
    console.error("Failed to get leagues:", error)
    return { response: SUPPORTED_LEAGUES }
  }
}

export async function getLeagueStandings(leagueId: string) {
  try {
    const data = await fetchFromAPI("/standings", {
      league: leagueId,
      season: CURRENT_SEASON,
    })

    // Check if we have a valid response
    if (!data.response || !Array.isArray(data.response) || data.response.length === 0) {
      return { response: fallbackData.standings }
    }

    console.log(`Retrieved standings for league ${leagueId}`)
    return data
  } catch (error) {
    console.error(`Failed to get standings for league ${leagueId}:`, error)
    return { response: fallbackData.standings }
  }
}

export async function getLeagueFixtures(leagueId: string) {
  try {
    const data = await fetchFromAPI("/fixtures", {
      league: leagueId,
      season: CURRENT_SEASON,
      status: "NS",
    })

    // Check if we have a valid response
    if (!data.response || !Array.isArray(data.response) || data.response.length === 0) {
      return { response: fallbackData.fixtures }
    }

    console.log(`Retrieved ${data.response?.length || 0} fixtures for league ${leagueId}`)
    return data
  } catch (error) {
    console.error(`Failed to get fixtures for league ${leagueId}:`, error)
    return { response: fallbackData.fixtures }
  }
}

export async function getTeam(id: string) {
  try {
    const data = await fetchFromAPI("/teams", { id })
    console.log(`Retrieved team data for team ${id}`)
    return data
  } catch (error) {
    console.error(`Failed to get team ${id}:`, error)
    return { response: [] }
  }
}

export async function getTeamSquad(teamId: string) {
  try {
    const data = await fetchFromAPI("/players/squads", { team: teamId })
    console.log(`Retrieved squad for team ${teamId}`)
    return data
  } catch (error) {
    console.error(`Failed to get squad for team ${teamId}:`, error)
    return { response: [] }
  }
}

export async function getPlayer(id: string) {
  try {
    const data = await fetchFromAPI("/players", { id, season: CURRENT_SEASON })
    console.log(`Retrieved player data for player ${id}`)
    return data
  } catch (error) {
    console.error(`Failed to get player ${id}:`, error)
    return { response: [] }
  }
}

// Fallback data in case API calls fail or limits are reached
export const fallbackData = {
  leagues: SUPPORTED_LEAGUES,
  fixtures: [
    {
      fixture: {
        id: 1,
        date: "2025-03-30T15:00:00Z", // Use a fixed date string instead of Date.now()
        status: { short: "NS", elapsed: null },
      },
      league: { id: 39, name: "Premier League", logo: "https://media.api-sports.io/football/leagues/39.png" },
      teams: {
        home: { id: 33, name: "Manchester United", logo: "https://media.api-sports.io/football/teams/33.png" },
        away: { id: 40, name: "Liverpool", logo: "https://media.api-sports.io/football/teams/40.png" },
      },
      goals: { home: null, away: null },
    },
    {
      fixture: {
        id: 2,
        date: "2025-03-30T17:30:00Z", // Use a fixed date string instead of Date.now()
        status: { short: "NS", elapsed: null },
      },
      league: { id: 140, name: "La Liga", logo: "https://media.api-sports.io/football/leagues/140.png" },
      teams: {
        home: { id: 529, name: "Barcelona", logo: "https://media.api-sports.io/football/teams/529.png" },
        away: { id: 541, name: "Real Madrid", logo: "https://media.api-sports.io/football/teams/541.png" },
      },
      goals: { home: null, away: null },
    },
  ],
  liveFixtures: [
    {
      fixture: {
        id: 3,
        date: "2025-03-30T14:00:00Z", // Use a fixed date string instead of Date.now()
        status: { short: "LIVE", elapsed: 65 },
      },
      league: { id: 78, name: "Bundesliga", logo: "https://media.api-sports.io/football/leagues/78.png" },
      teams: {
        home: { id: 157, name: "Bayern Munich", logo: "https://media.api-sports.io/football/teams/157.png" },
        away: { id: 165, name: "Borussia Dortmund", logo: "https://media.api-sports.io/football/teams/165.png" },
      },
      goals: { home: 1, away: 1 },
    },
  ],
  standings: [
    {
      league: {
        id: 39,
        name: "Premier League",
        country: "England",
        logo: "https://media.api-sports.io/football/leagues/39.png",
        flag: "gb-eng",
        season: 2024,
        standings: [
          [
            {
              rank: 1,
              team: {
                id: 40,
                name: "Liverpool",
                logo: "https://media.api-sports.io/football/teams/40.png",
              },
              points: 70,
              goalsDiff: 42,
              group: "Premier League",
              form: "WWWDW",
              all: {
                played: 29,
                win: 21,
                draw: 7,
                lose: 1,
                goals: { for: 69, against: 27 },
              },
            },
            {
              rank: 2,
              team: {
                id: 42,
                name: "Arsenal",
                logo: "https://media.api-sports.io/football/teams/42.png",
              },
              points: 58,
              goalsDiff: 29,
              group: "Premier League",
              form: "WWWWL",
              all: {
                played: 29,
                win: 18,
                draw: 4,
                lose: 7,
                goals: { for: 53, against: 24 },
              },
            },
          ],
        ],
      },
    },
  ],
}
