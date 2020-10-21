<template>
  <div>
    <v-row class="justify-center">
      <v-flex xs11 md4>
        <Chat
          v-if="visible"
          :participants="participants"
          :myself="myself"
          :messages="messagesToShow"
          :chat-title="chatTitle"
          :placeholder="placeholder"
          :colors="colors"
          :border-style="borderStyle"
          :hide-close-button="hideCloseButton"
          :close-button-icon-size="closeButtonIconSize"
          :submit-icon-size="submitIconSize"
          :load-more-messages="toLoad.length > 0 ? loadMoreMessages : null"
          :async-mode="asyncMode"
          :scroll-bottom="scrollBottom"
          :display-header="true"
          :profile-picture-config="profilePictureConfig"
          :timestamp-config="timestampConfig"
          :link-options="linkOptions"
          @onMessageSubmit="onMessageSubmit"
        />
      </v-flex>
    </v-row>
  </div>
</template>

<script>
import { Chat } from "vue-quick-chat";
import "vue-quick-chat/dist/vue-quick-chat.css";
import {get,sync} from 'vuex-pathify'

export default {
  components: {
    Chat,
  },
  data() {
    return {
      visible: true,
      participants: [
        {
          name: "Jasha",
          id: 1,
          profilePicture:
            "https://lh3.googleusercontent.com/-G1d4-a7d_TY/AAAAAAAAAAI/AAAAAAAAAAA/AAKWJJPez_wX5UCJztzEUeCxOd7HBK7-jA.CMID/s83-c/photo.jpg",
        },
      ],

      colors: {
        header: {
          bg: "#d30303",
          text: "#fff",
        },
        message: {
          myself: {
            bg: "#fff",
            text: "#bdb8b8",
          },
          others: {
            bg: "#fb4141",
            text: "#fff",
          },
          messagesDisplay: {
            bg: "#f7f3f3",
          },
        },
        submitIcon: "#b91010",
        submitImageIcon: "#b91010",
      },
      borderStyle: {
        topLeft: "10px",
        topRight: "10px",
        bottomLeft: "10px",
        bottomRight: "10px",
      },
      hideCloseButton: true,
      submitIconSize: 25,
      closeButtonIconSize: "20px",
      asyncMode: false,
      toLoad: [],
      scrollBottom: {
        messageSent: true,
        messageReceived: false,
      },
      displayHeader: true,
      profilePictureConfig: {
        others: true,
        myself: true,
        styles: {
          width: "30px",
          height: "30px",
          borderRadius: "50%",
        },
      },
      timestampConfig: {
        format: "HH:mm",
        relative: false,
      },
      // there are other options, you can check them here
      // https://soapbox.github.io/linkifyjs/docs/options.html
      linkOptions: {
        myself: {
          className: "myLinkClass",
          events: {
            click: function (e) {
              alert("Link clicked!");
            },
            mouseover: function (e) {
              alert("Link hovered!");
            },
          },
          format: function (value, type) {
            if (type === "url" && value.length > 50) {
              value = value.slice(0, 50) + "…";
            }
            return value;
          },
        },
        others: {
          className: "othersLinkClass",
          events: {
            click: function (e) {
              alert("Link clicked!");
            },
            mouseover: function (e) {
              alert("Link hovered!");
            },
          },
          format: function (value, type) {
            if (type === "url" && value.length > 50) {
              value = value.slice(0, 50) + "…";
            }
            return value;
          },
        },
      },
    };
  },
  computed: {
    messages : get("general/messages"),
    messagesToShow() {
      if(this.messages.length) {
        return this.messages
      } else {
        return  [{
          content: this.$t("contacts.initMessage"),
          myself: false,
          participantId: 1,
          timestamp: new Date(),
          uploaded: true,
          viewed: true,
          type: "text",
        }]
      }
    },
    user : get("general/user"),
    chatTitle() {
      return this.$t("contacts.chatTitle")
    },
    placeholder() {
      return this.$t("contacts.placeholder")
    },
    myself() {
      let user = Object.assign({}, this.user)
      user.profilePicture = user.photoURL
      user.id = 2
      return user
    },
  },
  methods: {
    loadMoreMessages(resolve) {
      setTimeout(() => {
        resolve(this.toLoad); //We end the loading state and add the messages
        //Make sure the loaded messages are also added to our local messages copy or they will be lost
        this.messages.unshift(...this.toLoad);
        this.toLoad = [];
      }, 1000);
    },
    onMessageSubmit: function (message) {
      this.$store.dispatch("general/uploadMessage", {message : JSON.stringify(message)})
      this.messages.push(message);

      /*
       * you can update message state after the server response
       */
      // timeout simulating the request
      setTimeout(() => {
        message.uploaded = true;
      }, 2000);
    },
    onSubmit(val) {
      console.log(val)
    }
  },
  mounted() {
  },
};
</script>

<style scoped>
#test {
  /* ... */
}
</style>