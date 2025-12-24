<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { getProducts } from '../data/products'
import { useCart } from '../composables/useCart'

const props = defineProps({
  priceRange: { type: Number, default: 100 },
  rating: { type: Number, default: 0 },
  category: { type: String, default: '' }
})

const router = useRouter()
const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useCart()

const sortBy = ref('latest')
const displayProducts = computed(() => {
  const products = getProducts()
  const arr = [...products]
  // Sorting
  switch (sortBy.value) {
    case 'price-asc':
      arr.sort((a, b) => a.price - b.price)
      break
    case 'price-desc':
      arr.sort((a, b) => b.price - a.price)
      break
    case 'latest':
    default:
      arr.sort((a, b) => b.id - a.id)
  }

  // Filtering by price, rating, category
  return arr.filter(p => {
    const withinPrice = p.price <= props.priceRange
    const meetsRating = !props.rating || (p.rating || 0) >= props.rating
    const cat = props.category ? props.category.toLowerCase().split(/\s+/).filter(Boolean) : []
    const meetsCategory = !cat.length || cat.some(w => (p.category || '').toLowerCase().includes(w))
    return withinPrice && meetsRating && meetsCategory
  })
})

const goToProduct = (productId) => {
  router.push(`/product/${productId}`)
}

const handleAddToCart = (product, event) => {
  event.stopPropagation()
  addToCart(product, 1)
  alert(`${product.name} added to cart!`)
}

const handleToggleWishlist = (product, event) => {
  event.stopPropagation()
  if (isInWishlist(product.id)) {
    removeFromWishlist(product.id)
  } else {
    addToWishlist(product)
  }
}
</script>

<template>
  <div>
    <!-- Header -->
    <div class="flex flex-col sm:flex-row justify-between items-center mb-6">
      <p class="text-gray-500 text-sm mb-4 sm:mb-0"><span class="font-bold text-dark">{{ displayProducts.length }}</span> Results Found</p>
      <div class="flex items-center gap-2">
         <span class="text-sm text-gray-500">Sort by:</span>
         <select v-model="sortBy" class="bg-white border border-gray-200 text-sm rounded-lg px-3 py-2 cursor-pointer outline-none focus:border-green-500">
           <option value="latest">Latest</option>
           <option value="price-asc">Price: Low to High</option>
           <option value="price-desc">Price: High to Low</option>
         </select>
      </div>
    </div>

    <!-- Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
       <div 
         v-for="(product, index) in displayProducts" 
         :key="product.id" 
         class="group bg-white rounded-2xl p-4 border border-gray-100 hover:shadow-xl hover:border-green-100 transition-all duration-300 relative cursor-pointer"
         data-aos="fade-up" 
         :data-aos-delay="index * 50"
         @click="goToProduct(product.id)"
       >
          
          <!-- Badges -->
          <div 
            v-if="product.discount" 
            class="absolute top-4 left-4 bg-red-500 text-white text-[10px] uppercase font-bold px-2 py-1 rounded z-10"
          >
            SAVE {{ product.discount }}%
          </div>
          
          <!-- Wishlist -->
          <button 
            :class="[
              'absolute top-4 right-4 transition-colors z-10',
              isInWishlist(product.id) ? 'text-red-500' : 'text-gray-300 hover:text-red-500'
            ]"
            @click.stop="handleToggleWishlist(product, $event)"
          >
            <font-awesome-icon icon="heart" />
          </button>
          <button 
            class="absolute top-10 right-4 text-gray-300 hover:text-dark transition-colors mt-2 z-10"
            @click.stop="goToProduct(product.id)"
            title="View details"
          >
            <font-awesome-icon icon="eye" />
          </button>

          <!-- Image -->
          <div class="h-48 flex items-center justify-center mb-4 overflow-hidden">
             <img 
               :src="product.images[0]" 
               :alt="product.name" 
               class="h-full object-contain group-hover:scale-110 transition-transform duration-500" 
             />
          </div>

          <!-- Content -->
          <div>
            <h3 class="font-medium text-dark group-hover:text-green-600 transition-colors mb-2">
              {{ product.name }}
            </h3>
            <div class="flex justify-between items-end">
               <div>
                  <div class="font-bold text-dark flex items-center gap-2">
                    ${{ product.price.toFixed(2) }}
                    <span 
                      v-if="product.oldPrice" 
                      class="text-xs text-gray-400 line-through font-normal"
                    >
                      ${{ product.oldPrice.toFixed(2) }}
                    </span>
                  </div>
                  <div class="flex text-yellow-400 text-[10px] mt-1">
                     <font-awesome-icon 
                       v-for="n in 5" 
                       :key="n" 
                       :icon="n <= (product.rating || 5) ? 'star' : 'star'" 
                       :class="n > (product.rating || 5) ? 'opacity-30' : ''"
                     /> 
                  </div>
               </div>
               
               <button 
                 class="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-dark hover:bg-green-600 hover:text-white transition-all shadow-sm"
                 @click.stop="handleAddToCart(product, $event)"
               >
                 <font-awesome-icon icon="bag-shopping" />
               </button>
            </div>
          </div>
       </div>
    </div>
    
    <!-- Pagination -->
     <div class="flex justify-center mt-12 gap-2">
       <button class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-green-600 hover:text-white transition-colors">
         <font-awesome-icon icon="chevron-left" />
       </button>
       <button class="w-10 h-10 rounded-full bg-green-600 text-white font-bold flex items-center justify-center shadow-lg shadow-green-200">1</button>
       <button class="w-10 h-10 rounded-full bg-white text-gray-600 font-medium flex items-center justify-center hover:bg-gray-50 border border-gray-100 transition-colors">2</button>
       <button class="w-10 h-10 rounded-full bg-white text-gray-600 font-medium flex items-center justify-center hover:bg-gray-50 border border-gray-100 transition-colors">3</button>
        <button class="w-10 h-10 rounded-full bg-white text-gray-600 font-medium flex items-center justify-center hover:bg-gray-50 border border-gray-100 transition-colors">...</button>
       <button class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-green-600 hover:text-white transition-colors">
         <font-awesome-icon icon="chevron-right" />
       </button>
     </div>
  </div>
</template>
