"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Cloud, CloudRain, Droplets, Sun, Wind } from "lucide-react"
import { format, subDays } from "date-fns"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function WeatherApp() {
  const [currentDayIndex, setCurrentDayIndex] = useState(0)

  // Generate mock data for the last 7 days
  const weatherData = Array.from({ length: 7 }, (_, i) => {
    const date = subDays(new Date(), i)
    const isToday = i === 0

    return {
      date,
      formattedDate: format(date, "EEEE, MMMM d"),
      isToday,
      temperature: Math.floor(Math.random() * 15) + 15, // Random temp between 15-30°C
      feelsLike: Math.floor(Math.random() * 15) + 13,
      condition: ["Sunny", "Cloudy", "Rainy", "Partly Cloudy"][Math.floor(Math.random() * 4)],
      humidity: Math.floor(Math.random() * 30) + 50, // Random humidity between 50-80%
      windSpeed: Math.floor(Math.random() * 20) + 5, // Random wind speed between 5-25 km/h
      precipitation: Math.floor(Math.random() * 80), // Random precipitation chance 0-80%
      hourlyForecast: Array.from({ length: 8 }, (_, hourIndex) => ({
        time: `${hourIndex + 8}:00`,
        temperature: Math.floor(Math.random() * 10) + 15,
        condition: ["Sunny", "Cloudy", "Rainy", "Partly Cloudy"][Math.floor(Math.random() * 4)],
      })),
    }
  })

  const currentWeather = weatherData[currentDayIndex]

  const handlePrevDay = () => {
    if (currentDayIndex < weatherData.length - 1) {
      setCurrentDayIndex(currentDayIndex + 1)
    }
  }

  const handleNextDay = () => {
    if (currentDayIndex > 0) {
      setCurrentDayIndex(currentDayIndex - 1)
    }
  }

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case "Sunny":
        return <Sun className="h-8 w-8 text-yellow-500" />
      case "Cloudy":
        return <Cloud className="h-8 w-8 text-gray-500" />
      case "Rainy":
        return <CloudRain className="h-8 w-8 text-blue-500" />
      case "Partly Cloudy":
        return <Cloud className="h-8 w-8 text-gray-400" />
      default:
        return <Sun className="h-8 w-8 text-yellow-500" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-sky-50 p-4 md:p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">Weather Forecast</h1>

        {/* Main Weather Card */}
        <Card className="mb-6 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-sky-200 to-blue-200 pb-8">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold">
                {currentWeather.formattedDate}
                {currentWeather.isToday && <span className="ml-2 text-sm font-normal text-gray-600">(Today)</span>}
              </CardTitle>
              <div className="flex items-center gap-2">
                {getWeatherIcon(currentWeather.condition)}
                <span className="text-2xl font-bold">{currentWeather.temperature}°C</span>
              </div>
            </div>
            <CardDescription className="text-lg text-gray-700">{currentWeather.condition}</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="flex items-center gap-2">
                <Droplets className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm text-gray-500">Humidity</p>
                  <p className="font-medium">{currentWeather.humidity}%</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Wind className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm text-gray-500">Wind Speed</p>
                  <p className="font-medium">{currentWeather.windSpeed} km/h</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <CloudRain className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm text-gray-500">Precipitation</p>
                  <p className="font-medium">{currentWeather.precipitation}%</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Day Carousel */}
        <div className="mb-8 flex items-center justify-between">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrevDay}
            disabled={currentDayIndex >= weatherData.length - 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="flex flex-1 justify-center overflow-hidden">
            <div className="flex gap-2 overflow-x-auto px-2 py-2 md:gap-4">
              {weatherData.map((day, index) => (
                <Button
                  key={index}
                  variant={currentDayIndex === index ? "default" : "outline"}
                  className="flex-shrink-0 flex-col items-center px-3 py-2"
                  onClick={() => setCurrentDayIndex(index)}
                >
                  <span className="text-xs">{format(day.date, "EEE")}</span>
                  <div className="my-1">{getWeatherIcon(day.condition)}</div>
                  <span className="text-sm font-bold">{day.temperature}°</span>
                </Button>
              ))}
            </div>
          </div>

          <Button variant="outline" size="icon" onClick={handleNextDay} disabled={currentDayIndex <= 0}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Hourly Forecast */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Hourly Forecast</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {currentWeather.hourlyForecast.map((hour, index) => (
                <div key={index} className="flex flex-col items-center">
                  <span className="text-sm text-gray-500">{hour.time}</span>
                  {getWeatherIcon(hour.condition)}
                  <span className="font-medium">{hour.temperature}°</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
