<script setup>
import { onMounted } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useRoute } from 'vue-router'

const route = useRoute()

// Mock Data
const doctor = {
  name: 'Dr. Ahmed Mohamed',
  role: 'Clinical Nutritionist & Wellness Coach',
  image: 'https://placehold.co/400x500/eefbf2/0ca84d?text=Dr+Ahmed',
  bio: `With over 15 years of experience in clinical nutrition, I'm passionate about helping individuals transform their relationship with food. My approach combines evidence-based science with compassionate guidance, creating sustainable lifestyle changes that last a lifetime. I believe that nutrition is not just about what you eat, but how you nourish your body, mind, and soul.`,
  tags: ['Weight Management', 'Sports Nutrition', 'Gut Health'],
  education: [
    { year: '2009', degree: 'Ph.D. in Nutritional Sciences', school: 'Cornell University' },
    { year: '2005', degree: 'M.S. in Clinical Nutrition', school: 'Columbia University' },
    { year: '2004', degree: 'B.S. in Biochemistry', school: 'Cornell University' }
  ],
  certifications: [
    'Certified Nutrition Specialist (CNS)',
    'Board Certified in Holistic Nutrition',
    'Certified Diabetes Educator',
    'Integrative & Functional Nutrition Certified Practitioner'
  ],
  successStories: [
    {
      name: 'Sara Ahmed',
      duration: '4 months journey',
      image: 'https://placehold.co/100x100/eefbf2/0ca84d?text=Sara',
      before: '90 kg',
      after: '65 kg',
      result: 'Lost 25 lbs & reversed pre-diabetes',
      quote: '"Dr. Sarah completely changed my life. I struggled with weight for 20 years, trying every diet imaginable. Her personalized approach, and understanding of gut health helped me finally achieve sustainable weight loss. I\'ve kept the weight off for over 2 years now!"'
    },
    {
      name: 'John Doe',
      duration: '6 months journey',
      image: 'https://placehold.co/100x100/eefbf2/0ca84d?text=John',
      before: '110 kg',
      after: '85 kg',
      result: 'Lost 55 lbs & improved energy',
      quote: '"I never thought I could feel this good again. Dr. Ahmed\'s plan was easy to follow and didn\'t feel like a diet. I have more energy than I did in my 20s!"'
    },
     {
      name: 'Emily Chen',
      duration: '3 months journey',
      image: 'https://placehold.co/100x100/eefbf2/0ca84d?text=Emily',
      before: '75 kg',
      after: '60 kg',
      result: 'Lost 15 kg & better digestion',
      quote: '"My digestion has never been better. I learned so much about how food affects my body. Highly recommend Dr. Ahmed!"'
    }
  ]
}

onMounted(() => {
  window.scrollTo(0, 0)
})
</script>

