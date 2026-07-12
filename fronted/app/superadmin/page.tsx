import React, { Suspense } from 'react'
import StatServer from './aiusagestats/StatsServer'
import LogServer from './aiusagestats/LogServer'
import { StatsSkeleton, LogSkeleton } from './aiusagestats/aiusage-skeleton'

const page = () => {
  return (
    <div className="space-y-6">
      <Suspense fallback={<StatsSkeleton />}>
        <StatServer />
      </Suspense>

      <Suspense fallback={<LogSkeleton />}>
        <LogServer />
      </Suspense>
    </div>
  )
}

export default page
