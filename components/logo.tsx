import { 
  ArrowTrendingUpIcon
} from '@heroicons/react/20/solid'

export default function Logo() {
  return (
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-tr from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <ArrowTrendingUpIcon className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-bl from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Trendella
            </h1>
          </div>
  )
}