<template>
  <main class="bg-white min-h-screen pt-24 pb-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Back Link -->
         <router-link to="/#experts" class="inline-flex items-center text-green-600 hover:text-green-700 font-medium mb-8 transition-colors group">
            <font-awesome-icon icon="arrow-left" class="mr-2 group-hover:-translate-x-1 transition-transform"/> All Experts
        </router-link>

      <!-- Profile Header -->
      <section class="grid lg:grid-cols-12 gap-12 mb-20 items-start">
        <!-- Image -->
        <div class="lg:col-span-4" data-aos="fade-right">
            <div class="rounded-3xl overflow-hidden shadow-xl border border-gray-100 relative">
                 <div class="absolute inset-0 bg-green-500/10 mix-blend-overlay"></div>
                <img :src="doctor.image" :alt="doctor.name" class="w-full h-auto object-cover md:h-[500px] lg:h-auto" />
            </div>
        </div>

        <!-- Info -->
        <div class="lg:col-span-8" data-aos="fade-left">
            <h1 class="text-4xl font-bold text-dark mb-2">{{ doctor.name }}</h1>
            <p class="text-green-600 font-bold text-lg mb-8">{{ doctor.role }}</p>

            <p class="text-gray-600 leading-relaxed text-lg mb-8 max-w-3xl">
                {{ doctor.bio }}
            </p>

            <div class="flex flex-wrap gap-3 mb-10">
                <span v-for="tag in doctor.tags" :key="tag" class="px-4 py-2 bg-green-50 text-green-700 rounded-full font-bold text-sm border border-green-100">
                    {{ tag }}
                </span>
            </div>

            <button class="bg-green-600 text-white px-8 py-3 rounded-md font-bold hover:bg-green-700 shadow-md transition-colors">
                Book a Consultation
            </button>
        </div>
      </section>

      <!-- Qualifications -->
      <section class="grid md:grid-cols-2 gap-12 mb-24">
         <!-- Education -->
         <div data-aos="fade-up">
             <div class="flex items-center gap-2 mb-8">
                 <div class="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600"><font-awesome-icon icon="graduation-cap" /></div>
                 <h3 class="text-xl font-bold text-dark">Education</h3>
             </div>
             
             <div class="space-y-6">
                 <div v-for="edu in doctor.education" :key="edu.degree" class="border border-gray-100 rounded-xl p-6 hover:shadow-md transition-shadow bg-white">
                     <span class="text-green-500 font-bold text-sm block mb-1">{{ edu.year }}</span>
                     <h4 class="font-bold text-dark mb-1">{{ edu.degree }}</h4>
                     <p class="text-gray-500 text-sm">{{ edu.school }}</p>
                 </div>
             </div>
         </div>

         <!-- Certifications -->
         <div data-aos="fade-up" data-aos-delay="100">
             <div class="flex items-center gap-2 mb-8">
                 <div class="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600"><font-awesome-icon icon="certificate" /></div>
                 <h3 class="text-xl font-bold text-dark">Certifications</h3>
             </div>

             <div class="space-y-4">
                 <div v-for="cert in doctor.certifications" :key="cert" class="flex items-center gap-4 p-4 border border-gray-100 rounded-xl hover:border-green-200 transition-colors bg-white">
                     <div class="w-6 h-6 rounded-full bg-green-50 text-green-500 flex items-center justify-center flex-shrink-0 text-xs">
                         <font-awesome-icon icon="check" />
                     </div>
                     <span class="font-medium text-dark">{{ cert }}</span>
                 </div>
             </div>
         </div>
      </section>

      <!-- Success Stories -->
      <section class="mb-24">
          <div class="text-center mb-16" data-aos="fade-up">
               <div class="w-12 h-12 mx-auto rounded-full bg-green-50 text-green-600 flex items-center justify-center mb-4 text-xl">
                    <font-awesome-icon icon="star" />
               </div>
              <h2 class="text-3xl font-bold text-dark mb-4">Success Stories</h2>
              <p class="text-gray-600">Real transformations from clients who trusted their health journey with Dr. {{ doctor.name.split(' ')[1] }}</p>
          </div>

          <div class="grid md:grid-cols-3 gap-8">
              <div v-for="(story, index) in doctor.successStories" :key="story.name" 
                   class="bg-gray-50 rounded-3xl p-8 border border-gray-100 hover:shadow-lg transition-all duration-300"
                   data-aos="fade-up" :data-aos-delay="index * 100">
                  
                  <div class="flex items-center gap-4 mb-6">
                      <img :src="story.image" :alt="story.name" class="w-14 h-14 rounded-full object-cover shadow-sm" />
                      <div>
                          <h4 class="font-bold text-dark">{{ story.name }}</h4>
                          <span class="text-xs text-gray-500 font-medium">{{ story.duration }}</span>
                      </div>
                  </div>

                  <div class="flex items-center justify-between bg-white rounded-xl p-4 mb-6 shadow-sm border border-gray-100">
                      <div class="text-center">
                          <span class="block text-xs text-gray-400 mb-1">Before</span>
                          <span class="font-bold text-dark">{{ story.before }}</span>
                      </div>
                      <font-awesome-icon icon="arrow-right" class="text-green-400" />
                      <div class="text-center">
                          <span class="block text-xs text-green-600 mb-1">After</span>
                          <span class="font-bold text-green-600">{{ story.after }}</span>
                      </div>
                  </div>

                  <div class="bg-green-100/50 text-green-800 text-xs font-bold px-3 py-2 rounded-lg mb-6 inline-block">
                      {{ story.result }}
                  </div>

                  <p class="text-gray-500 text-sm italic leading-relaxed">
                      {{ story.quote }}
                  </p>
              </div>
          </div>
      </section>

      <!-- CTA -->
      <section class="bg-green-500 rounded-3xl p-10 md:p-20 text-center text-white relative overflow-hidden" data-aos="zoom-in">
           <!-- Decoration -->
            <div class="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
            <div class="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full -translate-x-1/2 translate-y-1/2 blur-2xl"></div>

            <div class="relative z-10 max-w-3xl mx-auto">
                 <h2 class="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
                 <p class="text-green-50 mb-10 text-lg">Take the first step towards a healthier you. Book a consultation with {{ doctor.name }} today.</p>

                 <form class="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" @submit.prevent>
                     <input type="email" placeholder="Enter Your Email" class="flex-grow px-6 py-4 rounded-md text-dark focus:outline-none shadow-lg placeholder:text-gray-400" />
                     <button class="px-8 py-4 bg-green-800 text-white font-bold rounded-md hover:bg-green-900 transition-colors shadow-lg whitespace-nowrap">
                         Book Consultation
                     </button>
                 </form>
            </div>
      </section>

    </div>
  </main>
</template>
