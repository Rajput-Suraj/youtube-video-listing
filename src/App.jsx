import { useEffect, useMemo, useState } from 'react'
import './App.css'

const API_ENDPOINT = 'https://api.freeapi.app/api/v1/public/youtube/videos'

function formatViews(views) {
  const numericViews = Number(views)
  if (Number.isNaN(numericViews)) return '0 views'
  return `${new Intl.NumberFormat('en-US', { notation: 'compact' }).format(
    numericViews,
  )} views`
}

function formatPublishedDate(date) {
  if (!date) return 'Unknown date'
  return new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(
    -Math.floor((Date.now() - new Date(date).getTime()) / (1000 * 60 * 60 * 24)),
    'day',
  )
}

function convertDurationToText(duration) {
  if (!duration) return ''
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
  if (!match) return ''
  const [, h = '0', m = '0', s = '0'] = match
  const values = [Number(h), Number(m), Number(s)]
  const start = values[0] > 0 ? 0 : 1
  return values.slice(start).map((item) => String(item).padStart(2, '0')).join(':')
}

function App() {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadVideos() {
      try {
        setLoading(true)
        setError('')
        const response = await fetch(API_ENDPOINT)
        if (!response.ok) {
          throw new Error('Failed to fetch videos')
        }
        const result = await response.json()
        setVideos(result?.data?.data ?? [])
      } catch (fetchError) {
        setError(fetchError.message || 'Unable to load videos')
      } finally {
        setLoading(false)
      }
    }

    loadVideos()
  }, [])

  const parsedVideos = useMemo(() => {
    return videos.map((video) => {
      const details = video.items || {}
      const snippet = details.snippet || {}
      const statistics = details.statistics || {}
      const thumbnail =
        snippet.thumbnails?.high?.url ||
        snippet.thumbnails?.medium?.url ||
        snippet.thumbnails?.default?.url

      return {
        id: details.id,
        title: snippet.title || 'Untitled video',
        channelTitle: snippet.channelTitle || 'Unknown channel',
        thumbnail,
        duration: convertDurationToText(details.contentDetails?.duration),
        views: formatViews(statistics.viewCount),
        publishedAt: formatPublishedDate(snippet.publishedAt),
      }
    })
  }, [videos])

  return (
    <main className="app-shell">
      <header className="top-bar">
        <h1>Video Explorer</h1>
        <p>Discover trending developer videos from the YouTube feed API.</p>
      </header>

      {loading && <p className="state-message">Loading videos...</p>}
      {error && <p className="state-message error">{error}</p>}

      {!loading && !error && (
        <section className="video-grid" aria-label="Video list">
          {parsedVideos.map((video) => (
            <article className="video-card" key={video.id}>
              <div className="thumbnail-wrap">
                <img src={video.thumbnail} alt={video.title} className="thumbnail" />
                {video.duration && <span className="duration">{video.duration}</span>}
              </div>
              <div className="card-body">
                <h2>{video.title}</h2>
                <p className="meta">{video.channelTitle}</p>
                <p className="meta">
                  {video.views} • {video.publishedAt}
                </p>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  )
}

export default App
