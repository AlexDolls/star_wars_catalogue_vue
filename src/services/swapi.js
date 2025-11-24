const BASE_URL = 'https://swapi.dev/api'

/**
 * Fetch data from SWAPI
 */
async function fetchData(url) {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}

/**
 * Fetch all movies
 */
export async function getMovies() {
  const data = await fetchData(`${BASE_URL}/films/`)
  return data.results
}

/**
 * Fetch a single movie by ID
 */
export async function getMovie(id) {
  return await fetchData(`${BASE_URL}/films/${id}/`)
}

/**
 * Fetch character details
 */
export async function getCharacter(url) {
  return await fetchData(url)
}

/**
 * Fetch starship details
 */
export async function getStarship(url) {
  return await fetchData(url)
}

/**
 * Fetch vehicle details
 */
export async function getVehicle(url) {
  return await fetchData(url)
}

/**
 * Fetch species details
 */
export async function getSpecies(url) {
  return await fetchData(url)
}

/**
 * Fetch multiple resources in parallel
 */
export async function fetchMultipleResources(urls) {
  try {
    const promises = urls.map(url => fetchData(url))
    return await Promise.all(promises)
  } catch (error) {
    console.error('Error fetching multiple resources:', error)
    return []
  }
}

