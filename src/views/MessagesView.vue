<template>
    <div>
      <h1>{{ pageName }}</h1>
      <ul v-if="messages && messages.length">
        <li v-for="message in messages" :key="message._id">
          <p><strong>Receiver Name: </strong>{{ message.receiver_id.name }}</p>
          <p><strong>Message: </strong>{{ message.message_content }}</p>
          <p><strong>sent At: </strong>{{ formatDate(message.sent_at) }}</p>
          <hr />
        </li>
      </ul>
      <p v-else></p>
        <p v-if="messages !== null">No messages to display.</p>
      <p v-else>Loading...</p>
    </div>
  </template>
<script>
import axios from 'axios';

export default {
    data(){
        return {
            pageName: 'Messages',
            messages: null,
        };
    },
    methods: {
        formatDate(date){
            return new Date(date).toLocaleString();
        },
        messagesData(){
            axios
            .get('http://127.0.0.1:3000/messages')
            .then((response) => {
                if(response.data){
                    this.messages = response.data.messages;
                    console.log(response.data);
                }
                else {
                    console.log('Request was not successful');
                }
            })
            .catch((error) => {
                console.log('An error occurred:', error);
            });
        },
    },
    mounted(){
        this.messagesData();
    },
    computed:{
        isDataLoaded() {
            return this.messages !== null;
        },
    },
}
</script>