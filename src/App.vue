<script>
import SocketioService from "./services/socketio.service.js";
import $ from "jquery";
import { nextTick } from "vue";

import styleButton from "./components/styleButton.vue";
import twitterFrame from "./components/twitterFrame.vue";
import IconNavi from "./components/icons/IconNavi.vue";

import tweetList from "./assets/tweetList.json";

let fadeTimeout = false;
//console.log(tweetList)
let currentTweet = 1;
let correctTweet = Math.round(Math.random()) + 1;
console.log(correctTweet);

export default {
  name: "app",
  data: function () {
    return {
      tweet: ["No connection to server."],
      thisFrame: "menu",
      selectedTweet: 0,
      isSubmitted: false,
      isCorrect: false,
    };
  },
  created: async function () {
    nextTick(() => {
      $("#game").fadeOut(1);
      $("#answerPopup").fadeOut(1);
    });

    SocketioService.setupSocketConnection();
    SocketioService.socket.on("tweet", (msg) => {
      this.tweet = msg.data;
    });
  },
  methods: {
    transition(hide, show) {
      if (this.thisFrame === show) {
        return;
      }

      console.log(fadeTimeout);
      if (fadeTimeout) {
        return;
      }

      fadeTimeout = true;
      $(`#${hide}`).fadeOut(400, () => {
        $(`#${show}`).fadeIn(400, () => {
          fadeTimeout = false;
        });
      });
      this.thisFrame = show;
    },

    changeTweet(num) {
      this.selectedTweet = num === this.selectedTweet ? 0 : num;

      if (currentTweet === 1 && this.selectedTweet > 0) {
        $("#gameFlav").fadeOut(2000);
      }
    },

    submitTweet() {
      if (!this.selectedTweet > 0) {
        return;
      }

      if (currentTweet === 1) {
        if ($("#gameFlav").is(":animated")) {
          $("#gameFlav").stop();
        }
        $("#gameFlav").fadeOut(200, () => {
          $("#gameFlav").hide();
        });
      }

      this.isSubmitted = true;
      this.isCorrect = this.selectedTweet === correctTweet;

      $("#answerPopup")
        .delay(1000)
        .fadeIn(100, () => {
          $("#answerPopup")
            .delay(3000)
            .fadeOut(200, () => {
              this.isSubmitted = false;
              $(".twitterFrame > div").delay(1000).fadeIn(2000);
            })
        });
    },
  },
  computed: {
    returnTweet1() {
      return correctTweet === 1
        ? tweetList[Math.floor(Math.random() * tweetList.length)]
        : this.tweet[currentTweet];
    },
    returnTweet2() {
      return correctTweet === 2
        ? tweetList[Math.floor(Math.random() * tweetList.length)]
        : this.tweet[currentTweet];
    },
  },
  components: {
    styleButton,
    twitterFrame,
    IconNavi,
  },
};
</script>

<template>
  <div class="absolute top-0 left-0 w-screen h-screen">
    <div id="menu">
      <div class="flex flex-col items-center absolute left-[50px] top-[350px]">
        <h1 class="italic font-semibold text-8xl">@realDonaldTrump</h1>
        <h2 class="mt-2 text-2xl italic font-light">
          A tale of lies, damn lies and an ex-president
        </h2>

        <div>
          <styleButton
            :isOn="true"
            :text="`START →`"
            @onClick="transition(`menu`, `game`)"
          />
        </div>
      </div>

      <img
        class="absolute left-[900px] top-[250px] w-[650px] h-[1250px]"
        src="./assets/trump_min.png"
        alt="Minimalist image of Trump"
      />
    </div>

    <div
      id="game"
      class="absolute top-0 left-0 flex flex-col items-center justify-center w-screen h-screen"
    >
      <div
        class="flex flex-1 mt-auto justify-center items-end w-screen text-center"
      >
        <div id="gameFlav" class="w-96">
          <h1 class="mb-12 font-light italic text-2xl">
            Now, let's consider this. It's 2017, and you're one of new Twitter's
            new interns. Your job is to tell apart The Donald from the ducks.
            First choice. Choose wisely.
          </h1>
        </div>

        <h1 id="answerPopup" class="mb-12 font-bold text-8xl">
          {{ isCorrect ? "Correct!" : "Incorrect :(" }}
        </h1>
      </div>

      <div class="flex flex-row inline-block">
        <twitterFrame
          class="twitterFrame"
          :text="returnTweet1"
          :frameid="1"
          :selectedTweet="selectedTweet"
          :isSubmitted="isSubmitted"
          @onClick="changeTweet(1)"
        />
        <twitterFrame
          class="twitterFrame"
          :text="returnTweet2"
          :frameid="2"
          :selectedTweet="selectedTweet"
          :isSubmitted="isSubmitted"
          @onClick="changeTweet(2)"
        />
      </div>
      <div class="flex flex-1 mb-auto justify-center">
        <styleButton
          :isOn="selectedTweet > 0 && !isSubmitted"
          :text="`SUBMIT`"
          @onClick="submitTweet()"
        />
      </div>
    </div>

    <div
      class="w-screen absolute bottom-0 left-0 h-[80px] bg-[#2e2e2e] flex items-center justify-center"
    >
      <div class="flex">
        <IconNavi
          :active="thisFrame === `menu`"
          @onClick="transition(thisFrame, `menu`)"
        />
        <IconNavi
          :active="thisFrame === `game`"
          @onClick="transition(thisFrame, `game`)"
        />
        <IconNavi
          :active="thisFrame === `end`"
          @onClick="transition(thisFrame, `end`)"
        />
      </div>
    </div>
  </div>
</template>
