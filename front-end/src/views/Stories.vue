<template>
  <div>
    <h1 class="title">Stories</h1>
    <div class="story" v-for="story in stories" :key="story._id">
      <!-- <img :src="item.path" /> -->
      <div v-if="!story.edit">
        <h3>{{story.title}}</h3>
        <p> <strong>People:</strong> {{story.people}} </p>
        <p> {{story.story}} </p>
        <div class="buttons">
          <button @click="deleteStory(story)">Delete</button>
          <button v-if="!editing" @click="toggleEdit(story)">Edit</button>
        </div>
      </div>
      <div v-else>
        <p><strong>Title:</strong></p>
        <input type="text" v-model="newStoryTitle">
        <p><strong>People:</strong></p>
        <input type="text" v-model="newStoryPeople">
        <p><strong>Story:</strong></p>
        <textarea class="storyArea" type="text" v-model="newStory"></textarea>
        <button v-if="story.edit" @click="editStory(story)">Save</button>
      </div>
    </div>
    <div class="buttons">
      <button class="addButton" v-if="!adding" @click="toggleAdd">Add a Story</button>
      <button class="addButton" v-else @click="toggleAdd">Done</button>
    </div>
    <div v-if="adding">
      <div class="add">
        <form v-on:submit.prevent="addStory">
          <p><strong>Title:</strong></p>
          <input type="text" v-model="newStoryTitle">
          <div class="formSection">
            <p><strong>People:</strong></p>
            <input type="text" v-model="newStoryPeople">
            <p><strong>Story:</strong></p>
            <textarea class="storyArea" type="text" v-model="newStory"></textarea>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'Stories',
    data() {
      return {
        adding: false,
        editing: false,
        newStoryTitle: "",
        newStoryPeople: "",
        newStory: "",
        stories: [],
      }
    },
    created() {
      this.getAll();
    },
    methods: {
      async getAll() {
        var url = "/api/stories";
        try {
          let response = await axios.get(url);
          this.stories = response.data;
          return true;
        } catch () {
          // console.log(error);
        }
      },
      addStory() {
        var url = "/api/stories/";
        const newStory = {
          title: this.newStoryTitle,
          people: this.newStoryPeople,
          story: this.newStory,
          edit: false
        };
        axios.post(url, newStory)
          .then(response => {
            this.stories.push(response.data);
          })
          .catch(error => {
            // console.log(error);
          })

        this.newStoryTitle = '';
        this.newStoryPeople = '';
        this.newStory = '';
      },
      async deleteStory(story) {
        try {
          await axios.delete("/api/stories/" + story._id);
          this.getAll();
          return true;
        } catch (error) {
          // console.log(error);
        }
      },
      async editStory(story) {
        story.edit = false;
        this.editing = false;
        try {
          await axios.put("/api/stories/" + story._id, {
            title: this.newStoryTitle,
            people: this.newStoryPeople,
            story: this.newStory,
          });
          this.newStoryTitle = '';
          this.newStoryPeople = '';
          this.newStory = '';
          this.getAll();
          return true;
        } catch (error) {
          //// console.log(error);
        }
      },
      toggleAdd() {
        if (this.adding) {
          this.adding = false;
        } else {
          this.adding = true;
        }
      },
      toggleEdit(story) {
        this.newStoryTitle = story.title;
        this.newStoryPeople = story.people;
        this.newStory = story.story;
        story.edit = true;
        this.adding = false;
        this.editing = true;
      }
    }
  }
</script>

<style scoped>
  .title {
    font-size: 2em;
  }

  .story {
    margin-bottom: 20px;
  }

  .storyArea {
    width: 100%;
    height: 50%;
  }

  .heading {
    display: flex;
    margin-bottom: 20px;
    margin-top: 20px;
  }

  .heading h2 {
    margin-top: 8px;
    margin-left: 10px;
  }

  .add,
  .edit {
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }

  .circle {
    border-radius: 50%;
    width: 18px;
    height: 18px;
    padding: 8px;
    background: #333;
    color: #fff;
    text-align: center
  }

  /* Form */
  input,
  textarea,
  select,
  button {
    font-family: 'Montserrat', sans-serif;
    font-size: 1em;
  }

  .form {
    margin-right: 50px;
  }

  .info {
    display: flex;
    flex-direction: column;
  }

  .story button {
    margin: 5px;
  }

  .buttons {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .addButton {
    padding: 10px;
    margin: 0 auto;
    width: 120px;
    height: 50px;
    color: white;
    text-align: center;
    background-color: #306d77;
    border-radius: 10px;
    box-shadow: 3px 3px 3px 3px grey;
  }
</style>