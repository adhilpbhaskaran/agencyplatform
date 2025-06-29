'use client'

import { MapPin, Users, Calendar, Award, Heart, Camera, Utensils, Waves } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function AboutBaliPage() {
  const highlights = [
    {
      icon: <Waves className="h-6 w-6" />,
      title: "Pristine Beaches",
      description: "From the black volcanic sands of Lovina to the white beaches of Nusa Dua"
    },
    {
      icon: <Camera className="h-6 w-6" />,
      title: "Cultural Heritage",
      description: "Ancient temples, traditional ceremonies, and vibrant arts scene"
    },
    {
      icon: <Utensils className="h-6 w-6" />,
      title: "Culinary Delights",
      description: "From street food to world-class restaurants, a food lover's paradise"
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Wellness Retreats",
      description: "Yoga, meditation, spa treatments, and holistic healing experiences"
    }
  ]

  const regions = [
    {
      name: "Ubud",
      description: "Cultural heart of Bali with rice terraces, art villages, and spiritual retreats",
      highlights: ["Monkey Forest Sanctuary", "Tegallalang Rice Terraces", "Traditional Markets"]
    },
    {
      name: "Seminyak",
      description: "Upscale beach destination with luxury resorts, fine dining, and vibrant nightlife",
      highlights: ["Beach Clubs", "Designer Boutiques", "Sunset Bars"]
    },
    {
      name: "Canggu",
      description: "Laid-back surf town with black sand beaches and hipster cafes",
      highlights: ["Surf Breaks", "Beach Bars", "Yoga Studios"]
    },
    {
      name: "Nusa Penida",
      description: "Dramatic cliffs, pristine beaches, and incredible snorkeling spots",
      highlights: ["Kelingking Beach", "Angel's Billabong", "Manta Ray Diving"]
    },
    {
      name: "Sanur",
      description: "Peaceful beach town perfect for families and relaxation",
      highlights: ["Calm Waters", "Traditional Fishing Boats", "Sunrise Views"]
    },
    {
      name: "Uluwatu",
      description: "Clifftop temples, world-class surf breaks, and stunning ocean views",
      highlights: ["Uluwatu Temple", "Surf Spots", "Kecak Fire Dance"]
    }
  ]

  const experiences = [
    {
      category: "Adventure",
      activities: ["Volcano Hiking", "White Water Rafting", "ATV Tours", "Zip Lining"]
    },
    {
      category: "Culture",
      activities: ["Temple Tours", "Traditional Cooking Classes", "Art Workshops", "Village Visits"]
    },
    {
      category: "Relaxation",
      activities: ["Spa Treatments", "Yoga Retreats", "Beach Lounging", "Meditation Sessions"]
    },
    {
      category: "Nature",
      activities: ["Rice Terrace Walks", "Waterfall Hikes", "Bird Watching", "Botanical Gardens"]
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40 z-10" />
        <div className="absolute inset-0">
          <div className="w-full h-full bg-gradient-to-br from-green-900 via-blue-900 to-purple-900" />
        </div>
        
        <div className="relative z-20 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl sm:text-6xl font-bold mb-6">
            Discover the Magic of
            <span className="block bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Bali
            </span>
          </h1>
          <p className="text-xl sm:text-2xl mb-8 text-gray-200">
            The Island of Gods awaits with its perfect blend of culture, nature, and spirituality
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/partner-with-us">
              <Button size="lg" className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
                Start Planning Your Bali Experience
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Facts */}
      <section className="py-16 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent mb-2">
                4.2M
              </div>
              <div className="text-muted-foreground">Annual Visitors</div>
            </div>
            <div>
              <div className="text-3xl font-bold bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent mb-2">
                20,000+
              </div>
              <div className="text-muted-foreground">Hindu Temples</div>
            </div>
            <div>
              <div className="text-3xl font-bold bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent mb-2">
                26°C
              </div>
              <div className="text-muted-foreground">Average Temperature</div>
            </div>
            <div>
              <div className="text-3xl font-bold bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent mb-2">
                365
              </div>
              <div className="text-muted-foreground">Days of Paradise</div>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Bali Special */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">What Makes Bali Special?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Bali is more than just a destination—it's a transformative experience that touches the soul.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {highlights.map((highlight, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4 text-white">
                    {highlight.icon}
                  </div>
                  <CardTitle>{highlight.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{highlight.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Regions of Bali */}
      <section className="py-20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Explore Bali's Diverse Regions</h2>
            <p className="text-xl text-muted-foreground">
              Each region offers its own unique character and experiences.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regions.map((region, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-green-500" />
                    {region.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{region.description}</p>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Must-See Highlights:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {region.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Experiences */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Unforgettable Experiences</h2>
            <p className="text-xl text-muted-foreground">
              From adrenaline-pumping adventures to soul-soothing retreats.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {experiences.map((experience, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-center">{experience.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {experience.activities.map((activity, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-sm">
                        <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-full" />
                        {activity}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Best Time to Visit */}
      <section className="py-20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">When to Visit Bali</h2>
            <p className="text-xl text-muted-foreground">
              Bali is beautiful year-round, but timing can enhance your experience.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-green-500" />
                  Dry Season (April - October)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Perfect for outdoor activities, beach time, and exploring. Less rainfall and lower humidity.
                </p>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Best For:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Beach activities and water sports</li>
                    <li>• Hiking and outdoor adventures</li>
                    <li>• Photography and sightseeing</li>
                    <li>• Cultural festivals and events</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-500" />
                  Wet Season (November - March)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Lush green landscapes, fewer crowds, and better prices. Short afternoon showers are common.
                </p>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Best For:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Spa treatments and wellness retreats</li>
                    <li>• Cultural experiences and temple visits</li>
                    <li>• Budget-conscious travelers</li>
                    <li>• Romantic getaways</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Create Unforgettable
            <span className="block bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
              Bali Experiences?
            </span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Partner with us to offer your clients the authentic Bali experience they've been dreaming of.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/partner-with-us">
              <Button size="lg" className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
                Become a Partner
              </Button>
            </Link>
            <Link href="/why-us">
              <Button size="lg" variant="outline">
                Learn More About Our Platform
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}