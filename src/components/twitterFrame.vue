<!-- Main Vue component for twitter frame -->

<script>
export default {
	props: ["text", "frameid", "selectedTweet", "isSubmitted"],
};
</script>

<template>
	<div
		class="flex relative w-[600px] block left-0 transition-all ease-out duration-1000 mx-4 twitterFrame">
		<div
			class="pointer-events-none top-0 relative h-full pt-3 px-4 pb-4 font-sans text-lg font-bold leading-6 border-solid border-t overflow-hidden border-t-[#2f3336] transition-all">
			<div class="flex mb-3">
				<img
					src="https://pbs.twimg.com/profile_images/736392853992001537/eF4LJLkn_400x400.jpg"
					class="w-[48px] h-[48px] rounded-full" />
				<div
					class="max-w-[calc(100% - 84px)] h-[48px] mx-[4px] flex flex-col justify-center">
					<div class="flex flex-row">
						<span class="text-[15px] font-bold leading-5 font-sans flex"
							>Donald J. Trump</span
						>
						<!--Checkmark-->
						<svg
							viewBox="0 0 24 24"
							class="flex ml-[2px] h-[18px] w-[18px] fill-[#1d9cf0]">
							<path
								d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z" />
						</svg>
					</div>
					<span class="text-[15px] leading-5 flex text-[#e7e9ea]"
						>@realDonaldTrump</span
					>
				</div>
				<svg class="absolute top-0 right-0 h-[25px] w-[25px] fill-[#1d9cf0]">
					<path
						d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z" />
				</svg>
			</div>
			<p class="text-[23px] leading-[28px]">{{ text }}</p>
		</div>
	</div>
</template>
