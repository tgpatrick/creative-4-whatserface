<template>
  <div class="home">
    <section class="person-gallery">
      <div class="person" v-for="inlaw in inlaws" :key="inlaw._id">
        <h3>{{inlaw.name}}</h3>
        <!-- <img :src="item.path" /> -->
        <p> <strong>Relation:</strong> {{inlaw.relation}} </p>
        <p> <strong>Birthday:</strong> {{inlaw.birthday}} </p>
        <p> <strong>Hobbies:</strong> {{inlaw.hobbies}} </p>
        <p> <strong>Notes:</strong> {{inlaw.notes}} </p>
        <button @click="deleteInlaw">Delete</button>
      </div>
    </section>
    <button @click="toggleAdd">Add</button>
    <div v-if="adding">
      <form v-on:submit.prevent="addInlaw">
        <p><strong>Name:</strong></p>
        <input type="text" v-model="newInlawName">
        <div class="formSection">
          <p><strong>Relation:</strong></p>
          <input type="text" v-model="newInlawRelation">
          <p><strong>Birthday:</strong></p>
          <input type="text" v-model="newInlawBirthday">
          <p><strong>Hobbies:</strong></p>
          <input type="text" v-model="newInlawHobbies">
          <p><strong>Notes:</strong></p>
          <input type="text" v-model="newInlawNotes">
        </div>
        <button type="submit">Submit</button>
      </form>
      <p v-if="warning">You must include a name!</p>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'People',
    data() {
      return {
        adding: false,
        newInlawName: "",
        newInlawRelation: "",
        newInlawBirthday: "",
        newInlawHobbies: "",
        newInlawNotes: "",
        warning: false,
        inlaws: [],
      }
    },
    created() {
      this.getAll();
    },
    methods: {
      async getAll() {
        var url = "/api/inlaws";
        try {
          let response = await axios.get(url);
          this.inlaws = response.data;
          return true;
        } catch (error) {
          console.log(error);
        }
      },
      addInlaw() {
        if (this.newInlawName.length > 0) {
          var url = "/api/inlaws";
          axios.post(url, {
              name: this.newInlawName,
              relation: this.newInlawRelation,
              birthday: this.newInlawBirthday,
              hobbies: this.newInlawHobbies,
              notes: this.newInlawNotes
            })
            .then(response => {
              this.inlaws.push(response.data);
            })
            .catch(error => {
              console.log(error);
            })
          this.warning = false;
        } else {
          this.warning = true;
        }
        this.newInlawName = '';
        this.newInlawRelation = '';
        this.newInlawBirthday = '';
        this.newInlawHobbies = '';
        this.newInlawNotes = '';
      },
      async deleteInlaw(inlaw) {
        try {
          await axios.delete("/api/inlaws" + inlaw._id);
          // this.findItem = null;
          this.getAll();
          return true;
        } catch (error) {
          console.log(error);
        }
      },
      toggleAdd() {
        if (this.adding) {
          this.adding = false;
          this.warning = false;
        } else {
          this.adding = true;
        }
      }
    }
  }
</script>

<style scoped>
  .person h2 {
    font-style: italic;
  }

  /* Masonry */
  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  .person-gallery {
    column-gap: 1.5em;
  }

  .pserson {
    margin: 0 0 1.5em;
    display: inline-block;
    width: 100%;
  }

  .person img {
    width: 100%;
  }

  /* Masonry on large screens */
  @media only screen and (min-width: 1024px) {
    .person-gallery {
      column-count: 4;
    }
  }

  /* Masonry on medium-sized screens */
  @media only screen and (max-width: 1023px) and (min-width: 768px) {
    .person-gallery {
      column-count: 3;
    }
  }

  /* Masonry on small screens */
  @media only screen and (max-width: 767px) and (min-width: 540px) {
    .person-gallery {
      column-count: 2;
    }
  }
</style>