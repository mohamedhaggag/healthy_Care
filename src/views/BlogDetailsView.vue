<script setup>
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const route = useRoute()
const router = useRouter()

// Mock data - in a real app this would be fetched based on route.params.id
const article = {
  title: 'The Ultimate Guide to High-Fiber Foods for Better Digestion',
  author: 'Dr. Sarah Ahmed',
  date: 'December 15, 2024',
  readTime: '8 min read',
  image: 'https://images.unsplash.com/photo-1623341214825-9f4f963727d5?q=80&w=2072&auto=format&fit=crop',
  content: `
    <p class="mb-6">Fiber is one of the most important nutrients for maintaining optimal digestive health, yet most people don't get nearly enough of it in their daily diet. The recommended daily intake is 25-30 grams, but the average adult consumes only about 15 grams per day.</p>
    
    <p class="mb-6">There are two main types of fiber: soluble and insoluble. Soluble fiber dissolves in water and forms a gel-like substance in your digestive tract, helping to lower cholesterol and regulate blood sugar levels. Insoluble fiber doesn't dissolve and adds bulk to your stool, promoting regular bowel movements.</p>
    
    <p class="mb-6">Some of the best sources of soluble fiber include oats, beans, lentils, apples, and citrus fruits. These foods are excellent for heart health and can help you feel full longer after meals.</p>
    
    <p class="mb-6">For insoluble fiber, look to whole grains, nuts, vegetables like cauliflower and green beans, and the skins of fruits and vegetables. These foods help prevent constipation and support overall gut health.</p>
    
    <p class="mb-6">To increase your fiber intake gradually, start by adding one high-fiber food to each meal. This could be a handful of berries with breakfast, a side of vegetables at lunch, and whole grains at dinner. Drinking plenty of water is essential when increasing fiber intake to help it move through your digestive system smoothly.</p>
    
    <p class="mb-6">Legumes are fiber superstars, with one cup of cooked lentils providing about 15 grams of fiber. Black beans, chickpeas, and split peas are also excellent choices that can be easily added to soups, salads, and main dishes.</p>
    
    <p>Remember that increasing fiber too quickly can cause bloating and discomfort. Take it slow, stay hydrated, and your digestive system will thank you for the healthy changes.</p>
  `
}

const relatedArticles = [
  {
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop',
    tag: 'Super Food',
    title: '10 Superfoods You Should Eat Every Week',
    readTime: '5 min read'
  },
  {
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=2070&auto=format&fit=crop',
    tag: 'Plant-Based',
    title: 'Plant-Based Protein: Complete Guide',
    readTime: '8 min read'
  },
  {
    image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=2070&auto=format&fit=crop',
    tag: 'Nutrition',
    title: 'Understanding Gut Health & Probiotics',
    readTime: '7 min read'
  }
]

onMounted(() => {
  window.scrollTo(0, 0)
})
</script>

<template>
  <main class="bg-white">
    <!-- Hero Section -->
    <section class="relative h-[60vh] min-h-[500px] flex items-end pb-20 overflow-hidden">
        <div class="absolute inset-0 z-0">
            <img :src="article.image" alt="Article Hero" class="w-full h-full object-cover" />
            <div class="absolute inset-0 bg-gradient-to-t from-dark via-dark/60 to-transparent"></div>
        </div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
            <router-link to="/blogs" class="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors group">
                <font-awesome-icon icon="arrow-left" class="mr-2 group-hover:-translate-x-1 transition-transform"/> Back to Blog
            </router-link>
            
            <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-white max-w-4xl leading-tight mb-4" data-aos="fade-up">
                {{ article.title }}
            </h1>
        </div>
    </section>

    <!-- Metadata & Content -->
    <section class="py-12">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 relative">
            <!-- Metadata Bar -->
            <div class="flex flex-wrap items-center justify-between gap-6 py-6 border-b border-gray-100 mb-12" data-aos="fade-up">
                <div class="flex flex-wrap gap-6 text-sm text-gray-500 font-medium">
                    <div class="flex items-center gap-2">
                        <div class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                             <font-awesome-icon icon="user" class="text-xs" />
                        </div>
                        {{ article.author }}
                    </div>
                     <div class="flex items-center gap-2">
                        <font-awesome-icon icon="calendar" />
                        {{ article.date }}
                    </div>
                     <div class="flex items-center gap-2">
                        <font-awesome-icon icon="clock" />
                        {{ article.readTime }}
                    </div>
                </div>

                 <button class="px-6 py-2 border border-gray-200 rounded-full text-sm font-bold text-gray-600 hover:border-green-500 hover:text-green-500 transition-all flex items-center gap-2">
                    <font-awesome-icon icon="share-nodes" /> Share
                </button>
            </div>

            <!-- Article Body -->
            <article class="prose prose-lg prose-green max-w-none text-gray-600 leading-relaxed" v-html="article.content" data-aos="fade-up">
            </article>

            <!-- Divider -->
             <hr class="my-16 border-gray-100" />
        </div>
    </section>

    <!-- Related Articles -->
    <section class="pb-24 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <h3 class="text-2xl font-bold text-dark mb-8" data-aos="fade-right">Related Articles</h3>
             
             <div class="grid md:grid-cols-3 gap-8">
                <div v-for="(related, index) in relatedArticles" :key="index" class="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 group cursor-pointer" data-aos="fade-up" :data-aos-delay="index * 100">
                     <div class="h-48 overflow-hidden relative">
                        <img :src="related.image" :alt="related.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                        <span class="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wide text-dark">{{ related.tag }}</span>
                    </div>
                    <div class="p-6">
                        <h4 class="font-bold text-lg text-dark mb-3 leading-snug group-hover:text-green-600 transition-colors">{{ related.title }}</h4>
                        <div class="flex justify-between items-center text-sm text-gray-400 mt-4">
                            <span class="flex items-center gap-2"><font-awesome-icon icon="clock" /> {{ related.readTime }}</span>
                            <span class="text-green-500 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">Read More <font-awesome-icon icon="arrow-right" class="text-xs"/></span>
                        </div>
                    </div>
                </div>
             </div>
        </div>
    </section>
  </main>
</template>
