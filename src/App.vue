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
			tweet: [],
			thisFrame: "menu",
			selectedTweet: 0,
			isSubmitted: false,
			isCorrect: false,
			currentTweet: 0,
			correctTweet: Math.round(Math.random()),
			refresh: 0,
			score: 0,
			lives: 3,
		};
	},
	created: async function () {
		nextTick(() => {
			$("#game").fadeOut(1);
			$("#answerPopup").fadeOut(1);
			$("#end").fadeOut(1);
		});

		SocketioService.setupSocketConnection();
		SocketioService.socket.on("tweet", (msg) => {
			this.tweet = msg.data.filter(i => i).map(i => i.replace(
						/<\|startoftext\|>/,
						""
				  ).replace(
						/\"+/g,
						`"`
				  ));
		});

		this.refresh++
	},
	methods: {
		transition(hide, show, callback) {
			if (this.thisFrame === show) {
				return;
			}

			console.log(fadeTimeout);
			if (fadeTimeout) {
				return;
			}

			fadeTimeout = true;
			$(`#${hide}`).fadeOut(400, () => {
				(callback || function(){})()
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
			if (this.lives <= 0) {return}

			console.log("Tweet submitted");

			this.isSubmitted = true;
			this.isCorrect = n === this.correctTweet;

			if (this.isCorrect) {this.score++} else {this.lives--}

			if (this.lives <= 0) {
				console.log("diek")
				this.transition("game", "end")
			}

			$("#ans").text(this.isCorrect ? "Correct!" : "Incorrect!");
			this.correctTweet = Math.round(Math.random());
			this.refresh++
			console.log(this.currentTweet, this.correctTweet);
		},

		restart() {
			this.transition(`end`, `menu`, () => {
				this.score = 0
				this.lives = 3
				$("#ans").text("Waiting...");
				this.currentTweet++
			})
		}
	},
	computed: {
		returnTweet() {
			this.refresh;

			if (this.tweet.length < 2) {return "error lol"}

			let recalc = () => {
				this.currentTweet++
				let f = this.tweet[this.currentTweet % this.tweet.length] || ""
				return f
			}
			const fake = recalc()
			return this.correctTweet === 1
				? tweetList[Math.floor(Math.random() * tweetList.length)]
				: fake;
		},
		isFinishedLoading() {
			return this.tweet.length > 1
		}
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
							:isOn="isFinishedLoading"
							:text="isFinishedLoading ? `START ???` : `Loading...`"
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
					<div class="select-none ml-[20px] text-[20px] font-bold">Thread</div>
				</div>
			</div>
			<div class="flex ml-[30px] flex-col items-center">
				<div class="text-1xl select-none">Determine whether the displayed tweet is real, or fake.</div>
				<styleButton :isOn="true" :text="`REAL`" @onClick="submitTweet(1)" />
				<styleButton :isOn="true" :text="`FAKE`" @onClick="submitTweet(0)" />
				<div id="ans" class="mt-[16px] text-3xl select-none">Waiting...</div>
			</div>
			<div class="absolute top-[2vh] right-[2vw] text-2xl text-right">
				Score: {{ score }}<br>Lives: {{ lives }}
			</div>
		</div>

		<div id="end" class="absolute top-0 left-0 flex flex-col items-center justify-center w-screen h-screen">
			<div class="text-6xl text-center leading-snug font-bold italic">
				Game Over!<br>
				Final Score: {{ score }}
			</div>
			<styleButton
				:isOn="lives <= 0"
				:text="`RETRY`"
				@onClick="restart()" />
		</div>

		<div
			class="w-screen absolute bottom-0 left-0 h-[80px] bg-[#2e2e2e] flex items-center justify-center">
			<div class="flex">
				<IconNavi
					:active="thisFrame === `menu`"
					@onClick="(lives >= 0 ? transition : function(){})(thisFrame, `menu`)" />
				<IconNavi
					:active="thisFrame === `game`"
					@onClick="(lives >= 0 ? transition : function(){})(thisFrame, `game`)" />
				<IconNavi
					:active="thisFrame === `end`"
					@onClick="transition(thisFrame, `end`)" />
			</div>
		</div>
	</div>
</template>
