<template>
  <div class="flex h-screen bg-[#f8faff]">
    <!-- Shared Sidebar -->
    <DoctorSidebar />

    <!-- Main Content -->
    <main class="flex-1 overflow-y-auto ml-64 p-10 animate-fade-in">
      <!-- Header -->
      <header class="flex justify-between items-center mb-10">
        <div>
          <h1 class="text-2xl font-bold text-[#0a4d8c]">My Blogs</h1>
          <p class="text-sm text-slate-500 mt-1">Manage and publish your health articles</p>
        </div>
        <button @click="showAddBlogModal = true" class="px-6 py-3 bg-[#00c288] text-white rounded-xl font-semibold hover:bg-[#00a872] transition-colors shadow-lg flex items-center gap-2">
          <font-awesome-icon icon="plus" />
          Create New Blog
        </button>
      </header>

      <!-- Stats Cards -->
      <div class="grid grid-cols-4 gap-6 mb-10 animate-slide-up">
        <div v-for="(stat, index) in stats" :key="index" class="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex justify-between items-start" :style="{ animationDelay: `${index * 100}ms` }">
          <div>
            <p class="text-xs text-slate-500 font-medium mb-1">{{ stat.label }}</p>
            <h3 class="text-3xl font-bold text-[#0a4d8c]">{{ stat.value }}</h3>
            <p :class="['text-xs mt-2 inline-flex items-center gap-1', stat.trendUp ? 'text-green-500' : 'text-orange-500']">
               <font-awesome-icon :icon="stat.trendUp ? 'arrow-up' : 'arrow-down'" />
               {{ stat.trend }}
            </p>
          </div>
          <div :class="['w-12 h-12 rounded-xl flex items-center justify-center', stat.bgColor]">
            <font-awesome-icon :icon="stat.icon" :class="stat.iconColor" />
          </div>
        </div>
      </div>

      <!-- Blogs Grid -->
      <div class="grid grid-cols-3 gap-6 animate-slide-up" style="animation-delay: 400ms">
        <div v-for="blog in blogs" :key="blog.id" 
             class="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 group">
          <div class="relative h-48 overflow-hidden">
            <img :src="blog.image" :alt="blog.title" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            <div :class="['absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase', blog.status === 'Published' ? 'bg-green-500 text-white' : 'bg-orange-500 text-white']">
              {{ blog.status }}
            </div>
            <div class="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur rounded-md text-xs font-bold text-[#0a4d8c]">
              {{ blog.category }}
            </div>
          </div>
          
          <div class="p-6">
            <h3 class="text-lg font-bold text-slate-800 mb-2 line-clamp-2">{{ blog.title }}</h3>
            <p class="text-sm text-slate-500 mb-4 line-clamp-2">{{ blog.excerpt }}</p>
            
            <div class="flex items-center justify-between mb-4 text-xs text-slate-400">
              <div class="flex items-center gap-4">
                <div class="flex items-center gap-1">
                  <font-awesome-icon icon="eye" />
                  <span>{{ blog.views }}</span>
                </div>
                <div class="flex items-center gap-1">
                  <font-awesome-icon icon="heart" />
                  <span>{{ blog.likes }}</span>
                </div>
                <div class="flex items-center gap-1">
                  <font-awesome-icon icon="comment" />
                  <span>{{ blog.comments }}</span>
                </div>
              </div>
            </div>

            <div class="flex items-center justify-between text-xs text-slate-400 mb-4">
              <span>{{ blog.date }}</span>
              <span>{{ blog.readTime }} read</span>
            </div>

            <div class="flex gap-2">
              <button class="flex-1 py-2 bg-[#0a4d8c] text-white rounded-xl text-sm font-semibold hover:bg-[#083d70] transition-colors">
                Edit
              </button>
              <button class="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
                <font-awesome-icon icon="eye" class="text-slate-600" />
              </button>
              <button class="p-2 border border-slate-200 rounded-xl hover:bg-red-50 transition-colors">
                <font-awesome-icon icon="trash" class="text-red-500" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Add Blog Modal -->
      <div v-if="showAddBlogModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in" @click.self="showAddBlogModal = false">
        <div class="bg-white rounded-3xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto animate-slide-up">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold text-[#0a4d8c]">Create New Blog</h2>
            <button @click="showAddBlogModal = false" class="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors">
              <font-awesome-icon icon="times" class="text-slate-400" />
            </button>
          </div>

          <form @submit.prevent="handleAddBlog" class="space-y-6">
            <div>
              <label class="block text-sm font-semibold text-slate-700 mb-2">Blog Title</label>
              <input v-model="newBlog.title" type="text" required class="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0a4d8c]/20 outline-none transition-all" placeholder="Enter blog title" />
            </div>

            <div>
              <label class="block text-sm font-semibold text-slate-700 mb-2">Category</label>
              <select v-model="newBlog.category" required class="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0a4d8c]/20 outline-none transition-all">
                <option value="">Select category</option>
                <option value="Nutrition">Nutrition</option>
                <option value="Fitness">Fitness</option>
                <option value="Mental Health">Mental Health</option>
                <option value="Wellness">Wellness</option>
                <option value="Diet">Diet</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-semibold text-slate-700 mb-2">Excerpt</label>
              <textarea v-model="newBlog.excerpt" required rows="3" class="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0a4d8c]/20 outline-none transition-all resize-none" placeholder="Brief description of your blog"></textarea>
            </div>

            <div>
              <label class="block text-sm font-semibold text-slate-700 mb-2">Content</label>
              <textarea v-model="newBlog.content" required rows="8" class="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0a4d8c]/20 outline-none transition-all resize-none" placeholder="Write your blog content here..."></textarea>
            </div>

            <div>
              <label class="block text-sm font-semibold text-slate-700 mb-2">Featured Image URL</label>
              <input v-model="newBlog.image" type="url" required class="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0a4d8c]/20 outline-none transition-all" placeholder="https://example.com/image.jpg" />
            </div>

            <div class="flex gap-3">
              <button type="submit" class="flex-1 py-3 bg-[#00c288] text-white rounded-xl font-semibold hover:bg-[#00a872] transition-colors">
                Publish Blog
              </button>
              <button type="button" @click="showAddBlogModal = false" class="px-6 py-3 border border-slate-200 rounded-xl font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import DoctorSidebar from '../components/DoctorSidebar.vue'

const showAddBlogModal = ref(false)

const stats = [
  { label: 'Total Blogs', value: '12', trend: '3 this month', trendUp: true, icon: 'file-alt', iconColor: 'text-blue-500', bgColor: 'bg-blue-50' },
  { label: 'Published', value: '10', trend: '83% published', trendUp: true, icon: 'check-circle', iconColor: 'text-green-500', bgColor: 'bg-green-50' },
  { label: 'Total Views', value: '8.4K', trend: '12% this week', trendUp: true, icon: 'eye', iconColor: 'text-purple-500', bgColor: 'bg-purple-50' },
  { label: 'Total Likes', value: '1.2K', trend: '8% this week', trendUp: true, icon: 'heart', iconColor: 'text-red-500', bgColor: 'bg-red-50' }
]

const blogs = ref([
  { id: 1, title: 'The Ultimate Guide to High-Fiber Foods', category: 'Nutrition', excerpt: 'Discover the top fiber-rich foods that can transform your digestive health...', image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=2070&auto=format&fit=crop', status: 'Published', views: '1.2K', likes: 234, comments: 45, date: 'Dec 15, 2024', readTime: '8 min' },
  { id: 2, title: '10 Superfoods You Should Eat Every Week', category: 'Nutrition', excerpt: 'These nutrient powerhouses pack huge health benefits...', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop', status: 'Published', views: '980', likes: 187, comments: 32, date: 'Dec 10, 2024', readTime: '5 min' },
  { id: 3, title: 'Plant-Based Protein: Complete Guide', category: 'Diet', excerpt: 'Everything you need to know about getting enough protein...', image: 'https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=2070&auto=format&fit=crop', status: 'Published', views: '756', likes: 145, comments: 28, date: 'Dec 5, 2024', readTime: '8 min' },
  { id: 4, title: 'Heart-Healthy Mediterranean Recipes', category: 'Nutrition', excerpt: 'Delicious recipes inspired by the world\'s healthiest diet...', image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2053&auto=format&fit=crop', status: 'Draft', views: '0', likes: 0, comments: 0, date: 'Dec 20, 2024', readTime: '12 min' },
  { id: 5, title: 'Understanding Gut Health & Probiotics', category: 'Wellness', excerpt: 'Discovering the link between gut health and immunity...', image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=2070&auto=format&fit=crop', status: 'Published', views: '1.5K', likes: 298, comments: 56, date: 'Nov 28, 2024', readTime: '7 min' },
  { id: 6, title: 'Best Exercises for Weight Loss', category: 'Fitness', excerpt: 'Effective workout routines to help you shed pounds...', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1000&auto=format&fit=crop', status: 'Published', views: '2.1K', likes: 412, comments: 67, date: 'Nov 20, 2024', readTime: '10 min' }
])

const newBlog = ref({
  title: '',
  category: '',
  excerpt: '',
  content: '',
  image: ''
})

const handleAddBlog = () => {
  const blog = {
    id: blogs.value.length + 1,
    ...newBlog.value,
    status: 'Published',
    views: '0',
    likes: 0,
    comments: 0,
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    readTime: '5 min'
  }
  
  blogs.value.unshift(blog)
  showAddBlogModal.value = false
  
  // Reset form
  newBlog.value = {
    title: '',
    category: '',
    excerpt: '',
    content: '',
    image: ''
  }
}
</script>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fadeIn 0.8s ease-out forwards;
}

.animate-slide-up {
  opacity: 0;
  animation: slideUp 0.6s ease-out forwards;
}
</style>
