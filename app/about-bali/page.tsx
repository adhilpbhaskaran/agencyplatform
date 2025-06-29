'use client'

import { MapPin, Users, Calendar, Award, Heart, Camera, Utensils, Waves, Mountain, Palmtree, Sun } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function AboutBaliPage() {
  const galleryCategories = [
    {
      id: 'beaches',
      title: 'Pristine Beaches',
      description: 'Discover Bali\'s stunning coastline from volcanic black sands to pristine white beaches',
      icon: <Waves className="h-8 w-8" />,
      images: [
        {
          url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop&auto=format&q=80',
          alt: 'Seminyak Beach sunset with golden sky',
          caption: 'Seminyak Beach - Perfect for sunset viewing'
        },
        {
          url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop&auto=format&q=80',
          alt: 'Nusa Dua white sand beach with clear blue water',
          caption: 'Nusa Dua - Crystal clear waters and white sand'
        },
        {
          url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&auto=format&q=80',
          alt: 'Uluwatu cliff beach with dramatic rock formations',
          caption: 'Uluwatu - Dramatic cliffs and hidden beaches'
        },
        {
          url: 'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=800&h=600&fit=crop&auto=format&q=80',
          alt: 'Canggu black sand beach with surfers',
          caption: 'Canggu - Black volcanic sand and world-class surf'
        }
      ]
    },
    {
      id: 'culture',
      title: 'Rich Cultural Heritage',
      description: 'Experience ancient temples, traditional ceremonies, and vibrant Balinese arts',
      icon: <Camera className="h-8 w-8" />,
      images: [
        {
          url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop&auto=format&q=80',
          alt: 'Traditional Balinese temple with intricate stone carvings',
          caption: 'Tanah Lot Temple - Iconic sea temple'
        },
        {
          url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&auto=format&q=80',
          alt: 'Traditional Balinese dance performance with colorful costumes',
          caption: 'Kecak Fire Dance - Traditional cultural performance'
        },
        {
          url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop&auto=format&q=80',
          alt: 'Balinese Hindu ceremony with offerings and incense',
          caption: 'Hindu Ceremonies - Daily spiritual rituals'
        },
        {
          url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop&auto=format&q=80',
          alt: 'Traditional Balinese art market with handcrafted items',
          caption: 'Ubud Art Market - Traditional crafts and artwork'
        }
      ]
    },
    {
      id: 'nature',
      title: 'Breathtaking Nature',
      description: 'From emerald rice terraces to volcanic peaks and tropical rainforests',
      icon: <Mountain className="h-8 w-8" />,
      images: [
        {
          url: 'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=800&h=600&fit=crop&auto=format&q=80',
          alt: 'Jatiluwih rice terraces with morning mist',
          caption: 'Jatiluwih Rice Terraces - UNESCO World Heritage'
        },
        {
          url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop&auto=format&q=80',
          alt: 'Mount Batur sunrise trek with volcanic landscape',
          caption: 'Mount Batur - Sunrise trekking adventure'
        },
        {
          url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&auto=format&q=80',
          alt: 'Sekumpul waterfall cascading through tropical forest',
          caption: 'Sekumpul Waterfall - Hidden jungle paradise'
        },
        {
          url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop&auto=format&q=80',
          alt: 'Monkey Forest Sanctuary with ancient trees',
          caption: 'Sacred Monkey Forest - Ancient spiritual sanctuary'
        }
      ]
    },
    {
      id: 'cuisine',
      title: 'Culinary Paradise',
      description: 'Savor authentic Balinese flavors from street food to fine dining experiences',
      icon: <Utensils className="h-8 w-8" />,
      images: [
        {
          url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop&auto=format&q=80',
          alt: 'Traditional Balinese nasi goreng with fresh ingredients',
          caption: 'Nasi Goreng - Authentic Indonesian fried rice'
        },
        {
          url: 'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=800&h=600&fit=crop&auto=format&q=80',
          alt: 'Balinese satay grilling over coconut charcoal',
          caption: 'Satay Lilit - Traditional Balinese grilled meat'
        },
        {
          url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop&auto=format&q=80',
          alt: 'Fresh tropical fruits at local market',
          caption: 'Tropical Fruits - Fresh local produce'
        },
        {
          url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&auto=format&q=80',
          alt: 'Fine dining restaurant with rice field views',
          caption: 'Fine Dining - World-class restaurants with views'
        }
      ]
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
      <div className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1920&h=1080&fit=crop&crop=center&auto=format&q=80" 
            alt="Stunning Bali landscape with rice terraces and tropical beauty"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 via-transparent to-blue-500/20" />
        </div>
        
        <div className="relative z-20 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl sm:text-7xl font-bold mb-6">
            Discover the Magic of
            <span className="block bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Bali
            </span>
          </h1>
          <p className="text-xl sm:text-2xl mb-8 text-white/90">
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

      {/* Gallery Categories */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Discover the Beauty of Bali</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Immerse yourself in the stunning landscapes, rich culture, and unforgettable experiences that make Bali truly magical.
            </p>
          </div>
          
          <div className="space-y-20">
            {galleryCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="">
                <div className="text-center mb-12">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center mx-auto mb-6 text-white">
                    {category.icon}
                  </div>
                  <h3 className="text-3xl font-bold mb-4">{category.title}</h3>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    {category.description}
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.images.map((image, imageIndex) => (
                    <Card key={imageIndex} className="overflow-hidden group hover:shadow-xl transition-all duration-300">
                      <div className="relative h-64 overflow-hidden">
                        <img
                          src={image.url}
                          alt={image.alt}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                      </div>
                      <CardContent className="p-4">
                        <p className="text-sm text-muted-foreground text-center">
                          {image.caption}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
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