
import { useState } from 'react'
import {
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  FileSearch,
  FileText,
  ScanSearch,
  Sparkles,
  Target,
  Upload,
} from 'lucide-react'
import { matchResume, type MatchResult } from './api'


function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [jobDescription, setJobDescription] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState<MatchResult | null>(null)
  const handleAnalyze = async () => {
    if (!selectedFile) {
      setError('Please upload your resume as a PDF.')
      return
    }

    if (jobDescription.trim().length < 50) {
      setError('Please enter a job description with at least 50 characters.')
      return
    }

    setError('')
    setResult(null)
    setIsAnalyzing(true)

    try {
      const analysis = await matchResume(selectedFile, jobDescription)
      setResult(analysis)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again.',
      )
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#fafafa] text-zinc-900">
      <header className="sticky top-0 z-10 border-b border-zinc-200/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6 lg:px-10">
          <a href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 text-white shadow-lg shadow-violet-600/20">
              <BrainCircuit size={23} />
            </div>
            <div>
              <p className="text-lg font-bold tracking-tight">ResuMatch<span className="text-violet-600"> AI</span></p>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-400">Career intelligence</p>
            </div>
          </a>

          <div className="hidden items-center gap-7 text-sm font-medium text-zinc-500 md:flex">
            <a href="#analyzer" className="transition hover:text-violet-600">Resume analyzer</a>
            <a href="#how-it-works" className="transition hover:text-violet-600">How it works</a>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            AI workspace
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden border-b border-zinc-200/70 bg-white">
          <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-violet-200/40 blur-3xl" />
          <div className="pointer-events-none absolute -right-20 top-20 h-80 w-80 rounded-full bg-blue-100/60 blur-3xl" />

          <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 py-20 md:py-28 lg:grid-cols-[1.15fr_0.85fr] lg:px-10">
            <div>
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-xs font-semibold text-violet-700">
                <Sparkles size={15} />
                Your next opportunity starts here
              </div>

              <h1 className="max-w-2xl text-5xl font-semibold leading-[1.08] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
                Make your resume work
                <span className="block bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text pb-2 text-transparent">
                  as hard as you do.
                </span>
              </h1>

              <p className="mt-7 max-w-xl text-base leading-8 text-zinc-500 sm:text-lg">
                Understand how your resume aligns with a job. Discover skill gaps,
                uncover relevant experience, and get actionable feedback — all in one place.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <a
                  href="#analyzer"
                  className="inline-flex items-center gap-3 rounded-xl bg-violet-600 px-6 py-4 text-sm font-semibold text-white shadow-xl shadow-violet-600/20 transition hover:-translate-y-0.5 hover:bg-violet-700"
                >
                  Analyze my resume <ArrowRight size={17} />
                </a>
                <a
                  href="#how-it-works"
                  className="rounded-xl border border-zinc-200 bg-white px-6 py-4 text-sm font-semibold text-zinc-700 transition hover:border-violet-300"
                >
                  See how it works
                </a>
              </div>

              <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-xs font-medium text-zinc-500">
                <span className="flex items-center gap-2"><CheckCircle2 size={15} className="text-emerald-600" /> Skills gap analysis</span>
                <span className="flex items-center gap-2"><CheckCircle2 size={15} className="text-emerald-600" /> Explainable results</span>
                <span className="flex items-center gap-2"><CheckCircle2 size={15} className="text-emerald-600" /> Actionable feedback</span>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-md">
              <div className="absolute -inset-5 rounded-[2rem] bg-gradient-to-br from-violet-200/60 to-blue-100/60 blur-2xl" />
              <div className="relative rounded-3xl border border-zinc-200 bg-white p-6 shadow-2xl shadow-zinc-300/40 sm:p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold">Match overview</p>
                    <p className="mt-1 text-xs text-zinc-400">A clearer picture of your fit</p>
                  </div>
                  <div className="rounded-xl bg-violet-50 p-3 text-violet-600">
                    <Target size={22} />
                  </div>
                </div>

                <div className="mt-8 flex items-center gap-5 rounded-2xl bg-zinc-50 p-5">
                  <div className="relative flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-[7px] border-violet-100">
                    <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full -rotate-90">
                      <circle cx="50" cy="50" r="43" fill="none" stroke="#7c3aed" strokeWidth="7" strokeLinecap="round" strokeDasharray="180 270" />
                    </svg>
                    <span className="text-2xl font-bold">—</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Your match score</p>
                    <p className="mt-1 text-xs leading-5 text-zinc-500">Your personalized results will appear after you analyze a resume.</p>
                  </div>
                </div>

                <div className="mt-6 space-y-5">
                  <div>
                    <div className="mb-2 flex items-center justify-between text-xs">
                      <span className="font-medium text-zinc-600">Skills alignment</span>
                      <span className="text-zinc-400">Awaiting analysis</span>
                    </div>
                    <div className="h-2 rounded-full bg-zinc-100" />
                  </div>
                  <div>
                    <div className="mb-2 flex items-center justify-between text-xs">
                      <span className="font-medium text-zinc-600">Experience relevance</span>
                      <span className="text-zinc-400">Awaiting analysis</span>
                    </div>
                    <div className="h-2 rounded-full bg-zinc-100" />
                  </div>
                  <div>
                    <div className="mb-2 flex items-center justify-between text-xs">
                      <span className="font-medium text-zinc-600">Keyword coverage</span>
                      <span className="text-zinc-400">Awaiting analysis</span>
                    </div>
                    <div className="h-2 rounded-full bg-zinc-100" />
                  </div>
                </div>

                <div className="mt-7 flex items-start gap-3 rounded-xl border border-violet-100 bg-violet-50/70 p-4">
                  <Sparkles size={17} className="mt-0.5 shrink-0 text-violet-600" />
                  <p className="text-xs leading-5 text-violet-900">
                    Get evidence-based suggestions to strengthen your application, not just a number.
                  </p>
                </div>
              </div>
              <div className="absolute -right-4 -top-5 hidden items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-3 shadow-lg sm:flex">
                <FileSearch size={19} className="text-violet-600" />
                <span className="text-xs font-semibold">Resume intelligence</span>
              </div>
            </div>
          </div>
        </section>

        <section id="analyzer" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-20 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-violet-600">Get started</span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Your next application, analyzed.</h2>
            <p className="mt-4 leading-7 text-zinc-500">Bring your resume and a target job description together to discover where you stand.</p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-zinc-200 bg-white p-7 shadow-sm sm:p-9">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-violet-50 p-3 text-violet-600"><FileText size={22} /></div>
                <div>
                  <h3 className="font-semibold">Your resume</h3>
                  <p className="mt-1 text-xs text-zinc-400">PDF format · Up to 10 MB</p>
                </div>
              </div>
              <div className="mt-7 flex min-h-52 flex-col items-center justify-center rounded-xl border-2 border-dashed border-zinc-200 bg-zinc-50/70 px-5 text-center">
                <div className="rounded-full bg-white p-4 text-violet-600 shadow-sm"><Upload size={23} /></div>
                <label htmlFor="resume-upload" className="mt-4 cursor-pointer text-sm font-semibold text-violet-700 hover:text-violet-800">
                  {selectedFile ? selectedFile.name : 'Choose your PDF resume'}
                </label>
                <input
                  id="resume-upload"
                  type="file"
                  accept=".pdf,application/pdf"
                  className="mt-3 max-w-full text-xs text-zinc-500"
                  onChange={(event) => {
                    const file = event.target.files?.[0] ?? null
                    setSelectedFile(file)
                    setError('')
                    setResult(null)
                  }}
                />
                <p className="mt-2 max-w-xs text-xs leading-5 text-zinc-500">
                  PDF only · Maximum 10 MB
                </p>
                <p className="mt-2 max-w-xs text-xs leading-5 text-zinc-500">We'll connect this area to the resume parser and analysis API.</p>
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-white p-7 shadow-sm sm:p-9">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-blue-50 p-3 text-blue-600"><ScanSearch size={22} /></div>
                <div>
                  <h3 className="font-semibold">Target job</h3>
                  <p className="mt-1 text-xs text-zinc-400">Job description</p>
                </div>
              </div>
              <div className="mt-7 flex min-h-52 flex-col items-center justify-center rounded-xl border-2 border-dashed border-zinc-200 bg-zinc-50/70 px-5 text-center">
                <div className="rounded-full bg-white p-4 text-blue-600 shadow-sm"><FileText size={23} /></div>
                <label htmlFor="job-description" className="mt-4 text-sm font-semibold text-zinc-700">
                  Paste the job description
                </label>
                <textarea
                  id="job-description"
                  value={jobDescription}
                  onChange={(event) => {
                    setJobDescription(event.target.value)
                    setError('')
                    setResult(null)
                  }}
                  placeholder="Paste the job requirements, skills, and qualifications here..."
                  rows={5}
                  maxLength={20000}
                  className="mt-3 w-full resize-y rounded-lg border border-zinc-200 bg-white p-3 text-sm text-zinc-800 outline-none transition placeholder:text-zinc-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
                />
                <p className="mt-2 text-xs text-zinc-400">
                  {jobDescription.length}/20,000 characters · Minimum 50 characters
                </p>
                <p className="mt-2 max-w-xs text-xs leading-5 text-zinc-500">We'll add a job description editor and connect it to the matching engine.</p>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-8 max-w-5xl">
            {error && (
              <div role="alert" className="mb-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                {error}
              </div>
            )}

            <button
              type="button"
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="flex w-full items-center justify-center gap-3 rounded-xl bg-violet-600 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-violet-600/20 transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isAnalyzing ? 'Analyzing your resume...' : 'Analyze Resume'}
              {!isAnalyzing && <ArrowRight size={17} />}
            </button>

            <p className="mt-4 text-center text-xs text-zinc-400">
              Results are based on recognized skill overlap and do not predict hiring outcomes.
            </p>
          </div>

        </section>

        {result && (
          <section className="border-y border-zinc-200 bg-white py-16">
            <div className="mx-auto max-w-5xl px-6 lg:px-10">
              <div className="mb-8">
                <span className="text-xs font-bold uppercase tracking-[0.22em] text-violet-600">
                  Analysis complete
                </span>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                  Your resume match report
                </h2>
                <p className="mt-2 text-sm text-zinc-500">
                  Results for {result.filename}
                </p>
              </div>

              {result.match_score === null ? (
                <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-800">
                  {result.message}
                </div>
              ) : (
                <>
                  <div className="rounded-2xl border border-violet-100 bg-violet-50/60 p-6">
                    <p className="text-sm font-medium text-zinc-600">
                      Recognized skill overlap
                    </p>
                    <p className="mt-2 text-5xl font-bold text-violet-700">
                      {result.match_score}%
                    </p>
                    <p className="mt-3 text-sm leading-6 text-zinc-600">
                      {result.message}
                    </p>
                  </div>

                  <div className="mt-6 grid gap-5 md:grid-cols-3">
                    {[
                      {
                        title: 'Matched skills',
                        skills: result.matched_skills,
                        style: 'border-emerald-200 bg-emerald-50 text-emerald-800',
                      },
                      {
                        title: 'Missing skills',
                        skills: result.missing_skills,
                        style: 'border-amber-200 bg-amber-50 text-amber-800',
                      },
                      {
                        title: 'Resume skills detected',
                        skills: result.resume_skills,
                        style: 'border-zinc-200 bg-zinc-50 text-zinc-700',
                      },
                    ].map((group) => (
                      <div
                        key={group.title}
                        className="rounded-2xl border border-zinc-200 bg-white p-5"
                      >
                        <h3 className="font-semibold">{group.title}</h3>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {group.skills.length > 0 ? (
                            group.skills.map((skill) => (
                              <span
                                key={skill}
                                className={`rounded-full border px-3 py-1.5 text-xs font-medium ${group.style}`}
                              >
                                {skill}
                              </span>
                            ))
                          ) : (
                            <p className="text-sm text-zinc-400">None detected</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </section>
        )}

        <section id="how-it-works" className="border-y border-zinc-200 bg-white py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="max-w-xl">
              <span className="text-xs font-bold uppercase tracking-[0.22em] text-violet-600">Simple by design</span>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Clarity at every step.</h2>
              <p className="mt-4 leading-7 text-zinc-500">A transparent workflow to help you make more informed application decisions.</p>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {[
                { number: '01', title: 'Upload your resume', description: 'Extract relevant skills, experience, and qualifications from your document.', icon: Upload },
                { number: '02', title: 'Compare with a job', description: 'Analyze job requirements against the evidence present in your resume.', icon: ScanSearch },
                { number: '03', title: 'Improve with insight', description: 'Review matching strengths, missing skills, and practical recommendations.', icon: Sparkles },
              ].map((step) => {
                const Icon = step.icon
                return (
                  <div key={step.number} className="rounded-2xl border border-zinc-200 bg-zinc-50/60 p-7">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-violet-600">{step.number}</span>
                      <Icon size={22} className="text-zinc-400" />
                    </div>
                    <h3 className="mt-8 text-lg font-semibold">{step.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-zinc-500">{step.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#fafafa]">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-8 text-xs text-zinc-400 sm:flex-row sm:items-center sm:justify-between lg:px-10">
          <p className="font-semibold text-zinc-600">ResuMatch AI</p>
          <p>Resume intelligence for more informed career decisions.</p>
          <p>Analysis scores are indicators, not hiring guarantees.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
