<template>
  <aside class="sidebar">
    <h2>Sort</h2>
    <v-select 
      class="style-chooser"
      v-model="criteria"
      placeholder="Criteria" 
      :options="['name','price','creation date']">
    </v-select>
    <v-select 
      class="style-chooser"
      v-model="type"
      placeholder="type" 
      :options="['direct','indirect']">
    </v-select>
    <h2>Filter</h2>
    <p>Genre</p>
    <v-select 
      class="style-chooser"
      v-model="genre"
      placeholder="Genre" 
      :options="['All','shooter','racing', 'RPG']">
    </v-select>
    <p>Price</p>
    <v-select 
      class="style-chooser"
      v-model="price"
      placeholder="Price" 
      :options="priceOptions"
      :reduce="elem => elem.value">
    </v-select>
  </aside>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { Watch } from 'vue-property-decorator'
import vSelect from 'vue-select'
import { PriceOption } from '@/store/types/types'

@Options({
  components: {
    vSelect
  }
})
export default class SideBar extends Vue {
  criteria = ''
  type = ''
  genre = ''
  price = 0
  priceOptions: PriceOption[] = [
    { label: 'All prices', value: 'All' },
    { label: '> 5$', value: 5 },
    { label: '> 10$', value: 10 },
    { label: '> 15$', value: 15 },
  ]

  @Watch('criteria')
  @Watch('type')
  onSortChange() {
    this.$emit('sortProducts', this.criteria, this.type)
  }

  @Watch('genre')
  onGenreChange() {
    this.$emit('filtration', 'genre', this.genre)
  }
  @Watch('price')
  onPriceChange() {
    this.$emit('filtration', 'price', this.price)
  }
}
</script>

<style lang="scss">
.sidebar {
  padding: 1% 1% 3%;
  background-color: $section-background;
  border-radius: 10px;
  width: 20%;
  color:$white;
  text-align: left;
}

.style-chooser .vs__search::placeholder,
.style-chooser .vs__dropdown-toggle,
.style-chooser .vs__dropdown-menu {
  background: $select-background;
  border: none;
  color: $select-color;
  text-transform: lowercase;
  font-variant: small-caps;
  margin: 5px 0;
  }

  .style-chooser .vs__clear,
  .style-chooser .vs__open-indicator {
    fill: $select-color;
 }

</style>
