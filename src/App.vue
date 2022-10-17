<script>
import SocketioService from "./services/socketio.service.js";
import $ from "jquery";
import { nextTick } from "vue";

import styleButton from "./components/styleButton.vue";
import twitterFrame from "./components/twitterFrame.vue";
import emptyFrame from "./components/emptyFrame.vue";
import IconNavi from "./components/icons/IconNavi.vue";

import tweetList from "./assets/tweetList.json";

let fadeTimeout = false;
//console.log(tweetList)

export default {
	name: "app",
	data: function () {
		return {
			tweet: ["No connection to server."],
			thisFrame: "menu",
			selectedTweet: 0,
			isSubmitted: false,
			isCorrect: false,
			currentTweet: 1,
			correctTweet: Math.round(Math.random()),
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

		changeTweet() {
			currentTweet++;

			if (currentTweet === 1 && this.selectedTweet > 0) {
				$("#gameFlav").fadeOut(2000);
			}
		},

		submitTweet(n) {
			console.log("Tweet submitted");

			this.isSubmitted = true;
			this.isCorrect = n === this.correctTweet;

			$("#answerPopup")
				.delay(1000)
				.fadeIn(100, () => {
					$("#answerPopup")
						.delay(3000)
						.fadeOut(200, () => {
							this.isSubmitted = false;
							$(".twitterFrame > div").delay(1000).fadeIn(2000);
						});
				});

			this.currentTweet++;
			this.correctTweet = Math.round(Math.random());
			console.log(this.currentTweet, this.correctTweet);
		},
	},
	computed: {
		returnTweet() {
			console.log("calc");
			return this.correctTweet === 1
				? tweetList[Math.floor(Math.random() * tweetList.length)]
				: (this.tweet[this.currentTweet % 100] || "").replace(
						/<\|startoftext\|>/,
						""
				  );
		},
	},
	components: {
		styleButton,
		twitterFrame,
		emptyFrame,
		IconNavi,
	},
};
</script>

<template>
	<div class="absolute top-0 left-0 w-screen h-screen">
		<div id="menu" class="flex-col">
			<div class="flex">
				<div
					class="flex flex-col items-center absolute left-[50px] top-[350px]">
					<h1 class="italic font-semibold text-8xl">@realDonaldTrump</h1>
					<h2 class="mt-2 text-2xl italic font-light text-center">
						A tale of lies, damn lies and an ex-president. <br />Can you spot
						the fake?
					</h2>

					<div>
						<styleButton
							:isOn="true"
							:text="`START →`"
							@onClick="transition(`menu`, `game`)" />
					</div>
				</div>

				<img
					class="absolute left-[900px] top-[250px] w-[650px] h-[1250px] flex"
					src="./assets/trump_min.png"
					alt="Minimalist image of Trump" />
			</div>
		</div>

		<div
			id="game"
			class="absolute top-0 left-0 flex flex-row items-center justify-center w-screen h-screen">
			<div
				class="flex flex-col max-w-fit border-x border-x-[#2f3336] content-center h-screen top-0">
				<div
					class="flex flex-col inline-block h-fit min-h-0 justify-center grow">
					<emptyFrame />
					<twitterFrame
						class="twitterFrame"
						:text="returnTweet"
						:frameid="1"
						:selectedTweet="selectedTweet"
						:isSubmitted="isSubmitted" />
					<emptyFrame />
				</div>
				<div
					class="absolute left-[0px] right-[0px] top-[0px] flex flex-row max-w-[100%] h-[53px] mx-[16px] items-center bg-black">
					<svg
						viewBox="0 0 24 24"
						aria-hidden="true"
						class="fill-[#eff3f4] w-[20px] h-[20px] mx-[8px]">
						<path
							d="M20 11H7.414l4.293-4.293a1 1 0 0 0-1.414-1.414l-6 6a1 1 0 0 0 0 1.414l6 6a.996.996 0 0 0 1.414 0 1 1 0 0 0 0-1.414L7.414 13H20a1 1 0 1 0 0-2z" />
					</svg>
					<div class="ml-[20px] text-[20px] font-bold">Thread</div>
				</div>
			</div>
			<div class="pl-[30px]">
				<styleButton :isOn="true" :text="`REAL`" @onClick="submitTweet(1)" />
				<styleButton :isOn="true" :text="`FAKE`" @onClick="submitTweet(0)" />
			</div>
		</div>

		<div
			class="w-screen absolute bottom-0 left-0 h-[80px] bg-[#2e2e2e] flex items-center justify-center">
			<div class="flex">
				<IconNavi
					:active="thisFrame === `menu`"
					@onClick="transition(thisFrame, `menu`)" />
				<IconNavi
					:active="thisFrame === `game`"
					@onClick="transition(thisFrame, `game`)" />
			</div>
		</div>
	</div>
</template>
