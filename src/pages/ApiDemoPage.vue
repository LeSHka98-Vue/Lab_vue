<template>
  <hr>

  <h1>API DEMO (ApiDemoPage.vue)</h1>

  <button @click="createNewDemoCategory">Create new DEMO category</button>
  <button @click="patchLastDemoCategory">Update last DEMO category</button>
  <button @click="deleteLastDemoCategory">Delete last DEMO category</button>

  <h3>Demo categories preview:</h3>
  <pre>
    {{ transformedDemoCategories }}
  </pre>
</template>

<script lang="ts">
import { LoremIpsum } from 'lorem-ipsum';
import { Options, Vue } from 'vue-class-component';

/*  Generator for stubs */
const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
});

interface ICategoryDemoData {
  id?: number,
  title: string
  description: string
  createdAt: string
  updatedAt: string
}

@Options({})
export default class ApiDemoPage extends Vue {
  demoCategories: ICategoryDemoData[] = [];

  /*  An example of how to make a request */
  private async request(path, body, method = 'POST'): Promise<any> {
    const requestInit: any = {
      method,
      headers: { 'Content-Type': 'application/json' }
    };

    if (body) {
      requestInit.body = JSON.stringify(body);
    }

    return fetch(`http://localhost:3000/api/${path}`, requestInit)
      .then((response) => response.json())
      .catch((error) => {
        console.log('REQUEST FAILED', error.message);
      });
  }

  /*  Simple generation of new demo category with random data */
  private generateRandomDemoCategoryData(): ICategoryDemoData {
    const random = () => Math.floor(Math.random() * 5);

    return {
      title: lorem.generateWords(random()),
      description: lorem.generateSentences(random()),
      createdAt: new Date().getTime().toString(),
      updatedAt: new Date().getTime().toString()
    };
  }

  mounted() {
    this.updateDemoCategoriesList();
  }

  /*  A computed of how to get transformed demo categories for template  */
  get transformedDemoCategories() {
    return this.demoCategories.map((category) => {
      const createdAt = new Date(+category.createdAt);
      const updatedAt = new Date(+category.updatedAt);

      return {
        ...category,
        createdAt: `${createdAt.toDateString()} - ${createdAt.toLocaleTimeString()}`,
        updatedAt: `${updatedAt.toDateString()} - ${updatedAt.toLocaleTimeString()}`
      };
    });
  }

  /*  How to get all demo categories  */
  async updateDemoCategoriesList() {
    this.demoCategories = await this.request('demo-categories', null, 'GET');
  }

  /*  How to create new demo category  */
  async createNewDemoCategory() {
    await this.request('demo-categories', this.generateRandomDemoCategoryData());
    this.updateDemoCategoriesList();
  }

  /*  How to update/patch demo category  */
  async patchLastDemoCategory() {
    if (!this.demoCategories.length) return;

    const lastCategory = this.demoCategories[0];
    const categoryData = {
      ...this.generateRandomDemoCategoryData(),
      createdAt: lastCategory.createdAt
    };

    await this.request(`demo-categories/${lastCategory.id}`, categoryData, 'PATCH');
    this.updateDemoCategoriesList();
  }

  /*  How to delete demo category  */
  async deleteLastDemoCategory() {
    if (!this.demoCategories.length) return;

    const categoryId = this.demoCategories[0].id;

    await this.request(`demo-categories/${categoryId}`, null, 'DELETE');
    this.updateDemoCategoriesList();
  }
}
</script>

<style lang="scss" scoped>
pre {
  text-align: left;
}
</style>
