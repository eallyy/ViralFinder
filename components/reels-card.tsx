import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
  TrendingUp,
  Calendar,
  Eye,
  Heart,
  MessageCircle,
} from 'lucide-react'
import { InstagramThumbnail } from '@/components/instagram-thumbnail'
import { Button } from '@/components/button'

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M"
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(0) + "B"
  }
  return num.toString()
}

function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

  if (diffInHours < 1) {
    return "Şimdi"
  } else if (diffInHours < 24) {
    return `${diffInHours} saat önce`
  } else if (diffInHours < 48) {
    return "1 gün önce"
  } else {
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays} gün önce`
  }
}

function formatDateToDayMonthYear(dateString: string): string {
  const date = new Date(dateString)
  const day = date.getDate()
  const month = date.toLocaleString('en-US', { month: 'short' })
  const year = date.getFullYear()
  return `${day} ${month} ${year}`
}

export interface WinnerReel {
  id: number
  username: string
  link: string
  views: number
  likes: number
  comments: number
  created_at: string
  updated_at: string
  uploaded_at: string
  category: string
  caption: string
  thumbnail: string
  ad_library_link: string
  active_ads: number
  tags: string[] // Added calculated tags
  engagement_rate: number // Added calculated engagement rate
  badge_count: number // Added badge count for sorting
}

export function ReelsCard({ reel }: { reel: WinnerReel }) {
  const timeAgo = formatTimeAgo(reel.created_at)
  const uploadedDate = formatDateToDayMonthYear(reel.uploaded_at)

  return (
    <Card className="flex flex-col h-full overflow-hidden border-0 shadow-sm hover:shadow-xl transition-all duration-500 bg-white cursor-pointer transform hover:-translate-y-1">
      <a href={reel.link} target="_blank" rel="noopener noreferrer" className="flex flex-col flex-1">
        {/* Thumbnail */}
        <div className="relative">
          <InstagramThumbnail
            url={reel.link}
            image={reel.thumbnail}
            username={reel.username}
            tag={reel.category}
            className="group-hover:scale-105 transition-transform duration-500"
          />
          {/* Etiketler */}
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex flex-wrap gap-1">
            {reel.tags?.map((tag, index) => (
              <Badge
                key={tag}
                variant={tag === "Trend" ? "default" : "outline"}
                className={`text-xs font-medium shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 ${
                  tag === "Trend"
                    ? "bg-gradient-to-r from-orange-400 to-red-500 text-white border-orange-300"
                    : "bg-sky-500 text-white border-blue-400"
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {tag === "Trend" && <TrendingUp className="w-3 h-3 mr-1" />}
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* İçerik */}
        <div className="flex flex-col flex-1">
          <CardContent className="flex-1 p-3 sm:p-4 flex flex-col justify-between">
            <div className="space-y-3">
              {/* Üst bilgi */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                    {reel.username}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Calendar className="w-3 h-3" />
                  <span className="inline">{uploadedDate}</span>
                </div>
              </div>

              {/* İstatistikler */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 text-sm">
                <div className="flex items-center gap-1 sm:gap-1.5 p-1.5 sm:p-2 bg-gray-50 rounded-lg">
                  <Eye className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                  <span className="font-medium text-gray-900 text-xs sm:text-sm">
                    {formatNumber(reel.views)}
                  </span>
                </div>
                <div className="flex items-center gap-1 sm:gap-1.5 p-1.5 sm:p-2 bg-red-50 rounded-lg">
                  <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-red-400" />
                  <span className="font-medium text-gray-900 text-xs sm:text-sm">
                    {formatNumber(reel.likes)}
                  </span>
                </div>
                <div className="flex items-center gap-1 sm:gap-1.5 p-1.5 sm:p-2 bg-blue-50 rounded-lg">
                  <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
                  <span className="font-medium text-gray-900 text-xs sm:text-sm">
                    {formatNumber(reel.comments)}
                  </span>
                </div>
              </div>

              {/* Caption */}
              {reel.caption && (
                <p className="text-xs sm:text-sm text-gray-500 line-clamp-3">
                  {reel.caption.slice(0, 200)}
                </p>
              )}
            </div>
          </CardContent>

          <CardFooter className="mt-auto p-3 pt-0 sm:p-4 sm:pt-0">
            { reel.ad_library_link && reel.active_ads > 0 ? (
            <Button 
              color="sky" 
              className="w-full items-center" 
              onClick={(e: any) => {
                e.preventDefault();
                if (reel?.ad_library_link) {
                  window.open(reel.ad_library_link, '_blank')?.focus();
                }
              }}
            >
              <svg className="h-5 w-5" version="1.1" width="512" height="512" x="0" y="0" viewBox="0 0 512 512"><g><path d="M367.457 85.881c-41.982 0-74.801 31.62-104.509 71.788-40.825-51.981-74.967-71.788-115.825-71.788C63.824 85.881 0 194.288 0 309.03c0 71.802 34.737 117.089 92.92 117.089 41.877 0 71.995-19.743 125.536-113.335 0 0 22.319-39.414 37.673-66.564a1758.502 1758.502 0 0 1 17 28.082l25.107 42.236c48.908 81.844 76.158 109.58 125.536 109.58 56.682 0 88.227-45.906 88.227-119.201C512 186.779 446.737 85.881 367.457 85.881zM177.628 287.443c-43.41 68.048-58.427 83.3-82.596 83.3-24.873 0-39.655-21.836-39.655-60.774 0-83.3 41.533-168.477 91.043-168.477 26.811 0 49.217 15.484 83.536 64.616-32.588 49.985-52.328 81.335-52.328 81.335zm163.834-8.567-30.019-50.065c-8.124-13.212-15.909-25.353-23.421-36.484 27.056-41.759 49.373-62.567 75.916-62.567 55.142 0 99.256 81.188 99.256 180.913 0 38.013-12.451 60.07-38.247 60.07-24.726-.001-36.538-16.33-83.485-91.867z" fill="#ffffff" opacity="1" data-original="#ffffff"></path></g></svg>
              Reklam Kütüphanesine Eriş
            </Button>
            ) : (
            <Button color="pink" className="w-full items-center">
              <svg className="h-4 w-4" version="1.1" width="512" height="512" x="0" y="0" viewBox="0 0 24 24"><g><path d="M12 2.162c3.204 0 3.584.012 4.849.07 1.308.06 2.655.358 3.608 1.311.962.962 1.251 2.296 1.311 3.608.058 1.265.07 1.645.07 4.849s-.012 3.584-.07 4.849c-.059 1.301-.364 2.661-1.311 3.608-.962.962-2.295 1.251-3.608 1.311-1.265.058-1.645.07-4.849.07s-3.584-.012-4.849-.07c-1.291-.059-2.669-.371-3.608-1.311-.957-.957-1.251-2.304-1.311-3.608-.058-1.265-.07-1.645-.07-4.849s.012-3.584.07-4.849c.059-1.296.367-2.664 1.311-3.608.96-.96 2.299-1.251 3.608-1.311 1.265-.058 1.645-.07 4.849-.07M12 0C8.741 0 8.332.014 7.052.072 5.197.157 3.355.673 2.014 2.014.668 3.36.157 5.198.072 7.052.014 8.332 0 8.741 0 12c0 3.259.014 3.668.072 4.948.085 1.853.603 3.7 1.942 5.038 1.345 1.345 3.186 1.857 5.038 1.942C8.332 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 1.854-.085 3.698-.602 5.038-1.942 1.347-1.347 1.857-3.184 1.942-5.038.058-1.28.072-1.689.072-4.948 0-3.259-.014-3.668-.072-4.948-.085-1.855-.602-3.698-1.942-5.038C20.643.671 18.797.156 16.948.072 15.668.014 15.259 0 12 0z" fill="#ffffff" opacity="1" data-original="#ffffff"></path><path d="M12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" fill="#ffffff" opacity="1" data-original="#ffffff"></path><circle cx="18.406" cy="5.594" r="1.44" fill="#ffffff" opacity="1" data-original="#ffffff"></circle></g></svg>
              Organik İçerik
            </Button>
            )}
          </CardFooter>
        </div>
      </a>
    </Card>
  )
}
