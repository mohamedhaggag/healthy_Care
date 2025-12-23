<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getProductById, getRelatedProducts } from '../data/products'
import { useCart } from '../composables/useCart'

const route = useRoute()
const router = useRouter()
const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useCart()
const quantity = ref(1)
const selectedImageIndex = ref(0)

const productId = computed(() => route.params.id)
const product = computed(() => getProductById(productId.value))
const relatedProducts = computed(() => getRelatedProducts(productId.value))
const isWishlisted = computed(() => product.value ? isInWishlist(product.value.id) : false)

onMounted(() => {
  if (!product.value) {
    router.push('/shop')
  }
})

const increaseQuantity = () => {
  quantity.value++
}

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

const selectImage = (index) => {
  selectedImageIndex.value = index
}

const handleAddToCart = () => {
  if (product.value) {
    addToCart(product.value, quantity.value)
    // You can add toast notification here
    alert(`${product.value.name} added to cart!`)
  }
}

const toggleWishlist = () => {
  if (product.value) {
    if (isWishlisted.value) {
      removeFromWishlist(product.value.id)
    } else {
      addToWishlist(product.value)
    }
  }
}

const shareProduct = () => {
  if (navigator.share) {
    navigator.share({
      title: product.value.name,
      text: product.value.description,
      url: window.location.href
    })
  } else {
    // Fallback: copy to clipboard
    navigator.clipboard.writeText(window.location.href)
    alert('Link copied to clipboard!')
  }
}
</script>

