const configuredApiUrl = import.meta.env.VITE_API_BASE_URL?.trim().replace(/\/$/, '')
const API_BASE_URL = configuredApiUrl
  ? (configuredApiUrl.endsWith('/api/v1') ? configuredApiUrl : `${configuredApiUrl}/api/v1`)
  : 'http://127.0.0.1:8000/api/v1'

export interface MatchResult {
  filename: string
  match_score: number | null
  score_type?: string
  message: string
  resume_skills: string[]
  job_skills: string[]
  matched_skills: string[]
  missing_skills: string[]
}

export async function matchResume(
  resume: File,
  jobDescription: string,
): Promise<MatchResult> {
  const formData = new FormData()
  formData.append('resume', resume)
  formData.append('job_description', jobDescription)

  const response = await fetch(`${API_BASE_URL}/resume/match`, {
    method: 'POST',
    body: formData,
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(
      typeof data.detail === 'string'
        ? data.detail
        : 'Unable to analyze this resume. Please try again.',
    )
  }

  return data as MatchResult
}
