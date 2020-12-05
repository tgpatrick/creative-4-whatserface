<template>
  <div class="home">
    <h1>People</h1>
    <section class="person-gallery">
      <div class="person" v-for="inlaw in inlaws" :key="inlaw._id">
        <!-- <img :src="item.path" /> -->
        <div v-if="!inlaw.edit">
          <h3>{{inlaw.name}}</h3>
          <p> <strong>Relation:</strong> {{inlaw.relation}} </p>
          <p> <strong>Birthday:</strong> {{inlaw.birthday}} </p>
          <p> <strong>Hobbies:</strong> {{inlaw.hobbies}} </p>
          <p> <strong>Notes:</strong> {{inlaw.notes}} </p>
          <div class="buttons">
            <button @click="deleteInlaw(inlaw)">Delete</button>
            <button v-if="!editing" @click="toggleEdit(inlaw)">Edit</button>
          </div>
        </div>
        <div v-else>
          <input type="text" v-model="newInlawName">
          <p><strong>Relation:</strong></p>
          <input type="text" v-model="newInlawRelation">
          <p><strong>Birthday:</strong></p>
          <input type="text" v-model="newInlawBirthday">
          <p><strong>Hobbies:</strong></p>
          <input type="text" v-model="newInlawHobbies">
          <p><strong>Notes:</strong></p>
          <textarea type="text" v-model="newInlawNotes"></textarea>
          <button v-if="inlaw.edit" @click="editInlaw(inlaw)">Save</button>
        </div>
      </div>
    </section>
    <button class="addButton" v-if="!adding" @click="toggleAdd">Add an Inlaw</button>
    <button v-else @click="toggleAdd">Done</button>
    <div v-if="adding">
      <div class="add">
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
      </div>
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
        editing: false,
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
      fileChanged(event) {
        this.file = event.target.files[0]
      },
      async upload() {
        try {
          const formData = new FormData();
          formData.append('photo', this.file, this.file.name)
          let r1 = await axios.post('/api/photos', formData);
          let r2 = await axios.post('/api/items', {
            title: this.title,
            description: this.description,
            path: r1.data.path
          });
          this.addItem = r2.data;
        } catch (error) {
          //console.log(error);
        }
      },
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
          var url = "/api/inlaws/";
          const newInlaw = {
            name: this.newInlawName,
            relation: this.newInlawRelation,
            birthday: this.newInlawBirthday,
            hobbies: this.newInlawHobbies,
            notes: this.newInlawNotes,
            edit: false
          };
          axios.post(url, newInlaw)
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
          await axios.delete("/api/inlaws/" + inlaw._id);
          this.getAll();
          return true;
        } catch (error) {
          console.log(error);
        }
      },
      async editInlaw(inlaw) {
        inlaw.edit = false;
        this.editing = false;
        try {
          await axios.put("/api/inlaws/" + inlaw._id, {
            name: this.newInlawName,
            relation: this.newInlawRelation,
            birthday: this.newInlawBirthday,
            hobbies: this.newInlawHobbies,
            notes: this.newInlawNotes,
          });
          this.newInlawName = '';
          this.newInlawRelation = '';
          this.newInlawBirthday = '';
          this.newInlawHobbies = '';
          this.newInlawNotes = '';
          this.getAll();
          return true;
        } catch (error) {
          //console.log(error);
        }
      },
      toggleAdd() {
        if (this.adding) {
          this.adding = false;
          this.warning = false;
        } else {
          this.adding = true;
        }
      },
      toggleEdit(inlaw) {
        this.newInlawName = inlaw.name;
        this.newInlawRelation = inlaw.relation;
        this.newInlawBirthday = inlaw.birthday;
        this.newInlawHobbies = inlaw.hobbies;
        this.newInlawNotes = inlaw.notes;
        inlaw.edit = true;
        this.adding = false;
        this.editing = true;
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

  .person {
    margin: 0 0 1.5em;
    display: inline-block;
    width: 100%;
  }

  .person img {
    width: 100%;
  }

  .person button {
    margin: 5px;
  }

  .buttons {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .addButton {
    padding: 10px;
    margin: 10px;
    width: 60px;
    height: 20px;
    color: white;
    text-align: center;
    background-color: #306d77;
    border-radius: 10px;
    box-shadow: 3px 3px 3px 3px grey;
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