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
    <hr>   
    <input type="radio" value="all" id="1" v-model="genre">
    <label for="1"> All genres </label><br>   
    <input type="radio" value="shooter" id="2" v-model="genre">
    <label for="2"> shooter </label><br>   
    <input type="radio" value="racing" id="3" v-model="genre">
    <label for="3"> racing </label><br>
    <input type="radio" value="RPG" id="4" v-model="genre">
    <label for="4"> RPG </label>
    <p>Price</p>
    <hr>
    <input type="radio" value="all" id="5" v-model="price">
    <label for="5">All prices </label><br> 
    <input type="radio" :value="5" id="6" v-model="price">
    <label for="6"> > 5$ </label><br> 
    <input type="radio" :value="10" id="7" v-model="price">
    <label for="7"> > 10$ </label><br> 
    <input type="radio" :value="15" id="8" v-model="price">
    <label for="8"> > 15$ </label><br> 
  </aside>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { Watch } from 'vue-property-decorator'
import vSelect from 'vue-select'

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
  margin:5px 0;
  }

  .style-chooser .vs__clear,
  .style-chooser .vs__open-indicator {
    fill: $select-color;
 }

</style>