<template>
  <div v-if="product" class="min-h-screen bg-white">
    <!-- Breadcrumbs -->
    <div class="bg-gray-50 py-4">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav class="text-sm text-gray-600">
          <router-link to="/shop" class="hover:text-primary">Shop</router-link>
          <span class="mx-2">></span>
          <span class="text-gray-400">{{ product.category }}</span>
          <span class="mx-2">></span>
          <span class="text-gray-400">Product Details</span>
        </nav>
      </div>
    </div>

    <!-- Main Product Section -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid md:grid-cols-2 gap-12">
        <!-- Left Side - Images -->
        <div>
          <!-- Main Image -->
          <div class="mb-4 bg-gray-50 rounded-lg p-8 flex items-center justify-center h-96">
            <img 
              :src="product.images[selectedImageIndex]" 
              :alt="product.name"
              class="max-h-full max-w-full object-contain"
            />
          </div>
          
          <!-- Thumbnail Images -->
          <div class="flex gap-4">
            <button
              v-for="(image, index) in product.images"
              :key="index"
              @click="selectImage(index)"
              :class="[
                'w-20 h-20 rounded-lg border-2 overflow-hidden transition-all',
                selectedImageIndex === index 
                  ? 'border-primary ring-2 ring-primary/20' 
                  : 'border-gray-200 hover:border-primary/50'
              ]"
            >
              <img 
                :src="image" 
                :alt="`${product.name} ${index + 1}`"
                class="w-full h-full object-cover"
              />
            </button>
          </div>
        </div>

        <!-- Right Side - Product Info -->
        <div>
          <div class="flex items-start justify-between mb-4">
            <h1 class="text-4xl font-bold text-dark">{{ product.name }}</h1>
            <button 
              @click="shareProduct"
              class="p-2 text-gray-400 hover:text-primary transition-colors"
              title="Share product"
            >
              <font-awesome-icon icon="share-nodes" class="text-xl" />
            </button>
          </div>

          <!-- Rating -->
          <div class="flex items-center gap-2 mb-6">
            <div class="flex text-yellow-400">
              <font-awesome-icon 
                v-for="n in 5" 
                :key="n" 
                :icon="n <= product.rating ? 'star' : ['far', 'star']" 
              />
            </div>
            <span class="text-gray-600 text-sm">({{ product.rating }})</span>
          </div>

          <!-- Pricing -->
          <div class="mb-6">
            <div class="flex items-center gap-4 mb-2">
              <span class="text-3xl font-bold text-red-600">${{ product.price.toFixed(2) }}</span>
              <span v-if="product.oldPrice" class="text-xl text-gray-400 line-through">
                ${{ product.oldPrice.toFixed(2) }}
              </span>
              <span 
                v-if="product.discount" 
                class="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded uppercase"
              >
                SAVE {{ product.discount }}%
              </span>
            </div>
          </div>

          <!-- Description -->
          <div class="mb-8">
            <p class="text-gray-600 leading-relaxed">{{ product.description }}</p>
          </div>

          <!-- Nutritional Information -->
          <div class="bg-secondary rounded-lg p-6 mb-8">
            <h3 class="font-bold text-lg text-dark mb-4">Nutritional Information</h3>
            <div class="grid grid-cols-2 gap-4 mb-4">
              <div>
                <span class="text-gray-600">Protein:</span>
                <span class="font-semibold text-dark ml-2">{{ product.nutrition.protein }}g</span>
              </div>
              <div>
                <span class="text-gray-600">Carbs:</span>
                <span class="font-semibold text-dark ml-2">{{ product.nutrition.carbs }}g</span>
              </div>
              <div>
                <span class="text-gray-600">Fats:</span>
                <span class="font-semibold text-dark ml-2">{{ product.nutrition.fats }}g</span>
              </div>
              <div>
                <span class="text-gray-600">Total Calories:</span>
                <span class="font-semibold text-dark ml-2">{{ product.nutrition.calories }} kcal</span>
              </div>
            </div>
            <div class="flex flex-wrap gap-2">
              <span 
                v-for="benefit in product.benefits" 
                :key="benefit"
                class="bg-primary text-white text-xs font-medium px-3 py-1 rounded-full"
              >
                Good for: {{ benefit }}
              </span>
            </div>
          </div>

          <!-- Quantity & Add to Cart -->
          <div class="mb-8">
            <div class="flex items-center gap-6">
              <div class="flex items-center border border-gray-300 rounded-lg">
                <button 
                  @click="decreaseQuantity"
                  class="px-4 py-3 text-gray-600 hover:text-primary transition-colors"
                >
                  <font-awesome-icon icon="minus" />
                </button>
                <input 
                  type="number" 
                  v-model.number="quantity" 
                  min="1"
                  class="w-16 text-center border-x border-gray-300 py-3 focus:outline-none"
                />
                <button 
                  @click="increaseQuantity"
                  class="px-4 py-3 text-gray-600 hover:text-primary transition-colors"
                >
                  <font-awesome-icon icon="plus" />
                </button>
              </div>
              
              <button 
                @click="handleAddToCart"
                class="flex-1 bg-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-600 transition-colors shadow-lg flex items-center justify-center gap-2"
              >
                <font-awesome-icon icon="bag-shopping" />
                Add to Cart
              </button>
              
              <button 
                @click="toggleWishlist"
                :class="[
                  'w-12 h-12 rounded-lg border-2 flex items-center justify-center transition-colors',
                  isWishlisted 
                    ? 'border-red-500 text-red-500 bg-red-50' 
                    : 'border-gray-300 text-gray-400 hover:border-red-300 hover:text-red-400'
                ]"
              >
                <font-awesome-icon 
                  icon="heart" 
                  :class="isWishlisted ? 'text-red-500' : 'opacity-50'"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Related Products Section -->
    <section class="bg-gray-50 py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-dark text-center mb-12">Related Products</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div 
            v-for="relatedProduct in relatedProducts" 
            :key="relatedProduct.id"
            class="bg-white rounded-2xl p-4 border border-gray-100 hover:shadow-xl hover:border-green-100 transition-all duration-300 relative group cursor-pointer"
            @click="router.push(`/product/${relatedProduct.id}`)"
          >
            <!-- Badge -->
            <div 
              v-if="relatedProduct.discount" 
              class="absolute top-4 left-4 bg-red-500 text-white text-[10px] uppercase font-bold px-2 py-1 rounded z-10"
            >
              SAVE {{ relatedProduct.discount }}%
            </div>
            
            <!-- Wishlist -->
            <button 
              :class="[
                'absolute top-4 right-4 transition-colors z-10',
                isInWishlist(relatedProduct.id) ? 'text-red-500' : 'text-gray-300 hover:text-red-500'
              ]"
              @click.stop="isInWishlist(relatedProduct.id) ? removeFromWishlist(relatedProduct.id) : addToWishlist(relatedProduct)"
            >
              <font-awesome-icon icon="heart" :class="isInWishlist(relatedProduct.id) ? '' : 'opacity-50'" />
            </button>

            <!-- Image -->
            <div class="h-48 flex items-center justify-center mb-4 overflow-hidden">
              <img 
                :src="relatedProduct.images[0]" 
                :alt="relatedProduct.name" 
                class="h-full object-contain group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            <!-- Content -->
            <div>
              <h3 class="font-medium text-dark group-hover:text-green-600 transition-colors mb-2">
                {{ relatedProduct.name }}
              </h3>
              <div class="flex justify-between items-end">
                <div>
                  <div class="font-bold text-dark flex items-center gap-2">
                    ${{ relatedProduct.price.toFixed(2) }}
                    <span 
                      v-if="relatedProduct.oldPrice" 
                      class="text-xs text-gray-400 line-through font-normal"
                    >
                      ${{ relatedProduct.oldPrice.toFixed(2) }}
                    </span>
                  </div>
                  <div class="flex text-yellow-400 text-[10px] mt-1">
                    <font-awesome-icon 
                      v-for="n in 5" 
                      :key="n" 
                      :icon="'star'"
                      :class="n > (relatedProduct.rating || 5) ? 'opacity-30' : ''"
                    />
                  </div>
                </div>
                
                <button 
                  class="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-dark hover:bg-green-600 hover:text-white transition-all shadow-sm"
                  @click.stop="addToCart(relatedProduct, 1)"
                >
                  <font-awesome-icon icon="bag-shopping" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  
  <div v-else class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <h2 class="text-2xl font-bold text-dark mb-4">Product Not Found</h2>
      <router-link to="/shop" class="text-primary hover:text-green-600">
        Return to Shop
      </router-link>
    </div>
  </div>
</template>

