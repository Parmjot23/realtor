// Hard-coded backend base to avoid env mismatches on Netlify
const API_BASE_URL = 'https://api.madebyparm.com/api'
const CLIENT_PATH = `${API_BASE_URL}/realtor-raman`

const CONTACT_ENDPOINT = `${CLIENT_PATH}/contact/`
const PREAPPROVAL_ENDPOINT = `${CLIENT_PATH}/preapproval/`
const LISTINGS_ENDPOINT = `${CLIENT_PATH}/listings/`

const defaultHeaders = { 'Content-Type': 'application/json' }

const getJson = async (url) => {
    const response = await fetch(url, { method: 'GET' })
    const payload = await response.json().catch(() => ({}))
    if (!response.ok) {
        throw new Error(payload.error || 'Unable to load data. Please try again.')
    }
    return payload
}

const postJson = async (url, body) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: defaultHeaders,
            body: JSON.stringify(body)
        })
        const payload = await response.json().catch(() => ({}))
        if (!response.ok) {
            throw new Error(payload.error || 'Unable to submit form. Please try again.')
        }
        return payload
    } catch (error) {
        throw new Error(error.message || 'Unable to reach the API. Please try again later.')
    }
}

export const sendContactMessage = (data) => postJson(CONTACT_ENDPOINT, data)

export const submitPreapprovalLead = (data) => postJson(PREAPPROVAL_ENDPOINT, data)

export const fetchListings = () => getJson(LISTINGS_ENDPOINT)
