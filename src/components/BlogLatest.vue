<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const articles = [
  {
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop',
    tag: 'Super Food',
    title: '10 Superfoods You Should Eat Every Week',
    excerpt: 'These nutrient powerhouses pack huge health benefits.',
    readTime: '5 min read'
  },
  {
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=2070&auto=format&fit=crop',
    tag: 'Plant-Based',
    title: 'Plant-Based Protein: Complete Guide',
    excerpt: 'Everything you need to know about getting enough protein.',
    readTime: '8 min read'
  },
  {
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2053&auto=format&fit=crop',
    tag: 'Recipes',
    title: 'Heart-Healthy Mediterranean Recipes',
    excerpt: 'Delicious recipes inspired by the world\'s healthiest diet.',
    readTime: '12 min read'
  },
  {
    image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=2070&auto=format&fit=crop',
    tag: 'Nutrition',
    title: 'Understanding Gut Health & Probiotics',
    excerpt: 'Discovering the link between gut health and immunity.',
    readTime: '7 min read'
  }
]
</script>

<template>
  <section id="latest-articles" class="py-20 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-end mb-12" data-aos="fade-right">
        <div>
          <h2 class="text-3xl font-bold text-dark mb-4">Latest Articles</h2>
          <p class="text-gray-600 max-w-2xl">Stay informed with our latest research-backed health insights and practical tips.</p>
        </div>
        <router-link to="/blogs" class="text-dark font-bold hover:text-green-500 transition-colors hidden md:flex items-center gap-2">
            View All Articles 
            <font-awesome-icon icon="arrow-right" />
        </router-link>
      </div>

      <!-- Featured Article / Custom Layout -->
      <div class="grid lg:grid-cols-2 gap-8 mb-16 items-center" data-aos="fade-up">
        <div class="rounded-3xl overflow-hidden shadow-lg h-96 relative group">
            <img src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=2070&auto=format&fit=crop" alt="Fiber Rich Food" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div class="absolute inset-0 bg-dark/20 group-hover:bg-dark/10 transition-colors"></div>
        </div>
        <div class="lg:pl-8">
            <span class="inline-block px-4 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full mb-4 uppercase tracking-wider">Fiber Guide</span>
            <h3 class="text-3xl font-bold text-dark mb-4">The Ultimate Guide to High-Fiber Foods for Better Digestion</h3>
            <p class="text-gray-600 mb-8 leading-relaxed">
                Discover the top fiber-rich foods that can transform your digestive health and boost your energy levels naturally. Learn easy ways to incorporate them into your daily diet.
            </p>
            <router-link to="/blogs/fiber-guide" class="text-dark font-bold hover:text-green-500 flex items-center gap-2 transition-colors">
                Read More
                <font-awesome-icon icon="arrow-right" />
            </router-link>
        </div>
      </div>

      <!-- Grid of Articles -->
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div v-for="(article, index) in articles" :key="article.title" class="bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full border border-gray-100"
        data-aos="fade-up" :data-aos-delay="index * 100">
            <div class="h-48 overflow-hidden relative">
                <img :src="article.image" :alt="article.title" class="w-full h-full object-cover hover:scale-110 transition-transform duration-500">
                <span class="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wide text-dark">{{ article.tag }}</span>
            </div>
            <div class="p-6 flex flex-col flex-grow">
                <h4 class="font-bold text-lg text-dark mb-3 leading-snug line-clamp-2 hover:text-green-600 transition-colors cursor-pointer">{{ article.title }}</h4>
                <p class="text-gray-500 text-sm mb-4 line-clamp-3 flex-grow">{{ article.excerpt }}</p>
                <div class="flex justify-between items-center pt-4 border-t border-gray-100 text-sm text-gray-400">
                    <div class="flex items-center gap-2">
                         <font-awesome-icon icon="clock" />
                         <span>{{ article.readTime }}</span>
                    </div>
                     <router-link to="/blogs/article-1" class="text-green-500 font-bold flex items-center gap-1 cursor-pointer hover:underline">Read More <font-awesome-icon icon="arrow-right" class="text-xs"/></router-link>
                </div>
            </div>
        </div>
      </div>

       <div class="mt-12 text-center md:hidden">
         <a href="#" class="text-primary font-bold hover:text-green-700 inline-flex items-center gap-2">
            View All Articles 
            <font-awesome-icon icon="arrow-right" />
        </a>
      </div>
    </div>
  </section>
</template>
